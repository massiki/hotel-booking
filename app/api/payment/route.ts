import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { createSnapToken } from "@/lib/midtrans"

const POST = async (request: Request) => {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Belum login" }, { status: 401 })
  }

  let reservationId: unknown
  try {
    const body = await request.json()
    reservationId = body?.reservationId
  } catch {
    return NextResponse.json({ error: "Body tidak valid" }, { status: 400 })
  }

  if (typeof reservationId !== "string" || !reservationId) {
    return NextResponse.json({ error: "reservationId wajib diisi" }, { status: 400 })
  }

  const reservation = await prisma.reservations.findUnique({
    where: { id: reservationId },
    include: {
      rooms: true,
      payment: true,
      user: {
        select: { email: true },
      },
    },
  })

  if (!reservation || reservation.userId !== session.user.id || !reservation.payment) {
    return NextResponse.json({ error: "Reservasi tidak ditemukan" }, { status: 404 })
  }

  if (reservation.payment.status === "paid") {
    return NextResponse.json({ error: "Reservasi sudah lunas" }, { status: 409 })
  }

  if (reservation.payment.status === "cancelled") {
    return NextResponse.json({ error: "Reservasi sudah dibatalkan" }, { status: 409 })
  }

  // Token dari DB masih berlaku → pakai langsung (tanpa hit Midtrans)
  const now = new Date()
  if (reservation.token && reservation.tokenExpiresAt && reservation.tokenExpiresAt > now) {
    return NextResponse.json({ token: reservation.token })
  }

  const { payment, rooms, user } = reservation

  try {
    const { token, redirectUrl, expiresAt } = await createSnapToken({
      reservationId: reservation.id,
      roomId: rooms.id,
      roomName: rooms.name,
      startAt: reservation.startAt,
      endAt: reservation.endAt,
      amount: payment.amount,
      customer: {
        name: reservation.name,
        phone: reservation.phone,
        email: user.email ?? undefined,
      },
    })

    await prisma.reservations.update({
      where: { id: reservation.id },
      data: { token, tokenExpiresAt: expiresAt },
    })

    return NextResponse.json({ token, redirect_url: redirectUrl })
  } catch (error) {
    console.error("Midtrans createTransaction gagal:", error)
    return NextResponse.json(
      { error: "Gagal membuat token pembayaran" },
      { status: 500 },
    )
  }
}

export { POST }
