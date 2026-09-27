"use client"
import { useActionState } from "react"
import { cancelReservationAction } from "@/lib/action"
import { MdClose } from "react-icons/md"

type CancelButtonProps = {
  reservationId: string
}

const CancelButton = ({ reservationId }: CancelButtonProps) => {
  const [state, formAction, isPending] = useActionState(async () => {
    return await cancelReservationAction(reservationId)
  }, null)

  return (
    <form action={formAction} className="mt-3">
      <button
        type="submit"
        disabled={isPending}
        onClick={(e) => {
          if (!confirm("Yakin membatalkan reservasi ini?")) {
            e.preventDefault()
          }
        }}
        className="w-full py-3 border-2 border-gray-200 text-gray-600 text-sm font-semibold rounded-lg hover:border-red-300 hover:text-red-600 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        <span className="inline-flex items-center justify-center gap-2">
          <MdClose className="text-base" />
          {isPending ? "Membatalkan..." : "Batalkan Reservasi"}
        </span>
      </button>
      {state?.error && (
        <p className="mt-2 text-xs text-red-500 text-center">{state.error}</p>
      )}
    </form>
  )
}

export default CancelButton
