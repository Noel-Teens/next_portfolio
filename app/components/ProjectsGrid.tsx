"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Github, Play, ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/supabase/types";

const ease = [0.22, 1, 0.36, 1] as const;

function hasLiveUrl(url: string | null): url is string {
  return !!url && url !== "#";
}

// MISSIONS as a character-select screen. Three columns, NO text overlaid on the
// screenshots (that fought the busy images):
//   • roster  — compact 1:1 icon tiles; selected one highlighted
//   • preview — the selected project's screenshot in its own clean framed panel
//   • details — mission number, title, highlight, stack, description, actions
// Everything uses theme tokens so it renders correctly on the `.band-ink` band.
export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const items = [...projects].sort(
    (a, b) => Number(b.featured) - Number(a.featured)
  );
  const [sel, setSel] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);
  const tileRefs = useRef<(HTMLLIElement | null)[]>([]);
  const didMount = useRef(false);

  // Keep the selected tile in view WITHIN the roster only — never scroll the
  // window (that made the page jump to this section on load). We skip the first
  // render, then adjust the roster container's own scroll position directly.
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    const list = listRef.current;
    const tile = tileRefs.current[sel];
    if (!list || !tile) return;
    // scroll the container so the tile is centred, without touching the window
    const top =
      tile.offsetTop - list.clientHeight / 2 + tile.clientHeight / 2;
    const left =
      tile.offsetLeft - list.clientWidth / 2 + tile.clientWidth / 2;
    list.scrollTo({ top, left, behavior: "smooth" });
  }, [sel]);

  const active = items[sel] ?? items[0];
  if (!active) return null;

  const total = String(items.length).padStart(2, "0");

  return (
    <div className="shell grid grid-cols-1 items-start gap-8 lg:grid-cols-[12rem_1.25fr_1fr] lg:gap-10">
      {/* ── ROSTER: landscape thumbnails. The label is on mobile only; on lg
          the list top-aligns with the selected image (same Y) and shares its
          exact height, so the roster spans exactly the image's vertical span. ── */}
      <div>
        <div className="mb-3 font-mono text-[0.54rem] uppercase tracking-[0.24em] text-neon lg:hidden">
          roster
        </div>
        <ul
          ref={listRef}
          role="listbox"
          aria-label="Missions"
          className="no-scrollbar flex snap-x gap-3 overflow-x-auto scroll-smooth pb-2 lg:h-[30rem] lg:snap-y lg:flex-col lg:gap-2.5 lg:overflow-y-auto lg:pb-0 lg:[mask-image:linear-gradient(to_bottom,#000_calc(100%-2rem),transparent)]"
        >
          {items.map((p, i) => {
            const on = i === sel;
            return (
              <li
                key={p.id}
                ref={(el) => {
                  tileRefs.current[i] = el;
                }}
                className="flex-none snap-center lg:w-full"
              >
                <button
                  role="option"
                  aria-selected={on}
                  onClick={() => setSel(i)}
                  title={p.title}
                  className={`group relative block aspect-[16/10] w-28 overflow-hidden rounded-md border transition-all duration-300 lg:w-full ${
                    on
                      ? "border-neon ring-2 ring-neon/50"
                      : "border-neon/15 opacity-55 hover:opacity-100"
                  }`}
                >
                  {p.image_url ? (
                    <Image
                      src={p.image_url}
                      alt={p.title}
                      fill
                      sizes="96px"
                      className={`object-cover object-top transition-all duration-300 ${
                        on ? "" : "grayscale group-hover:grayscale-0"
                      }`}
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center bg-arctic/40 font-display text-lg text-frost">
                      {p.title.charAt(0)}
                    </span>
                  )}
                  <span
                    className={`absolute left-1 top-1 rounded px-1 font-mono text-[0.5rem] tabular-nums ${
                      on ? "bg-neon text-abyss" : "bg-black/60 text-white"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ── PREVIEW: clean framed screenshot (no text on it) ────────────── */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-neon/20 lg:aspect-auto lg:h-[30rem]"
          >
            {active.image_url ? (
              <Image
                src={active.image_url}
                alt={active.title}
                fill
                sizes="(max-width:1024px) 100vw, 45vw"
                preload
                className="object-cover object-top"
              />
            ) : (
              <div className="absolute inset-0 bg-arctic/40" />
            )}
            {/* mission tag — small chip, top-left, doesn't cover content */}
            <span className="absolute left-3 top-3 rounded bg-black/65 px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-widest text-white backdrop-blur">
              mission {String(sel + 1).padStart(2, "0")} / {total}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── DETAILS: all text lives here, never on the image ────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`d-${active.id}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease, delay: 0.05 }}
        >
          {/* big mission number + title */}
          <div className="flex items-start gap-4">
            <span className="font-display text-5xl font-bold leading-[0.8] text-frost sm:text-6xl">
              {String(sel + 1).padStart(2, "0")}
            </span>
            <div className="pt-1">
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-neon/70">
                mission
              </span>
              <h3 className="display text-3xl leading-none text-frost sm:text-4xl">
                {active.title}
              </h3>
            </div>
          </div>

          {active.highlight && (
            <p className="mt-5 flex items-start gap-2 text-base font-medium text-frost">
              <span className="mt-2 h-1.5 w-1.5 flex-none bg-neon" />
              {active.highlight}
            </p>
          )}

          {/* description */}
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink/85">
            {active.description
              .split(/\n\s*\n/)
              .map((para) => para.trim())
              .filter(Boolean)
              .slice(0, 2)
              .map((para, i) => (
                <p key={i}>{para}</p>
              ))}
          </div>

          {/* stack */}
          {active.tags.length > 0 && (
            <div className="mt-6">
              <div className="mb-2 font-mono text-[0.54rem] uppercase tracking-[0.24em] text-neon/70">
                stack
              </div>
              <ul className="flex flex-wrap gap-2">
                {active.tags.map((t, i) => (
                  <li key={i} className="chip rounded-md px-2.5 py-1">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* actions */}
          <div className="mt-7 flex flex-wrap gap-3">
            {hasLiveUrl(active.live_url) && (
              <a
                href={active.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-sm bg-neon px-6 py-3 text-sm font-bold uppercase tracking-widest text-abyss transition-colors hover:bg-frost"
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
                className="flex items-center gap-2 rounded-sm border border-neon/40 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-frost transition-colors hover:border-neon hover:bg-neon/10"
              >
                <Github size={15} /> Source
              </a>
            )}
            {!hasLiveUrl(active.live_url) && !active.github_url && (
              <span className="flex items-center gap-2 font-mono text-xs text-ink/60">
                Logged — no public link yet <ArrowUpRight size={14} />
              </span>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
