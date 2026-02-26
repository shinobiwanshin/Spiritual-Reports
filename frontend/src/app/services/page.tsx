import Link from "next/link";
import type { Metadata } from "next";
import { db } from "@/db";
import { services as servicesTable } from "@/db/schema";
import { getIcon } from "@/lib/icon-map";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Services — Shivabakthi",
  description:
    "Explore our personalized 1-year, 3-year, and 5-year astrology reports. Gain insights into career, relationships, finances, and personal growth.",
};

export default async function ServicesPage() {
  const reports = await db.select().from(servicesTable);

  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <p className="text-[#cfa375] text-sm font-semibold uppercase tracking-wider mb-3">
          Our Services
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
          Personalized <span className="gold-gradient-text">Reports</span>
        </h1>
        <p className="text-[#b0a8c8] text-lg leading-relaxed max-w-2xl mx-auto">
          Curious about what the future may bring? Explore the key phases,
          patterns, and turning points shaping your personal journey. Choose the
          report that best fits your needs.
        </p>
        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#cfa375] to-transparent mx-auto mt-6" />
      </div>

      {/* Reports Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {reports.map((report) => {
          const Icon = getIcon(report.iconName);
          const highlights = report.highlights as string[];
          return (
            <div
              key={report.id}
              className={`glass-card rounded-3xl overflow-hidden group relative ${
                report.featured
                  ? "ring-2 ring-[#cfa375]/30 shadow-xl shadow-[#cfa375]/10"
                  : ""
              }`}
            >
              {/* Featured badge */}
              {report.featured && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[#cfa375] to-[#e8c99b] text-[#0f0a2e] text-center text-xs font-bold py-2 tracking-wider uppercase z-10">
                  Most Popular
                </div>
              )}

              <div className={`p-8 ${report.featured ? "pt-14" : "pt-8"}`}>
                {/* Icon and duration */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#cfa375]/20 to-[#cfa375]/5 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-[#cfa375]" />
                  </div>
                  <span className="px-4 py-1.5 rounded-full bg-[#cfa375]/10 text-[#cfa375] text-xs font-semibold">
                    {report.duration}
                  </span>
                </div>

                {/* Title & subtitle */}
                <h3 className="text-2xl font-bold text-white mb-1">
                  {report.title}
                </h3>
                <p className="text-sm text-[#cfa375] font-medium mb-4">
                  {report.subtitle}
                </p>

                {/* Description */}
                <p className="text-sm text-[#b0a8c8] leading-relaxed mb-4">
                  {report.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">
                      ₹{report.price}
                    </span>
                    <span className="text-sm text-[#b0a8c8]">/report</span>
                  </div>
                </div>

                {/* Highlights */}
                <ul className="space-y-2 mb-8">
                  {highlights.map((highlight, hIndex) => (
                    <li
                      key={hIndex}
                      className="flex items-center gap-3 text-sm text-[#b0a8c8]"
                    >
                      <CheckCircle className="w-4 h-4 text-[#cfa375] shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={`/ig`}
                  className={`block w-full text-center py-3.5 rounded-xl font-semibold text-sm transition-all ${
                    report.featured
                      ? "bg-gradient-to-r from-[#cfa375] to-[#e8c99b] text-[#0f0a2e] shadow-lg shadow-[#cfa375]/20 hover:shadow-[#cfa375]/40"
                      : "border border-[#cfa375]/30 text-[#cfa375] hover:bg-[#cfa375]/10"
                  }`}
                >
                  Get This Report
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="max-w-3xl mx-auto mt-20 text-center">
        <div className="glass-card rounded-3xl p-10 md:p-14">
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
    </div>
  );
}
