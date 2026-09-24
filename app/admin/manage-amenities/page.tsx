import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Manage Amenities - HotelF',
  description: 'Kelola data fasilitas kamar.',
}

const ManageAmenitiesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Amenities</h1>
          <p className="text-gray-500 mt-1">
            Kelola data fasilitas kamar.
          </p>
        </div>

        {/* Placeholder */}
        <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
          <p className="text-gray-500">
            Halaman ini sedang disiapkan.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ManageAmenitiesPage
