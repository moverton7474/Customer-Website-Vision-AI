export interface User {
  id: string
  email: string
  role: 'admin' | 'editor'
  created_at: string
}

export interface Page {
  id: string
  title: string
  slug: string
  content: ContentBlock[]
  status: 'draft' | 'published'
  meta_description?: string
  og_image?: string
  created_at: string
  updated_at: string
  created_by: string
}

export type BlockType = 
  | 'hero'
  | 'text'
  | 'heading'
  | 'image'
  | 'faq'
  | 'quote'
  | 'cta'
  | 'list'
  | 'divider'

export interface ContentBlock {
  id: string
  type: BlockType
  data: Record<string, unknown>
}

export interface HeroBlockData {
  title: string
  subtitle?: string
  backgroundImage?: string
  ctaText?: string
  ctaLink?: string
}

export interface TextBlockData {
  content: string
}

export interface HeadingBlockData {
  text: string
  level: 1 | 2 | 3 | 4
}

export interface ImageBlockData {
  src: string
  alt: string
  caption?: string
}

export interface FAQBlockData {
  items: Array<{
    question: string
    answer: string
  }>
}

export interface QuoteBlockData {
  text: string
  author?: string
  role?: string
}

export interface CTABlockData {
  title: string
  description?: string
  buttonText: string
  buttonLink: string
  variant: 'primary' | 'secondary'
}

export interface ListBlockData {
  style: 'bullet' | 'numbered' | 'check'
  items: string[]
}
