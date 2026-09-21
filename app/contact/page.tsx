import { Metadata } from 'next'
import Header from '@/components/Header'
import FormContact from '@/components/contact/FormContact'

export const metadata: Metadata = {
  title: 'Hubungi Kami - HotelF',
  description:
    'Hubungi kami untuk pertanyaan, reservasi, atau informasi lebih lanjut tentang layanan hotel kami. Kami siap membantu Anda 24 jam.',
}

const ContactPage = () => {
  return (
    <>
      <Header
        title="Hubungi Kami"
        subtitle="Kami siap membantu Anda. Kirim pesan atau hubungi kami melalui informasi di bawah ini."
      />
      <FormContact />
    </>
  )
}

export default ContactPage
