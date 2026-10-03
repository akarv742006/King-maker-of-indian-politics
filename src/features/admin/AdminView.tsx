import React, { useState } from 'react';
import {
  ShieldAlert,
  RotateCcw,
  CheckCircle2,
  Database,
  Lock,
  Unlock,
  AlertTriangle,
  Play,
  Pause,
  Award,
  Calendar,
  DollarSign,
  Activity,
  Flame,
  Search,
  Sparkles,
  FileCheck2,
  Clock,
  Send,
  Zap,
  Vote
} from 'lucide-react';
import { Election, ElectionPhase, AdminAction, ElectionResultRelease, PoliticalSalarySetting } from '../../types';

interface AdminViewProps {
  election: Election;
  adminAuditLogs: AdminAction[];
  resultReleaseEvent: ElectionResultRelease | null;
  salarySettings: PoliticalSalarySetting[];
  isSimulatingScenario: boolean;
  scenarioStepIndex: number;
  scenarioLogs: string[];
  onAdvancePhase: (phase: ElectionPhase) => void;
  onCreateElection: (data: Partial<Election>) => void;
  onFreezeVoting: (frozen: boolean) => void;
  onTriggerRecount: () => void;
  onReleaseResults: (reason: string) => void;
  onUpdateSalary: (office: string, amount: number) => void;
  onInjectCrisis: (title: string, summary: string) => void;
  onRunScenario: () => void;
  onResetGameData: () => void;
  onAddNotification: (msg: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  election,
  adminAuditLogs,
  resultReleaseEvent,
  salarySettings,
  isSimulatingScenario,
  scenarioStepIndex,
  scenarioLogs,
  onAdvancePhase,
  onCreateElection,
  onFreezeVoting,
  onTriggerRecount,
  onReleaseResults,
  onUpdateSalary,
  onInjectCrisis,
  onRunScenario,
  onResetGameData,
  onAddNotification,
  onNavigateTab
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [auditSearch, setAuditSearch] = useState('');
  const [releaseReason, setReleaseReason] = useState('Certified under statutory review by Chief Election Commissioner');

  // Create Election Form State
  const [newElectionTitle, setNewElectionTitle] = useState('General Election 2030');
  const [newElectionType, setNewElectionType] = useState<'lok_sabha' | 'state_assembly'>('lok_sabha');
  const [newTotalSeats, setNewTotalSeats] = useState(543);
  const [newNomStart, setNewNomStart] = useState('2030-04-01 09:00');
  const [newNomEnd, setNewNomEnd] = useState('2030-04-10 18:00');
  const [newCampStart, setNewCampStart] = useState('2030-04-11 08:00');
  const [newCampEnd, setNewCampEnd] = useState('2030-04-28 17:00');
  const [newVoteStart, setNewVoteStart] = useState('2030-04-30 07:00');
  const [newVoteEnd, setNewVoteEnd] = useState('2030-05-07 18:00');
  const [newCountStart, setNewCountStart] = useState('2030-05-10 08:00');
  const [newVotingSystem, setNewVotingSystem] = useState<'First Past The Post' | 'Proportional Representation'>('First Past The Post');
  const [newPlayerVoting, setNewPlayerVoting] = useState(true);

  // Crisis injection form state
  const [crisisTitle, setCrisisTitle] = useState('Severe Monsoon Floods in Ganga Basin');
  const [crisisSummary, setCrisisSummary] = useState('Excessive rainfall triggers river breaches affecting 18 districts. State infrastructure relief mobilized.');

  // Tally breakdown for locked results review
  const lockedTally = [
    { party: 'BJP (NDA Lead)', seats: 238, voteShare: 39.2, color: '#FF9933' },
    { party: 'INC (I.N.D.I.A)', seats: 182, voteShare: 31.7, color: '#1976D2' },
    { party: 'Regional Front (SP / TMC / DMK)', seats: 71, voteShare: 14.8, color: '#2E7D32' },
    { party: 'Others & Independents', seats: 52, voteShare: 14.3, color: '#94A3B8' }
  ];

  const filteredAuditLogs = adminAuditLogs.filter(
    (log) =>
      log.action.toLowerCase().includes(auditSearch.toLowerCase()) ||
      log.targetType.toLowerCase().includes(auditSearch.toLowerCase()) ||
      log.newValue.toLowerCase().includes(auditSearch.toLowerCase()) ||
      log.reason.toLowerCase().includes(auditSearch.toLowerCase())
  );

  const handleCreateElectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateElection({
      title: newElectionTitle,
      type: newElectionType,
      totalSeats: newTotalSeats,
      majorityThreshold: Math.floor(newTotalSeats / 2) + 1,
      nominationStart: newNomStart,
      nominationEnd: newNomEnd,
      campaignStart: newCampStart,
      campaignEnd: newCampEnd,
      votingStart: newVoteStart,
      votingEnd: newVoteEnd,
      countingStart: newCountStart,
      votingSystem: newVotingSystem,
      playerVotingEnabled: newPlayerVoting,
      phase: 'nominations'
    });
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6">
      {/* High-Command Header Banner */}
      <div className="rounded-2xl bg-[#0f2644] text-white p-6 sm:p-7 shadow-md border border-[#173B67] relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-gradient-to-l from-amber-500/10 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30 mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 pulse-dot" />
              <span>NIRVACHAN SADAN · ECI CONTROL CENTER</span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight text-white flex items-center gap-2.5">
              <span>ELECTION OF INDIA</span>
              <span className="text-sm font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded">
                GOD MODE
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Absolute administrative control over election lifecycles, phase schedules, result release locks, salaries, national crises, and immutable audit trails.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn btn-saffron text-white text-xs font-bold px-4 py-2.5 shadow-md flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>CREATE ELECTION</span>
            </button>
            <button
              onClick={() => onNavigateTab('dashboard')}
              className="btn bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold px-4 py-2.5"
            >
              <span>Back to Republic View</span>
            </button>
          </div>
        </div>
      </div>

      {/* 26-STEP MASTER SIMULATION BANNER */}
      <div className="card-base p-5 border-amber-300 bg-gradient-to-r from-amber-50 via-white to-amber-50 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-amber-500 text-white">
                <Zap className="w-4 h-4" />
              </span>
              <h3 className="font-heading font-extrabold text-base text-[#173B67]">
                Master 26-Step End-to-End Political Life Simulation
              </h3>
            </div>
            <p className="text-xs text-[#687386]">
              Runs the complete 26-step blueprint scenario: Election Creation → Party Appointments → Candidate Selection → Campaign → EVM Voting → Results Lock → ECI Release → Government Coalition → Floor Test → Salaries → Dual Seat Win Choice → Anti-Defection Vacancy!
            </p>
          </div>

          <button
            onClick={onRunScenario}
            disabled={isSimulatingScenario}
            className={`btn text-xs font-extrabold px-5 py-2.5 shadow-md flex items-center gap-2 shrink-0 ${
              isSimulatingScenario
                ? 'bg-slate-400 text-white cursor-not-allowed'
                : 'bg-[#173B67] hover:bg-[#0f2644] text-white'
            }`}
          >
            {isSimulatingScenario ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Simulating Step {scenarioStepIndex}/26...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>RUN 26-STEP SIMULATION</span>
              </>
            )}
          </button>
        </div>

