import { getRooms } from '@/lib/data'
import { formatDate } from '@/lib/utils'
import Image from 'next/image'
import { MdEdit } from 'react-icons/md'
import SearchInput from './SearchInput'
import Pagination from './Pagination'
import ButtonDelete from './ButtonDelete'
import Link from 'next/link'

type TableRoomProps = {
  rooms: Awaited<ReturnType<typeof getRooms>>['rooms']
  total: number
  page: number
  totalPages: number
  search: string
}

const TableRoom = ({ rooms, total, page, totalPages, search }: TableRoomProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm">
      <div className="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-lg font-bold text-gray-900">
          Daftar Kamar ({total})
        </h2>
        <SearchInput search={search} />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-6 py-4 font-medium text-gray-500">
                Gambar
              </th>
              <th className="text-left px-6 py-4 font-medium text-gray-500">
                Nama
              </th>
              <th className="text-right px-6 py-4 font-medium text-gray-500">
                Harga
              </th>
              <th className="text-center px-6 py-4 font-medium text-gray-500">
                Kapasitas
              </th>
              <th className="text-center px-6 py-4 font-medium text-gray-500">
                Fasilitas
              </th>
              <th className="text-left px-6 py-4 font-medium text-gray-500">
                Dibuat
              </th>
              <th className="text-center px-6 py-4 font-medium text-gray-500">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {rooms.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                  Tidak ada kamar ditemukan
                </td>
              </tr>
            ) : (
              rooms.map((room) => (
                <tr
                  key={room.id}
                  className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                      <Image
                        src={room.image}
                        alt={room.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {room.name}
                  </td>
                  <td className="px-6 py-4 text-right text-gray-700">
                    Rp {room.price.toLocaleString('id-ID')}/malam
                  </td>
                  <td className="px-6 py-4 text-center text-gray-700">
                    {room.capacity} Orang
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-block px-2.5 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-semibold">
                      {room.amenitiesCount} Fasilitas
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {formatDate(room.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Link href={`/admin/manage-room/${room.id}/edit`}
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-200 cursor-pointer"
                        aria-label="Edit"
                      >
                        <MdEdit className="text-lg" />
                      </Link>
                      <ButtonDelete roomId={room.id} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination page={page} totalPages={totalPages} search={search} />
    </div>
  )
}

export default TableRoom
