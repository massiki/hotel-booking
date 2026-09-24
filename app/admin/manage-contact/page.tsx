import TableContact from '@/components/admin/contact/TableContact'
import { getContacts } from '@/lib/data'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Manage Contact - HotelF',
  description: 'Kelola pesan masuk dari halaman contact.',
}

type ManageContactPageProps = {
  searchParams: Promise<{ search?: string; page?: string }>
}

const ManageContactPage = async ({ searchParams }: ManageContactPageProps) => {
  const params = await searchParams
  const search = typeof params.search === 'string' ? params.search : ''
  const parsedPage = Number(params.page)
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? Math.floor(parsedPage) : 1

  const { contacts, total, page: currentPage, totalPages } = await getContacts({ search, page })

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Contact</h1>
          <p className="text-gray-500 mt-1">
            Kelola pesan masuk dari halaman contact.
          </p>
        </div>

        {/* Messages Table */}
        <TableContact
          contacts={contacts}
          total={total}
          page={currentPage}
          totalPages={totalPages}
          search={search}
        />
      </div>
    </div>
  )
}

export default ManageContactPage
