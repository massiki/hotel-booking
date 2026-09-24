"use server"
import { contactSchema, roomSchema, amenitySchema } from "@/lib/zod"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { del } from "@vercel/blob"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

const requireAdmin = async () => {
  const session = await auth()
  if (!session?.user || session.user.role !== "admin") {
    return false
  }
  return true
}

const contactAction = async (prevState: unknown, formData: FormData) => {
  const values = {
    name: String(formData.get("name") ?? ""),
    subject: String(formData.get("subject") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  }

  const data = {
    name: formData.get("name"),
    subject: formData.get("subject"),
    email: formData.get("email"),
    message: formData.get("message"),
  }

  const validated = contactSchema.safeParse(data)
  if (!validated.success) {
    return {
      error: validated.error.flatten().fieldErrors as Record<string, string[]>,
      values,
    }
  }

  try {
    await prisma.contact.create({
      data: {
        name: validated.data.name,
        email: validated.data.email,
        subject: validated.data.subject,
        message: validated.data.message,
      }
    })
    return { success: "Pesan Telah Terkirim" }
  } catch (error) {
    console.error(error)
    return {
      error: { form: ["Gagal mengirim pesan. Coba lagi."] } as Record<string, string[]>,
      values,
    }
  }
}

const createRoomAction = async (image: string, prevState: unknown, formData: FormData) => {
  const values = {
    name: String(formData.get('name') ?? ''),
    description: String(formData.get('description') ?? ''),
    price: String(formData.get('price') ?? ''),
    capacity: String(formData.get('capacity') ?? ''),
  }

  if (!(await requireAdmin())) {
    return {
      error: { form: ["Tidak diizinkan"] } as Record<string, string[]>,
      values,
    }
  }

  const data = {
    name: formData.get('name'),
    description: formData.get('description'),
    image: image,
    price: Number(formData.get('price')),
    capacity: Number(formData.get('capacity')),
    amenities: formData.getAll('amenities'),
  }

  const result = roomSchema.safeParse(data)
  if (!result.success) {
    return {
      error: result.error.flatten().fieldErrors as Record<string, string[]>,
      values,
    }
  }

  try {
    const amenityCount = await prisma.amenities.count({
      where: { id: { in: result.data.amenities } },
    })
    if (amenityCount !== result.data.amenities.length) {
      return {
        error: { amenities: ["Ada fasilitas yang tidak valid"] } as Record<string, string[]>,
        values,
      }
    }

    await prisma.rooms.create({
      data: {
        name: result.data.name,
        description: result.data.description,
        image: result.data.image,
        price: result.data.price,
        capacity: result.data.capacity,
        roomAmenities: {
          createMany: {
            data: result.data.amenities.map((item) => ({
              amenityId: item
            }))
          }
        }
      },
    })
  } catch (error) {
    console.error(error)
    return {
      error: { form: ["Gagal menyimpan kamar. Coba lagi."] } as Record<string, string[]>,
      values,
    }
  }

  redirect('/admin/manage-room?success=created')
}

const updateRoomAction = async (image: string, roomId: string, prevState: unknown, formData: FormData) => {
  const values = {
    name: String(formData.get('name') ?? ''),
    description: String(formData.get('description') ?? ''),
    price: String(formData.get('price') ?? ''),
    capacity: String(formData.get('capacity') ?? ''),
  }

  if (!(await requireAdmin())) {
    return {
      error: { form: ["Tidak diizinkan"] } as Record<string, string[]>,
      values,
    }
  }

  const data = {
    name: formData.get('name'),
    description: formData.get('description'),
    image: image,
    price: Number(formData.get('price')),
    capacity: Number(formData.get('capacity')),
    amenities: formData.getAll('amenities'),
  }

  const validated = roomSchema.safeParse(data)
  if (!validated.success) {
    return {
      error: validated.error.flatten().fieldErrors as Record<string, string[]>,
      values,
    }
  }

  try {
    const existingRoom = await prisma.rooms.findUnique({
      where: { id: roomId },
      select: { image: true },
    })
    if (!existingRoom) {
      return {
        error: { form: ["Kamar tidak ditemukan"] } as Record<string, string[]>,
        values,
      }
    }

    const amenityCount = await prisma.amenities.count({
      where: { id: { in: validated.data.amenities } },
    })
    if (amenityCount !== validated.data.amenities.length) {
      return {
        error: { amenities: ["Ada fasilitas yang tidak valid"] } as Record<string, string[]>,
        values,
      }
    }

    await prisma.$transaction([
      prisma.rooms.update({
        where: { id: roomId },
        data: {
          name: validated.data.name,
          description: validated.data.description,
          image: validated.data.image,
          price: validated.data.price,
          capacity: validated.data.capacity,
        },
      }),
      prisma.roomAmenities.deleteMany({
        where: { roomId },
      }),
      prisma.roomAmenities.createMany({
        data: validated.data.amenities.map((amenityId) => ({
          roomId,
          amenityId,
        })),
      }),
    ])

    if (existingRoom.image && existingRoom.image !== validated.data.image) {
      try {
        await del(existingRoom.image)
      } catch (error) {
        console.error("Gagal menghapus gambar lama:", error)
      }
    }
  } catch (error) {
    console.error(error)
    return {
      error: { form: ["Gagal menyimpan kamar. Coba lagi."] } as Record<string, string[]>,
      values,
    }
  }

  revalidatePath('/admin/manage-room')
  redirect('/admin/manage-room?success=updated')
}

const deleteRoomAction = async (roomId: string) => {
  if (!(await requireAdmin())) {
    return { error: "Tidak diizinkan" }
  }

  let roomImage: string | null = null

  try {
    const room = await prisma.rooms.findUnique({
      where: { id: roomId },
      include: { _count: { select: { reservations: true } } },
    })
    if (!room) return { error: "Kamar tidak ditemukan" }

    if (room._count.reservations > 0) {
      return { error: "Kamar memiliki riwayat reservasi dan tidak bisa dihapus" }
    }

    await prisma.rooms.delete({ where: { id: roomId } })
    roomImage = room.image
  } catch (error) {
    console.error(error)
    return { error: "Gagal menghapus kamar. Coba lagi." }
  }

  try {
    if (roomImage) {
      await del(roomImage)
    }
  } catch (error) {
    console.error("Gagal menghapus gambar blob:", error)
  }

  revalidatePath('/admin/manage-room')
  return { success: "Kamar berhasil dihapus" }
}

const deleteContactAction = async (contactId: string) => {
  const isAdmin = await requireAdmin()
  if (!isAdmin) {
    return { error: "Tidak diizinkan" }
  }

  try {
    await prisma.contact.delete({ where: { id: contactId } })
  } catch (error) {
    console.error(error)
    return { error: "Gagal menghapus pesan. Coba lagi." }
  }

  revalidatePath('/admin/manage-contact')
  return { success: "Pesan berhasil dihapus" }
}

const createAmenityAction = async (prevState: unknown, formData: FormData) => {
  const values = {
    name: String(formData.get("name") ?? ""),
  }

  if (!(await requireAdmin())) {
    return {
      error: { form: ["Tidak diizinkan"] } as Record<string, string[]>,
      values,
    }
  }

  const validated = amenitySchema.safeParse({ name: formData.get("name") })
  if (!validated.success) {
    return {
      error: validated.error.flatten().fieldErrors as Record<string, string[]>,
      values,
    }
  }

  try {
    const duplicate = await prisma.amenities.findFirst({
      where: { name: { equals: validated.data.name, mode: "insensitive" } },
      select: { id: true },
    })
    if (duplicate) {
      return {
        error: { name: ["Nama fasilitas sudah ada"] } as Record<string, string[]>,
        values,
      }
    }

    await prisma.amenities.create({ data: { name: validated.data.name } })
  } catch (error) {
    console.error(error)
    return {
      error: { form: ["Gagal menyimpan fasilitas. Coba lagi."] } as Record<string, string[]>,
      values,
    }
  }

  redirect('/admin/manage-amenities?success=created')
}

const updateAmenityAction = async (amenityId: string, prevState: unknown, formData: FormData) => {
  const values = {
    name: String(formData.get("name") ?? ""),
  }

  if (!(await requireAdmin())) {
    return {
      error: { form: ["Tidak diizinkan"] } as Record<string, string[]>,
      values,
    }
  }

  const validated = amenitySchema.safeParse({ name: formData.get("name") })
  if (!validated.success) {
    return {
      error: validated.error.flatten().fieldErrors as Record<string, string[]>,
      values,
    }
  }

  try {
    const existing = await prisma.amenities.findUnique({
      where: { id: amenityId },
      select: { id: true },
    })
    if (!existing) {
      return {
        error: { form: ["Fasilitas tidak ditemukan"] } as Record<string, string[]>,
        values,
      }
    }

    const duplicate = await prisma.amenities.findFirst({
      where: {
        name: { equals: validated.data.name, mode: "insensitive" },
        id: { not: amenityId },
      },
      select: { id: true },
    })
    if (duplicate) {
      return {
        error: { name: ["Nama fasilitas sudah ada"] } as Record<string, string[]>,
        values,
      }
    }

    await prisma.amenities.update({
      where: { id: amenityId },
      data: { name: validated.data.name },
    })
  } catch (error) {
    console.error(error)
    return {
      error: { form: ["Gagal menyimpan fasilitas. Coba lagi."] } as Record<string, string[]>,
      values,
    }
  }

  revalidatePath('/admin/manage-amenities')
  redirect('/admin/manage-amenities?success=updated')
}

const deleteAmenityAction = async (amenityId: string) => {
  if (!(await requireAdmin())) {
    return { error: "Tidak diizinkan" }
  }

  try {
    const amenity = await prisma.amenities.findUnique({
      where: { id: amenityId },
      include: { _count: { select: { roomAmenities: true } } },
    })
    if (!amenity) return { error: "Fasilitas tidak ditemukan" }

    if (amenity._count.roomAmenities > 0) {
      return {
        error: `Fasilitas masih digunakan ${amenity._count.roomAmenities} kamar dan tidak bisa dihapus`,
      }
    }

    await prisma.amenities.delete({ where: { id: amenityId } })
  } catch (error) {
    console.error(error)
    return { error: "Gagal menghapus fasilitas. Coba lagi." }
  }

  revalidatePath('/admin/manage-amenities')
  return { success: "Fasilitas berhasil dihapus" }
}

export {
  contactAction,
  createRoomAction,
  updateRoomAction,
  deleteRoomAction,
  deleteContactAction,
  createAmenityAction,
  updateAmenityAction,
  deleteAmenityAction,
}
