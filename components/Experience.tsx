"use client";

import {useEffect, useRef} from "react";

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
            {threshold}
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);
    return ref;
}

const roles = [
    {
        company: "Capital One",
        title: "Lead Software Engineer",
        period: "2026 – Present",
        tags: [],
        highlights: [
            "Newly joined — responsibilities and highlights to come",
        ],
    },
    {
        company: "First On Screen",
        title: "Independent Research Engineer",
        period: "2025 – 2026",
        tags: [
            "Python", "FastAPI", "PostgreSQL", "Celery", "Redis", "Supabase", "LLM Pipelines", "Claude API", "React",
            "Next.js", "TypeScript"
        ],
        highlights: [
            "Designed an end-to-end ethical ML system for media representation tracking using self-identification-only data",
            "Built AI-assisted data pipeline integrating TMDB, Wikipedia, and web search with confidence scoring and source attribution",
            "Architected human-in-the-loop verification workflows — AI suggests, humans verify; no automated writes to production",
            "Implemented Celery + Redis background job processing for batch ingestion with retry safety",
        ],
    },
    {
        company: "Gotham",
        title: "VP of Engineering + Technology (Founding Engineer)",
        period: "2024 – 2025",
        tags: ["TypeScript", "Nuxt", "Vue.js", "PostgreSQL", "GCP", "CI/CD", "Team Building"],
        highlights: [
            "Built the engineering organization from zero — hiring, architecture, process, and tooling",
            "Identified and eliminated a critical single point of failure by building an independent backup POS system, preserving full sales capability during high-volume outages",
            "SEO technical implementation drove 536% year-over-year organic traffic growth",
            "CI/CD pipelines reduced delivery timelines by 50% and defect rates by 40% across a team of 5 engineers",
        ],
    },
    {
        company: "Etsy",
        title: "Senior Software Engineer",
        period: "2020 – 2024",
        tags: [
            "PHP", "React", "TypeScript", "Redux", "Ads", "Payments", "Monetization", "A/B Experimentation",
            "Project Leadership", "Mentorship"
        ],
        highlights: [
            "Built campaign management features that increased ad adoption by 32% and drove platform revenue growth",
            "Led a risk mitigation project within the payments platform that captured $700k in revenue",
            "Launched an Etsy Ads credit system that eliminated seasonal support tickets and improved seller trust",
            "Promoted twice in three years; mentored 11+ engineers; co-chaired Black ERG (BridgE)",
        ],
    },
    {
        company: "Columbia University",
        title: "Doctoral Researcher",
        period: "2011 – 2019",
        tags: ["Research", "Experimental Design", "Problem Solving", "Data Analysis", "Lab Management", "Mentorship"],
        highlights: [
            "NDSEG Predoctoral Fellowship (U.S. Department of Defense, 2013) and Ford Foundation Dissertation Fellowship (2016)",
            "NIH and NSF grant support; presented findings at international conferences",
            "Co-authored multiple peer-reviewed publications on translational fidelity mechanisms",
        ],
    },
];

export default function Experience() {
    const header = useReveal();

    return (
        <section id="work" className="py-28 bg-canvas-DEFAULT">
            <div className="max-w-5xl mx-auto px-6">
                {/* Section header */}
                <div ref={header} className="reveal flex items-center gap-6 mb-16">
                    <span className="section-label">Experience</span>
                    <div className="flex-1 h-px bg-canvas-rule"/>
                    <span className="section-number">03</span>
                </div>

                {/* Timeline */}
                <div className="space-y-0">
                    {roles.map((role, i) => (
                        <RoleRow key={role.company} role={role} index={i}/>
                    ))}
                </div>
            </div>
        </section>
    );
}

function RoleRow({role, index}: { role: (typeof roles)[0]; index: number }) {
    const ref = useReveal(0.1);

    return (
        <div
            ref={ref}
            className={`reveal reveal-delay-${index + 1} border-t border-canvas-rule py-10 group`}
        >
            <div className="grid md:grid-cols-[180px_1fr] gap-6 md:gap-10">
                {/* Left: company + period */}
                <div>
                    <p className="font-display text-xl font-medium text-ink-DEFAULT group-hover:text-pink transition-colors duration-300">
                        {role.company}
                    </p>
                    <p className="font-body text-xs text-ink-faint mt-1">{role.period}</p>
                </div>

                {/* Right: title, tags, highlights */}
                <div>
                    <p className="font-body text-sm font-medium text-ink-muted mb-4">{role.title}</p>

                    <ul className="space-y-2 mb-6">
                        {role.highlights.map((h) => (
                            <li
                                key={h}
                                className="font-body text-sm text-ink-DEFAULT leading-relaxed flex items-start gap-3"
                            >
                                <span className="mt-2 w-1 h-1 rounded-full bg-canvas-rule flex-shrink-0"/>
                                {h}
                            </li>
                        ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                        {role.tags.map((tag) => (
                            <span key={tag} className="tech-tag">
                {tag}
              </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
