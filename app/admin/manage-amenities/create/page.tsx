import { Metadata } from 'next'
import Link from 'next/link'
import { MdArrowBack } from 'react-icons/md'
import AmenityForm from '@/components/admin/amenity/AmenityForm'

export const metadata: Metadata = {
  title: 'Tambah Fasilitas - HotelF',
  description: 'Tambahkan fasilitas baru ke dalam sistem.',
}

const CreateAmenityPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back link */}
        <Link
          href="/admin/manage-amenities"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-500 transition-colors duration-200 mb-8 text-sm font-medium"
        >
          <MdArrowBack className="text-lg" />
          Kembali ke Manage Amenities
        </Link>

        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Tambah Fasilitas Baru
          </h1>
          <p className="text-gray-500 text-sm mb-8">
            Isi form di bawah ini untuk menambahkan fasilitas baru.
          </p>

          <AmenityForm mode="create" />
        </div>
      </div>
    </div>
  )
}

export default CreateAmenityPage
