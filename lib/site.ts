// Single source of truth for site-wide SEO / identity data. Imported by the
// root metadata, sitemap, robots, manifest, OG image, and JSON-LD structured
// data so every surface stays consistent.
//
// The canonical URL is read from NEXT_PUBLIC_SITE_URL when set (point this at
// the production domain in Vercel env vars); it falls back to the current
// Vercel deployment URL, then the known project URL. No trailing slash.

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  // Vercel exposes the deployment host without protocol.
  const vercel = process.env.NEXT_PUBLIC_VERCEL_URL || process.env.VERCEL_URL;
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;
  return "https://next-portfolio-five-henna.vercel.app";
}

export const siteUrl = resolveSiteUrl();

export const site = {
  url: siteUrl,
  name: "Teenie Rod Joshua B",
  shortName: "Teenie",
  jobTitle: "Full-Stack Developer",
  // ~155 chars — the sweet spot for a search-result snippet.
  description:
    "Teenie Rod Joshua B — full-stack developer and CS student building fast, accessible, deeply considered web apps with React, Next.js, and Supabase.",
  locale: "en_US",
  // Used for JSON-LD `sameAs` and social discovery.
  socials: {
    github: "https://github.com/Noel-Teens",
    linkedin: "https://www.linkedin.com/in/teenie-rod-joshua/",
    instagram: "https://www.instagram.com/noel_teens/",
  },
  // Brand colors (match the console theme) for manifest + theme-color.
  themeColor: "#0a2c38",
  accentColor: "#7fe9ff",
} as const;

export const sameAs = Object.values(site.socials);

// Topics the person demonstrably works in — surfaced as JSON-LD `knowsAbout`
// and as meta keywords. Kept honest: these are the real stack from the site.
export const knowsAbout = [
  "Full-Stack Development",
  "Web Development",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Supabase",
  "PostgreSQL",
  "Tailwind CSS",
  "UI/UX Engineering",
  "Accessibility",
];
