# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Marketing/informational website for Pachas Restaurant (Pretoria, South Africa) — a SvelteKit 5 + Tailwind CSS 4 site: menu, wine list, light lunch menu, private dining, gallery, testimonials, and contact/reservations info. The public pages have no backend/auth/database — content lives in static JSON files fetched at runtime. There is also a small first-party analytics feature (`/api/track` + password-protected `/admin` dashboard, see below) that does use server-side code and Netlify Blobs storage.

## Commands

```bash
npm run dev       # start dev server (add -- --open to open a browser tab)
npm run build     # production build
npm run preview   # preview the production build
npm run format    # prettier --write .
npm run lint      # prettier --check .
```

There is no test suite and no `svelte-check`/typecheck script configured. `jsconfig.json` enables `allowJs` but `checkJs` is off, so this is a plain JS (not TS) codebase — don't introduce TypeScript syntax into `.js`/`.svelte` files.

Deployment is via Netlify (`netlify.toml`: build command `npm run build`, publish dir `build`, using `@sveltejs/adapter-netlify`). The root-level `_redirects` file (must stay at the project root, not `static/` — the adapter errors otherwise) holds legacy-URL 301 redirects that must be preserved if routes are renamed.

## Architecture

**Content-as-JSON pattern**: page content (menu items, wine list, light lunch menu, set menu, testimonials) is NOT hardcoded in Svelte components. It lives in JSON files under `static/` (`menu.json`, `wines.json`, `litelunchmenu.json`, `setmenu.json`, `testimonials.json`, `wine-info.json`) and is fetched client-side with plain `fetch()` calls (not SvelteKit `load` functions). Each JSON file has a matching fetch helper in `src/lib/` (`menu.js`, `wines.js`, `litelunch.js`, `testimonials.js`) that fetches, checks `response.ok`, and returns parsed JSON (some swallow errors and return `{}`/`[]`, so check each helper's exact behavior before assuming errors propagate).

To edit displayed menu/wine/testimonial content, edit the JSON file in `static/`, not the Svelte page. Category ordering in the UI generally follows key order in the JSON via `Object.keys(...)`.

**Routing** is one route per nav item, all flat under `src/routes/` (no nested layouts beyond the root): `/`, `/menu`, `/light-lunch`, `/wine-list`, `/private-dining`, `/gallery`, `/contact-reservations`. `src/routes/+layout.svelte` renders the JSON-LD `Restaurant` schema, and switches between `Topbar.svelte` (desktop) and `Sidebar.svelte` (mobile hamburger nav) — both hardcode the same nav links, so add new routes to both when adding a nav item.

**Page data-loading convention**: pages that need JSON data fetch it in `onMount` into `$state`-less plain `let` bindings (this is pre-`$state` reactive style mixed with Svelte 5 runes elsewhere — components are a mix of Svelte 4 `let`/`on:click` reactivity and Svelte 5 `$state`/`$props` runes; match whichever style the file you're editing already uses rather than converting the whole file), showing a "Loading..." placeholder while the object is empty. `console.error` on fetch failure is kept (real diagnostics); debug `console.log`s of the fetched payload have been removed — don't reintroduce them.

**Images**: two different pipelines are in play, deliberately —

- `gallery/+page.svelte` and any other plain `<img>` usage reference `static/images/{food,drinks,testimonials}/*` directly (e.g. `/images/food/beautifulsoup.jpg`). Every JPEG in there has a same-named `.webp` sibling generated via `sharp`; hand-rolled `<picture><source type="image/webp">…<img loading="lazy"></picture>` markup serves WebP with a JPEG fallback. Files here are copied as-is at build time — `@sveltejs/enhanced-img` cannot process anything under `static/` (it throws if you try), so don't attempt to convert these to `<enhanced:img>` without moving them into `src/`.
- The home page hero (`src/routes/+page.svelte`) and the Pacha's logo use `<enhanced:img src="../lib/images/...">` against real image files imported from `src/lib/images/food/` (a small src-side duplicate set: `Dessert_Top.jpg`, `steak.jpg`, `Biltong_Filo.jpg` also exist under `static/images/food/` for the gallery grid — keep both in sync if these specific photos change). This literal-path form of `<enhanced:img>` is reliable; the _dynamic_ form (`src={variable}` fed by `import.meta.glob(..., { query: '?enhanced' })`) was tried for the gallery and is unreliable in this Vite/adapter-netlify combination (silently produces broken `image/undefined` variants for a chunk of files) — don't reintroduce that pattern without re-verifying against a real `npm run preview` build first.
- New JPEGs should stay lowercase-extension (`.jpg`) where possible — `vite-imagetools`'s format sniffing is case-sensitive and a `.JPG` file silently skips AVIF/WebP generation for the `<enhanced:img>` literal-path pipeline (it falls back to serving the original, which is safe but loses the optimization).

**Styling**: Tailwind 4 utility classes everywhere, plus a small set of semantic classes defined once in `src/app.css` and reused across pages instead of repeating utility combos — `card`, `hover-card`, `card-highlight`, `section-title`, `section-subtitle`, `section-subheading`, `btn`/`btn-primary`/`btn-secondary`, `divider`, `alert`/`alert-info`/`alert-warning`/`alert-success`, `notification`. Prefer these over ad hoc utility classes when a new element fits an existing pattern. Body font is `Baskervville` (serif), self-hosted via `@font-face` in `app.css` pointing at `static/fonts/baskervville-{normal,italic}.woff2` (latin subset only, `font-display: optional`, preloaded from `app.html` — chosen specifically to avoid the CLS a font-swap causes; don't switch back to `swap` without re-checking Lighthouse's CLS). Brand accent color is `rose-700` for default-state text (`rose-600` measured below the 4.5:1 contrast threshold against this site's `bg-slate-50` section background and was bumped a shade darker sitewide) — `hover:text-rose-600` states were left alone since hover states aren't contrast-audited the same way.

## Analytics (`/admin`, `/api/track`)

First-party, privacy-conscious pageview analytics — no third-party script, viewable only by the owner.

- **Capture**: every client-side navigation triggers `trackPageview()` (`src/lib/analytics.js`) via `afterNavigate` in the root `+layout.svelte`, which `sendBeacon`s `{ path, referrer, utm* }` to `POST /api/track` (`src/routes/api/track/+server.js`). That endpoint buckets the referrer (Google/Bing/Social/hostname/Direct), parses a coarse device/browser from the user-agent, reads country/city from Netlify's `platform.context.geo` (no raw IP is stored — POPIA-conscious), and writes one small JSON blob per event to Netlify Blobs (`@netlify/blobs`, store name `analytics`, key `events/{day}/{uuid}`). One-blob-per-event is deliberate — it avoids a read-modify-write race that a single shared per-day array would have under concurrent requests.
- **This only works on a real Netlify deploy.** `getStore()` throws `MissingBlobsEnvironmentError` under plain `vite dev`/`vite preview` (no Netlify Function context). Both `/api/track` and the `/admin` dashboard load function catch this and degrade gracefully (silent no-op for tracking; a "storage isn't available" message on the dashboard) rather than 500ing — don't remove those try/catches to "clean up" the code.
- **Auth**: `src/lib/server/auth.js` implements a signed-cookie session (HMAC-SHA256 over an expiry timestamp, `env.ANALYTICS_COOKIE_SECRET`) checked against `env.ANALYTICS_PASSWORD`. `src/routes/admin/+layout.server.js` guards every `/admin/*` route except `/admin/login`. Required env vars are documented in `.env.example`; real values go in Netlify's env var UI for production and a local `.env` (gitignored) for dev — never commit actual secrets.
- **Layout**: `/admin*` intentionally does not get the public site's Topbar/Sidebar/JSON-LD — the root `src/routes/+layout.svelte` checks `$page.url.pathname.startsWith('/admin')` and skips that chrome (SvelteKit's root layout always wraps every route, so this conditional-render approach was used instead of the `+layout@.svelte` "reset" convention, which only resets to the root layout, not out of it entirely). `src/routes/admin/+layout.svelte` supplies the dashboard's own minimal shell and forces a system-sans font stack (the dataviz skill's guidance — numbers/labels read better in sans than the site's decorative serif).
- `/admin` is excluded from tracking (both client-side in `trackPageview` and server-side in the endpoint) and from `robots.txt`/sitemap.

## Formatting

Prettier is configured with tabs, single quotes, no trailing commas, 100 print width, plus `prettier-plugin-svelte` and `prettier-plugin-tailwindcss` (which auto-sorts Tailwind classes on save/format — don't hand-order class lists, run `npm run format` instead).
