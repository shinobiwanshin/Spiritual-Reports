import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { auth, clerkClient } from "@clerk/nextjs/server";
import "./globals.css";
import { cn } from "@/lib/utils";
import LayoutShell from "@/components/LayoutShell";
import FacebookPixel from "@/components/FacebookPixel";

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
  const metaPixelId = "1413955200415939";

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
    <html lang="en" className={cn(playfair.variable, inter.variable)}>
      <head>
        <meta
          name="facebook-domain-verification"
          content="dw8qi3uwj499uf11ca9p9jymtyqpjy"
        />

        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${metaPixelId}');
fbq('track', 'PageView');
window.__fbInitialPageViewFired__ = true;
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </head>
      <body className="font-sans antialiased bg-[#0f0a2e] text-[#f0ecff] min-h-screen">
        <FacebookPixel />
        <ClerkProvider>
          <LayoutShell isAdmin={isAdmin} isSignedIn={isSignedIn}>
            {children}
          </LayoutShell>
        </ClerkProvider>
      </body>
    </html>
  );
}
