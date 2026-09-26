# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal trilingual (FR / EN / ES) portfolio site for a freelance fullstack developer, built with Astro 6 as a fully static site (`output: 'static'`, `trailingSlash: 'always'`). There is no test suite or linter; `astro check` is the type gate.

## Commands

```bash
npm install
npm run dev        # dev server
npm run build      # static build into dist/ (also generates the sitemap)
npm run preview    # serve the built dist/
npx astro check    # type-check .astro/.ts files (tsconfig extends astro/tsconfigs/strict)
```

Deployment: pushing to `main` triggers `.github/workflows/deploy.yml`, which builds with `withastro/action` (Node 22) and publishes to GitHub Pages. The custom domain comes from `public/CNAME`; the canonical `site` (used for canonical/hreflang URLs and the sitemap) is set in `astro.config.mjs` — keep the two in sync when changing domains.

## Architecture

### Routing & i18n

- Astro's built-in i18n is configured in `astro.config.mjs` (`defaultLocale: 'fr'`, `prefixDefaultLocale: false`): French lives at `/`, English at `/en/`, Spanish at `/es/`.
- Each page exists **once**, under `src/pages/[...locale]/`. `getStaticPaths` emits `locale: undefined` for French and `'en'`/`'es'` for the others, passing `lang` as a prop (see `localeStaticPaths()` / `localeParam()` in `src/i18n/locales.ts`). Never duplicate a page per language.
- Build localized links with `localizedPath(lang, path)` (wraps `getRelativeLocaleUrl`). Components receive `lang` as a prop rather than parsing the URL.
- UI strings live in `src/i18n/dictionaries/{fr,en,es}.ts`. `fr.ts` is the source of truth and defines the `Dictionary` type; `en`/`es` use `satisfies Dictionary`, so a missing or extra key fails `astro check`. `useTranslations(lang)` returns the typed dictionary object (`t.hero.role`); some entries are functions for interpolation (`t.skills.meta(entries, domains)`).
- `BaseLayout` takes a locale-independent `path` to emit canonical + `hreflang` alternates; pass `alternates={false}` for single-locale pages (404).

### Content

- `src/data/projects.json` is a single list loaded as the `projects` content collection (`src/content.config.ts`, `file()` loader + Zod schema). Shared fields (`startDate`, `endDate` — `null` means in progress — `location`, `technologies`, `link`) appear once; text fields (`name`, `role`, `company`, `description`) are `{ fr, en, es }` objects. `id` (a string) is the URL slug `/project/<id>/`; `order` sets display order. Adding a project = one entry with all three languages.
- Use `getProjects()` / `localizeProject()` from `src/lib/projects.ts` rather than `getCollection` directly. Counts shown on the site (projects, year range, skills) are derived from data, not hardcoded.
- Skills: `src/data/skills.ts`. Timeline periods: `src/data/timeline.ts` (localized inline). Profile constants (external links, years of experience): `src/data/profile.ts`.
- The portrait is `src/assets/me.jpg`, rendered through `astro:assets` `<Image>` as a small avatar next to the name in the hero.
- The hero visual is a canvas port (`src/scripts/neural-network.ts`) of the React mockup in `src/assets/Réseau neuronal particules animé/` (source only, not bundled, excluded from tsconfig). It pauses off-screen and shows a still frame under `prefers-reduced-motion`.

### Design & styling

- Dark "terminal" design (mockup: `Developer portfolio redesign/Portfolio B.dc.html`, git-ignored and excluded from tsconfig). Design tokens are CSS custom properties in `src/styles/global.css`; components use scoped `<style>` blocks referencing those tokens. Light sections use the global `.paper` class.
- Fonts (Archivo → `--font-sans`, IBM Plex Mono → `--font-mono`) come from Astro's Fonts API configured in `astro.config.mjs` and injected with `<Font>` in `BaseLayout`.
- All client JS is progressive enhancement in `src/scripts/interactions.ts` (scroll progress, spinner/boot line, clock, count-up, scroll reveal), driven by `data-*` attributes. Reveal styles only apply under `html.js`, and `prefers-reduced-motion` disables animations — keep content readable without JS.
