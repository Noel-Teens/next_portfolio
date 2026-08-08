import type { Metadata } from "next";
import { Space_Grotesk, Geist, Fira_Code } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Teenie Rod Joshua B — Full-Stack Developer",
  description:
    "Portfolio of Teenie Rod Joshua B, a Full-Stack Developer and CS Student building performant, deeply considered digital experiences.",
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
