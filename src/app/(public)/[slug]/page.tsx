import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { createServerClient } from '@/lib/supabase'
import BlockRenderer from '@/components/BlockRenderer'
import type { Page } from '@/types'

interface PageProps {
  params: { slug: string }
}

async function getPage(slug: string): Promise<Page | null> {
  const supabase = createServerClient()
  
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error || !data) return null
  return data as Page
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = await getPage(params.slug)
  
  if (!page) {
    return {
      title: 'Page Not Found | Visionary AI',
    }
  }

  return {
    title: `${page.title} | Visionary AI`,
    description: page.meta_description || undefined,
    openGraph: {
      title: page.title,
      description: page.meta_description || undefined,
      images: page.og_image ? [{ url: page.og_image }] : undefined,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.meta_description || undefined,
      images: page.og_image ? [page.og_image] : undefined,
    },
  }
}

export default async function PublicPage({ params }: PageProps) {
  const page = await getPage(params.slug)

  if (!page) {
    notFound()
  }

  return (
    <article>
      {/* Page Title */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-visionary-text-primary">
          {page.title}
        </h1>
      </header>

      {/* Page Content */}
      <BlockRenderer blocks={page.content || []} />
    </article>
  )
}

// Generate static paths for published pages (optional, improves performance)
export async function generateStaticParams() {
  const supabase = createServerClient()
  
  const { data: pages } = await supabase
    .from('pages')
    .select('slug')
    .eq('status', 'published')

  return (pages || []).map((page) => ({
    slug: page.slug,
  }))
}
