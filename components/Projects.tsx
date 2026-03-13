"use client";

import { useEffect, useRef } from "react";

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("visible");
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

export default function Projects() {
  const header = useReveal();
  const card = useReveal(0.1);

  return (
    <section id="projects" className="py-28 bg-canvas-alt">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section header */}
        <div ref={header} className="reveal flex items-center gap-6 mb-16">
          <span className="section-label">Projects</span>
          <div className="flex-1 h-px bg-canvas-rule" />
          <span className="section-number">04</span>
        </div>

        {/* Featured project */}
        <div
          ref={card}
          className="reveal bg-canvas-DEFAULT border border-canvas-rule overflow-hidden group hover:border-pink transition-colors duration-300"
        >
          <div className="grid md:grid-cols-[1fr_auto] gap-0">
            <div className="p-8 md:p-12">
              {/* Label */}
              <p className="section-label mb-4">Featured Project · Active</p>

              {/* Title */}
              <h3 className="font-display text-3xl md:text-4xl font-light text-ink-DEFAULT mb-2">
                First On Screen
              </h3>
              <p className="font-body text-sm text-ink-muted mb-6 italic">Representation Tracker</p>

              {/* Description */}
              <p className="font-body text-sm text-ink-DEFAULT leading-relaxed mb-6 max-w-xl">
                An ethical ML system for tracking media representation using
                self-identification-only data. Built on the principle that identity classification
                in ML should never be derived from appearance alone — it should come from how people
                describe themselves.
              </p>

              {/* Architecture highlights */}
              <div className="space-y-3 mb-8">
                {[
                  {
                    label: "Safety design",
                    detail: "AI suggests, humans verify — no automated production writes",
                  },
                  {
                    label: "Data pipeline",
                    detail:
                      "Multi-source ingestion from TMDB, Wikipedia, and web search with confidence scoring",
                  },
                  {
                    label: "Backend",
                    detail:
                      "Three-layer FastAPI architecture with full data provenance and audit trails",
                  },
                  {
                    label: "Infrastructure",
                    detail:
                      "PostgreSQL / Supabase schema supporting intersectional identities; Celery + Redis for batch jobs",
                  },
                  {
                    label: "Rigor",
                    detail:
                      "Statistical evaluation with bootstrap confidence intervals and bias detection",
                  },
                ].map(({ label, detail }) => (
                  <div key={label} className="flex items-start gap-4 font-body text-sm">
                    <span className="text-pink font-medium w-28 flex-shrink-0">{label}</span>
                    <span className="text-ink-muted">{detail}</span>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {[
                  "Python",
                  "FastAPI",
                  "PostgreSQL",
                  "Supabase",
                  "Celery",
                  "Redis",
                  "Claude API",
                  "TMDB API",
                ].map((tag) => (
                  <span key={tag} className="tech-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Decorative right panel */}
            <div className="hidden md:flex w-24 bg-pink-pale border-l border-canvas-rule items-center justify-center">
              <p
                className="font-display text-pink text-xs tracking-widest uppercase"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                First On Screen
              </p>
            </div>
          </div>
        </div>

        {/* Phase 2 placeholder note — remove before launch */}
        <p className="font-body text-xs text-ink-faint mt-6 text-center italic">
          Additional projects coming in Phase 2.
        </p>
      </div>
    </section>
  );
}
