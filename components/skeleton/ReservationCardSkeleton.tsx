const ReservationCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 md:p-6 flex flex-col md:flex-row gap-5">
      <div className="w-full md:w-52 h-44 md:h-36 shrink-0 rounded-xl bg-gray-200 animate-pulse" />

      <div className="flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex-1 space-y-2">
            <div className="h-5 w-2/5 rounded bg-gray-200 animate-pulse" />
            <div className="h-3 w-1/3 rounded bg-gray-200 animate-pulse" />
          </div>
          <div className="h-7 w-32 rounded-full bg-gray-200 animate-pulse" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
          <div className="h-16 rounded-xl bg-gray-200 animate-pulse" />
          <div className="h-16 rounded-xl bg-gray-200 animate-pulse" />
          <div className="h-16 rounded-xl bg-gray-200 animate-pulse" />
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
          <div className="space-y-2">
            <div className="h-3 w-40 rounded bg-gray-200 animate-pulse" />
            <div className="h-5 w-28 rounded bg-gray-200 animate-pulse" />
          </div>
          <div className="h-10 w-36 rounded-lg bg-gray-200 animate-pulse" />
        </div>
      </div>
    </div>
  )
}

export default ReservationCardSkeleton
