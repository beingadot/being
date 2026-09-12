import { useEffect } from "react";
import Lenis from "lenis";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import About from "./components/About";
import Showcase from "./components/Showcase";
import CreativeCanvas from "./components/CreativeCanvas";
import Reels from "./components/Reels";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

export default function App() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true, lerp: 0.09 });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.4 });
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="grain relative min-h-screen w-full overflow-x-clip bg-void text-bone">
      <Preloader />
      <Cursor />
      <Nav />

      <main>
        <Hero />

        <Ticker
          items={["BRAND IDENTITY", "CONTENT DESIGN", "REELS & MOTION", "SOCIAL STRATEGY", "ART DIRECTION"]}
          speed="38s"
        />

        <About />

        <Ticker
          variant="outline"
          reverse
          speed="46s"
          items={["I DESIGN", "I CREATE", "I ELEVATE", "BEINGADOT", "ARISHA"]}
        />

        <Showcase />
        <CreativeCanvas />
        <Reels />

        <Ticker
          variant="bone"
          speed="30s"
          items={["AVAILABLE FOR FREELANCE", "VADODARA · GUJARAT", "BEINGADOT@GMAIL.COM", "LET'S TALK"]}
        />

        <Testimonials />
      </main>

      <Footer />
    </div>
  );
}
