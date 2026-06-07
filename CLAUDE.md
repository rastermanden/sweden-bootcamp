# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # local dev server (localhost:3000)
npm run build    # static export to /out (Next.js)
npm run lint     # ESLint via next lint
```

There is no test suite — linting is the only automated check.

## Architecture

**Natur Bootcamp Sverige** is a Danish-language Next.js 14 marketing/booking site for a nature wellness bootcamp in Sweden, deployed as a static export to GitHub Pages.

### Key architectural decisions

- `next.config.js` sets `output: 'export'` — no server-side rendering, no API routes. All pages are statically generated.
- `NEXT_PUBLIC_BASE_PATH` is injected at build time for GitHub Pages subdirectory support.
- The Leaflet map (`NaerhedenMap.tsx`) is loaded via `next/dynamic` with `ssr: false` — it is browser-only and will break if rendered server-side.
- Forms (booking + contact) submit to **Formspree** — there is no backend.

### Data sources

| File | Used by |
|------|---------|
| `data/bootcamp-dates.json` | `BookingSection.tsx` — 4 sessions (Aug–Nov 2026) with spot counts |
| `data/naerheden.geojson` | `NaerhedenMap.tsx` / `NaerhedenSection.tsx` — ~40 attractions with categories, coordinates, images |

GeoJSON features are typed in `types/geojson.d.ts` and loaded via a custom webpack rule in `next.config.js`.

### Component structure

`app/page.tsx` is one long page that composes all sections inline (hero, about, program, schedule, instructor, accommodation, food, pricing, gallery, footer) plus these extracted components:

- `NaerhedenSection` → `NaerhedenMap` — interactive Leaflet map with category filtering
- `BookingSection` — date picker driven by `bootcamp-dates.json`, submits to Formspree
- `ContactForm` — simple Formspree form
- `GallerySection` — static photo grid
- `FadeUp` — scroll-triggered animation wrapper (used throughout)

### Styling

Tailwind with a custom theme defined in `tailwind.config.ts`:
- Custom color scale: `forest` (dark greens 950–600), `sage` (light greens), `cream`, `tan`, `warm-white`
- Custom animations: `fadeUp` (scroll reveal), `scrollLine` (pulsing vertical line)
- Fonts: Inter (sans) + Playfair Display (serif/italic) from Google Fonts, set in `app/layout.tsx`

### Deployment

Two GitHub Actions workflows:
- `deploy.yml` — builds and pushes `./out` to GitHub Pages on every push to `main`
- `pr-preview.yml` — deploys PR previews to a subdirectory named after the branch
