"use client";

import { use } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Mail,
  Smartphone,
  Languages,
  User,
  CheckCircle,
  Gem,
  Award,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";

export default function ReportPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  // Format slug for display (e.g., "janam-kundali" -> "Janam Kundali")
  const reportName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 md:px-6 bg-[#0f0a2e]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Hero & Content */}
        <div className="lg:col-span-7 space-y-12">
          {/* Hero Section */}
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Explore Your Personalized Report: <br />
              <span className="gold-gradient-text">
                A Detailed Analysis Tailored Just for You.
              </span>
            </h1>
            <p className="text-[#b0a8c8] text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              Discover a clear and organized overview of your personal
              information with our detailed, customized {reportName} report.
              Gain structured insights into key aspects of your life, helping
              you navigate your path with confidence and clarity.
            </p>

            {/* Sculpture Image */}
            <div className="relative w-full max-w-sm mx-auto aspect-[3/4] rounded-3xl overflow-hidden shadow-[0_8px_60px_rgba(207,163,117,0.15)] border border-[#cfa375]/20 group hover:shadow-[0_8px_80px_rgba(207,163,117,0.25)] transition-all duration-500">
              <Image
                src="/images/Monumental Sculpture Photo.jpg"
                alt="Divine Sculpture"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                priority
              />
              {/* Subtle vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0a2e]/40 via-transparent to-[#0f0a2e]/20" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(15,10,46,0.4)_100%)]" />
            </div>
          </div>

          {/* Content Section: Benefits */}
          <div className="bg-[#1a1347]/50 border border-[#cfa375]/10 rounded-2xl p-8 backdrop-blur-sm text-center">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center justify-center gap-3">
              <Award className="text-[#cfa375]" />
              Why Choose This Report?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Ancient Vedic Accuracy",
                "Detailed Planetary Analysis",
                "Personalized Remedies",
                "Career & Finance roadmap",
                "Relationship Compatibility",
                "Health & Wellness Insights",
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1">
                    <CheckCircle className="w-5 h-5 text-[#cfa375]" />
                  </div>
                  <p className="text-[#b0a8c8]">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center gap-6 justify-center opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
            {/* Simple text or SVGs for payment methods could go here */}
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Secure Payment</span>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <div className="text-white/50 text-sm">
              Trusted by 10,000+ Users
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 bg-[#1a1347] border border-[#cfa375]/20 rounded-2xl p-6 md:p-8 shadow-2xl shadow-[#0f0a2e]/50">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">
                Generate Your Report
              </h3>
              <p className="text-[#b0a8c8] text-sm">
                Enter your birth details for accurate analysis
              </p>
            </div>

            <form className="space-y-5">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-[#cfa375] font-semibold uppercase tracking-wider pl-1">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-white/40" />
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full bg-[#0f0a2e]/50 border border-white/10 rounded-lg py-2.5 pl-10 pr-3 text-white placeholder-white/20 focus:outline-none focus:border-[#cfa375]/50 transition-colors"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-[#cfa375] font-semibold uppercase tracking-wider pl-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Surname"
                    className="w-full bg-[#0f0a2e]/50 border border-white/10 rounded-lg py-2.5 px-3 text-white placeholder-white/20 focus:outline-none focus:border-[#cfa375]/50 transition-colors"
                  />
                </div>
              </div>

              {/* Date of Birth */}
              <div className="space-y-1.5">
                <label className="text-xs text-[#cfa375] font-semibold uppercase tracking-wider pl-1">
                  Date of Birth
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="relative">
                    <Calendar className="absolute left-2.5 top-3 w-3.5 h-3.5 text-white/40" />
                    <select className="w-full bg-[#0f0a2e]/50 border border-white/10 rounded-lg py-2.5 pl-8 pr-2 text-white/80 focus:outline-none focus:border-[#cfa375]/50 appearance-none text-sm">
                      <option value="">Day</option>
                      {Array.from({ length: 31 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <select className="w-full bg-[#0f0a2e]/50 border border-white/10 rounded-lg py-2.5 px-3 text-white/80 focus:outline-none focus:border-[#cfa375]/50 appearance-none text-sm">
                    <option value="">Month</option>
                    {[
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ].map((m, i) => (
                      <option key={m} value={i + 1}>
                        {m}
                      </option>
                    ))}
                  </select>
                  <select className="w-full bg-[#0f0a2e]/50 border border-white/10 rounded-lg py-2.5 px-3 text-white/80 focus:outline-none focus:border-[#cfa375]/50 appearance-none text-sm">
                    <option value="">Year</option>
                    {Array.from({ length: 100 }, (_, i) => (
                      <option key={2026 - i} value={2026 - i}>
                        {2026 - i}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Time of Birth */}
              <div className="space-y-1.5">
                <label className="text-xs text-[#cfa375] font-semibold uppercase tracking-wider pl-1">
                  Time of Birth
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="relative">
                    <Clock className="absolute left-2.5 top-3 w-3.5 h-3.5 text-white/40" />
                    <select className="w-full bg-[#0f0a2e]/50 border border-white/10 rounded-lg py-2.5 pl-8 pr-2 text-white/80 focus:outline-none focus:border-[#cfa375]/50 appearance-none text-sm">
                      <option value="">Hr</option>
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <select className="w-full bg-[#0f0a2e]/50 border border-white/10 rounded-lg py-2.5 px-3 text-white/80 focus:outline-none focus:border-[#cfa375]/50 appearance-none text-sm">
                    <option value="">Min</option>
                    {Array.from({ length: 60 }, (_, i) => (
                      <option key={i} value={i}>
                        {i.toString().padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                  <select className="w-full bg-[#0f0a2e]/50 border border-white/10 rounded-lg py-2.5 px-3 text-white/80 focus:outline-none focus:border-[#cfa375]/50 appearance-none text-sm">
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </div>

              {/* Place of Birth */}
              <div className="space-y-1.5">
                <label className="text-xs text-[#cfa375] font-semibold uppercase tracking-wider pl-1">
                  Place of Birth
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-white/40" />
                  <input
                    type="text"
                    placeholder="Enter City"
                    className="w-full bg-[#0f0a2e]/50 border border-white/10 rounded-lg py-2.5 pl-10 pr-3 text-white placeholder-white/20 focus:outline-none focus:border-[#cfa375]/50 transition-colors"
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-[#cfa375] font-semibold uppercase tracking-wider pl-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-white/40" />
                    <input
                      type="email"
                      placeholder="you@email.com"
                      className="w-full bg-[#0f0a2e]/50 border border-white/10 rounded-lg py-2.5 pl-10 pr-3 text-white placeholder-white/20 focus:outline-none focus:border-[#cfa375]/50 transition-colors"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-[#cfa375] font-semibold uppercase tracking-wider pl-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-3 w-4 h-4 text-white/40" />
                    <input
                      type="tel"
                      placeholder="+91..."
                      className="w-full bg-[#0f0a2e]/50 border border-white/10 rounded-lg py-2.5 pl-10 pr-3 text-white placeholder-white/20 focus:outline-none focus:border-[#cfa375]/50 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Report Language */}
              <div className="space-y-1.5">
                <label className="text-xs text-[#cfa375] font-semibold uppercase tracking-wider pl-1">
                  Report Language
                </label>
                <div className="relative">
                  <Languages className="absolute left-3 top-3 w-4 h-4 text-white/40" />
                  <select className="w-full bg-[#0f0a2e]/50 border border-white/10 rounded-lg py-2.5 pl-10 pr-3 text-white/80 focus:outline-none focus:border-[#cfa375]/50 appearance-none">
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#cfa375] to-[#b8894f] hover:from-[#e8c99b] hover:to-[#cfa375] text-[#0f0a2e] font-bold py-4 rounded-xl transition-all duration-300 shadow-lg shadow-[#cfa375]/20 hover:shadow-[#cfa375]/40 text-lg"
                >
                  Proceed to Payment
                </button>

                <p className="text-center text-xs text-white/30 mt-4">
                  By continuing, you agree to our Terms & Privacy Policy.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
