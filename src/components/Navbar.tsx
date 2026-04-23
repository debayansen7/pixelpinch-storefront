import Link from "next/link";
import { siteContent } from "../data/content";

export default function Navbar() {
  return (
    <nav className="bg-white/30 backdrop-blur-md border-b border-white/40 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-black text-indigo-600 tracking-tighter"
            >
              {siteContent.navbar.logo}
            </Link>
          </div>

          {/* Desktop Nav Links */}
          {/* <div className="hidden md:flex space-x-8">
            {siteContent.navbar.links.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          
          <div className="flex items-center">
            <button className="text-gray-900 bg-white/50 hover:bg-white/80 px-4 py-2 rounded-full font-semibold transition-colors shadow-sm border border-white/60">
              {siteContent.navbar.cartButton}
            </button>
          </div> */}
        </div>
      </div>
    </nav>
  );
}
