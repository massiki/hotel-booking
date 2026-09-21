import { Metadata } from "next";
import {
  MdWallet,
  MdVerified,
  MdSpeed,
  MdCategory,
  MdWifi,
  MdPool,
  MdLocalLaundryService,
  MdFitnessCenter,
  MdRoomService,
  MdAlarm,
  MdFreeBreakfast,
  MdCoffee,
} from "react-icons/md";
import Hero from "@/components/Hero";
import Card from "@/components/Card";

const whyChooseUs = [
  {
    icon: MdCategory,
    title: "Pilihan Hotel Beragam",
    description:
      "Temukan hotel sesuai keinginanmu, dari budget hingga premium, semua tersedia dalam satu platform.",
  },
  {
    icon: MdWallet,
    title: "Harga Transparan",
    description:
      "Tidak ada biaya tersembunyi. Harga yang kamu lihat adalah harga yang kamu bayar.",
  },
  {
    icon: MdVerified,
    title: "Booking Aman & Terpercaya",
    description:
      "Sistem pembayaran yang aman dan data privasi yang terjamin keamanannya.",
  },
  {
    icon: MdSpeed,
    title: "Mudah & Cepat",
    description:
      "Pesan kamar impianmu hanya dalam beberapa langkah sederhana yang intuitif.",
  },
];

const services = [
  { icon: MdWifi, name: "WiFi Gratis" },
  { icon: MdPool, name: "Kolam Renang" },
  { icon: MdLocalLaundryService, name: "Laundry" },
  { icon: MdFitnessCenter, name: "Fitness Center" },
  { icon: MdRoomService, name: "Layanan Concierge" },
  { icon: MdAlarm, name: "Morning Call" },
  { icon: MdFreeBreakfast, name: "Welcome Drink" },
  { icon: MdCoffee, name: "Kopi & Teh" },
];

const rooms = [
  {
    id: "1",
    name: "Standard Room",
    price: 800000,
    adults: 2,
  },
  {
    id: "2",
    name: "Deluxe Room",
    price: 1500000,
    adults: 2,
  },
  {
    id: "3",
    name: "Suite Room",
    price: 3000000,
    adults: 4,
  },
  {
    id: "4",
    name: "Standard Room",
    price: 800000,
    adults: 2,
  },
  {
    id: "5",
    name: "Deluxe Room",
    price: 1500000,
    adults: 2,
  },
  {
    id: "6",
    name: "Suite Room",
    price: 3000000,
    adults: 4,
  },
];

export const metadata: Metadata = {
  title: 'Home - HotelF',
  description: 'Experience Luxury Like Never Before Discover a world of comfort and elegance.Your perfect escape awaits with breathtaking views and unparalleled hospitality.',
}

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Kenapa Memilih Kami?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Kami berkomitmen memberikan pengalaman terbaik untuk setiap
              tamu yang menginap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyChooseUs.map((item) => (
              <div
                key={item.title}
                className="flex gap-5 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="shrink-0 w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center">
                  <item.icon className="text-2xl text-primary-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Layanan Kami
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nikmati berbagai fasilitas premium yang kami sediakan untuk
              kenyamanan Anda.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {services.map((service) => (
              <div
                key={service.name}
                className="flex flex-col items-center p-6 bg-gray-50 rounded-2xl hover:bg-primary-50 transition-colors duration-300 group"
              >
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 group-hover:shadow-md transition-shadow duration-300">
                  <service.icon className="text-3xl text-primary-500" />
                </div>
                <span className="text-sm font-medium text-gray-700 text-center">
                  {service.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Room & Rates Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Room & Rates
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Pilih kamar sesuai kebutuhan dan budget Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <Card
                key={room.id}
                id={room.id}
                name={room.name}
                price={room.price}
                adults={room.adults}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
