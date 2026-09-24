'use client'
import { useState, useRef, useTransition, useActionState } from 'react'
import { BarLoader, MoonLoader } from "react-spinners";

import Link from 'next/link'
import clsx from 'clsx'
import {
  MdCloudUpload,
  MdClose,
  MdAdd,
} from 'react-icons/md'
import { PutBlobResult } from '@vercel/blob'
import Image from 'next/image'
import { FormRoomProps } from '@/types/amenities'
import { createRoomAction } from '@/lib/action';

const CreateForm = ({ amenities }: FormRoomProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [image, setImage] = useState("")
  const [isTransition, startTransition] = useTransition()
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [state, formAction, isPending] = useActionState(createRoomAction.bind(null, image), null)

  const removeImage = () => {
    const currentImage = image
    setImage("")
    setUploadError(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
    if (!currentImage) return

    startTransition(async () => {
      try {
        const response = await fetch('/api/upload', {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: currentImage
          })
        })
        if (!response.ok) {
          const data = await response.json()
          setUploadError(data.error ?? "Gagal menghapus gambar.")
        }
      } catch (error) {
        console.error(error)
        setUploadError("Gagal menghapus gambar.")
      }
    })
  }

  const toggleAmenity = (id: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    )
  }

  const handleUpload = () => {
    if (!fileInputRef.current?.files) return null
    const fileImg = fileInputRef.current.files[0]
    const formData = new FormData()
    formData.set('image', fileImg)
    setUploadError(null)

    startTransition(async () => {
      try {
        const response = await fetch('/api/upload', {
          method: "POST",
          body: formData
        })
        const data = await response.json()
        if (!response.ok) {
          setUploadError(data.error ?? "Upload gagal. Coba lagi.")
          if (fileInputRef.current) fileInputRef.current.value = ""
          return
        }
        const img = data as PutBlobResult
        setImage(img.url)
        if (fileInputRef.current) fileInputRef.current.value = ""
      } catch (error) {
        throw error
      }
    })
  }

  return (
    <form action={formAction} className="space-y-6">
      {state?.error?.form && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {state.error.form[0]}
        </div>
      )}

      {/* Nama Kamar */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Nama Kamar
        </label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={state?.values?.name}
          placeholder="Contoh: Deluxe Room"
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors duration-200 text-sm"
        />
        {state?.error?.name && (
          <span className="mt-1 text-sm text-red-500">
            {state?.error?.name[0]}
          </span>
        )}
      </div>

      {/* Deskripsi */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Deskripsi
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={state?.values?.description}
          placeholder="Deskripsikan kamar ini..."
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors duration-200 text-sm resize-none"
        />
        {state?.error?.description && (
          <span className="mt-1 text-sm text-red-500">
            {state?.error?.description[0]}
          </span>
        )}
      </div>

      {/* Harga & Kapasitas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Harga per Malam (Rp)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            min={0}
            defaultValue={state?.values?.price}
            placeholder="800000"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors duration-200 text-sm"
          />
          {state?.error?.price && (
            <span className="mt-1 text-sm text-red-500">
              {state?.error?.price[0]}
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="capacity"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Kapasitas (Orang)
          </label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            min={1}
            defaultValue={state?.values?.capacity}
            placeholder="2"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors duration-200 text-sm"
          />
          {state?.error?.capacity && (
            <span className="mt-1 text-sm text-red-500">
              {state?.error?.capacity[0]}
            </span>
          )}
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Gambar Kamar
        </label>
        {image ? (
          <div className="relative inline-block w-full h-64">
            <Image
              src={image}
              fill
              alt="Preview Image"
              className="w-full h-full object-cover rounded-xl"
            />
            <button
              type="button"
              onClick={removeImage}
              className={clsx("absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 cursor-pointer", { "opacity-50": isPending })}
            >
              <MdClose className="text-sm" />
            </button>
            {isTransition && (
              <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 bg-primary-50 rounded-full'>
                <MoonLoader color="#c2410c" />
              </div>
            )}
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-64 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-primary-400 hover:bg-primary-50/50 transition-colors duration-200"
          >
            {isTransition && <BarLoader color="#f97316" />}
            <MdCloudUpload className="text-4xl text-gray-400" />
            <p className="text-sm text-gray-500">
              Klik untuk upload gambar
            </p>
            <p className="text-xs text-gray-400">PNG, JPG, WebP (max 4MB)</p>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />
        {uploadError && (
          <span className="mt-1 block text-sm text-red-500">
            {uploadError}
          </span>
        )}
        {state?.error?.image && (
          <span className="mt-1 block text-sm text-red-500">
            {state?.error?.image[0]}
          </span>
        )}
      </div>

      {/* Amenities */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Fasilitas
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {amenities.map((amenity) => (
            <label
              key={amenity.id}
              className={clsx(
                'flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200',
                selectedAmenities.includes(amenity.id)
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 bg-gray-50 hover:border-gray-300'
              )}
            >
              <input
                type="checkbox"
                name='amenities'
                checked={selectedAmenities.includes(amenity.id)}
                value={amenity.id}
                onChange={() => toggleAmenity(amenity.id)}
                className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">{amenity.name}</span>
            </label>
          ))}
        </div>
        {state?.error?.amenities && (
          <span className="mt-1 text-sm text-red-500">
            {state.error.amenities[0]}
          </span>
        )}
      </div>

      {/* Submit */}
      <div className="flex items-center gap-4 pt-4">
        <button
          type="submit"
          disabled={isPending || isTransition}
          className={clsx(
            'inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary-500 text-white font-semibold rounded-lg shadow-lg shadow-primary-500/25 hover:bg-primary-600 hover:shadow-primary-500/35 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer',
            { 'cursor-progress opacity-50': isPending || isTransition }
          )}
        >
          <MdAdd className="text-lg" />
          {isPending || isTransition ? 'Mengupload...' : 'Tambah Kamar'}
        </button>
        <Link
          href="/admin/manage-room"
          className="px-6 py-3.5 border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:border-gray-300 transition-colors duration-200"
        >
          Batal
        </Link>
      </div>
    </form>
  )
}

export default CreateForm
