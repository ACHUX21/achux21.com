import { useEffect, useState } from "react";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Trophies } from "@/components/Trophies";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Terminal } from "@/components/Terminal";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { SysClock } from "@/components/SysClock";

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 120;
      let curr = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) curr = id;
      }
      setActive(curr);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids]);
  return active;
}

function ScrollProgressBar() {
  useEffect(() => {
    const bar = document.getElementById("scrollProgress");
    if (!bar) return;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = "scaleX(" + (max > 0 ? window.scrollY / max : 0) + ")";
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return null;
}

const sections = [
  "home",
  "trophies",
  "about",
  "experience",
  "projects",
  "skills",
  "terminal",
  "contact",
];

export default function App() {
  const active = useActiveSection(sections);

  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>

      {/* Background layers */}
      <div className="bg-layer bg-grid" aria-hidden="true"></div>
      <div className="bg-layer bg-vignette" aria-hidden="true"></div>
      <div className="bg-layer bg-scanlines" aria-hidden="true"></div>
      <div className="bg-layer bg-noise" aria-hidden="true"></div>
      <div className="bg-layer bg-glow" aria-hidden="true"></div>

      {/* Scroll progress */}
      <div className="scroll-progress" id="scrollProgress" aria-hidden="true"></div>
      <ScrollProgressBar />

      <Nav active={active} />

      <main id="main">
        <Hero />
        <Trophies />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Terminal />
        <Contact />
      </main>

      <Footer />
      <SysClock />
    </>
  );
}
