import Midtrans from "midtrans-client"
import { differenceInCalendarDays } from "date-fns"

const snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!,
})

const TOKEN_TTL_MINUTES = 10

type SnapParameter = Midtrans.SnapTransactionParameters & {
  item_details?: { id: string; price: number; quantity: number; name: string }[]
  customer_details?: { first_name?: string; email?: string; phone?: string }
  expiry?: { unit: "minutes" | "hours" | "days"; duration: number }
}

type SnapTokenArgs = {
  reservationId: string,
  roomId: string,
  roomName: string,
  startAt: Date,
  endAt: Date,
  amount: number,
  customer: {
    name: string,
    phone: string,
    email?: string
  }
}

export const createSnapToken = async (args: SnapTokenArgs) => {
  const nights = Math.max(1, differenceInCalendarDays(args.endAt, args.startAt))

  const parameter: SnapParameter = {
    transaction_details: {
      order_id: args.reservationId,
      gross_amount: args.amount
    },
    item_details: [
      {
        id: args.roomId,
        price: args.amount,
        quantity: 1,
        name: `${args.roomName} (${nights} malam)`
      }
    ],
    customer_details: {
      first_name: args.customer.name,
      email: args.customer.email,
      phone: args.customer.phone
    },
    expiry: {
      unit: "minutes",
      duration: TOKEN_TTL_MINUTES
    }
  }

  const result = await snap.createTransaction(parameter)

  return {
    token: result.token,
    redirectUrl: result.redirect_url,
    expiresAt: new Date(Date.now() + TOKEN_TTL_MINUTES * 60_000)
  }
}