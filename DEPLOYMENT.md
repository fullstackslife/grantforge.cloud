# GrantForge.cloud Deployment Checklist

## Environment Setup

- [ ] Create `.env.local` with all required variables
- [ ] Configure Vercel environment variables
- [ ] Verify environment variables in both development and production
- [ ] Test API keys and integrations locally

## Core Pages

- [ ] Homepage (`/`)
  - [ ] CTA buttons working
  - [ ] Responsive design verified
  - [ ] Loading states implemented

- [ ] Grant Discovery (`/grants`)
  - [ ] Seed data loading correctly
  - [ ] Search functionality working
  - [ ] Filters applied properly
  - [ ] `/discover` redirect working

- [ ] AI Proposal Writer (`/write`)
  - [ ] Form inputs validated
  - [ ] AI generation working
  - [ ] Error handling implemented
  - [ ] Loading states added

- [ ] Pricing Page (`/pricing`)
  - [ ] All tiers displayed
  - [ ] PayPal links working
  - [ ] Monthly/yearly toggle functional
  - [ ] Feature comparison accurate

- [ ] Account Page (`/account`)
  - [ ] Profile display working
  - [ ] Usage stats showing
  - [ ] Plan information correct
  - [ ] Upgrade flow functional

## API Routes

- [ ] Lead Capture (`/api/lead`)
  - [ ] HubSpot integration working
  - [ ] Brevo emails sending
  - [ ] Error handling implemented
  - [ ] Rate limiting configured

## Security & Performance

- [ ] Security headers configured in `vercel.json`
- [ ] API routes protected
- [ ] Environment variables secured
- [ ] Performance metrics acceptable
- [ ] Analytics tracking enabled

## Testing

- [ ] Local development working
- [ ] Build process successful
- [ ] Preview deployments working
- [ ] Production deployment verified
- [ ] All redirects functioning

## Monitoring

- [ ] Vercel Analytics enabled
- [ ] Error logging configured
- [ ] Performance monitoring active
- [ ] Usage tracking implemented

## Final Checks

- [ ] All links working
- [ ] Forms submitting correctly
- [ ] Emails sending properly
- [ ] Payments processing
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] No linting errors

## Next Steps

1. Set up Supabase authentication
2. Implement production billing
3. Add user dashboard features
4. Enable team collaboration
5. Set up automated testing 