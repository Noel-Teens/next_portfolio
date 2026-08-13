import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Crawler policy: index everything public, keep the admin area and its APIs out
// of the index (they're also auth-gated by the proxy). Points crawlers at the
// sitemap for efficient discovery.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/"],
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
