import React, { useState, useEffect, useRef } from 'react'
import { ChevronDown, ArrowRight } from 'lucide-react'
import { useExpand } from './ExpandContext'
import { theoryOfChangeSection, ui } from '../../textContent'
import FormattedText from './FormattedText'

function StepCard({ step, isOpen, onToggle }) {
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

  const hasDetail = !!step.detail

  return (
    <div
      className={`bg-gray-50 rounded-lg p-4 h-full ${hasDetail ? 'cursor-pointer' : ''}`}
      onClick={hasDetail ? onToggle : undefined}
    >
      <h3 className="font-medium text-gray-900 text-sm text-center">{step.label}</h3>
      {hasDetail && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); onToggle(); }}
            className="flex items-center justify-center gap-1 mt-2 text-xs text-gray-500 hover:text-gray-700 transition-colors cursor-pointer w-full"
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
        </>
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
        {/* Desktop: horizontal chain with equal-width columns */}
        <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-start gap-2">
          {theoryOfChangeSection.steps.map((step, i) => (
            <React.Fragment key={i}>
              <StepCard
                step={step}
                isOpen={openItems[`step-${i}`]}
                onToggle={() => toggle(`step-${i}`)}
              />
              {i < theoryOfChangeSection.steps.length - 1 && (
                <ArrowRight size={20} className="text-gray-400 mt-4 shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Mobile: vertical chain */}
        <div className="md:hidden space-y-3">
          {theoryOfChangeSection.steps.map((step, i) => {
            const hasDetail = !!step.detail
            return (
            <div key={i}>
              <div
                className={`bg-gray-50 rounded-lg p-4 ${hasDetail ? 'cursor-pointer' : ''}`}
                onClick={hasDetail ? () => toggle(`step-${i}`) : undefined}
              >
                <h3 className="font-medium text-gray-900">{step.label}</h3>
                {step.detail && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggle(`step-${i}`); }}
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
                  </>
                )}
              </div>
              {i < theoryOfChangeSection.steps.length - 1 && (
                <div className="flex justify-center py-2">
                  <ArrowRight size={20} className="text-gray-400 rotate-90" />
                </div>
              )}
            </div>
          )})}
        </div>
      </div>
    </section>
  )
}
