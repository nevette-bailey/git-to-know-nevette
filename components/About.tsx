"use client";

import { useEffect, useRef } from "react";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

export default function About() {
  const r1 = useReveal();
  const r2 = useReveal();
  const r3 = useReveal();

  return (
    <section id="about" className="py-28 bg-canvas-DEFAULT">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section header */}
        <div ref={r1} className="reveal flex items-center gap-6 mb-16">
          <span className="section-label">About</span>
          <div className="flex-1 h-px bg-canvas-rule" />
          <span className="section-number">01</span>
        </div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-16">
          {/* Left: pull stats */}
          <div ref={r2} className="reveal reveal-delay-1 space-y-8">
            {[
              { value: "6+", label: "Years production\nengineering" },
              { value: "Ph.D.", label: "Columbia University\nChemistry" },
              { value: "$700k", label: "Revenue captured\nat Etsy" },
              { value: "536%", label: "YoY organic traffic\ngrowth at Gotham" },
            ].map(({ value, label }) => (
              <div key={value} className="border-l-2 border-pink pl-4">
                <p className="font-display text-3xl font-light text-ink-DEFAULT">{value}</p>
                <p className="font-body text-xs text-ink-muted mt-1 leading-snug whitespace-pre-line">
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* Right: copy */}
          <div
            ref={r3}
            className="reveal reveal-delay-2 space-y-5 font-body text-ink-DEFAULT leading-relaxed text-[0.95rem]"
          >
            <p>
              My path to engineering ran through a chemistry PhD at Columbia and a career as a
              professional ballet dancer. That&apos;s not a quirky footnote — it&apos;s the
              explanation for how I work.
            </p>
            <p>
              Both fields demand the same things: precision under pressure, the ability to hold a
              complex system in your head while executing at the detail level, and an intolerance
              for approximation when accuracy is what the problem requires.
            </p>
            <p>
              At Etsy I spent four years in monetization and payments — shipping an ads credit
              system that eliminated an entire category of support tickets, building campaign
              features that increased ad adoption by 32%, and leading a risk mitigation project that
              captured $700k in revenue. I was promoted twice in three years and mentored over a
              dozen engineers along the way.
            </p>
            <p>
              At Gotham I was the first technical lead as VP of Engineering. I built the team, the
              infrastructure, and the processes from nothing — including a backup POS system after I
              identified a critical single point of failure that could have taken down sales during
              a high-volume event. I also designed and built the PoC for a data management system
              using GCP Cloud Functions and BigQuery to consolidate sales and inventory data from
              third-party integrations, which the team carried into production. CI/CD pipelines I
              established reduced delivery timelines by 50% and defect rates by 40%.
            </p>
            <p>
              I&apos;m currently building First On Screen, an independent research project and
              application for tracking media representation using self-identification-only data.
              It&apos;s built on a stack of third-party APIs — including Anthropic&apos;s — with
              human-in-the-loop verification and explicit constraints against automated production
              writes, because I think the question of who gets to define identity in AI systems
              deserves rigorous engineering, not shortcuts.
            </p>
            <p className="text-ink-muted italic font-display text-lg leading-snug">
              I bring senior IC execution depth and executive leadership experience. I can set
              technical direction, build the team to execute it, and write the code myself.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
