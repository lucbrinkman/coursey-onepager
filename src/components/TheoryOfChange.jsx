import { useState, useEffect, useRef } from 'react'
import { ChevronDown, ArrowRight } from 'lucide-react'
import { useExpand } from './ExpandContext'
import { theoryOfChangeSection, ui } from '../../textContent'
import FormattedText from './FormattedText'

function StepCard({ step, isOpen, onToggle, isLast }) {
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
  }, [step.detail])

  return (
    <div className="flex items-center">
      <div className="bg-gray-50 rounded-lg p-4 flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 text-sm">{step.label}</h3>
        <button
          onClick={onToggle}
          className="flex items-center gap-1 mt-2 text-xs text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
        >
          <ChevronDown
            size={14}
            className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
          {isOpen ? ui.less : ui.more}
        </button>
        <div
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: isOpen ? `${height}px` : '0px' }}
        >
          <div ref={contentRef} className="pt-2 text-xs text-gray-600 whitespace-pre-line">
            <FormattedText>{step.detail}</FormattedText>
          </div>
        </div>
      </div>
      {!isLast && (
        <ArrowRight size={20} className="text-gray-400 mx-2 shrink-0" />
      )}
    </div>
  )
}

export default function TheoryOfChange() {
  const { expandAll } = useExpand()
  const [openItems, setOpenItems] = useState({})

  useEffect(() => {
    if (expandAll) {
      const allOpen = {}
      theoryOfChangeSection.steps.forEach((_, i) => allOpen[`step-${i}`] = true)
      setOpenItems(allOpen)
    } else {
      setOpenItems({})
    }
  }, [expandAll])

  const toggle = (id) => {
    setOpenItems(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <section className="py-12">
      <h2 className="text-2xl font-semibold text-center mb-8 text-gray-900">
        {theoryOfChangeSection.sectionTitle}
      </h2>

      <div className="max-w-4xl mx-auto px-4">
        {/* Desktop: horizontal chain */}
        <div className="hidden md:flex items-start justify-between gap-2">
          {theoryOfChangeSection.steps.map((step, i) => (
            <StepCard
              key={i}
              step={step}
              isOpen={openItems[`step-${i}`]}
              onToggle={() => toggle(`step-${i}`)}
              isLast={i === theoryOfChangeSection.steps.length - 1}
            />
          ))}
        </div>

        {/* Mobile: vertical chain */}
        <div className="md:hidden space-y-3">
          {theoryOfChangeSection.steps.map((step, i) => (
            <div key={i}>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900">{step.label}</h3>
                <button
                  onClick={() => toggle(`step-${i}`)}
                  className="flex items-center gap-1 mt-2 text-sm text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                >
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${openItems[`step-${i}`] ? 'rotate-180' : ''}`}
                  />
                  {openItems[`step-${i}`] ? ui.less : ui.more}
                </button>
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ maxHeight: openItems[`step-${i}`] ? '100px' : '0px' }}
                >
                  <div className="pt-2 text-sm text-gray-600">
                    {step.detail}
                  </div>
                </div>
              </div>
              {i < theoryOfChangeSection.steps.length - 1 && (
                <div className="flex justify-center py-2">
                  <ArrowRight size={20} className="text-gray-400 rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
