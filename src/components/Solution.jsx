import { solutionSection } from '../../textContent'

export default function Solution() {
  return (
    <section className="py-12 text-center">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900">
        {solutionSection.sectionTitle}
      </h2>
      <p className="text-xl text-gray-700 max-w-2xl mx-auto">
        {solutionSection.text}
      </p>
    </section>
  )
}
