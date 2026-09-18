<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project overview

Hotel booking landing page (Indonesian locale). Static marketing site — no auth, no database, no API routes.

## Stack

- **Next.js 16.3.5** / React 19.2.8 — App Router (`app/` directory)
- **Tailwind CSS v4** via `@tailwindcss/postcss` (no `tailwind.config` file — config is in `postcss.config.mjs`)
- **TypeScript** with path alias `@/*` → project root
- **react-icons** (Material Design icons used in `app/page.tsx`)

## Commands

```bash
npm run dev      # dev server on localhost:3000
npm run build    # production build
npm run lint     # eslint (next/core-web-vitals + typescript)
```

No test suite exists. No typecheck script — run `npx tsc --noEmit` if needed.

## Structure

- `app/` — routes: `/` (home), `/about`
- `components/` — shared UI (Navbar, Footer, Hero, Card, etc.)
- `app/globals.css` — Tailwind directives + custom styles
- No `.env` files, no environment variables required

## Conventions

- Components are default-exported, one per file, PascalCase filenames
- Use `@/` import alias for cross-directory imports
- Content is in Indonesian (Bahasa Indonesia)
