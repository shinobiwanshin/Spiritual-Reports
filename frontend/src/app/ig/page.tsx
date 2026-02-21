"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  CalendarDays,
  BarChart3,
  Compass,
  Clock,
  MapPin,
  Mail,
  Smartphone,
  Languages,
  User,
  CheckCircle,
  Sparkles,
  Star,
  ShieldCheck,
  ArrowRight,
  FileText,
  Timer,
  Lock,
  Send,
  type LucideIcon,
} from "lucide-react";
import VideoBackground from "@/components/VideoBackground";

/* ───────────────────────────── Report Variants ───────────────────────────── */

interface ReportVariant {
  id: string;
  duration: string;
  title: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  description: string;
  highlights: string[];
  icon: LucideIcon;
  popular?: boolean;
}

const reportVariants: ReportVariant[] = [
  {
    id: "1-year",
    duration: "1 Year",
    title: "1-Year Report",
    subtitle: "Short-Term Clarity",
    price: 199,
    originalPrice: 499,
    description:
      "Get a detailed 12-month overview covering career, relationships, finances, and health with month-by-month actionable guidance.",
    highlights: [
      "Monthly breakdown of key influences",
      "Career & financial outlook",
      "Relationship dynamics",
      "Health & wellness guidance",
    ],
    icon: CalendarDays,
  },
  {
    id: "3-year",
    duration: "3 Years",
    title: "3-Year Report",
    subtitle: "Mid-Term Strategy",
    price: 349,
    originalPrice: 799,
    description:
      "Explore key phases, patterns, and turning points shaping your journey over three years. Align with opportunities for growth and success.",
    highlights: [
      "Year-by-year strategic overview",
      "Major life transition periods",
      "Career growth trajectory",
      "Relationship evolution patterns",
      "Financial planning insights",
    ],
    icon: BarChart3,
    popular: true,
  },
  {
    id: "5-year",
    duration: "5 Years",
    title: "5-Year Report",
    subtitle: "Long-Term Vision",
    price: 499,
    originalPrice: 1299,
    description:
      "A comprehensive long-term analysis for planning major life decisions, career shifts, and personal transformation with confidence.",
    highlights: [
      "Comprehensive 5-year roadmap",
      "Long-term career & business strategy",
      "Wealth & asset building phases",
      "Relationship & family planning",
      "Life purpose & spiritual growth",
      "Risk assessment & mitigation",
    ],
    icon: Compass,
  },
];

/* ──────────────────────────────── Component ──────────────────────────────── */

