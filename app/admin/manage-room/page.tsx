import { Metadata } from 'next'
import Image from 'next/image'
import { MdEdit, MdDelete, MdAdd } from 'react-icons/md'

export const metadata: Metadata = {
  title: 'Manage Room - HotelF',
  description: 'Kelola data kamar hotel Anda.',
}

const rooms = [
  {
    id: '1',
    name: 'Standard Room',
    image: '/hero.jpg',
    price: 800000,
    capacity: 2,
    amenitiesCount: 5,
    createdAt: '2026-09-01',
  },
  {
    id: '2',
    name: 'Deluxe Room',
    image: '/hero.jpg',
    price: 1500000,
    capacity: 2,
    amenitiesCount: 7,
    createdAt: '2026-09-01',
  },
  {
    id: '3',
    name: 'Suite Room',
    image: '/hero.jpg',
    price: 3000000,
    capacity: 4,
    amenitiesCount: 9,
    createdAt: '2026-09-01',
  },
  {
    id: '4',
    name: 'Standard Room',
    image: '/hero.jpg',
    price: 800000,
    capacity: 2,
    amenitiesCount: 4,
    createdAt: '2026-09-05',
  },
  {
    id: '5',
    name: 'Deluxe Room',
    image: '/hero.jpg',
    price: 1500000,
    capacity: 2,
    amenitiesCount: 6,
    createdAt: '2026-09-10',
  },
  {
    id: '6',
    name: 'Suite Room',
    image: '/hero.jpg',
    price: 3000000,
    capacity: 4,
    amenitiesCount: 8,
    createdAt: '2026-09-15',
  },
]

const ManageRoomPage = () => {
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
          <button className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary-500 text-white font-semibold rounded-lg shadow-sm shadow-primary-500/20 hover:bg-primary-600 hover:shadow-primary-500/30 transition-all duration-200 cursor-pointer">
            <MdAdd className="text-lg" />
            Tambah Kamar
          </button>
        </div>

        {/* Rooms Table */}
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">
              Daftar Kamar ({rooms.length})
            </h2>
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
                {rooms.map((room) => (
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
                      {new Date(room.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-200 cursor-pointer"
                          aria-label="Edit"
                        >
                          <MdEdit className="text-lg" />
                        </button>
                        <button
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors duration-200 cursor-pointer"
                          aria-label="Hapus"
                        >
                          <MdDelete className="text-lg" />
                        </button>
                      </div>
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

export default ManageRoomPage
