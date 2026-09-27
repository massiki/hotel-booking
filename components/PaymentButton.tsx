import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const PaymentButton = ({ reservationId }: { reservationId: string }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handlePayment = async () => {
    try {
      setIsLoading(true)

      if (!window.snap) {
        alert('Pembayaran belum siap, coba beberapa saat lagi')
        setIsLoading(false)
        return
      }

      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reservationId
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.error ?? "Gagal membuat pembayaran")
        setIsLoading(false)
        return
      }

      window.snap.pay(data.token, {
        onSuccess: () => {
          setIsLoading(false)
          router.push(`/reservation/${reservationId}`)
          setTimeout(() => router.refresh(), 2500)
          setTimeout(() => router.refresh(), 6000)
        },
        onPending: () => {
          setIsLoading(false)
          router.refresh()
        },
        onError: () => {
          setIsLoading(false)
          alert("Pembayaran gagal")
        },
        onClose: () => {
          setIsLoading(false)
        },
      })
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      alert("Terjadi kesalahan, coba lagi")
    }
  }

  return (
    <button
      onClick={handlePayment}
      disabled={isLoading}
      className="w-full py-3.5 bg-primary-500 text-white font-semibold rounded-lg shadow-lg shadow-primary-500/25 hover:bg-primary-600 hover:shadow-primary-500/35 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
    >
      {isLoading ? 'Memproses...' : 'Bayar Sekarang'}
    </button>
  )
}

export default PaymentButton
