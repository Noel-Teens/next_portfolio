import { site, sameAs, knowsAbout } from "@/lib/site";
import type { Project } from "@/lib/supabase/types";

// JSON-LD structured data for the homepage. Emits a single @graph tying together:
//   • ProfilePage  — the page is a person's profile (the correct type for a
//     portfolio, per schema.org / Google's profile-page guidance)
//   • Person       — the subject, with job title, socials (sameAs), and skills
//   • WebSite      — the site itself, for sitelinks / name resolution
// Projects are surfaced as the Person's `workExample` CreativeWorks so search
// engines can associate the real work with the person.
//
// Rendered server-side as a <script> so crawlers get it in the initial HTML.
// All values come from lib/site + live Supabase data — nothing invented.

export default function StructuredData({ projects }: { projects: Project[] }) {
  const personId = `${site.url}/#person`;
  const siteId = `${site.url}/#website`;

  const works = projects.slice(0, 12).map((p) => {
    const work: Record<string, unknown> = {
      "@type": "CreativeWork",
      name: p.title,
      ...(p.description ? { description: p.description.slice(0, 300) } : {}),
      ...(p.image_url ? { image: p.image_url } : {}),
      ...(p.live_url && p.live_url !== "#" ? { url: p.live_url } : {}),
      ...(p.tags?.length ? { keywords: p.tags.join(", ") } : {}),
      author: { "@id": personId },
    };
    return work;
  });

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${site.url}/#profilepage`,
        url: site.url,
        name: `${site.name} — ${site.jobTitle}`,
        description: site.description,
        inLanguage: "en",
        isPartOf: { "@id": siteId },
        mainEntity: { "@id": personId },
        primaryImageOfPage: `${site.url}/opengraph-image`,
      },
      {
        "@type": "Person",
        "@id": personId,
        name: site.name,
        alternateName: site.shortName,
        url: site.url,
        image: `${site.url}/opengraph-image`,
        jobTitle: site.jobTitle,
        description: site.description,
        knowsAbout,
        sameAs,
        ...(works.length ? { workExample: works } : {}),
      },
      {
        "@type": "WebSite",
        "@id": siteId,
        url: site.url,
        name: `${site.name} · Portfolio`,
        description: site.description,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe to inline; no user-controlled HTML.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
