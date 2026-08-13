import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Geist, Fira_Code } from "next/font/google";
import { site, knowsAbout } from "@/lib/site";
import "./globals.css";

// Display voice — Space Grotesk: a techy geometric-grotesque with real
// character (that distinctive lowercase g/a), sized up for the mastheads.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Body voice — Geist: a warm, modern product sans, highly legible at text sizes.
const geist = Geist({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Data / HUD voice — Fira Code, unchanged (the structural mono).
const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

// metadataBase lets every relative URL below (canonical, OG image) resolve to
// an absolute one, and is required for the file-based opengraph-image route.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    // "%s — Teenie Rod Joshua B" for child routes; the default for the home page.
    default: `${site.name} — ${site.jobTitle}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: `${site.name} · Portfolio`,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    site.name,
    "Teenie",
    "portfolio",
    "full-stack developer",
    "software engineer",
    "web developer",
    ...knowsAbout,
  ],
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    firstName: "Teenie Rod Joshua",
    lastName: "B",
    title: `${site.name} — ${site.jobTitle}`,
    description: site.description,
    url: site.url,
    siteName: `${site.name} · Portfolio`,
    locale: site.locale,
    // The image itself is supplied by app/opengraph-image.tsx (auto-attached).
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.jobTitle}`,
    description: site.description,
    creator: "@noel_teens",
    // Image supplied by app/twitter-image.tsx (auto-attached).
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    // Google Search Console site-ownership verification.
    google: "nGPRdcdcn94uKBjsLzkBK2Nebm0oO5gOwPqVE_qANzk",
  },
};

export const viewport: Viewport = {
  themeColor: site.themeColor,
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${geist.variable} ${firaCode.variable}`}
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
