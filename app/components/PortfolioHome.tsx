import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Contact from "./Contact";
import Footer from "./Footer";
import AmbientOcean from "./AmbientOcean";
import Snowfall from "./Snowfall";

// The full public portfolio page body. Rendered both at `/` (public) and at
// `/admin/preview` (so a logged-in admin can preview the live site without
// signing out, since the proxy blocks the real public routes while authed).
//
// The design is a single, permanent dark sci-fi "player console": the page is a
// game interface — profile, loadout, mission log. AmbientOcean paints a quiet
// glow atmosphere; a site-wide Snowfall field drifts behind all content (it
// replaced the removed bubble layer). Both sit behind solid HUD panels.
export default function PortfolioHome() {
  return (
    <div className="relative min-h-screen">
      <AmbientOcean />
      <Snowfall className="fixed inset-0 -z-[5]" />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
