"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github, Play, ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/supabase/types";

const ease = [0.22, 1, 0.36, 1] as const;

function hasLiveUrl(url: string | null): url is string {
  return !!url && url !== "#";
}

// PROJECTS as a full-bleed MASTER–DETAIL browser (reference layout):
//   • LEFT ~25%: every project stacked vertically as a selectable list.
//   • RIGHT ~75%: the selected project's big landscape image + full detail.
// The whole thing runs edge to edge (no side gutters). Selection is click /
// keyboard driven; featured projects lead the list.
export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const items = [...projects].sort(
    (a, b) => Number(b.featured) - Number(a.featured)
  );
  const [sel, setSel] = useState(0);
  const active = items[sel] ?? items[0];
  if (!active) return null;

  const total = String(items.length).padStart(2, "0");

  return (
    <div className="grid grid-cols-1 border-y border-glaze/15 lg:grid-cols-[26%_1fr]">
      {/* ── LEFT: project log ─────────────────────────────────────────── */}
      <ul
        className="flex flex-col divide-y divide-glaze/10 border-glaze/15 lg:border-r"
        role="listbox"
        aria-label="Projects"
      >
        {items.map((p, i) => {
          const on = i === sel;
          return (
            <li key={p.id}>
              <button
                role="option"
                aria-selected={on}
                onClick={() => setSel(i)}
                className={`group relative flex w-full items-center gap-4 px-5 py-5 text-left transition-colors duration-300 md:px-8 ${
                  on ? "bg-[#7fe9ff]/10" : "hover:bg-frost/5"
                }`}
              >
                {/* active accent bar */}
                <span
                  className={`absolute inset-y-0 left-0 w-0.5 transition-all duration-300 ${
                    on ? "bg-[#7fe9ff] shadow-[0_0_12px_#7fe9ff]" : "bg-transparent"
                  }`}
                />
                {/* selection dot — follows the selected project down the list */}
                <span className="relative flex h-4 w-4 flex-none items-center justify-center">
                  {on && (
                    <motion.span
                      layoutId="project-dot"
                      transition={{ type: "spring", stiffness: 500, damping: 34 }}
                      className="absolute inset-0 rounded-full bg-[#7fe9ff] shadow-[0_0_12px_#7fe9ff]"
                    />
                  )}
                  <span
                    className={`relative h-1.5 w-1.5 rounded-full transition-colors ${
                      on ? "bg-abyss" : "bg-glaze/30"
                    }`}
                  />
                </span>

                <span
                  className={`font-mono text-xs tabular-nums transition-colors ${
                    on ? "lit" : "text-ink/60"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* thumbnail */}
                <span className="relative h-12 w-16 flex-none overflow-hidden rounded-md border border-glaze/15">
                  {p.image_url ? (
                    <Image
                      src={p.image_url}
                      alt=""
                      fill
                      sizes="64px"
                      className={`object-cover object-top transition-all duration-300 ${
                        on ? "" : "grayscale group-hover:grayscale-0"
                      }`}
                    />
                  ) : (
                    <span className="block h-full w-full bg-arctic/40" />
                  )}
                </span>

                <span className="min-w-0 flex-1">
                  <span
                    className={`block truncate font-display text-base font-semibold transition-colors ${
                      on ? "text-frost" : "text-ink group-hover:text-frost"
                    }`}
                  >
                    {p.title}
                  </span>
                  <span className="block truncate font-mono text-[0.65rem] text-ink/70">
                    {p.tags.slice(0, 3).join(" · ") || "—"}
                  </span>
                </span>

                {p.featured && (
                  <span className="hidden flex-none rounded border border-[#7fe9ff]/40 px-1.5 py-0.5 font-mono text-[0.5rem] uppercase tracking-widest text-[#7fe9ff]/80 sm:block">
                    ★
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {/* ── RIGHT: selected project detail ────────────────────────────── */}
      {/* Two layouts. MOBILE: a clean vertical stack — image on top, then all
          details on a solid surface below (no text over the screenshot). LG+:
          the editorial overlay, image filling the card with content laid over a
          bottom scrim across the full width. */}
      <div className="relative overflow-hidden lg:min-h-[48rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease }}
            className="flex flex-col lg:absolute lg:inset-0 lg:block"
          >
            {/* ── image ── mobile: fixed-ratio banner in flow; lg: fills card ── */}
            <div className="relative aspect-[16/10] w-full sm:aspect-[16/9] lg:absolute lg:inset-0 lg:aspect-auto lg:h-full">
              {active.image_url ? (
                <Image
                  src={active.image_url}
                  alt={active.title}
                  fill
                  sizes="(max-width:1024px) 100vw, 75vw"
                  preload
                  className="object-cover object-top"
                />
              ) : (
                <div className="absolute inset-0 bg-arctic/40" />
              )}

              {/* find index — over the image, top-left */}
              <div className="absolute left-5 top-5 flex items-center gap-3 md:left-12 md:top-6">
                <span className="rounded bg-abyss/80 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-widest text-frost backdrop-blur">
                  mission {String(sel + 1).padStart(2, "0")} / {total}
                </span>
                {active.featured && (
                  <span className="rounded-full border border-[#7fe9ff]/50 bg-[#7fe9ff]/15 px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-widest text-[#7fe9ff]">
                    boss fight
                  </span>
                )}
              </div>

              {/* lg-only: scrim + giant vertical outlined title over the image */}
              <div className="absolute inset-0 hidden bg-gradient-to-t from-abyss via-abyss/85 via-40% to-transparent lg:block" />
              <span
                aria-hidden
                className="display pointer-events-none absolute right-4 top-8 hidden select-none text-[clamp(2.5rem,10vh,6.5rem)] leading-[0.82] [writing-mode:vertical-rl] md:right-10 lg:block"
                style={{
                  color: "transparent",
                  WebkitTextStroke: "2px rgba(228,244,248,0.95)",
                  filter:
                    "drop-shadow(0 0 14px rgba(10,44,56,0.95)) drop-shadow(0 0 4px rgba(10,44,56,0.9))",
                }}
              >
                {active.title.split(" ")[0]?.toUpperCase()}
              </span>
            </div>

            {/* ── details ── mobile: solid surface below the image; lg: overlay ── */}
            <div className="relative bg-abyss p-6 md:p-8 lg:absolute lg:inset-x-0 lg:bottom-0 lg:bg-transparent lg:p-12 lg:pr-28">
              {/* lg-only blurred plate behind the overlaid content */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 hidden backdrop-blur-[2px] lg:block"
                style={{
                  background:
                    "linear-gradient(to top, rgba(7,31,40,0.92), rgba(7,31,40,0.55) 55%, transparent)",
                  maskImage: "linear-gradient(to top, #000 60%, transparent)",
                  WebkitMaskImage: "linear-gradient(to top, #000 60%, transparent)",
                }}
              />
              <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:gap-16">
                {/* main: title + description */}
                <div className="lg:flex-[1.7]">
                  <h3 className="display text-3xl text-frost sm:text-4xl md:text-6xl">
                    {active.title}
                  </h3>

                  {active.highlight && (
                    <p className="mt-4 flex items-start gap-2.5 text-base font-medium text-frost">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[#7fe9ff] shadow-[0_0_8px_#7fe9ff]" />
                      {active.highlight}
                    </p>
                  )}

                  <div className="mt-5 max-w-[62ch] space-y-4 text-[0.975rem] leading-relaxed text-frost/85">
                    {active.description
                      .split(/\n\s*\n/)
                      .map((para) => para.trim())
                      .filter(Boolean)
                      .map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                  </div>
                </div>

                {/* side: stack + links */}
                <div className="lg:flex-1 lg:border-l lg:border-glaze/15 lg:pl-16">
                  {active.tags.length > 0 && (
                    <div className="mb-7">
                      <div className="eyebrow mb-3 text-[0.58rem]">stack</div>
                      <ul className="flex flex-wrap gap-2">
                        {active.tags.map((t, i) => (
                          <li key={i} className="chip rounded-md px-3 py-1.5">
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="eyebrow mb-3 text-[0.58rem]">links</div>
                  <div className="flex flex-wrap items-center gap-3">
                    {hasLiveUrl(active.live_url) && (
                      <a
                        href={active.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-lg bg-[#7fe9ff] px-5 py-2.5 text-sm font-semibold text-abyss shadow-[0_0_28px_rgba(127,233,255,0.5)] transition-all hover:bg-frost"
                      >
                        <Play size={14} className="translate-x-px fill-abyss" />
                        Play live
                      </a>
                    )}
                    {active.github_url && (
                      <a
                        href={active.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-lg border border-glaze/30 px-5 py-2.5 text-sm font-semibold text-frost transition-all hover:border-[#7fe9ff] hover:text-[#7fe9ff]"
                      >
                        <Github size={15} /> Source
                      </a>
                    )}
                    {!hasLiveUrl(active.live_url) && !active.github_url && (
                      <span className="flex items-center gap-2 font-mono text-xs text-ink/70">
                        Logged — no public link yet <ArrowUpRight size={14} />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
