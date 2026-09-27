<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project overview

Hotel booking site (Indonesian locale): public room browsing, Google OAuth login, role-based access (user/admin), reservation flow with Midtrans Snap payment, admin CRUD for rooms/amenities/contacts. No test suite, no CI.

## Stack

- **Next.js 16.3.5** / React 19.2.8 — App Router (`app/` at repo root, no `src/`)
- **Tailwind CSS v4** via `@tailwindcss/postcss` — no `tailwind.config.*`; `@theme` block in `app/globals.css` (orange `--color-primary-*` palette)
- **TypeScript** strict, `@/*` → repo root; ESM (`"type": "module"`)
- **NextAuth v5 beta** (Google, JWT strategy, Prisma adapter) — split across `auth.ts`, `auth.config.ts`, `proxy.ts`
- **Prisma 7** + PostgreSQL via `@prisma/adapter-pg`; config in `prisma7.config.ts` (loads dotenv, reads `POSTGRES_URL`)
- **Midtrans Snap** (sandbox) for payment, **Vercel Blob** for images, **zod** for form validation
- react-icons, clsx, date-fns, react-datepicker, react-spinners

## Commands

```bash
npm run dev             # localhost:3000
npm run build           # next build
npm run lint            # eslint flat config (ignores .next, app/generated)
npx tsc --noEmit        # typecheck — no npm script
npx prisma generate     # after editing prisma/schema.prisma
npx prisma migrate dev  # migrations (reads POSTGRES_URL from .env)
```

No tests — verify changes with `npm run lint` and `npx tsc --noEmit`. `npm install` runs `prisma skills sync` (see `skills-lock.json`).

## Structure

- `app/` — routes: `/`, `/about`, `/rooms` + `/rooms/[id]`, `/contact`, `/login`, `/reservation` + `/reservation/[id]`, `/checkout/[id]`, `/admin/{dashboard,manage-room,manage-amenities,manage-contact}` (room/amenity CRUD adds `create` and `[id]/edit` subroutes)
- `app/api/` — `[...nextauth]`, `upload` (Vercel Blob, admin-only), `payment` (issues Snap token), `payment/notification` (Midtrans webhook, SHA-512 signature check)
- `lib/action.ts` — all server actions (`"use server"`, named exports at bottom of file); each admin action calls its local `requireAdmin()`
- `lib/data.ts` — data fetchers; admin-only ones throw `Error("Unauthorized Access")`
- `lib/midtrans.ts`, `lib/zod.ts` — Snap token creation (sandbox), zod schemas
- `app/generated/prisma/` — generated client (**gitignored**, never edit); import as `@/app/generated/prisma/client`
- `types/` — shared types + ambient globals (`authjs.d.ts` adds `role` to session/JWT, `midtrans.d.ts` declares `window.snap`)

## Gotchas

- **Middleware is `proxy.ts`**, not `middleware.ts` (Next 16 renamed the convention; `middleware.ts` is deprecated). It exports `NextAuth(authConfig).auth` + `config.matcher`. Actual route rules live in the `authorized` callback in `auth.config.ts`: `/reservation*` and `/checkout*` require login, `/admin*` requires `role === "admin"`, logged-in users are bounced off `/login`.
- **Env vars** (all gitignored): `AUTH_SECRET`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `POSTGRES_URL`, `MIDTRANS_SERVER_KEY`, `NEXT_PUBLIC_MIDTRANS_CLIENT_KEY`, `BLOB_READ_WRITE_TOKEN`. Code reads `POSTGRES_URL` — there is **no** `DATABASE_URL`.
- **After schema changes** run `npx prisma generate` before typecheck/build.
- **`searchParams`/`params` are Promises** — pages `await searchParams` (Next 15+ async request APIs).
- **Admin mutations redirect with `?success=created|updated|...`** — list pages decode it into a banner via a local `successMessages` map.
- **Payment flow**: `createReservationAction` stores an unpaid `Payment` + Snap token on the reservation → `/checkout/[id]` loads sandbox `snap.js` via `next/script` → `PaymentButton` POSTs `/api/payment` for a fresh token → `window.snap.pay(...)` → webhook `/api/payment/notification` flips status to `paid`.
- **Login layout** (`app/login/layout.tsx`) replaces root layout — no Navbar/Footer there.
- The `<!-- BEGIN:nextjs-agent-rules -->` block above is auto-recreated by `next dev`; commit it with your changes rather than deleting it.

## Conventions

- Components: default export, one per file, PascalCase filename. Named-export exceptions: `ButtonLogin.tsx` (`ButtonLoginGoogle`), `NavbarLink.tsx` (`NavbarLinkMobile`/`NavbarLinkDesktop`)
- `'use client'` only where interactivity requires it (Navbar, Footer, login page, forms, admin tables/search inputs) — page components stay server components
- Forms use `useActionState` bound to server actions; validation via zod schemas from `lib/zod.ts`
- UI copy is Bahasa Indonesia
- No CSS modules — Tailwind utility classes only
