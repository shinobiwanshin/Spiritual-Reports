import Link from "next/link";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
];

const policyLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
  { href: "/refund-and-cancellation", label: "Refund & Cancellation" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#080520] border-t border-[rgba(207,163,117,0.1)]">
      {/* Gold top divider */}
      <div className="bg-gradient-to-r from-transparent via-[#cfa375] to-transparent h-[1px] opacity-30" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#cfa375] to-[#b8894f] flex items-center justify-center text-[#0f0a2e] font-bold text-lg shadow-lg shadow-[#cfa375]/20 group-hover:shadow-[#cfa375]/40 transition-shadow">
                ✦
              </div>
              <span className="text-lg font-bold tracking-wide">
                <span className="gold-gradient-text">ASTRA</span>
                <span className="text-white/90">REPORTS</span>
              </span>
            </Link>
            <p className="text-sm text-[#b0a8c8] leading-relaxed mt-4">
              A platform focused on personalized informational reports and
              structured consultations to help you understand yourself better.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#cfa375] font-semibold text-sm uppercase tracking-wider mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#b0a8c8] hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-[#cfa375] font-semibold text-sm uppercase tracking-wider mb-5">
              Our Policies
            </h4>
            <ul className="space-y-3">
              {policyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#b0a8c8] hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#cfa375] font-semibold text-sm uppercase tracking-wider mb-5">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-[#cfa375] text-lg mt-0.5">📱</span>
                <div>
                  <p className="text-xs text-[#b0a8c8] mb-1">WhatsApp</p>
                  <span className="text-sm text-white hover:text-[#cfa375] transition-colors cursor-default">
                    +91 91********
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#cfa375] text-lg mt-0.5">✉️</span>
                <div>
                  <p className="text-xs text-[#b0a8c8] mb-1">Email</p>
                  <a
                    href="mailto:support@astrareports.com"
                    className="text-sm text-white hover:text-[#cfa375] transition-colors"
                  >
                    sup*****@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#cfa375] text-lg mt-0.5">📍</span>
                <div>
                  <p className="text-xs text-[#b0a8c8] mb-1">Office</p>
                  <p className="text-sm text-white/80">Surat, Gujarat, India</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-[rgba(207,163,117,0.08)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#b0a8c8]">
            © {new Date().getFullYear()} Astra Reports, all rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy-policy"
              className="text-xs text-[#b0a8c8] hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="text-xs text-[#b0a8c8] hover:text-white transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/refund-and-cancellation"
              className="text-xs text-[#b0a8c8] hover:text-white transition-colors"
            >
              Refund
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
