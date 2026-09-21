import { email, object, string } from "zod";

const contactSchema = object({
  name: string().min(2, "Nama minimal 2 karakter").max(100, "Nama maksimal 100 karakter"),
  subject: string().min(3, 'Subjek minimal 3 karakter'),
  email: email("Format Email tidak valid"),
  message: string().min(10, "Message minimal 10 karakter")
})

export { contactSchema }