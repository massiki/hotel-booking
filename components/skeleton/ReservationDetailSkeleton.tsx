const ReservationDetailSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* Header strip */}
      <div className="h-13 bg-gray-200 animate-pulse" />

      <div className="p-6 md:p-8">
        {/* Two-column info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
          <div className="space-y-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 w-24 rounded bg-gray-200 animate-pulse" />
                <div className="h-4 w-40 rounded bg-gray-200 animate-pulse" />
              </div>
            ))}
          </div>
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 w-24 rounded bg-gray-200 animate-pulse" />
                <div className="h-4 w-32 rounded bg-gray-200 animate-pulse" />
              </div>
            ))}
            <div className="space-y-2">
              <div className="h-3 w-24 rounded bg-gray-200 animate-pulse" />
              <div className="h-7 w-36 rounded-full bg-gray-200 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Itemized table */}
        <div className="mt-7 border-t-2 border-dashed border-gray-200 pt-6">
          <div className="space-y-3">
            <div className="h-3 w-full rounded bg-gray-200 animate-pulse" />
            <div className="h-4 w-3/4 rounded bg-gray-200 animate-pulse" />
          </div>
        </div>

        {/* Total */}
        <div className="mt-5 border-t-2 border-dashed border-gray-200 pt-5 flex items-center justify-between gap-4">
          <div className="h-5 w-16 rounded bg-gray-200 animate-pulse" />
          <div className="h-6 w-36 rounded bg-gray-200 animate-pulse" />
        </div>

        {/* Action */}
        <div className="mt-7 h-12 w-full rounded-lg bg-gray-200 animate-pulse" />
      </div>

      {/* Footer strip */}
      <div className="border-t border-dashed border-gray-200 px-6 md:px-8 py-4 flex items-center justify-between gap-4">
        <div className="h-3 w-56 rounded bg-gray-200 animate-pulse" />
        <div className="h-6 w-24 shrink-0 rounded bg-gray-200 animate-pulse" />
      </div>
    </div>
  )
}

export default ReservationDetailSkeleton
