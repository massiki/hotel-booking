<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project overview

Hotel booking site (Indonesian locale). Has Google OAuth login, PostgreSQL database via Prisma, role-based access (user/admin), and several stub routes.

## Stack

- **Next.js 16.3.5** / React 19.2.8 — App Router (`app/` directory, no `src/`)
- **Tailwind CSS v4** via `@tailwindcss/postcss` — no `tailwind.config.*` file; custom theme defined with `@theme` in `app/globals.css`
- **TypeScript** (strict) with path alias `@/*` → project root
- **NextAuth v5 beta** (`next-auth@5.0.0-beta.32`) with Google provider, JWT strategy, Prisma adapter
- **Prisma 7.10.0** with PostgreSQL via Neon (`@prisma/adapter-pg` driver adapter)
- **react-icons** (md, hi, bs, fc families), **clsx** for class composition

## Commands

```bash
npm run dev          # dev server on localhost:3000
npm run build        # production build
npm run lint         # eslint (flat config, next/core-web-vitals + typescript)
```

No test suite. No typecheck script — run `npx tsc --noEmit` if needed.

## Structure

- `app/` — routes: `/`, `/about`, `/rooms` (stub), `/contact` (stub), `/login`, `/admin/dashboard` (stub), `/admin/manage-room` (stub)
- `app/api/[...nextauth]/route.ts` — NextAuth API handler
- `app/generated/prisma/` — generated Prisma client (**gitignored**, do not edit)
- `components/` — shared UI (Navbar, Footer, Hero, Card, Header, etc.)
- `lib/prisma.ts` — singleton PrismaClient with PrismaPg adapter
- `app/globals.css` — Tailwind directives + custom theme (orange primary palette)

## Gotchas

- **Auth middleware lives in `proxy.ts`**, not `middleware.ts`. It exports `NextAuth(authConfig).auth` and a `config` with route matchers. Route protection logic is in `auth.config.ts` callbacks.
- **Prisma client is generated to `app/generated/prisma/`** (gitignored). After schema changes run `npx prisma generate`. The import path is `@/app/generated/prisma/client`.
- **No `tailwind.config.*`** — this is Tailwind v4. Theme customization uses `@theme` blocks in `app/globals.css`, not a config file.
- **ESM project** (`"type": "module"` in package.json).
- **`.env` required**: `AUTH_SECRET`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `POSTGRES_URL`, `DATABASE_URL`. All gitignored.
- **Login layout** (`app/login/layout.tsx`) overrides root layout — no Navbar/Footer on login page.

## Conventions

- Components are default-exported, one per file, PascalCase filenames (exceptions: `ButtonLogin.tsx` and `NavbarLink.tsx` use named exports)
- Use `@/` import alias for cross-directory imports
- Content is in Indonesian (Bahasa Indonesia)
- `'use client'` directive where needed (Navbar, Footer, login page)
- No CSS modules — pure Tailwind utility classes
