import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WhatIOffer from "@/components/WhatIOffer";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Credentials from "@/components/Credentials";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <WhatIOffer />
        <Experience />
        <Projects />
        <Credentials />
        <Contact />
      </main>
      <footer className="py-8 border-t border-canvas-rule">
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
          <span className="font-display text-ink-faint text-sm italic">Nevette A. Bailey, Ph.D.</span>
          <span className="text-xs text-ink-faint font-body tracking-wide">© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </>
  );
}
