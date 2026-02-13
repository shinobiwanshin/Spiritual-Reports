import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Astra Spiritual",
  description:
    "Learn about Astra Spiritual — our mission, values, and commitment to providing personalized insights and structured guidance.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <p className="text-[#cfa375] text-sm font-semibold uppercase tracking-wider mb-3">
          About Us
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
          Welcome to <span className="gold-gradient-text">Astra Spiritual</span>
        </h1>
        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#cfa375] to-transparent mx-auto" />
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Mission */}
        <div className="glass-card rounded-3xl p-10 md:p-14">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#cfa375]/10 flex items-center justify-center text-2xl">
              🎯
            </div>
            <h2 className="text-2xl font-bold text-white">Our Mission</h2>
          </div>
          <p className="text-[#b0a8c8] text-base leading-relaxed mb-4">
            At Astra Spiritual, our objective is to present customized reports
            based on user-provided details, formatted to help individuals better
            understand themselves and plan ahead with clarity.
          </p>
          <p className="text-[#b0a8c8] text-base leading-relaxed">
            We believe that finding the right information at the right time can
            bring confidence and direction. Many people reach a point where they
            want to reflect, evaluate their direction, and make informed
            decisions about life, work, and relationships. This space exists to
            support that process in a simple and thoughtful way.
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card rounded-2xl p-8">
            <div className="w-12 h-12 rounded-xl bg-[#cfa375]/10 flex items-center justify-center text-2xl mb-4">
              🤝
            </div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Transparency
            </h3>
            <p className="text-sm text-[#b0a8c8] leading-relaxed">
              We emphasize responsible communication and complete transparency.
              All content is intended for informational and self-assessment
              purposes only, with no misleading claims or unrealistic promises.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-8">
            <div className="w-12 h-12 rounded-xl bg-[#cfa375]/10 flex items-center justify-center text-2xl mb-4">
              📋
            </div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Structured Approach
            </h3>
            <p className="text-sm text-[#b0a8c8] leading-relaxed">
              By organizing personal inputs into a detailed report format, the
              goal is to help users gain perspective on patterns, tendencies,
              and areas of improvement that can support better decision-making.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-8">
            <div className="w-12 h-12 rounded-xl bg-[#cfa375]/10 flex items-center justify-center text-2xl mb-4">
              👤
            </div>
            <h3 className="text-lg font-semibold text-white mb-3">
              User-Centered
            </h3>
            <p className="text-sm text-[#b0a8c8] leading-relaxed">
              The platform is designed for users seeking organized insights and
              thoughtful guidance to support personal and professional
              decision-making at every stage of life.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-8">
            <div className="w-12 h-12 rounded-xl bg-[#cfa375]/10 flex items-center justify-center text-2xl mb-4">
              🛡️
            </div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Ethical Practice
            </h3>
            <p className="text-sm text-[#b0a8c8] leading-relaxed">
              We are committed to ethical and responsible use of information.
              Our recommendations are practical, action-oriented, and designed
              to encourage genuine self-reflection and awareness.
            </p>
          </div>
        </div>

        {/* What We Do */}
        <div className="glass-card rounded-3xl p-10 md:p-14">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#cfa375]/10 flex items-center justify-center text-2xl">
              ✨
            </div>
            <h2 className="text-2xl font-bold text-white">What We Do</h2>
          </div>
          <p className="text-[#b0a8c8] text-base leading-relaxed mb-4">
            We provide personalized reports spanning 1, 3, and 5-year periods,
            covering key life areas including career, relationships, finances,
            health, and personal growth. Each report is carefully structured to
            present information in a clear, actionable format.
          </p>
          <p className="text-[#b0a8c8] text-base leading-relaxed">
            Our consultations are designed to address your specific concerns and
            questions, providing you with targeted insights that support your
            unique journey. Whether you&apos;re planning a career transition,
            navigating relationship dynamics, or seeking personal clarity,
            we&apos;re here to support you with structured, thoughtful guidance.
          </p>
        </div>
      </div>
    </div>
  );
}
