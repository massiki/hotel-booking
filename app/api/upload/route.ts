import { put, del } from "@vercel/blob"
import { NextResponse } from "next/server"
import { auth } from "@/auth"

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"]
const MAX_FILE_SIZE = 4_000_000
const BLOB_HOST_SUFFIX = ".public.blob.vercel-storage.com"

const requireAdmin = async () => {
  const session = await auth()
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 })
  }
  return null
}

const isAllowedBlobUrl = (url: string) => {
  try {
    const parsed = new URL(url)
    return parsed.protocol === "https:" && parsed.hostname.endsWith(BLOB_HOST_SUFFIX)
  } catch {
    return false
  }
}

const POST = async (req: Request) => {
  const unauthorized = await requireAdmin()
  if (unauthorized) return unauthorized

  const form = await req.formData()
  const file = form.get("image")

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "File harus di upload" }, { status: 400 })
  }

  if (file.size === 0) {
    return NextResponse.json({ error: "File harus di upload" }, { status: 400 })
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "File maksimal 4MB" }, { status: 400 })
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "File harus berupa gambar (JPG, PNG, atau WebP)" },
      { status: 400 }
    )
  }

  const safeName = file.name.replace(/[/\\]/g, "_")

  try {
    const blob = await put(safeName, file, {
      access: "public",
      multipart: true,
      allowOverwrite: false,
      addRandomSuffix: true,
    })
    return Response.json(blob)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Upload gagal. Coba lagi." }, { status: 500 })
  }
}

const DELETE = async (req: Request) => {
  const unauthorized = await requireAdmin()
  if (unauthorized) return unauthorized

  let url: unknown
  try {
    const body = await req.json()
    url = body.url
  } catch {
    return NextResponse.json({ error: "Request tidak valid" }, { status: 400 })
  }

  if (typeof url !== "string" || url.length === 0) {
    return NextResponse.json({ error: "Image tidak ketemu" }, { status: 400 })
  }

  if (!isAllowedBlobUrl(url)) {
    return NextResponse.json({ error: "URL gambar tidak diizinkan" }, { status: 400 })
  }

  try {
    await del(url)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Gagal menghapus gambar" }, { status: 500 })
  }

  return NextResponse.json({ success: "Image berhasil dihapus" })
}

export { POST, DELETE }
