import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// PWA / install manifest. Uses the existing app icons (icon.png, apple-icon.png)
// and the console theme colors so an installed shortcut matches the site.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} · Portfolio`,
    short_name: site.shortName,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: site.themeColor,
    theme_color: site.themeColor,
    categories: ["portfolio", "technology", "developer"],
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
