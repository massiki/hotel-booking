"use client"
import { useActionState } from "react"
import { deleteRoomAction } from "@/lib/action"
import { MdDelete } from "react-icons/md"
import clsx from "clsx"

const ButtonDelete = ({ roomId }: { roomId: string }) => {
  const [state, formAction, isPending] = useActionState(async () => {
    return await deleteRoomAction(roomId)
  }, null)

  return (
    <form action={formAction} className="inline-flex flex-col items-start">
      <button
        type="submit"
        disabled={isPending}
        onClick={(e) => {
          if (!confirm("Yakin Menghapus kamar ini?")) {
            e.preventDefault()
          }
        }}
        className={clsx(
          "p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors duration-200",
          isPending ? "cursor-progress opacity-50" : "cursor-pointer"
        )}
        aria-label="Hapus"
      >
        <MdDelete className="text-lg" />
      </button>
      {state?.error && (
        <span className="mt-1 text-xs text-red-500 whitespace-nowrap">{state.error}</span>
      )}
    </form>
  )
}

export default ButtonDelete
