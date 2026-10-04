import React from 'react';
import {
  Vote,
  Users,
  Landmark,
  TrendingUp,
  ArrowRight,
  Shield,
  Award,
  Heart,
  Wallet,
  Calendar,
  Clock,
  Sparkles,
  MapPin,
  ChevronRight,
  Radio,
  Flame,
  CheckCircle2
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

  // Time-aware greeting
  const hour = new Date().getHours();
  const timeGreeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  // State & constituency display
  const stateDisplay = profile.stateCode === 'TN' ? 'Tamil Nadu' : profile.stateCode === 'UP' ? 'Uttar Pradesh' : profile.stateCode === 'MH' ? 'Maharashtra' : profile.stateCode;
  const constituencyDisplay = profile.constituencyName || 'Coimbatore South';
  const partyDisplayName = profile.partyAbbr ? `${profile.partyAbbr} Alliance` : "National People's Alliance";

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full">
      {/* ========================================================================= */}
      {/* SECTION 1: TOP HERO SECTION (Matching Design Card 2: Player Dashboard)     */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left Column: Player Welcome & Status Card (7 cols on desktop) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          <div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#173B67] tracking-tight flex items-center gap-2">
              <span>{timeGreeting}, {profile.displayName.split(' ')[0]}</span>
              <span className="text-2xl sm:text-3xl animate-bounce">👋</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#687386] font-medium mt-1">
              Your political journey is just beginning.
            </p>
          </div>

          {/* Player Journey Status Dossier Card */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E5EAF1] shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-amber-100/70 border border-amber-300 flex items-center justify-center font-heading font-black text-xl text-[#173B67] shadow-xs relative overflow-hidden shrink-0">
                  {profile.avatarUrl ? (
                    <img src={profile.avatarUrl} alt={profile.displayName} className="w-full h-full object-cover" />
                  ) : (
                    <span>{profile.displayName.charAt(0)}</span>
                  )}
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-heading font-bold text-base sm:text-lg text-[#173B67]">
                      {stateDisplay}
                    </span>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 uppercase tracking-wide">
                      {profile.currentRole || 'Member'}
                    </span>
                  </div>
                  <div className="text-xs text-[#687386] flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>Constituency: <strong className="text-[#172033]">{constituencyDisplay}</strong></span>
                  </div>
                  <div className="text-[11px] text-[#687386] flex items-center gap-1 mt-0.5">
                    <span className="text-amber-500 font-bold">●</span>
                    <span className="font-semibold text-slate-700">{partyDisplayName}</span>
                  </div>
                </div>
              </div>

              {/* Verified Citizen Badge */}
              <div className="hidden sm:flex flex-col items-end text-right">
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">
                  Lvl {profile.level} Verified
                </span>
                <span className="text-[10px] text-[#94A3B8] mt-1 font-mono">{profile.politicalXp} Total XP</span>
              </div>
            </div>

            {/* Political Influence Progress Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#173B67]">Political Influence</span>
                <span className="font-bold text-[#173B67]">78%</span>
              </div>
              <div className="w-full bg-[#E5EAF1] rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-500 via-[#173B67] to-emerald-600 h-2.5 rounded-full transition-all duration-700"
                  style={{ width: '78%' }}
                />
              </div>
            </div>

            {/* Action Buttons (Matching Design Card 2) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigateTab('map')}
                className="flex-1 min-w-[130px] py-2.5 px-4 rounded-xl border border-[#CBD5E1] bg-white hover:bg-[#F7F9FC] text-[#173B67] text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-[#173B67]" />
                <span>View Constituency</span>
              </button>

              <button
                onClick={() => onNavigateTab('elections')}
                className="flex-1 min-w-[130px] py-2.5 px-4 rounded-xl bg-[#173B67] hover:bg-[#1E4D85] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Continue Journey</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Inspiring Nation Building Hero Card (5 cols on desktop) */}
        <div className="lg:col-span-5 relative overflow-hidden rounded-2xl text-white shadow-md p-6 sm:p-7 flex flex-col justify-between border border-[#173B67]/20 group min-h-[220px]">
          {/* Background image of Parliament House with tricolor accent */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url('/assets/parliament_admin_bg.jpg')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C1E38]/95 via-[#102A4E]/80 to-[#173B67]/60" />

          {/* Tricolor top border */}
          <div className="absolute top-0 left-0 right-0 h-1 tricolor-stripe" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-bold text-amber-300 border border-white/20 mb-3">
              <Sparkles className="w-3 h-3" />
              <span>Sovereign Democracy Sim</span>
            </div>
            <h2 className="font-heading font-extrabold text-xl sm:text-2xl lg:text-3xl leading-snug drop-shadow-sm text-white">
              "A better India is built by people who care."
            </h2>
          </div>

          <div className="relative z-10 pt-4">
            <button
              onClick={() => onNavigateTab('elections')}
              className="py-2.5 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-heading font-black text-xs sm:text-sm shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Make an Impact</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2: 4 STAT CARDS ROW (Exact Match to Design Card 2)                */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {/* Stat 1: Political Influence */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E5EAF1] shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-[#687386] text-xs font-semibold mb-2">
            <span>Political Influence</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-extrabold text-2xl sm:text-3xl text-[#173B67]">
            78 <span className="text-sm font-semibold text-[#94A3B8]">/ 100</span>
          </div>
          <div className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 mt-2">
            <span>↑ +5 this week</span>
          </div>
        </div>

        {/* Stat 2: Public Support */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E5EAF1] shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-[#687386] text-xs font-semibold mb-2">
            <span>Public Support</span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Heart className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-extrabold text-2xl sm:text-3xl text-[#173B67]">
            72%
          </div>
          <div className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 mt-2">
            <span>↑ +4%</span>
          </div>
        </div>

        {/* Stat 3: Party Seats */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E5EAF1] shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-[#687386] text-xs font-semibold mb-2">
            <span>Party Seats</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-extrabold text-2xl sm:text-3xl text-[#173B67]">
            87
          </div>
          <div className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 mt-2">
            <span>↑ +3</span>
          </div>
        </div>

        {/* Stat 4: Personal Economy */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E5EAF1] shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-[#687386] text-xs font-semibold mb-2">
            <span>Personal Economy</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-extrabold text-2xl sm:text-3xl text-[#173B67]">
            ₹ 2,45,000
          </div>
          <div className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 mt-2">
            <span>↑ +12%</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 3: RECENT UPDATES & UPCOMING EVENTS (Exact Match to Design Card 2) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Left Column: Recent Updates */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E5EAF1] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5EAF1]">
            <h3 className="font-heading font-bold text-base text-[#173B67] flex items-center gap-2">
              <Radio className="w-4 h-4 text-amber-500 animate-pulse" />
              <span>Recent Updates</span>
            </h3>
            <span className="text-[11px] text-[#687386] font-medium">Live Feed</span>
          </div>

          <div className="space-y-3.5">
            <div className="flex items-start justify-between gap-3 text-xs p-2.5 rounded-xl hover:bg-[#F7F9FC] transition-colors">
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span className="font-semibold text-[#172033] leading-relaxed">
                  New campaign event announced in your constituency
                </span>
              </div>
              <span className="text-[11px] text-[#94A3B8] shrink-0 whitespace-nowrap">2 hours ago</span>
            </div>

            <div className="flex items-start justify-between gap-3 text-xs p-2.5 rounded-xl hover:bg-[#F7F9FC] transition-colors">
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span className="font-semibold text-[#172033] leading-relaxed">
                  Your party gained 3 new verified members
                </span>
              </div>
              <span className="text-[11px] text-[#94A3B8] shrink-0 whitespace-nowrap">5 hours ago</span>
            </div>

            <div className="flex items-start justify-between gap-3 text-xs p-2.5 rounded-xl hover:bg-[#F7F9FC] transition-colors">
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                <span className="font-semibold text-[#172033] leading-relaxed">
                  Parliament session scheduled for next week
                </span>
              </div>
              <span className="text-[11px] text-[#94A3B8] shrink-0 whitespace-nowrap">1 day ago</span>
            </div>
          </div>
        </div>

        {/* Right Column: Upcoming Events */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E5EAF1] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5EAF1]">
            <h3 className="font-heading font-bold text-base text-[#173B67] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span>Upcoming Events</span>
            </h3>
            <button
              onClick={() => onNavigateTab('elections')}
              className="text-[11px] font-bold text-[#173B67] hover:underline"
            >
              View Calendar
            </button>
          </div>

          <div className="space-y-3">
            {/* Event 1 */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F9FC] border border-[#E5EAF1] hover:border-amber-300 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold shrink-0">
                  📣
                </div>
                <div>
                  <div className="text-xs font-bold text-[#173B67]">Campaign Rally</div>
                  <div className="text-[11px] text-[#687386]">Coimbatore South</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-[#172033]">12 Apr 2026</div>
                <div className="text-[10px] text-[#687386]">5:00 PM</div>
              </div>
            </div>

            {/* Event 2 */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F9FC] border border-[#E5EAF1] hover:border-emerald-300 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center font-bold shrink-0">
                  🗳️
                </div>
                <div>
                  <div className="text-xs font-bold text-[#173B67]">Party Strategy Session</div>
                  <div className="text-[11px] text-[#687386]">Varanasi</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-[#172033]">15 Apr 2026</div>
                <div className="text-[10px] text-[#687386]">11:00 AM</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 4: 543 LOK SABHA COMPOSITION & MAJORITY TRACKER (Live Simulation)  */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E5EAF1] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E5EAF1]">
          <div>
            <h3 className="font-heading font-extrabold text-base sm:text-lg text-[#173B67]">
              Lok Sabha Seat Composition (543 Seats)
            </h3>
            <p className="text-xs text-[#687386]">
              Majority threshold: <strong>272 seats</strong> required to form the Union Government.
            </p>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 self-start sm:self-auto">
            19th General Election
          </span>
        </div>

        {/* Stacked Proportional Bar */}
        <div className="relative pt-6">
          {/* 272 Majority Pin Marker */}
          <div
            className="absolute top-0 transform -translate-x-1/2 flex flex-col items-center pointer-events-none z-20"
            style={{ left: `${(majorityMark / totalSeats) * 100}%` }}
          >
            <div className="bg-[#173B67] text-white text-[10px] font-black px-1.5 py-0.5 rounded shadow-sm flex items-center gap-0.5">
              <span>272</span>
              <span className="hidden sm:inline">Majority</span>
            </div>
            <div className="w-0.5 h-6 bg-[#173B67]" />
          </div>

          <div className="h-6 rounded-xl overflow-hidden flex shadow-inner bg-slate-100">
            {seatTally.map((party, index) => {
              const widthPct = (party.seats / totalSeats) * 100;
              return (
                <div
                  key={index}
                  style={{ width: `${widthPct}%`, backgroundColor: party.color }}
                  title={`${party.name}: ${party.seats} seats`}
                  className="h-full relative group cursor-pointer transition-all hover:opacity-90"
                />
              );
            })}
          </div>
        </div>

        {/* Coalition Legend Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 pt-2">
          {seatTally.map((party, index) => (
            <div key={index} className="flex items-center gap-1.5 text-xs">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: party.color }} />
              <span className="truncate text-slate-700 font-medium text-[11px]">
                {party.name.split(' ')[0]}: <strong className="text-[#173B67]">{party.seats}</strong>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
