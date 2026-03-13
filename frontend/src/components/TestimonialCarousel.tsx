"use client";

import { useState, useEffect } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ananya S.",
    location: "Mumbai",
    text: "The 5-year report gave me immense clarity during my career transition. The timing was astoundingly accurate, helping me make decisions with confidence.",
    rating: 5,
  },
  {
    name: "Rajesh K.",
    location: "London",
    text: "Incredibly deep analysis. The guidance on my relationship phase was spot on. It's not just astrology, it's a true roadmap for the soul.",
    rating: 5,
  },
  {
    name: "Priya M.",
    location: "Bangalore",
    text: "The 3-year reading helped me navigate a very tough period with calmness. Beautifully written, deeply spiritual, and practically helpful.",
    rating: 5,
  },
  {
    name: "Vikram R.",
    location: "Delhi",
    text: "I was skeptical at first, but the insights provided were too specific to be generalized. It completely changed my perspective on my upcoming years.",
    rating: 5,
  },
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setIsAnimating(false);
      }, 500); // Wait for fade out
    }, 6000); // Change every 6 seconds

    return () => clearInterval(timer);
  }, []);

  const current = testimonials[currentIndex];

  return (
    <div className="w-full py-16 relative z-10">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-[#1a1347]/40 border border-[#cfa375]/10 rounded-3xl p-8 md:p-12 backdrop-blur-md relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#cfa375]/30 to-transparent"></div>
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#cfa375]/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#cfa375]/5 rounded-full blur-3xl"></div>

          <div className="text-center mb-10 relative z-10">
            <h2 className="text-xs sm:text-sm font-semibold text-[#cfa375] uppercase tracking-[0.2em]">
              Seeker Experiences
            </h2>
          </div>

          <div className="relative min-h-[220px] flex items-center justify-center z-10">
            <div
              className={`transition-all duration-500 ease-in-out w-full max-w-3xl ${
                isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
            >
              <Quote className="w-8 h-8 md:w-10 md:h-10 text-[#cfa375]/30 mx-auto mb-6" />

              <div className="flex justify-center gap-1.5 mb-6">
                {[...Array(current.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 md:w-5 md:h-5 text-[#cfa375] fill-[#cfa375]"
                  />
                ))}
              </div>

              <p className="text-base sm:text-lg md:text-xl text-white/90 font-medium leading-relaxed italic mb-8 text-center">
                "{current.text}"
              </p>

              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#cfa375]/20 to-[#cfa375]/5 border border-[#cfa375]/30 flex items-center justify-center shadow-lg shadow-[#cfa375]/10">
                  <span className="text-[#cfa375] font-bold text-lg">
                    {current.name.charAt(0)}
                  </span>
                </div>
                <div className="text-left">
                  <div className="text-white font-semibold text-sm md:text-base">
                    {current.name}
                  </div>
                  <div className="text-[#cfa375]/70 text-xs mt-0.5">
                    {current.location}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-3 mt-10 relative z-10">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (idx === currentIndex) return;
                  setIsAnimating(true);
                  setTimeout(() => {
                    setCurrentIndex(idx);
                    setIsAnimating(false);
                  }, 500);
                }}
                className={`h-1.5 rounded-full transition-all duration-500 hover:bg-[#cfa375]/60 ${
                  idx === currentIndex
                    ? "w-10 bg-[#cfa375] shadow-[0_0_8px_rgba(207,163,117,0.5)]"
                    : "w-2 bg-white/20"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
