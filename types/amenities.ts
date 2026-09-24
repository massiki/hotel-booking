interface Amenity {
  id: string
  name: string
}

interface FormRoomProps {
  amenities: Amenity[]
}

export type { FormRoomProps }