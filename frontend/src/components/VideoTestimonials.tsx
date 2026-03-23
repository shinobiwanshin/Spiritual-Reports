"use client";

import { useState, useEffect, useRef } from "react";
import { Loader2, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import type { Testimonial } from "@/types/testimonial";

export default function VideoTestimonials() {
  const [videos, setVideos] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/testimonials", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: Testimonial[]) => {
        setVideos(data.filter((t) => t.type === "video" && t.videoUrl));
      })
      .catch((err) => {
        if (err.name !== "AbortError") setError(true);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;
    const amount = direction === "left" ? -clientWidth * 0.85 : clientWidth * 0.85;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="w-full py-8 flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-[#cfa375] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div role="alert" className="w-full py-8 flex items-center justify-center gap-2 text-white/50">
        <AlertCircle className="w-5 h-5" />
        <span className="text-sm">Failed to load video testimonials</span>
      </div>
    );
  }

  if (videos.length === 0) return null;

  return (
    <div className="w-full pb-20 relative z-10">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-[#1a1347]/40 border border-[#cfa375]/10 rounded-3xl p-8 md:p-12 backdrop-blur-md relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#cfa375]/30 to-transparent"></div>
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#cfa375]/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#cfa375]/5 rounded-full blur-3xl"></div>

          <div className="text-center mb-10 relative z-10">
            <h2 className="text-xs sm:text-sm font-semibold text-[#cfa375] uppercase tracking-[0.2em]">
              Seeker Stories
            </h2>
          </div>

          {/* Scrollable container with chevron nav on small screens */}
          <div className="relative z-10">
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-3 z-20 w-10 h-10 bg-[#1a1347] border border-white/10 rounded-full shadow-lg flex md:hidden items-center justify-center text-white hover:bg-[#251b63] hover:text-[#cfa375] transition-all"
              aria-label="Previous video"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-3 z-20 w-10 h-10 bg-[#1a1347] border border-white/10 rounded-full shadow-lg flex md:hidden items-center justify-center text-white hover:bg-[#251b63] hover:text-[#cfa375] transition-all"
              aria-label="Next video"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory md:justify-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-2"
            >
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="w-[85%] sm:w-[75%] md:w-1/3 shrink-0 snap-center rounded-2xl overflow-hidden bg-black/40 border border-[#cfa375]/20 shadow-xl shadow-[#cfa375]/5 flex items-center justify-center"
                >
                  {video.videoUrl && (
                    <video
                      src={video.videoUrl}
                      controls
                      playsInline
                      preload="metadata"
                      className="w-full h-auto max-h-[70vh] object-contain bg-black"
                      aria-label={`Video testimonial from ${video.name}`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
