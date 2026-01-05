export default function TheAsk() {
  return (
    <section className="py-16">
      <h2 className="text-2xl font-semibold text-center mb-8 text-gray-900">The Ask</h2>
      <div className="flex justify-center gap-12 md:gap-24">
        <div className="text-center">
          <div className="text-5xl font-bold text-gray-900">$100k</div>
          <div className="mt-2 text-gray-600">4 months, 2 people</div>
        </div>
        <div className="text-center">
          <div className="text-5xl font-bold text-gray-900">$5</div>
          <div className="mt-2 text-gray-600">per student marginal cost</div>
        </div>
      </div>
      <p className="mt-8 text-center text-gray-500 max-w-lg mx-auto">
        Funding runway to reach full automation and first cohort at scale.
      </p>
    </section>
  )
}
