"use client";

import Link from "next/link";
import {
  Sparkles,
  Star,
  ShieldCheck,
  FileText,
  Timer,
  CheckCircle,
  ArrowRight,
  Crown,
  Send,
} from "lucide-react";
import VideoBackground from "@/components/VideoBackground";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import { getIcon } from "@/lib/icon-map";

/* ───────────────────────────── Types ───────────────────────────── */

export interface ServiceVariant {
  id: number;
  slug: string;
  duration: string;
  title: string;
  subtitle: string;
  price: number;
  description: string;
  highlights: string[];
  iconName: string;
  accent: string;
  featured: boolean | null;
}




/* ──────────────── Page count helper ──────────────── */

function getPageCount(duration: string): number {
  const d = duration.toLowerCase();
  if (d.includes("1")) return 30;
  if (d.includes("3")) return 50;
  return 80;
}

/* ──────────────────────────────── Component ──────────────────────────────── */

export default function IgLanding({
  services,
}: {
  services: ServiceVariant[];
}) {


  return (
    <div className="min-h-screen bg-[#0f0a2e] text-white relative overflow-hidden">
      {/* Video background */}
      <div className="fixed inset-0 z-0">
        <VideoBackground overlayOpacity={0.55} />
      </div>

      {/* ─── Hero Section ─── */}
      <section className="relative z-10 pt-28 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#cfa375]/10 border border-[#cfa375]/20 mb-6 animate-fade-in-up">
            <Sparkles className="w-3.5 h-3.5 text-[#cfa375]" />
            <span className="text-xs font-semibold text-[#cfa375] uppercase tracking-wider">
              Guided by Ancient Wisdom
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in-up">
            ULTIMATE PERSONALISED <span className="gold-gradient-text">ASTROLOGY REPORT</span>
          </h1>

          <p className="text-[#b0a8c8] text-lg sm:text-xl font-medium leading-relaxed max-w-2xl mx-auto mb-4 animate-fade-in-up">
            Your future is already decided...<br className="hidden sm:block" />
            The only question is — <span className="text-white">do you want to know it before it happens?</span>
          </p>

          <p className="text-[#b0a8c8]/70 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-6 animate-fade-in-up">
            Under the grace of{" "}
            <span className="text-[#cfa375] font-semibold">Lord Shiva</span>,
            this is offered as sincere spiritual guidance — not superstition,
            not false promises.
          </p>


          {/* Trust row */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/50 animate-fade-in-up">
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
            <span className="flex items-center gap-1.5 font-semibold text-white/90">
              <ShieldCheck className="w-5 h-5 text-[#10b981]" /> 100+ orders in
              the last 24 hours
            </span>
            <div className="h-4 w-px bg-white/10" />
            <span className="flex items-center gap-1.5">
              <FileText className="w-4 h-4" /> 30–80 Page Reports
            </span>
            <div className="h-4 w-px bg-white/10" />
            <span className="flex items-center gap-1.5">
              <Send className="w-4 h-4" /> Delivered via Email
            </span>
          </div>
        </div>
      </section>

      {/* ─── Reports Catalog ─── */}
      <section className="relative z-10 px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Choose the Depth of{" "}
              <span className="gold-gradient-text">Insight</span>
            </h2>
            <p className="text-[#b0a8c8] text-sm">
              That aligns with where you stand today
            </p>
          </div>

          <div
            className={`grid grid-cols-1 ${
              services.length === 2
                ? "md:grid-cols-2 max-w-3xl mx-auto"
                : services.length >= 3
                  ? "md:grid-cols-3"
                  : "max-w-md mx-auto"
            } gap-6`}
          >
            {services.map((variant, index) => {
              const Icon = getIcon(variant.iconName);
              return (
                <Link
                  key={variant.id}
                  href={`/ig/${variant.slug}`}
                  className={`report-card relative text-left rounded-3xl p-7 transition-all duration-500 overflow-hidden group block ${
                    variant.featured
                      ? "bg-gradient-to-b from-[#1e1550] to-[#13103a] border-2 border-[#cfa375]/40 shadow-xl shadow-[#cfa375]/10"
                      : "bg-[#1a1347]/50 border border-white/[0.08] hover:border-[#cfa375]/30"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#cfa375]/5 to-transparent rounded-3xl" />

                  {/* Popular badge */}
                  {variant.featured && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[#cfa375] to-[#e8c99b] py-2 text-center">
                      <span className="text-[10px] font-bold text-[#0f0a2e] uppercase tracking-widest flex items-center justify-center gap-1.5">
                        <Crown className="w-3 h-3" />
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div
                    className={`relative z-10 ${variant.featured ? "pt-6" : ""}`}
                  >
                    {/* Icon + Duration */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#cfa375]/15 to-[#cfa375]/5 flex items-center justify-center group-hover:from-[#cfa375]/25 group-hover:to-[#cfa375]/10 transition-all duration-500">
                        <Icon className="w-6 h-6 text-[#cfa375]" />
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#cfa375]/10 text-[#cfa375] border border-[#cfa375]/10">
                        {variant.duration}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#e8c99b] transition-colors duration-300">
                      {variant.title}
                    </h3>
                    <p className="text-xs text-[#cfa375] font-medium mb-4">
                      {variant.subtitle}
                    </p>

                    {/* Price + Page count */}
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-3xl font-bold text-white">
                        ₹{variant.price}
                      </span>
                      <span className="text-xs text-white/30">/report</span>
                    </div>
                    <div className="flex items-center gap-1.5 mb-5 text-xs text-white/40">
                      <FileText className="w-3.5 h-3.5 text-[#cfa375]/50" />
                      <span>{getPageCount(variant.duration)}+ pages</span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-[#b0a8c8] leading-relaxed mb-5">
                      {variant.description}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-2.5 mb-6">
                      {variant.highlights.slice(0, 4).map((h, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#cfa375]/70" />
                          <span className="text-xs text-[#b0a8c8]">{h}</span>
                        </li>
                      ))}
                      {variant.highlights.length > 4 && (
                        <li className="text-xs text-white/30 pl-6">
                          +{variant.highlights.length - 4} more included
                        </li>
                      )}
                    </ul>

                    {/* CTA */}
                    <div
                      className={`w-full py-3 rounded-xl text-center text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                        variant.featured
                          ? "bg-gradient-to-r from-[#cfa375] to-[#b8894f] text-[#0f0a2e] shadow-lg shadow-[#cfa375]/20 group-hover:shadow-[#cfa375]/40 group-hover:from-[#e8c99b] group-hover:to-[#cfa375]"
                          : "bg-white/5 text-white/60 border border-white/10 group-hover:bg-[#cfa375] group-hover:text-[#0f0a2e] group-hover:border-[#cfa375]"
                      }`}
                    >
                      Get This Report
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <TestimonialCarousel />

      {/* ─── Bottom Philosophy Section ─── */}
      <section className="relative z-10 px-6 pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-10 md:p-14 backdrop-blur-sm">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Not Sure Which Report to{" "}
              <span className="gold-gradient-text">Choose</span>?
            </h2>
            <p className="text-[#b0a8c8] text-base leading-relaxed mb-8 max-w-xl mx-auto">
              Contact us for a free consultation to understand which report best
              suits your needs and goals.
            </p>
            <Link
              href="/contact"
              className="gold-btn px-10 py-4 rounded-full text-base font-semibold shadow-lg shadow-[#cfa375]/20 inline-block"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
