import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Contact from "./Contact";
import Footer from "./Footer";
import AmbientOcean from "./AmbientOcean";
import Bubbles from "./Bubbles";
import DepthMeter from "./DepthMeter";

// The full public portfolio page body. Rendered both at `/` (public) and at
// `/admin/preview` (so a logged-in admin can preview the live site without
// signing out, since the proxy blocks the real public routes while authed).
//
// The design is a single, permanent "deep-sea descent": you scroll from the
// sunlit surface down into darker water. AmbientOcean paints the atmosphere;
// DepthMeter turns the scrollbar into a dive gauge (the signature element).
export default function PortfolioHome() {
  return (
    <div className="relative min-h-screen">
      <AmbientOcean />
      {/* Site-wide drifting bubble field: a single fixed layer over the whole
          page (not per-section), sitting just above the ambient atmosphere and
          behind all content. */}
      <Bubbles className="fixed inset-0 -z-[5]" />
      <DepthMeter />
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
