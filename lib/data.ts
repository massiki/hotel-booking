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

export { getAmenities, getRooms, PAGE_SIZE, getRoomById }