# HugoLabs website

A React and TypeScript website for HugoLabs, built with Vite. It includes the main marketing pages, project examples, a price calculator, and a contact form that opens the visitor's email app.

## Commands

```bash
npm install
npm run dev
npm run typecheck
npm run lint
npm run test
npm run build
```

## Architecture

- `src/components/sections`: home page sections
- `src/components/pricing`: interactive estimate builder
- `src/config`: company details and all editable pricing rules
- `src/utils/calculateEstimate.ts`: pure, cents-based pricing logic
- `src/data/projects.ts`: centrally managed concept portfolio content
- `src/styles`: design tokens, layout, responsive rules, and motion fallbacks

All public prices live in `src/config/pricing.ts` as integer cents. Frontend estimates are illustrative and must not be treated as authoritative payment totals.

## Hosting eligibility

The Website Launch Package is requestable only for website projects. The interface marks simple static-oriented configurations as potentially eligible and flags advanced complexity, authentication, dashboards, or e-commerce for manual review. A database or API selection alone does not automatically disqualify a project because a static frontend may still use an external service.

Domain availability is not checked. `domainPriceCap: null` means no public fixed cap is configured. It does not mean unlimited coverage. First-year domain and static hosting coverage always require HugoLabs confirmation. Renewals may cost extra.

## Contact behavior

There is no form backend. Contact and quote actions create transparent, prefilled `mailto:` messages, and the pricing summary can be copied to the clipboard as a fallback. The interface never claims that a message was sent.
