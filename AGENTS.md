# AGENTS.md

Single source of instructions for all AI agents working in this repository.

## Project summary

Story Odyssey Badge Checker: a Next.js app that let Story Protocol Odyssey testnet participants check which ecosystem badge NFTs their wallet held (via `balanceOf` on ~30 contracts on chain 1516). Built Nov 2024, last feature work Feb 2025.

**Status: archive.** The Odyssey testnet has ended and chain 1516 no longer responds. The app runs in archive mode:
- `ArchiveBanner` is rendered on every page from `src/app/layout.tsx`.
- The wallet input on `/` is disabled; badges from `public/badges.json` are shown as a catalog without ownership status.
- `/drop` (joke eligibility checker, no on-chain logic) and `/collections` are unchanged.

Do not try to revive live checks against chain 1516, and never fake or hardcode wallet ownership data.

## Stack

- Next.js 15.0.3 (App Router), React 18, TypeScript 5
- Tailwind CSS 3.4
- thirdweb v5 (`readContract`, `defineChain(1516)`) in `src/lib/thirdweb/index.ts` (kept for reference, not called by the archive UI)
- react-icons, react-markdown
- Node.js 20+ (CI uses Node 20), npm with `package-lock.json`

## Commands

```bash
npm ci          # install (use ci, the lockfile is committed)
npm run dev     # dev server on http://localhost:3000
npm run lint    # next lint
npm run build   # production build, must pass before committing
npm run start   # serve the build
```

There are no tests. CI (`.github/workflows/ci.yml`) runs `npm ci`, `npm run lint`, `npm run build` on Node 20.

## Structure

```
public/badges.json        # badge catalog: id, name, contract_address, image_url
public/badges_images/     # badge images, WebP, max 512 px
public/collections/       # /collections images
public/drop/images/       # /drop images
src/app/                  # routes: / (checker, archive), /collections, /drop
src/components/           # UI components
src/lib/story/            # addresses, badge loader, /drop messages
src/lib/thirdweb/         # balanceOf helper
```

## Conventions

- TypeScript, functional React components, Tailwind classes for styling.
- Client components start with `'use client'`.
- Import alias `@/` maps to `src/`.
- Images in `public/` must be WebP, resized to at most 512 px, and small (aim under 100 KB each). Do not add large PNG/GIF files.
- User-facing text and README are in English.
- Keep the archive honest: anything shown about badges must come from `public/badges.json`, not from invented data.

## Do not

- Do not commit `.env` or any real `NEXT_PUBLIC_THIRDWEB_CLIENT_ID` (only `.env.example`).
- Do not add heavy dependencies; this is an archive. Remove unused ones instead.
- Do not merge the experimental branches `story` or `v1.0.1` into `main`.
- Do not rewrite git history or push to `main` without the owner's confirmation.
- Badge and collection images belong to their respective ecosystem projects; they are not MIT-licensed. Do not relicense or redistribute them separately.
