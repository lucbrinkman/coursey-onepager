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
  title: "Coursey – Donor One-pager",
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
      text: "BlueDot had 1,450 applications for 400 spots.",
      detail: "Lots of people want to understand things about AI safety. There isn't a scalable solution to help people get clarity on the problem.",
    },
    {
      // PROBLEM 2: People don't know what to do after learning
      headline: "Unclear what to do",
      text: "People finish courses without a technical and strategic picture which lets them figure out what to helps reduce x-risk.",
      detail: "Current courses often focus on knowledge transfer about current agendas without developing strategic thinking about career paths and impactful work. While this somewhat prepares people for entry level AI Safety jobs, those jobs are saturated with good applications and are not necessarily the most impactful.",
    },
  ],
};


// ============================================================================
// SOLUTION SECTION
// ============================================================================
// A brief bridge between problems and what makes us different

export const solutionSection = {
  sectionTitle: "The Solution",
  // A single punchy sentence introducing Coursey
  text: "A free and scalable course that helps people understand the current situation to empower them to use their agency to do something about this.",
};


// ============================================================================
// THEORY OF CHANGE SECTION
// ============================================================================
// The causal chain showing how our solution leads to impact.
// Each step connects to the next with an arrow/flow.

export const theoryOfChangeSection = {
  sectionTitle: "Theory of Change",

  // The causal chain - each step leads to the next
  steps: [
    {
      label: "Build scalable education",
      detail: "Create a platform that can reach millions at $5/student",
    },
    {
      label: "People understand the situation",
      detail: "Teach why misaligned superintelligence is a core risk and the hard problems of superintelligence alignment",
    },
    {
      label: "Empower agency",
      detail: "Give people strategic thinking about what they can actually work on",
    },
    {
      label: "Take meaningful action",
      detail: "More people contributing to AI Safety research, policy, and governance",
    },
  ],
};


// ============================================================================
// WHAT MAKES US DIFFERENT (USPs)
// ============================================================================
// These are the Unique Selling Points - what makes Coursey special.
// Each USP has:
//   - headline: Short title (2-4 words)
//   - bullets: 3 key points, each with:
//       - text: The bullet point text
//       - detail: More context shown when user clicks to expand

