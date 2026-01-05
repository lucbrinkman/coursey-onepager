import { Link } from 'react-router-dom'
import { Calculator } from 'lucide-react'
import ExpandAllToggle from './ExpandAllToggle'
import Header from './Header'
import ProblemCards from './ProblemCards'
import Solution from './Solution'
import TheoryOfChange from './TheoryOfChange'
import USPCards from './USPCards'
import Timeline from './Timeline'
import Costs from './Costs'
import TheAsk from './TheAsk'

export default function OnePager() {
  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="flex justify-between items-center max-w-6xl mx-auto px-4 py-2">
          <Link
            to="/costs"
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <Calculator size={16} />
            Cost Calculator
          </Link>
          <ExpandAllToggle inline />
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4">
        <Header />
        <ProblemCards />
        <Solution />
        <TheoryOfChange />
      </div>
      <USPCards />
      <div className="max-w-6xl mx-auto px-4">
        <Timeline />
        <Costs />
        <TheAsk />
      </div>
    </div>
  )
}
