import { getDashboardData } from '@/lib/data'
import { formatDate } from '@/lib/utils'
import Image from 'next/image'
import clsx from 'clsx'
import { MdCalendarMonth } from 'react-icons/md'
import SearchInput from '../room/SearchInput'
import Pagination from '../room/Pagination'

type TableDashboardProps = {
  reservations: Awaited<ReturnType<typeof getDashboardData>>['reservations']
  total: number
  page: number
  totalPages: number
  search: string
}

const statusStyles: Record<string, string> = {
  paid: 'bg-green-100 text-green-700',
  unpaid: 'bg-yellow-100 text-yellow-700',
  failure: 'bg-red-100 text-red-700',
}

const statusLabels: Record<string, string> = {
  paid: 'Lunas',
  unpaid: 'Menunggu',
  failure: 'Gagal',
}

const TableDashboard = ({ reservations, total, page, totalPages, search }: TableDashboardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm">
      <div className="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-lg font-bold text-gray-900">
          Reservasi Terbaru ({total})
        </h2>
        <SearchInput
          search={search}
          basePath="/admin/dashboard"
          placeholder="Cari nama tamu / kamar..."
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-6 py-4 font-medium text-gray-500">
                Gambar
              </th>
              <th className="text-left px-6 py-4 font-medium text-gray-500">
                Tamu
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
            {reservations.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                  Tidak ada reservasi ditemukan
                </td>
              </tr>
            ) : (
              reservations.map((res) => (
                <tr
                  key={res.id}
                  className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                      <Image
                        src={res.rooms.image}
                        alt={res.rooms.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{res.name}</p>
                    <p className="mt-0.5 text-xs font-mono text-gray-400">
                      {res.id.slice(0, 8)}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{res.rooms.name}</td>
                  <td className="px-6 py-4 text-gray-700">
                    {formatDate(res.startAt)}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {formatDate(res.endAt)}
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-gray-900">
                    Rp {(res.payment?.amount ?? res.price).toLocaleString('id-ID')}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={clsx(
                        'inline-block px-3 py-1 rounded-full text-xs font-semibold',
                        res.payment ? statusStyles[res.payment.status] : 'bg-gray-100 text-gray-500',
                      )}
                    >
                      {res.payment ? statusLabels[res.payment.status] : '—'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination page={page} totalPages={totalPages} search={search} basePath="/admin/dashboard" />
    </div>
  )
}

export default TableDashboard
