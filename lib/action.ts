"use server"
import { contactSchema } from "@/lib/zod"
import { prisma } from "@/lib/prisma"

const contactAction = async (prevState: unknown, formDate: FormData) => {
  const data = {
    name: formDate.get('name'),
    subject: formDate.get('subject'),
    email: formDate.get('email'),
    message: formDate.get('message'),
  }
  const result = contactSchema.safeParse(data)

  if (!result.success) {
    return { error: result.error.flatten().fieldErrors }
  }

  try {
    await prisma.contact.create({
      data: {
        name: result.data.name,
        email: result.data.email,
        subject: result.data.subject,
        message: result.data.message,
      }
    })
    return { success: "Pesan Telah Terkirim" }
  } catch (error) {
    throw error
  }
}

export { contactAction }