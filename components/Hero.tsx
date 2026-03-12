"use client";

import dynamic from "next/dynamic";

const PortraitSketch = dynamic(() => import("./PortraitSketch"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-canvas-alt animate-pulse" />,
});

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col md:flex-row">
      {/* ── Left: Name & tagline ── */}
      <div className="relative z-10 flex flex-col justify-center px-8 md:px-16 py-28 md:py-0 w-1/2">
        {/* Top label */}
        <p className="section-label mb-8 animate-[fadeInUp_0.8s_ease_0.1s_both]">
          Engineering Leader &amp; Senior IC
        </p>

        {/* Name — large display type, broken for rhythm */}
        <h1 className="display-name text-[clamp(3.5rem,8vw,6.5rem)] text-ink-DEFAULT mb-6 animate-[fadeInUp_0.9s_ease_0.2s_both]">
          Nevette A.<br />
          <span className="text-pink">Bailey</span>
          <span className="text-ink-faint font-light">, Ph.D.</span>
        </h1>

        {/* Rule */}
        <div className="w-12 h-px bg-pink mb-6 animate-[fadeInUp_0.9s_ease_0.3s_both]" />

        {/* Tagline */}
        <p className="font-body text-ink-muted text-base leading-relaxed max-w-sm mb-10 animate-[fadeInUp_0.9s_ease_0.35s_both]">
          I build systems that scale — and the engineering organizations that sustain them.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 animate-[fadeInUp_0.9s_ease_0.45s_both]">
          <a href="mailto:contact@nevettebailey.com" className="btn-primary">
            Let&apos;s Talk <span>→</span>
          </a>
          <a href="#work" className="btn-secondary">
            View Work <span>↓</span>
          </a>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-6 mt-12 animate-[fadeInUp_0.9s_ease_0.55s_both]">
          {[
            { label: "LinkedIn", href: "https://www.linkedin.com/in/nevetteb" },
            { label: "GitHub", href: "https://github.com/nevette-bailey" },
            { label: "Scholar", href: "https://scholar.google.com/citations?user=V5HlmfcAAAAJ&hl=en" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs tracking-widest uppercase text-ink-faint hover:text-pink transition-colors duration-200 nav-link"
            >
              {label}
            </a>
          ))}
        </div>
        {/* Scroll hint */}
        <div className="absolute bottom-8 left-0 right-0 hidden md:flex flex-col items-center gap-2 animate-[fadeInUp_1s_ease_1s_both]">
          <span className="font-body text-xs tracking-widest uppercase text-ink-faint">Scroll</span>
          <div className="w-px h-8 bg-canvas-rule animate-[scrollPulse_2s_ease_infinite]" />
        </div>
      </div>

      {/* ── Right: p5.js sketch ── */}
      <div className="relative w-1/2 bg-canvas-alt overflow-hidden md:sticky md:top-16 md:min-h-[calc(100vh-4rem)] flex items-center">
        {/* Subtle vertical rule separating columns */}
        <div className="hidden md:block absolute left-0 top-16 bottom-16 w-px bg-canvas-rule" />
        <PortraitSketch />
        {/* Fade overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-canvas-alt to-transparent pointer-events-none" />
      </div>


      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(0.6); }
          50% { opacity: 1; transform: scaleY(1); }
        }
      `}</style>
    </section>
  );
}
