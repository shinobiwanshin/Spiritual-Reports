import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { auth, clerkClient } from "@clerk/nextjs/server";
import "./globals.css";
import { cn } from "@/lib/utils";
import LayoutShell from "@/components/LayoutShell";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shivabakthi — Personalized Insights & Spiritual Guidance",
  description:
    "Discover clarity and confidence through structured analysis, personalized insights, and comprehensive spiritual reports for 1, 3, and 5 years.",
  keywords: [
    "astrology",
    "spiritual",
    "reports",
    "insights",
    "guidance",
    "kundali",
    "yearly predictions",
  ],
  icons: {
    icon: "/images/Circle Crop Image.png",
    apple: "/images/Circle Crop Image.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let isAdmin = false;
  let isSignedIn = false;
  try {
    const { userId } = await auth();
    if (userId) {
      isSignedIn = true;
      const client = await clerkClient();
      const user = await client.users.getUser(userId);
      isAdmin = (user.privateMetadata as { role?: string })?.role === "Admin";
    }
  } catch {
    // Not authenticated — isAdmin stays false
  }

  return (
    <ClerkProvider>
      <html lang="en" className={cn(playfair.variable, inter.variable)}>
        <head />
        <body className="font-sans antialiased bg-[#0f0a2e] text-[#f0ecff] min-h-screen">
          <LayoutShell isAdmin={isAdmin} isSignedIn={isSignedIn}>
            {children}
          </LayoutShell>
        </body>
      </html>
    </ClerkProvider>
  );
}
