"use client";

import { useEffect, useRef } from "react";

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

export default function Contact() {
  const header = useReveal();
  const content = useReveal(0.1);

  return (
    <section id="contact" className="py-28 bg-ink-DEFAULT">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section header */}
        <div ref={header} className="reveal flex items-center gap-6 mb-16">
          <span className="section-label text-pink-light">Contact</span>
          <div className="flex-1 h-px bg-ink-muted" />
          <span className="font-display text-6xl font-light text-ink-muted select-none">06</span>
        </div>

        <div
          ref={content}
          className="reveal grid md:grid-cols-2 gap-12 md:gap-16 items-start"
        >
          {/* Left: statement */}
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-canvas-DEFAULT leading-tight mb-6">
              Available for fractional engagements and senior IC roles.
            </h2>
            <p className="font-body text-sm text-ink-faint leading-relaxed">
              Based in Brooklyn, NY. Open to remote and hybrid work.
            </p>
          </div>

          {/* Right: links */}
          <div className="space-y-6">
            <a
              href="mailto:contact@nevettebailey.com"
              className="group flex items-center justify-between border border-ink-muted hover:border-pink px-6 py-5 transition-colors duration-300"
            >
              <div>
                <p className="font-body text-xs tracking-widest uppercase text-ink-faint mb-1">Email</p>
                <p className="font-body text-sm text-canvas-DEFAULT">contact@nevettebailey.com</p>
              </div>
              <span className="text-ink-faint group-hover:text-pink transition-colors duration-300 text-lg">→</span>
            </a>

            <a
              href="https://www.linkedin.com/in/nevetteb"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between border border-ink-muted hover:border-pink px-6 py-5 transition-colors duration-300"
            >
              <div>
                <p className="font-body text-xs tracking-widest uppercase text-ink-faint mb-1">LinkedIn</p>
                <p className="font-body text-sm text-canvas-DEFAULT">linkedin.com/in/nevetteb</p>
              </div>
              <span className="text-ink-faint group-hover:text-pink transition-colors duration-300 text-lg">↗</span>
            </a>

            <a
              href="https://github.com/nevette-bailey"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between border border-ink-muted hover:border-pink px-6 py-5 transition-colors duration-300"
            >
              <div>
                <p className="font-body text-xs tracking-widest uppercase text-ink-faint mb-1">GitHub</p>
                <p className="font-body text-sm text-canvas-DEFAULT">github.com/nevette-bailey</p>
              </div>
              <span className="text-ink-faint group-hover:text-pink transition-colors duration-300 text-lg">↗</span>
            </a>

            <a
              href="https://scholar.google.com/citations?user=V5HlmfcAAAAJ&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between border border-ink-muted hover:border-pink px-6 py-5 transition-colors duration-300"
            >
              <div>
                <p className="font-body text-xs tracking-widest uppercase text-ink-faint mb-1">Google Scholar</p>
                <p className="font-body text-sm text-canvas-DEFAULT">Publications &amp; Research</p>
              </div>
              <span className="text-ink-faint group-hover:text-pink transition-colors duration-300 text-lg">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
