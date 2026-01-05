import { Target, Brain, Rocket } from 'lucide-react'
import ExpandableSection from './ExpandableSection'

const usps = [
  {
    icon: Target,
    headline: 'Focus on what matters',
    bullets: [
      'Misaligned superintelligence as the core risk',
      'Why alignment is actually hard',
      'Strategic thinking about what to work on',
    ],
    detail: 'We teach the things most likely to cause existential harm, not the politically convenient topics. Our learning outcomes include skills, not just knowledge.',
  },
  {
    icon: Brain,
    headline: 'AI-powered learning',
    bullets: [
      '1-on-1 AI tutoring for active learning',
      'Spaced repetition for retention',
      'Measured learning outcomes',
    ],
    detail: 'We follow science-informed best practices and measure outcomes to ensure real learning—not just the feeling of having learned something.',
  },
  {
    icon: Rocket,
    headline: 'Built to scale',
    bullets: [
      '$5/student marginal cost',
      'Volunteer-based facilitators',
      'Fully automated operations',
    ],
    detail: 'Humans only improve the platform—they don\'t run courses. We\'re designed to reach millions, not hundreds.',
  },
]

export default function USPCards() {
  return (
    <section className="py-12 bg-gray-50">
      <h2 className="text-2xl font-semibold text-center mb-8 text-gray-900">What Makes Us Different</h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
        {usps.map((usp) => (
          <div
            key={usp.headline}
            className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gray-100 rounded-lg shrink-0">
                <usp.icon size={24} className="text-gray-700" />
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
        ))}
      </div>
    </section>
  )
}
