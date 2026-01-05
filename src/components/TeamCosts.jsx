import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// Cost data (CHF unless noted)
const COSTS = {
  baseSalary: 84000,
  employerCostsFactor: 1.135,
  workExpenses: {
    coworking: { amount: 5400, label: 'Coworking (PEAKS)' },
    meals: { amount: 4000, label: 'Meal stipend' },
    constellation: { amount: 3000, label: 'Visit to Constellation' },
    lisa: { amount: 1000, label: 'Visit to LISA' },
    ceealar: { amount: 400, label: 'Visit to CEEALAR' },
  },
  chfToUsd: 1.254,
};

// Calculated values
const salaryWithEmployer = Math.round(COSTS.baseSalary * COSTS.employerCostsFactor);
const totalExpenses = Object.values(COSTS.workExpenses).reduce((sum, e) => sum + e.amount, 0);
const totalChf = salaryWithEmployer + totalExpenses;
const totalUsd = Math.round(totalChf * COSTS.chfToUsd);

const COLORS = {
  salary: '#3b82f6',
  expenses: '#22c55e',
  accent: '#f59e0b',
  // Work expense colors
  coworking: '#22c55e',
  meals: '#16a34a',
  constellation: '#15803d',
  lisa: '#166534',
  ceealar: '#14532d',
};

function formatChf(value) {
  return value.toLocaleString('en-CH') + ' CHF';
}

function formatUsd(value) {
  return '$' + value.toLocaleString('en-US');
}

export default function TeamCosts() {
  // Chart 1: Salary vs Expenses
  const salaryVsExpenses = [
    { name: 'Salary (incl. employer costs)', value: salaryWithEmployer, color: COLORS.salary },
    { name: 'Work expenses', value: totalExpenses, color: COLORS.expenses },
  ];

  // Chart 2: Work expenses breakdown (sorted by amount)
  const expensesBreakdown = Object.entries(COSTS.workExpenses)
    .map(([key, { amount, label }]) => ({ key, name: label, value: amount, color: COLORS[key] }))
    .sort((a, b) => b.value - a.value);

  // Chart 3: Waterfall progression
  const waterfall = [
    { name: 'Base salary', value: COSTS.baseSalary, total: COSTS.baseSalary },
    { name: '+ Employer costs', value: salaryWithEmployer - COSTS.baseSalary, total: salaryWithEmployer },
    { name: '+ Work expenses', value: totalExpenses, total: totalChf },
    { name: '→ USD conversion', value: totalUsd - totalChf, total: totalUsd, isUsd: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to One-Pager
        </Link>

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-800 mb-3">
            Team Costs
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            What it costs to fund one person working full-time on Coursey
          </p>
        </div>

        {/* Hero number */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 text-center mb-10">
          <p className="text-sm text-slate-500 uppercase tracking-wide mb-2">Per Person, Per Year</p>
          <p className="text-5xl font-bold text-slate-800">{formatUsd(totalUsd)}</p>
          <p className="text-slate-400 mt-2">{formatChf(totalChf)}</p>
        </div>

        {/* Chart 1: Salary vs Expenses - Horizontal stacked bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Where the money goes</h2>
          <div className="h-10 flex rounded overflow-hidden">
            <div
              style={{
                backgroundColor: COLORS.salary,
                width: `${(salaryWithEmployer / totalChf) * 100}%`,
              }}
            />
            <div
              style={{
                backgroundColor: COLORS.expenses,
                width: `${(totalExpenses / totalChf) * 100}%`,
              }}
            />
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-4">
            {salaryVsExpenses.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-slate-600">{item.name}</span>
                <span className="text-sm font-medium text-slate-800">{formatChf(item.value)}</span>
                <span className="text-sm text-slate-400">({Math.round(item.value / totalChf * 100)}%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Charts 2 & 3: Side by side on larger screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Chart 2: Work Expenses Breakdown - Vertical Stacked with Labels */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Work expenses breakdown</h2>
            <div className="flex gap-4" style={{ height: 300 }}>
              {/* Vertical stacked bar */}
              <div className="w-16 flex-shrink-0 flex flex-col-reverse rounded overflow-hidden">
                {expensesBreakdown.map((item) => (
                  <div
                    key={item.key}
                    style={{
                      backgroundColor: item.color,
                      height: `${(item.value / totalExpenses) * 100}%`,
                    }}
                  />
                ))}
              </div>
              {/* Labels positioned at segment midpoints */}
              <div className="relative flex-1">
                {(() => {
                  let cumulative = 0;
                  return expensesBreakdown.map((item) => {
                    const bottom = (cumulative / totalExpenses) * 100;
                    const height = (item.value / totalExpenses) * 100;
                    cumulative += item.value;
                    return (
                      <div
                        key={item.key}
                        className="absolute left-0 flex items-center whitespace-nowrap"
                        style={{
                          bottom: `${bottom + height / 2}%`,
                          transform: 'translateY(50%)',
                        }}
                      >
                        <div className="w-3 h-px bg-slate-300 mr-2" />
                        <span className="text-sm text-slate-600">{item.name}</span>
                        <span className="text-sm font-medium text-slate-800 ml-2">{formatChf(item.value)}</span>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
            <p className="text-sm text-slate-500 text-center mt-4">
              Total: {formatChf(totalExpenses)}
            </p>
          </div>

          {/* Chart 3: How Costs Add Up - Vertical Stacked */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">How costs add up</h2>
            <div className="flex gap-4" style={{ height: 300 }}>
              {/* Vertical stacked bar */}
              <div className="w-16 flex-shrink-0 flex flex-col-reverse rounded overflow-hidden">
                {waterfall.map((step, idx) => (
                  <div
                    key={step.name}
                    style={{
                      backgroundColor: idx === waterfall.length - 1 ? COLORS.accent : COLORS.salary,
                      height: `${(step.value / totalUsd) * 100}%`,
                      opacity: 1 - idx * 0.15,
                    }}
                  />
                ))}
              </div>
              {/* Labels positioned at segment midpoints */}
              <div className="relative flex-1">
                {(() => {
                  let cumulative = 0;
                  return waterfall.map((step, idx) => {
                    const bottom = (cumulative / totalUsd) * 100;
                    const height = (step.value / totalUsd) * 100;
                    cumulative += step.value;
                    return (
                      <div
                        key={step.name}
                        className="absolute left-0 flex items-center whitespace-nowrap"
                        style={{
                          bottom: `${bottom + height / 2}%`,
                          transform: 'translateY(50%)',
                        }}
                      >
                        <div className="w-3 h-px bg-slate-300 mr-2" />
                        <span className="text-sm text-slate-600">{step.name}</span>
                        <span className="text-sm font-medium text-slate-800 ml-2">
                          {idx === waterfall.length - 1 ? formatUsd(step.total) : formatChf(step.value)}
                        </span>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
            <p className="text-sm text-slate-500 text-center mt-4">
              Employer costs: social security, pension, insurance (~13.5%)
            </p>
          </div>
        </div>

        <p className="text-center text-slate-400 text-sm mt-8">
          Based on Zurich cost of living • CHF/USD rate: {COSTS.chfToUsd} (Oct 2025 average)
        </p>
      </div>
    </div>
  );
}
