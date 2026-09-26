import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { MdArrowBack } from 'react-icons/md'
import { getReservationDetail } from '@/lib/data'
import CardReservationDetail from '@/components/reservation/CardReservationDetail'
import ReservationDetailSkeleton from '@/components/skeleton/ReservationDetailSkeleton'

export const metadata: Metadata = {
  title: 'Detail Reservasi - HotelF',
  description: 'Lihat kwitansi lengkap reservasi Anda: data pemesan, detail kamar, dan status pembayaran.',
}

const ReservationDetail = async ({ id }: { id: string }) => {
  const reservation = await getReservationDetail(id)

  if (!reservation) notFound()

  return <CardReservationDetail reservation={reservation} />
}

const ReservationDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  return (
    <section className="pt-28 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/reservation"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-500 transition-colors duration-200 mb-6 text-sm font-medium"
        >
          <MdArrowBack className="text-lg" />
          Kembali ke Reservasi
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Detail Reservasi
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl text-[15px] leading-relaxed">
            Kwitansi lengkap reservasi Anda — periksa data pemesan dan status pembayaran.
          </p>
        </div>

        <Suspense key={id} fallback={<ReservationDetailSkeleton />}>
          <ReservationDetail id={id} />
        </Suspense>
      </div>
    </section>
  )
}

export default ReservationDetailPage
