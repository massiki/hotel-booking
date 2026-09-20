import React from "react";
import Link from "next/link";
import clsx from "clsx";

interface FooterLinkProps {
  href: string;
  label: string;
  className?: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, label, className }) => {
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

export default FooterLink;