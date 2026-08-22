import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// Dynamically generated 1200×630 social share card, matching the site's
// player-console identity: dark teal field, neon "PRESS START" eyebrow, the
// name as the headline, job title, and a strip of the real stack. Rendered at
// request/build time via Satori — flexbox only, no grid, no external assets.

export const alt = `${site.name} — ${site.jobTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  const stack = ["React", "Next.js", "TypeScript", "Supabase", "Node.js"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#0d0d0d",
          backgroundImage:
            "radial-gradient(1200px 500px at 15% -10%, rgba(255,255,255,0.18), transparent 60%), radial-gradient(900px 500px at 110% 120%, rgba(255,255,255,0.16), transparent 55%)",
          color: "#e4f4f8",
          fontFamily: "sans-serif",
        }}
      >
        {/* top row: eyebrow + rank chip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              color: "#ffffff",
              fontSize: 26,
              letterSpacing: 8,
              fontWeight: 700,
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 999,
                backgroundColor: "#ffffff",
              }}
            />
            PLAYER ONLINE
          </div>
          <div
            style={{
              display: "flex",
              border: "2px solid rgba(255,255,255,0.5)",
              borderRadius: 12,
              padding: "8px 20px",
              fontSize: 24,
              letterSpacing: 4,
              color: "#ffffff",
              fontWeight: 700,
            }}
          >
            RANK S
          </div>
        </div>

        {/* headline block */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 118,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: -2,
              display: "flex",
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 42,
              color: "#9a9a9a",
              fontWeight: 600,
              display: "flex",
            }}
          >
            {site.jobTitle} · CS Student
          </div>
        </div>

        {/* bottom row: stack chips + url */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: 14 }}>
            {stack.map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  border: "2px solid rgba(255,255,255,0.35)",
                  backgroundColor: "rgba(255,255,255,0.08)",
                  borderRadius: 10,
                  padding: "10px 20px",
                  fontSize: 26,
                  color: "#e4f4f8",
                }}
              >
                {t}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#ffffff" }}>
            {site.url.replace(/^https?:\/\//, "")}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
