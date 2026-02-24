"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VideoBackground from "@/components/VideoBackground";

/** Routes where Navbar and Footer should be hidden (e.g. ad landing pages, admin) */
const MINIMAL_ROUTES = ["/admin"];

/** Routes that supply their OWN video background */
const OWN_VIDEO_ROUTES = ["/ig"];

export default function LayoutShell({
  children,
  isAdmin = false,
  isSignedIn = false,
}: {
  children: React.ReactNode;
  isAdmin?: boolean;
  isSignedIn?: boolean;
}) {
  const pathname = usePathname();
  const isMinimal = MINIMAL_ROUTES.some((r) => pathname.startsWith(r));
  const hasOwnVideo =
    OWN_VIDEO_ROUTES.some((r) => pathname.startsWith(r)) || pathname === "/";

  if (isMinimal) {
    return <main>{children}</main>;
  }

  return (
    <>
      {/* Global video background for pages that don't have their own */}
      {!hasOwnVideo && (
        <div className="fixed inset-0 z-0">
          <VideoBackground src="/output-1080p.mp4" overlayOpacity={0.8} />
        </div>
      )}
      <Navbar isAdmin={isAdmin} isSignedIn={isSignedIn} />
      <main className={!hasOwnVideo ? "relative z-10" : ""}>{children}</main>
      <Footer />
    </>
  );
}
