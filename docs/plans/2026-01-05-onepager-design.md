# Coursey One-Pager Design

## Overview

A single-page React app serving as a leave-behind document for donor Mckkiev after an initial call. Not a persuasion piece - just a written summary reinforcing what was discussed.

**Tech stack:** Vite + React, Tailwind CSS, Lucide icons, deployed on Vercel

## Page Structure

```
┌─────────────────────────────────────┐
│  COURSEY (simple text header)       │
├─────────────────────────────────────┤
│  PROBLEMS (2 cards)                 │
├─────────────────────────────────────┤
│  SOLUTION (brief intro)             │
├─────────────────────────────────────┤
│  USPs (3 cards with icons)          │
├─────────────────────────────────────┤
│  TIMELINE (horizontal, branching)   │
├─────────────────────────────────────┤
│  THE ASK (2 big numbers)            │
└─────────────────────────────────────┘
```

## Interactive Elements

- Info icons (ⓘ) on problem and USP cards reveal extra detail on hover
- Timeline dots show milestone details on hover
- Mobile-responsive (cards stack vertically)

## Section Details

### Header
Simple "Coursey" text. No logo for now, no brand colors yet.

### Problems (2 cards)

**Card 1 - Demand**
- Icon: `Users` or `UserX`
- Headline: "Too few spots"
- Text: "BlueDot had 1,450 applications for 400 spots. Most people who want to learn AI Safety can't get in."
- Tooltip: Additional stats if available

**Card 2 - Direction**
- Icon: `Compass` or `Map`
- Headline: "Unclear what to do"
- Text: "People finish courses without knowing what they should actually work on, or why alignment is so hard."
- Tooltip: Elaborate on the "why alignment is hard" gap

### Solution (bridge text)
One punchy sentence introducing Coursey, e.g.:
> "Coursey is an AI Safety course that scales to millions while teaching what actually matters."

### USPs (3 cards)

**Card 1 - Focus on what matters**
- Icon: `Target` or `Crosshair`
- Headline: "Focus on what matters"
- Content: Misaligned superintelligence, why alignment is hard, strategic thinking about what to work on
- Tooltip: More detail on curriculum choices

**Card 2 - AI-powered learning**
- Icon: `Brain` or `GraduationCap`
- Headline: "AI-powered learning"
- Content: 1-on-1 AI tutoring, active learning, spaced repetition, measured outcomes
- Tooltip: Science-informed methods, avoiding "feeling learned" trap

**Card 3 - Built to scale**
- Icon: `Rocket` or `TrendingUp`
- Headline: "Built to scale"
- Content: $5/student marginal cost, volunteer facilitators, fully automated operations
- Tooltip: Humans only improve platform, not run courses

### Timeline

Horizontal timeline with branching to show Coursey as a multi-product organization.

**Main line (the course):**
- Dec 1, 2025: Started building
- Jan 5, 2026: Interactive lesson preview
- Early Jan: Open beta launch
- Mid-Jan: First beta cohort
- Feb: First full run + automation fully scalable

**Branches (sister products):**
- Mar: Second course + course creation tools (branch off main line)
- Apr: AI Safety matchmaking tool (branch off main line)

Visual representation:
```
                                                         Matchmaking tool
                                                                ●
                                                               /
Dec '25          Jan '26              Feb '26         Mar '26 /
  ●────────────●────●────●────────────●───────────────●──────●────────→
  │            │    │    │            │               │
Started    Lesson  Open Beta      Full run +      Second course +
building   preview beta cohort    automation      creation tools
                                  complete
```

Past milestones shown as solid/highlighted dots. Future milestones as regular dots.

### The Ask

Two prominent numbers:

```
    $100k              $5
    ───────            ──────
    4 months           per student
    2 people           marginal cost
```

Optional context line below:
> "Funding runway to reach full automation and first cohort at scale."

## Visual Style

- Clean and minimal
- Lots of whitespace
- Simple typography
- Neutral colors (no brand colors yet)
- Interactive elements add depth without clutter
- Mobile-responsive

## File Structure (proposed)

```
src/
  components/
    Header.jsx
    ProblemCards.jsx
    Solution.jsx
    USPCards.jsx
    Timeline.jsx
    TheAsk.jsx
    InfoTooltip.jsx
  App.jsx
  main.jsx
  index.css
```