export default function InstagramLandingPage() {
  const [selectedVariant, setSelectedVariant] = useState(1); // 3-year default
  const selected = reportVariants[selectedVariant];

  return (
    <div className="min-h-screen bg-[#0f0a2e] text-white relative overflow-hidden">
      {/* Video background — fixed behind everything */}
      <div className="fixed inset-0 z-0">
        <VideoBackground overlayOpacity={0.55} />
      </div>

      {/* ─── Mini Brand Bar ─── */}
      <div className="relative z-10 border-b border-[#cfa375]/10 bg-[#0f0a2e]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/Circle Crop Image.png"
              alt="Shivabakthi"
              width={36}
              height={36}
              className="rounded-full shadow-lg shadow-[#cfa375]/20"
            />
            <span className="text-lg font-bold tracking-wide">
              <span className="gold-gradient-text">SHIVA</span>
              <span className="text-white/90">BAKTHI</span>
            </span>
          </Link>
          <div className="hidden sm:flex items-center gap-2 text-xs text-white/40">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Trusted by 10,000+ users</span>
          </div>
        </div>
      </div>

      {/* ─── Hero Section ─── */}
      <section className="relative z-10 pt-12 pb-8 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#cfa375]/10 border border-[#cfa375]/20 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#cfa375]" />
            <span className="text-xs font-semibold text-[#cfa375] uppercase tracking-wider">
              Guided by Ancient Wisdom
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            This Is Not a{" "}
            <span className="gold-gradient-text">Coincidence</span>
          </h1>

          <p className="text-[#b0a8c8] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-4">
            Among countless websites and astrologers, you are here — and that
            matters.
          </p>

          <p className="text-[#b0a8c8]/70 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-6">
            Under the grace of{" "}
            <span className="text-[#cfa375] font-semibold">Lord Shiva</span>,
            this is offered as sincere spiritual guidance — not superstition,
            not false promises.
          </p>

          {/* Philosophy lines */}
          <div className="max-w-xl mx-auto mb-8 space-y-4">
            <div className="w-12 h-px bg-[#cfa375]/30 mx-auto" />
            <p className="text-white/80 text-sm sm:text-base leading-relaxed italic">
              Life moves in phases. Some expand you. Some test you. Some prepare
              you.
            </p>
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
              Astrology does not control destiny. It reveals{" "}
              <span className="text-[#cfa375] font-semibold">timing</span>.
              <br />
              And when timing is understood, decisions become calmer — and
              calmer decisions{" "}
              <span className="text-white font-medium">change outcomes</span>.
            </p>
            <div className="w-12 h-px bg-[#cfa375]/30 mx-auto" />
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/50">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-[#cfa375] fill-[#cfa375]"
                  />
                ))}
              </div>
              <span>4.9/5 Rating</span>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> 10,000+ Seekers
            </span>
            <div className="h-4 w-px bg-white/10" />
            <span className="flex items-center gap-1.5">
              <FileText className="w-4 h-4" /> 65+ Page Reports
            </span>
            <div className="h-4 w-px bg-white/10" />
            <span className="flex items-center gap-1.5">
              <Timer className="w-4 h-4" /> Delivered in 24hrs
            </span>
          </div>
        </div>
      </section>

      {/* ─── Report Variant Selector ─── */}
      <section className="relative z-10 px-6 pb-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Choose the Depth of{" "}
              <span className="gold-gradient-text">Insight</span>
            </h2>
            <p className="text-[#b0a8c8] text-sm">
              That aligns with where you stand today
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {reportVariants.map((variant, index) => {
              const isSelected = selectedVariant === index;
              return (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => setSelectedVariant(index)}
                  className={`relative text-left rounded-2xl p-6 transition-all duration-300 overflow-hidden group ${
                    isSelected
                      ? "bg-gradient-to-b from-[#1a1347] to-[#0f0a2e] border-2 border-[#cfa375] shadow-xl shadow-[#cfa375]/15 scale-[1.02]"
                      : "bg-[#1a1347]/40 border border-white/10 hover:border-[#cfa375]/30 hover:bg-[#1a1347]/60"
                  }`}
                >
                  {/* Popular badge */}
                  {variant.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[#cfa375] to-[#e8c99b] py-1.5 text-center">
                      <span className="text-[10px] font-bold text-[#0f0a2e] uppercase tracking-widest">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className={variant.popular ? "pt-6" : ""}>
                    {/* Icon + Duration */}
                    <div className="flex items-center justify-between mb-4">
                      <variant.icon className="w-8 h-8 text-[#cfa375]" />
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          isSelected
                            ? "bg-[#cfa375]/20 text-[#cfa375]"
                            : "bg-white/5 text-white/50"
                        }`}
                      >
                        {variant.duration}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-1">
                      {variant.title}
                    </h3>
                    <p className="text-xs text-[#cfa375] font-medium mb-3">
                      {variant.subtitle}
                    </p>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-3xl font-bold text-white">
                        ₹{variant.price}
                      </span>
                      <span className="text-sm text-white/40 line-through">
                        ₹{variant.originalPrice}
                      </span>
                      <span className="text-xs font-semibold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
                        {Math.round(
                          ((variant.originalPrice - variant.price) /
                            variant.originalPrice) *
                            100,
                        )}
                        % OFF
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-[#b0a8c8] leading-relaxed mb-4">
                      {variant.description}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-2">
                      {variant.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              isSelected ? "text-[#cfa375]" : "text-white/30"
                            }`}
                          />
                          <span className="text-xs text-[#b0a8c8]">{h}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Selection indicator */}
                    <div
                      className={`mt-5 w-full py-2.5 rounded-xl text-center text-sm font-semibold transition-all ${
                        isSelected
                          ? "bg-[#cfa375] text-[#0f0a2e]"
                          : "bg-white/5 text-white/40 group-hover:bg-white/10"
                      }`}
                    >
                      {isSelected ? "✓ Selected" : "Select Plan"}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Form Section ─── */}
      <section className="relative z-10 px-6 pb-20">
        <div className="max-w-2xl mx-auto">
          <div className="bg-[#1a1347] border border-[#cfa375]/20 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-[#0f0a2e]/50">
            {/* Form header */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">
                Enter Your Birth Details
              </h3>
              <p className="text-[#b0a8c8] text-sm">
                We need your birth details for accurate Vedic analysis
              </p>
              {/* Selected plan pill */}
              <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-[#cfa375]/10 border border-[#cfa375]/20">
                <selected.icon className="w-4 h-4 text-[#cfa375]" />
                <span className="text-sm font-semibold text-[#cfa375]">
                  {selected.title} — ₹{selected.price}
                </span>
              </div>
            </div>

            <form className="space-y-5">
              {/* Name fields */}
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
                      className="w-full bg-[#0f0a2e]/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-3 text-white placeholder-white/20 focus:outline-none focus:border-[#cfa375]/50 transition-colors"
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
                    className="w-full bg-[#0f0a2e]/50 border border-white/10 rounded-xl py-2.5 px-3 text-white placeholder-white/20 focus:outline-none focus:border-[#cfa375]/50 transition-colors"
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
                    <select className="w-full bg-[#0f0a2e]/50 border border-white/10 rounded-xl py-2.5 pl-8 pr-2 text-white/80 focus:outline-none focus:border-[#cfa375]/50 appearance-none text-sm">
                      <option value="">Day</option>
                      {Array.from({ length: 31 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <select className="w-full bg-[#0f0a2e]/50 border border-white/10 rounded-xl py-2.5 px-3 text-white/80 focus:outline-none focus:border-[#cfa375]/50 appearance-none text-sm">
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
                  <select className="w-full bg-[#0f0a2e]/50 border border-white/10 rounded-xl py-2.5 px-3 text-white/80 focus:outline-none focus:border-[#cfa375]/50 appearance-none text-sm">
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
                    <select className="w-full bg-[#0f0a2e]/50 border border-white/10 rounded-xl py-2.5 pl-8 pr-2 text-white/80 focus:outline-none focus:border-[#cfa375]/50 appearance-none text-sm">
                      <option value="">Hr</option>
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <select className="w-full bg-[#0f0a2e]/50 border border-white/10 rounded-xl py-2.5 px-3 text-white/80 focus:outline-none focus:border-[#cfa375]/50 appearance-none text-sm">
                    <option value="">Min</option>
                    {Array.from({ length: 60 }, (_, i) => (
                      <option key={i} value={i}>
                        {i.toString().padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                  <select className="w-full bg-[#0f0a2e]/50 border border-white/10 rounded-xl py-2.5 px-3 text-white/80 focus:outline-none focus:border-[#cfa375]/50 appearance-none text-sm">
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
                    className="w-full bg-[#0f0a2e]/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-3 text-white placeholder-white/20 focus:outline-none focus:border-[#cfa375]/50 transition-colors"
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-[#cfa375] font-semibold uppercase tracking-wider pl-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-white/40" />
                    <input
                      type="email"
                      placeholder="you@email.com"
                      className="w-full bg-[#0f0a2e]/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-3 text-white placeholder-white/20 focus:outline-none focus:border-[#cfa375]/50 transition-colors"
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
                      className="w-full bg-[#0f0a2e]/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-3 text-white placeholder-white/20 focus:outline-none focus:border-[#cfa375]/50 transition-colors"
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
                  <select className="w-full bg-[#0f0a2e]/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-3 text-white/80 focus:outline-none focus:border-[#cfa375]/50 appearance-none">
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                  </select>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#cfa375] to-[#b8894f] hover:from-[#e8c99b] hover:to-[#cfa375] text-[#0f0a2e] font-bold py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-[#cfa375]/20 hover:shadow-[#cfa375]/40 hover:-translate-y-0.5 text-lg"
                >
                  Proceed to Payment — ₹{selected.price}
                  <ArrowRight className="w-5 h-5" />
                </button>

                <p className="text-center text-xs text-white/30 mt-4">
                  By continuing, you agree to our{" "}
                  <Link
                    href="/terms-and-conditions"
                    className="underline hover:text-white/50"
                  >
                    Terms
                  </Link>{" "}
                  &{" "}
                  <Link
                    href="/privacy-policy"
                    className="underline hover:text-white/50"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </form>
          </div>

          {/* Bottom trust row */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs text-white/40">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Secure Payment</span>
            </div>
            <div className="h-3.5 w-px bg-white/10" />
            <span className="flex items-center gap-1.5">
              <Lock className="w-4 h-4" /> SSL Encrypted
            </span>
            <div className="h-3.5 w-px bg-white/10" />
            <span className="flex items-center gap-1.5">
              <Send className="w-4 h-4" /> 24hr Delivery
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
