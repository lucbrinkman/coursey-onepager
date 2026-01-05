import { askSection } from '../../textContent'

export default function TheAsk() {
  return (
    <section className="py-16">
      <h2 className="text-2xl font-semibold text-center mb-8 text-gray-900">
        {askSection.sectionTitle}
      </h2>
      <div className="text-center">
        <div className="text-6xl font-bold text-gray-900">
          {askSection.fundingAsk.amount}
        </div>
        <div className="mt-3 text-lg text-gray-600">
          {askSection.fundingAsk.description}
        </div>
      </div>
      <p className="mt-6 text-center text-gray-500 max-w-lg mx-auto">
        {askSection.contextLine}
      </p>
    </section>
  )
}
