# Body Tech Gym — Sports-Editorial Redesign

A bespoke React + Vite + TypeScript pitch concept for Body Tech Gym, Rajnandgaon, created by Divex Labs.

## Run

```bash
npm install
npm run dev
npm test
npm run typecheck
npm run build
```

Preview http://localhost:5173/ after starting Vite.

## Contents
- `src/App.tsx`: editorial sections, 4-programme explorer, membership configurator, WhatsApp visit request, SVG enquiry-card download, optional fitness calculator, timetable, branch selector and FAQ.
- `src/index.css`: full bespoke responsive design with WCAG-oriented focus, readable contrast, motion alternatives and touch targets.
- `src/config/gymConfig.ts`: single owner-configurable source of business facts, locations, illustrative fees, media, hours, trial policy and cited listings.
- `src/lib/core.ts`: validation, plan pricing, BMI/energy estimates, URL encoding and pass export security.
- `public/media`: six compressed BODYTECH-watermarked AI-generated **concept** visuals, NOT genuine facility/member photography.
- `DESIGN.md`: visual hierarchy, benchmark research, motion guidelines and content integrity.

## Important for the pitch
1. Request a first visit; check validation errors, then use the WhatsApp message. No booking or trial admission is confirmed on the website.
2. Explore programme tabs and change the goal. The enquiry form preselects that goal.
3. Change the demo plan type, months and trainer toggle. Calculator rates are **not** official prices.
4. Open the optional adult-only estimator; note medical safeguards and range checks.
5. Switch location and check Google Maps directions; the gym should verify both branch listings.

## Deployment
The project is Vite-based. Configure Vercel with framework Vite, `npm run build`, `dist` as output, and root directory `/`. Link the GitHub repo for automatic deployments. This archive and README do **not** imply deployment has occurred. Leave the `noindex` metadata on until the owner authorizes a public business website; switch it only with accurate photography, official pricing/hours, and privacy/legal approvals.

## Security & data
- No user details are sent to our servers. The visitor explicitly opens a prefilled WhatsApp link.
- Inputs are validated and sanitized; downloaded SVG uses XML escaping.
- No API keys, database secrets, trackers or marketing pixels are required.
- Current UI and asset content is a pitch **concept**, not an official Body Tech Gym endorsement.
