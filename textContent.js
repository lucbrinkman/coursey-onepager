/**
 * ============================================================================
 * COURSEY ONE-PAGER CONTENT
 * ============================================================================
 *
 * This file contains ALL the text content for the Coursey one-pager.
 *
 * HOW TO EDIT:
 * - Only edit the text between the quote marks ("..." or '...')
 * - Don't remove or change the variable names (the parts before the colons)
 * - Don't remove commas at the end of lines
 * - Save the file when done - the website will update automatically
 *
 * If something breaks, check:
 * - Did you accidentally delete a quote mark or comma?
 * - Did you use a quote mark inside text? Use \" instead of "
 *
 * ============================================================================
 */


// ============================================================================
// HEADER
// ============================================================================

export const header = {
  // The main title shown at the top of the page
  title: "Coursey",
};


// ============================================================================
// PROBLEMS SECTION
// ============================================================================
// This section describes the problems that Coursey solves.
// Each problem has:
//   - headline: A short title (2-4 words)
//   - text: A one-liner explanation (1-2 sentences)
//   - detail: More context shown when user clicks "More" (can be longer)

export const problemsSection = {
  // The heading above all the problem cards
  sectionTitle: "The Problem",

  problems: [
    {
      // PROBLEM 1: Not enough capacity in existing programs
      headline: "Too few spots",
      text: "BlueDot had 1,450 applications for 400 spots. Most people who want to learn AI Safety can't get in.",
      detail: "Demand for AI Safety education far outstrips available supply across all major programs.",
    },
    {
      // PROBLEM 2: People don't know what to do after learning
      headline: "Unclear what to do",
      text: "People finish courses without knowing what they should actually work on, or why alignment is so hard.",
      detail: "Current courses often focus on knowledge transfer without developing strategic thinking about career paths and impactful work.",
    },
  ],
};


// ============================================================================
// SOLUTION SECTION
// ============================================================================
// A brief bridge between problems and what makes us different

export const solutionSection = {
  // A single punchy sentence introducing Coursey
  text: "Coursey is an AI Safety course that scales to millions while teaching what actually matters.",
};


// ============================================================================
// WHAT MAKES US DIFFERENT (USPs)
// ============================================================================
// These are the Unique Selling Points - what makes Coursey special.
// Each USP has:
//   - headline: Short title (2-4 words)
//   - bullets: 3 key points shown as a list
//   - detail: More context shown when user clicks "More"

export const uspSection = {
  // The heading above all the USP cards
  sectionTitle: "What Makes Us Different",

  usps: [
    {
      // USP 1: We teach the right content
      headline: "Focus on what matters",
      bullets: [
        "Misaligned superintelligence as the core risk",
        "Why alignment is actually hard",
        "Strategic thinking about what to work on",
      ],
      detail: "We teach the things most likely to cause existential harm, not the politically convenient topics. Our learning outcomes include skills, not just knowledge.",
    },
    {
      // USP 2: We use AI to teach effectively
      headline: "AI-powered learning",
      bullets: [
        "1-on-1 AI tutoring for active learning",
        "Spaced repetition for retention",
        "Measured learning outcomes",
      ],
      detail: "We follow science-informed best practices and measure outcomes to ensure real learning—not just the feeling of having learned something.",
    },
    {
      // USP 3: We can grow to millions of students
      headline: "Built to scale",
      bullets: [
        "$5/student marginal cost",
        "Volunteer-based facilitators",
        "Fully automated operations",
      ],
      detail: "Humans only improve the platform—they don't run courses. We're designed to reach millions, not hundreds.",
    },
  ],
};


// ============================================================================
// TIMELINE SECTION
// ============================================================================
// Shows what we've done and what's coming.
//
// Each milestone has:
//   - date: When it happens/happened (keep short, e.g., "Jan 5" or "Mid-Jan")
//   - label: What it is (2-5 words)
//   - past: true if already completed, false if upcoming
//   - detail: More context shown when user clicks "More"

export const timelineSection = {
  // The heading above the timeline
  sectionTitle: "Timeline",

  // Label shown before the "branch" items (future products)
  branchesLabel: "Expanding to...",

  // Main course milestones (shown on the main timeline)
  mainMilestones: [
    {
      date: "Dec 1",
      label: "Started building",
      past: true,  // Already happened
      detail: "Began development of the Coursey platform",
    },
    {
      date: "Jan 5",
      label: "Lesson preview",
      past: true,  // Already happened
      detail: "Launched interactive lesson preview for early feedback",
    },
    {
      date: "Jan",
      label: "Open beta",
      past: false,  // Coming up
      detail: "Opening the platform for beta testers",
    },
    {
      date: "Mid-Jan",
      label: "Beta cohort",
      past: false,  // Coming up
      detail: "First structured cohort with group sessions",
    },
    {
      date: "Feb",
      label: "Full run + automation",
      past: false,  // Coming up
      detail: "First full course run with complete automation in place",
    },
  ],

  // Future products that branch off from the main course
  // (shown with dashed line to indicate they're separate products)
  branches: [
    {
      date: "Mar",
      label: "Second course + creation tools",
      detail: "Launching additional course content and tools for easier course creation",
    },
    {
      date: "Apr",
      label: "Matchmaking tool",
      detail: "AI Safety networking and matchmaking platform for the community",
    },
  ],

  // Legend labels
  legend: {
    completed: "Completed",
    upcoming: "Upcoming",
  },
};


// ============================================================================
// THE ASK SECTION
// ============================================================================
// What we're asking for from the donor

export const askSection = {
  // The heading above the ask
  sectionTitle: "The Ask",

  // The main funding ask
  fundingAsk: {
    amount: "$100k",
    description: "4 months, 2 people",
  },

  // The cost per student metric
  costPerStudent: {
    amount: "$5",
    description: "per student marginal cost",
  },

  // Optional context line below the numbers
  contextLine: "Funding runway to reach full automation and first cohort at scale.",
};


// ============================================================================
// UI TEXT
// ============================================================================
// Text for buttons and other UI elements

export const ui = {
  // Expand/collapse buttons
  expandAll: "Expand all",
  collapseAll: "Collapse all",
  more: "More",
  less: "Less",
};
