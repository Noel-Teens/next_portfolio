"use client";

// Fixed, full-viewport atmosphere behind all content. Two pure-CSS layers so
// there's no JS animation cost: drifting caustic light and slow god-rays from
// the surface. (Rising bubbles were cut deliberately — the sonar porthole and
// rays already read as "underwater", and a bubble field is the most generic
// ocean cliché. One accessory removed.) Purely decorative, hidden from
// assistive tech, and stilled entirely under prefers-reduced-motion.

export default function AmbientOcean() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* God-rays: soft cones angling down from the surface. */}
      <div
        className="absolute -top-1/3 left-1/4 h-[160vh] w-[45vw] blur-2xl"
        style={{
          background:
            "linear-gradient(180deg, rgba(159,211,227,0.20), rgba(94,176,200,0.05) 45%, transparent 70%)",
          transformOrigin: "top center",
          animation: "ray-sway 16s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -top-1/3 right-1/5 h-[150vh] w-[30vw] blur-2xl"
        style={{
          background:
            "linear-gradient(180deg, rgba(228,244,248,0.14), rgba(94,176,200,0.04) 40%, transparent 65%)",
          transformOrigin: "top center",
          animation: "ray-sway 22s ease-in-out infinite reverse",
        }}
      />

      {/* Caustics: overlapping radial nets that drift, mimicking the rippling
          light cast through moving water. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 40% at 30% 20%, rgba(94,176,200,0.16), transparent 60%), radial-gradient(50% 35% at 75% 45%, rgba(42,115,135,0.20), transparent 65%)",
          animation: "caustic-drift 20s ease-in-out infinite",
        }}
      />
    </div>
  );
}
