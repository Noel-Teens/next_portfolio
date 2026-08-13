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
          backgroundColor: "#0a2c38",
          backgroundImage:
            "radial-gradient(1200px 500px at 15% -10%, rgba(127,233,255,0.18), transparent 60%), radial-gradient(900px 500px at 110% 120%, rgba(94,176,200,0.16), transparent 55%)",
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
              color: "#7fe9ff",
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
                backgroundColor: "#7fe9ff",
              }}
            />
            PLAYER ONLINE
          </div>
          <div
            style={{
              display: "flex",
              border: "2px solid rgba(127,233,255,0.5)",
              borderRadius: 12,
              padding: "8px 20px",
              fontSize: 24,
              letterSpacing: 4,
              color: "#7fe9ff",
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
              color: "#9fd3e3",
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
                  border: "2px solid rgba(127,233,255,0.35)",
                  backgroundColor: "rgba(127,233,255,0.08)",
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
          <div style={{ display: "flex", fontSize: 26, color: "#7fe9ff" }}>
            {site.url.replace(/^https?:\/\//, "")}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
