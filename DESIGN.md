# BODY TECH GYM — The Work Changes Everything
## Design and conversion decision record (2026-11-21)

### Positioning
A premium sports-editorial concept for a Rajnandgaon fitness club, not a template, dashboard, or theatrical cyberpunk gym page. The goal is to help a visitor understand the gym, choose a training direction and contact the team with minimal friction. Design ambition does not substitute for owner-verified facts.

### Research, translated into decisions
- Equinox (https://www.equinox.com/): intentional imagery, ambitious type, a single experience-led proposition. **Adaptation:** an oversized central athletic statement with a meaningful first-visit CTA; don't imitate an international club's amenities or membership promises.
- Barry's (https://www.barrys.com/first-timers): clarity for first-time visitors. **Adaptation:** a low-pressure introduction journey, one straightforward form and an explicit confirmation step. Trial is an enquiry, not a promised free offer.
- Third Space (https://www.thirdspace.london/): detail-driven premium club storytelling. **Adaptation:** long-form editorial moments and training-focused photos; no fabricated facilities or people.
- 1Rebel (https://www.1rebel.com/en-gb/clubs): crisp distinctions between training formats and local booking actions. **Adaptation:** one interactive four-format training explorer that routes to enquiry.
- Gold's Gym India (https://goldsgym.in/book-free-3-days-trial/): local market benefits from a direct trial enquiry. **Adaptation:** retain the suggested three-day introductory idea, clearly unapproved by the client.
- Nielsen Norman Group, progressive disclosure and forms: https://www.nngroup.com/articles/progressive-disclosure/ ; https://www.nngroup.com/articles/4-principles-reduce-cognitive-load/ . **Adaptation:** brief visit form; optional fitness estimator hidden until requested.
- WCAG 2.2: https://www.w3.org/TR/WCAG22/ . **Adaptation:** contrast, focus visibility, 44px+ touch controls, keyboard tabs and reduced motion support.
- Chrome web.dev: https://web.dev/articles/optimize-lcp . **Adaptation:** prioritize hero image; lazy-load supporting assets.

### Design tokens
| Purpose | Token | Intent |
| --- | --- | --- |
| Carbon | `#101111` | Composure and typographic contrast |
| Stone | `#1B1D1C` | Quiet layered surface |
| Warm bone | `#F3F0E8` | Human/editorial relief from full-dark sections |
| Paper | `#E9E5DA` | Pragmatic informational sections |
| Oxide red | `#B74230` | One disciplined athletic accent, no neon |
| Muted on dark | `#B7B7B1` | Legible supporting copy |
| Display | `Barlow Condensed`, 700–900 | Architectural/athletic with oversized but purposeful proportion |
| Body | `Plus Jakarta Sans`, 400–800 | Readable everyday information and forms |
| Spacing | 4px base, 8px increments; `--pad: clamp(22px, 5.6vw, 104px)` | Alignment and touch-space reliability |
| Grid | 12 desktop / 8 tablet / 4 phone | Responsive asymmetry with deliberate reflow |
| Control | >=44px (most 47–60px) | Touch comfort |
| Interaction | 170–190ms cubic-bezier(.22,1,.36,1) | Subtle and precise |
| Editorial reveal | ~780ms, once per section | Comfortable story pacing; disabled for reduce motion |

### Composition
01. Carbon hero: full-bleed conceptual training visual, huge three-line typographic idea, first-visit CTA. No decorative AI gradients.
02. Warm bone manifesto: human motivation and editorial portrait.
03. Carbon programme explorer: accessible 4-tab bespoke interface, one information panel.
04. Cinematic photographic interlude: restrained scroll-linked scale/position with reduced-motion alternative.
05. First-visit request: clear, owner-confirmation-aware 3-day idea and validated WhatsApp lead handoff.
06. Membership calculator: utility desk, not generic tier cards; demo-only prices.
07. Optional fitness estimator with transparent assumptions and adult-only gates.
08. Timetable inquiry ledger, NOT a fake live schedule.
09. Locations and FAQs with directional links and public-info disclaimers.
10. Oxide-red final action with monumental typography.

### Asset honesty
All six supplied BODYTECH-watermarked WebP assets are AI-generated campaign concepts and **must not be passed off as photos of the real Body Tech Gym, trainers, or customers**. Images show their watermark; screen-reader descriptions and legal details explicitly identify them as concepts. Replace with approved real shoots for a client production release.

### Motion budget / accessibility
One signature interaction: editorial scrollytelling with photo-scale parallax. Standard revealed sections use the compositor (`opacity`/`transform`). No global smooth-scroll hijack, looping velocity marquee, fake cursor, or gratuitous 3D canvas. `prefers-reduced-motion` cancels motion. Keyboard navigation, tab roles, validation errors and visible focus states are present; quantitative certification requires an independent audit on the deployed build.

### Commercial integrity
Pricing is illustrative and owner-editable, never an official tariff. Three-day visit is a requested intro concept, not a confirmed free promotion. 6 AM, locations, directory rating and offerings come from external/user-provided snapshots and require owner confirmation. No fake reviews, trainer identities or transformation photos. Contact uses the provided WhatsApp number with a message only after the user explicitly clicks to send.


### Supplemental benchmark review — Mobbin and 21st.dev (2026-11-21)
This review uses their publicly accessible articles and component documentation, not a private Mobbin account or copied design-source libraries.

- **Mobbin:** [Analysis of 1,460 onboarding flows](https://mobbin.com/blog/the-long-onboarding-a-study-of-1-460-flows) illustrates how personalization, useful outcomes, progress cues and a preview of the experience can make a complex journey coherent. That study concerns *apps* (not evidence of gym-site conversion lift). **Body Tech decision:** ask about the training goal early and reuse the answer to populate an enquiry; keep the actual contact form short. The optional health estimator stays behind progressive disclosure, not before the conversion CTA.
- **21st.dev:** [Scroll Choreography](https://dev.21st.dev/@harshjadhavconnect/components/scroll-choreography) is a four-image-to-one-image motion example; [hero gallery components](https://21st.dev/community/components/explore/hero-section-components) provide visual studies of hierarchy and motion. **Body Tech decision:** retain one bespoke image-led scroll narrative, not four generic card tiles, a copied hero package, or constant full-screen transforms. All headline text must stay readable during animation.
- **Scope and transferability:** Mobbin flows are app examples, and 21st.dev examples are community components. Neither demonstrates award-winning status, verified local conversion, or fitness-domain accessibility. Use these sources as interaction references only. No claim of proprietary access to Mobbin or license to reuse third-party component code is made.
- **Acceptance gates:** desktop/tablet/mobile layout evidence, no accidental horizontal overflow, keyboard navigation, motion reduction, LCP measured on the deployed build, and click-through checks for WhatsApp and Google Maps. Pending until an actual deployment/build environment is available.
