# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Marketing/informational website for Pachas Restaurant (Pretoria, South Africa) — a SvelteKit 5 + Tailwind CSS 4 static site: menu, wine list, light lunch menu, private dining, gallery, testimonials, and contact/reservations info. No backend, no auth, no database — content lives in static JSON files fetched at runtime.

## Commands

```bash
npm run dev       # start dev server (add -- --open to open a browser tab)
npm run build     # production build
npm run preview   # preview the production build
npm run format    # prettier --write .
npm run lint      # prettier --check .
```

There is no test suite and no `svelte-check`/typecheck script configured. `jsconfig.json` enables `allowJs` but `checkJs` is off, so this is a plain JS (not TS) codebase — don't introduce TypeScript syntax into `.js`/`.svelte` files.

Deployment is via Netlify (`netlify.toml`: build command `npm run build`, publish dir `build`, using `@sveltejs/adapter-auto`). `static/_redirects` holds legacy-URL 301 redirects that must be preserved if routes are renamed.

## Architecture

**Content-as-JSON pattern**: page content (menu items, wine list, light lunch menu, set menu, testimonials) is NOT hardcoded in Svelte components. It lives in JSON files under `static/` (`menu.json`, `wines.json`, `litelunchmenu.json`, `setmenu.json`, `testimonials.json`, `wine-info.json`) and is fetched client-side with plain `fetch()` calls (not SvelteKit `load` functions). Each JSON file has a matching fetch helper in `src/lib/` (`menu.js`, `wines.js`, `litelunch.js`, `testimonials.js`) that fetches, checks `response.ok`, and returns parsed JSON (some swallow errors and return `{}`/`[]`, so check each helper's exact behavior before assuming errors propagate).

To edit displayed menu/wine/testimonial content, edit the JSON file in `static/`, not the Svelte page. Category ordering in the UI generally follows key order in the JSON via `Object.keys(...)`.

**Routing** is one route per nav item, all flat under `src/routes/` (no nested layouts beyond the root): `/`, `/menu`, `/light-lunch`, `/wine-list`, `/private-dining`, `/gallery`, `/contact-reservations`. `src/routes/+layout.svelte` renders the JSON-LD `Restaurant` schema, and switches between `Topbar.svelte` (desktop) and `Sidebar.svelte` (mobile hamburger nav) — both hardcode the same nav links, so add new routes to both when adding a nav item.

**Page data-loading convention**: pages that need JSON data fetch it in `onMount` into `$state`-less plain `let` bindings (this is pre-`$state` reactive style mixed with Svelte 5 runes elsewhere — components are a mix of Svelte 4 `let`/`on:click` reactivity and Svelte 5 `$state`/`$props` runes; match whichever style the file you're editing already uses rather than converting the whole file), show a "Loading..." placeholder while the object is empty, and log fetched data to `console.log` for debugging (an existing, intentional pattern in `menu`, `light-lunch`, `private-dining` — not left-over debug code to be removed reflexively).

**Images**: real photos live in `static/images/{food,drinks,testimonials}/`; every subfolder with `resized/` inside it holds pre-resized copies actually referenced by pages (e.g. `/images/food/resized/...`). When adding a new photo, add a resized copy alongside the original and reference the `resized/` path from Svelte, matching the existing set. `drinks.txt` / `food.txt` in the repo root are plain reference lists of filenames used when building the hardcoded image arrays in `gallery/+page.svelte` — update them if you keep them in sync manually when adding gallery images.

**Styling**: Tailwind 4 utility classes everywhere, plus a small set of semantic classes defined once in `src/app.css` and reused across pages instead of repeating utility combos — `card`, `hover-card`, `card-highlight`, `section-title`, `section-subtitle`, `section-subheading`, `btn`/`btn-primary`/`btn-secondary`, `divider`, `alert`/`alert-info`/`alert-warning`/`alert-success`, `notification`. Prefer these over ad hoc utility classes when a new element fits an existing pattern. Body font is `Baskervville` (serif) loaded via Google Fonts `@import` in `app.css`; brand accent color is `rose-500`/`rose-600`.

## Formatting

Prettier is configured with tabs, single quotes, no trailing commas, 100 print width, plus `prettier-plugin-svelte` and `prettier-plugin-tailwindcss` (which auto-sorts Tailwind classes on save/format — don't hand-order class lists, run `npm run format` instead).
