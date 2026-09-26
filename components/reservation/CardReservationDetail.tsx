import Link from 'next/link'
import { differenceInCalendarDays } from 'date-fns'
import clsx from 'clsx'
import {
  MdCheckCircleOutline,
  MdClose,
  MdOutlinePayments,
} from 'react-icons/md'
import { formatDate, formatDateTime } from '@/lib/utils'
import { getReservationDetail } from '@/lib/data'

type ReservationDetail = NonNullable<Awaited<ReturnType<typeof getReservationDetail>>>

type CardReservationDetailProps = {
  reservation: ReservationDetail
}

const statusBadge = (status: string | null) => {
  if (status === 'paid') {
    return {
      label: 'Lunas',
      icon: <MdCheckCircleOutline className="text-sm" />,
      className: 'bg-green-50 text-green-700 border border-green-200',
    }
  }
  if (status === 'failure') {
    return {
      label: 'Pembayaran Gagal',
      icon: <MdClose className="text-sm" />,
      className: 'bg-red-50 text-red-600 border border-red-200',
    }
  }
  if (status === 'unpaid') {
    return {
      label: 'Menunggu Pembayaran',
      icon: <MdOutlinePayments className="text-sm" />,
      className: 'bg-amber-50 text-amber-700 border border-amber-200',
    }
  }
  return {
    label: '—',
    icon: null,
    className: 'bg-gray-100 text-gray-500 border border-gray-200',
  }
}

const Field = ({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) => (
  <div>
    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">
      {label}
    </p>
    <p
      className={clsx(
        'text-sm font-semibold text-gray-900',
        mono ? 'font-mono break-all' : 'tabular-nums',
      )}
    >
      {value}
    </p>
  </div>
)

const CardReservationDetail = ({ reservation }: CardReservationDetailProps) => {
  const { rooms, payment, user } = reservation
  const isPaid = payment?.status === 'paid'
  const isSettleable = !isPaid
  const nights = differenceInCalendarDays(reservation.endAt, reservation.startAt)
  const subtotal = payment?.amount ?? reservation.price * Math.max(1, nights)
  const badge = statusBadge(payment?.status ?? null)

  const methodLabel = payment
    ? payment.method === 'mock'
      ? 'Mock Gateway'
      : (payment.method ?? '—')
    : '—'

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* Receipt header — striped strip */}
      <div className="relative bg-primary-500 px-6 md:px-8 py-4 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent_0px,transparent_10px,rgba(255,255,255,0.10)_10px,rgba(255,255,255,0.10)_20px)]"
        />
        <div className="relative flex items-center justify-between gap-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
            HotelF · Kwitansi Reservasi
          </p>
          <p className="text-xs font-mono text-white/80">
            #{reservation.id.slice(0, 8)}
          </p>
        </div>
      </div>

      <div className="p-6 md:p-8">
        {/* Two-column info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
          <div className="space-y-6">
            <Field label="Reservation ID" value={reservation.id} mono />
            <Field label="Book Date" value={formatDateTime(reservation.createdAt)} />
            <Field label="Name" value={reservation.name} />
            <Field label="Email" value={user.email ?? '—'} />
          </div>
          <div className="space-y-6">
            <Field label="Phone" value={reservation.phone} />
            <Field label="Payment Method" value={methodLabel} />
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">
                Payment Status
              </p>
              <span
                className={clsx(
                  'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold',
                  badge.className,
                )}
              >
                {badge.icon}
                {badge.label}
              </span>
            </div>
          </div>
        </div>

        {/* Itemized table */}
        <div className="mt-7 border-t-2 border-dashed border-gray-200 pt-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-130">
              <thead>
                <tr className="text-left text-xs text-gray-500 uppercase tracking-wide">
                  <th className="pb-3 font-medium">Room</th>
                  <th className="pb-3 font-medium">Arrival</th>
                  <th className="pb-3 font-medium">Departure</th>
                  <th className="pb-3 font-medium">Duration</th>
                  <th className="pb-3 font-medium text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-100">
                  <td className="py-4 font-semibold text-gray-900">{rooms.name}</td>
                  <td className="py-4 text-gray-700 tabular-nums">
                    {formatDate(reservation.startAt)}
                  </td>
                  <td className="py-4 text-gray-700 tabular-nums">
                    {formatDate(reservation.endAt)}
                  </td>
                  <td className="py-4 text-gray-700">{nights} malam</td>
                  <td className="py-4 text-right font-semibold text-gray-900 tabular-nums">
                    Rp {subtotal.toLocaleString('id-ID')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Total */}
        <div className="mt-5 border-t-2 border-dashed border-gray-200 pt-5 flex items-center justify-between gap-4">
          <span className="text-base font-bold text-gray-900">Total</span>
          <span className="text-xl font-bold text-primary-600 tabular-nums">
            Rp {subtotal.toLocaleString('id-ID')}
          </span>
        </div>

        {/* Action */}
        <div className="mt-7">
          {isSettleable ? (
            <Link
              href={`/checkout/${reservation.id}`}
              className="block w-full py-3.5 bg-primary-500 text-white text-center font-semibold rounded-lg shadow-lg shadow-primary-500/25 hover:bg-primary-600 hover:shadow-primary-500/35 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Bayar Sekarang
            </Link>
          ) : (
            <div className="w-full flex items-center justify-center gap-2 py-3.5 bg-green-50 text-green-700 font-semibold rounded-lg border border-green-200 text-sm">
              <MdCheckCircleOutline className="text-lg" />
              Pembayaran Berhasil
            </div>
          )}
        </div>
      </div>

      {/* Receipt footer — striped rule */}
      <div className="border-t border-dashed border-gray-200 px-6 md:px-8 py-4 flex items-center justify-between gap-4">
        <p className="text-[11px] font-mono uppercase tracking-widest text-gray-400">
          Terima kasih atas reservasi Anda
        </p>
        <div
          aria-hidden="true"
          className="h-6 w-24 shrink-0 bg-[repeating-linear-gradient(90deg,rgba(17,24,39,0.65)_0px,rgba(17,24,39,0.65)_2px,transparent_2px,transparent_4px,rgba(17,24,39,0.65)_4px,rgba(17,24,39,0.65)_5px,transparent_5px,transparent_9px)]"
        />
      </div>
    </div>
  )
}

export default CardReservationDetail
