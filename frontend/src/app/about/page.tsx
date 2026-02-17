import type { Metadata } from "next";
import Link from "next/link";
import {
  Flame,
  Infinity,
  Heart,
  Eye,
  Mountain,
  Moon,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — Shivabakthi",
  description:
    "We are seekers standing in devotion at the feet of Mahadev, offering sincere spiritual guidance as seva — sacred service.",
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
      "This platform was not created as a business idea.\nIt arose as seva — sacred service.",
    ],
  },
  {
    icon: Infinity,
    title: "Our Foundation",
    content: [
      "Everything here begins with one truth:",
      { shloka: "ॐ नमः शिवाय" },
      "We believe that time, karma, and destiny are not accidents of the universe. They are movements of consciousness under the silent witness of Shiva.",
      "Our work is to observe, interpret, and present what is already written in the subtle language of time — with humility and surrender.",
    ],
  },
  {
    icon: Heart,
    title: "Our Intention",
    content: [
      "We do not promise miracles.\nWe do not create fear.\nWe do not manipulate emotion.",
      "We offer guidance only when it feels dharmic.\nWe speak only what aligns with inner clarity.",
      "If ever a message is delivered through us,\nit is delivered with folded hands.",
      "Because we believe:",
      {
        shloka: "यदा आत्मा प्रश्नं करोति\nतदा शिवः उत्तरं ददाति",
        translation: "When the soul asks sincerely, Shiva responds.",
      },
      "We are merely instruments.",
    ],
  },
  {
    icon: Eye,
    title: "Our Approach to Astrology",
    content: [
      "Astrology, for us, is not prediction.\nIt is remembrance.",
      "Not fortune-telling — but karma-understanding.\nNot control of the future — but awareness of the present.",
      "We do not claim to change destiny.\nWe believe destiny transforms when awareness awakens.",
    ],
  },
  {
    icon: Mountain,
    title: "Why We Exist",
    content: [
      "There are many who feel lost in silence.\nMany who seek reassurance without drama.\nMany who want spiritual clarity, not fear.",
      "This space exists for them.\nFor the quiet devotee.\nFor the inward seeker.\nFor the one who feels called, but does not know why.",
      "If you feel calm here,\nif something within you softens —\nthat is enough.",
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
    icon: Sparkles,
    title: "Closing Words",
    content: [
      "We do not claim perfection.\nWe claim devotion.",
      "If anything spoken here brings peace to your heart, the gratitude belongs to Mahadev.",
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
        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#cfa375] to-transparent mx-auto mt-8" />
      </div>

      {/* Sections */}
      <div className="max-w-3xl mx-auto space-y-10">
        {sections.map((section, idx) => {
          const Icon = section.icon;
          return (
            <section
              key={idx}
              className="glass-card rounded-3xl p-8 sm:p-10 md:p-12"
            >
              {/* Section header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-[#cfa375]/10 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-[#cfa375]" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  {section.title}
                </h2>
              </div>

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
            If you feel called, begin your journey with us.
          </p>
          <Link
            href="/services"
            className="gold-btn px-8 py-3.5 rounded-full text-sm font-semibold inline-block"
          >
            Explore Our Reports
          </Link>
        </div>
      </div>
    </div>
  );
}
