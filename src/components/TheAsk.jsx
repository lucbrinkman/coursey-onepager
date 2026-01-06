import { Link } from 'react-router-dom'
import { askSection } from '../../textContent'
import { TOTAL_BUDGET } from './TeamCosts'

// Calculate 1/3 of annual budget (4 months runway)
const fundingAsk = Math.round(TOTAL_BUDGET / 3)

function formatUsd(value) {
  return '$' + value.toLocaleString('en-US')
}

export default function TheAsk() {
  return (
    <section className="py-16">
      <h2 className="text-2xl font-semibold text-center mb-8 text-gray-900">
        {askSection.sectionTitle}
      </h2>
      <div className="text-center">
        <div className="text-6xl font-bold text-gray-900">
          {formatUsd(fundingAsk)}
        </div>
        <div className="mt-3 text-lg text-gray-600">
          4 months runway for 2 founders plus some contract work
        </div>
      </div>
      <p className="mt-6 text-center text-gray-500 max-w-lg mx-auto">
        {askSection.contextLine}
      </p>
      <p className="mt-4 text-center">
        <Link to="/team-costs" className="text-blue-600 hover:underline">
          See cost breakdown →
        </Link>
      </p>
    </section>
  )
}
