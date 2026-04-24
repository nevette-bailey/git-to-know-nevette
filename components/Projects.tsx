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

type Highlight = {label: string; detail: string};

type ProjectCardProps = {
    status: string;
    title: string;
    subtitle: string;
    description: string;
    highlights: Highlight[];
    tags: string[];
};

function ProjectCard({status, title, subtitle, description, highlights, tags}: ProjectCardProps) {
    const ref = useReveal(0.1);
    return (
        <div
            ref={ref}
            className="reveal bg-canvas-DEFAULT border border-canvas-rule overflow-hidden group hover:border-pink transition-colors duration-300"
        >
            <div className="grid md:grid-cols-[1fr_auto] gap-0">
                <div className="p-8 md:p-12">
                    <p className="section-label mb-4">{status}</p>

                    <h3 className="font-display text-3xl md:text-4xl font-light text-ink-DEFAULT mb-2">
                        {title}
                    </h3>
                    <p className="font-body text-sm text-ink-muted mb-6 italic">{subtitle}</p>

                    <p className="font-body text-sm text-ink-DEFAULT leading-relaxed mb-6 max-w-xl">
                        {description}
                    </p>

                    <div className="space-y-3 mb-8">
                        {highlights.map(({label, detail}) => (
                            <div key={label} className="flex items-start gap-4 font-body text-sm">
                                <span className="text-pink font-medium w-28 flex-shrink-0">{label}</span>
                                <span className="text-ink-muted">{detail}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <span key={tag} className="tech-tag">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="hidden md:flex w-24 bg-pink-pale border-l border-canvas-rule items-center justify-center">
                    <p
                        className="font-display text-pink text-xs tracking-widest uppercase"
                        style={{writingMode: "vertical-rl", transform: "rotate(180deg)"}}
                    >
                        {title}
                    </p>
                </div>
            </div>
        </div>
    );
}

const projects: ProjectCardProps[] = [
    {
        status: "Featured Project · Active",
        title: "First On Screen",
        subtitle: "Representation Tracker",
        description:
            "An ethical ML system for tracking media representation using self-identification-only data. Built on the principle that identity classification in ML should never be derived from appearance alone — it should come from how people describe themselves.",
        highlights: [
            {
                label: "Safety design",
                detail: "AI suggests, humans verify — no automated production writes",
            },
            {
                label: "Data pipeline",
                detail: "Multi-source ingestion from TMDB, Wikipedia, and web search with confidence scoring",
            },
            {
                label: "Backend",
                detail: "Three-layer FastAPI architecture with full data provenance and audit trails",
            },
            {
                label: "Infrastructure",
                detail: "PostgreSQL / Supabase schema supporting intersectional identities; Celery + Redis for batch jobs",
            },
            {
                label: "Rigor",
                detail: "Statistical evaluation with bootstrap confidence intervals and bias detection",
            },
        ],
        tags: [
            "Python",
            "FastAPI",
            "PostgreSQL",
            "Supabase",
            "Celery",
            "Redis",
            "Claude API",
            "TMDB API",
            "TypeScript",
            "React",
            "Next.js",
        ],
    },
    {
        status: "Personal Project · Active",
        title: "Glitter Brain",
        subtitle: "ADHD Productivity Automation",
        description:
            "A personal automation system built around how an ADHD brain actually works. Handwritten notes captured via iOS OCR flow into Notion as structured tasks, sync to a Supabase backend, and are scheduled into Google Calendar blocks by Claude — fitting real work around real life rather than forcing the reverse.",
        highlights: [
            {
                label: "Intake",
                detail: "iOS Shortcut captures handwritten or typed notes; OCR output is parsed and normalized by Claude before task creation",
            },
            {
                label: "Task layer",
                detail: "Notion as the human-facing task UI, with a Supabase backend as the source of truth for scheduling logic",
            },
            {
                label: "AI scheduling",
                detail: "Claude reads calendar availability and task metadata to propose time blocks — no manual calendar tetris",
            },
            {
                label: "Reliability",
                detail: "APScheduler runs nightly sync and Notion polling on Fly.io; auto-deploys from GitHub Actions",
            },
        ],
        tags: [
            "Python",
            "FastAPI",
            "Supabase",
            "PostgreSQL",
            "Claude API",
            "Google Calendar API",
            "Notion API",
            "APScheduler",
            "Fly.io",
        ],
    },
    {
        status: "Product · In Development",
        title: "Tether",
        subtitle: "Dog-Centered Dating App",
        description:
            "A mobile dating app built for people who center their lives around their dogs. Tether puts your dog at the center of how you connect with people — because a first date should be able to include them. iOS-first, with a Flutter mobile client and a FastAPI backend.",
        highlights: [
            {
                label: "Matching",
                detail: "Compatibility scoring with PostGIS-powered proximity",
            },
            {
                label: "Trust & safety",
                detail: "SMS verification via Twilio; photo liveness and moderation via AWS Rekognition",
            },
            {
                label: "Architecture",
                detail: "Feature-first Flutter frontend; FastAPI service layer with strict repository pattern — no ORM calls outside repositories",
            },
            {
                label: "Realtime",
                detail: "In-app messaging via Supabase Realtime; row-level security enforced at the database layer",
            },
        ],
        tags: [
            "Flutter",
            "Dart",
            "Python",
            "FastAPI",
            "Supabase",
            "PostgreSQL",
            "PostGIS",
            "AWS Rekognition",
            "Twilio",
            "Fly.io",
        ],
    },
];

export default function Projects() {
    const header = useReveal();

    return (
        <section id="projects" className="py-28 bg-canvas-alt">
            <div className="max-w-5xl mx-auto px-6">
                <div ref={header} className="reveal flex items-center gap-6 mb-16">
                    <span className="section-label">Projects</span>
                    <div className="flex-1 h-px bg-canvas-rule"/>
                    <span className="section-number">04</span>
                </div>

                <div className="space-y-8">
                    {projects.map((project) => (
                        <ProjectCard key={project.title} {...project} />
                    ))}
                </div>
            </div>
        </section>
    );
}
