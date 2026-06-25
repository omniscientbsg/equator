"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Use dark text if we are scrolled OR if we are not on the home page (since internal pages have light backgrounds)
  const useDarkText = isScrolled || !isHome;

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        useDarkText
          ? "bg-white/90 backdrop-blur-md shadow-equator py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div
            className={clsx(
              "font-display text-2xl font-bold tracking-tight transition-colors",
              useDarkText ? "text-equator-navy" : "text-white"
            )}
          >
            EQUATOR
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/services"
            className={clsx(
              "text-sm font-bold transition-colors hover:text-equator-sky relative group tracking-wide uppercase",
              useDarkText ? "text-equator-charcoal" : "text-white/90"
            )}
          >
            Services
            <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-equator-sky transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/clients"
            className={clsx(
              "text-sm font-bold transition-colors hover:text-equator-sky relative group tracking-wide uppercase",
              useDarkText ? "text-equator-charcoal" : "text-white/90"
            )}
          >
            Clients
            <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-equator-sky transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/projects"
            className={clsx(
              "text-sm font-bold transition-colors hover:text-equator-sky relative group tracking-wide uppercase",
              useDarkText ? "text-equator-charcoal" : "text-white/90"
            )}
          >
            Projects
            <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-equator-sky transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/about"
            className={clsx(
              "text-sm font-bold transition-colors hover:text-equator-sky relative group tracking-wide uppercase",
              useDarkText ? "text-equator-charcoal" : "text-white/90"
            )}
          >
            About
            <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-equator-sky transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/contact"
            className={clsx(
              "text-sm font-bold transition-colors hover:text-equator-sky relative group tracking-wide uppercase",
              useDarkText ? "text-equator-charcoal" : "text-white/90"
            )}
          >
            Contact
            <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-equator-sky transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>

        <div className="hidden md:flex">
          <Link
            href="/contact"
            className="bg-equator-blue hover:bg-equator-navy text-white px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 tracking-wide"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={clsx(
            "md:hidden p-2 transition-colors",
            useDarkText ? "text-equator-navy" : "text-white"
          )}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-xl py-4 flex flex-col md:hidden animate-in slide-in-from-top-4">
          <Link
            href="/services"
            className="px-6 py-4 text-equator-navy font-bold tracking-wide uppercase border-b border-gray-100 hover:bg-equator-silver/30 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Services
          </Link>
          <Link
            href="/clients"
            className="px-6 py-4 text-equator-navy font-bold tracking-wide uppercase border-b border-gray-100 hover:bg-equator-silver/30 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Clients
          </Link>
          <Link
            href="/projects"
            className="px-6 py-4 text-equator-navy font-bold tracking-wide uppercase border-b border-gray-100 hover:bg-equator-silver/30 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Projects
          </Link>
          <Link
            href="/about"
            className="px-6 py-4 text-equator-navy font-bold tracking-wide uppercase border-b border-gray-100 hover:bg-equator-silver/30 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="px-6 py-4 text-equator-navy font-bold tracking-wide uppercase hover:bg-equator-silver/30 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>
          <div className="px-6 pt-6 pb-2">
            <Link
              href="/contact"
              className="block w-full text-center bg-equator-blue hover:bg-equator-navy text-white py-4 rounded-full font-bold tracking-wide transition-colors shadow-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
