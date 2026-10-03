import React, { useState } from 'react';
import {
  Vote,
  Clock,
  Award,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
  Megaphone,
  Radio,
  Play,
  FastForward,
  ShieldCheck,
  Lock,
  Unlock,
  Users,
  Building,
  Mic2,
  FileText,
  DoorOpen,
  Share2,
  Handshake,
  Tv,
  ArrowRight,
  Sparkles,
  BarChart3,
  PieChart
} from 'lucide-react';
import {
  Election,
  ElectionPhase,
  Candidate,
  PlayerProfile,
  ConstituencyInfo,
  CampaignAction,
  CandidateCampaignState,
  DualSeatWinState
} from '../../types';

interface ElectionsViewProps {
  election: Election;
  candidates: Candidate[];
  profile: PlayerProfile;
  constituencies: ConstituencyInfo[];
  userVoted: boolean;
  campaignActions: CampaignAction[];
  playerCampaignState: CandidateCampaignState;
  dualSeatWinState: DualSeatWinState | null;
  onCastBallot: (candidateId: string) => void;
  onAdvancePhase: (phase: ElectionPhase) => void;
  onNominatePlayer: (constituencyId: string) => void;
  onExecuteCampaign: (actionId: string) => void;
  onResolveDualSeatWin: (retainedSeat: string, vacatedSeat: string) => void;
  onAddNotification: (msg: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const ElectionsView: React.FC<ElectionsViewProps> = ({
  election,
  candidates,
  profile,
  constituencies,
  userVoted,
  campaignActions,
  playerCampaignState,
  dualSeatWinState,
  onCastBallot,
  onAdvancePhase,
  onNominatePlayer,
  onExecuteCampaign,
  onResolveDualSeatWin,
  onAddNotification,
  onNavigateTab
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'campaign' | 'visualization' | 'ballot'>('campaign');
  const [selectedSeatFilter, setSelectedSeatFilter] = useState('c-1');
  const [selectedRetainSeat, setSelectedRetainSeat] = useState<string>('Chennai Central');

  // Candidates for selected seat
  const seatCandidates = candidates.filter((c) => c.constituencyId === selectedSeatFilter);
  const currentSeat = constituencies.find((c) => c.id === selectedSeatFilter) || constituencies[0];

  // Seat Distribution Tally
  const seatTally = [
    { party: 'BJP (NDA Lead)', seats: 238, voteShare: 39.2, color: '#FF9933' },
    { party: 'INC (I.N.D.I.A)', seats: 182, voteShare: 31.7, color: '#1976D2' },
    { party: 'Regional Front (SP/TMC/DMK)', seats: 71, voteShare: 14.8, color: '#2E7D32' },
    { party: 'Others & Independents', seats: 52, voteShare: 14.3, color: '#94A3B8' }
  ];

  return (
    <div className="space-y-6">
      {/* MULTIPLE SEAT WIN CONSTITUTIONAL PROMPT */}
      {dualSeatWinState && !dualSeatWinState.resolved && (
        <div className="p-5 rounded-2xl bg-amber-500 text-white shadow-xl border-2 border-amber-300 animate-in zoom-in-95 duration-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-white" />
                <span className="font-heading font-black text-lg tracking-wide uppercase">
                  ⚠️ MULTIPLE SEAT WIN — CONSTITUTIONAL CHOICE REQUIRED
                </span>
              </div>
              <p className="text-xs text-amber-100 max-w-2xl leading-relaxed">
                Congratulations, <span className="font-bold text-white">{dualSeatWinState.candidateName}</span>! You have won in multiple constituencies: {dualSeatWinState.seatsWon.join(' & ')}. Under Indian electoral simulation rules, you may retain only ONE seat. The other seat will immediately become vacant and enter By-Election.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={selectedRetainSeat}
                onChange={(e) => setSelectedRetainSeat(e.target.value)}
                className="p-2.5 rounded-xl bg-white text-[#173B67] font-bold text-xs shadow-md border-none focus:outline-none"
              >
                {dualSeatWinState.seatsWon.map((st) => (
                  <option key={st} value={st}>
                    Retain: {st}
                  </option>
                ))}
              </select>

              <button
                onClick={() => {
                  const vacated = dualSeatWinState.seatsWon.find((s) => s !== selectedRetainSeat) || dualSeatWinState.seatsWon[1];
                  onResolveDualSeatWin(selectedRetainSeat, vacated);
                }}
                className="btn bg-[#173B67] hover:bg-[#0f2644] text-white text-xs font-black px-4 py-2.5 shadow-md"
              >
                Confirm Choice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RESULTS LOCKED VS RELEASED STATUTORY STATUS BANNER */}
      {election.phase === 'counting' || election.phase === 'results_locked' || election.resultsLocked ? (
        <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
          election.resultsReleased
            ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
            : 'bg-rose-50 border-rose-200 text-rose-900'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl text-white ${election.resultsReleased ? 'bg-emerald-600' : 'bg-rose-600'}`}>
              {election.resultsReleased ? <CheckCircle2 className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </div>
            <div>
              <div className="font-heading font-extrabold text-sm flex items-center gap-2">
                <span>{election.resultsReleased ? 'OFFICIAL RESULTS RELEASED TO THE PUBLIC' : 'FINAL RESULTS ARE CURRENTLY LOCKED'}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/60 border">
                  {election.resultsReleased ? 'v1.0-CERTIFIED' : 'Awaiting ECI Release'}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                {election.resultsReleased
                  ? 'Certified by Election Commission of India. Results and seat allocations are authoritative.'
                  : 'All ballots have been tabulated by the server, but Election Commission approval is required before public publication.'}
              </p>
            </div>
          </div>

          {!election.resultsReleased && (
            <button
              onClick={() => onNavigateTab('admin')}
              className="btn bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-3 py-1.5 shadow-xs shrink-0 flex items-center gap-1.5"
            >
              <Unlock className="w-3.5 h-3.5" />
              <span>Open ECI Release Console</span>
            </button>
          )}
        </div>
      ) : null}

      {/* Main Election Header & Navigation Tabs */}
      <div className="card-base p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#E5EAF1]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-2 rounded-xl bg-[#173B67] text-white">
                <Vote className="w-5 h-5 text-[#F59E0B]" />
              </span>
              <h2 className="font-heading font-extrabold text-xl text-[#173B67]">
                {election.title}
              </h2>
            </div>
            <p className="text-xs text-[#687386]">
              543 Parliamentary Constituencies · Majority threshold: {election.majorityThreshold} seats · System: {election.votingSystem}
            </p>
          </div>

          {/* Sub Navigation */}
          <div className="flex items-center gap-1.5 bg-[#F7F9FC] p-1.5 rounded-2xl border border-[#E5EAF1]">
            <button
              onClick={() => setActiveSubTab('campaign')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeSubTab === 'campaign'
                  ? 'bg-[#173B67] text-white shadow-xs'
                  : 'text-[#687386] hover:text-[#172033]'
              }`}
            >
              <Megaphone className="w-3.5 h-3.5" />
              <span>Campaign Strategy Studio</span>
            </button>

            <button
              onClick={() => setActiveSubTab('visualization')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeSubTab === 'visualization'
                  ? 'bg-[#173B67] text-white shadow-xs'
                  : 'text-[#687386] hover:text-[#172033]'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Advanced Visualizations</span>
            </button>

            <button
              onClick={() => setActiveSubTab('ballot')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeSubTab === 'ballot'
                  ? 'bg-[#173B67] text-white shadow-xs'
                  : 'text-[#687386] hover:text-[#172033]'
              }`}
            >
              <Vote className="w-3.5 h-3.5" />
              <span>Cast EVM Ballot</span>
            </button>
          </div>
        </div>

        {/* SUBTAB 1: CAMPAIGN STRATEGY STUDIO (12 ACTIONS & CANDIDATE STATUS) */}
        {activeSubTab === 'campaign' && (
          <div className="mt-6 space-y-6">
            {/* Candidate Live Campaign Dashboard (Prompt Wireframe 8) */}
            <div className="rounded-2xl bg-gradient-to-r from-[#173B67] via-[#1c487c] to-[#122e52] text-white p-5 sm:p-6 shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                    Candidate Campaign Headquarters
                  </span>
                  <h3 className="font-heading font-black text-2xl text-white mt-0.5">
                    {profile.displayName}
                  </h3>
                  <span className="text-xs text-blue-200">
                    Contesting: <strong className="text-white">{playerCampaignState.constituencyName}</strong> Parliamentary Seat
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white/10 border border-white/20 backdrop-blur-xs text-right">
                  <span className="text-[10px] text-blue-200 block font-semibold uppercase">Campaign Purse</span>
                  <span className="font-heading font-black text-2xl text-amber-300">
                    ₹{playerCampaignState.campaignBudget.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* 4 Campaign Status Indicators */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                <div className="p-3 rounded-xl bg-white/10 border border-white/10">
                  <span className="text-[10px] text-blue-200 uppercase font-semibold block">Support Estimate</span>
                  <span className="font-heading font-black text-xl text-emerald-300">{playerCampaignState.supportEstimate}%</span>
                  <div className="w-full bg-white/20 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: `${playerCampaignState.supportEstimate}%` }} />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/10 border border-white/10">
                  <span className="text-[10px] text-blue-200 uppercase font-semibold block">Public Awareness</span>
                  <span className="font-heading font-black text-xl text-amber-300">{playerCampaignState.publicAwareness}%</span>
                  <div className="w-full bg-white/20 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: `${playerCampaignState.publicAwareness}%` }} />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/10 border border-white/10">
                  <span className="text-[10px] text-blue-200 uppercase font-semibold block">Party Organisation</span>
                  <span className="font-heading font-black text-xl text-cyan-300">{playerCampaignState.partyOrganisation}%</span>
                  <div className="w-full bg-white/20 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-cyan-400 h-1.5 rounded-full" style={{ width: `${playerCampaignState.partyOrganisation}%` }} />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/10 border border-white/10">
                  <span className="text-[10px] text-blue-200 uppercase font-semibold block">Campaign Reputation</span>
                  <span className="font-heading font-black text-xl text-purple-300">{playerCampaignState.campaignReputation}%</span>
                  <div className="w-full bg-white/20 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-purple-400 h-1.5 rounded-full" style={{ width: `${playerCampaignState.campaignReputation}%` }} />
                  </div>
                </div>
              </div>

              {/* Constituency Issues Grievance Bar */}
              <div className="mt-5 pt-4 border-t border-white/10">
                <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider mb-2">
                  Constituency Voter Priority Issues ({playerCampaignState.constituencyName})
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {playerCampaignState.issues.map((issue) => (
                    <div key={issue.name} className="p-2.5 rounded-lg bg-black/20 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-slate-200 truncate">{issue.name}</span>
                        <span className="font-mono font-bold text-amber-300">{issue.priority}%</span>
                      </div>
                      <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden">
                        <div className="bg-amber-400 h-1 rounded-full" style={{ width: `${issue.priority}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 12 CAMPAIGN ACTIONS MATRIX */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-heading font-extrabold text-base text-[#173B67] flex items-center gap-2">
                  <Megaphone className="w-4 h-4 text-[#F59E0B]" />
                  <span>Available Campaign Actions (12 Ground Strategies)</span>
                </h4>
                <span className="text-xs text-[#687386]">Realtime impact formulas on voter preference</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {campaignActions.map((action) => (
                  <div key={action.id} className="card-base p-4 card-hover flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-heading font-extrabold text-sm text-[#173B67] flex items-center gap-1.5">
                          {action.type === 'rally' && <Megaphone className="w-4 h-4 text-amber-500" />}
                          {action.type === 'door_to_door' && <DoorOpen className="w-4 h-4 text-emerald-500" />}
                          {action.type === 'social_media' && <Share2 className="w-4 h-4 text-blue-500" />}
                          {action.type === 'debate' && <Mic2 className="w-4 h-4 text-purple-500" />}
                          {action.type === 'manifesto' && <FileText className="w-4 h-4 text-indigo-500" />}
                          {action.type === 'volunteer' && <Users className="w-4 h-4 text-cyan-500" />}
                          {action.type === 'constituency_meeting' && <Building className="w-4 h-4 text-amber-600" />}
                          {action.type === 'digital_ad' && <Radio className="w-4 h-4 text-rose-500" />}
                          {action.type === 'town_hall' && <Building className="w-4 h-4 text-emerald-600" />}
                          {action.type === 'media_interview' && <Tv className="w-4 h-4 text-blue-600" />}
                          {action.type === 'alliance_campaign' && <Handshake className="w-4 h-4 text-amber-600" />}
                          {action.type === 'grassroots' && <ShieldCheck className="w-4 h-4 text-emerald-700" />}
                          <span>{action.name}</span>
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          action.impactLevel === 'HIGH' ? 'bg-emerald-100 text-emerald-800' :
                          action.impactLevel === 'MEDIUM' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                        }`}>
                          {action.impactLevel} IMPACT
                        </span>
                      </div>

                      <p className="text-xs text-[#687386] line-clamp-2 leading-relaxed">
                        {action.description}
                      </p>

                      <div className="mt-3 grid grid-cols-3 gap-1.5 text-[10px] text-center font-bold bg-[#F7F9FC] p-2 rounded-xl border border-[#E5EAF1]">
                        <div>
                          <span className="text-slate-400 block font-normal">Support</span>
                          <span className="text-emerald-600 font-mono">+{action.supportGain}%</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block font-normal">Awareness</span>
                          <span className="text-blue-600 font-mono">+{action.awarenessGain}%</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block font-normal">Cost</span>
                          <span className="text-[#173B67] font-mono">₹{action.cost.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onExecuteCampaign(action.id)}
                      className="btn btn-outline text-xs font-bold w-full py-2 hover:bg-[#173B67] hover:text-white transition-all flex items-center justify-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Launch Strategy</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 2: ADVANCED ELECTION VISUALIZATION (Arc representation & comparison) */}
        {activeSubTab === 'visualization' && (
          <div className="mt-6 space-y-6">
            {/* Lok Sabha Semi-Circular Seat Arc Representation */}
            <div className="card-base p-6 text-center">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5EAF1] mb-5">
                <div className="text-left">
                  <h3 className="font-heading font-extrabold text-base text-[#173B67]">
                    Lok Sabha Seat Distribution (543 Total Seats)
                  </h3>
                  <p className="text-xs text-[#687386]">Constitutional majority threshold: 272 seats</p>
                </div>
                <span className="badge badge-navy text-xs font-mono font-bold">543 / 543 Reported</span>
              </div>

              {/* Graphical Segmented Arc Simulation */}
              <div className="max-w-2xl mx-auto my-4">
                <div className="h-6 w-full rounded-full flex overflow-hidden shadow-inner border border-[#E5EAF1]">
                  {seatTally.map((item) => (
                    <div
                      key={item.party}
                      style={{
                        width: `${(item.seats / 543) * 100}%`,
                        backgroundColor: item.color
                      }}
                      title={`${item.party}: ${item.seats} seats (${((item.seats / 543) * 100).toFixed(1)}%)`}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-[#687386] font-mono mt-2 font-bold px-1">
                  <span>0 Seats</span>
                  <span className="text-[#173B67] font-black underline">Majority: 272 Seats</span>
                  <span>543 Seats</span>
                </div>
              </div>

              {/* Tally Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                {seatTally.map((item) => (
                  <div key={item.party} className="p-3.5 rounded-xl border text-left" style={{ borderColor: item.color + '40', backgroundColor: item.color + '0a' }}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="font-bold text-xs text-[#172033] truncate">{item.party}</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-heading font-black text-2xl text-[#173B67]">{item.seats}</span>
                      <span className="text-xs font-semibold text-slate-500 font-mono">{item.voteShare}%</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-1">
                      {item.seats >= 272 ? 'Majority Secured' : 'Coalition Required'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vote Share vs Seat Share Comparative Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card-base p-5 space-y-4">
                <h4 className="font-heading font-extrabold text-base text-[#173B67] flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-amber-500" />
                  <span>National Vote Share Breakdown</span>
                </h4>
                <div className="space-y-3">
                  {seatTally.map((item) => (
                    <div key={item.party} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                          <span>{item.party}</span>
                        </span>
                        <span className="font-mono font-bold">{item.voteShare}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="h-2 rounded-full"
                          style={{ width: `${item.voteShare * 2}%`, backgroundColor: item.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-base p-5 space-y-4">
                <h4 className="font-heading font-extrabold text-base text-[#173B67] flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>Voter Turnout & Margins</span>
                </h4>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                    <span className="text-xs text-emerald-800 font-bold block">National Turnout</span>
                    <span className="font-heading font-black text-3xl text-emerald-700">67.4%</span>
                    <span className="text-[10px] text-emerald-600 mt-1 block">64.2 Crore Voters</span>
                  </div>
                  <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                    <span className="text-xs text-blue-800 font-bold block">Average Margin</span>
                    <span className="font-heading font-black text-3xl text-blue-700">84,200</span>
                    <span className="text-[10px] text-blue-600 mt-1 block">Per Parliamentary Seat</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F7F9FC] border border-[#E5EAF1] text-xs space-y-1">
                  <span className="font-bold text-[#173B67] block">Electoral Integrity Index</span>
                  <p className="text-[11px] text-[#687386]">
                    Voter-Verifiable Paper Audit Trail (VVPAT) matched 100% across all sampled booths. Zero statistical anomalies reported.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 3: CAST EVM BALLOT (REAL PLAYER VOTING) */}
        {activeSubTab === 'ballot' && (
          <div className="mt-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0" />
                <span>
                  <strong>Secret Simulated Ballot:</strong> Individual player votes are encrypted on the server. Only aggregate constituency tallies are published.
                </span>
              </div>

              {/* Constituency Selector */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-bold">Constituency:</span>
                <select
                  value={selectedSeatFilter}
                  onChange={(e) => setSelectedSeatFilter(e.target.value)}
                  className="p-1.5 rounded-lg bg-white border border-blue-300 font-semibold focus:outline-none"
                >
                  {constituencies.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.stateCode})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* EVM Ballot Unit Simulation */}
            <div className="card-base p-6 border-2 border-slate-300 bg-slate-50 shadow-inner max-w-2xl mx-auto rounded-3xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-300 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-xs font-black tracking-wider text-slate-800 uppercase">
                    EVM BALLOTING UNIT · BHARAT CHUNAV
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">Unit ID: EVM-LS-2030-UP</span>
              </div>

              <div className="space-y-3">
                {seatCandidates.map((cand, idx) => (
                  <div
                    key={cand.id}
                    className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between gap-3 hover:border-[#173B67] transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div>
                        <div className="font-heading font-extrabold text-sm text-[#172033] flex items-center gap-1.5">
                          <span>{cand.candidateName}</span>
                          {cand.isPlayer && (
                            <span className="badge badge-navy text-[10px]">YOU</span>
                          )}
                        </div>
                        <span className="text-xs text-[#687386] font-semibold">
                          {cand.partyAbbr} · Symbol: {cand.symbolName}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onCastBallot(cand.id)}
                      disabled={userVoted}
                      className={`btn text-xs font-black px-4 py-2 rounded-xl flex items-center gap-2 ${
                        userVoted
                          ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md active:scale-95'
                      }`}
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-300" />
                      <span>{userVoted ? 'VOTED' : 'PRESS BLUE BUTTON'}</span>
                    </button>
                  </div>
                ))}
              </div>

              {userVoted && (
                <div className="mt-4 p-3 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold text-center flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>VVPAT slip generated & slip dropped in sealed ballot compartment.</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
