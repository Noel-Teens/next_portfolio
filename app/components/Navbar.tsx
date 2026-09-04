"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, Linkedin, Github, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import { site } from "@/lib/site";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "Profile", href: "#about" },
  { name: "Loadout", href: "#skills" },
  { name: "Missions", href: "#projects" },
];

const socials = [
  { Icon: Linkedin, href: site.socials.linkedin, label: "LinkedIn" },
  { Icon: Github, href: site.socials.github, label: "GitHub" },
  { Icon: Instagram, href: site.socials.instagram, label: "Instagram" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed z-50 w-full transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="shell">
        <div
          className={`flex items-center justify-between rounded-2xl px-6 py-3 transition-all duration-500 ${
            scrolled ? "glass" : "border border-transparent"
          }`}
        >
          <a
            href="#"
            className="group flex items-center gap-3 font-display text-lg font-bold text-frost"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-neon transition-transform group-hover:rotate-12">
              <Image
                src="/logo.png"
                alt="Teenie logo"
                width={28}
                height={28}
                priority
                className="h-7 w-7 object-contain grayscale brightness-0 invert"
              />
            </span>
            <span>
              Teenie<span className="text-ripple">.</span>
            </span>
          </a>

          {/* Desktop nav — links sit LEFT (just after the logo) so the centre
              stays clear of the character's head. */}
          <div className="ml-8 hidden items-center gap-1 md:flex lg:ml-12">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="rounded-lg px-4 py-2 text-base font-medium text-ink transition-colors hover:bg-neon/10 hover:text-frost"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop right — FOLLOW US + socials (pushed to far right) */}
          <div className="ml-auto hidden items-center gap-4 md:flex">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-ink/60">
              Follow
            </span>
            <div className="flex items-center gap-1.5">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="rounded-lg p-2 text-ink transition-colors hover:bg-neon/10 hover:text-neon"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Mobile toggle */}
          <button
            className="rounded-lg p-2 text-frost md:hidden"
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={
          isOpen
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: -16 }
        }
        className={`glass absolute left-6 right-6 top-full mt-3 flex flex-col gap-1 rounded-2xl p-4 md:hidden ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="rounded-xl px-4 py-3 font-medium text-frost transition-colors hover:bg-ripple/10"
            onClick={() => setIsOpen(false)}
          >
            {link.name}
          </a>
        ))}
        <div className="mt-2 flex items-center gap-2 border-t border-neon/15 px-4 pt-4">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-ink/60">
            Follow
          </span>
          {socials.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="rounded-lg p-2 text-ink transition-colors hover:text-neon"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </motion.div>
    </nav>
  );
}
