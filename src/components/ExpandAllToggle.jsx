import { useExpand } from './ExpandContext'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { ui } from '../../textContent'

export default function ExpandAllToggle({ inline = false }) {
  const { expandAll, setExpandAll } = useExpand()

  const button = (
    <button
      onClick={() => setExpandAll(!expandAll)}
      className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
    >
      {expandAll ? (
        <>
          <ChevronUp size={16} />
          {ui.collapseAll}
        </>
      ) : (
        <>
          <ChevronDown size={16} />
          {ui.expandAll}
        </>
      )}
    </button>
  )

  if (inline) {
    return button
  }

  return (
    <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="flex justify-end max-w-6xl mx-auto px-4 py-2">
        {button}
      </div>
    </div>
  )
}
