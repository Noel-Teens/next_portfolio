import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getProjects } from "@/lib/data";

// The public site is a single indexable page (`/`) — the sections are in-page
// anchors, not separate routes, so they don't belong as their own <url> entries.
// `lastModified` is derived from the newest project so the sitemap reflects real
// content updates; if the data read fails we fall back to build time.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let lastModified = new Date();
  try {
    const projects = await getProjects();
    const newest = projects
      .map((p) => new Date(p.created_at).getTime())
      .filter((t) => Number.isFinite(t))
      .sort((a, b) => b - a)[0];
    if (newest) lastModified = new Date(newest);
  } catch {
    // keep the build-time fallback
  }

  return [
    {
      url: site.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
