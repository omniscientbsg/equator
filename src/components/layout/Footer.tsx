import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-equator-charcoal text-white pt-20 pb-8 border-t border-white/10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & Info */}
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <div className="font-display text-3xl font-bold tracking-tight text-white">
                EQUATOR
              </div>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-xs">
              ISO 9001 & 45001 Certified Property Management & Retail Turnkey
              Execution across India.
            </p>
            <a
              href="https://www.equator.in"
              className="text-equator-sky hover:text-white transition-colors text-sm font-medium"
            >
              www.equator.in
            </a>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-display mb-6">Services</h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li>
                <Link
                  href="/services/retail-turnkey"
                  className="hover:text-white transition-colors"
                >
                  Retail Turnkey Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/services/technical"
                  className="hover:text-white transition-colors"
                >
                  Technical Facility Services
                </Link>
              </li>
              <li>
                <Link
                  href="/services/housekeeping"
                  className="hover:text-white transition-colors"
                >
                  Housekeeping Solutions
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-display mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/clients" className="hover:text-white transition-colors">
                  Our Clients
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-lg font-display mb-6">Stay Updated</h4>
            <form className="mb-6">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-equator-sky transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 bg-equator-blue hover:bg-equator-sky text-white rounded-full w-10 flex items-center justify-center transition-colors"
                  aria-label="Subscribe"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
            <div className="text-sm text-white/70 space-y-2">
              <p>Email: contact@equator.in</p>
              <p>Phone: +91 12345 67890</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
          <p>
            &copy; {new Date().getFullYear()} Equator Property Managers Pvt Ltd. All Rights
            Reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
