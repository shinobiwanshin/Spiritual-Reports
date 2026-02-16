import type { Metadata } from "next";
import {
  Pin,
  Ban,
  CheckCircle2,
  Search,
  CreditCard,
  Clock,
  Phone,
  Mail,
  Smartphone,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Refund & Cancellation — Shivabakthi",
  description:
    "Read our refund and cancellation policy for digital reports and consultation services.",
};

export default function RefundPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#cfa375] text-sm font-semibold uppercase tracking-wider mb-3">
            Policy
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Refund & <span className="gold-gradient-text">Cancellation</span>
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
              At Shivabakthi, we provide personalized digital information
              services that are custom-created, securely delivered, and handled
              with professional standards. As our offerings involve
              made-to-order digital reports and consultation-based services, we
              follow a strict and transparent refund policy.
            </p>
          </div>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
              <Pin className="w-5 h-5 text-[#cfa375] inline-block mr-1" />{" "}
              Nature of Service
            </h2>
            <p className="text-[#b0a8c8] leading-relaxed">
              All services offered on Shivabakthi are custom-created digital
              products and consultations, prepared based on user-provided
              details and delivered electronically. Due to the personalized
              nature of these services, once a report is generated or a
              consultation is completed, it cannot be reused, revoked, or
              resold.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
              <Ban className="w-5 h-5 text-[#cfa375] inline-block mr-1" /> No
              Refunds After Delivery
            </h2>
            <p className="text-[#b0a8c8] leading-relaxed mb-3">
              To maintain service integrity and prevent misuse, refunds are not
              provided once:
            </p>
            <ul className="space-y-2 text-[#b0a8c8] text-sm list-none">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#cfa375] mt-2 flex-shrink-0" />
                <span>
                  A personalized digital report has been generated and
                  delivered.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#cfa375] mt-2 flex-shrink-0" />
                <span>
                  A consultation session has been completed or attempted as
                  scheduled.
                </span>
              </li>
            </ul>
            <p className="text-[#b0a8c8] leading-relaxed mt-3 text-sm">
              Refunds will not be issued based on subjective satisfaction,
              personal expectations, or interpretation of the provided
              information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#cfa375] inline-block mr-1" />{" "}
              Eligible Refund Scenarios
            </h2>
            <p className="text-[#b0a8c8] leading-relaxed mb-3">
              Refunds may be considered only under the following verifiable
              conditions:
            </p>
            <ul className="space-y-2 text-[#b0a8c8] text-sm list-none">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#cfa375] mt-2 flex-shrink-0" />
                <span>
                  Duplicate payment due to a confirmed technical error.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#cfa375] mt-2 flex-shrink-0" />
                <span>
                  Non-delivery of the service due to an internal system failure.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#cfa375] mt-2 flex-shrink-0" />
                <span>
                  Technical issues that prevented a scheduled consultation from
                  taking place.
                </span>
              </li>
            </ul>
            <p className="text-[#b0a8c8] leading-relaxed mt-3 text-sm">
              Any refund request must be raised within 24 hours of payment,
              along with relevant transaction details.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
              <Search className="w-5 h-5 text-[#cfa375] inline-block mr-1" />{" "}
              Internal Review Process
            </h2>
            <p className="text-[#b0a8c8] leading-relaxed mb-3">
              All refund requests are reviewed by our internal Service Review
              Team, which evaluates:
            </p>
            <ul className="space-y-2 text-[#b0a8c8] text-sm list-none">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#cfa375] mt-2 flex-shrink-0" />
                <span>Payment confirmation and transaction records</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#cfa375] mt-2 flex-shrink-0" />
                <span>
                  Service delivery logs (email, system, or messaging records)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#cfa375] mt-2 flex-shrink-0" />
                <span>Communication history related to the request</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#cfa375] mt-2 flex-shrink-0" />
                <span>Technical system logs, where applicable</span>
              </li>
            </ul>
            <p className="text-[#b0a8c8] leading-relaxed mt-3 text-sm">
              The final decision after internal review is binding.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#cfa375] inline-block mr-1" />{" "}
              Payment Dispute Policy
            </h2>
            <p className="text-[#b0a8c8] leading-relaxed">
              Customers are requested to contact our support team before
              initiating any payment dispute or chargeback. Raising a dispute
              without prior communication may result in restriction of future
              service access and may be treated as misuse of digital services
              under applicable policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#cfa375] inline-block mr-1" />{" "}
              Refund Processing Timeline
            </h2>
            <p className="text-[#b0a8c8] leading-relaxed">
              If a refund is approved, it will be credited within 24 hours to
              the original payment method. The actual credit time may vary based
              on the customer&apos;s bank or payment provider and typically
              takes 5–7 business days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
              <Phone className="w-5 h-5 text-[#cfa375] inline-block mr-1" />{" "}
              Customer Support
            </h2>
            <p className="text-[#b0a8c8] leading-relaxed">
              For order-related queries or assistance, please contact us through
              the official channels:
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:info@shivabakthi.com"
                className="glass-card px-6 py-3 rounded-xl text-sm text-white hover:border-[#cfa375]/30 transition-all inline-flex items-center gap-2"
              >
                <Mail className="w-4 h-4" /> info@shivabakthi.com
              </a>
              <a
                href="https://wa.me/917861087127"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card px-6 py-3 rounded-xl text-sm text-white hover:border-[#cfa375]/30 transition-all inline-flex items-center gap-2"
              >
                <Smartphone className="w-4 h-4" /> +91-7861087127
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
