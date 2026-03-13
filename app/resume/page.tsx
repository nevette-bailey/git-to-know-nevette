import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Resume — Nevette Bailey",
    description:
        "Resume of Nevette Bailey, Ph.D. — Senior Software Engineer & Technical Leader.",
};

const experience = [
    {
        title: "Independent Research Engineer — Ethical ML Systems",
        company: "First On Screen: Representation Tracker",
        location: "New York, NY",
        dates: "July 2025 – Present",
        bullets: [
            "Designed and built an end-to-end ethical ML system for tracking media representation using self-identification–only data, explicitly avoiding appearance-based classification.",
            "Implemented a multi-source AI-assisted data pipeline integrating TMDB, Wikipedia, web search, and the Claude API to extract explicit self-identification statements with source attribution and confidence scoring.",
            "Architected a three-layer FastAPI backend (routers, business logic, services) with human-in-the-loop verification workflows and full data provenance.",
            "Built Python services and orchestration logic for create-or-merge workflows, preventing duplicate submissions while maintaining full audit trails across pipeline runs.",
            "Designed a PostgreSQL / Supabase schema using UUIDs, JSONB, and array fields to support intersectional identities, verification states, and research-grade traceability.",
            "Implemented background job processing (Celery + Redis) for batch ingestion and long-running workflows with progress tracking and retry safety.",
            "Built admin review tooling and APIs enforcing AI safety principles: AI suggests, humans verify; no automated writes to production data.",
            "Prototyped statistical evaluation methods (bootstrap confidence intervals, bias detection, effect sizes) to quantify uncertainty and fairness in ML-assisted analysis.",
        ],
    },
    {
        title: "Vice President of Engineering + Technology (Founding Engineer)",
        company: "Gotham",
        location: "New York, NY",
        dates: "March 2024 – July 2025",
        bullets: [
            "Designed and scaled e-commerce infrastructure to support multi-location expansion, maintaining 99.9% uptime during peak traffic periods.",
            "Identified a critical single point of failure tied to a single third-party provider and built a backup POS system supporting multiple payment types through independent processors, with day-of inventory snapshot tracking, preserving full sales capability during high-volume outages.",
            "Built and owned SEO technical implementation that drove 536% year-over-year organic traffic growth and measurably improved top-of-funnel revenue.",
            "Architected and delivered POS/online inventory sync system enabling real-time stock accuracy across physical and digital channels.",
            "Established CI/CD pipelines and deployment processes across a team of 5 engineers that reduced delivery timelines by 50% and defect rate by 40%.",
            "Built a centralized data warehouse supporting executive analytics and accelerating production iteration cycles.",
        ],
    },
    {
        title: "Senior Software Engineer",
        company: "Etsy",
        location: "Brooklyn, NY",
        dates: "March 2020 – January 2024",
        bullets: [
            "Designed and launched a new Etsy Ads credit system that eliminated seasonal support tickets and improved seller trust.",
            "Built campaign management features that increased ad adoption by 32% and drove platform revenue growth.",
            "Partnered with data science to evolve seller-side A/B experimentation, improving targeting precision and measurement accuracy.",
            "Launched a risk mitigation project within the payments platform that captured $700k in revenue.",
            "Mentored 11+ engineers, led multiple launches with zero post-release incidents, and modeled inclusive engineering practices.",
            "Co-chaired Etsy's Black ERG (BridgE), growing internal mentorship programs and leading equity-centered technical initiatives.",
            "Acted as a de facto technical lead on seller-experience improvements, shaping architecture, prioritization, and code quality across teams.",
            "Promoted twice in three years from Software Engineer to Senior Software Engineer; recognized as top peer-nominated recipient of the 2021 Etsy \"We Lead With Optimism\" company-wide award.",
        ],
    },
    {
        title: "Doctoral Researcher",
        company: "Columbia University",
        location: "New York, NY",
        dates: "July 2011 – May 2019",
        bullets: [
            "Led multi-year research into translational fidelity mechanisms, designing experiments and custom analysis tools to study protein synthesis errors with medical and scientific applications.",
            "Selected for NDSEG Predoctoral Fellowship (2013, Department of Defense-funded) and Ford Foundation Dissertation Fellowship (2016), and supported by NIH and NSF grant programs; presented findings at international conferences.",
            "Co-authored multiple peer-reviewed publications; mentored junior researchers and managed lab operations in a federally regulated environment.",
        ],
    },
];

const skills = [
    {
        label: "Languages & Frameworks",
        value:
            "Python, TypeScript, JavaScript, FastAPI, Node.js, React, Redux Toolkit, Vue/Nuxt, GraphQL, SQL, HTML/CSS, PHP, Dart, Flutter, Electron",
    },
    {
        label: "Backend & Data Systems",
        value:
            "PostgreSQL, Supabase, JSONB, REST APIs, Background Jobs (Celery, Redis), Data Modeling, Schema Design, Data Pipelines",
    },
    {
        label: "Infrastructure & DevOps",
        value:
            "GCP, AWS, Cloud-hosted Application Deployments, Environment-Aware Logging, Scalable Architecture",
    },
    {
        label: "Testing & Tooling",
        value:
            "Pytest, Jest, PHPUnit, Jasmine, Enzyme, Cypress, React Testing Library, Git, CI/CD",
    },
    {
        label: "AI & Applied ML Systems",
        value:
            "Human-in-the-Loop ML Systems, LLM-Assisted Pipelines (Claude), AI Safety–Aware Design, Confidence Scoring, Source Attribution, Agentic Development (Cursor, Claude, ChatGPT)",
    },
    {
        label: "Leadership & Product",
        value:
            "Growth Engineering, Monetization Systems, Experimentation Platforms, Technical Strategy, Agile Development, Mentorship",
    },
];

