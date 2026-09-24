import TableAmenities from '@/components/admin/amenity/TableAmenities'
import { getAmenitiesAdmin } from '@/lib/data'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Manage Amenities - HotelF',
  description: 'Kelola data fasilitas kamar.',
}

type ManageAmenitiesPageProps = {
  searchParams: Promise<{ search?: string; page?: string; success?: string }>
}

const successMessages: Record<string, string> = {
  created: 'Fasilitas berhasil ditambahkan.',
  updated: 'Fasilitas berhasil diperbarui.',
}

const ManageAmenitiesPage = async ({ searchParams }: ManageAmenitiesPageProps) => {
  const params = await searchParams
  const search = typeof params.search === 'string' ? params.search : ''
  const parsedPage = Number(params.page)
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? Math.floor(parsedPage) : 1
  const successMessage = typeof params.success === 'string' ? successMessages[params.success] : undefined

  const { amenities, total, page: currentPage, totalPages } = await getAmenitiesAdmin({ search, page })

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

        {/* Success banner */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
            {successMessage}
          </div>
        )}

        {/* Amenities Table */}
        <TableAmenities
          amenities={amenities}
          total={total}
          page={currentPage}
          totalPages={totalPages}
          search={search}
        />
      </div>
    </div>
  )
}

export default ManageAmenitiesPage
