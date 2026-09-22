# FIKIRI Innovation Festival 2026

Angular web application for FIF 2026, the FIKIRI Innovation Festival taking place in Kinshasa on 14–15 October 2026.

The festival connects Congolese solutions and digital talent with the organizations that can buy, finance, recruit, and deploy them.

## Tech stack

- Angular 22.1 with standalone components and signals
- Angular SSR 22.1 with Express 5
- Angular Material and Angular CDK
- Tailwind CSS 4 through PostCSS
- NgRx Signal Store for managed application state
- TypeScript 6 in strict mode
- pnpm 11 and Node.js 24
- ESLint 10, Prettier 3, Husky, and Commitlint

## Prerequisites

- Node.js 24
- pnpm 11, preferably enabled through Corepack
- The FIF API running locally on `http://localhost:8000` for API-backed features

## Getting started

Install the locked dependencies:

```bash
pnpm install --frozen-lockfile
```

Start the Angular development server:

```bash
pnpm start
```

Open [http://localhost:4200](http://localhost:4200).

## Environment configuration

API base URLs are defined in Angular environment files:

| Build configuration | File                                          | API URL                 |
| ------------------- | --------------------------------------------- | ----------------------- |
| Development         | `src/environments/environment.development.ts` | `http://localhost:8000` |
| Production          | `src/environments/environment.ts`             | `https://api.fif.co`    |

The HTTP interceptor prefixes Angular `HttpClient` requests with the configured API URL and sends credentials with each request. The application does not currently use a runtime `.env` override for the API URL.

## Available commands

| Command             | Description                                                             |
| ------------------- | ----------------------------------------------------------------------- |
| `pnpm start`        | Run the development server on port 4200                                 |
| `pnpm build`        | Create the production browser and SSR bundles in `dist/fif-web`         |
| `pnpm watch`        | Rebuild continuously with the development configuration                 |
| `pnpm start:prod`   | Run a previously built SSR bundle; defaults to port 4000 or uses `PORT` |
| `pnpm lint`         | Lint TypeScript and Angular templates                                   |
| `pnpm ng -- <args>` | Pass arguments to the Angular CLI                                       |

## Project structure

Feature code lives under `src/app/domains` and follows these conventions:

- `data-access`: NgRx Signal Stores for stateful write operations (`POST`, `PATCH`, and `PUT`)
- `features`: routed screens and feature displays
- `interfaces`: shared interfaces prefixed with `I` and exposed through barrel exports
- `ui`: presentational elements without direct store interaction

API reads that do not require local state use Angular's `httpResource` API. Components are standalone, and routed features are lazy-loaded.

## Routing and rendering

The root route lazy-loads the public website domain and its landing feature. Angular SSR renders every route on the server, and browser hydration is enabled with `provideClientHydration()`.

The production server serves static browser assets with a one-year cache and sends all other requests to Angular's server engine. It listens on `PORT` when provided and otherwise uses port `4000`.

## Styling, icons, and theming

Global styles enter through `src/styles/styles.css`, which loads Tailwind, Angular CDK overlay styles, the Material Azure Blue base theme, project typography, and component overrides.

The application uses bundled Geist fonts. Lucide SVG icons are registered centrally, and the theme service generates primary and error tonal palettes as CSS variables.

## Docker

Run the development container with source bind mounts and hot reload:

```bash
docker compose -f compose.dev.yml -p fif-web up --build
```

Run a production build and the Express SSR server:

```bash
docker compose -f compose.prod.yml -p fif-web up --build
```

## Code quality

- TypeScript and Angular template strictness are enabled.
- ESLint checks TypeScript, Angular templates, accessibility, and unused imports.
- Prettier formats Angular templates and sorts Tailwind classes.
- `.husky/pre-commit` runs `pnpm lint`.
- `.husky/commit-msg` validates Conventional Commit messages.
