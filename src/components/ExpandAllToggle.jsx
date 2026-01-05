import { useExpand } from './ExpandContext'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function ExpandAllToggle() {
  const { expandAll, setExpandAll } = useExpand()

  return (
    <div className="flex justify-end max-w-6xl mx-auto px-4 py-4">
      <button
        onClick={() => setExpandAll(!expandAll)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      >
        {expandAll ? (
          <>
            <ChevronUp size={16} />
            Collapse all
          </>
        ) : (
          <>
            <ChevronDown size={16} />
            Expand all
          </>
        )}
      </button>
    </div>
  )
}
