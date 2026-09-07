# Rihaan — Portfolio

Personal portfolio site, built as a real project rather than a template: a single-page
site with a dark-first "circuit" visual identity, content-as-data, and a working
contact form backed by a Next.js route handler.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- TypeScript
- Tailwind CSS v4
- ESLint (`eslint-config-next`) + Prettier (with `prettier-plugin-tailwindcss`)

No UI framework or animation library beyond React + Tailwind — reveal-on-scroll uses
`IntersectionObserver`, and the hero's typing effect and theme toggle are small custom
hooks (`src/hooks/`).

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

| Command                | What it does                      |
| ---------------------- | --------------------------------- |
| `npm run build`        | Production build                  |
| `npm run start`        | Serve the production build        |
| `npm run lint`         | ESLint                            |
| `npm run lint:fix`     | ESLint with auto-fix              |
| `npm run format`       | Format the codebase with Prettier |
| `npm run format:check` | Check formatting without writing  |
| `npm run typecheck`    | `tsc --noEmit`                    |

## Editing content

All personal content — name, bio, skills, projects, social links, nav labels — lives
in one typed file: [`src/lib/data.ts`](src/lib/data.ts). Nothing else needs to change
to update the site's content; the components just render whatever's exported from
there. Shapes for each export are defined in [`src/lib/types.ts`](src/lib/types.ts).

To add a project, add an entry to the `projects` array in `data.ts` — the tag filter
on the Projects section is derived automatically from whatever tags your projects use
(`allProjectTags`), so no separate list to keep in sync.

## Project structure

```
src/
  app/                Routes, layout, metadata, and the contact API route
    api/contact/       POST route handler for the contact form
    icon.tsx           Generated favicon (next/og)
    opengraph-image.tsx Generated OG image (next/og)
    sitemap.ts, robots.ts
  components/
    nav/               Navbar, theme toggle
    sections/          Hero, About, Skills, Projects, Contact
    ui/                Reusable pieces: ProjectCard, TagFilter, Reveal, Footer, ...
  hooks/               useScrollReveal, useActiveSection, useTypewriter, useTheme
  lib/                 data.ts (content) + types.ts
```

## Theme

Dark mode is the default. The toggle in the nav writes the choice to
`localStorage` and flips a `dark` class on `<html>`; a small inline script
(`strategy="beforeInteractive"` in `layout.tsx`) applies the stored preference
before first paint, so there's no light/dark flash on load. Reading the theme
uses `useSyncExternalStore` rather than a mount-effect, so the toggle button
doesn't need a hydration workaround either.

## Contact form

The form in the Contact section validates client-side, then POSTs to
`/api/contact` ([`src/app/api/contact/route.ts`](src/app/api/contact/route.ts)),
which re-validates server-side and currently just logs the submission. Wiring
up real email delivery (e.g. via [Resend](https://resend.com)) is a `TODO` left
in that file — it's a few lines once you have an API key and a verified sending
domain; see the comment there for the exact snippet.

`NEXT_PUBLIC_SITE_URL` (used for metadata/OG/sitemap) and `RESEND_API_KEY` are
documented in [`.env.local.example`](.env.local.example).

## Deploying

See the deployment steps shared alongside this repo, or in short: push to GitHub,
import the repo at [vercel.com/new](https://vercel.com/new), and set
`NEXT_PUBLIC_SITE_URL` to the assigned domain in the project's Environment
Variables once you know it.
