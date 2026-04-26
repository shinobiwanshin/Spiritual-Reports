import type { Metadata } from "next";
import Link from "next/link";
import {
  Flame,
  Infinity,
  Heart,
  Eye,
  FileText,
  Mountain,
  Moon,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — Shivabakthi",
  description:
    "We are seekers standing in devotion at the feet of Mahadev, offering Vedic reflection reports and spiritual perspective as seva — sacred service.",
};

/* ─── Section data ─── */

interface Section {
  icon: LucideIcon;
  title: string;
  content: (string | { shloka: string; translation?: string })[];
  values?: string[];
}

const sections: Section[] = [
  {
    icon: Flame,
    title: "Who We Truly Are",
    content: [
      "We are not here as astrologers seeking followers.\nWe are not here as readers of fate.\nWe are not here as sellers of predictions.",
      "We are seekers —\nstanding in devotion at the feet of Mahadev,\noffering what little understanding has been given to us.",
      "This platform arose as seva — sacred service.\nTo sustain this mission and serve more seekers, we offer\nVedic reports and guidance as tools for spiritual reflection.",
    ],
  },
  {
    icon: Infinity,
    title: "Our Foundation",
    content: [
      "Everything here begins with one truth:",
      { shloka: "ॐ नमः शिवाय" },
      "Rooted in Vedic wisdom and accessible to all seekers, regardless of background.",
      "From our Vedic tradition, we understand that time, karma, and destiny\noperate as movements of consciousness - observed through Shiva's awareness.",
      "Our work is to interpret these patterns thoughtfully - not as fixed prophecy,\nbut as spiritual perspective offering self-reflection and personal insight.",
    ],
  },
  {
    icon: Heart,
    title: "Our Intention",
    content: [
      "We do not promise miracles.\nWe do not create fear.\nWe do not manipulate emotion.",
      "We offer guidance aligned with our spiritual tradition.\nWe speak with reverence and intention.",
      "Our messages are offered with reverence and responsibility.\nWe stand behind the integrity of our approach.",
      "In our tradition, we believe:",
      {
        shloka: "यदा आत्मा प्रश्नं करोति\nतदा शिवः उत्तरं ददाति",
        translation: "When the soul seeks sincerely, understanding emerges.",
      },
      "We are devoted to serving this purpose with authenticity.",
    ],
  },
  {
    icon: Eye,
    title: "Our Approach to Astrology",
    content: [
      "Astrology, for us, is not prediction.\nIt is a framework for self-reflection and pattern-interpretation.",
      "Not fortune-telling — but understanding patterns within our spiritual tradition.\nNot control of the future — but awareness of the patterns that shape our present.",
      "We do not claim to change destiny.\nWithin our framework, deeper self-awareness can transform how we\nexperience life's unfolding and our own agency within it.",
    ],
  },
  {
    icon: Mountain,
    title: "Why We Exist",
    content: [
      "This space is for those drawn to contemplative wisdom.\nFor those interested in Vedic perspective on life patterns.\nFor those seeking spiritual understanding, not fear-based predictions.\nFor the curious mind.\nFor the sincere seeker.\nFor those aligned with our approach.",
      "If this space resonates with your values,\nif our perspective aligns with your spiritual practice -\nwe welcome your exploration.",
    ],
  },
  {
    icon: Moon,
    title: "Our Commitment",
    content: [
      "We remain grounded in:",
      "Every message shared here is offered as prayer first.",
    ],
    values: [
      "Bhakti over ego",
      "Truth over popularity",
      "Clarity over sensation",
      "Dharma over profit",
    ],
  },
  {
    icon: FileText,
    title: "A Note on Our Service",
    content: [
      "We offer Vedic astrology reports and spiritual guidance as the means to\nsustain our mission. When you explore our work with us, you're supporting\na community dedicated to spiritual service and truth.",
      "Our reports are tools for reflection and self-exploration within our Vedic\ntradition - not promises of life changes, but invitations to deeper\nunderstanding and personal insight.",
    ],
  },
  {
    icon: Sparkles,
    title: "Closing Words",
    content: [
      "We do not claim perfection.\nWe claim devotion.",
      "If anything shared here supports your spiritual growth, we are honored to serve.",
      {
        shloka: "शिवो भूत्वा शिवं यजेत्",
        translation: "Become Shiva to worship Shiva.",
      },
      "With folded hands,\nwe remain in service.",
    ],
  },
];

/* ─── Component ─── */

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-20">
        <p className="text-[#cfa375] text-sm font-semibold uppercase tracking-wider mb-3">
          About Us
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
          In Devotion to <span className="gold-gradient-text">Mahadev</span>
        </h1>
        <p className="text-[#b0a8c8] text-lg leading-relaxed max-w-xl mx-auto">
          We are seekers — standing in devotion, offering what little
          understanding has been given to us.
        </p>
        <div className="w-20 h-0.5 bg-linear-to-r from-transparent via-[#cfa375] to-transparent mx-auto mt-8" />
      </div>

      {/* Sections */}
      <div className="max-w-3xl mx-auto space-y-10">
        {sections.map((section, idx) => {
          const Icon = section.icon;
          return (
            <section
              key={idx}
              className="glass-card rounded-3xl p-8 sm:p-10 md:p-12 text-center"
            >
              {/* Section header */}
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#cfa375]/10 mb-4">
                <Icon className="w-6 h-6 text-[#cfa375]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
                {section.title}
              </h2>

              {/* Content blocks */}
              <div className="space-y-5">
                {section.content.map((block, i) => {
                  if (typeof block === "object" && "shloka" in block) {
                    return (
                      <div key={i} className="my-8">
                        <blockquote className="text-center">
                          <p className="text-xl sm:text-2xl font-semibold text-[#cfa375] leading-relaxed whitespace-pre-line">
                            {block.shloka}
                          </p>
                          {block.translation && (
                            <p className="text-sm text-white/60 italic mt-3">
                              — {block.translation}
                            </p>
                          )}
                        </blockquote>
                        <div className="w-16 h-px bg-[#cfa375]/20 mx-auto mt-6" />
                      </div>
                    );
                  }

                  return (
                    <p
                      key={i}
                      className="text-[#b0a8c8] text-base leading-relaxed whitespace-pre-line"
                    >
                      {block}
                    </p>
                  );
                })}

                {/* Values list */}
                {section.values && (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                    {section.values.map((value, vi) => (
                      <li
                        key={vi}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#cfa375]/5 border border-[#cfa375]/10"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#cfa375]" />
                        <span className="text-sm text-white font-medium">
                          {value}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="max-w-3xl mx-auto mt-16 text-center">
        <div className="glass-card rounded-2xl p-10">
          <p className="text-2xl text-[#cfa375] font-semibold mb-2">
            ॐ नमः शिवाय
          </p>
          <p className="text-[#b0a8c8] text-sm mb-8">
            If this resonates with you, begin your journey with us.
          </p>
          <Link
            href="/ig"
            className="gold-btn px-8 py-3.5 rounded-full text-sm font-semibold inline-block"
          >
            Explore Our Vedic Reflection Reports
          </Link>
          <p className="text-xs text-white/50 mt-8 max-w-2xl mx-auto leading-relaxed">
            Disclaimer: Our reports are offered for spiritual reflection and
            entertainment purposes. Astrological analysis is not a substitute
            for professional medical, psychological, legal, or financial advice.
            Results may vary. For serious concerns, please consult qualified
            professionals.
          </p>
        </div>
      </div>
    </div>
  );
}
