import Link from 'next/link'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

type PaginationProps = {
  page: number
  totalPages: number
  search: string
}

const buildHref = (targetPage: number, search: string) => {
  const params = new URLSearchParams()
  const trimmed = search.trim()
  if (trimmed) params.set('search', trimmed)
  if (targetPage > 1) params.set('page', String(targetPage))

  const query = params.toString()
  return query ? `/admin/manage-room?${query}` : '/admin/manage-room'
}

const Pagination = ({ page, totalPages, search }: PaginationProps) => {
  const isFirst = page <= 1
  const isLast = page >= totalPages

  const buttonClass = "inline-flex items-center gap-1 px-4 py-2 border-2 border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:border-gray-300 transition-colors duration-200 cursor-pointer"

  return (
    <div className="flex items-center justify-between gap-4 px-6 py-4 border-t border-gray-100">
      {isFirst ? (
        <span className={`${buttonClass} opacity-40 cursor-not-allowed hover:border-gray-200`}>
          <MdChevronLeft className="text-lg" />
          Sebelumnya
        </span>
      ) : (
        <Link href={buildHref(page - 1, search)} className={buttonClass}>
          <MdChevronLeft className="text-lg" />
          Sebelumnya
        </Link>
      )}

      <span className="text-sm text-gray-500">
        Halaman {page} dari {totalPages}
      </span>

      {isLast ? (
        <span className={`${buttonClass} opacity-40 cursor-not-allowed hover:border-gray-200`}>
          Berikutnya
          <MdChevronRight className="text-lg" />
        </span>
      ) : (
        <Link href={buildHref(page + 1, search)} className={buttonClass}>
          Berikutnya
          <MdChevronRight className="text-lg" />
        </Link>
      )}
    </div>
  )
}

export default Pagination
