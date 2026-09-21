import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import {
  MdWifi,
  MdPool,
  MdTv,
  MdAcUnit,
  MdLocalLaundryService,
  MdCoffee,
  MdLocalParking,
  MdFitnessCenter,
  MdPeople,
  MdAttachMoney,
  MdArrowBack,
} from 'react-icons/md'

interface RoomDetail {
  id: string
  name: string
  description: string
  image: string
  price: number
  capacity: number
  amenities: string[]
}

const rooms: RoomDetail[] = [
  {
    id: '1',
    name: 'Standard Room',
    description:
      'Kamar nyaman dan bersih dengan pemandangan kamar yang menenangkan. Dirancang untuk memberikan kenyamanan dasar bagi tamu yang mencari akomodasi praktis tanpa mengorbankan kualitas. Dilengkapi dengan tempat tidur queen, area kerja kecil, dan kamar mandi pribadi dengan shower.',
    image: '/hero.jpg',
    price: 800000,
    capacity: 2,
    amenities: ['WiFi Gratis', 'TV LED 32"', 'AC', 'Kamar Mandi Pribadi', 'Tea & Coffee Maker'],
  },
  {
    id: '2',
    name: 'Deluxe Room',
    description:
      'Kamar premium dengan ruang yang lebih luas dan perabotan mewah. Nikmati pemandangan kota yang memukau dari jendela besar. Dilengkapi dengan tempat tidur king-size, sofa nyaman, area kerja ergonomis, dan kamar mandi marble dengan bathtub. Pilihan sempurna untuk perjalanan bisnis atau liburan spesial.',
    image: '/hero.jpg',
    price: 1500000,
    capacity: 2,
    amenities: ['WiFi Gratis', 'TV LED 43"', 'AC', 'Bathtub', 'Mini Bar', 'Safe Box', 'Robe & Slipper'],
  },
  {
    id: '3',
    name: 'Suite Room',
    description:
      'Suite mewah dengan ruang tamu terpisah dan pemandangan panoramic kota. Nikmati kemewahan ruang yang luas dengan perabotan premium, area makan untuk empat orang, dan kamar mandi marmar dengan shower rainfall dan bathtub terpisah. Termasuk akses Executive Lounge dengan sarapan gratis dan evening cocktail.',
    image: '/hero.jpg',
    price: 3000000,
    capacity: 4,
    amenities: ['WiFi Gratis', 'TV LED 55"', 'AC', 'Bathtub & Shower', 'Mini Bar', 'Safe Box', 'Robe & Slipper', 'Executive Lounge Access', 'Sarapan Gratis'],
  },
  {
    id: '4',
    name: 'Standard Room',
    description:
      'Kamar nyaman dan bersih dengan pemandangan kamar yang menenangkan. Dirancang untuk memberikan kenyamanan dasar bagi tamu yang mencari akomodasi praktis tanpa mengorbankan kualitas.',
    image: '/hero.jpg',
    price: 800000,
    capacity: 2,
    amenities: ['WiFi Gratis', 'TV LED 32"', 'AC', 'Kamar Mandi Pribadi'],
  },
  {
    id: '5',
    name: 'Deluxe Room',
    description:
      'Kamar premium dengan ruang yang lebih luas dan perabotan mewah. Nikmati pemandangan kota yang memukau dari jendela besar.',
    image: '/hero.jpg',
    price: 1500000,
    capacity: 2,
    amenities: ['WiFi Gratis', 'TV LED 43"', 'AC', 'Bathtub', 'Mini Bar'],
  },
  {
    id: '6',
    name: 'Suite Room',
    description:
      'Suite mewah dengan ruang tamu terpisah dan pemandangan panoramic kota. Nikmati kemewahan ruang yang luas dengan perabotan premium.',
    image: '/hero.jpg',
    price: 3000000,
    capacity: 4,
    amenities: ['WiFi Gratis', 'TV LED 55"', 'AC', 'Bathtub & Shower', 'Mini Bar', 'Executive Lounge Access'],
  },
]

const amenityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'WiFi Gratis': MdWifi,
  'TV LED 32"': MdTv,
  'TV LED 43"': MdTv,
  'TV LED 55"': MdTv,
  'AC': MdAcUnit,
  'Kamar Mandi Pribadi': MdLocalLaundryService,
  'Bathtub': MdPool,
  'Bathtub & Shower': MdPool,
  'Mini Bar': MdCoffee,
  'Safe Box': MdLocalParking,
  'Robe & Slipper': MdFitnessCenter,
  'Executive Lounge Access': MdFitnessCenter,
  'Sarapan Gratis': MdCoffee,
  'Tea & Coffee Maker': MdCoffee,
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const room = rooms.find((r) => r.id === id)

  if (!room) {
    return { title: 'Kamar Tidak Ditemukan - HotelF' }
  }

  return {
    title: `${room.name} - HotelF`,
    description: room.description.slice(0, 160),
  }
}

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const room = rooms.find((r) => r.id === id)

  if (!room) {
    notFound()
  }

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
              <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-md">
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
                  {room.amenities.map((amenity) => {
                    const Icon = amenityIcons[amenity] || MdFitnessCenter
                    return (
                      <div
                        key={amenity}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                      >
                        <div className="shrink-0 w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                          <Icon className="text-lg text-primary-500" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {amenity}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar — 1/3 */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm p-8 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Ringkasan Pemesanan
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <MdAttachMoney className="text-primary-500" />
                      Harga per malam
                    </div>
                    <span className="font-bold text-gray-900">
                      Rp {room.price.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <MdPeople className="text-primary-500" />
                      Kapasitas
                    </div>
                    <span className="font-bold text-gray-900">
                      {room.capacity} Orang
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <MdFitnessCenter className="text-primary-500" />
                      Fasilitas
                    </div>
                    <span className="font-bold text-gray-900">
                      {room.amenities.length} Fasilitas
                    </span>
                  </div>
                </div>

                <button className="w-full py-3.5 bg-primary-500 text-white font-semibold rounded-lg shadow-lg shadow-primary-500/25 hover:bg-primary-600 hover:shadow-primary-500/35 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer">
                  Book Sekarang
                </button>

                <p className="text-center text-xs text-gray-400 mt-4">
                  Gratis pembatalan hingga 24 jam sebelum check-in
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
