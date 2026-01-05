import { solutionSection } from '../../textContent'

export default function Solution() {
  return (
    <section className="py-8 text-center">
      <p className="text-xl text-gray-700 max-w-2xl mx-auto">
        {solutionSection.text}
      </p>
    </section>
  )
}
