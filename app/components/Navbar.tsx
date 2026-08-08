"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "Profile", href: "#about" },
  { name: "Loadout", href: "#skills" },
  { name: "Missions", href: "#projects" },
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
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-frost ring-1 ring-neon/50 shadow-[0_0_14px_rgba(127,233,255,0.35)] transition-transform group-hover:rotate-12">
              <Image
                src="/logo.png"
                alt="Teenie logo"
                width={28}
                height={28}
                priority
                className="h-7 w-7 object-contain"
              />
            </span>
            <span>
              Teenie<span className="text-ripple">.</span>
            </span>
          </a>

          {/* Desktop */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="rounded-lg px-4 py-2 text-base font-medium text-ink transition-colors hover:bg-neon/10 hover:text-frost"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="ml-3 rounded-lg bg-neon px-5 py-2 text-base font-semibold text-abyss transition-all hover:bg-frost hover:shadow-[0_0_24px_rgba(127,233,255,0.6)]"
            >
              Press start
            </a>
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
      </motion.div>
    </nav>
  );
}
