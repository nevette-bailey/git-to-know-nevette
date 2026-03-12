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

const education = [
  { degree: "Ph.D., Chemistry", institution: "Columbia University", year: "2019" },
  { degree: "M.Phil. · M.A., Chemistry", institution: "Columbia University", year: "2015 · 2013" },
  { degree: "M.S. · B.A., Chemistry", institution: "Northwestern University", year: "2011" },
  { degree: "Software Engineering Immersive", institution: "Grace Hopper Program, Fullstack Academy", year: "2019" },
];

const fellowships = [
  {
    name: "NDSEG Predoctoral Fellowship",
    org: "U.S. Department of Defense",
    year: "2013",
  },
  {
    name: "Ford Foundation Dissertation Fellowship",
    org: "Ford Foundation",
    year: "2016",
  },
  {
    name: "NIH & NSF Grant Support",
    org: "Columbia University Lab",
    year: "2011–2019",
  },
];

export default function Credentials() {
  const header = useReveal();
  const edu = useReveal(0.1);
  const awards = useReveal(0.1);
  const scholar = useReveal(0.1);

  return (
    <section className="py-28 bg-canvas-DEFAULT">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section header */}
        <div ref={header} className="reveal flex items-center gap-6 mb-16">
          <span className="section-label">Credentials</span>
          <div className="flex-1 h-px bg-canvas-rule" />
          <span className="section-number">05</span>
        </div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {/* Education */}
          <div ref={edu} className="reveal reveal-delay-1">
            <p className="font-body text-xs tracking-widest uppercase text-ink-faint mb-6">Education</p>
            <div className="space-y-6">
              {education.map(({ degree, institution, year }) => (
                <div key={degree} className="border-l-2 border-canvas-rule hover:border-pink transition-colors duration-300 pl-4">
                  <p className="font-body text-sm font-medium text-ink-DEFAULT">{degree}</p>
                  <p className="font-body text-xs text-ink-muted mt-0.5">{institution}</p>
                  <p className="font-body text-xs text-ink-faint mt-0.5">{year}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Fellowships */}
          <div ref={awards} className="reveal reveal-delay-2">
            <p className="font-body text-xs tracking-widest uppercase text-ink-faint mb-6">Fellowships &amp; Grants</p>
            <div className="space-y-6">
              {fellowships.map(({ name, org, year }) => (
                <div key={name} className="border-l-2 border-canvas-rule hover:border-pink transition-colors duration-300 pl-4">
                  <p className="font-body text-sm font-medium text-ink-DEFAULT">{name}</p>
                  <p className="font-body text-xs text-ink-muted mt-0.5">{org}</p>
                  <p className="font-body text-xs text-ink-faint mt-0.5">{year}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Publications / Scholar */}
          <div ref={scholar} className="reveal reveal-delay-3">
            <p className="font-body text-xs tracking-widest uppercase text-ink-faint mb-6">Research</p>
            <div className="border-l-2 border-canvas-rule hover:border-pink transition-colors duration-300 pl-4 mb-8">
              <p className="font-body text-sm font-medium text-ink-DEFAULT">Peer-reviewed publications</p>
              <p className="font-body text-xs text-ink-muted mt-0.5">
                Translational fidelity mechanisms and protein synthesis. NIH and NSF funded.
              </p>
            </div>
            <a
              href="https://scholar.google.com/citations?user=V5HlmfcAAAAJ&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-xs tracking-widest uppercase text-pink hover:text-pink-light transition-colors duration-200 nav-link"
            >
              Google Scholar <span>↗</span>
            </a>

            <div className="mt-10 pt-8 border-t border-canvas-rule">
              <p className="font-body text-xs tracking-widest uppercase text-ink-faint mb-4">Recognition</p>
              <div className="border-l-2 border-canvas-rule hover:border-pink transition-colors duration-300 pl-4">
                <p className="font-body text-sm font-medium text-ink-DEFAULT">
                  &ldquo;We Lead With Optimism&rdquo; Award
                </p>
                <p className="font-body text-xs text-ink-muted mt-0.5">Etsy company-wide, peer-nominated</p>
                <p className="font-body text-xs text-ink-faint mt-0.5">2021</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
