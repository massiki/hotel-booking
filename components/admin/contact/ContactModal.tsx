"use client"
import { useEffect } from "react"
import { formatDateTime } from "@/lib/utils"
import { MdClose } from "react-icons/md"
import clsx from "clsx"

type Contact = {
  id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: Date
}

type ContactModalProps = {
  contact: Contact | null
  onClose: () => void
}

const ContactModal = ({ contact, onClose }: ContactModalProps) => {
  useEffect(() => {
    if (!contact) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [contact, onClose])

  if (!contact) return null

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div
        className="w-full max-w-lg bg-white rounded-2xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-gray-100">
          <div className="min-w-0">
            <h2
              id="contact-modal-title"
              className="text-lg font-bold text-gray-900 break-words"
            >
              {contact.subject}
            </h2>
            <p className="mt-1 text-sm text-gray-500 break-words">
              {contact.name} &middot; {contact.email}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className={clsx(
              "shrink-0 p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100",
              "rounded-lg transition-colors duration-200 cursor-pointer"
            )}
          >
            <MdClose className="text-xl" />
          </button>
        </div>

        <div className="px-6 py-5">
          <p className="text-xs font-medium text-gray-400 mb-2">
            {formatDateTime(contact.createdAt)}
          </p>
          <p className="text-sm text-gray-700 whitespace-pre-wrap break-words leading-relaxed">
            {contact.message}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ContactModal
