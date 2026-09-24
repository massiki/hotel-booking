import { Metadata } from 'next'
import { getAmenities, getRoomById } from '@/lib/data'
import Link from 'next/link'
import { MdArrowBack } from 'react-icons/md'
import EditForm from '@/components/admin/room/EditForm'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Ubah Kamar - HotelF',
  description: 'Ubah kamar yang sudah ada.',
}

const EditRoomPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const [amenities, room] = await Promise.all([getAmenities(), getRoomById(id)])
  if (!room) return notFound()

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back link */}
        <Link
          href="/admin/manage-room"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-500 transition-colors duration-200 mb-8 text-sm font-medium"
        >
          <MdArrowBack className="text-lg" />
          Kembali ke Manage Room
        </Link>

        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Ubah Kamar
          </h1>
          <p className="text-gray-500 text-sm mb-8">
            Isi form di bawah ini untuk mengubah kamar.
          </p>

          <EditForm amenities={amenities} room={room} />

        </div>
      </div>
    </div>
  )
}

export default EditRoomPage
