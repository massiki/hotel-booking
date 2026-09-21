'use client'
import {
  MdLocationOn,
  MdPhone,
  MdEmail,
  MdAccessTime,
  MdSend,
} from 'react-icons/md'
import { contactAction } from '@/lib/action'
import { useActionState, useState } from 'react'
import clsx from 'clsx'

const contactInfo = [
  {
    icon: MdLocationOn,
    label: 'Alamat',
    value: 'Kp. Cigadot Rt.01 Rw.10 Kec. Cibiuk Kab. Garut',
  },
  {
    icon: MdPhone,
    label: 'Telepon',
    value: '+62 852 9453 2451',
  },
  {
    icon: MdEmail,
    label: 'Email',
    value: 'fikri.amrulloh15@gmail.com',
  },
  {
    icon: MdAccessTime,
    label: 'Jam Operasional',
    value: '24 Jam / 7 Hari',
  },
]

const FormContact = () => {
  const [state, formAction, isPanding] = useActionState(contactAction, null)

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form — 3/5 width */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Kirim Pesan
              </h2>
              <p className="text-gray-500 text-sm mb-8">
                Isi form di bawah ini dan kami akan membalas sesegera mungkin.
              </p>
              {state?.success && (
                <p className="p-5 mb-4 bg-green-100 rounded text-sm text-green-700">
                  {state?.success}
                </p>
              )}
              <form action={formAction} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Masukkan nama Anda"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors duration-200 text-sm"
                    />
                    {state?.error?.name && (
                      <span className="mt-1 text-sm text-red-500">
                        {state?.error?.name[0]}
                      </span>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Masukkan email Anda"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors duration-200 text-sm"
                    />
                    {state?.error?.email && (
                      <span className="mt-1 text-sm text-red-500">
                        {state?.error?.email[0]}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Subjek
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Perihal pesan Anda"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors duration-200 text-sm"
                  />
                  {state?.error?.subject && (
                    <span className="mt-1 text-sm text-red-500">
                      {state.error.subject[0]}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Pesan
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tuliskan pesan Anda di sini..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors duration-200 text-sm resize-none"
                  />
                  {state?.error?.message && (
                    <span className="mt-1 text-sm text-red-500">
                      {state.error.message[0]}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className={clsx("inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary-500 text-white font-semibold rounded-lg shadow-lg shadow-primary-500/25 hover:bg-primary-600 hover:shadow-primary-500/35 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer", { "cursor-progress opacity-50": isPanding })}
                  disabled={isPanding}
                >
                  <MdSend className="text-lg" />
                  {isPanding ? "Mengirim..." : "Kirim Pesan"}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info — 2/5 width */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10 h-full">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Informasi Kontak
              </h2>
              <p className="text-gray-500 text-sm mb-8">
                Anda juga bisa menghubungi kami melalui informasi di bawah ini.
              </p>

              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex gap-4">
                    <div className="shrink-0 w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                      <item.icon className="text-xl text-primary-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="mt-8 rounded-xl overflow-hidden bg-gray-100 h-48 flex items-center justify-center">
                <p className="text-gray-400 text-sm">Peta Lokasi</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FormContact
