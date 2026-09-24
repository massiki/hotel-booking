import { email, object, string, array, url, coerce } from "zod";

const contactSchema = object({
  name: string().min(2, "Nama minimal 2 karakter").max(100, "Nama maksimal 100 karakter"),
  subject: string().min(3, 'Subjek minimal 3 karakter').max(255, "Subjek maksimal 255 karakter"),
  email: email("Format Email tidak valid").max(255, "Email maksimal 255 karakter"),
  message: string().min(10, "Message minimal 10 karakter").max(2000, "Pesan maksimal 2000 karakter")
})

const roomSchema = object({
  name: string().min(2, "Nama kamar minimal 2 karakter").max(100, "Nama kamar maksimal 100 karakter"),
  description: string().min(10, "Deskripsi minimal 10 karakter"),
  image: url("URL gambar tidak valid").refine(
    (value) => {
      try {
        const parsed = new URL(value)
        return parsed.protocol === "https:" && parsed.hostname.endsWith(".public.blob.vercel-storage.com")
      } catch {
        return false
      }
    },
    "URL gambar tidak diizinkan"
  ),
  price: coerce.number().int("Harga harus bilangan bulat").min(1, "Harga tidak boleh kosong").max(2_147_483_647, "Harga terlalu besar"),
  capacity: coerce.number().int("Kapasitas harus bilangan bulat").min(1, "Kapasitas minimal 1 orang").max(1000, "Kapasitas terlalu besar"),
  amenities: array(string())
    .nonempty("Amenitily pilih salah satu")
    .max(50, "Maksimal 50 fasilitas")
    .transform((items) => [...new Set(items)]),
})

const amenitySchema = object({
  name: string()
    .min(2, "Nama fasilitas minimal 2 karakter")
    .max(100, "Nama fasilitas maksimal 100 karakter"),
})

const reservasionSchema = object({
  name: string().min(2, "Nama minimal 2 karakter").max(100, "Nama maksimal 100 karakter"),
  phone: string().min(1, "Nomor harus diisi").max(15, "Nomor maksimal 15 angka").regex(/^08\d+$/, "Nomor telepon harus diawali 08"),
})

export { contactSchema, roomSchema, amenitySchema, reservasionSchema }
