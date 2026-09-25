import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import { MdArrowBack, MdOutlineDoneOutline } from 'react-icons/md'
import { getDisableDateRoomByid, getRoomByIdUser } from '@/lib/data'
import CardReservation from '@/components/reservation/CardReservation'

export async function generateMetadata({ params, }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const room = await getRoomByIdUser(id)

  if (!room) {
    return { title: 'Kamar Tidak Ditemukan - HotelF' }
  }

  return {
    title: `${room.name} - HotelF`,
    description: room.description.slice(0, 160),
  }
}

export default async function RoomDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [room, disabledDate] = await Promise.all([getRoomByIdUser(id), getDisableDateRoomByid(id)])
  if (!room) notFound()

  return (
    <>
      <Header
        title={room.name}
        subtitle="Nikmati kenyamanan dan kemewahan di setiap sudut kamar."
      />

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-500 transition-colors duration-200 mb-8 text-sm font-medium"
          >
            <MdArrowBack className="text-lg" />
            Kembali ke Daftar Kamar
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content — 2/3 */}
            <div className="lg:col-span-2 space-y-8">
              {/* Room Image */}
              <div className="relative h-100 md:h-125 rounded-2xl overflow-hidden shadow-md">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute top-4 right-4 bg-primary-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                  Rp {room.price.toLocaleString('id-ID')}/malam
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Tentang Kamar Ini
                </h2>
                <p className="text-gray-600 leading-relaxed text-[15px]">
                  {room.description}
                </p>
              </div>

              {/* Amenities */}
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Fasilitas Kamar
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {room.roomAmenities.map((item) => {
                    return (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                      >
                        <div className="shrink-0 w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                          <MdOutlineDoneOutline className="text-lg text-primary-500" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {item.amenities.name}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar — 1/3 */}
            <CardReservation room={room} disableDate={disabledDate} />
          </div>
        </div>
      </section>
    </>
  )
}
