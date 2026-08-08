"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Radar } from "lucide-react";

// HERO — "the diver arrives". An editorial, character-anchored composition
// grafted from the reference images (Digital Hunters / oversized-type portfolio
// covers). The headline is split around the figure: "BUILDING" spans the whole
// width up top, then "IN THE" and "DEEP" sit inboard, hugging the diver who
// stands centred between them. Below, two columns of real writing — no buttons,
// no dashboard readouts — carry the message.
//
// Responsive: on large screens the figure is a foreground centrepiece the type
// wraps around; on small screens it drops behind the type as a dimmed backdrop
// so the copy stays readable. prefers-reduced-motion stills all drift/parallax.

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const yType = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const yChar = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70]);
  const fade = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <section className="relative z-20 flex min-h-screen flex-col justify-center overflow-x-clip pb-16 pt-28">
      {/* ── Decorative bloom, clipped to the hero box ─────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-[1] overflow-hidden">
        <motion.div
          style={{ opacity: fade }}
          className="glow-horizon absolute inset-x-0 bottom-[14vh] h-px"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[34vh]"
          style={{
            background:
              "radial-gradient(55% 100% at 50% 100%, rgba(127,233,255,0.18), transparent 70%)",
          }}
        />
      </div>

      {/* ── The character. Centred at every breakpoint. On mobile it's a dimmed
          backdrop behind the centred copy; at lg+ it becomes the foreground
          centrepiece the split headline wraps, bleeding into About. ── */}
      <motion.div
        style={{ y: yChar }}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 inset-y-0 z-[5] flex justify-center lg:-bottom-[36vh] lg:top-20 lg:z-[15]"
      >
        <div
          className="absolute left-1/2 top-[42%] h-[54%] w-[62%] max-w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl lg:h-[62%] lg:w-[58%]"
          style={{
            background:
              "radial-gradient(circle, rgba(127,233,255,0.26), rgba(94,176,200,0.08) 45%, transparent 70%)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease, delay: 0.35 }}
          className="animate-drift relative flex h-full items-end"
        >
          <Image
            src="/character.png"
            alt="Illustration of the developer as a game character"
            width={1024}
            height={1536}
            preload
            sizes="(max-width: 1024px) 80vw, 46vw"
            className="h-full w-auto max-w-none select-none object-contain object-bottom opacity-[0.18] drop-shadow-[0_24px_70px_rgba(4,20,28,0.65)] sm:opacity-25 lg:opacity-100"
          />
        </motion.div>
      </motion.div>

      {/* Mobile-only scrim: a vertical darkening (denser toward the top where the
          headline sits) so centred copy reads cleanly over the centred figure.
          Removed at lg+ where layout separates text and figure spatially. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[8] lg:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(7,31,40,0.78) 0%, rgba(7,31,40,0.62) 50%, rgba(7,31,40,0.72) 100%)",
        }}
      />

      {/* ── FULL-BLEED headline. Uses .shell gutters only; words are pushed to
          the screen edges so the type spans the whole display. ─────────────── */}
      <motion.div style={{ y: yType }} className="shell relative z-10 w-full">
        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mb-4 flex items-center justify-center gap-3 lg:justify-start"
        >
          <span className="rule-fade w-10 flex-none" />
          <span className="eyebrow flex items-center gap-2 text-[0.66rem]">
            <Radar size={13} /> player online · rank S
          </span>
        </motion.div>

        {/* Desktop (lg+) is the committed, edge-split composition — words pushed
            to the outer edges of an 86rem band around a fixed CENTRE SPACER that
            reserves the character's column. Those desktop classes are LEFT EXACTLY
            as shipped. Mobile (<lg) is layered on via `max-lg:` overrides only:
            smaller type, centred, gapped — so the words never crowd the screen
            edges. No `lg:` desktop value is touched. */}
        <h1 className="display text-center text-frost drop-shadow-[0_2px_24px_rgba(4,20,28,0.7)] lg:text-left">
          {/* Row 1 — short words, big, small centre gap */}
          <span className="mx-auto flex w-full max-w-[min(100%,86rem)] items-baseline justify-between text-[clamp(2.75rem,13vw,12.5rem)] leading-[0.86] tracking-[-0.02em] max-lg:justify-center max-lg:gap-[0.3em] max-lg:text-[clamp(2.25rem,10.5vw,4rem)] max-lg:leading-[0.9]">
            <motion.span
              className="block whitespace-nowrap"
              initial={{ clipPath: "inset(0 0 100% 0)", y: "0.3em" }}
              animate={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.1 }}
            >
              PRESS
            </motion.span>
            {/* centre spacer for the figure — desktop only */}
            <span aria-hidden className="w-[15%] flex-none max-lg:hidden" />
            <motion.span
              className="block whitespace-nowrap"
              initial={{ clipPath: "inset(0 0 100% 0)", y: "0.3em" }}
              animate={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.18 }}
            >
              START
            </motion.span>
          </span>

          {/* Row 2 — long words, smaller, WIDER centre gap */}
          <span className="mx-auto mt-1 flex w-full max-w-[min(100%,86rem)] items-baseline justify-between text-[clamp(2.1rem,9.5vw,8.75rem)] leading-[0.86] tracking-[-0.02em] sm:mt-2 max-lg:justify-center max-lg:gap-[0.3em] max-lg:text-[clamp(1.6rem,7.5vw,3rem)] max-lg:leading-[0.9]">
            <motion.span
              className="block whitespace-nowrap"
              initial={{ clipPath: "inset(0 0 100% 0)", y: "0.3em" }}
              animate={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.24 }}
            >
              TO&nbsp;BUILD
            </motion.span>
            {/* wider centre spacer — long words need more clearance; desktop only */}
            <span aria-hidden className="w-[20%] flex-none max-lg:hidden" />
            <motion.span
              className="block whitespace-nowrap"
              initial={{ clipPath: "inset(0 0 100% 0)", y: "0.3em" }}
              animate={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.34 }}
            >
              <span className="text-gradient">WORLDS</span>
            </motion.span>
          </span>
        </h1>
      </motion.div>

      {/* ── Lower band: two columns, each a mono label → enlarged display lede →
          quiet supporting line. Hierarchy lets the copy hold up over the art. ── */}
      <div className="shell relative z-20 mt-auto grid w-full grid-cols-1 items-end gap-x-16 gap-y-12 pt-14 lg:grid-cols-2">
        {/* Left — who I am */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.5 }}
          className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left"
        >
          <div className="mb-4 flex items-center justify-center gap-3 lg:justify-start">
            <span className="rule-fade w-8 flex-none" />
            <span className="eyebrow text-[0.6rem]">the developer</span>
            <span className="rule-fade w-8 flex-none lg:hidden" />
          </div>
          <p className="lede text-[clamp(1.4rem,2.3vw,2.1rem)]">
            I&apos;m <em>Teenie Rod Joshua B</em> — a developer who builds
            thoughtful software from the ground up.
          </p>
          <p className="copy-legible mx-auto mt-5 max-w-md text-base leading-relaxed lg:mx-0">
            I turn ideas into playable software — working across interfaces,
            systems, and everything in between. I scout the problem first, then
            build things that are clear, reliable, and actually fun to use.
          </p>
        </motion.div>

        {/* Right — how I work */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.64 }}
          className="mx-auto max-w-xl text-center lg:mx-0 lg:justify-self-end lg:text-right"
        >
          <div className="mb-4 flex items-center justify-center gap-3 lg:justify-end">
            <span className="rule-fade w-8 flex-none lg:hidden" />
            <span className="eyebrow text-[0.6rem]">the approach</span>
            <span className="rule-fade w-8 flex-none" />
          </div>
          <p className="lede text-[clamp(1.4rem,2.3vw,2.1rem)]">
            I&apos;d rather build something <em>meaningful</em> than build
            something just to ship.
          </p>
          <p className="copy-legible mx-auto mt-5 max-w-md text-base leading-relaxed lg:ml-auto lg:mr-0">
            I read the level before rushing it — simplifying the easy stretches
            and grinding the hard bosses. Every project is another run: a chance
            to level up, clear a real problem, and leave the map better than I
            found it.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
