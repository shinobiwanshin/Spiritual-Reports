import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Your Personalized Astrology Report — Shivabakthi",
  description:
    "Unlock deep insights into your career, relationships, finances, and personal growth with a personalized 1, 3, or 5-year Vedic astrology report.",
};

export default function IgLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
