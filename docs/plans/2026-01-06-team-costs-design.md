# Team Costs Page Design

## Overview

A new page showing fixed costs (team salaries/funding) with three visualizations. Static display, no interactive parameters.

**Route:** `/team-costs`

## Data Model

```js
const COSTS = {
  baseSalary: 84000,           // CHF/year
  employerCostsFactor: 1.135,  // 13.5% on top of salary
  workExpenses: {
    coworking: 5400,           // CHF - PEAKS coworking space
    meals: 4000,               // CHF - meal stipend
    constellation: 3000,       // CHF - visit
    lisa: 1000,                // CHF - visit
    ceealar: 400,              // CHF - visit
  },
  chfToUsd: 1.254,             // Oct 2025 average
}
```

**Calculations:**
1. Salary with employer costs: 84,000 × 1.135 = 95,340 CHF
2. Total work expenses: 13,800 CHF
3. Total CHF: 109,140 CHF
4. Total USD: ~136,862 USD

Note: Employer costs only apply to salary, not work expenses.

## Visualizations

### Chart 1: Salary vs Expenses
- Horizontal stacked bar or simple split
- Salary portion: ~87%
- Work expenses: ~13%

### Chart 2: Work Expenses Breakdown
- Horizontal bar chart
- Sorted by size (coworking largest)
- Each bar labeled with CHF amount

### Chart 3: Gross-up Progression (Waterfall)
- Shows journey from base salary to final USD amount
- Steps: Base salary → +Employer costs → +Expenses → USD conversion

## Page Layout

- Back link to one-pager
- Title: "Team Costs"
- Subtitle: "What it costs to fund one person working full-time on Coursey"
- Big hero number: ~$137k USD/year
- Three chart sections
- Footer note about Zurich costs, exchange rate

## Integration

Link from "The Ask" section on main one-pager to this page.
