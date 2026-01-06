import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { teamCostsSection } from '../../textContent';
import FormattedText from './FormattedText';

// Cost data (CHF unless noted)
const COSTS = {
  baseSalary: 84000,
  employerCostsFactor: 1.135,
  workExpenses: {
    coworking: { amount: 5400, label: 'Coworking (PEAKS)' },
    meals: { amount: 4000, label: 'Meal stipend' },
    constellation: { amount: 3000, label: 'Visit to Constellation' },
    claudeCode: { amount: 1914, label: 'Claude Code' }, // $200/mo × 12 = $2,400 USD
    lisa: { amount: 1000, label: 'Visit to LISA' },
    ceealar: { amount: 400, label: 'Visit to CEEALAR' },
  },
  chfToUsd: 1.254,
};

// Calculated values (per person, CHF)
const salaryWithEmployer = Math.round(COSTS.baseSalary * COSTS.employerCostsFactor);
const totalExpenses = Object.values(COSTS.workExpenses).reduce((sum, e) => sum + e.amount, 0);
const totalChf = salaryWithEmployer + totalExpenses;
const totalUsd = Math.round(totalChf * COSTS.chfToUsd);

// Budget calculations (USD)
const TEAM_SIZE = 2;
const FISCAL_SPONSOR_RATE = 0.10;
const BUFFER_RATE = 0.10;

// Convert to USD for total breakdown
const salaryUsd = Math.round(salaryWithEmployer * COSTS.chfToUsd * TEAM_SIZE);
const expensesUsd = Math.round(totalExpenses * COSTS.chfToUsd * TEAM_SIZE);
const contractorsUsd = 90000; // Annual contractor budget

const teamCosts = salaryUsd + expensesUsd + contractorsUsd;
const buffer = Math.round(teamCosts * BUFFER_RATE);
const subtotalWithBuffer = teamCosts + buffer;
const fiscalSponsorFee = Math.round(subtotalWithBuffer * FISCAL_SPONSOR_RATE);
export const TOTAL_BUDGET = subtotalWithBuffer + fiscalSponsorFee;

const COLORS = {
  salary: '#3b82f6',
  expenses: '#22c55e',
  contractors: '#8b5cf6',
  buffer: '#94a3b8',
  fiscalSponsor: '#f59e0b',
  accent: '#f59e0b',
  // Work expense colors (darkest for largest, at bottom of chart)
  coworking: '#14532d',
  meals: '#166534',
  constellation: '#15803d',
  claudeCode: '#16a34a',
  lisa: '#22c55e',
  ceealar: '#4ade80',
};

function formatChf(value) {
  return value.toLocaleString('en-CH') + ' CHF';
}

function formatUsd(value) {
  return '$' + value.toLocaleString('en-US');
}

