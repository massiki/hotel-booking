import { Metadata } from 'next'
import {
  MdAttachMoney,
  MdEventSeat,
  MdHotel,
  MdPeople,
  MdCalendarMonth,
} from 'react-icons/md'

export const metadata: Metadata = {
  title: 'Dashboard Admin - HotelF',
  description: 'Ringkasan data dan statistik hotel Anda.',
}

const stats = [
  {
    icon: MdAttachMoney,
    value: 'Rp 45.500.000',
    label: 'Total Pendapatan',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  {
    icon: MdEventSeat,
    value: '128',
    label: 'Total Reservasi',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    icon: MdHotel,
    value: '24',
    label: 'Total Kamar',
    bgColor: 'bg-primary-50',
    iconColor: 'text-primary-600',
  },
  {
    icon: MdPeople,
    value: '356',
    label: 'Total Pengguna',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
]

const reservations = [
  {
    id: 'RSV-001',
    guestName: 'Budi Santoso',
    room: 'Suite Room',
    checkIn: '2026-09-25',
    checkOut: '2026-09-28',
    price: 9000000,
    status: 'confirmed',
  },
  {
    id: 'RSV-002',
    guestName: 'Siti Rahayu',
    room: 'Deluxe Room',
    checkIn: '2026-09-26',
    checkOut: '2026-09-27',
    price: 1500000,
    status: 'pending',
  },
  {
    id: 'RSV-003',
    guestName: 'Andi Wijaya',
    room: 'Standard Room',
    checkIn: '2026-09-24',
    checkOut: '2026-09-26',
    price: 1600000,
    status: 'confirmed',
  },
  {
    id: 'RSV-004',
    guestName: 'Dewi Lestari',
    room: 'Suite Room',
    checkIn: '2026-09-20',
    checkOut: '2026-09-23',
    price: 9000000,
    status: 'cancelled',
  },
  {
    id: 'RSV-005',
    guestName: 'Rizki Pratama',
    room: 'Deluxe Room',
    checkIn: '2026-09-27',
    checkOut: '2026-09-29',
    price: 3000000,
    status: 'confirmed',
  },
]

const statusStyles: Record<string, string> = {
  confirmed: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  cancelled: 'bg-red-100 text-red-700',
}

const statusLabels: Record<string, string> = {
  confirmed: 'Dikonfirmasi',
  pending: 'Menunggu',
  cancelled: 'Dibatalkan',
}

const DashboardPage = () => {
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
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`shrink-0 w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}
                >
                  <stat.icon className={`text-xl ${stat.iconColor}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Reservations Table */}
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">
              Reservasi Terbaru
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-6 py-4 font-medium text-gray-500">
                    ID
                  </th>
                  <th className="text-left px-6 py-4 font-medium text-gray-500">
                    Nama Tamu
                  </th>
                  <th className="text-left px-6 py-4 font-medium text-gray-500">
                    Kamar
                  </th>
                  <th className="text-left px-6 py-4 font-medium text-gray-500">
                    <span className="flex items-center gap-1">
                      <MdCalendarMonth className="text-base" />
                      Check-in
                    </span>
                  </th>
                  <th className="text-left px-6 py-4 font-medium text-gray-500">
                    <span className="flex items-center gap-1">
                      <MdCalendarMonth className="text-base" />
                      Check-out
                    </span>
                  </th>
                  <th className="text-right px-6 py-4 font-medium text-gray-500">
                    Harga
                  </th>
                  <th className="text-center px-6 py-4 font-medium text-gray-500">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((res) => (
                  <tr
                    key={res.id}
                    className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {res.id}
                    </td>
                    <td className="px-6 py-4 text-gray-700">{res.guestName}</td>
                    <td className="px-6 py-4 text-gray-700">{res.room}</td>
                    <td className="px-6 py-4 text-gray-700">
                      {new Date(res.checkIn).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {new Date(res.checkOut).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-gray-900">
                      Rp {res.price.toLocaleString('id-ID')}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[res.status]}`}
                      >
                        {statusLabels[res.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
