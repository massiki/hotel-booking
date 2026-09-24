import TableRoom from '@/components/admin/room/TableRoom'
import { getRooms } from '@/lib/data'
import { Metadata } from 'next'
import Link from 'next/link'
import { MdAdd } from 'react-icons/md'

export const metadata: Metadata = {
  title: 'Manage Room - HotelF',
  description: 'Kelola data kamar hotel Anda.',
}

type ManageRoomPageProps = {
  searchParams: Promise<{ search?: string; page?: string; success?: string }>
}

const successMessages: Record<string, string> = {
  created: 'Kamar berhasil ditambahkan.',
  updated: 'Kamar berhasil diperbarui.',
}

const ManageRoomPage = async ({ searchParams }: ManageRoomPageProps) => {
  const params = await searchParams
  const search = typeof params.search === 'string' ? params.search : ''
  const parsedPage = Number(params.page)
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? Math.floor(parsedPage) : 1
  const successMessage = typeof params.success === 'string' ? successMessages[params.success] : undefined

  const { rooms, total, page: currentPage, totalPages } = await getRooms({ search, page })

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Room</h1>
            <p className="text-gray-500 mt-1">
              Kelola data kamar hotel Anda.
            </p>
          </div>
          <Link href={"/admin/manage-room/create"} className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary-500 text-white font-semibold rounded-lg shadow-sm shadow-primary-500/20 hover:bg-primary-600 hover:shadow-primary-500/30 transition-all duration-200 cursor-pointer">
            <MdAdd className="text-lg" />
            Tambah Kamar
          </Link>
        </div>

        {/* Success banner */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
            {successMessage}
          </div>
        )}

        {/* Rooms Table */}
        <TableRoom
          rooms={rooms}
          total={total}
          page={currentPage}
          totalPages={totalPages}
          search={search}
        />

      </div>
    </div>
  )
}

export default ManageRoomPage
