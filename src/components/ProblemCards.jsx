import { useState, useEffect } from 'react'
import { Users, Compass } from 'lucide-react'
import ExpandableSection from './ExpandableSection'
import { useExpand } from './ExpandContext'
import { problemsSection } from '../../textContent'

// Map problem index to icon
const icons = [Users, Compass]

export default function ProblemCards() {
  const { expandAll } = useExpand()
  const [openItems, setOpenItems] = useState({})

  useEffect(() => {
    if (expandAll) {
      const allOpen = {}
      problemsSection.problems.forEach((_, i) => allOpen[i] = true)
      setOpenItems(allOpen)
    } else {
      setOpenItems({})
    }
  }, [expandAll])

  const toggle = (index) => {
    setOpenItems(prev => ({ ...prev, [index]: !prev[index] }))
  }

  return (
    <section className="py-12">
      <h2 className="text-2xl font-semibold text-center mb-8 text-gray-900">
        {problemsSection.sectionTitle}
      </h2>
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {problemsSection.problems.map((problem, index) => {
          const Icon = icons[index]
          const hasDetail = !!problem.detail
          return (
            <div
              key={problem.headline}
              className={`p-6 bg-gray-50 rounded-xl border border-gray-200 ${hasDetail ? 'cursor-pointer' : ''}`}
              onClick={hasDetail ? () => toggle(index) : undefined}
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-white rounded-lg shadow-sm shrink-0">
                  <Icon size={24} className="text-gray-700" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900">
                    {problem.headline}
                  </h3>
                  <p className="mt-2 text-gray-600">{problem.text}</p>
                  <ExpandableSection
                    content={problem.detail}
                    isOpen={openItems[index]}
                    onToggle={(e) => { e?.stopPropagation?.(); toggle(index); }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
