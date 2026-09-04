"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import type { Profile } from "@/lib/supabase/types";

// HERO — the "giant name + walking character" key art (Mafia reference), in the
// cream/black editorial identity. The mechanic: one enormous full-bleed word
// ("TEENIE") is the backdrop; the character stands OVER it, interlocking the
// letters. Content hugs the corners over big negative space:
//   • top-left    — a three-line creed (the "LOYALTY IS EARNED" beat)
//   • centre      — giant TEENIE with the character interlocking it
//   • bottom-left — primary actions (View work / résumé), like PRE-ORDER / TRAILER
//   • bottom-right— availability meta, like "NEW GAME 2024"
//
// Hierarchy comes from WEIGHT + solid black shapes on cream — no glows.
// Character is grayscale so it sits in the mono art. Mobile keeps the giant word
// but stacks the copy and dims the figure behind a cream scrim.

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero({ profile }: { profile: Profile }) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const yWord = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 40]);
  const yChar = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -50]);

  return (
    <section className="relative z-20 min-h-[44rem] overflow-hidden lg:h-screen">
      {/* ── FULL-SECTION ART LAYERS. The giant word + character are absolute to
          the whole section (not a squeezed flex cell), so the character can
          stand nearly full-height and tower over the word — Mafia key art. ── */}

      {/* GIANT WORD — stretched EDGE TO EDGE via SVG textLength=100%, so the
          name fills the full screen width on every breakpoint (truly responsive,
          no per-size font tuning). Vertically centred behind the figure. */}
      <motion.div
        style={{ y: yWord }}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[56%] z-[4] -translate-y-1/2 px-[2vw]"
      >
        {/* viewBox height (28) < font cap-height scaled: the text is scaled
            vertically (scaleY 1.4) so only its HEIGHT grows — width stays locked
            to 100% by textLength. Adjust the scaleY / viewBox height to taste. */}
        <svg
          viewBox="0 0 100 34"
          preserveAspectRatio="xMidYMid meet"
          className="block w-full overflow-visible"
        >
          <text
            x="50"
            y="24"
            textAnchor="middle"
            textLength="100"
            lengthAdjust="spacingAndGlyphs"
            fontFamily="var(--font-display)"
            fontWeight="700"
            className="fill-frost"
            style={{ fontSize: "20px", transform: "scaleY(1.7)", transformOrigin: "center", transformBox: "fill-box" }}
          >
            TEENIE
          </text>
        </svg>
      </motion.div>

      {/* CHARACTER — dominant figure, runs nearly the FULL section height (head
          up near the navbar, feet at the bottom), towering over the word like
          the Mafia key art. */}
      <motion.div
        style={{ y: yChar }}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[-6%] top-[8%] z-[5] flex items-end justify-center lg:top-[2%]"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease, delay: 0.3 }}
          className="animate-drift flex h-full items-end"
        >
          <Image
            src="/character.png"
            alt="Illustration of the developer as a game character"
            width={1024}
            height={1536}
            preload
            sizes="(max-width: 1024px) 92vw, 58vw"
            className="h-full w-auto max-w-none select-none object-contain object-bottom opacity-25 grayscale contrast-[1.05] drop-shadow-[0_20px_50px_rgba(20,18,14,0.28)] sm:opacity-40 lg:opacity-100"
          />
        </motion.div>
      </motion.div>

      {/* Mobile cream scrim so the overlaid copy reads over the figure. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[6] lg:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(242,239,233,0.72) 0%, rgba(242,239,233,0.45) 45%, rgba(242,239,233,0.85) 100%)",
        }}
      />

      {/* ── TOP-LEFT creed — overlay ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 0.1 }}
        className="shell absolute inset-x-0 top-0 z-20 pt-28 text-center lg:pt-[15vh] lg:text-left"
      >
        <div className="mb-3 flex items-center justify-center gap-3 lg:justify-start">
          <span className="rule-fade w-8 flex-none" />
          <span className="eyebrow flex items-center gap-2 text-[0.6rem]">
            <span className="h-1.5 w-1.5 rounded-full bg-neon" />
            player online · rank S
          </span>
        </div>
        <p className="display text-[clamp(1.1rem,2vw,1.9rem)] font-bold uppercase leading-[1.05] tracking-tight text-frost">
          Built to last.
          <br />
          Shipped with care.
          <br />
          <span className="text-ripple">Systems that hold.</span>
        </p>
      </motion.div>

      {/* ── BOTTOM ROW — overlay: actions (left) + availability meta (right) ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 0.5 }}
        className="shell absolute inset-x-0 bottom-0 z-20 pb-10 lg:pb-[7vh]"
      >
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* actions */}
          <div className="flex items-center gap-5">
            <a
              href="#projects"
              className="group flex items-center gap-2 rounded-none bg-neon px-7 py-3.5 font-semibold text-abyss transition-colors hover:bg-frost"
            >
              View work
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </a>
            <a
              href="#contact"
              className="group flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:text-frost"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/40 transition-colors group-hover:border-frost">
                <Play size={12} className="translate-x-px fill-current" />
              </span>
              Hire me
            </a>
          </div>

          {/* availability meta */}
          <div className="text-center sm:text-right">
            <p className="flex items-center justify-center gap-2 font-display text-lg font-bold text-frost sm:justify-end">
              {profile.open_to_work && (
                <span className="h-2 w-2 rounded-full bg-neon" />
              )}
              {profile.status_label || "Open to work"}
            </p>
            <p className="mt-0.5 font-mono text-[0.62rem] uppercase tracking-[0.26em] text-ripple">
              CS &rsquo;27{profile.region ? ` · ${profile.region}` : ""}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