export default function TeamCosts() {
  // Work expenses breakdown (sorted by amount, in USD)
  const expensesBreakdown = Object.entries(COSTS.workExpenses)
    .map(([key, { amount, label }]) => ({ key, name: label, value: Math.round(amount * COSTS.chfToUsd), color: COLORS[key] }))
    .sort((a, b) => b.value - a.value);
  const expensesUsdPerPerson = Math.round(totalExpenses * COSTS.chfToUsd);

  // Chart 3: Waterfall progression (per person, salary only)
  const salaryUsdPerPerson = Math.round(salaryWithEmployer * COSTS.chfToUsd);
  const waterfall = [
    { name: 'Base salary', value: COSTS.baseSalary, total: COSTS.baseSalary },
    { name: 'Employer-side costs', value: salaryWithEmployer - COSTS.baseSalary, total: salaryWithEmployer },
    { name: '→ USD conversion', value: salaryUsdPerPerson - salaryWithEmployer, total: salaryUsdPerPerson, isUsd: true },
  ];

  // Chart 4: Total breakdown (USD, entire team)
  const totalBreakdown = [
    { name: '2 Co-founder Salaries', value: salaryUsd, color: COLORS.salary },
    { name: 'Work expenses', value: expensesUsd, color: COLORS.expenses },
    ...(contractorsUsd > 0 ? [{ name: 'Contractors', value: contractorsUsd, color: COLORS.contractors }] : []),
    { name: 'Buffer (+10%)', value: buffer, color: COLORS.buffer },
    { name: 'Fiscal sponsor (+10%)', value: fiscalSponsorFee, color: COLORS.fiscalSponsor },
  ];
  const totalBreakdownSum = totalBreakdown.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back link */}
        <div className="sticky top-0 z-50 bg-gradient-to-br from-slate-50 to-slate-100 py-3 -mx-8 px-8 mb-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to One-Pager
          </Link>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-800 mb-3">
            {teamCostsSection.pageTitle}
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            {teamCostsSection.pageSubtitle}
          </p>
        </div>

        {/* Key metrics */}
        <div className="mb-10">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 text-center max-w-md mx-auto">
            <p className="text-sm text-slate-500 uppercase tracking-wide mb-1">Total Per Year</p>
            <p className="text-4xl font-bold text-slate-800">{formatUsd(TOTAL_BUDGET)}</p>
          </div>
        </div>

        {/* Context */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-8">
          <div className="prose prose-slate max-w-none text-slate-600">
            <FormattedText>{teamCostsSection.context}</FormattedText>
          </div>
        </div>

        {/* Charts: Side by side on larger screens */}
        <div className="flex flex-wrap gap-6 mb-8">
          {/* Total Breakdown - Vertical Stacked */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex-1 min-w-[280px]">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Total</h2>
            <div className="flex gap-4">
              {/* Vertical stacked bar */}
              <div className="w-12 flex-shrink-0 flex flex-col-reverse rounded overflow-hidden" style={{ height: 200 }}>
                {totalBreakdown.map((item) => (
                  <div
                    key={item.name}
                    style={{
                      backgroundColor: item.color,
                      height: `${(item.value / totalBreakdownSum) * 100}%`,
                    }}
                  />
                ))}
              </div>
              {/* Legend */}
              <div className="flex-1 flex flex-col justify-center gap-2">
                {[...totalBreakdown].reverse().map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-slate-600">{item.name}</span>
                    <span className="text-sm font-medium text-slate-800 ml-auto">{formatUsd(item.value)}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-sm text-slate-500 text-center mt-4">
              Total: {formatUsd(totalBreakdownSum)} (excl. buffer)
            </p>
          </div>

          {/* Salary Cost Breakdown - Vertical Stacked */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex-1 min-w-[280px]">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Salary per person</h2>
            <div className="flex gap-4">
              {/* Vertical stacked bar */}
              <div className="w-12 flex-shrink-0 flex flex-col-reverse rounded overflow-hidden" style={{ height: 200 }}>
                {waterfall.map((step, idx) => (
                  <div
                    key={step.name}
                    style={{
                      backgroundColor: idx === waterfall.length - 1 ? COLORS.accent : COLORS.salary,
                      height: `${(step.value / salaryUsdPerPerson) * 100}%`,
                      opacity: 1 - idx * 0.15,
                    }}
                  />
                ))}
              </div>
              {/* Legend */}
              <div className="flex-1 flex flex-col justify-center gap-2">
                {[...waterfall].reverse().map((step, idx) => (
                  <div key={step.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-sm flex-shrink-0"
                      style={{
                        backgroundColor: idx === 0 ? COLORS.accent : COLORS.salary,
                        opacity: idx === 0 ? 1 : 1 - (waterfall.length - 1 - idx) * 0.15,
                      }}
                    />
                    <span className="text-sm text-slate-600">{step.name}</span>
                    <span className="text-sm font-medium text-slate-800 ml-auto">
                      {idx === 0 ? formatUsd(step.total) : formatChf(step.value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-sm text-slate-500 text-center mt-4">
              Employer-side costs: social security, pension, insurance (~13.5%)
            </p>
          </div>

          {/* Work Expenses Breakdown - Vertical Stacked with Labels */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex-1 min-w-[280px]">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Work expenses per person</h2>
            <div className="flex gap-4">
              {/* Vertical stacked bar */}
              <div className="w-12 flex-shrink-0 flex flex-col-reverse rounded overflow-hidden" style={{ height: 200 }}>
                {expensesBreakdown.map((item) => (
                  <div
                    key={item.key}
                    style={{
                      backgroundColor: item.color,
                      height: `${(item.value / expensesUsdPerPerson) * 100}%`,
                    }}
                  />
                ))}
              </div>
              {/* Legend */}
              <div className="flex-1 flex flex-col justify-center gap-2">
                {[...expensesBreakdown].reverse().map((item) => (
                  <div key={item.key} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-slate-600">{item.name}</span>
                    <span className="text-sm font-medium text-slate-800 ml-auto">{formatUsd(item.value)}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-sm text-slate-500 text-center mt-4">
              Total: {formatUsd(expensesUsdPerPerson)}
            </p>
          </div>
        </div>

        <p className="text-center text-slate-400 text-sm mt-8">
          {teamCostsSection.footer.replace('{chfToUsd}', COSTS.chfToUsd)}
        </p>
      </div>
    </div>
  );
}
