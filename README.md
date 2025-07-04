# GrantForge.cloud

GrantForge is an AI-powered platform that helps businesses and organizations discover, apply for, and win grants.

## Features

- **Grant Discovery**: Find relevant grants based on your organization's profile
- **AI Grant Writer**: Generate professional grant proposals using our advanced AI engine
- **Grant Tracking**: Monitor application status and deadlines
- **Team Collaboration**: Work together on grant applications
- **Analytics**: Track success rates and optimize your grant strategy
- **Pricing Page**: Compare plans and subscribe via PayPal
- **Account Page**: View plan, usage, and account details

## Tech Stack

- Next.js 14
- TypeScript
- TailwindCSS
- Prisma
- PostgreSQL
- Our proprietary AI engine
- PayPal for payments (MVP; Stripe planned for future)
- Brevo (Sendinblue) for transactional email
- Supabase for user/session management (planned)

## Main Pages

- `/` — Homepage
- `/grants` — Grant Discovery
- `/write` — AI Grant Writer
- `/pricing` — Pricing & Subscription
- `/account` — Account Dashboard

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```env
   DATABASE_URL=your_database_url
   AI_API_KEY=your_ai_api_key_here
   PAYPAL_PAYMENT_LINK=https://www.paypal.com/ncp/links/YWT36BXE9XVHW
   BREVO_API_KEY=your_brevo_api_key
   BREVO_TEMPLATE_ID=your_brevo_template_id
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_service_role
   HUBSPOT_API_KEY=your_hubspot_api_key
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

- `DATABASE_URL`: Your PostgreSQL database URL
- `AI_API_KEY`: Your AI engine API key
- `PAYPAL_PAYMENT_LINK`: Your PayPal payment link for subscriptions
- `BREVO_API_KEY`: Brevo (Sendinblue) API key for transactional email
- `BREVO_TEMPLATE_ID`: Brevo template ID for welcome emails
- `SUPABASE_URL`: Supabase project URL (for future user management)
- `SUPABASE_KEY`: Supabase service role key
- `HUBSPOT_API_KEY`: HubSpot API key for lead capture

## Troubleshooting

- If you see `Module not found: Can't resolve '@/components/...'`, ensure your `tsconfig.json` includes:
  ```json
  "paths": {
    "@/*": ["./*"]
  }
  ```
  and restart your dev server after any config or file changes.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
