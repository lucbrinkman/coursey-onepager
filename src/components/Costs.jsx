import { useState, useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { useExpand } from './ExpandContext'
import { costsSection, ui } from '../../textContent'
import FormattedText from './FormattedText'

function CostCard({ cost, isOpen, onToggle, showAmount }) {
  const contentRef = useRef(null)
  const [height, setHeight] = useState(0)
  const hasDetail = !!cost.detail

  useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current) {
        setHeight(contentRef.current.scrollHeight)
      }
    }

    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [cost.detail])

  return (
    <div
      className={`bg-gray-50 rounded-xl p-6 flex-1 ${hasDetail ? 'cursor-pointer' : ''}`}
      onClick={hasDetail ? onToggle : undefined}
    >
      <h3 className="font-semibold text-lg text-gray-900 mb-2">{cost.headline}</h3>
      {showAmount && (
        <div className="mb-3">
          <span className="text-3xl font-bold text-gray-900">{cost.amount}</span>
          <span className="text-gray-600 ml-1">{cost.amountLabel}</span>
        </div>
      )}
      <p className="text-gray-600"><FormattedText>{cost.text}</FormattedText></p>
      {cost.detail && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); onToggle(); }}
            className="flex items-center gap-1 mt-3 text-sm text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
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
            <div ref={contentRef} className="pt-3 text-sm text-gray-600 whitespace-pre-line">
              <FormattedText>{cost.detail}</FormattedText>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default function Costs() {
  const { expandAll } = useExpand()
  const [openItems, setOpenItems] = useState({})

  useEffect(() => {
    if (expandAll) {
      setOpenItems({ fixed: true, marginal: true })
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
        {costsSection.sectionTitle}
      </h2>

      <div className="max-w-3xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6">
          <CostCard
            cost={costsSection.fixedCosts}
            isOpen={openItems.fixed}
            onToggle={() => toggle('fixed')}
            showAmount={true}
          />
          <CostCard
            cost={costsSection.marginalCosts}
            isOpen={openItems.marginal}
            onToggle={() => toggle('marginal')}
            showAmount={true}
          />
        </div>
      </div>
    </section>
  )
}
