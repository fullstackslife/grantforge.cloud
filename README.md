# Grantforge.cloud — Upgrade Sprint (Phase 1)

## Overview
Grantforge.cloud is evolving into a federal intermediary platform, focusing on solopreneurs and small business founders. Phase 1 upgrades include repo re-architecture, new pricing model, landing page overhaul, AI copilot hooks, and lead funnel integration.

## Repo Structure
```
core/         # Grant scrapers + dispatchers
backend/      # FastAPI, Discord OAuth, Supabase logging, job queues
frontend/     # Vite/Next.js app (test.grantforge.cloud)
copilots/     # LLM tools: scraper, writer, matcher
integrations/ # Webhooks: Zapier, Notion, Tana.so
assesment/    # Sprint docs, checklists, process notes
```

## Pricing Model
See [assesment/pricing.md](assesment/pricing.md) and `/pricing` UI for details.

## Deployment Target
- **Staging Only:** https://test.grantforge.cloud
- All work on `staging/` branch, with `IS_STAGING=true`
- Fullstacks.us handles DNS, SSL, hosting

## Sprint Objectives
- Upgrade repo structure for modularity and scale
- Add incubator pricing tiers
- Overhaul landing page for new positioning
- Integrate AI copilot hooks (core grant workflows)
- Set up Discord/Supabase lead funnel and API webhooks

## Future Phases
- Proposal Template Generator UI
- AI Grant Navigator Copilot
- CRM integrations (Notion, HubSpot, Tana.so)
- Org-scale onboarding flows

## Contact
For deployment and infra: Fullstacks.us  
For product and sprint: Grantforge.cloud team
