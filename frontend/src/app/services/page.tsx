import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services — Astra Spiritual Reports",
  description:
    "Explore our personalized 1-year, 3-year, and 5-year astrology reports. Gain insights into career, relationships, finances, and personal growth.",
};

const reports = [
  {
    id: "1-year",
    title: "1-Year Report",
    subtitle: "Short-Term Clarity",
    duration: "1 Year",
    description:
      "Get a detailed overview of the next 12 months. Understand the key phases, opportunities, and challenges that lie ahead. Perfect for immediate planning and short-term decision-making.",
    highlights: [
      "Monthly breakdown of key influences",
      "Career & financial outlook",
      "Relationship dynamics",
      "Health & wellness guidance",
      "Actionable recommendations",
    ],
    icon: "📅",
    accent: "from-[#cfa375] to-[#e8c99b]",
  },
  {
    id: "3-year",
    title: "3-Year Report",
    subtitle: "Mid-Term Strategy",
    duration: "3 Years",
    description:
      "Explore the key phases, patterns, and turning points shaping your personal journey over the next three years. Learn how to align with opportunities for growth, balance, and success.",
    highlights: [
      "Year-by-year strategic overview",
      "Major life transition periods",
      "Career growth trajectory",
      "Relationship evolution patterns",
      "Financial planning insights",
      "Personal development milestones",
    ],
    icon: "📊",
    accent: "from-[#e8c99b] to-[#cfa375]",
    featured: true,
  },
  {
    id: "5-year",
    title: "5-Year Report",
    subtitle: "Long-Term Vision",
    duration: "5 Years",
    description:
      "A comprehensive long-term analysis covering five years of your journey. Ideal for those who want to plan major life decisions, career shifts, and personal transformation with confidence.",
    highlights: [
      "Comprehensive 5-year roadmap",
      "Long-term career & business strategy",
      "Major milestone predictions",
      "Wealth & asset building phases",
      "Relationship & family planning",
      "Life purpose & spiritual growth",
      "Risk assessment & mitigation",
    ],
    icon: "🗺️",
    accent: "from-[#b8894f] to-[#cfa375]",
  },
];

export default function ServicesPage() {
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
        {reports.map((report) => (
          <div
            key={report.id}
            className={`relative glass-card rounded-3xl overflow-hidden group ${
              report.featured ? "lg:scale-105 lg:z-10" : ""
            }`}
          >
            {/* Featured badge */}
            {report.featured && (
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[#cfa375] to-[#e8c99b] py-2 text-center">
                <span className="text-xs font-bold text-[#0f0a2e] uppercase tracking-wider">
                  Most Popular
                </span>
              </div>
            )}

            <div className={`p-8 ${report.featured ? "pt-14" : "pt-8"}`}>
              {/* Icon and duration */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#cfa375]/20 to-[#cfa375]/5 flex items-center justify-center text-3xl">
                  {report.icon}
                </div>
                <span className="px-4 py-1.5 rounded-full bg-[#cfa375]/10 text-[#cfa375] text-xs font-semibold">
                  {report.duration}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-1">
                {report.title}
              </h3>
              <p className="text-sm text-[#cfa375] font-medium mb-4">
                {report.subtitle}
              </p>

              {/* Description */}
              <p className="text-sm text-[#b0a8c8] leading-relaxed mb-6">
                {report.description}
              </p>

              {/* Highlights */}
              <ul className="space-y-3 mb-8">
                {report.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#cfa375]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#cfa375]" />
                    </span>
                    <span className="text-sm text-[#b0a8c8]">{highlight}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link
                href={`/reports/${report.id}`}
                className={`block w-full text-center gold-btn py-3.5 rounded-full text-sm font-semibold ${
                  report.featured ? "shadow-lg shadow-[#cfa375]/20" : ""
                }`}
              >
                Get This Report
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="max-w-3xl mx-auto text-center mt-20">
        <p className="text-[#b0a8c8] text-base mb-6">
          Not sure which report is right for you? Contact us for a free
          consultation and we&apos;ll help you choose the best option for your
          needs.
        </p>
        <Link
          href="/contact"
          className="inline-block px-8 py-3.5 rounded-full text-sm font-medium text-white/80 border border-white/10 hover:border-[#cfa375]/30 hover:bg-white/5 transition-all"
        >
          Contact Us for Guidance
        </Link>
      </div>
    </div>
  );
}
