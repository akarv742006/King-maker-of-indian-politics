import React, { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  Briefcase,
  Activity,
  Award,
  CheckCircle2,
  Sliders,
  Building,
  PlusCircle,
  AlertTriangle,
  Wallet,
  Users,
  Building2,
  PieChart,
  Landmark,
  ShieldAlert,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import {
  MacroMetrics,
  PlayerProfile,
  Business,
  BusinessIndustry,
  PlayerWallet,
  PoliticalSalarySetting,
  ConflictOfInterestAlert
} from '../../types';

interface EconomyViewProps {
  metrics: MacroMetrics;
  profile: PlayerProfile;
  businesses: Business[];
  playerWallet: PlayerWallet;
  salarySettings: PoliticalSalarySetting[];
  conflictAlerts: ConflictOfInterestAlert[];
  onCreateBusiness: (name: string, industry: BusinessIndustry, location: string, capital: number) => void;
  onRunMonthlySalaryTick: () => void;
  onRespondConflictAlert: (alertId: string, response: 'recused' | 'declared') => void;
  onAddNotification: (msg: string) => void;
}

export const EconomyView: React.FC<EconomyViewProps> = ({
  metrics,
  profile,
  businesses,
  playerWallet,
  salarySettings,
  conflictAlerts,
  onCreateBusiness,
  onRunMonthlySalaryTick,
  onRespondConflictAlert,
  onAddNotification
}) => {
  const [activeTab, setActiveTab] = useState<'business' | 'wallet' | 'macro'>('business');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Business Form State
  const [bizName, setBizName] = useState('Akash Renewable Power');
  const [bizIndustry, setBizIndustry] = useState<BusinessIndustry>('Renewable Energy');
  const [bizLocation, setBizLocation] = useState('Chennai & Varanasi');
  const [bizCapital, setBizCapital] = useState(500000);

  // Union Budget sliders
  const [eduBudget, setEduBudget] = useState(120);
  const [healthBudget, setHealthBudget] = useState(95);
  const [infraBudget, setInfraBudget] = useState(250);
  const [agriBudget, setAgriBudget] = useState(140);
  const [defenseBudget, setDefenseBudget] = useState(180);

  const totalBudget = eduBudget + healthBudget + infraBudget + agriBudget + defenseBudget;

  const handleCreateBusinessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bizName.trim()) return;
    onCreateBusiness(bizName.trim(), bizIndustry, bizLocation.trim(), bizCapital);
    setShowCreateModal(false);
  };

  const currentOfficeSalary = salarySettings.find((s) => s.office === profile.currentRole)?.monthlySalary || 0;

  return (
    <div className="space-y-6">
      {/* CONFLICT OF INTEREST SYSTEM ALERTS (Prompt 17) */}
      {conflictAlerts.filter((a) => a.status === 'pending').map((alert) => (
        <div
          key={alert.id}
          className="p-5 rounded-2xl bg-amber-500 text-white shadow-lg border-2 border-amber-300 animate-in slide-in-from-top-2 duration-200"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-white" />
                <span className="font-heading font-black text-base uppercase tracking-wide">
                  ⚠️ ETHICS ALERT: CONFLICT OF INTEREST DETECTED
                </span>
              </div>
              <p className="text-xs text-amber-100 max-w-2xl leading-relaxed">
                You hold the public office of <strong className="text-white">{profile.currentRole}</strong> while owning <strong className="text-white">{alert.businessName}</strong>, which bids for commercial contracts under the <strong className="text-white">{alert.governmentDepartment}</strong> (Est. Value: ₹{(alert.contractValue / 10000000).toFixed(1)} Crore). Under parliamentary ethics codes, you must record your position.
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={() => onRespondConflictAlert(alert.id, 'recused')}
                className="btn bg-[#173B67] hover:bg-[#0f2644] text-white text-xs font-black px-4 py-2 shadow-md"
              >
                Recuse from Tender
              </button>
              <button
                onClick={() => onRespondConflictAlert(alert.id, 'declared')}
                className="btn bg-white text-[#173B67] hover:bg-slate-100 text-xs font-black px-4 py-2 shadow-md"
              >
                Declare Interest & Proceed
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Main Banner */}
      <div className="card-base p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-extrabold text-xl text-[#173B67] flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[#F59E0B]" />
            <span>Economy, Business Empire & Political Salaries</span>
          </h2>
          <p className="text-xs text-[#687386]">
            Start enterprises, manage employees, earn political salaries as an elected official, and review national fiscal indicators.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-[#F7F9FC] p-1.5 rounded-2xl border border-[#E5EAF1]">
          <button
            onClick={() => setActiveTab('business')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'business'
                ? 'bg-[#173B67] text-white shadow-xs'
                : 'text-[#687386] hover:text-[#172033]'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Businesses ({businesses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('wallet')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'wallet'
                ? 'bg-[#173B67] text-white shadow-xs'
                : 'text-[#687386] hover:text-[#172033]'
            }`}
          >
            <Wallet className="w-3.5 h-3.5" />
            <span>Player Wallet & Salaries</span>
          </button>

          <button
            onClick={() => setActiveTab('macro')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'macro'
                ? 'bg-[#173B67] text-white shadow-xs'
                : 'text-[#687386] hover:text-[#172033]'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Macro Indicators</span>
          </button>
        </div>
      </div>

      {/* TAB 1: BUSINESS EMPIRE (Prompt 14) */}
      {activeTab === 'business' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading font-extrabold text-base text-[#173B67]">
                Commercial Enterprises & Holdings
              </h3>
              <p className="text-xs text-[#687386]">
                Businesses generate recurring revenue, employ citizens, and elevate player reputation.
              </p>
            </div>

            <button
              onClick={() => setShowCreateModal(true)}
              className="btn btn-saffron text-white text-xs font-bold px-4 py-2 flex items-center gap-2 shadow-xs"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Establish New Business</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {businesses.map((biz) => {
              const netProfit = biz.monthlyRevenue - biz.monthlyExpenses;
              return (
                <div key={biz.id} className="card-base p-5 card-hover space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="badge badge-navy text-[10px] mb-1">{biz.industry}</span>
                      <h4 className="font-heading font-black text-lg text-[#173B67]">
                        {biz.name}
                      </h4>
                      <span className="text-xs text-[#687386]">Location: {biz.location}</span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">Equity Value</span>
                      <span className="font-heading font-black text-base text-[#173B67]">
                        ₹{(biz.capital / 100000).toFixed(1)} Lakh
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs p-3 rounded-xl bg-[#F7F9FC] border border-[#E5EAF1]">
                    <div>
                      <span className="text-[10px] text-[#687386] block">Employees</span>
                      <span className="font-heading font-extrabold text-[#173B67]">{biz.employeesCount} staff</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#687386] block">Monthly Revenue</span>
                      <span className="font-heading font-extrabold text-emerald-700">₹{(biz.monthlyRevenue / 1000).toFixed(0)}k</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#687386] block">Net Profit</span>
                      <span className="font-heading font-extrabold text-[#173B67]">₹{(netProfit / 1000).toFixed(0)}k/mo</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-[#687386]">
                      Commercial Reputation: <strong>{biz.reputation}/100</strong>
                    </span>
                    {biz.hasGovtContract && (
                      <span className="badge bg-amber-100 text-amber-800 text-[10px] font-bold">
                        Active State Tender Contract
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: PLAYER WALLET & POLITICAL SALARY ENGINE (Prompt 15 & 16) */}
      {activeTab === 'wallet' && (
        <div className="space-y-6">
          {/* Wallet Cards (Prompt 15) */}
          <div className="rounded-2xl bg-[#0f2644] text-white p-6 shadow-md border border-[#173B67]">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-2">
              Citizen & Politician Personal Wealth Portfolio
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              <div className="p-3.5 rounded-xl bg-white/10 border border-white/10">
                <span className="text-[10px] text-blue-200 uppercase font-semibold block">Liquid Cash</span>
                <span className="font-heading font-black text-xl text-white mt-1 block">
                  ₹{playerWallet.cash.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white/10 border border-white/10">
                <span className="text-[10px] text-blue-200 uppercase font-semibold block">Bank Account</span>
                <span className="font-heading font-black text-xl text-amber-300 mt-1 block">
                  ₹{playerWallet.bank.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white/10 border border-white/10">
                <span className="text-[10px] text-blue-200 uppercase font-semibold block">Business Assets</span>
                <span className="font-heading font-black text-xl text-emerald-300 mt-1 block">
                  ₹{playerWallet.businessValue.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white/10 border border-white/10">
                <span className="text-[10px] text-blue-200 uppercase font-semibold block">Monthly Income</span>
                <span className="font-heading font-black text-xl text-cyan-300 mt-1 block">
                  ₹{playerWallet.monthlyIncome.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white/10 border border-white/10">
                <span className="text-[10px] text-blue-200 uppercase font-semibold block">Monthly Expenses</span>
                <span className="font-heading font-black text-xl text-rose-300 mt-1 block">
                  ₹{playerWallet.monthlyExpenses.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Political Salary Engine & Monthly Tick Button */}
          <div className="card-base p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E5EAF1]">
              <div>
                <h3 className="font-heading font-extrabold text-base text-[#173B67] flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-emerald-600" />
                  <span>Political Salary Engine & Statutory Compensations</span>
                </h3>
                <p className="text-xs text-[#687386]">
                  Your current public role is <strong>{profile.currentRole}</strong> with an entitlement of <strong>₹{currentOfficeSalary.toLocaleString('en-IN')}/month</strong>.
                </p>
              </div>

              <button
                onClick={onRunMonthlySalaryTick}
                className="btn btn-green text-white text-xs font-black px-5 py-2.5 shadow-md flex items-center gap-2 shrink-0"
              >
                <Sparkles className="w-4 h-4" />
                <span>Simulate Monthly Payday Tick</span>
              </button>
            </div>

            {/* Salary Schedule Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#F7F9FC] text-[#687386] font-bold uppercase text-[10px] border-b border-[#E5EAF1]">
                  <tr>
                    <th className="py-2.5 px-3">Elected Public Office</th>
                    <th className="py-2.5 px-3 text-right">Statutory Monthly Salary</th>
                    <th className="py-2.5 px-3">Entitlement Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5EAF1]">
                  {salarySettings.map((s) => {
                    const isCurrentOffice = s.office === profile.currentRole;
                    return (
                      <tr key={s.office} className={isCurrentOffice ? 'bg-amber-50/60 font-bold' : 'hover:bg-slate-50'}>
                        <td className="py-2.5 px-3 font-semibold text-[#172033] flex items-center gap-2">
                          {isCurrentOffice && <span className="text-amber-500">★</span>}
                          <span>{s.office}</span>
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono font-bold text-[#173B67]">
                          ₹{s.monthlySalary.toLocaleString('en-IN')}
                        </td>
                        <td className="py-2.5 px-3">
                          {isCurrentOffice ? (
                            <span className="badge badge-saffron text-[10px]">Your Active Office</span>
                          ) : (
                            <span className="text-slate-400 text-[11px]">Eligible upon election</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MACRO INDICATORS & UNION BUDGET REFORMS */}
      {activeTab === 'macro' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card-base p-4">
              <span className="text-[11px] font-bold text-[#687386] uppercase tracking-wider block mb-1">
                Real GDP Growth
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-heading font-extrabold text-2xl text-[#173B67]">{metrics.gdpGrowthRate}%</span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-1 rounded">Annual</span>
              </div>
              <p className="text-[11px] text-[#687386] mt-2">Capital investment and manufacturing push.</p>
            </div>

            <div className="card-base p-4">
              <span className="text-[11px] font-bold text-[#687386] uppercase tracking-wider block mb-1">
                Headline Inflation (CPI)
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-heading font-extrabold text-2xl text-amber-600">{metrics.inflationRate}%</span>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-1 rounded">Moderate</span>
              </div>
              <p className="text-[11px] text-[#687386] mt-2">Monetary MPC target corridor: 4 ± 2%.</p>
            </div>

            <div className="card-base p-4">
              <span className="text-[11px] font-bold text-[#687386] uppercase tracking-wider block mb-1">
                Urban & Rural Jobs
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-heading font-extrabold text-2xl text-[#173B67]">{metrics.unemploymentRate}%</span>
                <span className="text-xs font-bold text-slate-600 bg-slate-100 px-1 rounded">Unemployed</span>
              </div>
              <p className="text-[11px] text-[#687386] mt-2">Skilling apprenticeships expanding.</p>
            </div>

            <div className="card-base p-4">
              <span className="text-[11px] font-bold text-[#687386] uppercase tracking-wider block mb-1">
                Public Approval Index
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-heading font-extrabold text-2xl text-emerald-700">{metrics.publicApproval}%</span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-1 rounded">Positive</span>
              </div>
              <p className="text-[11px] text-[#687386] mt-2">Citizen satisfaction rating across 543 seats.</p>
            </div>
          </div>

          {/* Budget Reforms Allocator */}
          <div className="card-base p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EAF1]">
              <div>
                <h3 className="font-heading font-extrabold text-base text-[#173B67]">
                  Union Budget Expenditure Allocation
                </h3>
                <p className="text-xs text-[#687386]">
                  Total proposed fiscal outlay: ₹{totalBudget.toLocaleString('en-IN')} Thousand Crore
                </p>
              </div>
              <button
                onClick={() => onAddNotification(`Union Budget allocations applied! Public satisfaction recomputed.`)}
                className="btn btn-primary text-xs font-bold px-4 py-2"
              >
                Pass Fiscal Budget Reform
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Transport & Green Infrastructure</span>
                  <span className="font-mono text-[#173B67]">₹{infraBudget}k Cr</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="400"
                  value={infraBudget}
                  onChange={(e) => setInfraBudget(Number(e.target.value))}
                  className="w-full accent-[#173B67]"
                />
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Education & Skill Centers</span>
                  <span className="font-mono text-[#173B67]">₹{eduBudget}k Cr</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="250"
                  value={eduBudget}
                  onChange={(e) => setEduBudget(Number(e.target.value))}
                  className="w-full accent-[#173B67]"
                />
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Healthcare & Mohalla Clinics</span>
                  <span className="font-mono text-[#173B67]">₹{healthBudget}k Cr</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="200"
                  value={healthBudget}
                  onChange={(e) => setHealthBudget(Number(e.target.value))}
                  className="w-full accent-[#173B67]"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CREATE BUSINESS MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-[#E5EAF1] animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EAF1] mb-4">
              <h3 className="font-heading font-extrabold text-base text-[#173B67]">
                Establish Commercial Enterprise
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateBusinessSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-[#173B67] block mb-1">Business Name</label>
                <input
                  type="text"
                  required
                  value={bizName}
                  onChange={(e) => setBizName(e.target.value)}
                  className="w-full p-2.5 bg-[#F7F9FC] border border-[#E5EAF1] rounded-xl font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-[#173B67] block mb-1">Industry Sector</label>
                <select
                  value={bizIndustry}
                  onChange={(e) => setBizIndustry(e.target.value as BusinessIndustry)}
                  className="w-full p-2.5 bg-[#F7F9FC] border border-[#E5EAF1] rounded-xl font-semibold"
                >
                  <option value="IT Services">IT Services & AI</option>
                  <option value="Infrastructure & Construction">Infrastructure & Construction</option>
                  <option value="Renewable Energy">Renewable Energy & Solar</option>
                  <option value="Agriculture & FMCG">Agriculture & Food Processing</option>
                  <option value="Media & Broadcasting">Media & Broadcasting</option>
                  <option value="Healthcare">Healthcare & Pharma</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#173B67] block mb-1">Operational Base</label>
                <input
                  type="text"
                  required
                  value={bizLocation}
                  onChange={(e) => setBizLocation(e.target.value)}
                  className="w-full p-2.5 bg-[#F7F9FC] border border-[#E5EAF1] rounded-xl font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-[#173B67] block mb-1">Initial Capital Investment (₹)</label>
                <input
                  type="number"
                  min="100000"
                  step="50000"
                  value={bizCapital}
                  onChange={(e) => setBizCapital(Number(e.target.value))}
                  className="w-full p-2.5 bg-[#F7F9FC] border border-[#E5EAF1] rounded-xl font-semibold"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">
                  Available in bank: ₹{playerWallet.bank.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#E5EAF1]">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="btn btn-outline text-xs px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary text-xs font-bold px-5 py-2 shadow-md"
                >
                  Incorporate Company
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
