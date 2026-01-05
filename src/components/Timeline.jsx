import { useState, useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { useExpand } from './ExpandContext'
import { timelineSection, ui } from '../../textContent'
import FormattedText from './FormattedText'

function TimelineItem({ item, isOpen, onToggle }) {
  const contentRef = useRef(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current) {
        setHeight(contentRef.current.scrollHeight)
      }
    }

    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [item.detail])

  return (
    <div className="flex items-start gap-3 py-3">
      <div className={`w-3 h-3 rounded-full mt-1.5 shrink-0 ${
        item.past ? 'bg-gray-900' : 'border-2 border-gray-400 bg-white'
      }`} />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">{item.date}</span>
          <span className="font-medium text-gray-900">{item.label}</span>
        </div>
        <button
          onClick={onToggle}
          className="flex items-center gap-1 mt-1 text-sm text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
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
          <div ref={contentRef} className="pt-2 pb-1 text-sm text-gray-600 whitespace-pre-line">
            <FormattedText>{item.detail}</FormattedText>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Timeline() {
  const { expandAll } = useExpand()
  const [openItems, setOpenItems] = useState({})

  useEffect(() => {
    if (expandAll) {
      const allOpen = {}
      timelineSection.mainMilestones.forEach((_, i) => allOpen[`main-${i}`] = true)
      timelineSection.branches.forEach((_, i) => allOpen[`branch-${i}`] = true)
      setOpenItems(allOpen)
    } else {
      setOpenItems({})
    }
  }, [expandAll])

  const toggle = (id) => {
    setOpenItems(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <section className="py-16">
      <h2 className="text-2xl font-semibold text-center mb-8 text-gray-900">
        {timelineSection.sectionTitle}
      </h2>

      <div className="max-w-2xl mx-auto px-4">
        {/* Main timeline */}
        <div className="border-l-2 border-gray-200 ml-1.5">
          {timelineSection.mainMilestones.map((m, i) => (
            <div key={m.date} className="-ml-[7px]">
              <TimelineItem
                item={m}
                isOpen={openItems[`main-${i}`]}
                onToggle={() => toggle(`main-${i}`)}
              />
            </div>
          ))}
        </div>

        {/* Branches label */}
        <div className="mt-8 mb-4 text-sm font-medium text-gray-500 uppercase tracking-wide">
          {timelineSection.branchesLabel}
        </div>

        {/* Branch items */}
        <div className="border-l-2 border-gray-200 ml-1.5 border-dashed">
          {timelineSection.branches.map((b, i) => (
            <div key={b.date} className="-ml-[7px]">
              <TimelineItem
                item={{ ...b, past: false }}
                isOpen={openItems[`branch-${i}`]}
                onToggle={() => toggle(`branch-${i}`)}
              />
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex gap-6 mt-8 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-900" />
            <span>{timelineSection.legend.completed}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full border-2 border-gray-400 bg-white" />
            <span>{timelineSection.legend.upcoming}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
