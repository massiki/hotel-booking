import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { differenceInCalendarDays } from 'date-fns'
import { MdCheckCircleOutline, MdClose, MdOutlinePayments } from 'react-icons/md'
import { Prisma } from '@/app/generated/prisma/client'
import { formatDate, formatDateTime } from '@/lib/utils'

type ReservationWithRoom = Prisma.ReservationsGetPayload<{
  include: {
    rooms: true
    payment: true
  }
}>

type ReservationCardProps = {
  reservation: ReservationWithRoom
}

const ReservationCard = ({ reservation }: ReservationCardProps) => {
  const { rooms, payment } = reservation
  const isPaid = payment?.status === 'paid'
  const isFailure = payment?.status === 'failure'
  const nights = differenceInCalendarDays(reservation.endAt, reservation.startAt)

  const badge = isPaid
    ? {
        label: 'Lunas',
        icon: <MdCheckCircleOutline className="text-base" />,
        className: 'bg-green-50 text-green-700 border border-green-200',
      }
    : isFailure
      ? {
          label: 'Pembayaran Gagal',
          icon: <MdClose className="text-base" />,
          className: 'bg-red-50 text-red-600 border border-red-200',
        }
      : {
          label: 'Menunggu Pembayaran',
          icon: <MdOutlinePayments className="text-base" />,
          className: 'bg-amber-50 text-amber-700 border border-amber-200',
        }

  return (
    <article className="bg-white rounded-2xl shadow-sm p-5 md:p-6 flex flex-col md:flex-row gap-5">
      <div className="relative w-full md:w-52 h-44 md:h-36 shrink-0 rounded-xl overflow-hidden">
        <Image
          src={rooms.image}
          alt={rooms.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 208px"
        />
      </div>

      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-gray-900 truncate">
              <Link
                href={`/rooms/${rooms.id}`}
                className="hover:text-primary-500 transition-colors duration-200"
              >
                {rooms.name}
              </Link>
            </h3>
            <p className="mt-1 text-xs font-mono text-gray-400 break-all">
              {reservation.id}
            </p>
          </div>
          <span
            className={clsx(
              'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shrink-0',
              badge.className,
            )}
          >
            {badge.icon}
            {badge.label}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
          <div className="p-3 bg-gray-50 rounded-xl">
            <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wide mb-1">
              Check-in
            </p>
            <p className="text-sm font-semibold text-gray-900 tabular-nums">
              {formatDate(reservation.startAt)}
            </p>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl">
            <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wide mb-1">
              Check-out
            </p>
            <p className="text-sm font-semibold text-gray-900 tabular-nums">
              {formatDate(reservation.endAt)}
            </p>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl">
            <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wide mb-1">
              Durasi
            </p>
            <p className="text-sm font-semibold text-gray-900">
              {nights} malam
            </p>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs text-gray-500">
              Total · Dibuat {formatDateTime(reservation.createdAt)}
            </p>
            <p className="text-lg font-bold text-primary-600 tabular-nums">
              {payment ? `Rp ${payment.amount.toLocaleString('id-ID')}` : '—'}
            </p>
          </div>

          {isPaid ? (
            <Link
              href={`/rooms/${rooms.id}`}
              className="inline-flex items-center justify-center px-5 py-2.5 border-2 border-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:border-primary-500 hover:text-primary-500 transition-colors duration-200"
            >
              Lihat Detail
            </Link>
          ) : (
            <Link
              href={`/checkout/${reservation.id}`}
              className="inline-flex items-center justify-center px-5 py-2.5 bg-primary-500 text-white text-sm font-semibold rounded-lg shadow-md shadow-primary-500/20 hover:bg-primary-600 transition-colors duration-200"
            >
              Bayar Sekarang
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}

export default ReservationCard
