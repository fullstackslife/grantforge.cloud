# GrantForge.cloud

An AI-powered platform helping startups and businesses discover and win grants faster.

## Features

- 🔍 Smart Grant Discovery
- ✍️ AI Grant Writing Assistant
- 📊 Application Tracking Dashboard
- 📚 Learning Resources & Templates

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- OpenAI GPT-4
- Supabase (Auth + Database)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with your environment variables:
   ```
   OPENAI_API_KEY=your_key_here
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
grantforge.cloud/
├── app/                 # Next.js app router pages
├── components/          # Reusable React components
├── lib/                 # Utility functions and API clients
├── public/             # Static assets
└── styles/             # Global styles and Tailwind config
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
