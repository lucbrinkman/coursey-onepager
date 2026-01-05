import { useState } from 'react'

const mainMilestones = [
  { date: 'Dec 1', label: 'Started building', past: true },
  { date: 'Jan 5', label: 'Lesson preview', past: true },
  { date: 'Jan', label: 'Open beta', past: false },
  { date: 'Mid-Jan', label: 'Beta cohort', past: false },
  { date: 'Feb', label: 'Full run + automation', past: false },
]

const branches = [
  { date: 'Mar', label: 'Second course + creation tools', fromIndex: 4 },
  { date: 'Apr', label: 'Matchmaking tool', fromIndex: 4 },
]

function Milestone({ milestone, isLast }) {
  const [hover, setHover] = useState(false)

  return (
    <div className="flex flex-col items-center relative">
      <div
        className={`w-4 h-4 rounded-full border-2 z-10 cursor-pointer transition-all ${
          milestone.past
            ? 'bg-gray-900 border-gray-900'
            : 'bg-white border-gray-400 hover:border-gray-600'
        }`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      />
      {hover && (
        <div className="absolute -top-16 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
          <div className="font-medium">{milestone.label}</div>
          <div className="text-gray-400 text-xs">{milestone.date}</div>
          <div className="absolute w-2 h-2 bg-gray-900 rotate-45 -bottom-1 left-1/2 -translate-x-1/2" />
        </div>
      )}
      <div className="mt-2 text-xs text-gray-500">{milestone.date}</div>
    </div>
  )
}

function BranchMilestone({ branch, position }) {
  const [hover, setHover] = useState(false)

  return (
    <div
      className={`absolute flex items-center ${position === 'top' ? '-top-12' : '-bottom-12'}`}
      style={{ left: 'calc(100% - 2rem)' }}
    >
      {/* Branch line */}
      <svg
        className={`absolute ${position === 'top' ? 'bottom-0' : 'top-0'}`}
        width="80"
        height="48"
        style={{ left: '-40px' }}
      >
        <path
          d={position === 'top'
            ? 'M 40 48 Q 40 24, 60 12 L 80 12'
            : 'M 40 0 Q 40 24, 60 36 L 80 36'
          }
          fill="none"
          stroke="#9ca3af"
          strokeWidth="2"
        />
      </svg>

      {/* Branch milestone */}
      <div
        className="ml-10 flex items-center gap-2 cursor-pointer"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="w-3 h-3 rounded-full border-2 bg-white border-gray-400 hover:border-gray-600" />
        <span className="text-xs text-gray-500">{branch.date}</span>

        {hover && (
          <div className="absolute left-16 -top-8 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-lg z-20">
            <div className="font-medium">{branch.label}</div>
            <div className="text-gray-400 text-xs">{branch.date}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Timeline() {
  return (
    <section className="py-16">
      <h2 className="text-2xl font-semibold text-center mb-12 text-gray-900">Timeline</h2>

      <div className="max-w-4xl mx-auto px-8">
        {/* Main timeline */}
        <div className="relative flex justify-between items-center">
          {/* Connecting line */}
          <div className="absolute top-2 left-0 right-0 h-0.5 bg-gray-300" />

          {/* Arrow at end */}
          <div className="absolute top-2 -right-2 w-0 h-0 border-t-4 border-b-4 border-l-6 border-t-transparent border-b-transparent border-l-gray-300" />

          {mainMilestones.map((milestone, i) => (
            <div key={milestone.date} className="relative">
              <Milestone milestone={milestone} isLast={i === mainMilestones.length - 1} />

              {/* Branches from last milestone */}
              {i === 4 && (
                <>
                  <BranchMilestone branch={branches[0]} position="top" />
                  <BranchMilestone branch={branches[1]} position="bottom" />
                </>
              )}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-16 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-900" />
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full border-2 border-gray-400 bg-white" />
            <span>Upcoming</span>
          </div>
        </div>
      </div>
    </section>
  )
}
