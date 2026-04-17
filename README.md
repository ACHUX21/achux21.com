# achux21.com

Launch-ready portfolio for Achraf Ouazzani Chahidi, built with `React + TypeScript + Vite` and a lightweight `three` background scene.

## Local development

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Type-check the project:

```bash
npx tsc --noEmit
```

Preview the production build locally:

```bash
npm run preview
```

## Content updates

The site is intentionally data-driven. Most content changes happen in:

`src/content/portfolio.ts`

That file controls:

- hero copy
- experience and education
- projects
- skills
- certifications
- languages
- contact details
- social links
- selected public posts

The public resume route is:

`public/resume.html`

The main site links to `/resume.html` when `resumeUrl` is present in the portfolio content.

## Styling and motion

Theme tokens and layout styles live in:

`src/styles.css`

The live scene lives in:

`src/components/SceneBackground.tsx`

The page automatically falls back to a lighter visual treatment on reduced-motion or low-power environments.

## GitHub Pages deployment

This repo is configured for GitHub Pages deployment from `main` via GitHub Actions.

### Workflow

1. Push changes to `main`.
2. GitHub Actions installs dependencies and runs `npm run build`.
3. The built `dist/` output is published to GitHub Pages.
4. `public/CNAME` keeps the custom domain set to `achux21.com`.

### Required GitHub settings

In the GitHub repository settings:

1. Open `Settings` -> `Pages`.
2. Set `Source` to `GitHub Actions`.
3. Keep the custom domain set to `achux21.com`.

## Notes

- `VITE_BASE_PATH` can override the Vite base path if the site is ever deployed under a subpath.
- The large lazy-loaded 3D scene chunk is the main remaining build warning; it does not block deployment, but it is the primary residual performance tradeoff in the current design.
