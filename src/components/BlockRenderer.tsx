import Link from 'next/link'
import Image from 'next/image'
import type { PageBlock, HeroBlock, TextBlock, HeadingBlock, ImageBlock, CTABlock, FAQBlock, QuoteBlock, DividerBlock, ListBlock } from '@/types'

interface BlockRendererProps {
  blocks: PageBlock[]
}

export default function BlockRenderer({ blocks }: BlockRendererProps) {
  return (
    <div className="space-y-12">
      {blocks.map((block) => (
        <RenderBlock key={block.id} block={block} />
      ))}
    </div>
  )
}

function RenderBlock({ block }: { block: PageBlock }) {
  switch (block.type) {
    case 'hero':
      return <HeroSection block={block} />
    case 'text':
      return <TextSection block={block} />
    case 'heading':
      return <HeadingSection block={block} />
    case 'image':
      return <ImageSection block={block} />
    case 'cta':
      return <CTASection block={block} />
    case 'faq':
      return <FAQSection block={block} />
    case 'quote':
      return <QuoteSection block={block} />
    case 'divider':
      return <DividerSection block={block} />
    case 'list':
      return <ListSection block={block} />
    default:
      return null
  }
}

function HeroSection({ block }: { block: HeroBlock }) {
  const { headline, subheadline, ctaText, ctaLink } = block.data
  
  return (
    <section className="py-16 md:py-24 text-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-visionary-text-primary mb-6 leading-tight">
        {headline.split(' ').map((word, i) => (
          <span key={i} className={i % 3 === 1 ? 'gold-text' : ''}>
            {word}{' '}
          </span>
        ))}
      </h1>
      {subheadline && (
        <p className="text-lg md:text-xl text-visionary-text-secondary max-w-2xl mx-auto mb-8">
          {subheadline}
        </p>
      )}
      {ctaText && ctaLink && (
        <Link href={ctaLink} className="btn-primary text-lg">
          {ctaText}
        </Link>
      )}
    </section>
  )
}

function TextSection({ block }: { block: TextBlock }) {
  return (
    <section className="prose prose-invert prose-lg max-w-none">
      <div 
        dangerouslySetInnerHTML={{ __html: block.data.content }}
        className="text-visionary-text-secondary leading-relaxed [&>h1]:text-visionary-text-primary [&>h2]:text-visionary-text-primary [&>h3]:text-visionary-text-primary [&>h1]:font-serif [&>h2]:font-serif [&>h3]:font-serif [&>a]:text-visionary-teal [&>blockquote]:border-visionary-gold [&>blockquote]:text-visionary-text-secondary"
      />
    </section>
  )
}

function HeadingSection({ block }: { block: HeadingBlock }) {
  const { text, level } = block.data
  const Tag = `h${level}` as keyof JSX.IntrinsicElements
  
  const sizeClasses = {
    1: 'text-4xl md:text-5xl',
    2: 'text-3xl md:text-4xl',
    3: 'text-2xl md:text-3xl',
    4: 'text-xl md:text-2xl',
  }
  
  return (
    <Tag className={`${sizeClasses[level]} font-serif font-bold text-visionary-text-primary`}>
      {text}
    </Tag>
  )
}

function ImageSection({ block }: { block: ImageBlock }) {
  const { src, alt, caption } = block.data
  
  return (
    <figure className="my-8">
      <div className="relative aspect-video rounded-xl overflow-hidden bg-visionary-surface">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>
      {caption && (
        <figcaption className="text-center text-sm text-visionary-text-muted mt-4">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

function CTASection({ block }: { block: CTABlock }) {
  const { headline, description, primaryButtonText, primaryButtonLink, secondaryButtonText, secondaryButtonLink } = block.data
  
  return (
    <section className="bg-visionary-surface border border-visionary-border rounded-2xl p-8 md:p-12 text-center">
      <h2 className="text-2xl md:text-3xl font-serif font-bold text-visionary-text-primary mb-4">
        {headline}
      </h2>
      {description && (
        <p className="text-visionary-text-secondary max-w-xl mx-auto mb-8">
          {description}
        </p>
      )}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {primaryButtonText && primaryButtonLink && (
          <Link href={primaryButtonLink} className="btn-primary">
            {primaryButtonText}
          </Link>
        )}
        {secondaryButtonText && secondaryButtonLink && (
          <Link href={secondaryButtonLink} className="btn-secondary">
            {secondaryButtonText}
          </Link>
        )}
      </div>
    </section>
  )
}

function FAQSection({ block }: { block: FAQBlock }) {
  const { title, items } = block.data
  
  return (
    <section>
      {title && (
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-visionary-text-primary mb-8">
          {title}
        </h2>
      )}
      <div className="space-y-4">
        {items.map((item, index) => (
          <details 
            key={index}
            className="group bg-visionary-surface border border-visionary-border rounded-xl overflow-hidden"
          >
            <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
              <span className="font-semibold text-visionary-text-primary pr-4">
                {item.question}
              </span>
              <span className="text-visionary-gold group-open:rotate-180 transition-transform">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </summary>
            <div className="px-6 pb-6 text-visionary-text-secondary">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}

function QuoteSection({ block }: { block: QuoteBlock }) {
  const { text, attribution, style } = block.data
  
  return (
    <blockquote className={`
      border-l-4 border-visionary-gold pl-6 py-4 my-8
      ${style === 'highlight' ? 'bg-visionary-gold/5 rounded-r-xl pr-6' : ''}
    `}>
      <p className="text-xl md:text-2xl text-visionary-text-primary italic font-serif leading-relaxed">
        "{text}"
      </p>
      {attribution && (
        <cite className="block mt-4 text-visionary-text-muted not-italic">
          — {attribution}
        </cite>
      )}
    </blockquote>
  )
}

function DividerSection({ block }: { block: DividerBlock }) {
  const { style } = block.data
  
  if (style === 'space') {
    return <div className="h-8" />
  }
  
  if (style === 'dots') {
    return (
      <div className="flex justify-center gap-2 py-8">
        <span className="w-2 h-2 bg-visionary-gold rounded-full" />
        <span className="w-2 h-2 bg-visionary-gold/60 rounded-full" />
        <span className="w-2 h-2 bg-visionary-gold/30 rounded-full" />
      </div>
    )
  }
  
  return <hr className="border-visionary-border my-8" />
}

function ListSection({ block }: { block: ListBlock }) {
  const { style, items } = block.data
  
  const ListTag = style === 'numbered' ? 'ol' : 'ul'
  
  const getIcon = () => {
    if (style === 'check') {
      return (
        <svg className="w-5 h-5 text-visionary-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )
    }
    if (style === 'bullet') {
      return <span className="w-2 h-2 bg-visionary-gold rounded-full flex-shrink-0" />
    }
    return null
  }
  
  if (style === 'numbered') {
    return (
      <ol className="space-y-3 list-decimal list-inside text-visionary-text-secondary">
        {items.map((item, index) => (
          <li key={index} className="pl-2">
            {item}
          </li>
        ))}
      </ol>
    )
  }
  
  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3 text-visionary-text-secondary">
          {getIcon()}
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
