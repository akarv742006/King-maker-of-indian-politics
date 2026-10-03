import React from 'react';
import {
  Vote,
  Users,
  Landmark,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Award,
  ChevronRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import {
  PlayerProfile,
  Election,
  Party,
  NewsEventItem,
  MacroMetrics,
  ParliamentBill
} from '../../types';

interface DashboardViewProps {
  profile: PlayerProfile;
  election: Election;
  parties: Party[];
  news: NewsEventItem[];
  metrics: MacroMetrics;
  bills: ParliamentBill[];
  onNavigateTab: (tab: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  profile,
  election,
  parties,
  news,
  metrics,
  bills,
  onNavigateTab
}) => {
  // Estimated seat breakdown for Lok Sabha visualization
  const seatTally = [
    { name: 'BJP (NDA Lead)', seats: 240, color: '#FF9933' },
    { name: 'INC (I.N.D.I.A)', seats: 99, color: '#1976D2' },
    { name: 'SP', seats: 37, color: '#E53935' },
    { name: 'TMC', seats: 29, color: '#2E7D32' },
    { name: 'DMK', seats: 22, color: '#D32F2F' },
    { name: 'TDP', seats: 16, color: '#FBC02D' },
    { name: 'JD(U)', seats: 12, color: '#388E3C' },
    { name: 'Others & Ind.', seats: 88, color: '#94A3B8' }
  ];

  const totalSeats = 543;
  const majorityMark = 272;

  return (
    <div className="space-y-6">
      {/* Hero Banner: Citizen to Prime Minister Journey */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#173B67] via-[#1E4D85] to-[#122D50] text-white p-6 sm:p-8 shadow-md">
        <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
          <span className="text-[180px]">🇮🇳</span>
        </div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-xs font-semibold text-amber-300 mb-4 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-amber-400 pulse-dot" />
            <span>Chapter 4: Contest the General Election</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl tracking-tight leading-tight mb-3">
            Welcome, {profile.displayName}
          </h1>
          <p className="text-blue-100 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl">
            You represent <span className="font-bold text-white">{profile.constituencyName}</span> in the sovereign democracy of India.
            Campaign among constituents, introduce transformative bills in Parliament, or lead a coalition to govern the nation.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab('elections')}
              className="btn btn-saffron text-white font-bold px-5 py-2.5 shadow-md flex items-center gap-2"
            >
              <Vote className="w-4 h-4" />
              <span>Enter Campaign HQ</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigateTab('parties')}
              className="btn bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-2.5 backdrop-blur-xs font-semibold"
            >
              <Users className="w-4 h-4" />
              <span>Create or Join Party</span>
            </button>
            <button
              onClick={() => onNavigateTab('parliament')}
              className="btn bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-2.5 backdrop-blur-xs font-semibold"
            >
              <Landmark className="w-4 h-4" />
              <span>Sansad Session</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-base p-4 card-hover">
          <div className="flex items-center justify-between text-[#687386] text-xs font-bold uppercase tracking-wider mb-2">
            <span>Political XP</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading font-extrabold text-2xl text-[#173B67]">{profile.politicalXp}</span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">Level {profile.level}</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
            <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${(profile.politicalXp % 1000) / 10}%` }} />
          </div>
          <p className="text-[11px] text-[#687386] mt-2 font-medium">Next rank: Cabinet Minister</p>
        </div>

        <div className="card-base p-4 card-hover">
          <div className="flex items-center justify-between text-[#687386] text-xs font-bold uppercase tracking-wider mb-2">
            <span>Treasury & Funds</span>
            <span className="text-xs font-bold text-emerald-600">₹ INR</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading font-extrabold text-2xl text-[#173B67]">
              ₹{(profile.funds / 100000).toFixed(1)}L
            </span>
            <span className="text-xs text-[#687386]">Simulated</span>
          </div>
          <p className="text-[11px] text-emerald-600 mt-3 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Ready for rally allocations
          </p>
        </div>

        <div className="card-base p-4 card-hover">
          <div className="flex items-center justify-between text-[#687386] text-xs font-bold uppercase tracking-wider mb-2">
            <span>Public Approval</span>
            <TrendingUp className="w-4 h-4 text-blue-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading font-extrabold text-2xl text-[#173B67]">{profile.reputationScore}%</span>
            <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">Favourable</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
            <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${profile.reputationScore}%` }} />
          </div>
          <p className="text-[11px] text-[#687386] mt-2 font-medium">+4.2% after recent speech</p>
        </div>

        <div className="card-base p-4 card-hover">
          <div className="flex items-center justify-between text-[#687386] text-xs font-bold uppercase tracking-wider mb-2">
            <span>GDP & Macro Growth</span>
            <span className="text-xs font-bold text-blue-600">Q2 2026</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading font-extrabold text-2xl text-[#173B67]">{metrics.gdpGrowthRate}%</span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">Resilient</span>
          </div>
          <p className="text-[11px] text-[#687386] mt-3 font-medium">
            Inflation: <span className="font-bold text-[#173B67]">{metrics.inflationRate}%</span> · Deficit: <span className="font-bold text-[#173B67]">{metrics.fiscalDeficit}%</span>
          </p>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols): Parliament Seats & Elections Engine */}
        <div className="lg:col-span-2 space-y-6">
          {/* Lok Sabha 543 Seats Chamber Representation */}
          <div className="card-base p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#E5EAF1]">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-extrabold text-lg text-[#173B67]">
                    Lok Sabha Seat Composition (543 Seats)
                  </h3>
                  <span className="badge badge-navy">19th General Election</span>
                </div>
                <p className="text-xs text-[#687386]">
                  Majority threshold: <span className="font-bold text-[#173B67]">{majorityMark} seats</span> required to form the Union Government.
                </p>
              </div>
              <button
                onClick={() => onNavigateTab('government')}
                className="text-xs font-bold text-[#173B67] hover:text-[#F59E0B] flex items-center gap-1 self-start sm:self-center transition-colors"
              >
                <span>View Coalition Table</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Visual Seat Bar */}
            <div className="mt-4">
              <div className="h-6 w-full rounded-xl overflow-hidden flex shadow-inner bg-slate-200">
                {seatTally.map((item, idx) => {
                  const widthPercent = (item.seats / totalSeats) * 100;
                  return (
                    <div
                      key={idx}
                      title={`${item.name}: ${item.seats} seats (${widthPercent.toFixed(1)}%)`}
                      className="h-full relative group transition-all hover:opacity-90 cursor-pointer"
                      style={{ width: `${widthPercent}%`, backgroundColor: item.color }}
                    />
                  );
                })}
              </div>

              {/* Majority marker */}
              <div className="relative mt-1 mb-4">
                <div
                  className="absolute -top-7 w-0.5 h-8 bg-slate-900 z-10"
                  style={{ left: `${(majorityMark / totalSeats) * 100}%` }}
                >
                  <div className="absolute -top-5 -left-8 bg-slate-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                    272 Majority
                  </div>
                </div>
              </div>

              {/* Legend Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {seatTally.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-[#F7F9FC] border border-[#E5EAF1]">
                    <div className="w-3 h-3 rounded-md shrink-0" style={{ backgroundColor: item.color }} />
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-[#172033] truncate">{item.name}</p>
                      <p className="text-[11px] font-semibold text-[#687386]">{item.seats} seats</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Active Legislative Bills in Sansad */}
          <div className="card-base p-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EAF1]">
              <div className="flex items-center gap-2">
                <Landmark className="w-5 h-5 text-[#173B67]" />
                <h3 className="font-heading font-extrabold text-base text-[#173B67]">
                  Parliament Floor: Pending Voting & Debates
                </h3>
              </div>
              <button
                onClick={() => onNavigateTab('parliament')}
                className="text-xs font-bold text-[#173B67] hover:underline"
              >
                Enter Chamber
              </button>
            </div>
            <div className="divide-y divide-[#E5EAF1] mt-2">
              {bills.slice(0, 2).map((bill) => (
                <div key={bill.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="max-w-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                        {bill.category}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        bill.status === 'voting' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {bill.status.toUpperCase()}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-[#173B67] hover:text-[#F59E0B] cursor-pointer">
                      {bill.title}
                    </h4>
                    <p className="text-xs text-[#687386] mt-1 line-clamp-2">
                      {bill.summary}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onNavigateTab('parliament')}
                      className="btn btn-outline text-xs px-3 py-1.5 font-bold"
                    >
                      Cast Aye / No
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1 col): Living World News & Political Rallies */}
        <div className="space-y-6">
          {/* Real-World & Simulation News Bulletin */}
          <div className="card-base p-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EAF1] mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 pulse-dot" />
                <h3 className="font-heading font-extrabold text-base text-[#173B67]">
                  Living World Bulletin
                </h3>
              </div>
              <span className="text-[10px] font-semibold text-[#687386]">Verified Dispatch</span>
            </div>

            <div className="space-y-3.5">
              {news.slice(0, 3).map((item) => (
                <div key={item.id} className="p-3 rounded-xl bg-[#F7F9FC] border border-[#E5EAF1] hover:border-[#173B67]/30 transition-all">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-bold text-[#F59E0B] uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className="text-[10px] text-[#94A3B8]">{item.publishedAt}</span>
                  </div>
                  <h4 className="text-xs font-bold text-[#173B67] leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-[#687386] mt-1 line-clamp-2">
                    {item.summary}
                  </p>
                  <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px]">
                    <span className="text-slate-500 font-medium">Source: {item.sourceName}</span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-1 rounded flex items-center gap-0.5">
                      <ShieldCheck className="w-3 h-3" /> Verified
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigateTab('news')}
              className="w-full mt-4 py-2 text-xs font-bold text-[#173B67] bg-[#F7F9FC] hover:bg-slate-100 rounded-xl border border-[#E5EAF1] transition-colors"
            >
              Open Full Gazette & Event Log
            </button>
          </div>

          {/* Player Constituency Profile */}
          <div className="card-base p-5 border-l-4 border-l-[#F59E0B]">
            <h4 className="font-heading font-extrabold text-sm text-[#173B67] mb-1">
              Your Home Turf: {profile.constituencyName} ({profile.stateCode})
            </h4>
            <p className="text-xs text-[#687386] mb-3">
              1,860,000 Registered Voters · Urban Ratio: 65% · Voter Turnout Trend: 68.4%
            </p>
            <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200 text-xs text-amber-900 mb-3 space-y-1">
              <div className="font-bold flex items-center gap-1 text-[11px]">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>Primary Local Demands:</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Ganga Rejuvenation, Kashi Silk Weavers Subsidies, and Express Industrial Corridors.
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('map')}
              className="btn btn-primary w-full text-xs font-bold"
            >
              Explore Constituency Map
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
