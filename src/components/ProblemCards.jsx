import { Users, Compass } from 'lucide-react'
import ExpandableSection from './ExpandableSection'

const problems = [
  {
    icon: Users,
    headline: 'Too few spots',
    text: 'BlueDot had 1,450 applications for 400 spots. Most people who want to learn AI Safety can\'t get in.',
    detail: 'Demand for AI Safety education far outstrips available supply across all major programs.',
  },
  {
    icon: Compass,
    headline: 'Unclear what to do',
    text: 'People finish courses without knowing what they should actually work on, or why alignment is so hard.',
    detail: 'Current courses often focus on knowledge transfer without developing strategic thinking about career paths and impactful work.',
  },
]

export default function ProblemCards() {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-semibold text-center mb-8 text-gray-900">The Problem</h2>
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {problems.map((problem) => (
          <div
            key={problem.headline}
            className="p-6 bg-gray-50 rounded-xl border border-gray-200"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 bg-white rounded-lg shadow-sm shrink-0">
                <problem.icon size={24} className="text-gray-700" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900">
                  {problem.headline}
                </h3>
                <p className="mt-2 text-gray-600">{problem.text}</p>
                <ExpandableSection content={problem.detail} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