export const uspSection = {
  // The heading above all the USP cards
  sectionTitle: "What Makes Us Different",

  usps: [
    {
      // USP 1: We teach the right content
      headline: "Focus on what matters",
      bullets: [
        {
          text: "Misaligned superintelligence as the central risk",
          detail: "We focus on the scenarios most likely to cause existential harm and make them tangible, instead of focusing on topics that are easiest to explain but are less likely to cause catastrophe.",
        },
        {
          text: "Understand the core challenges to alignment",
          detail: "We teach the major obsticles to superintelligence alignment and both the benefits and limitations of different approaches.",
        },
        {
          text: "Strategic thinking about what to work on",
          detail: "Our learning outcomes include skills, not just knowledge—helping students figure out where they can contribute.",
        },
      ],
    },
    {
      // USP 2: We use AI to teach effectively
      headline: "Top notch education",
      bullets: [
        {
          text: "1-on-1 AI tutoring",
          detail: `There are several reasons for relying heavily on AI:

Studies have shown well-implemented AI tutors are **similarly effective to human 1-on-1 tutors**, which are in turn one of the most effective methods of education.

Many of the key principles in good education design happen to be **easy to implement with AI, and hard without it**. For example, having the learner answer open questions is much more effective at achieving learning outcomes than answering multiple-choice questions. However, this requires giving the learner feedback on their answer in a way that's only scalable with AI.

3) AI is already great at education today, and it **will only get better in the years to come.**`,
        },
        {
          text: "Informed by science",
          detail: `We follow science-informed best practices in education, including:

**Active learning** ≈ stuff where the learner has to generate some output. This is much more effective than passive learning (e.g. reading, watching) alone.

**Breaking down learning outcomes** (knowledge and skills) into smaller steps and then practicing at increasingly harder levels.

**Spaced repetition**: brains need to get back to a topic over time to remember it long-term. At the end of the course, the learner should still be capable of the learning outcomes of all lessons – not just the last lesson.`,
        },
        {
          text: "Measured learning outcomes",
          detail: `We measure learning outcomes to ensure we're actually teaching people what we want, rather than just making people *feel like* they've learned something – which is a common pitfall in popular  education.`,
        },
      ],
    },
    {
      // USP 3: We can grow to millions of students
      headline: "Built to scale",
      bullets: [
        {
          text: "Anyone can join",
          detail: `Anyone who wants to take our course, can take our course. 
          
          Instead of having a lengthy application process, we have people try a quick lesson to check if they like what we offer.
          
          After the trial lesson, people who want to are guaranteed to be accepted in our course.
          
          We will try to match students of similar backgrounds and skill levels together.`,
        },
        {
          text: "$5/student marginal cost",
          detail: "AI tutoring costs are low and decreasing. See our [cost calculator](/costs) for the full breakdown.",
        },
        {
          text: "Volunteer-based facilitators",
          detail: `Course facilitators enhance the experience but aren't required for teaching or operations.

- The role of facilitators is to guide discussions, not to teach. This requires some social skills rather than technical know-how. This makes it much easier to find decent facilitators. 

- Most of our technical teaching happens 1-on-1 with AI, not during the group meetings. The group meetings serve an important social role, but don't require our facilitators to transfer knowledge.

- We will try to match the particularly promising groups with experienced facilitators.

- Facilitators may, in the future, go through a short facilitator training course (couple hours) hosted on our course platform.

- Longer-term, we envision AI being present in the group meetings, both to provide technical know-how and to potentially replace human facilitators altogether.
                    `,
        },
        {
          text: "Fully automated operations",
          detail: "We're designed to reach millions. When we pay humans, it's to improve the platform and the course content – not to run courses or operations.",
        },
      ],
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
      detail: "Began designing and building the Coursey platform. We've built a lot of the technical infrastructure to allow scaling the course cheaply and quickly. Course signup, scheduling, and delivery are all designed to be fully automated and the core of those systems is already in place.",
    },
    {
      date: "Jan 3",
      label: "Lesson preview",
      past: true,  // Already happened
      detail: "Launched an interactive lesson preview for early feedback",
    },
    {
      date: "Ca. Jan 12",
      label: "Open beta",
      past: false,  // Coming up
      detail: "Opening the platform for beta testers, including a first 1h lesson with progress tracking and the ability to sign up for our first cohort.",
    },
    {
      date: "Mid-Late Jan",
      label: "Beta cohort",
      past: false,  // Coming up
      detail: `Launch of the first structured cohort with group sessions. This allows us to figure out all the kinks in our automation system and fix them. We will facilitate this first cohort by ourselves.`,
    },
    {
      date: "Early Feb",
      label: "Beta cohort 2",
      past: false,  // Coming up
      detail: "This second beta cohort will be run by external volunteer facilitators, which allows us to test what they need and to further test our automation systems.",
    },
    {
      date: "Late Feb",
      label: "Full scale cohort + New Modules",
      past: false,  // Coming up
      detail: `We'll launch fully at a scale similar to what BlueDot currently offers, provided we have enough students and facilitators wanting to participate.
      
      We'll also launch the first optional modules that strengthen our flagship course.`,
    },
  ],

  // Future products that branch off from the main course
  // (shown with dashed line to indicate they're separate products)
  branches: [
    {
      date: "Mar",
      label: "Second course + continuous improvement tooling",
      detail: "Launching additional course content and tools for easier course creation",
    },
    {
      date: "Apr",
      label: "Potential Sister Projects",
      detail: `In the age of AI, you don't need an entire team to work for 1 year to build a product. We have several inter-related ideas to strengthen the AI Safety ecosystem, including:
      
      - More tightly integrating Stampy, an *informational* AI Safety chatbot (which has a slightly different focus from our *educational* AI Tutor.)

      - An AI Safety networking and matchmaking tool, that connects people based on interests and skills.`,
    },
  ],

  // Legend labels
  legend: {
    completed: "Completed",
    upcoming: "Upcoming",
  },
};


// ============================================================================
// COSTS SECTION
// ============================================================================
// Explains our cost structure - fixed costs for development, marginal costs for running

export const costsSection = {
  sectionTitle: "Costs",

  // Fixed costs explanation
  fixedCosts: {
    headline: "Fixed costs",
    text: "Salaries for platform development: building the course content, AI tutoring system, and automation infrastructure.",
    detail: `Roughly 150k USD/y per person, for 2 people. Those are budgets, not gross salaries. Employer-side costs and software costs will be incurred.

    We expect to grow in the future, but leading AI-native companies show large teams are no longer required for success.
    
    Salaries wil be for:
    - Current founder (Luc). This will still be below the median income where Luc lives and significantly below the counterfactual salary in the industry. Salary is expected to rise when Coursey is succesful.
    - A co-founder that we're currently looking for. However, we're not depending on finding a cofounder quickly, and would rather take our time to find a really good match.`,
  },

  // Marginal costs explanation
  marginalCosts: {
    headline: "Marginal costs",
    amount: "$5",
    amountLabel: "per student",
    text: "Software fees for running the platform: AI tutoring, hosting, and infrastructure. See our [cost calculator](/costs) for the full breakdown.",
    // detail: "These are the only ongoing costs - no human labor required to run courses.",
  },
};


// ============================================================================
// THE ASK SECTION
// ============================================================================
// What we're asking for from the donor

export const askSection = {
  sectionTitle: "The Ask",

  // The main funding ask
  fundingAsk: {
    amount: "$100k",
    description: "4 months runway for 2 people",
  },

  // Context line below the ask
  // contextLine: "Funding to reach full automation and pro",
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
