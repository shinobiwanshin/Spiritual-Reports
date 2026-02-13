import Link from "next/link";

const features = [
  {
    icon: "📊",
    title: "Clear & Structured Information",
    description:
      "All insights are presented in an easy-to-understand and well-organized format.",
  },
  {
    icon: "🎯",
    title: "Focus on Key Life Areas",
    description:
      "Content is designed to address career planning, relationships, finances, and personal growth.",
  },
  {
    icon: "🔍",
    title: "Self-Reflection Support",
    description:
      "Encourages awareness of habits, preferences, and decision patterns for better self-understanding.",
  },
  {
    icon: "💡",
    title: "Practical Suggestions",
    description:
      "Includes general recommendations that support planning, focus, and consistency.",
  },
  {
    icon: "⚡",
    title: "Action-Oriented Approach",
    description:
      "Designed to help users apply insights gradually in daily life for meaningful change.",
  },
  {
    icon: "🛡️",
    title: "Ethical & Responsible Use",
    description:
      "No misleading claims, guarantees, or unrealistic promises are made.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* ========== HERO SECTION ========== */}
      <section className="relative starfield min-h-screen flex items-center justify-center px-6">
        {/* Background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#cfa375]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-[#241a5e]/30 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center animate-fade-in-up">
          {/* Subtle tag */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#cfa375]/10 border border-[#cfa375]/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#cfa375] animate-pulse" />
            <span className="text-xs font-medium text-[#cfa375] uppercase tracking-wider">
              Personalized Insights & Guidance
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6">
            <span className="text-white">You&apos;re Here for </span>
            <span className="gold-gradient-text">Insight</span>
            <span className="text-white">, </span>
            <span className="gold-gradient-text">Clarity</span>
            <span className="text-white">, and </span>
            <br className="hidden sm:block" />
            <span className="gold-gradient-text">Better Understanding</span>
          </h1>

          <p className="text-lg sm:text-xl text-[#b0a8c8] max-w-2xl mx-auto mb-10 leading-relaxed">
            Finding the right information at the right time can bring clarity
            and confidence. This platform is designed to help individuals better
            understand themselves through structured analysis and personalized
            insights.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/services"
              className="gold-btn px-8 py-4 rounded-full text-base font-semibold shadow-lg shadow-[#cfa375]/20"
            >
              Get Your Report
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 rounded-full text-base font-medium text-white/80 border border-white/10 hover:border-[#cfa375]/30 hover:bg-white/5 transition-all"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-[#cfa375]/30 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-3 rounded-full bg-[#cfa375]/60 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ========== WHAT YOU CAN EXPECT ========== */}
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#cfa375] text-sm font-semibold uppercase tracking-wider mb-3">
              What We Offer
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              What You Can <span className="gold-gradient-text">Expect</span>
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#cfa375] to-transparent mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl p-8 group cursor-default"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-[#cfa375]/10 flex items-center justify-center text-2xl mb-5 group-hover:bg-[#cfa375]/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#b0a8c8] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== ABOUT SECTION ========== */}
      <section className="relative py-24 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a1347]/30 to-transparent pointer-events-none" />

        <div className="relative max-w-5xl mx-auto">
          <div className="glass-card rounded-3xl p-10 md:p-16 text-center">
            <p className="text-[#cfa375] text-sm font-semibold uppercase tracking-wider mb-3">
              About Us
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Welcome to{" "}
              <span className="gold-gradient-text">Astra Spiritual</span>
            </h2>
            <p className="text-[#b0a8c8] text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-8">
              A platform focused on personalized informational reports and
              structured consultations. Our objective is to present customized
              reports based on user-provided details, formatted to help
              individuals better understand themselves and plan ahead with
              clarity.
            </p>
            <p className="text-[#b0a8c8] text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-10">
              We emphasize responsible communication, transparency, and user
              awareness. All content is intended for informational and
              self-assessment purposes only. The platform is designed for users
              seeking organized insights and thoughtful guidance to support
              personal and professional decision-making.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/services"
                className="gold-btn px-8 py-3.5 rounded-full text-sm font-semibold"
              >
                View Reports
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3.5 rounded-full text-sm font-medium text-white/80 border border-white/10 hover:border-[#cfa375]/30 hover:bg-white/5 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="relative py-24 px-6 starfield">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0a2e] via-transparent to-[#0f0a2e] pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Gain <span className="gold-gradient-text">Clarity</span>?
          </h2>
          <p className="text-[#b0a8c8] text-lg mb-10 leading-relaxed">
            Explore our comprehensive 1, 3, and 5-year reports designed to help
            you understand patterns, tendencies, and areas of improvement for
            better decision-making.
          </p>
          <Link
            href="/services"
            className="gold-btn px-10 py-4 rounded-full text-base font-semibold shadow-lg shadow-[#cfa375]/20 inline-block"
          >
            Explore Reports
          </Link>
        </div>
      </section>
    </div>
  );
}
