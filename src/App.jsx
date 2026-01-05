import Header from './components/Header'
import ProblemCards from './components/ProblemCards'
import Solution from './components/Solution'
import USPCards from './components/USPCards'
import Timeline from './components/Timeline'
import TheAsk from './components/TheAsk'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <Header />
        <ProblemCards />
        <Solution />
      </div>
      <USPCards />
      <div className="max-w-6xl mx-auto px-4">
        <Timeline />
        <TheAsk />
      </div>
    </div>
  )
}

export default App
