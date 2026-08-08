import Image from "next/image";
import { Linkedin, Instagram, Github } from "lucide-react";

const socials = [
  {
    Icon: Linkedin,
    href: "https://www.linkedin.com/in/teenie-rod-joshua-bb0bbb327/",
    label: "LinkedIn",
  },
  {
    Icon: Instagram,
    href: "https://www.instagram.com/noel_teens/",
    label: "Instagram",
  },
  { Icon: Github, href: "https://github.com/Noel-Teens", label: "GitHub" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-glaze/10 bg-[#071f28] py-12">
      <div className="shell flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex flex-col items-center gap-3 md:flex-row md:items-center md:text-left">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-frost ring-1 ring-neon/50 shadow-[0_0_14px_rgba(127,233,255,0.35)]">
            <Image
              src="/logo.png"
              alt="Teenie logo"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
          </span>
          <div className="text-center md:text-left">
            <h3 className="font-display text-lg font-bold text-frost">
              Teenie Rod Joshua B
            </h3>
            <p className="mt-1 text-sm text-ink">
              Full-stack developer. Thanks for playing — GG.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          {socials.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-neon/20 bg-frost/5 p-3 text-ink transition-all hover:border-neon/50 hover:text-neon"
              aria-label={label}
            >
              <Icon size={20} />
            </a>
          ))}
        </div>

        <div className="text-center text-sm text-ink md:text-right">
          <p className="font-semibold text-frost">
            &copy; {year} Teenie Rod Joshua B.
          </p>
          <p className="mt-1">Built with Next.js &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
