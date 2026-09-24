import { Metadata } from 'next'
import Header from '@/components/Header'
import Card from '@/components/Card'
import SearchInput from '@/components/admin/room/SearchInput'
import Pagination from '@/components/admin/room/Pagination'
import CardSkeleton from '@/components/skeleton/CardSkeleton'
import { getRoomsUser } from '@/lib/data'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Kamar & Harga - HotelF',
  description:
    'Temukan berbagai pilihan kamar kami dari Standard Room hingga Suite Room. Harga transparan dan fasilitas premium untuk pengalaman menginap terbaik.',
}

type RoomsPageProps = {
  searchParams: Promise<{ search?: string; page?: string }>
}

const RoomsResults = async ({ search, page }: { search: string; page: number }) => {
  const { rooms, total, page: currentPage, totalPages } = await getRoomsUser({ search, page })

  return (
    <>
      <p className="text-sm text-gray-500 mb-6">
        {total} kamar ditemukan
      </p>

      {rooms.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm px-6 py-16 text-center">
          <p className="text-lg font-medium text-gray-900 mb-2">
            Tidak ada kamar ditemukan
          </p>
          {search && (
            <p className="text-sm text-gray-500">
              Coba kata kunci lain untuk pencarian &ldquo;{search}&rdquo;
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <Card
              key={room.id}
              id={room.id}
              name={room.name}
              price={room.price}
              capacity={room.capacity}
              image={room.image}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="mt-10 bg-white rounded-2xl shadow-sm">
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          search={search}
          basePath="/rooms"
        />
      </div>
    </>
  )
}

const RoomsGridSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {Array.from({ length: 9 }).map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
)

const RoomsPage = async ({ searchParams }: RoomsPageProps) => {
  const params = await searchParams
  const search = typeof params.search === 'string' ? params.search : ''
  const parsedPage = Number(params.page)
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? Math.floor(parsedPage) : 1

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

          {/* Search — luar Suspense, langsung interaktif */}
          <div className="mb-6">
            <SearchInput
              search={search}
              basePath="/rooms"
              placeholder="Cari nama kamar..."
            />
          </div>

          <Suspense
            key={`${search}-${page}`}
            fallback={<RoomsGridSkeleton />}
          >
            <RoomsResults search={search} page={page} />
          </Suspense>
        </div>
      </section>
    </>
  )
}

export default RoomsPage
