'use client'
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { NavbarLinkMobile, NavbarLinkDesktop } from "./NavbarLink";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/logo-hotel.png"
              alt="Hotel Logo"
              width={40}
              height={40}
              className="h-8 w-8 md:h-10 md:w-10"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            <NavbarLinkDesktop isLogin={!!session?.user} isAdmin={session?.user.role === 'admin'} />
          </div>

          {/* Login Button (Desktop) */}
          <div className="hidden lg:flex items-center">
            {session?.user ? (
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="px-5 py-2.5 rounded-lg font-semibold text-sm bg-red-500 text-white hover:bg-red-600 transition-colors duration-200 cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="px-5 py-2.5 rounded-lg font-semibold text-sm bg-primary-500 text-white hover:bg-primary-600 shadow-sm shadow-primary-500/20 transition-colors duration-200"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile: Login + Hamburger */}
          <div className="flex lg:hidden items-center gap-3">
            {session?.user ? (
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="px-4 py-2 rounded-lg font-semibold text-sm bg-red-500 text-white hover:bg-red-600 transition-colors duration-200 cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 rounded-lg font-semibold text-sm bg-primary-500 text-white hover:bg-primary-600 shadow-sm shadow-primary-500/20 transition-colors duration-200"
              >
                Login
              </Link>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? <HiX size={24} className="cursor-pointer" /> : <HiMenuAlt3 size={24} className="cursor-pointer" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-125 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="bg-white border-t border-gray-100 px-4 py-4 shadow-lg">
          <NavbarLinkMobile isLogin={!!session?.user} isAdmin={session?.user.role === 'admin'} onLinkClick={() => setIsOpen(false)} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
