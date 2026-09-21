import { Metadata } from 'next'
import Header from '@/components/Header'
import Card from '@/components/Card'

const rooms = [
  {
    id: '1',
    name: 'Standard Room',
    price: 800000,
    adults: 2,
  },
  {
    id: '2',
    name: 'Deluxe Room',
    price: 1500000,
    adults: 2,
  },
  {
    id: '3',
    name: 'Suite Room',
    price: 3000000,
    adults: 4,
  },
  {
    id: '4',
    name: 'Standard Room',
    price: 800000,
    adults: 2,
  },
  {
    id: '5',
    name: 'Deluxe Room',
    price: 1500000,
    adults: 2,
  },
  {
    id: '6',
    name: 'Suite Room',
    price: 3000000,
    adults: 4,
  },
]

export const metadata: Metadata = {
  title: 'Kamar & Harga - HotelF',
  description:
    'Temukan berbagai pilihan kamar kami dari Standard Room hingga Suite Room. Harga transparan dan fasilitas premium untuk pengalaman menginap terbaik.',
}

const RoomsPage = () => {
  return (
    <>
      <Header
        title="Kamar & Harga"
        subtitle="Pilih kamar sesuai kebutuhan dan budget Anda. Semua kamar kami dirancang untuk kenyamanan maksimal."
      />

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pilihan Kamar
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nikmati kemewahan dan kenyamanan di setiap kamar yang kami
              sediakan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <Card
                key={room.id}
                id={room.id}
                name={room.name}
                price={room.price}
                adults={room.adults}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default RoomsPage
