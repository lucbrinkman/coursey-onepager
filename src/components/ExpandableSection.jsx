import { useState, useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { useExpand } from './ExpandContext'
import { ui } from '../../textContent'

export default function ExpandableSection({ content }) {
  const { expandAll } = useExpand()
  const [isOpen, setIsOpen] = useState(false)
  const contentRef = useRef(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    setIsOpen(expandAll)
  }, [expandAll])

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight)
    }
  }, [content])

  return (
    <div className="mt-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
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
        <div ref={contentRef} className="pt-3 pb-1 text-sm text-gray-600">
          {content}
        </div>
      </div>
    </div>
  )
}
