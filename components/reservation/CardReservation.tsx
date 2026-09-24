'use client'
import { Rooms } from '@/app/generated/prisma/client'
import { addDays } from 'date-fns'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import { useActionState } from 'react'
import "react-datepicker/dist/react-datepicker.css"
import { createReservationAction } from '@/lib/action'

type FieldErrors = Record<string, string[]>

type ReservationState = {
  error?: string | FieldErrors
  values?: { name: string; phone: string }
  success?: string
} | null

const CardReservation = ({ room }: { room: Rooms }) => {
  const StartDate = new Date()
  const EndDate = addDays(StartDate, 1)

  const [starDate, setStarDate] = useState(StartDate)
  const [endDate, setEndDate] = useState(EndDate)

  const [state, formAction, isPending] = useActionState<ReservationState, FormData>(
    createReservationAction.bind(null, room.id, room.price, starDate, endDate),
    null,
  )

  const fieldError = (key: string) => {
    if (state?.error && typeof state.error === 'object' && state.error[key]) {
      return state.error[key][0]
    }
    return undefined
  }

  const values = state?.values

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates
    if (start) setStarDate(start)
    if (end) setEndDate(end)
  }

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-2xl shadow-sm p-8 sticky top-24">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Ringkasan Pemesanan
        </h3>

        <form action={formAction}>
          {state?.error && typeof state.error === 'string' && (
            <p className="p-4 mb-4 bg-red-50 rounded-lg text-sm text-red-600">
              {state.error}
            </p>
          )}
          {state?.error && typeof state.error === 'object' && fieldError('form') && (
            <p className="p-4 mb-4 bg-red-50 rounded-lg text-sm text-red-600">
              {fieldError('form')}
            </p>
          )}
          <div className="space-y-4 mb-8">
            <div className="py-3 m-0 border-b border-gray-100">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Arrival - Departure
              </label>
              <DatePicker
                selected={starDate}
                startDate={starDate}
                endDate={endDate}
                minDate={new Date()}
                selectsRange={true}
                dateFormat={"dd-MM-YYYY"}
                wrapperClassName='w-full'
                onChange={handleDateChange}
                className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors duration-200 text-sm'
              />
            </div>
            <div className="py-3 m-0 border-b border-gray-100">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={values?.name}
                placeholder="Contoh: Fikri Amrullah"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors duration-200 text-sm"
              />
              {fieldError('name') && (
                <span className="mt-1 block text-sm text-red-500">
                  {fieldError('name')}
                </span>
              )}
            </div>
            <div className="py-3 m-0 border-b border-gray-100">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                No Whatshapp
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                defaultValue={values?.phone}
                placeholder="Contoh: 085294532451"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors duration-200 text-sm"
              />
              {fieldError('phone') && (
                <span className="mt-1 block text-sm text-red-500">
                  {fieldError('phone')}
                </span>
              )}
            </div>
          </div>

          <button
            disabled={isPending}
            className="w-full py-3.5 bg-primary-500 text-white font-semibold rounded-lg shadow-lg shadow-primary-500/25 hover:bg-primary-600 hover:shadow-primary-500/35 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {isPending ? 'Memproses...' : 'Book Sekarang'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-4">
          Gratis pembatalan hingga 24 jam sebelum check-in
        </p>
      </div>
    </div>
  )
}

export default CardReservation