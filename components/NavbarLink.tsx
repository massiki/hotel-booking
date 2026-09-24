import Link from "next/link";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { HiChevronDown } from "react-icons/hi";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/rooms", label: "Rooms" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const authenticatedLinks = [
  { href: "/reservation", label: "Reservation" },
]

const adminLinks = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/manage-room", label: "Manage Room" },
  { href: "/admin/manage-amenities", label: "Manage Amenities" },
  { href: "/admin/manage-contact", label: "Manage Contact" },
]

interface NavbarLinkProps {
  isLogin: boolean
  isAdmin: boolean
  onLinkClick?: () => void
}

const NavbarLinkMobile = ({ isLogin, isAdmin, onLinkClick }: NavbarLinkProps) => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onLinkClick}
          className={clsx(
            "block py-3 text-sm font-medium text-gray-700",
            "transition-colors duration-200 hover:text-primary-500",
            "border-b border-gray-50 last:border-0"
          )}
        >
          {link.label}
        </Link>
      ))}

      {isLogin && authenticatedLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onLinkClick}
          className={clsx(
            "block py-3 text-sm font-medium text-gray-700",
            "transition-colors duration-200 hover:text-primary-500",
            "border-b border-gray-50 last:border-0"
          )}
        >
          {link.label}
        </Link>
      ))}

      {isAdmin && (
        <div className="border-b border-gray-50 last:border-0">
          <button
            type="button"
            onClick={() => setIsAdminOpen((open) => !open)}
            aria-expanded={isAdminOpen}
            aria-haspopup="menu"
            className={clsx(
              "w-full flex items-center justify-between py-3 text-sm font-medium text-gray-700",
              "transition-colors duration-200 hover:text-primary-500 cursor-pointer"
            )}
          >
            Admin
            <HiChevronDown
              size={16}
              className={clsx(
                "transition-transform duration-200",
                isAdminOpen && "rotate-180"
              )}
            />
          </button>

          {isAdminOpen && (
            <div className="pb-2" role="menu">
              {adminLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onLinkClick}
                  role="menuitem"
                  className={clsx(
                    "block py-2 pl-4 pr-3 text-sm font-medium text-gray-600",
                    "transition-colors duration-200 hover:text-primary-500",
                    "border-b border-gray-50 last:border-0"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )

};

const NavbarLinkDesktop = ({ isLogin, isAdmin }: NavbarLinkProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isDropdownOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isDropdownOpen]);

  return (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm font-medium text-gray-700 hover:text-primary-500"
        >
          {link.label}
        </Link>
      ))}

      {isLogin && authenticatedLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm font-medium text-gray-700 hover:text-primary-500"
        >
          {link.label}
        </Link>
      ))}

      {isAdmin && (
        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen((open) => !open)}
            aria-expanded={isDropdownOpen}
            aria-haspopup="menu"
            className={clsx(
              "flex items-center gap-1 text-sm font-medium transition-colors duration-200 cursor-pointer",
              isDropdownOpen ? "text-primary-500" : "text-gray-700 hover:text-primary-500"
            )}
          >
            Admin
            <HiChevronDown
              size={14}
              className={clsx(
                "transition-transform duration-200",
                isDropdownOpen && "rotate-180"
              )}
            />
          </button>

          {isDropdownOpen && (
            <div
              role="menu"
              className="absolute right-0 top-full mt-2 w-52 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-50"
            >
              {adminLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsDropdownOpen(false)}
                  role="menuitem"
                  className={clsx(
                    "block px-4 py-2 text-sm font-medium text-gray-700",
                    "transition-colors duration-150 hover:bg-primary-50 hover:text-primary-600"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export { NavbarLinkMobile, NavbarLinkDesktop };
