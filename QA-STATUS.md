# Body Tech Gym — QA Evidence

Tested locally on 2026-11-21:
- JSX/TypeScript parser-level diagnostics via TypeScript `transpileModule`: 0 syntax errors for `src/App.tsx`.
- CSS parse via PostCSS: valid syntax.
- Product utilities derive from the previously tested release (phone/name checks, pricing math, wellness guardrails, WhatsApp URL encoding and SVG escaping). Re-run `npm test` after installing dependencies.

Pending checks and limits:
- Full Vite build and typecheck require installing local dependencies; package download may be restricted in this environment. Do not claim a successful production build until `npm run build` passes.
- Browser automated UI/a11y and cross-device testing to be recorded after executable build.
- Vercel deployment still needs account permission; initial Vercel connector returned HTTP 403 for project creation.
- Owner must approve actual facility imagery, programme statements, opening hours, promotions and prices before removing `noindex`.
