import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { auth } from '@/auth'
import { getReservationUser } from '@/lib/data'
import { notFound } from 'next/navigation'
import ReservationCard from '@/components/reservation/ReservationCard'
import ReservationCardSkeleton from '@/components/skeleton/ReservationCardSkeleton'
import Pagination from '@/components/admin/room/Pagination'

export const metadata: Metadata = {
  title: 'Reservasi Saya - HotelF',
  description: 'Lihat daftar reservasi kamar Anda, cek status pembayaran, dan selesaikan pembayaran yang tertunda.',
}

const ReservationList = async ({ userId, page }: { userId: string; page: number }) => {
  const data = await getReservationUser({ userId, page })
  if (!data) return null

  const { reservations, total, page: currentPage, totalPages } = data

  if (reservations.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm px-6 py-16 text-center">
        <p className="text-lg font-medium text-gray-900 mb-2">
          Belum ada reservasi
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Pesan kamar dulu untuk mulai menginap.
        </p>
        <Link
          href="/rooms"
          className="inline-flex items-center justify-center px-6 py-3 bg-primary-500 text-white text-sm font-semibold rounded-lg shadow-md shadow-primary-500/20 hover:bg-primary-600 transition-colors duration-200"
        >
          Lihat Kamar
        </Link>
      </div>
    )
  }

  return (
    <>
      <p className="text-sm text-gray-500 mb-6">
        {total} reservasi ditemukan
      </p>

      <div className="space-y-6">
        {reservations.map((reservation) => (
          <ReservationCard key={reservation.id} reservation={reservation} />
        ))}
      </div>

      <div className="mt-10 bg-white rounded-2xl shadow-sm">
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          search=""
          basePath="/reservation"
        />
      </div>
    </>
  )
}

const ReservationListSkeleton = () => (
  <div className="space-y-6">
    {Array.from({ length: 3 }).map((_, i) => (
      <ReservationCardSkeleton key={i} />
    ))}
  </div>
)

const ReservationPage = async ({ searchParams }: { searchParams: Promise<{ page?: string }> }) => {
  const session = await auth()
  if (!session?.user?.id) notFound()
  const userId = session.user.id

  const { page } = await searchParams
  const parsedPage = Number(page) || 1

  return (
    <section className="pt-28 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Reservasi Saya
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl text-[15px] leading-relaxed">
            Pantau status reservasi dan pembayaran Anda di sini.
          </p>
        </div>

        <Suspense
          key={parsedPage}
          fallback={<ReservationListSkeleton />}
        >
          <ReservationList userId={userId} page={parsedPage} />
        </Suspense>
      </div>
    </section>
  )
}

export default ReservationPage
