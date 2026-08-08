"use client";

// Rising-bubble overlay built from the bubbles.png art asset. Two copies of the
// field are stacked vertically inside a track that translates diagonally up-and-
// across by exactly one tile height, so the second copy seamlessly takes over as
// the first exits — an endless diagonal drift. Kept deliberately low-opacity so
// it reads as transparent, see-through water and never fights the content on top.
//
// Mounted once at the page level (PortfolioHome) as a fixed, site-wide layer —
// not per-section. Decorative (aria-hidden) and stilled under
// prefers-reduced-motion via the global rule in globals.css.
export default function Bubbles({
  opacity = 0.14,
  speed = 34,
  className = "",
}: {
  opacity?: number;
  speed?: number; // seconds per loop; larger = slower
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none overflow-hidden ${className}`}
      style={{ opacity }}
    >
      {/* Track is over-wide so the horizontal component of the diagonal drift
          never exposes an empty edge. */}
      <div
        className="absolute -left-[10%] top-0 h-[200%] w-[120%]"
        style={{ animation: `bubbles-drift ${speed}s linear infinite` }}
      >
        {/* two stacked tiles — the loop translates up exactly one tile height */}
        <div
          className="h-1/2 w-full bg-top bg-repeat-x"
          style={{ backgroundImage: "url(/bubbles.png)", backgroundSize: "auto 100%" }}
        />
        <div
          className="h-1/2 w-full bg-top bg-repeat-x"
          style={{ backgroundImage: "url(/bubbles.png)", backgroundSize: "auto 100%" }}
        />
      </div>
    </div>
  );
}
