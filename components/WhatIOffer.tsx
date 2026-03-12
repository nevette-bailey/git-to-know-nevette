"use client";

import { useEffect, useRef } from "react";

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return ref;
}

const fractionalItems = [
  "Engineering org design and team building",
  "Technical strategy and architecture review",
  "Payments, monetization, and commerce systems",
  "CI/CD and delivery process maturity",
  "Startup infrastructure scaling",
];

const icItems = [
  "Backend systems in Python and TypeScript",
  "Payments and monetization platforms",
  "ML systems, data pipelines, and AI-safety-aware design",
  "Full-stack product engineering",
];

export default function WhatIOffer() {
  const header = useReveal();
  const card1 = useReveal(0.1);
  const card2 = useReveal(0.1);

  return (
    <section className="py-28 bg-canvas-alt">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section header */}
        <div ref={header} className="reveal flex items-center gap-6 mb-16">
          <span className="section-label">What I Offer</span>
          <div className="flex-1 h-px bg-canvas-rule" />
          <span className="section-number">02</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* ── Fractional ── */}
          <div
            ref={card1}
            className="reveal reveal-delay-1 bg-canvas-DEFAULT p-8 md:p-10 border border-canvas-rule group hover:border-pink transition-colors duration-300"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="section-label mb-2">Track 01</p>
                <h3 className="font-display text-2xl font-light text-ink-DEFAULT">
                  Fractional Technology<br />Leadership
                </h3>
              </div>
              <div className="w-8 h-8 rounded-full border border-canvas-rule flex items-center justify-center group-hover:border-pink group-hover:bg-pink transition-colors duration-300">
                <span className="font-body text-xs text-ink-faint group-hover:text-canvas-DEFAULT transition-colors duration-300">→</span>
              </div>
            </div>

            <p className="font-body text-sm text-ink-muted leading-relaxed mb-8">
              For early-stage and scaling companies that need executive engineering leadership without a full-time commitment. I&apos;ve built an engineering organization from zero — and I know what it costs to get those decisions wrong early.
            </p>

            <ul className="space-y-3">
              {fractionalItems.map((item) => (
                <li key={item} className="flex items-start gap-3 font-body text-sm text-ink-DEFAULT">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-pink flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Senior IC ── */}
          <div
            ref={card2}
            className="reveal reveal-delay-2 bg-ink-DEFAULT p-8 md:p-10 border border-ink-DEFAULT group hover:border-pink transition-colors duration-300"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="section-label text-pink-light mb-2">Track 02</p>
                <h3 className="font-display text-2xl font-light text-canvas-DEFAULT">
                  Senior<br />Engineering
                </h3>
              </div>
              <div className="w-8 h-8 rounded-full border border-ink-muted flex items-center justify-center group-hover:border-pink group-hover:bg-pink transition-colors duration-300">
                <span className="font-body text-xs text-canvas-rule group-hover:text-canvas-DEFAULT transition-colors duration-300">→</span>
              </div>
            </div>

            <p className="font-body text-sm text-canvas-rule leading-relaxed mb-8">
              For teams that need a senior IC who can own complex, high-stakes systems independently — and elevate the engineers around them.
            </p>

            <ul className="space-y-3">
              {icItems.map((item) => (
                <li key={item} className="flex items-start gap-3 font-body text-sm text-canvas-DEFAULT">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-pink flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
