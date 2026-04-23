import Link from "next/link";
import { siteContent } from "../data/content";

export default function Footer() {
  return (
    <footer className="bg-transparent border-t border-white/40 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Brand & Copyright */}
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <span className="text-xl font-black text-indigo-600 tracking-tighter">
              {siteContent.footer.brand}
            </span>
            <p className="text-sm text-gray-500 mt-1">
              © {new Date().getFullYear()} {siteContent.footer.copyright}
            </p>
          </div>

          {/* Footer Links */}
          <div className="flex space-x-6 text-sm font-medium">
            {siteContent.footer.links.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="text-gray-500 hover:text-indigo-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
