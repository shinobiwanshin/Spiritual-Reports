import Link from "next/link";
import type { Metadata } from "next";
import { Mail, Instagram, Facebook } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us — Shivabakthi",
  description:
    "Get in touch with Shivabakthi for consultations, report queries, or any questions. Reach us via email or social media.",
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
            Thank you for your interest in Shivabakthi! Whether you&apos;re
            exploring our reports, seeking personalized guidance, or simply wish
            to share your thoughts, we&apos;re here to help. Our team is just a
            message away!
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#cfa375] to-transparent mx-auto mt-6" />
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Email */}
          <a
            href="mailto:shivabakthi.in@gmail.com"
            className="glass-card rounded-2xl p-8 text-center group"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-blue-500/20 transition-colors">
              <Mail className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Email Address
            </h3>
            <p className="text-sm text-[#b0a8c8] mb-4">
              We&apos;ll respond within 24 hours
            </p>
            <span className="text-[#cfa375] text-sm font-medium">
              shivabakthi.in@gmail.com
            </span>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/shivabakthi.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card rounded-2xl p-8 text-center group"
          >
            <div className="w-16 h-16 rounded-2xl bg-pink-500/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-pink-500/20 transition-colors">
              <Instagram className="w-8 h-8 text-pink-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Instagram</h3>
            <p className="text-sm text-[#b0a8c8] mb-4">
              Follow us for daily insights
            </p>
            <span className="text-[#cfa375] text-sm font-medium">
              @shivabakthi.in
            </span>
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/profile.php?id=61587559000445"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card rounded-2xl p-8 text-center group"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-blue-600/20 transition-colors">
              <Facebook className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Facebook</h3>
            <p className="text-sm text-[#b0a8c8] mb-4">
              Connect with our community
            </p>
            <span className="text-[#cfa375] text-sm font-medium">
              Shivabakthi
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
