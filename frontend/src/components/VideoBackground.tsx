"use client";

import { useEffect, useRef, useState } from "react";

interface VideoBackgroundProps {
  className?: string;
  overlayOpacity?: number;
}

const VIDEO_SRC = "/output.mov";
/** Seconds before the end to begin the cross-fade */
const FADE_LEAD = 1.5;

/**
 * Smooth-looping video background using two overlapping <video> elements.
 * When video A nears its end, video B fades in from the start — no jump cut.
 */
export default function VideoBackground({
  className = "",
  overlayOpacity = 0.65,
}: VideoBackgroundProps) {
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  /** Which video is currently "on top" — A or B */
  const [active, setActive] = useState<"A" | "B">("A");

  useEffect(() => {
    const a = videoARef.current;
    const b = videoBRef.current;
    if (!a || !b) return;

    // Load both
    a.src = VIDEO_SRC;
    b.src = VIDEO_SRC;
    a.load();
    b.load();

    const onReady = () => setLoaded(true);
    a.addEventListener("canplaythrough", onReady, { once: true });

    return () => a.removeEventListener("canplaythrough", onReady);
  }, []);

  // Poll the active video's time to trigger cross-fade near the end
  useEffect(() => {
    let raf: number;

    const tick = () => {
      const current = active === "A" ? videoARef.current : videoBRef.current;
      const next = active === "A" ? videoBRef.current : videoARef.current;

      if (current && next && current.duration) {
        const remaining = current.duration - current.currentTime;

        if (remaining <= FADE_LEAD && next.paused) {
          // Prepare the next video at the start and play it
          next.currentTime = 0;
          next.play();
          // Swap active so the CSS fades to the next one
          setActive((prev) => (prev === "A" ? "B" : "A"));
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  const sharedClasses =
    "absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out";

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Video A */}
      <video
        ref={videoARef}
        autoPlay
        muted
        playsInline
        preload="none"
        className={`${sharedClasses} ${
          loaded && active === "A" ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Video B */}
      <video
        ref={videoBRef}
        muted
        playsInline
        preload="none"
        className={`${sharedClasses} ${
          loaded && active === "B" ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            to bottom,
            rgba(15, 10, 46, ${overlayOpacity + 0.1}) 0%,
            rgba(15, 10, 46, ${overlayOpacity - 0.1}) 40%,
            rgba(15, 10, 46, ${overlayOpacity}) 70%,
            rgba(15, 10, 46, 0.95) 100%
          )`,
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(15, 10, 46, 0.6) 100%)",
        }}
      />
    </div>
  );
}
