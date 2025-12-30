// Database types for Visionary CMS

export type UserRole = 'admin' | 'editor';

export interface User {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export type PageStatus = 'draft' | 'published' | 'archived';

export interface Page {
  id: string;
  slug: string;
  title: string;
  meta_description: string | null;
  og_image: string | null;
  status: PageStatus;
  content: PageBlock[];
  created_by: string;
  updated_by: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  created_by_user?: User;
  updated_by_user?: User;
}

export type BlockType = 
  | 'hero'
  | 'text'
  | 'heading'
  | 'image'
  | 'cta'
  | 'faq'
  | 'quote'
  | 'divider'
  | 'columns'
  | 'list';

export interface BaseBlock {
  id: string;
  type: BlockType;
  order: number;
}

export interface HeroBlock extends BaseBlock {
  type: 'hero';
  data: {
    headline: string;
    subheadline?: string;
    backgroundImage?: string;
    ctaText?: string;
    ctaLink?: string;
    alignment?: 'left' | 'center' | 'right';
  };
}

export interface TextBlock extends BaseBlock {
  type: 'text';
  data: {
    content: string; // HTML content from Tiptap
  };
}

export interface HeadingBlock extends BaseBlock {
  type: 'heading';
  data: {
    text: string;
    level: 1 | 2 | 3 | 4;
  };
}

export interface ImageBlock extends BaseBlock {
  type: 'image';
  data: {
    src: string;
    alt: string;
    caption?: string;
    width?: number;
    height?: number;
  };
}

export interface CTABlock extends BaseBlock {
  type: 'cta';
  data: {
    headline: string;
    description?: string;
    primaryButtonText: string;
    primaryButtonLink: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQBlock extends BaseBlock {
  type: 'faq';
  data: {
    title?: string;
    items: FAQItem[];
  };
}

export interface QuoteBlock extends BaseBlock {
  type: 'quote';
  data: {
    text: string;
    attribution?: string;
    style?: 'default' | 'highlight';
  };
}

export interface DividerBlock extends BaseBlock {
  type: 'divider';
  data: {
    style?: 'line' | 'dots' | 'space';
  };
}

export interface ColumnsBlock extends BaseBlock {
  type: 'columns';
  data: {
    columns: Array<{
      content: string; // HTML content
    }>;
    layout?: '2-equal' | '3-equal' | '1-2' | '2-1';
  };
}

export interface ListBlock extends BaseBlock {
  type: 'list';
  data: {
    style: 'bullet' | 'numbered' | 'check';
    items: string[];
  };
}

export type PageBlock = 
  | HeroBlock
  | TextBlock
  | HeadingBlock
  | ImageBlock
  | CTABlock
  | FAQBlock
  | QuoteBlock
  | DividerBlock
  | ColumnsBlock
  | ListBlock;

// Form types
export interface PageFormData {
  slug: string;
  title: string;
  meta_description: string;
  og_image: string;
  status: PageStatus;
  content: PageBlock[];
}

// API response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
}
