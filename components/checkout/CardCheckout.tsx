'use client'
import { useActionState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MdArrowBack, MdCheckCircleOutline, MdOutlinePayments } from 'react-icons/md'
import { payReservationAction } from '@/lib/action'
import { formatDate } from '@/lib/utils'

type CheckoutReservation = {
  id: string
  name: string
  phone: string
  startAt: Date
  endAt: Date
  price: number
  rooms: {
    id: string
    name: string
    image: string
    price: number
  }
  payment: {
    id: string
    amount: number
    status: string
    method: string | null
  }
}

type PayState = {
  error?: string
  success?: string
} | null

const nightsBetween = (startAt: Date | string, endAt: Date | string) => {
  const start = new Date(startAt)
  const end = new Date(endAt)
  const diff = end.getTime() - start.getTime()
  return Math.max(1, Math.round(diff / 86_400_000))
}

const CardCheckout = ({ reservation }: { reservation: CheckoutReservation }) => {
  const [state, formAction, isPending] = useActionState<PayState, FormData>(
    payReservationAction.bind(null, reservation.id),
    null,
  )

  const isPaid = reservation.payment.status === 'paid'
  const paidViaAction = !!state?.success
  const showPaid = isPaid || paidViaAction
  const nights = nightsBetween(reservation.startAt, reservation.endAt)
  const checkIn = formatDate(reservation.startAt)
  const checkOut = formatDate(reservation.endAt)

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href={`/rooms/${reservation.rooms.id}`}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-500 transition-colors duration-200 mb-8 text-sm font-medium"
        >
          <MdArrowBack className="text-lg" />
          Kembali ke Detail Kamar
        </Link>

        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Selesaikan Pembayaran
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl text-[15px] leading-relaxed">
            Periksa detail reservasi Anda, lalu bayar untuk mengonfirmasi pemesanan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="relative h-56 md:h-72">
                <Image
                  src={reservation.rooms.image}
                  alt={reservation.rooms.name}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute top-4 right-4 bg-primary-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                  Rp {reservation.rooms.price.toLocaleString('id-ID')}/malam
                </div>
              </div>
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {reservation.rooms.name}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Reservasi atas nama {reservation.name}
                    </p>
                  </div>
                  <span
                    className={
                      showPaid
                        ? 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200'
                        : 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200'
                    }
                  >
                    {showPaid ? (
                      <MdCheckCircleOutline className="text-base" />
                    ) : (
                      <MdOutlinePayments className="text-base" />
                    )}
                    {showPaid ? 'Lunas' : 'Menunggu Pembayaran'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                      Check-in
                    </p>
                    <p className="text-sm font-semibold text-gray-900 tabular-nums">
                      {checkIn}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                      Check-out
                    </p>
                    <p className="text-sm font-semibold text-gray-900 tabular-nums">
                      {checkOut}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                      Durasi
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {nights} malam
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                      No. WhatsApp
                    </p>
                    <p className="text-sm font-semibold text-gray-900 tabular-nums">
                      {reservation.phone}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-xs text-gray-400 font-medium">
                    ID Reservasi
                  </p>
                  <p className="mt-1 text-sm font-mono text-gray-600 break-all">
                    {reservation.id}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-8 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Ringkasan Pembayaran
              </h3>

              {state?.error && (
                <p className="p-4 mb-4 bg-red-50 rounded-lg text-sm text-red-600">
                  {state.error}
                </p>
              )}
              {state?.success && (
                <p className="p-4 mb-4 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
                  {state.success}
                </p>
              )}

              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Harga per malam</span>
                  <span className="font-medium text-gray-900 tabular-nums">
                    Rp {reservation.rooms.price.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Durasi</span>
                  <span className="font-medium text-gray-900">
                    {nights} malam
                  </span>
                </div>
                <div className="flex justify-between gap-4 pt-3 border-t border-gray-100">
                  <span className="text-gray-500">Biaya layanan</span>
                  <span className="font-medium text-gray-900 tabular-nums">
                    Rp 0
                  </span>
                </div>
              </div>

              <div className="flex justify-between gap-4 py-4 border-y border-gray-100 mb-6">
                <span className="text-base font-bold text-gray-900">Total</span>
                <span className="text-base font-bold text-primary-600 tabular-nums">
                  Rp {reservation.payment.amount.toLocaleString('id-ID')}
                </span>
              </div>

              {showPaid ? (
                <div className="w-full flex items-center justify-center gap-2 py-3.5 bg-green-50 text-green-700 font-semibold rounded-lg border border-green-200 text-sm">
                  <MdCheckCircleOutline className="text-lg" />
                  Pembayaran Berhasil
                </div>
              ) : (
                <form action={formAction}>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full py-3.5 bg-primary-500 text-white font-semibold rounded-lg shadow-lg shadow-primary-500/25 hover:bg-primary-600 hover:shadow-primary-500/35 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {isPending ? 'Memproses...' : 'Bayar Sekarang'}
                  </button>
                </form>
              )}

              <p className="text-center text-xs text-gray-400 mt-4 leading-relaxed">
                Pembayaran mock — status langsung lunas setelah dikonfirmasi
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CardCheckout
