'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { MdSearch } from 'react-icons/md'

const SearchInput = ({ search }: { search: string }) => {
  const router = useRouter()
  const [value, setValue] = useState(search)

  useEffect(() => {
    if (value.trim() === search.trim()) return

    const timer = setTimeout(() => {
      const params = new URLSearchParams()
      const trimmed = value.trim()
      if (trimmed) params.set('search', trimmed)

      const query = params.toString()
      router.replace(query ? `/admin/manage-room?${query}` : '/admin/manage-room', { scroll: false })
    }, 400)

    return () => clearTimeout(timer)
  }, [value, search, router])

  return (
    <div className="relative w-full sm:w-72">
      <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Cari nama kamar..."
        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors duration-200 text-sm"
      />
    </div>
  )
}

export default SearchInput
