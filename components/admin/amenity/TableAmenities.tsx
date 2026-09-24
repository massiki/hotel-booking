import { getAmenitiesAdmin } from '@/lib/data'
import { formatDate } from '@/lib/utils'
import { MdAdd, MdEdit } from 'react-icons/md'
import Link from 'next/link'
import SearchInput from '../room/SearchInput'
import Pagination from '../room/Pagination'
import ButtonDeleteAmenity from './ButtonDeleteAmenity'

type TableAmenitiesProps = {
  amenities: Awaited<ReturnType<typeof getAmenitiesAdmin>>['amenities']
  total: number
  page: number
  totalPages: number
  search: string
}

const TableAmenities = ({ amenities, total, page, totalPages, search }: TableAmenitiesProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm">
      <div className="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-lg font-bold text-gray-900">
          Daftar Fasilitas ({total})
        </h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <SearchInput
            search={search}
            basePath="/admin/manage-amenities"
            placeholder="Cari nama fasilitas..."
          />
          <Link
            href="/admin/manage-amenities/create"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-500 text-white font-semibold text-sm rounded-lg shadow-sm shadow-primary-500/20 hover:bg-primary-600 hover:shadow-primary-500/30 transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            <MdAdd className="text-lg" />
            Tambah Fasilitas
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-6 py-4 font-medium text-gray-500">
                Nama
              </th>
              <th className="text-center px-6 py-4 font-medium text-gray-500">
                Dipakai
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
            {amenities.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                  Tidak ada fasilitas ditemukan
                </td>
              </tr>
            ) : (
              amenities.map((amenity) => (
                <tr
                  key={amenity.id}
                  className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {amenity.name}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-block px-2.5 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-semibold">
                      {amenity.roomCount} Kamar
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {formatDate(amenity.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={`/admin/manage-amenities/${amenity.id}/edit`}
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-200 cursor-pointer"
                        aria-label="Edit"
                      >
                        <MdEdit className="text-lg" />
                      </Link>
                      <ButtonDeleteAmenity amenityId={amenity.id} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        search={search}
        basePath="/admin/manage-amenities"
      />
    </div>
  )
}

export default TableAmenities