const education = [
    {
        school: "Columbia University",
        location: "New York, NY",
        degrees:
            "Ph.D. May 2019, M.Phil October 2015, M.A. February 2013 (Chemistry)",
    },
    {
        school: "Northwestern University",
        location: "Evanston, IL",
        degrees: "M.S. June 2011, B.A. June 2011 (Chemistry, French minor)",
    },
    {
        school: "Grace Hopper Program at Fullstack Academy",
        location: "New York, NY",
        degrees: "Software Engineering Immersive, October 2019",
    },
];

export default function ResumePage() {
    return (
        <>
            {/* Print styles */}
            <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white; }
          .resume-sheet {
            max-width: 100% !important;
            padding: 0 !important;
            box-shadow: none !important;
          }
        }
      `}</style>

            {/* Download bar — hidden on print */}
            <div
                className="no-print sticky top-16 z-40 bg-canvas-DEFAULT/95 backdrop-blur-sm border-b border-canvas-rule">
                <div className="max-w-4xl mx-auto px-6 h-12 flex items-center justify-between">
          <span className="font-body text-xs tracking-widest uppercase text-ink-faint">
            Nevette Bailey — Resume
          </span>
                    <a
                        href="/Nevette_Bailey_Resume_2026.pdf"
                        download
                        className="btn-primary py-2 px-4 text-xs"
                    >
                        Download PDF <span>↓</span>
                    </a>
                </div>
            </div>


            <main className="bg-canvas-DEFAULT min-h-screen py-16 px-6 print:py-0 print:px-0">
                <article className="resume-sheet max-w-4xl mx-auto bg-white px-12 py-12 shadow-sm">

                    {/* ── Header ── */}
                    <header className="mb-6">
                        <h1 className="font-display text-5xl font-bold text-ink-DEFAULT tracking-tight mb-3">
                            Nevette Bailey, Ph.D.
                        </h1>
                        <p className="font-body text-sm text-ink-muted">
                            Brooklyn, New York{" "}
                            <span className="text-canvas-rule mx-2">|</span>
                            <a href="tel:3127520511" className="hover:text-pink transition-colors duration-200">
                                312-752-0511
                            </a>
                            <span className="text-canvas-rule mx-2">|</span>
                            <a
                                href="mailto:nevettebailey@gmail.com"
                                className="hover:text-pink transition-colors duration-200"
                            >
                                nevettebailey@gmail.com
                            </a>
                            <span className="text-canvas-rule mx-2">|</span>
                            <a
                                href="https://www.linkedin.com/in/nevetteb"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-pink transition-colors duration-200"
                            >
                                LinkedIn
                            </a>
                            <span className="text-canvas-rule mx-2">|</span>
                            <a
                                href="https://scholar.google.com/citations?user=V5HlmfcAAAAJ&hl=en"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-pink transition-colors duration-200"
                            >
                                Google Scholar
                            </a>
                            <span className="text-canvas-rule mx-2">|</span>
                            <a
                                href="https://github.com/nevette-bailey"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-pink transition-colors duration-200"
                            >
                                GitHub
                            </a>
                        </p>
                        <p className="font-body text-sm text-ink-DEFAULT leading-relaxed mt-3">
                            Senior software engineer with 6 years of production engineering experience in
                            monetization and payments systems at Etsy and as founding engineering leader at a
                            high-growth retail startup. Cross-domain background in academic research and
                            professional ballet brings the same precision and systems thinking to engineering.
                        </p>
                    </header>

                    {/* Pink rule */}
                    <div className="w-full h-px bg-pink mb-6"/>

                    {/* ── Experience ── */}
                    <section className="mb-8">
                        <h2 className="section-label mb-5">Experience</h2>
                        <div className="space-y-7">
                            {experience.map(({title, company, location, dates, bullets}) => (
                                <div key={title}>
                                    <h3 className="font-body text-base font-semibold text-ink-DEFAULT">
                                        {title}
                                    </h3>
                                    <p className="font-body text-sm italic text-ink-muted mt-0.5">
                                        {company} | {location}
                                    </p>
                                    <p className="font-body text-xs tracking-widest uppercase text-ink-faint mt-0.5 mb-2">
                                        {dates}
                                    </p>
                                    <ul className="space-y-1.5">
                                        {bullets.map((bullet, i) => (
                                            <li key={i} className="flex gap-2">
                                                <span className="text-ink-faint mt-0.5 shrink-0 text-xs">·</span>
                                                <span className="font-body text-sm text-ink-DEFAULT leading-relaxed">
                          {bullet}
                        </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Pink rule */}
                    <div className="w-full h-px bg-canvas-rule mb-6"/>

                    {/* ── Skills ── */}
                    <section className="mb-8">
                        <h2 className="section-label mb-5">Skills</h2>
                        <div className="space-y-2">
                            {skills.map(({label, value}) => (
                                <div key={label} className="flex gap-2 font-body text-sm">
                                    <span className="font-semibold text-ink-DEFAULT shrink-0">{label}:</span>
                                    <span className="text-ink-muted">{value}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Pink rule */}
                    <div className="w-full h-px bg-canvas-rule mb-6"/>

                    {/* ── Education ── */}
                    <section>
                        <h2 className="section-label mb-5">Education</h2>
                        <div className="space-y-3">
                            {education.map(({school, location, degrees}) => (
                                <div key={school}>
                                    <div className="flex items-baseline justify-between">
                                        <h3 className="font-body text-sm font-semibold text-ink-DEFAULT">
                                            {school}
                                        </h3>
                                        <span className="font-body text-xs text-ink-faint">{location}</span>
                                    </div>
                                    <p className="font-body text-sm text-ink-muted mt-0.5">{degrees}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                </article>
            </main>
        </>
    );
}