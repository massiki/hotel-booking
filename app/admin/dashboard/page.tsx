import CardDashboard from '@/components/admin/dashboard/CardDashboard'
import TableDashboard from '@/components/admin/dashboard/TableDashboard'
import { getDashboardData } from '@/lib/data'
import { Metadata } from 'next'
import {
  MdAttachMoney,
  MdEventSeat,
  MdHotel,
  MdPeople,
} from 'react-icons/md'

export const metadata: Metadata = {
  title: 'Dashboard Admin - HotelF',
  description: 'Ringkasan data dan statistik hotel Anda.',
}

type DashboardPageProps = {
  searchParams: Promise<{ search?: string; page?: string }>
}

const DashboardPage = async ({ searchParams }: DashboardPageProps) => {
  const params = await searchParams
  const search = typeof params.search === 'string' ? params.search : ''
  const parsedPage = Number(params.page)
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? Math.floor(parsedPage) : 1

  const { reservations, total, page: currentPage, totalPages, totalRevenue, totalReservations, totalRooms, totalUsers } = await getDashboardData({ search, page })
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Ringkasan data hotel Anda hari ini.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <CardDashboard icon={MdAttachMoney} bgColor='bg-green-50' iconColor='text-green-600' label='Total Pendapatan' value={`Rp ${totalRevenue.toLocaleString('id-ID')}`} />
          <CardDashboard icon={MdEventSeat} bgColor='bg-blue-50' iconColor='text-blue-600' label='Total Reservasi' value={totalReservations} />
          <CardDashboard icon={MdHotel} bgColor='bg-primary-50' iconColor='text-primary-600' label='Total Kamar' value={totalRooms} />
          <CardDashboard icon={MdPeople} bgColor='bg-purple-50' iconColor='text-purple-600' label='Total Pengguna' value={totalUsers} />
        </div>

        {/* Reservations Table */}
        <TableDashboard
          reservations={reservations}
          total={total}
          page={currentPage}
          totalPages={totalPages}
          search={search}
        />
      </div>
    </div>
  )
}

export default DashboardPage
