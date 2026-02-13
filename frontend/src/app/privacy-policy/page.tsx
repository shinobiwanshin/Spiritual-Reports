import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Astra Spiritual",
  description:
    "Read our privacy policy to understand how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#cfa375] text-sm font-semibold uppercase tracking-wider mb-3">
            Legal
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Privacy <span className="gold-gradient-text">Policy</span>
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
              At Astra Spiritual, we are committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you visit our website and use our
              services.
            </p>
          </div>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              1. Information We Collect
            </h2>
            <p className="text-[#b0a8c8] leading-relaxed mb-3">
              We may collect the following types of information:
            </p>
            <ul className="space-y-2 text-[#b0a8c8] text-sm list-none">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#cfa375] mt-2 flex-shrink-0" />
                <span>
                  <strong className="text-white">Personal Information:</strong>{" "}
                  Name, date of birth, time and place of birth, email address,
                  phone number, and other details you provide for report
                  generation.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#cfa375] mt-2 flex-shrink-0" />
                <span>
                  <strong className="text-white">Payment Information:</strong>{" "}
                  Transaction details processed through secure third-party
                  payment gateways.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#cfa375] mt-2 flex-shrink-0" />
                <span>
                  <strong className="text-white">Usage Data:</strong> Browser
                  type, IP address, pages visited, time spent on pages, and
                  other analytical data.
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              2. How We Use Your Information
            </h2>
            <ul className="space-y-2 text-[#b0a8c8] text-sm list-none">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#cfa375] mt-2 flex-shrink-0" />
                <span>
                  To generate and deliver personalized reports based on your
                  provided details.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#cfa375] mt-2 flex-shrink-0" />
                <span>To process payments and send order confirmations.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#cfa375] mt-2 flex-shrink-0" />
                <span>
                  To communicate with you regarding your orders, consultations,
                  and support requests.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#cfa375] mt-2 flex-shrink-0" />
                <span>
                  To improve our website, services, and user experience.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#cfa375] mt-2 flex-shrink-0" />
                <span>
                  To comply with legal obligations and enforce our terms.
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              3. Data Protection
            </h2>
            <p className="text-[#b0a8c8] leading-relaxed">
              We implement appropriate technical and organizational security
              measures to protect your personal information against unauthorized
              access, alteration, disclosure, or destruction. Your data is
              stored securely and accessed only by authorized personnel.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              4. Third-Party Services
            </h2>
            <p className="text-[#b0a8c8] leading-relaxed">
              We may use third-party services for payment processing, analytics,
              and communication. These services have their own privacy policies,
              and we encourage you to review them. We do not sell, trade, or
              rent your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              5. Cookies
            </h2>
            <p className="text-[#b0a8c8] leading-relaxed">
              Our website may use cookies and similar tracking technologies to
              enhance your browsing experience. You can control cookie
              preferences through your browser settings. Disabling cookies may
              affect the functionality of certain features.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              6. Your Rights
            </h2>
            <p className="text-[#b0a8c8] leading-relaxed mb-3">
              You have the right to:
            </p>
            <ul className="space-y-2 text-[#b0a8c8] text-sm list-none">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#cfa375] mt-2 flex-shrink-0" />
                <span>
                  Access, update, or delete your personal information.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#cfa375] mt-2 flex-shrink-0" />
                <span>Withdraw consent for data processing at any time.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#cfa375] mt-2 flex-shrink-0" />
                <span>Request a copy of the data we hold about you.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#cfa375] mt-2 flex-shrink-0" />
                <span>Lodge a complaint with a data protection authority.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              7. Contact Us
            </h2>
            <p className="text-[#b0a8c8] leading-relaxed">
              If you have any questions or concerns about this Privacy Policy,
              please contact us at{" "}
              <a
                href="mailto:info@astraspiritual.com"
                className="text-[#cfa375] hover:underline"
              >
                info@astraspiritual.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
