# portfolio.dev — Adrián Rodríguez

Personal portfolio built with Astro. Features bilingual support (EN/ES), dynamic OG image generation, and PostHog analytics.

**Live:** [adrianrdguez.dev](https://adrianrdguez.dev) <!-- update if URL differs -->

## Tech Stack

- **Astro 4** — SSG framework
- **React 18** — interactive islands
- **Tailwind CSS** — styling
- **TypeScript** — type safety
- **Satori + @resvg/resvg-js** — dynamic OG image generation
- **PostHog** — analytics
- **Inter** — font

## Project Structure

```
src/
├── assets/
│   ├── icons/          # SVG icons
│   └── resources/      # Content data (info.en.json, info.es.json)
├── components/         # Astro + React components
├── i18n/               # Translation files (EN/ES)
├── layouts/            # Page layouts
├── pages/
│   ├── index.astro     # EN home
│   ├── projects.astro  # EN projects
│   ├── es/             # ES routes
│   └── og/[lang]/[page].png.ts  # OG image API
├── types/              # TypeScript types
└── utils/              # Utility functions
```

## Commands

| Command           | Action                              |
| :---------------- | :---------------------------------- |
| `npm install`     | Install dependencies                |
| `npm run dev`     | Dev server at `localhost:4321`      |
| `npm run build`   | Type-check + build to `./dist/`     |
| `npm run preview` | Preview production build locally    |

## Features

- Bilingual (EN/ES) with language switcher
- Dynamic OG images per page and language
- Experience timeline, pinned projects
- Follow-mouse cursor effect
- SEO meta tags
