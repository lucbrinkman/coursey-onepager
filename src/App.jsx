import { ExpandProvider } from './components/ExpandContext'
import ExpandAllToggle from './components/ExpandAllToggle'
import Header from './components/Header'
import ProblemCards from './components/ProblemCards'
import Solution from './components/Solution'
import USPCards from './components/USPCards'
import Timeline from './components/Timeline'
import TheAsk from './components/TheAsk'

function App() {
  return (
    <ExpandProvider>
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <Header />
        </div>
        <ExpandAllToggle />
        <div className="max-w-6xl mx-auto px-4">
          <ProblemCards />
          <Solution />
        </div>
        <USPCards />
        <div className="max-w-6xl mx-auto px-4">
          <Timeline />
          <TheAsk />
        </div>
      </div>
    </ExpandProvider>
  )
}

export default App
