# Grantforge Upgrade Sprint (Phase 1) — Assessment & Checklist

## Objective
Upgrade Grantforge.cloud to a public grant incubator and federal intermediary for solopreneurs and small business founders.

## Scope
- Repo re-architecture (core, backend, frontend, copilots, integrations)
- Pricing model (incubator tiers, payment flow)
- Landing page overhaul
- AI copilot system integration
- Lead funnel (Discord, Supabase, API webhooks)
- Staging-only deployment

## Checklist

- [ ] Monorepo restructured (core/, backend/, frontend/, copilots/, integrations/)
- [ ] pricing.md created, /pricing UI implemented
- [ ] /pay route (Stripe/mock) working
- [ ] /landing.tsx implemented (new hero, use cases, CTA)
- [ ] grant_scraper.py, proposal_writer.py, agency_matcher.py set up in copilots/
- [ ] Discord OAuth → Supabase sync tested
- [ ] /api/lead webhook live for Zapier/TikTok/Discord forms
- [ ] IS_STAGING=true respected in all configs
- [ ] All work tracked in staging/ branch
- [ ] DNS, SSL, hosting confirmed by Fullstacks.us

## Notes
- Only deploy to https://test.grantforge.cloud during this sprint
- All test data/users isolated
- Future phases to follow after staging sign-off

---

**Team:**  
- Product: Grantforge.cloud  
- Infra: Fullstacks.us

**Last updated:** 2025-07-12
