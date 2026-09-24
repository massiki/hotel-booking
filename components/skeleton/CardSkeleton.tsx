import React from 'react'

const CardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md">
      {/* Image */}
      <div className="h-56 bg-gray-200 animate-pulse" />

      {/* Content */}
      <div className="p-5 space-y-4">
        <div className="h-6 w-2/3 rounded bg-gray-200 animate-pulse" />
        <div className="h-4 w-1/3 rounded bg-gray-200 animate-pulse" />
        <div className="h-11 w-full rounded-lg bg-gray-200 animate-pulse" />
      </div>
    </div>
  )
}

export default CardSkeleton
