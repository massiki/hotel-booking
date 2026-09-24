'use client'
import { useState } from 'react'
import { formatDateTime } from '@/lib/utils'
import SearchInput from '../room/SearchInput'
import Pagination from '../room/Pagination'
import ButtonDeleteContact from './ButtonDeleteContact'
import ContactModal from './ContactModal'
import clsx from 'clsx'

type Contact = {
  id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: Date
}

type TableContactProps = {
  contacts: Contact[]
  total: number
  page: number
  totalPages: number
  search: string
}

const TableContact = ({ contacts, total, page, totalPages, search }: TableContactProps) => {
  const [selected, setSelected] = useState<(typeof contacts)[number] | null>(null)

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm">
        <div className="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-lg font-bold text-gray-900">
            Daftar Pesan ({total})
          </h2>
          <SearchInput
            search={search}
            basePath="/admin/manage-contact"
            placeholder="Cari nama, email, atau subjek..."
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-4 font-medium text-gray-500">
                  Nama
                </th>
                <th className="text-left px-6 py-4 font-medium text-gray-500">
                  Email
                </th>
                <th className="text-left px-6 py-4 font-medium text-gray-500">
                  Subjek
                </th>
                <th className="text-left px-6 py-4 font-medium text-gray-500">
                  Pesan
                </th>
                <th className="text-left px-6 py-4 font-medium text-gray-500">
                  Dibuat
                </th>
                <th className="text-center px-6 py-4 font-medium text-gray-500">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {contacts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                    Tidak ada pesan ditemukan
                  </td>
                </tr>
              ) : (
                contacts.map((contact) => (
                  <tr
                    key={contact.id}
                    className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {contact.name}
                    </td>
                    <td className="px-6 py-4 text-gray-700 break-all">
                      {contact.email}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {contact.subject}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      <button
                        type="button"
                        onClick={() => setSelected(contact)}
                        title={contact.message}
                        className={clsx(
                          "block max-w-56 text-left cursor-pointer",
                          "line-clamp-2 text-left",
                          "hover:text-primary-600 transition-colors duration-150",
                          "underline decoration-transparent underline-offset-2 hover:decoration-primary-300"
                        )}
                      >
                        {contact.message}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-gray-700 whitespace-nowrap">
                      {formatDateTime(contact.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <ButtonDeleteContact contactId={contact.id} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          page={page}
          totalPages={totalPages}
          search={search}
          basePath="/admin/manage-contact"
        />
      </div>

      <ContactModal contact={selected} onClose={() => setSelected(null)} />
    </>
  )
}

export default TableContact
