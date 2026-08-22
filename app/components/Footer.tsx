import Image from "next/image";
import { Linkedin, Instagram, Github, ArrowUp } from "lucide-react";

// FOOTER — the "GAME OVER · CONTINUE?" screen. The site is played as a console;
// this is the last screen of the run. Rather than a name/socials/copyright strip
// it reads like a retro end-of-game screen: an oversized GAME OVER with a
// blinking terminal cursor (the signature), an "insert coin to continue" prompt
// that IS the contact CTA, the socials framed as "connect ports", and a
// terminal-readout credits bar carrying the honest build + legal line.

const socials = [
  {
    Icon: Linkedin,
    href: "https://www.linkedin.com/in/teenie-rod-joshua/",
    label: "LinkedIn",
    tag: "in",
  },
  {
    Icon: Instagram,
    href: "https://www.instagram.com/noel_teens/",
    label: "Instagram",
    tag: "ig",
  },
  {
    Icon: Github,
    href: "https://github.com/Noel-Teens",
    label: "GitHub",
    tag: "gh",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="band-ink relative overflow-hidden border-t border-white/10">
      {/* faint top vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, rgba(0,0,0,0.06), transparent 60%)",
        }}
      />

      <div className="shell relative py-16 md:py-20">
        {/* status eyebrow */}
        <div className="flex items-center justify-center gap-3">
          <span className="rule-fade w-10 flex-none" />
          <span className="eyebrow text-[0.6rem]">run complete · session {year}</span>
          <span className="rule-fade w-10 flex-none" />
        </div>

        {/* GAME OVER — the signature. Blinking cursor after it. */}
        <h2 className="display mt-6 text-center text-[clamp(2.75rem,10vw,7rem)] leading-none text-frost">
          GAME{" "}
          <span className="text-gradient">OVER</span>
          <span
            aria-hidden
            className="ml-2 inline-block h-[0.7em] w-[0.14em] translate-y-[0.04em] bg-neon align-baseline animate-cursor-blink shadow-[0_0_12px_rgba(0,0,0,0.7)]"
          />
        </h2>

        {/* INSERT COIN → the contact CTA. Nostalgia doing a real job. */}
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <span className="eyebrow text-[0.62rem] text-ink/70">
            insert coin to continue
          </span>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-lg bg-neon px-6 py-2.5 font-mono text-sm font-semibold uppercase tracking-widest text-abyss transition-all hover:bg-frost hover:shadow-[0_0_28px_rgba(0,0,0,0.6)]"
          >
            <span className="text-base leading-none">▸</span> Contact
          </a>
        </div>

        {/* connect ports — socials as labelled console ports */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <span className="eyebrow text-[0.56rem] text-ink/55">connect ports</span>
          <div className="flex gap-3">
            {socials.map(({ Icon, href, label, tag }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="group flex items-center gap-2 rounded-xl border border-neon/20 bg-abyss/60 px-3.5 py-2.5 text-ink transition-all hover:border-neon/60 hover:bg-neon/10 hover:text-neon"
              >
                <Icon size={18} />
                <span className="font-mono text-[0.62rem] uppercase tracking-widest text-ink/50 transition-colors group-hover:text-neon">
                  {tag}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* credits — a terminal readout carrying identity + build + legal */}
        <div className="mx-auto mt-14 max-w-3xl rounded-2xl border border-neon/15 bg-abyss/50 p-5 font-mono text-xs leading-relaxed">
          <div className="mb-3 flex items-center gap-2 border-b border-neon/10 pb-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white">
              <Image
                src="/logo.png"
                alt="Teenie logo"
                width={22}
                height={22}
                className="h-[22px] w-[22px] object-contain grayscale brightness-0"
              />
            </span>
            <span className="text-[0.6rem] uppercase tracking-[0.3em] text-neon/80">
              credits
            </span>
            <span className="ml-auto flex items-center gap-1.5 text-[0.66rem] text-ink/70">
              <span className="h-1.5 w-1.5 rounded-full bg-neon shadow-[0_0_8px_#111111]" />
              online
            </span>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-1.5 sm:grid-cols-2">
            <div className="flex gap-2">
              <dt className="text-neon/60">&gt; player</dt>
              <dd className="text-frost">Teenie Rod Joshua B</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-neon/60">&gt; role</dt>
              <dd className="text-ink">Full-stack developer</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-neon/60">&gt; engine</dt>
              <dd className="text-ink">Next.js · Tailwind CSS</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-neon/60">&gt; license</dt>
              <dd className="text-ink">© {year} · all rights reserved</dd>
            </div>
          </dl>
        </div>

        {/* Start over — the secondary action (Contact is the primary neon
            fill). An outlined console button with HUD corner brackets that
            brighten on hover; the arrow lifts to signal "back to the top". */}
        <div className="mt-10 flex justify-center">
          <a
            href="#"
            className="group relative inline-flex items-center gap-2.5 rounded-lg border border-neon/25 bg-abyss/40 px-7 py-3 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-ink transition-all hover:border-neon/50 hover:bg-neon/10 hover:text-neon hover:shadow-[0_0_24px_rgba(0,0,0,0.25)]"
          >
            {/* HUD corner brackets — the console motif, brightened on hover */}
            <span aria-hidden className="pointer-events-none absolute left-1 top-1 h-2 w-2 border-l border-t border-neon/40 transition-colors group-hover:border-neon" />
            <span aria-hidden className="pointer-events-none absolute right-1 top-1 h-2 w-2 border-r border-t border-neon/40 transition-colors group-hover:border-neon" />
            <span aria-hidden className="pointer-events-none absolute bottom-1 left-1 h-2 w-2 border-b border-l border-neon/40 transition-colors group-hover:border-neon" />
            <span aria-hidden className="pointer-events-none absolute bottom-1 right-1 h-2 w-2 border-b border-r border-neon/40 transition-colors group-hover:border-neon" />

            <ArrowUp
              size={14}
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            />
            Start over
          </a>
        </div>
      </div>
    </footer>
  );
}
