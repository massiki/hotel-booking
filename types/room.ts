import { Prisma } from "@/app/generated/prisma/client"

interface RoomProps {
  id: string,
  name: string,
  image: string,
  price: number,
  description: string,
  capacity: number,
  createdAt: Date,
  updatedAt: Date,
  roomAmenities: {
    amenityId: string
  }[]
}

type RoomByIdUser = Prisma.RoomsGetPayload<{
  include: {
    roomAmenities: {
      include: {
        amenities: {
          select: {
            name: true
          }
        }
      }
    }
  }
}>

type DisableDateProps = Prisma.ReservationsGetPayload<{
  select: {
    startAt: true,
    endAt: true
  },
}>[]

export type { RoomProps, RoomByIdUser, DisableDateProps }