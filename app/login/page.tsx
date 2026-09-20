"use client"
import Image from "next/image";
import Link from "next/link";
import { ButtonLoginGoogle } from "@/components/ButtonLogin";

export default function LoginPage() {
  return (
    <>
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Left: Image (desktop) / Image (mobile) */}
        <div className="relative w-full lg:w-1/2 h-64 lg:h-auto lg:min-h-screen">
          <Image
            src="/hero.jpg"
            alt="Hotel Room"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/70 lg:bg-linear-to-r lg:from-transparent lg:to-black/20" />

          {/* Back to home - mobile */}
          <Link
            href="/"
            className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors duration-200"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Kembali
          </Link>

          {/* Overlay text - desktop only */}
          <div className="hidden lg:flex absolute inset-0 items-center justify-center p-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Experience Luxury
              </h2>
              <p className="text-white/70 text-lg">
                Nikmati pengalaman menginap yang tak terlupakan
              </p>
            </div>
          </div>
        </div>

        {/* Right: Login Card */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 bg-white">
          <div className="w-full max-w-md">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 mb-10">
              <Image
                src="/logo-hotel.png"
                alt="Hotel Logo"
                width={40}
                height={40}
              />
              <span className="text-2xl font-bold text-gray-900">
                Hotel<span className="text-primary-500">.</span>
              </span>
            </Link>

            {/* Heading */}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Selamat Datang
            </h1>
            <p className="text-gray-500 mb-8">
              Masuk untuk mengelola reservasi Anda
            </p>

            {/* Google Login Button */}
            <ButtonLoginGoogle />

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-400">atau</span>
              </div>
            </div>

            {/* Back to home */}
            <Link
              href="/"
              className="block w-full text-center px-6 py-4 text-gray-600 font-medium hover:text-primary-500 transition-colors duration-200"
            >
              Kembali ke Beranda
            </Link>

            {/* Footer text */}
            <p className="text-center text-xs text-gray-400 mt-8">
              Dengan masuk, Anda menyetujui{" "}
              <Link href="#" className="text-primary-500 hover:underline">
                Syarat & Ketentuan
              </Link>{" "}
              dan{" "}
              <Link href="#" className="text-primary-500 hover:underline">
                Kebijakan Privasi
              </Link>{" "}
              kami.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
