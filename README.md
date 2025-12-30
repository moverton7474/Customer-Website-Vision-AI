# Visionary AI CMS

A custom content management system for Visionary AI, built with Next.js 14, Supabase, and Tailwind CSS.

## Features

- 📝 Block-based Page Editor
- 🎨 On-brand Dark Theme with Gold Accents
- 👥 Multi-user Support (Admin/Editor roles)
- 🔒 Secure Authentication via Supabase
- 📱 Responsive Design
- 🚀 Fast & SEO Optimized

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env.local` and fill in your Supabase credentials
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key |

## Deployment

This project is configured for deployment on Vercel:

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

## License

Proprietary - Visionary AI Systems, Inc.
