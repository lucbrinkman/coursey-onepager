import { Info } from 'lucide-react'
import { useState } from 'react'

export default function InfoTooltip({ content }) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <span
      className="relative inline-block ml-1 group"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <span className="inline-flex items-center justify-center p-2 -m-2 cursor-help">
        <Info
          size={18}
          className="text-gray-400 group-hover:text-gray-600 transition-colors translate-y-0.5"
        />
      </span>
      {isVisible && (
        <span className="absolute z-10 w-64 p-3 text-sm bg-gray-900 text-white rounded-lg shadow-lg -top-2 left-8">
          {content}
          <span className="absolute w-2 h-2 bg-gray-900 rotate-45 top-3 -left-1" />
        </span>
      )}
    </span>
  )
}
