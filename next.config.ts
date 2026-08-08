import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Admin project/skill forms POST an image file through a Server Action.
      // The default request-body cap is 1MB, which screenshots easily exceed;
      // raise it so uploads go through. (Server Action bodies still stream to
      // Supabase Storage, so this only guards the initial POST size.)
      bodySizeLimit: "8mb",
    },
  },
  images: {
    // Allow images served from Supabase Storage public URLs.
    // e.g. https://<project-ref>.supabase.co/storage/v1/object/public/project-images/...
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
