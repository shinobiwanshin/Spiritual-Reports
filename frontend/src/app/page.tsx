import Link from "next/link";
import {
  Flame,
  Sparkles,
  Eye,
  Infinity,
  Heart,
  Moon,
  Mountain,
  ArrowRight,
} from "lucide-react";
import VideoBackground from "@/components/VideoBackground";
import ScrollReveal from "@/components/ScrollReveal";

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden relative">
      {/* ═══════════════ FIXED VIDEO BACKGROUND ═══════════════ */}
      <div className="fixed inset-0 z-0">
        <VideoBackground overlayOpacity={0.6} />
      </div>

      {/* All content sits above the video */}
      <div className="relative z-10">
        {/* ═══════════════ HERO SECTION ═══════════════ */}
        <section className="relative min-h-screen flex items-center justify-center px-6">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            {/* Sanskrit tag */}
            <p className="text-[#cfa375]/70 text-sm sm:text-base font-medium tracking-wide mb-6 animate-pulse">
              न किञ्चिदपि यदृच्छया भवति
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="text-white">Divine Guidance Through</span>
              <br />
              <span className="text-white">the Grace of </span>
              <span className="gold-gradient-text">Lord Shiva</span>
            </h1>

            {/* Sanskrit shloka */}
            <div className="my-8">
              <p className="text-xl sm:text-2xl font-semibold text-[#cfa375] mb-2">
                शिवः केवलोऽहम्
              </p>
              <p className="text-sm text-white/50 italic">
                I am Shiva alone — pure, eternal consciousness.
              </p>
            </div>

            <p className="text-lg sm:text-xl text-[#b0a8c8] max-w-2xl mx-auto mb-10 leading-relaxed whitespace-pre-line">
              {`You have not come here to read.
You have come because your inner time has ripened.
When the mind grows silent,
when questions rise without words,
Mahadev responds — not with noise, but with truth.`}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/services"
                className="gold-btn px-8 py-4 rounded-full text-base font-semibold shadow-lg shadow-[#cfa375]/20"
              >
                Receive Divine Guidance
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

        {/* ═══════════════ THE CALL OF SHIVA ═══════════════ */}
        <section className="relative py-24 px-6">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#cfa375]/10 mb-6">
                <Flame className="w-7 h-7 text-[#cfa375]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
                The Call of <span className="gold-gradient-text">Shiva</span>
              </h2>
              <div className="text-[#b0a8c8] text-base sm:text-lg leading-relaxed space-y-6 whitespace-pre-line">
                <p>{`There are moments in life
when the stars do not shout,
but whisper.`}</p>
                <p>{`Moments when logic pauses,
and the soul begins to listen.`}</p>
                <p className="text-white/90 font-medium">
                  This is one such moment.
                </p>
                <p>{`What you receive here
is not prediction,
not fear,
not promise.`}</p>
                <p className="text-[#cfa375] font-semibold text-lg sm:text-xl">
                  It is Anugraha — divine indication.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ═══════════════ DIVINE ASTROLOGICAL GUIDANCE ═══════════════ */}
        <section className="relative py-24 px-6">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto">
              <div className="glass-card rounded-3xl p-10 md:p-14">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-[#cfa375]/10 flex items-center justify-center shrink-0">
                    <Sparkles className="w-6 h-6 text-[#cfa375]" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    Divine Astrological Guidance
                  </h2>
                </div>

                <div className="text-center my-8">
                  <p className="text-xl sm:text-2xl font-semibold text-[#cfa375]">
                    कालः साक्षी भवति
                  </p>
                  <p className="text-sm text-white/50 italic mt-2">
                    Time itself becomes the witness.
                  </p>
                  <div className="w-16 h-px bg-[#cfa375]/20 mx-auto mt-6" />
                </div>

                <div className="text-[#b0a8c8] text-base leading-relaxed space-y-5 whitespace-pre-line">
                  <p>{`Your birth, your karma, your struggles, your silence —
all are known to Mahadev.`}</p>
                  <p>{`Astrology here is not calculation.
It is cosmic remembrance.`}</p>
                  <p>{`Not what will happen,
but what must be understood now.
Not when,
but why your soul is being prepared.`}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ═══════════════ KARMA & TRANSFORMATION ═══════════════ */}
        <section className="relative py-24 px-6">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto">
              <div className="glass-card rounded-3xl p-10 md:p-14">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-[#cfa375]/10 flex items-center justify-center shrink-0">
                    <Eye className="w-6 h-6 text-[#cfa375]" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    Karma & Transformation
                  </h2>
                </div>

                <div className="text-center my-8">
                  <p className="text-xl sm:text-2xl font-semibold text-[#cfa375] whitespace-pre-line">
                    {`यदा आत्मा प्रश्नं करोति
तदा शिवः उत्तरं ददाति`}
                  </p>
                  <p className="text-sm text-white/50 italic mt-3">
                    When the soul begins to ask, Shiva begins to answer.
                  </p>
                  <div className="w-16 h-px bg-[#cfa375]/20 mx-auto mt-6" />
                </div>

                <div className="text-[#b0a8c8] text-base leading-relaxed space-y-5 whitespace-pre-line">
                  <p>{`Some delays are protection.
Some losses are liberation.
Some confusions are initiation into higher awareness.`}</p>
                  <p className="text-white/90 font-medium">
                    {`Your current phase is not accidental.
It is Shiva's method of refinement.`}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ═══════════════ MANTRA & INNER ALIGNMENT ═══════════════ */}
        <section className="relative py-24 px-6">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#cfa375]/10 mb-6">
                <Infinity className="w-7 h-7 text-[#cfa375]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10">
                Mantra & Inner Alignment
              </h2>

              <p className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#cfa375] mb-10">
                ॐ नमः शिवाय
              </p>

              <div className="text-[#b0a8c8] text-base sm:text-lg leading-relaxed space-y-5 max-w-xl mx-auto whitespace-pre-line">
                <p>{`This mantra is not to be chanted loudly.
It is to be absorbed with breath.`}</p>
                <p>{`Repeat it not to change fate,
but to understand it.`}</p>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ═══════════════ GUIDANCE WITHOUT FEAR ═══════════════ */}
        <section className="relative py-24 px-6">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto">
              <div className="glass-card rounded-3xl p-10 md:p-14">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-[#cfa375]/10 flex items-center justify-center shrink-0">
                    <Moon className="w-6 h-6 text-[#cfa375]" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    Guidance Without Fear
                  </h2>
                </div>

                <div className="text-center my-8">
                  <p className="text-xl sm:text-2xl font-semibold text-[#cfa375] whitespace-pre-line">
                    {`अविद्याया विनाशाय
विद्याया च प्रवर्धनाय`}
                  </p>
                  <p className="text-sm text-white/50 italic mt-3">
                    For the destruction of ignorance, and the awakening of true
                    knowledge.
                  </p>
                  <div className="w-16 h-px bg-[#cfa375]/20 mx-auto mt-6" />
                </div>

                <div className="text-[#b0a8c8] text-base leading-relaxed space-y-5 whitespace-pre-line">
                  <p>{`No fear is spoken here.
No illusion is fed.`}</p>
                  <p className="text-white/90 font-medium">
                    {`Only clarity,
only awareness,
only Shiva tattva.`}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ═══════════════ WHY YOU WERE CALLED HERE ═══════════════ */}
        <section className="relative py-24 px-6">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#cfa375]/10 mb-6">
                <Mountain className="w-7 h-7 text-[#cfa375]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
                Why You Were{" "}
                <span className="gold-gradient-text">Called Here</span>
              </h2>

              <div className="text-[#b0a8c8] text-base sm:text-lg leading-relaxed space-y-6 whitespace-pre-line">
                <p>{`You may not know why you arrived.
But your karma knows.`}</p>
                <p>{`This guidance appears
only when the soul is ready
to hear without resistance.`}</p>
                <p className="text-white/90 font-medium">
                  {`If you feel calm here,
if something within has slowed,
that is the confirmation.`}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ═══════════════ PRIMARY CTA ═══════════════ */}
        <section className="relative py-24 px-6">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <div className="glass-card rounded-3xl p-10 md:p-16">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#cfa375]/10 mb-6">
                  <Flame className="w-7 h-7 text-[#cfa375]" />
                </div>

                <p className="text-2xl sm:text-3xl font-bold text-[#cfa375] mb-3">
                  शिवानुग्रहं प्राप्नुहि
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Receive Divine Guidance
                </h2>
                <p className="text-[#b0a8c8] text-base mb-10">
                  Only what your soul is ready to receive shall be revealed.
                </p>
                <Link
                  href="/services"
                  className="gold-btn px-10 py-4 rounded-full text-base font-semibold shadow-lg shadow-[#cfa375]/20 inline-flex items-center gap-2"
                >
                  Explore Reports
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ═══════════════ CLOSING BLESSING ═══════════════ */}
        <section className="relative py-24 px-6">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#cfa375]/10 mb-8">
                <Heart className="w-7 h-7 text-[#cfa375]" />
              </div>

              <p className="text-xl sm:text-2xl font-semibold text-[#cfa375] whitespace-pre-line mb-3">
                {`सर्वे भवन्तु सुखिनः
सर्वे सन्तु निरामयाः`}
              </p>
              <p className="text-sm text-white/50 italic mb-10">
                May all be peaceful. May all be protected.
              </p>

              <p className="text-[#b0a8c8] text-base whitespace-pre-line">
                {`Remain still.
Shiva walks with you.`}
              </p>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </div>
  );
}
