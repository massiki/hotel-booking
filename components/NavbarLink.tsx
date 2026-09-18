import React from "react";
import Link from "next/link";
import clsx from "clsx";

interface NavbarLinkProps {
  href: string;
  label: string;
  className?: string;
}

const NavbarLink: React.FC<NavbarLinkProps> = ({ href, label, className }) => {
  return (
    <Link
      href={href}
      className={clsx(
        "text-sm font-medium text-gray-700 transition-colors duration-200 hover:text-primary-500",
        className
      )}
    >
      {label}
    </Link>
  );
};

export default NavbarLink;
