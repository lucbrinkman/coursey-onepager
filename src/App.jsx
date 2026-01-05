import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ExpandProvider } from './components/ExpandContext'
import OnePager from './components/OnePager'
import CostVisualization from './components/CostVisualization'

function App() {
  return (
    <BrowserRouter>
      <ExpandProvider>
        <Routes>
          <Route path="/" element={<OnePager />} />
          <Route path="/costs" element={<CostVisualization />} />
        </Routes>
      </ExpandProvider>
    </BrowserRouter>
  )
}

export default App
