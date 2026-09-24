"use client"
import { useActionState } from "react"
import Link from "next/link"
import clsx from "clsx"
import { createAmenityAction, updateAmenityAction } from "@/lib/action"

type AmenityFormProps = {
  mode: "create" | "edit"
  amenityId?: string
  defaultName?: string
}

const AmenityForm = ({ mode, amenityId, defaultName = "" }: AmenityFormProps) => {
  const action =
    mode === "create"
      ? createAmenityAction
      : updateAmenityAction.bind(null, amenityId!)

  const [state, formAction, isPending] = useActionState(action, null)

  return (
    <form action={formAction} className="space-y-6">
      {state?.error?.form && (
        <p className="p-5 bg-red-50 rounded-lg text-sm text-red-600">
          {state.error.form[0]}
        </p>
      )}

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Nama Fasilitas
        </label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={state?.values?.name ?? defaultName}
          placeholder="Contoh: WiFi Gratis"
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors duration-200 text-sm"
        />
        {state?.error?.name && (
          <span className="mt-1 block text-sm text-red-500">
            {state.error.name[0]}
          </span>
        )}
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className={clsx(
            "px-5 py-2.5 bg-primary-500 text-white font-semibold rounded-lg",
            "shadow-sm shadow-primary-500/20 hover:bg-primary-600 hover:shadow-primary-500/30",
            "transition-all duration-200",
            isPending ? "cursor-progress opacity-60" : "cursor-pointer"
          )}
        >
          {isPending ? "Menyimpan..." : "Simpan"}
        </button>
        <Link
          href="/admin/manage-amenities"
          className="px-5 py-2.5 border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:border-gray-300 transition-colors duration-200"
        >
          Batal
        </Link>
      </div>
    </form>
  )
}

export default AmenityForm
