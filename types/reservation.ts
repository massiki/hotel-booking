import { Prisma } from "@/app/generated/prisma/client"

export type ReservationWithRoomAndPayment = Prisma.ReservationsGetPayload<{
  include: {
    rooms: true
    payment: true
  }
}>