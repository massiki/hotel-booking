import Link from "next/link";
import clsx from "clsx";

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
]

interface NavbarLinkProps {
  isLogin: boolean
  isAdmin: boolean
  onLinkClick?: () => void
}

const NavbarLinkMobile = ({ isLogin, isAdmin, onLinkClick }: NavbarLinkProps) => {
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

      {isAdmin && adminLinks.map((link) => (
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
    </>
  )

};

const NavbarLinkDesktop = ({ isLogin, isAdmin }: NavbarLinkProps) => {
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

      {isAdmin && adminLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm font-medium text-gray-700 hover:text-primary-500"
        >
          {link.label}
        </Link>
      ))}
    </>
  );
};

export { NavbarLinkMobile, NavbarLinkDesktop };