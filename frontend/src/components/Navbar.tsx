"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Shield } from "lucide-react";
import { UserButton, SignInButton } from "@clerk/nextjs";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/ig", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar({
  isAdmin = false,
  isSignedIn = false,
}: {
  isAdmin?: boolean;
  isSignedIn?: boolean;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Blur backdrop — very transparent so video shows through */}
      <div className="absolute inset-0 bg-[#0f0a2e]/40 backdrop-blur-xl border-b border-[rgba(207,163,117,0.05)]" />

      <div className="relative max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/images/Circle Crop Image.png"
            alt="Shivabakthi"
            width={40}
            height={40}
            className="rounded-full shadow-lg shadow-[#cfa375]/20 group-hover:shadow-[#cfa375]/40 transition-shadow"
          />
          <span className="text-xl font-bold tracking-wide font-cochin">
            <span className="gold-gradient-text">SHIVA</span>
            <span className="text-white/90">BAKTHI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "text-[#cfa375] bg-[#cfa375]/10"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/ig"
            className="ml-4 gold-btn px-5 py-2.5 rounded-full text-sm font-semibold"
          >
            Get Report
          </Link>
          {isAdmin && (
            <Link
              href="/admin"
              className="ml-2 px-4 py-2.5 rounded-full text-xs font-medium border border-white/10 text-white/50 hover:text-white hover:border-[#cfa375]/30 hover:bg-[#cfa375]/5 transition-all flex items-center gap-1.5"
            >
              <Shield className="w-3 h-3" />
              Admin
            </Link>
          )}
          {isSignedIn ? (
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8 ml-2",
                },
              }}
            />
          ) : (
            <SignInButton mode="redirect" forceRedirectUrl="/admin">
              <button className="ml-2 px-4 py-2 rounded-full text-xs font-medium border border-[#cfa375]/20 text-[#cfa375]/70 hover:text-[#cfa375] hover:border-[#cfa375]/40 transition-all">
                Sign In
              </button>
            </SignInButton>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden relative w-10 h-10 flex items-center justify-center"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1.5">
            <span
              className={`block w-6 h-0.5 bg-[#cfa375] transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-[#cfa375] transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-[#cfa375] transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-[#0f0a2e]/95 backdrop-blur-xl border-b border-[rgba(207,163,117,0.1)] transition-all duration-300 ${
          mobileOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "text-[#cfa375] bg-[#cfa375]/10"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/ig"
            onClick={() => setMobileOpen(false)}
            className="mt-2 gold-btn px-5 py-3 rounded-full text-sm font-semibold text-center"
          >
            Get Report
          </Link>
          {isAdmin && (
            <Link
              href="/admin"
              onClick={() => setMobileOpen(false)}
              className="mt-1 px-5 py-3 rounded-full text-sm font-medium text-center border border-white/10 text-white/50 hover:text-white hover:border-[#cfa375]/30 transition-all flex items-center justify-center gap-2"
            >
              <Shield className="w-3.5 h-3.5" />
              Admin Panel
            </Link>
          )}
          <div className="mt-2 flex items-center justify-center">
            {isSignedIn ? (
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                  },
                }}
              />
            ) : (
              <SignInButton mode="redirect" forceRedirectUrl="/admin">
                <button className="px-5 py-2.5 rounded-full text-sm font-medium border border-[#cfa375]/20 text-[#cfa375]/70 hover:text-[#cfa375] hover:border-[#cfa375]/40 transition-all">
                  Sign In
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
