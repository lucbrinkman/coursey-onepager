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
  sectionTitle: "The Problems in the Upskilling Pipeline",

  problems: [
    {
      // PROBLEM 1: Not enough capacity in existing programs
      headline: "People can't get in",
      text: "BlueDot had 1,450 applications for 400 spots. Far more than 1450 people would benefit from understanding AI Safety.",
      detail: "There isn't a scalable solution to help people get clarity on the problem. With a marginal cost per user of 400 USD, BlueDot is already rejecting many people, and demand is growing rapidly.",
    },
    {
      // PROBLEM 2: People don't know what to do after learning
      headline: "People don't know what to do",
      text: "People finish courses without a technical and strategic picture which lets them figure out what helps reduce x-risk.",
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
  text: "A free and scalable course that helps people understand the current situation, and empowers them to use their agency to do something about it.",
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
      label: "Offer Education that's Free, Scalable, and High Quality",
      detail: "The demand is already there. We're focused on an underserved market, for which we create a platform that can reach millions at $5/student whilst being higher quality than any existing AI Safety resources.",
    },
    {
      label: "Students Understand the Situation",
      detail: "After taking our course, people understand why misaligned superintelligence is a core risk and understand the hard problems of superintelligence alignment.",
    },
    {
      label: "Students are Empowered",
      detail: "We don't stop at understanding. We teach people strategic thinking about what they can actually work on, and help them transfer thoughts into action.",
    },
    {
      label: "Alumni Take Meaningful Action",
      detail: "We stay in touch with alumni to track that we're actually enabling them to be more impactful in domains like AI Safety research, policy, and governance",
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
          detail: "We teach the major obstacles to superintelligence alignment and both the benefits and limitations of different approaches.",
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
          text: "Continuous Improvement",
          detail: `We enable continuous improvement of our courses by:
          
          **Measuring learning outcomes.** This ensures we're actually teaching people what we want, rather than just making people *feel like* they've learned something – a common pitfall in online education. 
          
          **A/B testing** different teaching methods and learning materials (articles/videos) to see which work best to achieve those learning outcomes.

          **Tracking participants after course completion.** When a learner finishes our course, their journey into AI Safety only just begins. We stay in touch with our alumni to see if our courses are actually helping them be more impactful.`,
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
      label: "Open Alpha",
      past: false,  // Coming up
      detail: "Opening the platform for alpha testers, including a first 1h lesson with progress tracking and the ability to sign up for our first cohort.",
    },
    {
      date: "Mid-Late Jan",
      label: "Alpha cohort",
      past: false,  // Coming up
      detail: `Launch of the first structured cohort with group sessions. This allows us to figure out all the kinks in our automation system and fix them. We will facilitate this first cohort by ourselves to learn what works and what doesn't.`,
    },
    {
      date: "Early Feb",
      label: "Beta cohort",
      past: false,  // Coming up
      detail: "This second beta cohort will be run by volunteer facilitators, which allows us to test what they need and to further test our automation systems.",
    },
    {
      date: "Late Feb",
      label: "Full scale cohort + New Modules",
      past: false,  // Coming up
      detail: `We'll be able to host hundreds of students per month (similar to the scale that BlueDot currently offers), provided we have enough demand from students and enough facilitators wanting to participate. We expect to have to work out some final optimizations in our automated operations, before we'll be able to scale to (tens of) thousands of students per month.
      
      We will test various growth and marketing strategies and likely partner with an existing marketing org in the AI Safety space to help us figure out how to activate the expected demand for our course.
      
      We'll also launch the first optional modules that strengthen our flagship course. This may include modules on effectively communicating about AI Safety and mental health.`,
    },
  ],

  // Future products that branch off from the main course
  // (shown with dashed line to indicate they're separate products)
  branches: [
    {
      date: "Mar",
      label: "Second course + continuous improvement tooling",
      detail: `We're considering to launch courses and modules on **Governance, Technical Safety, and Effective Grantmaking.**
      
      We're also planning tools that make creating and improving courses easier, including tools for **automatically A/B testing** new explainers (articles/videos) compared to existing material.
      
      We'll also set up systems that **nudge participants to help improve the course** by writing new material and creating new videos, potentially with monetary rewards for content that's good enough to become part of our course.`,
    },
    {
      date: "Apr",
      label: "Potential new product releases",
      detail: `In the age of AI, you don't need an entire team to work for 1 year to build a product. We have several inter-related ideas to strengthen the AI Safety ecosystem, including:
      
      More tightly integrating **Stampy**, an *informational* AI Safety chatbot (which has a slightly different focus from our *educational* AI Tutor.)

      An **AI Safety networking and matchmaking tool**, that connects people based on interests and skills.
      
      A **first-contact AI safety onboarding tool**, that helps people figure out where they are and what the next step in their AI Safety journey could be.
      
      We're already in touch with people developing or thinking about developing each of these, and they would integrate well with our core offering.`,
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
    headline: "Fixed Costs for Building",
    amount: "$300k",
    amountLabel: "per year",
    text: "Salaries and contractors for platform development: building the course content, AI tutoring system, and automation infrastructure. See the [cost breakdown](/team-costs).",
    // detail: "test"
  },

  // Marginal costs explanation
  marginalCosts: {
    headline: "Marginal Costs for Running Courses",
    amount: "$5",
    amountLabel: "per student",
    text: "Software fees for running the platform: AI tutoring, hosting, and infrastructure. See our [cost calculator](/costs) for the full breakdown.",
    detail: "We expect to find enough resources to cover these costs in a way that scales infinitely. By the time 100 million people would want to take the course, there would also be enough interest in providing the $500M required in funding. For now, we cover them from the buffer included in the budget. In the future, we'll experiment with asking students for donations after taking the course.",
  },
};


// ============================================================================
// THE ASK SECTION
// ============================================================================
// What we're asking for from the donor

// ============================================================================
// TEAM COSTS SECTION
// ============================================================================
// Content for the /team-costs page that breaks down the budget

export const teamCostsSection = {
  pageTitle: "Team Costs",
  pageSubtitle: "What it costs to fund two people working full-time on Coursey",

  // Context paragraphs explaining the team structure (use backticks for line breaks)
  context: `Costs cover two co-founders and occasional contractors.

While we expect to grow in the future, leading AI-native companies show large teams are no longer required for success.

Salaries will be for:
- Current founder (Luc). This will still be below the median income where Luc lives and significantly below the counterfactual salary in the industry. Salary is expected to rise when Coursey is successful.
- A co-founder that we're currently looking for. However, we're not depending on finding a cofounder quickly, and would rather take our time to find somebody excellent.`,

  // Footer note
  footer: "Based on Zurich cost of living • CHF/USD rate: {chfToUsd} (Oct 2025 average)",
};


// ============================================================================
// THE ASK SECTION
// ============================================================================
// What we're asking for from the donor

export const askSection = {
  sectionTitle: "Our Ask",

  // The main funding ask
  fundingAsk: {
    amount: "$100k",
    description: "4 months runway for 2 people",
  },

  // Context line below the ask
  contextLine: "In four months, we expect to have plenty of evidence for further funding from initial and additional grantmakers.",
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
