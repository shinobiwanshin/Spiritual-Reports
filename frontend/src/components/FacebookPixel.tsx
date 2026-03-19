"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

function FacebookPixelComponent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      if (!(window as any).__fbInitialPageViewFired__) {
        (window as any).fbq("track", "PageView");
      }
      (window as any).__fbInitialPageViewFired__ = false;
    }
  }, [pathname, searchParams]);

  return null;
}

export default function FacebookPixel() {
  return (
    <Suspense fallback={null}>
      <FacebookPixelComponent />
    </Suspense>
  );
}
