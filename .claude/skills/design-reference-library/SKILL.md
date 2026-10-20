---
name: design-reference-library
description: Curated library of open-source UI component repos and premium design-inspiration galleries (buttons, forms, nav, pricing tables, landing-page/app patterns) to consult when building new sites or apps in Claude Code without Lovable. Use alongside frontend-design whenever starting new UI or short on time.
license: Internal reference list, compiled by Claude from public web research (2026-09-18) for this user's own use.
---

# Design Reference Library

This user builds real client sites (institutional sites, small-business landing pages) directly in Claude Code — Tailwind CSS + shadcn/ui + TanStack Start/Next.js is the usual stack — and no longer has a Lovable subscription to lean on for visual polish. This skill exists to close that gap: a standing list of places to pull **structural/interaction patterns** (how a working pricing table, mobile nav, or multi-step form is actually built) and **premium inspiration** (what good sites in this space look like), so the output doesn't default to generic AI-template look even without Lovable's design layer.

**Always pair this with [[frontend-design]]**, not instead of it. This skill answers "where do I look for a proven pattern," frontend-design answers "how do I make it distinctive and not generic." Pulling a component's *structure* (accessibility behavior, form validation flow, breakpoints) from these libraries is fine and encouraged; copying its *aesthetic* verbatim (same rounded-card-with-shadow kit, same accent color, same eyebrow labels) is exactly what frontend-design's calibration section warns against. Use these as engineering reference and mood research, then run the result through frontend-design's plan → critique process before shipping.

## Component / code-pattern libraries (copy-paste or shadcn-CLI compatible)

These give real, working markup for common elements — good for buttons, forms, navs, modals, pricing tables, tables, empty states:

- [shadcn/ui](https://github.com/shadcn-ui/ui) — the base library this user's projects already use (Radix + Tailwind).
- [awesome-shadcn-ui](https://github.com/birobirobiro/awesome-shadcn-ui) — curated index of every shadcn-compatible library; check here first for anything not in base shadcn.
- [Origin UI](https://github.com/shadcn/originui) — deeper primitive coverage than base shadcn (timelines, rich dialogs, advanced inputs).
- [Aceternity UI](https://ui.aceternity.com/) — Tailwind + Framer Motion effects (spotlight, mask reveal, animated tabs) — use sparingly, one moment per page per frontend-design's restraint principle, never all of them at once.
- [Magic UI](https://magicui.design/) — 150+ MIT-licensed animated components, strong for marketing/landing sections.
- [21st.dev](https://21st.dev/) — community registry of shadcn-style React/Tailwind blocks, installable via `npx shadcn`; good first stop when a specific block type is needed fast.
- [HyperUI](https://www.hyperui.dev/) — free plain HTML+Tailwind snippets (no React needed), broad coverage of marketing + application UI sections.
- [Flowbite](https://flowbite.com/) — 600+ components/templates, multi-framework.
- [Preline UI](https://preline.co/) — buttons, forms, navbars, tables; open-source core.
- [MerakiUI](https://merakiui.com/) — clean buttons/alerts/cards components.
- [PrebuiltUI](https://prebuiltui.com/components) — ready Tailwind blocks and templates.

## Inspiration galleries (aesthetic/moodboard research, filter by industry before browsing)

Use these to calibrate what "premium" looks like for the specific brief's industry — pick 2-3 sites in a similar or analogous niche, note what's actually specific to them (not just "dark + gold"), per frontend-design's grounding-in-subject-matter step. Skew US/Canada/UK for the polished, non-templated look this user is targeting:

- [Awwwards](https://www.awwwards.com/websites/) — daily award-winning sites, filterable by category (e.g. "design agencies," "portfolio").
- [Land-book](https://land-book.com/) — the deepest gallery specifically for SaaS/marketing landing pages.
- [SiteInspire](https://www.siteinspire.com/) — hand-picked, filterable by Style/Type/Subject/Platform, consistently high quality, good for restrained/editorial looks.
- [Godly](https://godly.website/) — smaller, higher bar; best for standout animation/scroll storytelling moments (use restrained per frontend-design's "one moment" rule).
- [One Page Love](https://onepagelove.com/) — single-page sites, close to this user's typical small-business site scope.
- [Lapa Ninja](https://www.lapa.ninja/) — landing pages by category/industry.
- [Httpster](https://httpster.net/) — indie/experimental, good for typography and layout ideas outside the SaaS-card default.
- [Muzli](https://muz.li/) — broad daily-updated feed including portfolios and branding.

## App UI patterns (for the app-building work planned next)

Mobbin itself is paid/gated; these give comparable real-app screen references for onboarding flows, empty states, settings screens, etc. when this user moves into building apps:

- [Screenlane](https://screenlane.com/) — free, organized by pattern (onboarding, empty state, pricing, etc.), no account needed.
- [Refero](https://refero.design/) — large library of real product screens with AI-assisted "why this works" notes.
- [Page Flows](https://pageflows.com/) — video recordings of real signup/onboarding/checkout flows (shows transitions/states a screenshot can't).
- [UX Archive](https://uxarchive.com/) — free, organized by user flow (onboarding, search, purchase) rather than by screen.

## How to use this during a build

1. Before designing, skim 2-3 relevant inspiration galleries above for the brief's actual industry (not "web design" in general) — note what's specific to that niche's visual vocabulary, per frontend-design's subject-grounding step.
2. While building specific elements (nav, form, pricing table, modal), check the component libraries above for a proven structural pattern instead of inventing markup/accessibility behavior from scratch — saves time, which is this user's main constraint.
3. Re-skin whatever is pulled to the brief's own token system (color/type/layout) from frontend-design's plan — never ship a library component in its default look.
4. When this user starts building apps (not just marketing sites), switch primary research to the App UI patterns section instead of the landing-page galleries.
