# Story Odyssey Badge Checker

> **Status: archive.** The Story Odyssey testnet (chain 1516) has ended, so this is an archive. Live wallet checks are disabled; the site and this repository are kept as a record of the project and as a catalog of the Odyssey ecosystem badges.

A community-built web app that let participants of the [Story Protocol](https://www.story.foundation/) **Odyssey testnet** paste a wallet address and instantly see which ecosystem badges (NFTs) they held and which ones they were still missing.

Archive site: <https://story-badge-checker.vercel.app/>

## The problem

During the Odyssey testnet (late 2024 to early 2025), participants collected badge NFTs by completing activities across roughly 30 ecosystem projects. Each badge lived in its own contract, and **there was no official checker**. To know where you stood, you had to open the explorer and look up each collection one by one.

## The solution

A small Next.js app that does that lookup for you:

- The list of badges (name, contract address, image) lives in a static file, [`public/badges.json`](public/badges.json). Adding a new badge is a one-line JSON change, no redeploy of logic needed.
- For a given wallet, the app calls `balanceOf(owner)` on every badge contract on chain 1516 through the [thirdweb](https://thirdweb.com/) SDK (`readContract`) and runs the calls in parallel (see [`src/lib/thirdweb/index.ts`](src/lib/thirdweb/index.ts)).
- It also checked the main Odyssey commemorative NFT and the "IP Community" commemorative NFT.
- Results were shown as a grid of owned and missing badges, with filters (all / owned / not owned) and a "last updated" note for the badge list.

The badge list was first stored in Supabase, then moved back to a static JSON file (February 2025) because a file was simpler and faster for a list that changed only occasionally.

A lighter side page, `/drop`, is a joke "airdrop eligibility checker" made for the community right before the mainnet airdrop. It has no on-chain logic: it maps the wallet address to one of 15 humorous messages with a share-on-X button, and clearly says it is not an official announcement.

## Impact

- Used by the Odyssey community to track badge progress while no official tool existed.
- Acknowledged publicly by the official account of the Story ecosystem (now DATA):
  - Official mention: <https://x.com/datafdn/status/1875622624635597133>
  - Author's post: <https://x.com/mew294071/status/1888833346673012931>

## Timeline

| Date | Milestone |
|---|---|
| Nov 2024 | First version shipped in a day (27 Nov): badge list, `balanceOf` checks, filters, Vercel deploy. |
| Nov to Dec 2024 | New badges added as projects launched them (OKX, Storyhunt, Sekai, Infinite Seas, and more). Community NFT collections page. |
| Dec 2024 | Badge list moved to Supabase; experiments started on separate branches (see below). |
| Feb 2025 | Badge list moved back to a static JSON file, IP Community NFT check added, `/drop` eligibility prank added (10 Feb). |
| After Feb 2025 | Odyssey testnet shut down. The RPC and explorer for chain 1516 no longer respond, so live checks stopped working. |
| Nov 2026 | Converted into an archive: wallet input disabled, badges shown as a catalog, images compressed. |

## What the archive site shows

- A banner on every page explaining that the testnet has ended.
- The checker page with the wallet input **disabled** and an explanation of why.
- The full badge list from `public/badges.json` as a **catalog** (name, image, contract address). No ownership status is shown, because it can no longer be verified on-chain.
- `/drop` and `/collections` are left as they were.

## Related experiments

These were never merged into `main` and are kept only for reference:

- Branch [`story`](https://github.com/erzawansyah/storybadge/tree/story) (Dec 2024): a "create collection" page using the Story SDK (form, file upload, SPG NFT contract).
- Branch [`v1.0.1`](https://github.com/erzawansyah/storybadge/tree/v1.0.1) (Dec 2024): "TCP/IP simulation", an on-chain activities checker, a transaction counter with wagmi, and AI agent character notes.
- `storycontract` (private repository): a separate "MEW Web3 Lab" experiment around Story contracts. It only shares an early copy of this README and is planned to be archived.

## Tech stack

- [Next.js 15](https://nextjs.org/) (App Router), React 18, TypeScript
- [Tailwind CSS 3](https://tailwindcss.com/)
- [thirdweb v5](https://portal.thirdweb.com/typescript/v5) for contract reads
- react-icons, react-markdown
- Deployed on Vercel

## Getting started

Requirements: Node.js 20 or later, npm.

```bash
git clone https://github.com/erzawansyah/storybadge.git
cd storybadge
npm ci
cp .env.example .env   # optional, see below
npm run dev            # http://localhost:3000
```

Other scripts:

```bash
npm run lint    # ESLint (next lint)
npm run build   # production build
npm run start   # serve the production build
```

### Configuration

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_THIRDWEB_CLIENT_ID` | No (archive mode) | thirdweb client ID used by `src/lib/thirdweb/index.ts`. The archive UI no longer calls it, but you need it if you reuse the `balanceOf` helper against a live chain. |

The build does not need any environment variable.

### Reusing the checker for another chain

The live checker logic is small: `getStoryBadgesContract()` in `src/lib/thirdweb/index.ts` reads `balanceOf` for one wallet and one contract. To revive the idea for another network, change the chain ID in that helper, replace `public/badges.json` with the new list of contracts, and call the helper for each badge (the pre-archive version of `src/components/NFTChecker.tsx` in the git history, before November 2026, shows the full flow).

## Project structure

```
public/
  badges.json          # badge catalog: id, name, contract_address, image_url
  badges_images/       # badge images (WebP, plus one SVG: unleash.svg)
  collections/         # images for the /collections page
  drop/images/         # images for the /drop prank page
src/
  app/
    page.tsx           # checker page (archive mode)
    collections/       # community NFT collections
    drop/              # joke eligibility checker
    layout.tsx         # root layout with the archive banner
  components/          # UI components (ArchiveBanner, NFTChecker, BadgeCards, ...)
  lib/
    story/             # contract addresses, badge loader, /drop messages
    thirdweb/          # balanceOf helper (chain 1516)
```

## License

The code is released under the [MIT License](LICENSE).

Badge images, collection artwork, and logos in `public/` belong to their respective projects in the Story ecosystem. They are included only to identify each badge and are not covered by the MIT License.
