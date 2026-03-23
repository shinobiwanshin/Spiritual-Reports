"use client";

import type { Testimonial } from "@/types/testimonial";

export default function VideoTestimonials({ videos }: { videos: Testimonial[] }) {
  const validVideos = videos.filter((v) => v.videoUrl);
  if (validVideos.length === 0) return null;

  return (
    <div className="w-full pt-16 pb-4 relative z-10">
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

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative z-10 w-full max-w-4xl mx-auto">
            {validVideos.map((video) => (
              <div key={video.id} className="relative w-full md:w-1/2 rounded-2xl overflow-hidden bg-black/40 border border-[#cfa375]/20 shadow-xl shadow-[#cfa375]/5 flex items-center justify-center">
                <video
                  src={video.videoUrl!}
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full h-auto max-h-[70vh] object-contain bg-black"
                  aria-label={`Video testimonial from ${video.name}`}
                >
                  <track kind="captions" />
                </video>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
