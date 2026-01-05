# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Coursey one-pager is a React single-page app serving as a leave-behind document for donors. It presents problems, solutions, USPs, timeline, and funding ask in an interactive format.

## Commands

```bash
npm run dev      # Start dev server with HMR
npm run build    # Production build to dist/
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Tech Stack

- **React 19** with Vite 7
- **Tailwind CSS v4** (via @tailwindcss/vite plugin, no tailwind.config needed)
- **Lucide React** for icons
- **React Router** for routing (/ and /costs pages)
- **Recharts** for cost visualization charts

## Architecture

### Content Separation
All text content lives in `src/content.js`. This file is designed to be edited by non-developers - comments explain what each field does and how to edit safely. Components import from this file rather than hardcoding text.

### Expand/Collapse System
`ExpandContext.jsx` provides a React context for coordinating expand/collapse state across all sections. Components use the `useExpand()` hook to:
- Track which sections are expanded
- Enable "Expand All" / "Collapse All" functionality via `ExpandAllToggle`

### Component Composition
`OnePager.jsx` assembles the page sections in order:
1. Header
2. ProblemCards
3. Solution
4. USPCards
5. TheoryOfChange
6. Timeline
7. Costs
8. TheAsk

Each section component is self-contained and uses `ExpandableSection` for consistent expand/collapse behavior.

### Routing
- `/` - Main one-pager (OnePager component)
- `/costs` - Cost visualization page (CostVisualization component)

## Key Patterns

- **FormattedText**: Parses simple markup in content strings (bold, links, lists)
- **InfoTooltip**: Shows additional detail on hover/tap for cards
- **ExpandableSection**: Reusable collapsible section with consistent styling

## Important: Editing content.js

When editing `src/content.js`:
- **Never delete existing text** unless explicitly asked to
- **Only make the specific changes requested** - do not "clean up" or "improve" surrounding content
- **Leave unfinished sentences, placeholder text, and comments as-is** - they are intentional drafts
- This file is collaboratively edited; preserve the human's work-in-progress
