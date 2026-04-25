# nevettebailey.com

Personal portfolio site for Nevette A. Bailey, Ph.D. — Software Engineer & Technical Leader.

Built with Next.js 16, Tailwind CSS, and TypeScript. Deployed on Vercel.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

| Command                  | Description                            |
| ------------------------ | -------------------------------------- |
| `npm run dev`            | Start local development server         |
| `npm run build`          | Production build                       |
| `npm run start`          | Run production build locally           |
| `npm run lint`           | Run ESLint                             |
| `npm run test`           | Run unit tests in watch mode           |
| `npm run test:run`       | Run unit tests once                    |
| `npm run test:e2e`       | Run E2E tests (starts prod server)     |
| `npm run test:e2e:ui`    | Open Playwright UI for E2E debugging   |

## Testing

Unit tests use [Vitest](https://vitest.dev) and [React Testing Library](https://testing-library.com). E2E tests use [Playwright](https://playwright.dev) and run against both desktop and mobile viewports.

```
tests/
├── setup.ts           # Global test setup (jsdom, IntersectionObserver mock)
├── unit/
│   ├── Nav.test.tsx
│   ├── Hero.test.tsx
│   └── Projects.test.tsx
└── e2e/
    ├── home.spec.ts
    ├── navigation.spec.ts
    └── resume.spec.ts
```

CI runs both test suites on every push to `main` and on pull requests targeting `main`. E2E tests run against the production build.

## Stack

- **Framework** — [Next.js 16](https://nextjs.org)
- **Styling** — [Tailwind CSS](https://tailwindcss.com)
- **Language** — TypeScript
- **Graphics** — [p5.js](https://p5js.org) (portrait sketch)
- **Fonts** — Cormorant Garamond, DM Sans (Google Fonts)
- **Deployment** — [Vercel](https://vercel.com)

## Project Structure

```
app/
├── layout.tsx          # Root layout, metadata, font loading
├── page.tsx            # Page shell — section composition
└── resume/
    └── page.tsx        # Resume page
components/
├── Nav.tsx
├── Hero.tsx
├── PortraitSketch.tsx
├── About.tsx
├── WhatIOffer.tsx
├── Experience.tsx
├── Credentials.tsx
├── Projects.tsx
└── Contact.tsx
public/                 # Static assets (images, resume PDF)
tests/                  # Unit and E2E tests
```

## Design

Design tokens are defined in `tailwind.config.ts` and `app/globals.css`.
Brand guidelines are maintained separately.
