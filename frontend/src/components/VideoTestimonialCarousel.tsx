"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Loader2, AlertCircle } from "lucide-react";
import type { Testimonial } from "@/types/testimonial";

export default function VideoTestimonialCarousel() {
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch video reviews from the database
  useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: Testimonial[]) => {
        setReviews(data.filter((t) => t.type === "video"));
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Auto-rotate every 6 seconds
  useEffect(() => {
    if (loading || reviews.length === 0) return;

    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
        setIsAnimating(false);
      }, 500);
    }, 6000);

    return () => clearInterval(timer);
  }, [loading, reviews]);

  if (loading) {
    return (
      <div className="w-full py-16 flex items-center justify-center relative z-10">
        <Loader2 className="w-8 h-8 text-[#cfa375] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div role="alert" className="w-full py-16 flex items-center justify-center gap-2 text-white/50 relative z-10">
        <AlertCircle className="w-5 h-5" />
        <span className="text-sm">Unable to load video testimonials</span>
      </div>
    );
  }

  if (reviews.length === 0) return null;

  const current = reviews[currentIndex];

  const handlePrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
      setIsAnimating(false);
    }, 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
      setIsAnimating(false);
    }, 500);
  };

  return (
    <div className="w-full py-16 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10 relative z-10">
          <h2 className="text-xs sm:text-sm font-semibold text-[#cfa375] uppercase tracking-[0.2em] mb-2">
            Watch Their Journey
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            Video Experiences
          </h3>
        </div>

        <div className="relative group flex items-center justify-center">
          {/* Chevrons */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 lg:left-24 xl:left-32 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-[#1a1347]/80 text-[#cfa375] rounded-full border border-[#cfa375]/30 flex items-center justify-center shadow-lg shadow-black/50 hover:bg-[#cfa375] hover:text-[#0f0a2e] transition-all disabled:opacity-50"
            aria-label="Previous video"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 lg:right-24 xl:right-32 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-[#1a1347]/80 text-[#cfa375] rounded-full border border-[#cfa375]/30 flex items-center justify-center shadow-lg shadow-black/50 hover:bg-[#cfa375] hover:text-[#0f0a2e] transition-all disabled:opacity-50"
            aria-label="Next video"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Single Video Display */}
          <div className="relative z-10 w-full max-w-sm">
            <div
              className={`transition-all duration-500 ease-in-out w-full ${
                isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
            >
              <div className="bg-[#1a1347]/40 border border-[#cfa375]/10 rounded-2xl p-4 backdrop-blur-md flex flex-col justify-center items-center shadow-2xl shadow-black/40">
                <div className="w-full relative pt-[177.78%] rounded-xl overflow-hidden shadow-lg shadow-black/40">
                  {current.videoUrl && (
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={current.videoUrl}
                      title={current.name || "Video Testimonial"}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-3 mt-8 relative z-10">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (idx === currentIndex || isAnimating) return;
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
              aria-label={`Go to video ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
