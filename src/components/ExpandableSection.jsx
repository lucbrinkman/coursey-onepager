import { useState, useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { useExpand } from './ExpandContext'
import { ui } from '../../textContent'
import FormattedText from './FormattedText'

export default function ExpandableSection({ content, trigger, isOpen: controlledIsOpen, onToggle }) {
  const { expandAll } = useExpand()
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const contentRef = useRef(null)
  const [height, setHeight] = useState(0)

  // Use controlled state if provided, otherwise use internal state
  const isControlled = controlledIsOpen !== undefined
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen
  const handleToggle = isControlled ? onToggle : () => setInternalIsOpen(!internalIsOpen)

  useEffect(() => {
    if (!isControlled) {
      setInternalIsOpen(expandAll)
    }
  }, [expandAll, isControlled])

  useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current) {
        setHeight(contentRef.current.scrollHeight)
      }
    }

    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [content])

  // If no content, don't render anything
  if (!content) return null

  // If a custom trigger is provided, use inline style
  if (trigger) {
    return (
      <div>
        <button
          onClick={handleToggle}
          className="flex items-center gap-1 text-left w-full hover:bg-gray-50 rounded transition-colors cursor-pointer py-1"
          aria-expanded={isOpen}
        >
          <ChevronDown
            size={14}
            className={`shrink-0 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
          {trigger}
        </button>
        <div
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: isOpen ? `${height}px` : '0px' }}
        >
          <div ref={contentRef} className="pl-5 pt-1 pb-2 text-sm text-gray-500 whitespace-pre-line">
            <FormattedText>{content}</FormattedText>
          </div>
        </div>
      </div>
    )
  }

  // Default "More/Less" button style
  return (
    <div className="mt-3">
      <button
        onClick={(e) => { e.stopPropagation(); handleToggle(e); }}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
        aria-expanded={isOpen}
      >
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
        {isOpen ? ui.less : ui.more}
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? `${height}px` : '0px' }}
      >
        <div ref={contentRef} className="pt-3 pb-1 text-sm text-gray-600 whitespace-pre-line">
          <FormattedText>{content}</FormattedText>
        </div>
      </div>
    </div>
  )
}
