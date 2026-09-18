'use client'
import Image from "next/image";
import NavbarLink from "./NavbarLink";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/rooms", label: "Rooms" },
  { href: "/contact", label: "Contact Us" },
];

const legalLinks = [
  { href: "#", label: "Legal" },
  { href: "#", label: "Terms & Conditions" },
  { href: "#", label: "Payment Method" },
  { href: "#", label: "Privacy Policy" },
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src="/logo-hotel.png"
                alt="Hotel Logo"
                width={40}
                height={40}
                className="brightness-0 invert"
              />
              <span className="text-2xl font-bold">
                Hotel<span className="text-primary-500">F</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Experience luxury and comfort at its finest. Your perfect stay
              begins with us, where every detail is crafted for your pleasure.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href + link.label}>
                  <NavbarLink
                    href={link.href}
                    label={link.label}
                    className="text-gray-400 hover:text-primary-400 text-sm"
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <NavbarLink
                    href={link.href}
                    label={link.label}
                    className="text-gray-400 hover:text-primary-400 text-sm"
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get updates on special offers and exclusive deals.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors duration-200 text-sm"
              />
              <button
                type="submit"
                className="w-full py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Hotel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
