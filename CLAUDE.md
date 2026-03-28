# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server at http://localhost:3000
npm run build        # Production build
npm run start        # Run production build locally
npm run lint         # ESLint (Next.js defaults + Prettier)
npm run format       # Format with Prettier
npm run format:check # Check formatting without modifying
```

No tests are configured for this project.

## Architecture

Personal portfolio site for Nevette A. Bailey, Ph.D. Built with Next.js 16 App Router, TypeScript, and Tailwind CSS. Deployed on Vercel.

**Routing:**
- `/` — Single-page home composed of section components (Hero → About → WhatIOffer → Experience → Projects → Credentials → Contact). Navigation uses hash-based anchor scrolling (`/#about`, `/#work`, etc.).
- `/resume` — Separate route for a dedicated resume page.
- `/sitemap.xml` — Auto-generated via `app/sitemap.ts`.

**Component patterns:**
- All interactive components are Client Components (`"use client"`).
- `PortraitSketch.tsx` (p5.js) is dynamically imported with `ssr: false` to avoid hydration mismatches.
- Scroll-triggered fade-in animations use a shared `useReveal()` hook (Intersection Observer) defined inline within each component. CSS classes `.reveal` / `.visible` / `.reveal-delay-1` through `.reveal-delay-5` are defined in `globals.css`.

**Styling:**
- Tailwind CSS with a custom design system in `tailwind.config.ts`:
  - `pink` — primary brand color (`#A64D78`)
  - `ink` — text colors
  - `canvas` — background/surface colors
- Display font: Cormorant Garamond (headings). Body font: DM Sans. Both loaded from Google Fonts in `app/layout.tsx`.
- Custom keyframe animations (`fadeInUp`, `scrollPulse`) and global base styles live in `app/globals.css`.

**Path alias:** `@/*` maps to the project root (e.g., `@/components/Nav`).