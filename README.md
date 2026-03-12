# nevettebailey.com

Personal portfolio site for Nevette A. Bailey, Ph.D. — Software Engineer & Technical Leader.

Built with Next.js 14, Tailwind CSS, and TypeScript. Deployed on Vercel.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Start local development server |
| `npm run build` | Production build |
| `npm run start` | Run production build locally |
| `npm run lint` | Run ESLint |

## Stack

- **Framework** — [Next.js 14](https://nextjs.org)
- **Styling** — [Tailwind CSS](https://tailwindcss.com)
- **Language** — TypeScript
- **Graphics** — [p5.js](https://p5js.org) (portrait sketch)
- **Fonts** — Cormorant Garamond, DM Sans (Google Fonts)
- **Deployment** — [Vercel](https://vercel.com)

## Project Structure

```
app/
├── layout.tsx          # Root layout, metadata, font loading
└── page.tsx            # Page shell — section composition
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
public/                 # Static assets (images)
```

## Design

Design tokens are defined in `tailwind.config.ts` and `app/globals.css`.
Brand guidelines are maintained separately.