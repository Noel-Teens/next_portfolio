"use client";

import { useEffect, useRef, useState } from "react";

// SIGNATURE ELEMENT: a live dive-computer HUD fixed to the bottom-left. As you
// scroll the page you descend — depth (m) and pressure (bar) climb with scroll,
// coordinates tick as if drifting on a current, and a vertical gauge fills. It
// turns the scrollbar into an instrument reading, which is the whole conceit of
// the palette. Deliberately the ONE loud element; everything else stays quiet.
//
// All derived from real scroll position (no random) so SSR/CSR agree; the
// coordinate drift is a smooth function of scroll, not Math.random.

const MAX_DEPTH = 1200; // metres at the bottom of the page
const SURFACE_PRESSURE = 1; // 1 bar at the surface
// ~1 bar per 10m of seawater — a real relationship, kept honest.
const BAR_PER_M = 0.1;

function fmtCoord(base: number, drift: number, hemi: [string, string]) {
  const val = base + drift;
  const deg = Math.floor(Math.abs(val));
  const min = Math.floor((Math.abs(val) - deg) * 60);
  const h = val >= 0 ? hemi[0] : hemi[1];
  return `${deg}°${String(min).padStart(2, "0")}′${h}`;
}

export default function DepthMeter() {
  const [progress, setProgress] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        setProgress(max > 0 ? Math.min(1, doc.scrollTop / max) : 0);
        raf.current = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  const depth = Math.round(progress * MAX_DEPTH);
  const pressure = (SURFACE_PRESSURE + depth * BAR_PER_M).toFixed(1);
  // coordinates drift smoothly with descent — reads as being carried by current
  const lat = fmtCoord(12, Math.sin(progress * Math.PI) * 0.9, ["N", "S"]);
  const lon = fmtCoord(-8, Math.cos(progress * Math.PI) * 0.7, ["E", "W"]);

  return (
    <aside
      aria-hidden
      className="fixed bottom-5 left-5 z-40 hidden select-none md:block"
      style={{ animation: "hud-flicker 6s linear infinite" }}
    >
      <div className="glass relative w-56 overflow-hidden rounded-2xl px-4 py-3.5">
        {/* header strip */}
        <div className="mb-3 flex items-center justify-between">
          <span className="eyebrow text-[0.58rem]">dive computer</span>
          <span className="flex items-center gap-1.5">
            <span
              className="h-1.5 w-1.5 rounded-full bg-ripple"
              style={{ boxShadow: "0 0 8px #5eb0c8" }}
            />
            <span className="font-mono text-[0.58rem] text-glaze">live</span>
          </span>
        </div>

        <div className="flex gap-3">
          {/* vertical gauge */}
          <div className="relative w-1.5 flex-none overflow-hidden rounded-full bg-[rgba(159,211,227,0.15)]">
            <div
              className="absolute inset-x-0 top-0 rounded-full"
              style={{
                height: `${progress * 100}%`,
                background: "linear-gradient(180deg,#9fd3e3,#5eb0c8,#2a7387)",
                transition: "height 0.12s linear",
              }}
            />
          </div>

          {/* readouts */}
          <dl className="flex-1 space-y-2">
            <div className="flex items-baseline justify-between">
              <dt className="font-mono text-[0.58rem] uppercase tracking-wider text-glaze/70">
                depth
              </dt>
              <dd className="font-mono text-sm tabular-nums text-frost">
                −{depth}
                <span className="text-ripple/70">m</span>
              </dd>
            </div>
            <div className="flex items-baseline justify-between">
              <dt className="font-mono text-[0.58rem] uppercase tracking-wider text-glaze/70">
                pressure
              </dt>
              <dd className="font-mono text-sm tabular-nums text-frost">
                {pressure}
                <span className="text-ripple/70">bar</span>
              </dd>
            </div>
            <div className="rule-fade my-1 !opacity-25" />
            <div className="font-mono text-[0.62rem] tabular-nums text-glaze">
              {lat} · {lon}
            </div>
          </dl>
        </div>
      </div>
    </aside>
  );
}
