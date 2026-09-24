import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

const getAmenities = async () => {
  const session = await auth()
  if (!session || !session.user || session.user.role !== 'admin') {
    throw new Error("Unauthorized Access")
  }
  return await prisma.amenities.findMany()
}

const PAGE_SIZE = 10

const getRooms = async ({ search = "", page = 1 }: { search?: string; page?: number } = {}) => {
  const session = await auth()
  if (!session || !session.user || session.user.role !== 'admin') {
    throw new Error("Unauthorized Access")
  }

  const where = search
    ? { name: { contains: search, mode: "insensitive" as const } }
    : {}

  const total = await prisma.rooms.count({ where })
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const safePage = Math.min(Math.max(1, page), totalPages)

  const rooms = await prisma.rooms.findMany({
    where,
    orderBy: {
      createdAt: "desc"
    },
    skip: (safePage - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    include: {
      roomAmenities: true
    }
  })

  return {
    rooms: rooms.map((room) => ({
      ...room,
      amenitiesCount: room.roomAmenities.length,
    })),
    total,
    page: safePage,
    totalPages,
  }
}

const getRoomById = async (roomId: string) => {
  const session = await auth()
  if (!session || !session.user || session.user.role !== 'admin') {
    throw new Error("Unauthorized Access")
  }

  return await prisma.rooms.findUnique({
    where: { id: roomId },
    include: { roomAmenities: { select: { amenityId: true } } }
  })
}

const getContacts = async ({ search = "", page = 1 }: { search?: string; page?: number } = {}) => {
  const session = await auth()
  if (!session || !session.user || session.user.role !== 'admin') {
    throw new Error("Unauthorized Access")
  }

  const where = search
    ? {
      OR: [
        { name: { contains: search, mode: "insensitive" as const } },
        { email: { contains: search, mode: "insensitive" as const } },
        { subject: { contains: search, mode: "insensitive" as const } },
      ],
    }
    : {}

  const total = await prisma.contact.count({ where })
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const safePage = Math.min(Math.max(1, page), totalPages)

  const contacts = await prisma.contact.findMany({
    where,
    orderBy: {
      createdAt: "desc"
    },
    skip: (safePage - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  })

  return {
    contacts,
    total,
    page: safePage,
    totalPages,
  }
}

const getAmenitiesAdmin = async ({ search = "", page = 1 }: { search?: string; page?: number } = {}) => {
  const session = await auth()
  if (!session || !session.user || session.user.role !== 'admin') {
    throw new Error("Unauthorized Access")
  }

  const where = search
    ? { name: { contains: search, mode: "insensitive" as const } }
    : {}

  const total = await prisma.amenities.count({ where })
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const safePage = Math.min(Math.max(1, page), totalPages)

  const amenities = await prisma.amenities.findMany({
    where,
    orderBy: {
      createdAt: "desc"
    },
    skip: (safePage - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    include: {
      _count: { select: { roomAmenities: true } }
    },
  })

  return {
    amenities: amenities.map((amenity) => ({
      ...amenity,
      roomCount: amenity._count.roomAmenities,
    })),
    total,
    page: safePage,
    totalPages,
  }
}

const getAmenityById = async (amenityId: string) => {
  const session = await auth()
  if (!session || !session.user || session.user.role !== 'admin') {
    throw new Error("Unauthorized Access")
  }

  return await prisma.amenities.findUnique({
    where: { id: amenityId },
    include: { _count: { select: { roomAmenities: true } } },
  })
}

const getFeaturesRoomsUser = async () => {
  return await prisma.rooms.findMany({
    orderBy: {
      price: "asc"
    },
    take: 6
  })
}

const getRoomsUser = async ({ search = "", page = 1 }: { search?: string; page?: number } = {}) => {
  const where = search
    ? { name: { contains: search, mode: "insensitive" as const } }
    : {}

  const total = await prisma.rooms.count({ where })
  const totalPages = Math.max(1, Math.ceil(total / 9))
  const safePage = Math.min(Math.max(1, page), totalPages)

  const rooms = await prisma.rooms.findMany({
    where,
    orderBy: {
      price: "asc"
    },
    skip: (safePage - 1) * 9,
    take: 9,
    include: {
      roomAmenities: true
    }
  })

  return {
    rooms: rooms.map((room) => ({
      ...room,
      amenitiesCount: room.roomAmenities.length,
    })),
    total,
    page: safePage,
    totalPages,
  }
}

const getRoomByIdUser = async (roomId: string) => {
  return await prisma.rooms.findUnique({
    where: { id: roomId },
    include: {
      roomAmenities: {
        include: {
          amenities: {
            select: { name: true }
          }
        }
      }
    }
  })
}

export { getAmenities, getRooms, PAGE_SIZE, getRoomById, getContacts, getAmenitiesAdmin, getAmenityById, getFeaturesRoomsUser, getRoomsUser, getRoomByIdUser }