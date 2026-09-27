import { NextResponse } from "next/server"
import { createHash, timingSafeEqual } from "crypto"
import { prisma } from "@/lib/prisma"

const resolveStatus = (
  transactionStatus: string,
  fraudStatus?: string
): string | null => {
  if (transactionStatus === "settlement") {
    return "paid"
  }

  if (transactionStatus === "paid") {
    return "paid"
  }

  if (transactionStatus === "capture") {
    if (fraudStatus === "deny") {
      return "failure"
    }

    if (fraudStatus && fraudStatus !== "accept") {
      return null
    }

    return "paid"
  }

  if (
    ["deny", "cancel", "expire", "refund", "partial_refund"].includes(
      transactionStatus
    )
  ) {
    return "failure"
  }

  return null
}

const PAYMENT_DOWNgrades = ["refund", "partial_refund", "cancel"]

const POST = async (request: Request) => {
  const serverKey = process.env.MIDTRANS_SERVER_KEY

  if (!serverKey) {
    console.error("MIDTRANS_SERVER_KEY tidak ditemukan")

    return NextResponse.json(
      {
        error: "Konfigurasi pembayaran tidak tersedia",
      },
      {
        status: 500,
      }
    )
  }

  let body: Record<string, unknown>

  try {
    body = await request.json()
  } catch (error) {
    console.error("Gagal membaca body notification:", error)

    return NextResponse.json(
      {
        error: "Body tidak valid",
      },
      {
        status: 400,
      }
    )
  }

  const orderId =
    typeof body.order_id === "string"
      ? body.order_id
      : body.order_id != null
        ? String(body.order_id)
        : null

  const statusCode =
    typeof body.status_code === "number"
      ? String(body.status_code)
      : typeof body.status_code === "string"
        ? body.status_code
        : null

  const grossAmount =
    typeof body.gross_amount === "number"
      ? body.gross_amount.toFixed(2)
      : typeof body.gross_amount === "string"
        ? body.gross_amount
        : null

  const signatureKey =
    typeof body.signature_key === "string" ? body.signature_key : null

  if (!orderId || !statusCode || !grossAmount || !signatureKey) {
    console.error("Field notification tidak lengkap")

    return NextResponse.json(
      {
        error: "Field wajib tidak lengkap",
      },
      {
        status: 400,
      }
    )
  }

  const signatureString =
    orderId +
    statusCode +
    grossAmount +
    serverKey

  const expectedSignature = createHash("sha512")
    .update(signatureString)
    .digest("hex")

  const expectedBuffer = Buffer.from(
    expectedSignature,
    "utf8"
  )

  const receivedBuffer = Buffer.from(
    signatureKey,
    "utf8"
  )

  const isValidSignature =
    expectedBuffer.length === receivedBuffer.length &&
    timingSafeEqual(
      expectedBuffer,
      receivedBuffer
    )

  if (!isValidSignature) {
    console.error("Signature Midtrans tidak valid", {
      orderId,
      statusCode,
      grossAmount,
    })

    return NextResponse.json(
      {
        error: "Signature tidak valid",
      },
      {
        status: 401,
      }
    )
  }

  const transactionStatus =
    typeof body.transaction_status === "string"
      ? body.transaction_status
      : ""

  const fraudStatus =
    typeof body.fraud_status === "string"
      ? body.fraud_status
      : undefined

  const paymentStatus = resolveStatus(
    transactionStatus,
    fraudStatus
  )

  const paymentType =
    typeof body.payment_type === "string"
      ? body.payment_type
      : null

  if (paymentStatus || paymentType) {
    try {
      const existing = await prisma.payment.findUnique({
        where: {
          reservationId: orderId,
        },
        select: {
          status: true,
        },
      })

      let isReplayDowngrade = false

      if (existing) {
        const isPaidNow = existing.status === "paid"
        isReplayDowngrade =
          isPaidNow &&
          paymentStatus === "failure" &&
          !PAYMENT_DOWNgrades.includes(transactionStatus)

        const data: { status?: string; method?: string } = {}

        if (paymentStatus && !isReplayDowngrade) {
          data.status = paymentStatus
        }

        if (paymentType) {
          data.method = paymentType
        }

        if (Object.keys(data).length > 0) {
          await prisma.payment.update({
            where: {
              reservationId: orderId,
            },
            data,
          })
        }
      }

      console.log("Payment berhasil diperbarui", {
        orderId,
        transactionStatus,
        fraudStatus,
        paymentStatus,
        paymentType,
        replayBlocked: isReplayDowngrade,
        paymentFound: !!existing,
      })
    } catch (error) {
      console.error(
        "Gagal update payment:",
        error
      )

      return NextResponse.json(
        {
          error: "Gagal memperbarui pembayaran",
        },
        {
          status: 500,
        }
      )
    }
  }

  return NextResponse.json(
    {
      status: "ok",
    },
    {
      status: 200,
    }
  )
}

export { POST }