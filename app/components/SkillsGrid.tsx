"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getIcon } from "./icon-map";
import type { SkillCategory } from "@/lib/supabase/types";

// LOADOUT as an EQUIP SCREEN (master–detail). Left: a rail of selectable
// CLASSES, each with its rarity RANK (S/A/B/C). Right: the selected class shown
// large — sigil, level, specialty, proficiency meter, and the "equipped gear"
// (skills) as slot chips. Click/keyboard driven, like a game's equip menu.
//
// Honesty rule: every number is REAL. The one true metric is a category's skill
// count vs. the busiest category → LV (count) and PROFICIENCY (count ÷ max);
// the rank letter is a banded restatement of that same %, not an invented stat.

const ease = [0.22, 1, 0.36, 1] as const;

const TIER_STOPS: { min: number; tier: string }[] = [
  { min: 100, tier: "S" },
  { min: 85, tier: "A" },
  { min: 70, tier: "B" },
  { min: 0, tier: "C" },
];

function rankTier(pct: number): string {
  return TIER_STOPS.find((t) => pct >= t.min)!.tier;
}

// Short, real specialty lines per class (falls back to a generic line if a
// category title isn't recognised — no invented metrics, just a descriptor).
const SPECIALTY: Record<string, string> = {
  Frontend: "Interfaces that stay fast and legible under load.",
  Backend: "APIs and data models that hold up in production.",
  "Cloud & DevOps": "Ship, observe, and keep it running.",
  "Data & AI": "Turning messy data into useful features.",
};

export default function SkillsGrid({ skills }: { skills: SkillCategory[] }) {
  const maxCount = Math.max(1, ...skills.map((s) => s.skills.length));

  // Rank each class by real skill count; highest leads (best gear on top).
  const classes = [...skills]
    .map((c) => {
      const count = c.skills.length;
      const proficiency = Math.round((count / maxCount) * 100);
      return { ...c, count, proficiency, tier: rankTier(proficiency) };
    })
    .sort((a, b) => b.proficiency - a.proficiency);

  const [sel, setSel] = useState(0);
  const active = classes[sel] ?? classes[0];
  if (!active) return null;

  const segments = 14;
  const filled = Math.max(1, Math.round((active.proficiency / 100) * segments));
  const ActiveIcon = getIcon(active.icon_name);

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 lg:grid-cols-[19rem_1fr]">
      {/* ── LEFT: class rail ── */}
      <ul role="listbox" aria-label="Skill classes" className="flex flex-col gap-2">
        {classes.map((c, i) => {
          const on = i === sel;
          const Icon = getIcon(c.icon_name);
          return (
            <li key={c.id}>
              <button
                role="option"
                aria-selected={on}
                onClick={() => setSel(i)}
                className={`group relative flex w-full items-center gap-4 rounded-xl border px-4 py-3.5 text-left transition-all duration-300 ${
                  on
                    ? "border-neon bg-[color:var(--surface)] shadow-[0_10px_28px_rgba(20,18,14,0.12)]"
                    : "border-neon/15 bg-[color:var(--surface)]/50 hover:border-neon/45 hover:bg-[color:var(--surface)]"
                }`}
              >
                {/* active accent bar */}
                <span
                  className={`absolute inset-y-2 left-0 w-0.5 rounded-full transition-all ${
                    on ? "bg-neon" : "bg-transparent"
                  }`}
                />
                <span
                  className={`flex h-10 w-10 flex-none items-center justify-center rounded-lg ring-1 transition-colors ${
                    on
                      ? "bg-neon text-abyss ring-neon"
                      : "bg-abyss/60 text-neon ring-neon/25"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-display text-sm font-semibold text-frost">
                    {c.title}
                  </span>
                  <span className="font-mono text-[0.58rem] uppercase tracking-widest text-ink/50">
                    {c.count} {c.count === 1 ? "skill" : "skills"} · lv {c.count}
                  </span>
                </span>
                {/* rarity rank badge */}
                <span
                  className={`flex h-7 w-7 flex-none items-center justify-center rounded-md font-display text-sm font-bold ${
                    on
                      ? "bg-neon/20 text-frost ring-1 ring-neon/50"
                      : "text-ink/70 ring-1 ring-neon/20"
                  }`}
                >
                  {c.tier}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* ── RIGHT: equipped panel ── */}
      <div className="relative min-h-[26rem] overflow-hidden rounded-2xl border border-neon/25 bg-[color:var(--surface)] p-6 md:p-8 shadow-[0_12px_32px_rgba(20,18,14,0.08)]">
        {/* corner ticks — spec-sheet motif */}
        <span aria-hidden className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l border-t border-neon/40" />
        <span aria-hidden className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r border-t border-neon/40" />
        <span aria-hidden className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b border-l border-neon/40" />
        <span aria-hidden className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b border-r border-neon/40" />

        <div className="mb-6 flex items-center justify-between font-mono text-[0.58rem] uppercase tracking-[0.24em] text-ink/55">
          <span className="text-neon">▸ equipped</span>
          <span>
            class {String(sel + 1).padStart(2, "0")} /{" "}
            {String(classes.length).padStart(2, "0")}
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease }}
          >
            {/* header: sigil + name + level */}
            <div className="flex items-start gap-5">
              <span className="flex h-20 w-20 flex-none items-center justify-center rounded-2xl bg-neon text-abyss">
                <ActiveIcon className="h-9 w-9" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-display text-3xl font-bold leading-tight text-frost">
                    {active.title}
                  </h3>
                  <span className="lit font-display text-2xl font-bold leading-none">
                    {active.tier}
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-snug text-ink/85">
                  {SPECIALTY[active.title] ??
                    "A core part of the kit I reach for."}
                </p>
              </div>
              <div className="flex-none text-right">
                <span className="block font-mono text-[0.5rem] uppercase tracking-widest text-ink/50">
                  lv
                </span>
                <span className="lit font-display text-4xl font-bold leading-none tabular-nums">
                  {active.count}
                </span>
              </div>
            </div>

            {/* proficiency meter */}
            <div className="mt-8">
              <div className="mb-2 flex items-baseline justify-between font-mono text-xs">
                <span className="uppercase tracking-[0.22em] text-ink/60">
                  proficiency
                </span>
                <span className="tabular-nums text-ink">
                  <span className="lit mr-1.5 font-display text-sm">
                    {active.tier}
                  </span>
                  {active.proficiency}%
                </span>
              </div>
              <div
                className="flex gap-1"
                role="meter"
                aria-valuenow={active.proficiency}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${active.title} proficiency`}
              >
                {Array.from({ length: segments }).map((_, s) => (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0, scaleY: 0.4 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    transition={{ duration: 0.2, ease, delay: s * 0.03 }}
                    className={`h-3 flex-1 rounded-sm ${
                      s < filled ? "bg-neon" : "bg-frost/12"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* equipped gear — the skills as slot chips */}
            <div className="mt-8 border-t border-neon/15 pt-6">
              <span className="font-mono text-[0.58rem] uppercase tracking-[0.24em] text-neon/70">
                equipped gear
              </span>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {active.skills.map((skill, i) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease, delay: 0.1 + i * 0.05 }}
                    className="flex items-center gap-2 rounded-lg border border-neon/20 bg-neon/[0.06] px-3 py-2"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-neon" />
                    <span className="font-mono text-xs text-frost">{skill}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
