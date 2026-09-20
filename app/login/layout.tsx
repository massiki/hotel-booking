import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - HotelF",
  description: "Masuk untuk mengelola reservasi Anda",
};

export default function LoginLayout({ children, }: { children: React.ReactNode; }) {
  return children;
}