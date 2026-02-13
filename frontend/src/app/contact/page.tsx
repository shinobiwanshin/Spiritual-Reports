import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Astra Reports",
  description:
    "Get in touch with Astra Spiritual for consultations, report queries, or any questions. Reach us via WhatsApp, email, or visit our office.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#cfa375] text-sm font-semibold uppercase tracking-wider mb-3">
            Get in Touch
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Contact <span className="gold-gradient-text">Us</span>
          </h1>
          <p className="text-[#b0a8c8] text-lg max-w-2xl mx-auto leading-relaxed">
            Thank you for your interest in Astra Reports! Whether you&apos;re
            exploring our reports, seeking personalized guidance, or simply wish
            to share your thoughts, we&apos;re here to help. Our team is just a
            message away!
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#cfa375] to-transparent mx-auto mt-6" />
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* WhatsApp */}
          <a
            href="https://wa.me/9100000000"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card rounded-2xl p-8 text-center group"
          >
            <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center text-3xl mx-auto mb-5 group-hover:bg-green-500/20 transition-colors">
              📱
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              WhatsApp Chat
            </h3>
            <p className="text-sm text-[#b0a8c8] mb-4">
              Quick response via chat
            </p>
            <span className="text-[#cfa375] text-sm font-medium">
              +91 91********
            </span>
          </a>

          {/* Email */}
          <a
            href="mailto:support@astrareports.com"
            className="glass-card rounded-2xl p-8 text-center group"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-3xl mx-auto mb-5 group-hover:bg-blue-500/20 transition-colors">
              ✉️
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Email Address
            </h3>
            <p className="text-sm text-[#b0a8c8] mb-4">
              We&apos;ll respond within 24 hours
            </p>
            <span className="text-[#cfa375] text-sm font-medium">
              sup*****@gmail.com
            </span>
          </a>

          {/* Office */}
          <div className="glass-card rounded-2xl p-8 text-center group">
            <div className="w-16 h-16 rounded-2xl bg-[#cfa375]/10 flex items-center justify-center text-3xl mx-auto mb-5 group-hover:bg-[#cfa375]/20 transition-colors">
              📍
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Office Address
            </h3>
            <p className="text-sm text-[#b0a8c8] mb-4">Visit us in person</p>
            <span className="text-[#cfa375] text-sm font-medium">
              Surat, Gujarat, India
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="glass-card rounded-3xl p-10 md:p-14 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Start a <span className="gold-gradient-text">Live Chat</span>
          </h2>
          <p className="text-[#b0a8c8] text-base leading-relaxed max-w-xl mx-auto mb-8">
            For the quickest response, reach us directly on WhatsApp. Our team
            is available to answer your questions and guide you to the right
            report.
          </p>
          <a
            href="https://wa.me/917861087127"
            target="_blank"
            rel="noopener noreferrer"
            className="gold-btn px-10 py-4 rounded-full text-base font-semibold shadow-lg shadow-[#cfa375]/20 inline-block"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
