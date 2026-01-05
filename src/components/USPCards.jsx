import { Target, Brain, Rocket } from 'lucide-react'
import ExpandableSection from './ExpandableSection'
import { uspSection } from '../../textContent'

// Map USP index to icon
const icons = [Target, Brain, Rocket]

export default function USPCards() {
  return (
    <section className="py-12 bg-gray-50">
      <h2 className="text-2xl font-semibold text-center mb-8 text-gray-900">
        {uspSection.sectionTitle}
      </h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
        {uspSection.usps.map((usp, index) => {
          const Icon = icons[index]
          return (
            <div
              key={usp.headline}
              className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-100 rounded-lg shrink-0">
                  <Icon size={24} className="text-gray-700" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900">
                  {usp.headline}
                </h3>
              </div>
              <ul className="space-y-2">
                {usp.bullets.map((bullet, i) => (
                  <li key={i} className="text-gray-600 flex items-start gap-2">
                    <span className="text-gray-400 mt-1">•</span>
                    {bullet}
                  </li>
                ))}
              </ul>
              <ExpandableSection content={usp.detail} />
            </div>
          )
        })}
      </div>
    </section>
  )
}
