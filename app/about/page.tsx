import Link from "next/link";
import Header from "@/components/Header";
import {
  MdOutlineHealthAndSafety,
  MdOutlineSupportAgent,
  MdOutlineStar,
  MdOutlineLocationOn,
  MdOutlineCalendarToday,
  MdOutlineHotel,
  MdOutlinePeople,
} from "react-icons/md";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Tentang Kami - HotelF',
  description: 'Cerita Kami, Didirikan pada tahun 2010, Hotel hadir dengan visi sederhana: menciptakan tempat di mana setiap tamu dapat merasakan kenyamanan rumah jauh dari rumah. Dari sebuah boutique hotel kecil, kami telah berkembang menjadi jaringan hotel premium yang melayani wisatawan bisnis dan rekreasi dari seluruh dunia.',
}

const values = [
  {
    icon: MdOutlineHealthAndSafety,
    title: "Keamanan & Kenyamanan",
    description:
      "Kami memastikan setiap tamu merasa aman dan nyaman selama menginap dengan standar kebersihan dan keamanan internasional.",
  },
  {
    icon: MdOutlineSupportAgent,
    title: "Layanan Prima",
    description:
      "Tim profesional kami siap melayani 24 jam untuk memenuhi setiap kebutuhan Anda dengan sepenuh hati.",
  },
  {
    icon: MdOutlineStar,
    title: "Kualitas Premium",
    description:
      "Setiap detail dirancang untuk memberikan pengalaman menginap yang melampaui ekspektasi Anda.",
  },
];

const stats = [
  { icon: MdOutlineCalendarToday, value: "15+", label: "Tahun Pengalaman" },
  { icon: MdOutlineHotel, value: "120+", label: "Kamar Premium" },
  { icon: MdOutlinePeople, value: "50k+", label: "Tamu Puas" },
  { icon: MdOutlineLocationOn, value: "3", label: "Lokasi Strategis" },
];

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <Header
        title="Tentang Kami"
        subtitle="Mengenal lebih dekat cerita dan komitmen kami dalam menghadirkan pengalaman menginap yang tak terlupakan."
      />

      {/* Opening Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Cerita Kami
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Didirikan pada tahun 2010, Hotel hadir dengan visi sederhana:
                  menciptakan tempat di mana setiap tamu dapat merasakan
                  kenyamanan rumah jauh dari rumah. Dari sebuah boutique hotel
                  kecil, kami telah berkembang menjadi jaringan hotel premium
                  yang melayani wisatawan bisnis dan rekreasi dari seluruh
                  dunia.
                </p>
                <p>
                  Setiap kamar dirancang dengan perhatian terhadap detail —
                  dari seprai katun Mesir hingga pemandangan kota yang
                  memukau. Kami percaya bahwa menginap bukan sekadar tentang
                  tempat tidur, melainkan tentang pengalaman yang membawa
                  kenangan.
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-gray-50 rounded-2xl p-6 text-center hover:bg-primary-50 transition-colors duration-300"
                >
                  <stat.icon className="w-8 h-8 text-primary-500 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nilai-Nilai Kami
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tiga pilar utama yang menjadi fondasi dalam setiap layanan yang
              kami berikan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mb-5">
                  <value.icon className="w-7 h-7 text-primary-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Misi Kami
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Memberikan pengalaman menginap yang melampaui ekspektasi, dengan
              menggabungkan keramahan khas Indonesia, fasilitas kelas dunia,
              dan perhatian tulus terhadap setiap kebutuhan tamu. Kami ingin
              menjadi pilihan utama bagi siapapun yang mencari akomodasi
              premium di Indonesia.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/rooms"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-500 text-white font-semibold rounded-lg shadow-lg shadow-primary-500/30 hover:bg-primary-600 hover:shadow-primary-500/40 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Lihat Kamar
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-primary-500 hover:text-primary-600 transition-all duration-300"
              >
                Hubungi Kami
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Siap Merasakan Pengalaman Berbeda?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Pesan kamar Anda sekarang dan nikmati keramahan serta kenyamanan
            yang hanya bisa Anda temukan di Hotel.
          </p>
          <Link
            href="/rooms"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary-500 text-white font-semibold rounded-lg shadow-lg shadow-primary-500/30 hover:bg-primary-600 hover:shadow-primary-500/40 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Booking Sekarang
          </Link>
        </div>
      </section>
    </>
  );
}
