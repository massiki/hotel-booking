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

export type { RoomProps }