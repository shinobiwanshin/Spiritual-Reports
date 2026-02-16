import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions — Shivabakthi",
  description:
    "Read our terms and conditions for using Shivabakthi services and platform.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#cfa375] text-sm font-semibold uppercase tracking-wider mb-3">
            Legal
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Terms & <span className="gold-gradient-text">Conditions</span>
          </h1>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#cfa375] to-transparent mx-auto" />
        </div>

        {/* Content */}
        <div className="glass-card rounded-3xl p-8 md:p-12 space-y-8">
          <div>
            <p className="text-[#b0a8c8] text-sm mb-6">
              Last updated: February 2026
            </p>
            <p className="text-[#b0a8c8] leading-relaxed">
              Welcome to Shivabakthi. By accessing or using our website and
              services, you agree to be bound by these Terms and Conditions.
              Please read them carefully before using our platform.
            </p>
          </div>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              1. Definitions
            </h2>
            <ul className="space-y-2 text-[#b0a8c8] text-sm list-none">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#cfa375] mt-2 flex-shrink-0" />
                <span>
                  <strong className="text-white">&quot;Platform&quot;</strong>{" "}
                  refers to the Shivabakthi website and all associated services.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#cfa375] mt-2 flex-shrink-0" />
                <span>
                  <strong className="text-white">&quot;User&quot;</strong>{" "}
                  refers to any individual who accesses or uses the Platform.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#cfa375] mt-2 flex-shrink-0" />
                <span>
                  <strong className="text-white">&quot;Services&quot;</strong>{" "}
                  refers to personalized reports, consultations, and other
                  offerings provided through the Platform.
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              2. Scope and Usage
            </h2>
            <p className="text-[#b0a8c8] leading-relaxed">
              All services offered on this platform are for informational and
              self-assessment purposes only. They should not be considered as
              professional legal, medical, financial, or psychological advice.
              Users are encouraged to seek professional guidance for specific
              concerns.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              3. User Responsibilities
            </h2>
            <ul className="space-y-2 text-[#b0a8c8] text-sm list-none">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#cfa375] mt-2 flex-shrink-0" />
                <span>
                  Users must provide accurate and complete information for
                  report generation.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#cfa375] mt-2 flex-shrink-0" />
                <span>
                  Users are responsible for maintaining the confidentiality of
                  their account information.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#cfa375] mt-2 flex-shrink-0" />
                <span>
                  Users must not misuse, redistribute, or resell any content or
                  reports obtained from the Platform.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#cfa375] mt-2 flex-shrink-0" />
                <span>
                  Users agree to use the Platform only for lawful purposes.
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              4. Intellectual Property
            </h2>
            <p className="text-[#b0a8c8] leading-relaxed">
              All content, including text, graphics, logos, reports, and
              software on this Platform, is the intellectual property of
              Shivabakthi laws. Unauthorized reproduction, distribution, or
              modification of any content is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              5. Payment Terms
            </h2>
            <p className="text-[#b0a8c8] leading-relaxed">
              All payments are processed through secure third-party payment
              gateways. Prices are listed in Indian Rupees (INR) unless
              otherwise specified. By making a purchase, you agree to the
              pricing and payment terms displayed at the time of order.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              6. Limitation of Liability
            </h2>
            <p className="text-[#b0a8c8] leading-relaxed">
              Shivabakthi shall not be held liable for any direct, indirect,
              incidental, or consequential damages arising from the use of our
              services. The information provided is for general guidance and
              informational purposes only. Users acknowledge that decisions made
              based on our reports are at their own discretion and risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              7. Updates to Terms
            </h2>
            <p className="text-[#b0a8c8] leading-relaxed">
              We reserve the right to modify these Terms and Conditions at any
              time. Changes will be posted on this page with an updated revision
              date. Continued use of the Platform after changes constitutes
              acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              8. Governing Law
            </h2>
            <p className="text-[#b0a8c8] leading-relaxed">
              These Terms and Conditions are governed by and construed in
              accordance with the laws of India. Any disputes arising from these
              terms shall be subject to the exclusive jurisdiction of the courts
              in Gujarat, India.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              9. Contact
            </h2>
            <p className="text-[#b0a8c8] leading-relaxed">
              For any questions regarding these Terms and Conditions, please
              contact us at{" "}
              <a
                href="mailto:info@shivabakthi.com"
                className="text-[#cfa375] hover:underline"
              >
                info@shivabakthi.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
