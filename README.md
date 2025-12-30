# Visionary AI CMS

A custom content management system for Visionary AI, built with Next.js 14, Supabase, and Tailwind CSS. Features a beautiful dark theme with gold accents matching the Visionary AI brand.

![Visionary AI CMS](https://visionaryai.life/og-image.jpg)

## Features

- 📝 **Block-based Page Editor** - Hero sections, text, images, FAQs, CTAs, and more
- 🎨 **On-brand Design** - Dark navy theme with gold accents
- 👥 **Multi-user Support** - Admin and Editor roles
- 🔒 **Secure Authentication** - Email/password login via Supabase Auth
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🚀 **Fast & SEO Optimized** - Next.js 14 with server-side rendering
- ✍️ **Rich Text Editing** - Tiptap editor with formatting toolbar

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Rich Text:** Tiptap
- **Deployment:** Vercel

---

## 🚀 Deployment Guide

### Prerequisites

- GitHub account (connected to Vercel)
- Vercel account
- Supabase account (free tier works)
- GoDaddy domain access (for DNS configuration)

---

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **"New Project"**
3. Fill in:
   - **Name:** `visionary-cms`
   - **Database Password:** (save this somewhere safe)
   - **Region:** Choose closest to your users
4. Click **"Create new project"** and wait for setup (~2 minutes)

---

### Step 2: Set Up Database Schema

1. In your Supabase project, go to **SQL Editor**
2. Click **"New query"**
3. Copy the entire contents of `supabase/schema.sql` and paste it
4. Click **"Run"** (or press Cmd/Ctrl + Enter)
5. You should see "Success. No rows returned" — this is correct!

---

### Step 3: Create Your Admin User

1. In Supabase, go to **Authentication** > **Users**
2. Click **"Add user"** > **"Create new user"**
3. Enter:
   - **Email:** your email address
   - **Password:** a strong password
   - ✅ Check "Auto Confirm User"
4. Click **"Create user"**
5. Go back to **SQL Editor** and run:

```sql
UPDATE public.users 
SET role = 'admin' 
WHERE email = 'YOUR_EMAIL_HERE';
```

---

### Step 4: Get Supabase API Keys

1. In Supabase, go to **Settings** > **API**
2. Copy these values (you'll need them for Vercel):
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

---

### Step 5: Push Code to GitHub

1. Create a new repository on GitHub:
   - Go to github.com → **New repository**
   - Name: `visionary-cms`
   - Keep it **Private** (recommended)
   - Don't initialize with README

2. Push this code to your new repo:

```bash
cd visionary-cms
git init
git add .
git commit -m "Initial commit - Visionary CMS"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/visionary-cms.git
git push -u origin main
```

---

### Step 6: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New..."** > **"Project"**
3. Find and import your `visionary-cms` repository
4. Configure project:
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (leave default)
5. Add **Environment Variables** (click "Environment Variables" to expand):

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key |

6. Click **"Deploy"**
7. Wait for deployment (~2-3 minutes)

---

### Step 7: Configure Custom Domain (Subdomain)

#### In Vercel:

1. Go to your project **Settings** > **Domains**
2. Add domain: `pages.visionaryai.life`
3. Vercel will show you DNS records to add

#### In GoDaddy DNS:

1. Log in to GoDaddy → **My Products** → Find your domain → **DNS**
2. Add a **CNAME record**:
   - **Type:** CNAME
   - **Name:** `pages`
   - **Value:** `cname.vercel-dns.com`
   - **TTL:** 600 (or default)
3. Click **Save**
4. Wait 5-30 minutes for DNS propagation

#### Verify in Vercel:

1. Go back to Vercel **Domains** settings
2. The domain should show ✅ "Valid Configuration"
3. Your CMS is now live at `https://pages.visionaryai.life`

---

## 📖 Usage Guide

### Accessing the Admin Panel

1. Go to `https://pages.visionaryai.life/admin`
2. Log in with your email/password
3. You'll see the dashboard

### Creating a Page

1. Click **"Create Page"** or go to **Pages** > **"Create Page"**
2. Enter a **title** (slug auto-generates)
3. Add content blocks:
   - **Hero** - Large headline section
   - **Text** - Rich text with formatting
   - **Heading** - Section headers (H1-H4)
   - **Image** - Images with captions
   - **FAQ** - Expandable Q&A sections
   - **Quote** - Blockquotes with attribution
   - **CTA** - Call-to-action buttons
   - **List** - Bullet, numbered, or check lists
   - **Divider** - Visual separators

4. Configure **SEO** settings (meta description, OG image)
5. Click **"Save"** (saves as draft) or **"Publish"**

### Page URLs

Published pages are available at:
```
https://pages.visionaryai.life/[slug]
```

For example, the Communication Consent page would be:
```
https://pages.visionaryai.life/communication-consent
```

---

## 🔧 Adding More Users

### Invite a New Editor

1. In Supabase **Authentication** > **Users** > **Add user**
2. Enter their email and a temporary password
3. They'll be created as an **Editor** by default
4. Share login credentials with them

### Promote to Admin

Run in SQL Editor:
```sql
UPDATE public.users 
SET role = 'admin' 
WHERE email = 'user@example.com';
```

---

## 🛠 Local Development

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Fill in your Supabase credentials in .env.local

# Run development server
npm run dev

# Open http://localhost:3000
```

---

## 📁 Project Structure

```
visionary-cms/
├── src/
│   ├── app/
│   │   ├── admin/           # Admin panel pages
│   │   │   ├── login/       # Login page
│   │   │   ├── pages/       # Page management
│   │   │   └── layout.tsx   # Admin layout with sidebar
│   │   ├── (public)/        # Public-facing pages
│   │   │   └── [slug]/      # Dynamic page routes
│   │   ├── globals.css      # Global styles
│   │   └── layout.tsx       # Root layout
│   ├── components/
│   │   ├── BlockEditor.tsx  # Page content editor
│   │   ├── BlockRenderer.tsx # Public page renderer
│   │   └── RichTextEditor.tsx # Tiptap rich text
│   ├── lib/
│   │   ├── supabase.ts      # Supabase client
│   │   └── utils.ts         # Helper functions
│   └── types/
│       └── index.ts         # TypeScript types
├── supabase/
│   └── schema.sql           # Database schema
├── public/                  # Static assets
├── .env.example             # Environment template
└── README.md
```

---

## 🎨 Brand Colors

The CMS uses Visionary AI's brand colors:

| Color | Hex | Usage |
|-------|-----|-------|
| Dark | `#1a1a2e` | Primary background |
| Darker | `#16162a` | Secondary background |
| Gold | `#c9a962` | Accent, buttons, highlights |
| Gold Light | `#d4bc7a` | Hover states |
| Teal | `#4A90A4` | Links, secondary actions |
| Text Primary | `#ffffff` | Headings, important text |
| Text Secondary | `#a0a0b0` | Body text |

---

## 📞 Support

For questions or issues:
- Email: support@visionaryai.life
- Create an issue on GitHub

---

## License

Proprietary - Visionary AI Systems, Inc.
