'use client'

import { useState } from 'react'
import { 
  GripVertical, 
  Trash2, 
  ChevronDown, 
  ChevronUp,
  Type,
  Image,
  Quote,
  HelpCircle,
  Layout,
  List,
  Minus,
  MousePointer,
  Heading
} from 'lucide-react'
import RichTextEditor from './RichTextEditor'
import { cn, generateBlockId } from '@/lib/utils'
import type { PageBlock, BlockType, FAQItem } from '@/types'

interface BlockEditorProps {
  blocks: PageBlock[]
  onChange: (blocks: PageBlock[]) => void
}

const blockTypes: { type: BlockType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { type: 'hero', label: 'Hero Section', icon: Layout },
  { type: 'heading', label: 'Heading', icon: Heading },
  { type: 'text', label: 'Text Block', icon: Type },
  { type: 'image', label: 'Image', icon: Image },
  { type: 'quote', label: 'Quote', icon: Quote },
  { type: 'faq', label: 'FAQ Section', icon: HelpCircle },
  { type: 'cta', label: 'Call to Action', icon: MousePointer },
  { type: 'list', label: 'List', icon: List },
  { type: 'divider', label: 'Divider', icon: Minus },
]

export default function BlockEditor({ blocks, onChange }: BlockEditorProps) {
  const [expandedBlock, setExpandedBlock] = useState<string | null>(null)

  const addBlock = (type: BlockType) => {
    const newBlock = createEmptyBlock(type)
    onChange([...blocks, newBlock])
    setExpandedBlock(newBlock.id)
  }

  const updateBlock = (id: string, data: any) => {
    onChange(blocks.map(block => 
      block.id === id ? { ...block, data } : block
    ))
  }

  const removeBlock = (id: string) => {
    onChange(blocks.filter(block => block.id !== id))
  }

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newBlocks = [...blocks]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    
    if (targetIndex < 0 || targetIndex >= blocks.length) return
    
    [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]]
    onChange(newBlocks.map((block, i) => ({ ...block, order: i })))
  }

  return (
    <div className="space-y-4">
      {/* Block List */}
      <div className="space-y-3">
        {blocks.map((block, index) => (
          <div 
            key={block.id}
            className="border border-visionary-border rounded-lg bg-visionary-surface overflow-hidden"
          >
            {/* Block Header */}
            <div 
              className="flex items-center gap-3 p-4 bg-visionary-surface-elevated cursor-pointer"
              onClick={() => setExpandedBlock(expandedBlock === block.id ? null : block.id)}
            >
              <GripVertical className="w-5 h-5 text-visionary-text-muted cursor-grab" />
              
              <div className="flex-1">
                <span className="font-medium text-visionary-text-primary capitalize">
                  {block.type.replace('-', ' ')}
                </span>
                {block.type === 'heading' && (
                  <span className="text-sm text-visionary-text-muted ml-2">
                    {(block.data as any)?.text?.slice(0, 30) || 'Empty heading'}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); moveBlock(index, 'up') }}
                  disabled={index === 0}
                  className="p-1.5 text-visionary-text-muted hover:text-visionary-text-primary disabled:opacity-30 rounded"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); moveBlock(index, 'down') }}
                  disabled={index === blocks.length - 1}
                  className="p-1.5 text-visionary-text-muted hover:text-visionary-text-primary disabled:opacity-30 rounded"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeBlock(block.id) }}
                  className="p-1.5 text-visionary-text-muted hover:text-red-400 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Block Content Editor */}
            {expandedBlock === block.id && (
              <div className="p-4 border-t border-visionary-border">
                <BlockContentEditor 
                  block={block} 
                  onUpdate={(data) => updateBlock(block.id, data)} 
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Block Menu */}
      <div className="border-2 border-dashed border-visionary-border rounded-lg p-6">
        <p className="text-sm text-visionary-text-muted mb-4 text-center">Add a content block</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {blockTypes.map(({ type, label, icon: Icon }) => (
            <button
              key={type}
              type="button"
              onClick={() => addBlock(type)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-visionary-text-secondary hover:text-visionary-gold hover:bg-visionary-gold/10 border border-visionary-border hover:border-visionary-gold/30 rounded-lg transition-colors"
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// Block Content Editors for each type
function BlockContentEditor({ block, onUpdate }: { block: PageBlock; onUpdate: (data: any) => void }) {
  const data = block.data as any

  switch (block.type) {
    case 'hero':
      return (
        <div className="space-y-4">
          <div>
            <label className="label">Headline</label>
            <input
              type="text"
              value={data.headline || ''}
              onChange={(e) => onUpdate({ ...data, headline: e.target.value })}
              className="input"
              placeholder="Your amazing headline"
            />
          </div>
          <div>
            <label className="label">Subheadline</label>
            <textarea
              value={data.subheadline || ''}
              onChange={(e) => onUpdate({ ...data, subheadline: e.target.value })}
              className="input min-h-[80px]"
              placeholder="Supporting text for your headline"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">CTA Button Text</label>
              <input
                type="text"
                value={data.ctaText || ''}
                onChange={(e) => onUpdate({ ...data, ctaText: e.target.value })}
                className="input"
                placeholder="Get Started"
              />
            </div>
            <div>
              <label className="label">CTA Button Link</label>
              <input
                type="text"
                value={data.ctaLink || ''}
                onChange={(e) => onUpdate({ ...data, ctaLink: e.target.value })}
                className="input"
                placeholder="/signup"
              />
            </div>
          </div>
        </div>
      )

    case 'heading':
      return (
        <div className="space-y-4">
          <div>
            <label className="label">Heading Text</label>
            <input
              type="text"
              value={data.text || ''}
              onChange={(e) => onUpdate({ ...data, text: e.target.value })}
              className="input"
              placeholder="Section heading"
            />
          </div>
          <div>
            <label className="label">Heading Level</label>
            <select
              value={data.level || 2}
              onChange={(e) => onUpdate({ ...data, level: parseInt(e.target.value) })}
              className="input"
            >
              <option value={1}>H1 - Main Title</option>
              <option value={2}>H2 - Section Title</option>
              <option value={3}>H3 - Subsection</option>
              <option value={4}>H4 - Minor Heading</option>
            </select>
          </div>
        </div>
      )

    case 'text':
      return (
        <div>
          <label className="label">Content</label>
          <RichTextEditor
            content={data.content || ''}
            onChange={(content) => onUpdate({ ...data, content })}
            placeholder="Start writing your content..."
          />
        </div>
      )

    case 'image':
      return (
        <div className="space-y-4">
          <div>
            <label className="label">Image URL</label>
            <input
              type="text"
              value={data.src || ''}
              onChange={(e) => onUpdate({ ...data, src: e.target.value })}
              className="input"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div>
            <label className="label">Alt Text</label>
            <input
              type="text"
              value={data.alt || ''}
              onChange={(e) => onUpdate({ ...data, alt: e.target.value })}
              className="input"
              placeholder="Describe the image"
            />
          </div>
          <div>
            <label className="label">Caption (optional)</label>
            <input
              type="text"
              value={data.caption || ''}
              onChange={(e) => onUpdate({ ...data, caption: e.target.value })}
              className="input"
              placeholder="Image caption"
            />
          </div>
        </div>
      )

    case 'quote':
      return (
        <div className="space-y-4">
          <div>
            <label className="label">Quote Text</label>
            <textarea
              value={data.text || ''}
              onChange={(e) => onUpdate({ ...data, text: e.target.value })}
              className="input min-h-[100px]"
              placeholder="Enter the quote..."
            />
          </div>
          <div>
            <label className="label">Attribution (optional)</label>
            <input
              type="text"
              value={data.attribution || ''}
              onChange={(e) => onUpdate({ ...data, attribution: e.target.value })}
              className="input"
              placeholder="— Author Name"
            />
          </div>
        </div>
      )

    case 'faq':
      return <FAQEditor items={data.items || []} onUpdate={(items) => onUpdate({ ...data, items })} />

    case 'cta':
      return (
        <div className="space-y-4">
          <div>
            <label className="label">Headline</label>
            <input
              type="text"
              value={data.headline || ''}
              onChange={(e) => onUpdate({ ...data, headline: e.target.value })}
              className="input"
              placeholder="Ready to get started?"
            />
          </div>
          <div>
            <label className="label">Description</label>
            <textarea
              value={data.description || ''}
              onChange={(e) => onUpdate({ ...data, description: e.target.value })}
              className="input min-h-[80px]"
              placeholder="Supporting text..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Primary Button Text</label>
              <input
                type="text"
                value={data.primaryButtonText || ''}
                onChange={(e) => onUpdate({ ...data, primaryButtonText: e.target.value })}
                className="input"
                placeholder="Get Started"
              />
            </div>
            <div>
              <label className="label">Primary Button Link</label>
              <input
                type="text"
                value={data.primaryButtonLink || ''}
                onChange={(e) => onUpdate({ ...data, primaryButtonLink: e.target.value })}
                className="input"
                placeholder="/signup"
              />
            </div>
          </div>
        </div>
      )

    case 'list':
      return <ListEditor items={data.items || []} style={data.style || 'bullet'} onUpdate={onUpdate} />

    case 'divider':
      return (
        <div>
          <label className="label">Divider Style</label>
          <select
            value={data.style || 'line'}
            onChange={(e) => onUpdate({ ...data, style: e.target.value })}
            className="input"
          >
            <option value="line">Line</option>
            <option value="dots">Dots</option>
            <option value="space">Space Only</option>
          </select>
        </div>
      )

    default:
      return <p className="text-visionary-text-muted">Unknown block type</p>
  }
}

// FAQ Editor Component
function FAQEditor({ items, onUpdate }: { items: FAQItem[]; onUpdate: (items: FAQItem[]) => void }) {
  const addItem = () => {
    onUpdate([...items, { question: '', answer: '' }])
  }

  const updateItem = (index: number, field: 'question' | 'answer', value: string) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    onUpdate(newItems)
  }

  const removeItem = (index: number) => {
    onUpdate(items.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="p-4 border border-visionary-border rounded-lg space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-sm font-medium text-visionary-gold">Question {index + 1}</span>
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="p-1 text-visionary-text-muted hover:text-red-400"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <input
            type="text"
            value={item.question}
            onChange={(e) => updateItem(index, 'question', e.target.value)}
            className="input"
            placeholder="Enter question..."
          />
          <textarea
            value={item.answer}
            onChange={(e) => updateItem(index, 'answer', e.target.value)}
            className="input min-h-[80px]"
            placeholder="Enter answer..."
          />
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="btn-secondary w-full"
      >
        Add FAQ Item
      </button>
    </div>
  )
}

// List Editor Component
function ListEditor({ items, style, onUpdate }: { items: string[]; style: string; onUpdate: (data: any) => void }) {
  const addItem = () => {
    onUpdate({ items: [...items, ''], style })
  }

  const updateItem = (index: number, value: string) => {
    const newItems = [...items]
    newItems[index] = value
    onUpdate({ items: newItems, style })
  }

  const removeItem = (index: number) => {
    onUpdate({ items: items.filter((_, i) => i !== index), style })
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="label">List Style</label>
        <select
          value={style}
          onChange={(e) => onUpdate({ items, style: e.target.value })}
          className="input"
        >
          <option value="bullet">Bullet Points</option>
          <option value="numbered">Numbered</option>
          <option value="check">Checkmarks</option>
        </select>
      </div>
      
      {items.map((item, index) => (
        <div key={index} className="flex gap-2">
          <input
            type="text"
            value={item}
            onChange={(e) => updateItem(index, e.target.value)}
            className="input flex-1"
            placeholder={`Item ${index + 1}`}
          />
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="p-3 text-visionary-text-muted hover:text-red-400 border border-visionary-border rounded-lg"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
      
      <button
        type="button"
        onClick={addItem}
        className="btn-secondary w-full"
      >
        Add List Item
      </button>
    </div>
  )
}

// Helper function to create empty blocks
function createEmptyBlock(type: BlockType): PageBlock {
  const base = {
    id: generateBlockId(),
    type,
    order: 0,
  }

  switch (type) {
    case 'hero':
      return { ...base, type: 'hero', data: { headline: '', subheadline: '', ctaText: '', ctaLink: '' } }
    case 'heading':
      return { ...base, type: 'heading', data: { text: '', level: 2 } }
    case 'text':
      return { ...base, type: 'text', data: { content: '' } }
    case 'image':
      return { ...base, type: 'image', data: { src: '', alt: '' } }
    case 'quote':
      return { ...base, type: 'quote', data: { text: '', attribution: '' } }
    case 'faq':
      return { ...base, type: 'faq', data: { items: [] } }
    case 'cta':
      return { ...base, type: 'cta', data: { headline: '', description: '', primaryButtonText: '', primaryButtonLink: '' } }
    case 'list':
      return { ...base, type: 'list', data: { items: [], style: 'bullet' } }
    case 'divider':
      return { ...base, type: 'divider', data: { style: 'line' } }
    default:
      return { ...base, type: 'text', data: { content: '' } }
  }
}
