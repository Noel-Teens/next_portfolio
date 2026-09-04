import Navbar from "./Navbar";
import Hero from "./Hero";
import NowPlaying from "./NowPlaying";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Contact from "./Contact";
import Footer from "./Footer";
import type { Profile } from "@/lib/supabase/types";

// The full public portfolio page body. Rendered both at `/` (public) and at
// `/admin/preview` (so a logged-in admin can preview the live site without
// signing out, since the proxy blocks the real public routes while authed).
//
// The design is an editorial CREAM / near-black identity (Mafia key-art
// reference): clean warm-paper background — no ambient particle/glow layers —
// with a giant-name hero, then profile, loadout, and mission-log sections.
//
// `profile` is the single-row player-HUD data threaded to the hero, the
// "now playing" bar, and the contact HUD.
export default function PortfolioHome({ profile }: { profile: Profile }) {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main>
        <Hero profile={profile} />
        <NowPlaying profile={profile} />
        <About />
        <Skills />
        <Projects />
        <Contact profile={profile} />
      </main>
      <Footer />
    </div>
  );
}
