import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

// Next.js 16 renamed Middleware to Proxy. This runs before requests to keep the
// Supabase session cookie fresh and gate the /admin area.
export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    // Run on everything EXCEPT: Next internals, static assets, and the public
    // SEO/metadata routes. The SEO routes must stay publicly reachable by
    // crawlers without an auth round-trip or a possible redirect, so they're
    // excluded here (sitemap, robots, manifest, and the generated OG/twitter
    // images + app icons).
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|manifest.webmanifest|opengraph-image|twitter-image|icon|apple-icon|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
