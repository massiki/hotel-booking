import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getReservationCheckout } from '@/lib/data'
import CardCheckout from '@/components/checkout/CardCheckout'

export const metadata: Metadata = {
  title: 'Checkout - HotelF',
  description: 'Selesaikan pembayaran reservasi kamar hotel Anda.',
}

export default async function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const reservation = await getReservationCheckout(id)

  if (!reservation) notFound()

  return <CardCheckout reservation={reservation} />
}
