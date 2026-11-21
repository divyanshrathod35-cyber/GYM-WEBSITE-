# BODY TECH GYM — Vercel deployment runbook

## Verified repository and configuration
- Git repository: https://github.com/divyanshrathod35-cyber/GYM-WEBSITE-
- Production branch: `main`
- **Vercel project name:** `bodytech-gym` (do not paste `GYM-WEBSITE-` as the Vercel name)
- Team: `DIV-DEV` (slug: `div-dev4`, ID: `team_TrdKvpsgR5LN3FrRFOHaWspX`)
- Framework: **Vite**, root: repository root (`./`).
- Install: `npm install`; build: `npm run build`; output: `dist`.
- Node.js: Vite 7 requires a recent supported Node runtime; choose Node **22.x** in Vercel Project Settings if needed.
- Required environment variables: **none**.
- Routes, static media, and headers are configured in `vercel.json`.
- The source contains `noindex` deliberately for a concept/pitch release. Do not remove it without the gym owner's permission and fact verification.

## Known issues and diagnosis (21 November 2026)

**Invalid project name:** The repository is named `GYM-WEBSITE-` but Vercel validates project slugs. The corrected Vercel name is `bodytech-gym`. Repository name and Vercel project name may differ. You do not need to rename or recreate the GitHub repository.

**HTTP 403 during project creation from ChatGPT's connected Vercel tool:** The owner of `DIV-DEV` is confirmed to have the **OWNER** role, and the Git integration can find this repository. Nevertheless, the tool returned `403 Forbidden: You don't have permission to create the project` even when given the valid project name and explicit team ID. This is **not** a confirmed source-code failure or proof the team owner lacks permission. Vercel's team authorization may require a one-time consent grant for the connector, or this may be an integration permission issue. Do not claim the deployment is live until Vercel returns a successful deployment and the URL is checked.

## Deploy through the Vercel dashboard (if the connector cannot create it)

1. Visit https://vercel.com/new/import and switch to **DIV-DEV**.
2. Choose GitHub repository **divyanshrathod35-cyber/GYM-WEBSITE-**.
3. Enter the **Project Name** `bodytech-gym`, not `GYM-WEBSITE-`.
4. Set Framework **Vite**, Root Directory `./`, Build Command `npm run build`, Output Directory `dist`, and leave Install Command automatic (or `npm install`).
5. Deploy. In the deployment page, inspect **Build Logs** if it fails. A deployment is successful only when Vercel marks it **READY**.
6. Verify on the live URL: hero/media load, 375px mobile does not overflow, mobile nav, tab/accordion focus, pricing, trial/enquiry WhatsApp route, and the warning that sample fees, trial terms, and generated images are concepts.

If the error is still 403 in the Vercel dashboard, investigate the selected team and project creation permissions, not the application build. For ChatGPT's Vercel connector specifically, use the team-access authorization generated in the active conversation; those links are single-use and expire.

### Production launch is distinct from a pitch demo
All six concept images were generated and watermarked but are **not photos of the real gym**. Prices, trial entitlements, hours and branch claims require owner approval. Keep demo noindex and clarify prototype status. An owner-approved commercial site needs a terms/brand/content review.

## Useful references
- https://vercel.com/docs/project-configuration/general-settings
- https://vercel.com/docs/projects/managing-projects
- https://vercel.com/docs/frameworks/frontend/vite
- https://vercel.com/docs/deployments/troubleshoot-a-build
- https://vercel.com/docs/rbac/access-roles

## Build verification
The source suite is `npm test`, `npm run typecheck`, and `npm run build`. The connected environment could not install dependencies on 21 November 2026 because `registry.npmjs.org` DNS lookup returned `EAI_AGAIN`, so a clean production build is **not yet independently verified**. GitHub Actions should run the checks when the repository's workflow executes; Vercel will also run the build on import.