        {scenarioLogs.length > 0 && (
          <div className="mt-4 p-3 rounded-xl bg-slate-900 text-slate-200 font-mono text-[11px] max-h-40 overflow-y-auto space-y-1">
            <div className="flex items-center justify-between text-amber-400 font-bold border-b border-slate-800 pb-1 mb-2">
              <span>Simulation Execution Log:</span>
              <span>Step {scenarioStepIndex} / 26</span>
            </div>
            {scenarioLogs.map((log, idx) => (
              <div key={idx} className="leading-relaxed flex items-start gap-2">
                <span className="text-emerald-400">›</span>
                <span>{log}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 1: NATIONAL GAME STATUS (Exact Prompt Architecture) */}
      <div className="rounded-2xl border border-[#E5EAF1] bg-white p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5EAF1] mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🇮🇳</span>
            <span className="font-heading font-black text-sm uppercase tracking-wider text-[#173B67]">
              National Game Status
            </span>
          </div>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            Active Sovereign Clock
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-3.5 rounded-xl bg-[#F7F9FC] border border-[#E5EAF1]">
            <p className="text-[11px] font-bold text-[#687386] uppercase">Active Election</p>
            <p className="font-heading font-extrabold text-sm text-[#173B67] truncate mt-1">{election.title}</p>
            <span className="text-[10px] text-blue-600 font-semibold">{election.totalSeats} Parliamentary Seats</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F7F9FC] border border-[#E5EAF1]">
            <p className="text-[11px] font-bold text-[#687386] uppercase">ECI Status</p>
            <p className="font-heading font-extrabold text-sm text-amber-600 uppercase mt-1">
              {election.phase.replace('_', ' ')}
            </p>
            <span className="text-[10px] text-slate-500 font-medium">Model Code of Conduct Enforced</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F7F9FC] border border-[#E5EAF1]">
            <p className="text-[11px] font-bold text-[#687386] uppercase">Phase Time Remaining</p>
            <p className="font-heading font-extrabold text-sm text-[#173B67] mt-1 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>{Math.floor(election.phaseTimeRemainingSeconds / 60)}m {election.phaseTimeRemainingSeconds % 60}s</span>
            </p>
            <span className="text-[10px] text-slate-500">Autonomous Server Tick</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F7F9FC] border border-[#E5EAF1]">
            <p className="text-[11px] font-bold text-[#687386] uppercase">Registered Players</p>
            <p className="font-heading font-extrabold text-lg text-[#173B67] mt-1">18,421</p>
            <span className="text-[10px] text-emerald-600 font-semibold">+412 today</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F7F9FC] border border-[#E5EAF1]">
            <p className="text-[11px] font-bold text-[#687386] uppercase">Active Players</p>
            <p className="font-heading font-extrabold text-lg text-[#173B67] mt-1">3,842</p>
            <span className="text-[10px] text-amber-600 font-semibold">Realtime Sessions</span>
          </div>
        </div>
      </div>

      {/* SECTION 2: ELECTION CONTROL MATRIX */}
      <div className="card-base p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E5EAF1]">
          <div>
            <h3 className="font-heading font-extrabold text-base text-[#173B67] flex items-center gap-2">
              <Vote className="w-4 h-4 text-[#F59E0B]" />
              <span>Election Control & Phase Sequencing</span>
            </h3>
            <p className="text-xs text-[#687386]">
              Directly command the phase transition pipeline, freeze voting booths, or trigger audited recounts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onFreezeVoting(!election.votingFrozen)}
              className={`btn text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 ${
                election.votingFrozen
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-rose-600 hover:bg-rose-700 text-white'
              }`}
            >
              {election.votingFrozen ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
              <span>{election.votingFrozen ? 'UNFREEZE VOTING' : 'FREEZE VOTING'}</span>
            </button>

            <button
              onClick={onTriggerRecount}
              className="btn btn-outline text-xs font-bold px-3 py-1.5"
              title="Audit and recount verified EVM ballots"
            >
              <RotateCcw className="w-3.5 h-3.5 text-blue-600" />
              <span>TRIGGER RECOUNT</span>
            </button>
          </div>
        </div>

        {/* Phase Timeline Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {[
            { id: 'draft', label: 'Draft' },
            { id: 'scheduled', label: 'Scheduled' },
            { id: 'nominations', label: 'Nominations' },
            { id: 'campaigning', label: 'Campaign' },
            { id: 'voting', label: 'Voting' },
            { id: 'counting', label: 'Counting' },
            { id: 'results_locked', label: 'Locked' }
          ].map((item) => {
            const isCurrent = election.phase === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onAdvancePhase(item.id as ElectionPhase)}
                className={`p-3 rounded-xl border text-xs font-extrabold transition-all flex flex-col items-center justify-center gap-1 ${
                  isCurrent
                    ? 'bg-[#173B67] text-white border-[#173B67] shadow-md ring-2 ring-amber-400'
                    : 'bg-[#F7F9FC] text-[#172033] border-[#E5EAF1] hover:bg-white hover:border-slate-300'
                }`}
              >
                <span className="text-[10px] text-amber-500 uppercase font-mono tracking-wider">Step</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 3: LIVE STATISTICS BAR */}
      <div className="card-base p-4 sm:p-5">
        <div className="text-[11px] font-bold text-[#687386] uppercase tracking-wider mb-3">
          Live Election Commission Statistics
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-center">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] text-[#687386] font-semibold block">Registered Voters</span>
            <span className="font-heading font-black text-xl text-[#173B67]">18,421</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] text-[#687386] font-semibold block">Turnout</span>
            <span className="font-heading font-black text-xl text-emerald-600">67.4%</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] text-[#687386] font-semibold block">Candidates</span>
            <span className="font-heading font-black text-xl text-[#173B67]">1,482</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] text-[#687386] font-semibold block">Parties</span>
            <span className="font-heading font-black text-xl text-[#173B67]">43</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] text-[#687386] font-semibold block">Constituencies</span>
            <span className="font-heading font-black text-xl text-[#173B67]">543</span>
          </div>
        </div>
      </div>

      {/* SECTION 4: RESULTS RELEASE SYSTEM (THE HIGHEST IMPORTANCE GOD-MODE POWER) */}
      <div className="card-base p-6 border-2 border-[#173B67]/20 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5EAF1]">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${
              election.resultsReleased ? 'bg-emerald-600' : 'bg-rose-600'
            }`}>
              {election.resultsReleased ? <CheckCircle2 className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-lg text-[#173B67]">
                {election.resultsReleased
                  ? '🟢 OFFICIAL GENERAL ELECTION RESULTS RELEASED'
                  : '🔒 543 / 543 CONSTITUENCIES COUNTED · RESULTS LOCKED'}
              </h3>
              <p className="text-xs text-[#687386]">
                {election.resultsReleased
                  ? 'Results have been certified and published to all citizens and the public dashboard.'
                  : 'Results are calculated and sealed. The public CANNOT see them until you press "Release Official Results".'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigateTab('elections')}
              className="btn btn-outline text-xs font-bold px-3 py-2"
            >
              <span>View Visualization</span>
            </button>
          </div>
        </div>

        {/* Tally Review Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#F7F9FC] text-[#687386] font-bold uppercase text-[10px] border-b border-[#E5EAF1]">
              <tr>
                <th className="py-2 px-3">Party</th>
                <th className="py-2 px-3 text-right">Projected Seats</th>
                <th className="py-2 px-3 text-right">Vote %</th>
                <th className="py-2 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EAF1]">
              {lockedTally.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-bold text-[#172033] flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span>{item.party}</span>
                  </td>
                  <td className="py-2.5 px-3 text-right font-heading font-extrabold text-sm text-[#173B67]">
                    {item.seats}
                  </td>
                  <td className="py-2.5 px-3 text-right font-semibold text-slate-700">
                    {item.voteShare}%
                  </td>
                  <td className="py-2.5 px-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      idx === 0 ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {idx === 0 ? 'Single Largest Party' : 'Opposition'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* RELEASE ACTION CONSOLE */}
        <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
          {!election.resultsReleased ? (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex-1">
                <label className="text-xs font-bold text-[#173B67] block mb-1">
                  Statutory Release Authorization Note:
                </label>
                <input
                  type="text"
                  value={releaseReason}
                  onChange={(e) => setReleaseReason(e.target.value)}
                  className="w-full text-xs p-2.5 bg-white border border-[#E5EAF1] rounded-lg focus:outline-none focus:border-[#173B67]"
                  placeholder="Enter statutory reason for result certification..."
                />
              </div>

              <button
                onClick={() => onReleaseResults(releaseReason)}
                className="btn btn-green text-white text-xs font-black px-6 py-3 shadow-lg flex items-center justify-center gap-2 shrink-0"
              >
                <Unlock className="w-4 h-4 text-white" />
                <span>🟢 RELEASE OFFICIAL RESULTS</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <span className="font-bold text-emerald-700 flex items-center gap-1.5">
                  <FileCheck2 className="w-4 h-4" />
                  <span>Immutable Result Event: RESULT_RELEASED</span>
                </span>
                <p className="text-[11px] text-slate-600 font-mono">
                  Audit Hash: {resultReleaseEvent?.auditHash || 'SHA256:7f8a9e2d4c1b5a6f8e9d0c1b2a3f'}
                </p>
              </div>

              <div className="text-[11px] text-slate-500 font-medium sm:text-right">
                <div>Released At: {resultReleaseEvent?.releaseTimestamp || 'Today, Just now'}</div>
                <div>Authorized By: Chief Election Commissioner</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 5: SALARY & ECONOMIC CONFIGURATION + CRISIS INJECTOR */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Salary Configurator */}
        <div className="card-base p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E5EAF1]">
            <h3 className="font-heading font-extrabold text-base text-[#173B67] flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span>Political Salary Settings</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">ECI Statutory Rule</span>
          </div>
          <p className="text-xs text-[#687386]">
            Configure monthly game salaries credited to elected officials during the autonomous monthly pay tick.
          </p>

          <div className="space-y-2.5">
            {salarySettings.map((setting) => (
              <div key={setting.office} className="flex items-center justify-between p-2.5 rounded-xl bg-[#F7F9FC] border border-[#E5EAF1] text-xs">
                <span className="font-bold text-[#172033]">{setting.office}</span>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">₹</span>
                  <input
                    type="number"
                    value={setting.monthlySalary}
                    onChange={(e) => onUpdateSalary(setting.office, Number(e.target.value))}
                    className="w-28 text-right p-1 bg-white border border-[#E5EAF1] rounded text-xs font-mono font-bold text-[#173B67]"
                  />
                  <span className="text-[10px] text-slate-400">/mo</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* National Crisis & Event Injector */}
        <div className="card-base p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E5EAF1]">
            <h3 className="font-heading font-extrabold text-base text-[#173B67] flex items-center gap-2">
              <Flame className="w-4 h-4 text-rose-500" />
              <span>National Crisis & Event Injector</span>
            </h3>
            <span className="text-[10px] bg-rose-50 text-rose-700 px-2 py-0.5 rounded font-bold">God Mode Action</span>
          </div>
          <p className="text-xs text-[#687386]">
            Inject unexpected real-world challenges (disasters, economic shocks, court rulings) to test government response and approval ratings.
          </p>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-bold text-[#173B67] block mb-1">Event / Crisis Headline</label>
              <input
                type="text"
                value={crisisTitle}
                onChange={(e) => setCrisisTitle(e.target.value)}
                className="w-full text-xs p-2.5 bg-[#F7F9FC] border border-[#E5EAF1] rounded-xl focus:outline-none focus:border-[#173B67]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#173B67] block mb-1">Impact Description</label>
              <textarea
                value={crisisSummary}
                onChange={(e) => setCrisisSummary(e.target.value)}
                rows={2}
                className="w-full text-xs p-2.5 bg-[#F7F9FC] border border-[#E5EAF1] rounded-xl focus:outline-none focus:border-[#173B67]"
              />
            </div>

            <button
              onClick={() => onInjectCrisis(crisisTitle, crisisSummary)}
              className="btn btn-primary w-full text-xs font-bold py-2.5 flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Broadcast National Crisis Event</span>
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 6: ADMIN ACTION AUDIT LOG (Mandatory for God Mode) */}
      <div className="card-base p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E5EAF1]">
          <div>
            <h3 className="font-heading font-extrabold text-base text-[#173B67] flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-emerald-600" />
              <span>Cryptographic Admin Action Audit Log</span>
            </h3>
            <p className="text-xs text-[#687386]">
              Every administrative override, result modification, and election manipulation is permanently recorded with SHA-256 signatures.
            </p>
          </div>

          <div className="w-full sm:w-64 relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search audit trail..."
              value={auditSearch}
              onChange={(e) => setAuditSearch(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-2 bg-[#F7F9FC] border border-[#E5EAF1] rounded-xl focus:outline-none focus:border-[#173B67]"
            />
          </div>
        </div>

        <div className="overflow-x-auto max-h-72">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#F7F9FC] text-[#687386] font-bold uppercase text-[10px] sticky top-0 border-b border-[#E5EAF1]">
              <tr>
                <th className="py-2 px-3">Timestamp</th>
                <th className="py-2 px-3">Admin</th>
                <th className="py-2 px-3">Action</th>
                <th className="py-2 px-3">Target</th>
                <th className="py-2 px-3">New Value</th>
                <th className="py-2 px-3">Reason</th>
                <th className="py-2 px-3 font-mono">Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EAF1] font-mono text-[11px]">
              {filteredAuditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 font-sans">
                  <td className="py-2 px-3 text-slate-500 whitespace-nowrap">{log.timestamp}</td>
                  <td className="py-2 px-3 font-bold text-[#173B67] whitespace-nowrap">{log.adminName}</td>
                  <td className="py-2 px-3 font-mono font-bold text-amber-700 whitespace-nowrap">{log.action}</td>
                  <td className="py-2 px-3 text-slate-600 whitespace-nowrap">{log.targetType}</td>
                  <td className="py-2 px-3 font-semibold text-[#172033] max-w-xs truncate">{log.newValue}</td>
                  <td className="py-2 px-3 text-slate-500 max-w-xs truncate">{log.reason}</td>
                  <td className="py-2 px-3 font-mono text-[10px] text-slate-400 truncate max-w-[100px]" title={log.auditHash}>
                    {log.auditHash.substring(0, 14)}...
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE NEW ELECTION MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-6 sm:p-7 shadow-2xl border border-[#E5EAF1] animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EAF1] mb-5">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-[#173B67] text-white">
                  <Vote className="w-5 h-5 text-amber-400" />
                </span>
                <div>
                  <h3 className="font-heading font-extrabold text-lg text-[#173B67]">
                    Create New Election Notification
                  </h3>
                  <p className="text-xs text-[#687386]">Statutory gazette notification with custom voting phases</p>
                </div>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateElectionSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-[#173B67] block mb-1">Election Name</label>
                <input
                  type="text"
                  required
                  value={newElectionTitle}
                  onChange={(e) => setNewElectionTitle(e.target.value)}
                  className="w-full p-2.5 bg-[#F7F9FC] border border-[#E5EAF1] rounded-xl font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-[#173B67] block mb-1">Election Type</label>
                  <select
                    value={newElectionType}
                    onChange={(e) => setNewElectionType(e.target.value as any)}
                    className="w-full p-2.5 bg-[#F7F9FC] border border-[#E5EAF1] rounded-xl font-semibold"
                  >
                    <option value="lok_sabha">Lok Sabha (National)</option>
                    <option value="state_assembly">State Assembly (Vidhan Sabha)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#173B67] block mb-1">Number of Seats</label>
                  <input
                    type="number"
                    value={newTotalSeats}
                    onChange={(e) => setNewTotalSeats(Number(e.target.value))}
                    className="w-full p-2.5 bg-[#F7F9FC] border border-[#E5EAF1] rounded-xl font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-[#173B67] block mb-1">Nomination Start</label>
                  <input
                    type="text"
                    value={newNomStart}
                    onChange={(e) => setNewNomStart(e.target.value)}
                    className="w-full p-2.5 bg-[#F7F9FC] border border-[#E5EAF1] rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#173B67] block mb-1">Nomination End</label>
                  <input
                    type="text"
                    value={newNomEnd}
                    onChange={(e) => setNewNomEnd(e.target.value)}
                    className="w-full p-2.5 bg-[#F7F9FC] border border-[#E5EAF1] rounded-xl font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-[#173B67] block mb-1">Campaign Start</label>
                  <input
                    type="text"
                    value={newCampStart}
                    onChange={(e) => setNewCampStart(e.target.value)}
                    className="w-full p-2.5 bg-[#F7F9FC] border border-[#E5EAF1] rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#173B67] block mb-1">Campaign End</label>
                  <input
                    type="text"
                    value={newCampEnd}
                    onChange={(e) => setNewCampEnd(e.target.value)}
                    className="w-full p-2.5 bg-[#F7F9FC] border border-[#E5EAF1] rounded-xl font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-[#173B67] block mb-1">Voting Start</label>
                  <input
                    type="text"
                    value={newVoteStart}
                    onChange={(e) => setNewVoteStart(e.target.value)}
                    className="w-full p-2.5 bg-[#F7F9FC] border border-[#E5EAF1] rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#173B67] block mb-1">Voting End</label>
                  <input
                    type="text"
                    value={newVoteEnd}
                    onChange={(e) => setNewVoteEnd(e.target.value)}
                    className="w-full p-2.5 bg-[#F7F9FC] border border-[#E5EAF1] rounded-xl font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-[#173B67] block mb-1">Counting Start</label>
                  <input
                    type="text"
                    value={newCountStart}
                    onChange={(e) => setNewCountStart(e.target.value)}
                    className="w-full p-2.5 bg-[#F7F9FC] border border-[#E5EAF1] rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#173B67] block mb-1">Voting System</label>
                  <select
                    value={newVotingSystem}
                    onChange={(e) => setNewVotingSystem(e.target.value as any)}
                    className="w-full p-2.5 bg-[#F7F9FC] border border-[#E5EAF1] rounded-xl font-semibold"
                  >
                    <option value="First Past The Post">First Past The Post (FPTP)</option>
                    <option value="Proportional Representation">Proportional Representation</option>
                  </select>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-amber-900 block">Result Release Protocol</span>
                  <span className="text-[11px] text-amber-700">MANUAL BY ADMIN (Results stay locked until certified)</span>
                </div>
                <span className="badge bg-amber-200 text-amber-900 font-mono text-[10px]">ENFORCED</span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E5EAF1]">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="btn btn-outline text-xs font-semibold px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary text-xs font-bold px-6 py-2 shadow-md"
                >
                  Publish Gazette & Save Election
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
