import React, { useState } from 'react';
import {
  Users,
  PlusCircle,
  Shield,
  Award,
  CheckCircle2,
  AlertCircle,
  FileText,
  DollarSign,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  UserCheck,
  Building,
  Crown,
  Handshake,
  Vote,
  Settings2
} from 'lucide-react';
import {
  Party,
  PartyIdeology,
  PlayerProfile,
  PartyOfficeBearer,
  PartyOfficeRole,
  CandidateSelectionMethod,
  ConstituencyInfo,
  PartySwitchingRuleMode
} from '../../types';

interface PartiesViewProps {
  parties: Party[];
  profile: PlayerProfile;
  partyOffices: Record<string, PartyOfficeBearer[]>;
  constituencies: ConstituencyInfo[];
  partySwitchingRule: PartySwitchingRuleMode;
  onSetPartySwitchingRule: (mode: PartySwitchingRuleMode) => void;
  onAppointOfficeBearer: (partyId: string, role: PartyOfficeRole, memberName: string) => void;
  onSelectCandidate: (constituencyId: string, candidateName: string, method: CandidateSelectionMethod) => void;
  onSwitchParty: (newPartyId: string) => void;
  onCreateParty: (data: Omit<Party, 'id' | 'founderId' | 'memberCount' | 'treasuryBalance'>) => void;
  onJoinParty: (partyId: string) => void;
}

const AVAILABLE_SYMBOLS = [
  'Lotus',
  'Hand',
  'Elephant',
  'Broom',
  'Rising Sun',
  'Bicycle',
  'Scales of Justice',
  'Lion',
  'Flaming Torch',
  'Charkha (Wheel)',
  'Tractor',
  'Conch Shell',
  'Bow & Arrow',
  'Book of Constitution'
];

const PARTY_OFFICE_ROLES: PartyOfficeRole[] = [
  'President',
  'Vice President',
  'General Secretary',
  'Joint Secretary',
  'Treasurer',
  'Youth Wing Leader',
  'Women Wing Leader',
  'State President',
  'District President',
  'Spokesperson',
  'Whip',
  'Campaign Manager'
];

export const PartiesView: React.FC<PartiesViewProps> = ({
  parties,
  profile,
  partyOffices,
  constituencies,
  partySwitchingRule,
  onSetPartySwitchingRule,
  onAppointOfficeBearer,
  onSelectCandidate,
  onSwitchParty,
  onCreateParty,
  onJoinParty
}) => {
  const [activeTab, setActiveTab] = useState<'hq' | 'catalog' | 'wizard'>('hq');
  const [wizardStep, setWizardStep] = useState(1);

  // Office Appointment State
  const [selectedOfficeRole, setSelectedOfficeRole] = useState<PartyOfficeRole>('Vice President');
  const [newOfficeBearerName, setNewOfficeBearerName] = useState('');

  // Candidate Selection State
  const [candidateConstituencyId, setCandidateConstituencyId] = useState(constituencies[0]?.id || 'c-1');
  const [nominatedCandidateName, setNominatedCandidateName] = useState(profile.displayName);
  const [selectionMethod, setSelectionMethod] = useState<CandidateSelectionMethod>('leader');

  // Wizard Form State
  const [partyName, setPartyName] = useState('');
  const [abbreviation, setAbbreviation] = useState('');
  const [symbolName, setSymbolName] = useState('Scales of Justice');
  const [primaryColor, setPrimaryColor] = useState('#173B67');
  const [secondaryColor, setSecondaryColor] = useState('#F59E0B');
  const [ideology, setIdeology] = useState<PartyIdeology>('Centrist');
  const [manifestoSummary, setManifestoSummary] = useState('');
  const [internalElections, setInternalElections] = useState(36);
  const [whipEnforced, setWhipEnforced] = useState(true);
  const [ticketCost, setTicketCost] = useState(50000);
  const [formError, setFormError] = useState('');

  const userParty = parties.find((p) => p.id === profile.partyId) || parties[0];
  const userPartyOfficeBearers = (userParty && partyOffices[userParty.id]) || [];

  const handleNextStep = () => {
    setFormError('');
    if (wizardStep === 1) {
      if (!partyName.trim() || !abbreviation.trim()) {
        setFormError('Please provide both party name and abbreviation.');
        return;
      }
      const duplicate = parties.some(
        (p) =>
          p.name.toLowerCase() === partyName.toLowerCase() ||
          p.abbreviation.toLowerCase() === abbreviation.toLowerCase()
      );
      if (duplicate) {
        setFormError('A political party with this name or abbreviation is already registered!');
        return;
      }
    }
    if (wizardStep === 4) {
      if (!manifestoSummary.trim()) {
        setFormError('Please enter a brief manifesto or core pledge for citizens.');
        return;
      }
    }
    setWizardStep((prev) => Math.min(6, prev + 1));
  };

  const handleFinishWizard = () => {
    onCreateParty({
      name: partyName,
      abbreviation: abbreviation.toUpperCase(),
      symbolName,
      primaryColor,
      secondaryColor,
      presidentName: profile.displayName,
      manifestoSummary,
      ideology,
      isNationalParty: false,
      constitutionRules: {
        internalElectionFrequencyMonths: internalElections,
        whipEnforced,
        candidateTicketCost: ticketCost
      }
    });
    setActiveTab('hq');
    setWizardStep(1);
  };

  const handleAppointSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOfficeBearerName.trim() || !userParty) return;
    onAppointOfficeBearer(userParty.id, selectedOfficeRole, newOfficeBearerName.trim());
    setNewOfficeBearerName('');
  };

  const handleCandidateSelectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nominatedCandidateName.trim()) return;
    onSelectCandidate(candidateConstituencyId, nominatedCandidateName.trim(), selectionMethod);
  };

  return (
    <div className="space-y-6">
      {/* Top Navigation Strip */}
      <div className="card-base p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-extrabold text-xl text-[#173B67] flex items-center gap-2">
            <Users className="w-5 h-5 text-[#F59E0B]" />
            <span>Political Parties & Alliances</span>
          </h2>
          <p className="text-xs text-[#687386]">
            Internal party democracy, central party headquarters, office bearer appointments, candidate selection, and anti-defection rules.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-[#F7F9FC] p-1.5 rounded-2xl border border-[#E5EAF1]">
          <button
            onClick={() => setActiveTab('hq')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'hq'
                ? 'bg-[#173B67] text-white shadow-xs'
                : 'text-[#687386] hover:text-[#172033]'
            }`}
          >
            <Crown className="w-3.5 h-3.5" />
            <span>Party HQ Command</span>
          </button>

          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'catalog'
                ? 'bg-[#173B67] text-white shadow-xs'
                : 'text-[#687386] hover:text-[#172033]'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Registered Parties ({parties.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('wizard');
              setWizardStep(1);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'wizard'
                ? 'bg-[#F59E0B] text-white shadow-xs'
                : 'text-[#F59E0B] hover:bg-amber-50'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Register New Party</span>
          </button>
        </div>
      </div>

      {/* TAB 1: PARTY HQ COMMAND (Exact Prompt Architecture 10 & 11) */}
      {activeTab === 'hq' && userParty && (
        <div className="space-y-6">
          {/* Party HQ Hero Banner */}
          <div className="rounded-2xl p-6 text-white shadow-md relative overflow-hidden" style={{ backgroundColor: userParty.primaryColor }}>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
                  Central Party Headquarters · Secretariat
                </span>
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-white mt-1">
                  {userParty.name} ({userParty.abbreviation})
                </h3>
                <p className="text-xs text-white/80 max-w-2xl mt-1">
                  Symbol: <strong>{userParty.symbolName}</strong> · Ideology: <strong>{userParty.ideology}</strong> · President: <strong>{userParty.presidentName}</strong>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-black/20 backdrop-blur-xs text-right border border-white/20">
                  <span className="text-[10px] text-white/70 block uppercase font-bold">Party Treasury</span>
                  <span className="font-heading font-black text-2xl text-amber-300">
                    ₹{(userParty.treasuryBalance / 100000).toFixed(1)} Lakh
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-black/20 backdrop-blur-xs text-right border border-white/20">
                  <span className="text-[10px] text-white/70 block uppercase font-bold">Total Members</span>
                  <span className="font-heading font-black text-2xl text-emerald-300">
                    {userParty.memberCount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Office Bearers & Candidate Selection */}
            <div className="lg:col-span-2 space-y-6">
              {/* Appoint Party Office Bearers (12 Positions) */}
              <div className="card-base p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E5EAF1]">
                  <div>
                    <h4 className="font-heading font-extrabold text-base text-[#173B67] flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-[#F59E0B]" />
                      <span>Appoint Party Office Bearers (12 Leadership Positions)</span>
                    </h4>
                    <p className="text-xs text-[#687386]">
                      Party leader commands executive appointments across central, wing, and state leadership.
                    </p>
                  </div>
                </div>

                {/* Appointment Form */}
                <form onSubmit={handleAppointSubmit} className="p-3 rounded-xl bg-[#F7F9FC] border border-[#E5EAF1] flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                  <select
                    value={selectedOfficeRole}
                    onChange={(e) => setSelectedOfficeRole(e.target.value as PartyOfficeRole)}
                    className="p-2 bg-white border border-[#E5EAF1] rounded-lg text-xs font-bold text-[#173B67] focus:outline-none"
                  >
                    {PARTY_OFFICE_ROLES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    required
                    placeholder="Enter member display name..."
                    value={newOfficeBearerName}
                    onChange={(e) => setNewOfficeBearerName(e.target.value)}
                    className="flex-1 p-2 bg-white border border-[#E5EAF1] rounded-lg text-xs font-medium focus:outline-none"
                  />

                  <button
                    type="submit"
                    className="btn btn-primary text-xs font-bold px-4 py-2 shrink-0 shadow-xs"
                  >
                    Appoint Position
                  </button>
                </form>

                {/* Appointed Office Bearers Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {userPartyOfficeBearers.map((bearer, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white border border-[#E5EAF1] shadow-xs flex items-center justify-between"
                    >
                      <div>
                        <span className="text-[10px] uppercase font-bold text-amber-600 block">
                          {bearer.role}
                        </span>
                        <span className="font-heading font-extrabold text-sm text-[#173B67]">
                          {bearer.memberName}
                        </span>
                        <span className="text-[10px] text-slate-400 block mt-0.5">
                          Since {bearer.appointedAt}
                        </span>
                      </div>
                      <span className="badge badge-navy text-[10px]">Appointed</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Candidate Selection Manager (Prompt 11) */}
              <div className="card-base p-5 space-y-4">
                <div className="pb-3 border-b border-[#E5EAF1]">
                  <h4 className="font-heading font-extrabold text-base text-[#173B67] flex items-center gap-2">
                    <Vote className="w-4 h-4 text-emerald-600" />
                    <span>Constituency Candidate Selection & Ticket Distribution</span>
                  </h4>
                  <p className="text-xs text-[#687386]">
                    Select and endorse party candidates for parliamentary seats via primary, leader nomination, or coalition agreement.
                  </p>
                </div>

                <form onSubmit={handleCandidateSelectionSubmit} className="space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="font-bold text-[#173B67] block mb-1">Target Constituency</label>
                      <select
                        value={candidateConstituencyId}
                        onChange={(e) => setCandidateConstituencyId(e.target.value)}
                        className="w-full p-2 bg-[#F7F9FC] border border-[#E5EAF1] rounded-lg font-semibold"
                      >
                        {constituencies.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name} ({c.stateCode})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-[#173B67] block mb-1">Candidate Name</label>
                      <input
                        type="text"
                        required
                        value={nominatedCandidateName}
                        onChange={(e) => setNominatedCandidateName(e.target.value)}
                        className="w-full p-2 bg-[#F7F9FC] border border-[#E5EAF1] rounded-lg font-semibold"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-[#173B67] block mb-1">Selection Method</label>
                      <select
                        value={selectionMethod}
                        onChange={(e) => setSelectionMethod(e.target.value as CandidateSelectionMethod)}
                        className="w-full p-2 bg-[#F7F9FC] border border-[#E5EAF1] rounded-lg font-semibold"
                      >
                        <option value="leader">Party Leader Nomination</option>
                        <option value="primary">Internal Party Primary</option>
                        <option value="member_voting">Cadre Member Voting</option>
                        <option value="coalition">Coalition Seat-Sharing Agreement</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] text-[#687386]">
                      Candidate ticket deposit: <strong>₹{userParty.constitutionRules.candidateTicketCost.toLocaleString('en-IN')}</strong>
                    </span>
                    <button
                      type="submit"
                      className="btn btn-green text-white text-xs font-bold px-5 py-2 shadow-xs"
                    >
                      Authorize Official Ticket
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Column: Anti-Defection / Party Switching Rules */}
            <div className="space-y-6">
              {/* Anti-Defection Law Configuration (Prompt 13) */}
              <div className="card-base p-5 space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-[#E5EAF1]">
                  <Settings2 className="w-4 h-4 text-[#173B67]" />
                  <h4 className="font-heading font-extrabold text-sm text-[#173B67]">
                    Anti-Defection & Party Switching Rules
                  </h4>
                </div>
                <p className="text-xs text-[#687386]">
                  Configure statutory penalty when an elected MLA/MP defects to another political party.
                </p>

                <div className="space-y-2 text-xs">
                  {[
                    {
                      id: 'realistic',
                      title: 'Realistic India Mode',
                      desc: 'Automatic disqualification: Elected seat marked VACATED and by-election triggered immediately.'
                    },
                    {
                      id: 'casual',
                      title: 'Casual Mode',
                      desc: 'Switch parties freely without losing parliamentary office or trigger seat vacancy.'
                    },
                    {
                      id: 'custom',
                      title: 'Custom Admin Rules',
                      desc: 'Requires speaker committee hearing before seat forfeiture.'
                    }
                  ].map((mode) => (
                    <label
                      key={mode.id}
                      onClick={() => onSetPartySwitchingRule(mode.id as PartySwitchingRuleMode)}
                      className={`p-3 rounded-xl border block cursor-pointer transition-all ${
                        partySwitchingRule === mode.id
                          ? 'bg-blue-50 border-blue-400 text-blue-900 ring-1 ring-blue-300'
                          : 'bg-[#F7F9FC] border-[#E5EAF1] text-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold mb-0.5">
                        <span>{mode.title}</span>
                        {partySwitchingRule === mode.id && <span className="text-[10px] text-blue-600">ACTIVE</span>}
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">{mode.desc}</p>
                    </label>
                  ))}
                </div>
              </div>

              {/* Voluntary Defection Action */}
              <div className="card-base p-5 space-y-3">
                <h4 className="font-heading font-extrabold text-sm text-[#173B67]">
                  Migrate Political Affiliation
                </h4>
                <p className="text-xs text-[#687386]">
                  Switch to another registered party. Note: If in Realistic Mode and holding elected office, your seat will be vacated!
                </p>

                <div className="space-y-2">
                  {parties.filter((p) => p.id !== profile.partyId).map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to switch to ${p.name}? If you hold elected office, your seat may be forfeited under anti-defection rules!`)) {
                          onSwitchParty(p.id);
                        }
                      }}
                      className="w-full p-2.5 rounded-xl border border-[#E5EAF1] hover:border-[#173B67] text-left text-xs font-bold text-[#172033] hover:bg-slate-50 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.primaryColor }} />
                        <span>Join {p.name} ({p.abbreviation})</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: REGISTERED PARTIES CATALOG */}
      {activeTab === 'catalog' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {parties.map((p) => {
            const isUserParty = profile.partyId === p.id;
            return (
              <div
                key={p.id}
                className={`card-base p-5 card-hover flex flex-col justify-between relative overflow-hidden ${
                  isUserParty ? 'ring-2 ring-[#F59E0B]' : ''
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm text-white shadow-xs"
                        style={{ backgroundColor: p.primaryColor }}
                      >
                        {p.abbreviation}
                      </div>
                      <div>
                        <h3 className="font-heading font-extrabold text-base text-[#173B67] leading-snug">
                          {p.name}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700">
                            {p.symbolName}
                          </span>
                          {p.isNationalParty && (
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-50 text-blue-700">
                              National Party
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {isUserParty && (
                      <span className="badge badge-saffron text-[10px]">Your Party</span>
                    )}
                  </div>

                  <p className="text-xs text-[#687386] line-clamp-3 leading-relaxed mb-4">
                    {p.manifestoSummary}
                  </p>

                  <div className="p-3 rounded-xl bg-[#F7F9FC] border border-[#E5EAF1] space-y-1.5 text-xs mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[#687386]">Party President:</span>
                      <span className="font-bold text-[#173B67]">{p.presidentName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#687386]">Cadre Strength:</span>
                      <span className="font-bold text-[#173B67]">{p.memberCount.toLocaleString()} members</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#687386]">Central Treasury:</span>
                      <span className="font-bold text-emerald-700">₹{(p.treasuryBalance / 100000).toFixed(1)} Lakh</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  {isUserParty ? (
                    <div className="text-center text-xs font-bold text-emerald-700 bg-emerald-50 py-2 rounded-xl border border-emerald-200">
                      Active Member & Leader
                    </div>
                  ) : (
                    <button
                      onClick={() => onJoinParty(p.id)}
                      className="btn btn-outline text-xs w-full py-2 font-bold hover:border-[#173B67]"
                    >
                      Join {p.abbreviation}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 3: 6-STEP PARTY REGISTRATION WIZARD */}
      {activeTab === 'wizard' && (
        <div className="card-base p-6 sm:p-7 max-w-3xl mx-auto shadow-md">
          <div className="flex items-center justify-between pb-4 border-b border-[#E5EAF1] mb-5">
            <div>
              <span className="text-[11px] font-bold text-[#F59E0B] uppercase tracking-wider block">
                Statutory Registration Wizard
              </span>
              <h3 className="font-heading font-black text-xl text-[#173B67]">
                Register New Political Party (Step {wizardStep} of 6)
              </h3>
            </div>
            <button
              onClick={() => setActiveTab('hq')}
              className="text-xs text-slate-400 hover:text-slate-600 font-bold"
            >
              Cancel
            </button>
          </div>

          {formError && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* Wizard Steps */}
          {wizardStep === 1 && (
            <div className="space-y-4 text-xs">
              <h4 className="font-heading font-bold text-base text-[#173B67]">
                Step 1: Party Name & Official Abbreviation
              </h4>
              <div>
                <label className="font-bold text-[#173B67] block mb-1">Full Party Name</label>
                <input
                  type="text"
                  placeholder="e.g. Tamil National People's Party"
                  value={partyName}
                  onChange={(e) => setPartyName(e.target.value)}
                  className="w-full p-2.5 bg-[#F7F9FC] border border-[#E5EAF1] rounded-xl font-semibold"
                />
              </div>
              <div>
                <label className="font-bold text-[#173B67] block mb-1">Abbreviation (Acronym)</label>
                <input
                  type="text"
                  placeholder="e.g. TNPP"
                  value={abbreviation}
                  onChange={(e) => setAbbreviation(e.target.value)}
                  className="w-full p-2.5 bg-[#F7F9FC] border border-[#E5EAF1] rounded-xl font-semibold uppercase"
                />
              </div>
            </div>
          )}

          {wizardStep === 2 && (
            <div className="space-y-4 text-xs">
              <h4 className="font-heading font-bold text-base text-[#173B67]">
                Step 2: Official Symbol & Party Colors
              </h4>
              <div>
                <label className="font-bold text-[#173B67] block mb-1">Electoral Symbol</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {AVAILABLE_SYMBOLS.map((sym) => (
                    <button
                      key={sym}
                      type="button"
                      onClick={() => setSymbolName(sym)}
                      className={`p-2.5 rounded-xl border text-left font-bold ${
                        symbolName === sym
                          ? 'bg-[#173B67] text-white border-[#173B67]'
                          : 'bg-[#F7F9FC] border-[#E5EAF1] text-slate-700'
                      }`}
                    >
                      {sym}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-[#173B67] block mb-1">Primary Color</label>
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-full h-10 p-1 bg-white border border-[#E5EAF1] rounded-xl cursor-pointer"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#173B67] block mb-1">Secondary Accent</label>
                  <input
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="w-full h-10 p-1 bg-white border border-[#E5EAF1] rounded-xl cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {wizardStep === 3 && (
            <div className="space-y-4 text-xs">
              <h4 className="font-heading font-bold text-base text-[#173B67]">
                Step 3: Ideological Direction
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {(['Progressive', 'Social Democratic', 'Centrist', 'Nationalist', 'Conservative', 'Regional Interest'] as PartyIdeology[]).map((ideol) => (
                  <button
                    key={ideol}
                    type="button"
                    onClick={() => setIdeology(ideol)}
                    className={`p-3 rounded-xl border text-left font-bold ${
                      ideology === ideol
                        ? 'bg-[#173B67] text-white border-[#173B67]'
                        : 'bg-[#F7F9FC] border-[#E5EAF1] text-slate-700'
                    }`}
                  >
                    {ideol}
                  </button>
                ))}
              </div>
            </div>
          )}

          {wizardStep === 4 && (
            <div className="space-y-4 text-xs">
              <h4 className="font-heading font-bold text-base text-[#173B67]">
                Step 4: Manifesto & Vision Pledge
              </h4>
              <div>
                <label className="font-bold text-[#173B67] block mb-1">Manifesto Summary</label>
                <textarea
                  rows={4}
                  placeholder="Outline your party's core commitments on employment, healthcare, state autonomy, and national security..."
                  value={manifestoSummary}
                  onChange={(e) => setManifestoSummary(e.target.value)}
                  className="w-full p-2.5 bg-[#F7F9FC] border border-[#E5EAF1] rounded-xl font-medium"
                />
              </div>
            </div>
          )}

          {wizardStep === 5 && (
            <div className="space-y-4 text-xs">
              <h4 className="font-heading font-bold text-base text-[#173B67]">
                Step 5: Party Constitution & Ticket Rules
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-[#173B67] block mb-1">Internal Elections (Months)</label>
                  <input
                    type="number"
                    value={internalElections}
                    onChange={(e) => setInternalElections(Number(e.target.value))}
                    className="w-full p-2.5 bg-[#F7F9FC] border border-[#E5EAF1] rounded-xl font-semibold"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#173B67] block mb-1">Candidate Ticket Cost (₹)</label>
                  <input
                    type="number"
                    value={ticketCost}
                    onChange={(e) => setTicketCost(Number(e.target.value))}
                    className="w-full p-2.5 bg-[#F7F9FC] border border-[#E5EAF1] rounded-xl font-semibold"
                  />
                </div>
              </div>
            </div>
          )}

          {wizardStep === 6 && (
            <div className="space-y-3 text-xs">
              <h4 className="font-heading font-bold text-base text-[#173B67]">
                Step 6: Review Statutory Registration
              </h4>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div><strong>Party:</strong> {partyName} ({abbreviation})</div>
                <div><strong>Symbol:</strong> {symbolName}</div>
                <div><strong>Ideology:</strong> {ideology}</div>
                <div><strong>Founder:</strong> {profile.displayName}</div>
                <div><strong>Initial Grant:</strong> ₹50,00,000 provided by Election Commission</div>
              </div>
            </div>
          )}

          {/* Wizard Footer Controls */}
          <div className="flex items-center justify-between pt-5 border-t border-[#E5EAF1] mt-6">
            {wizardStep > 1 ? (
              <button
                type="button"
                onClick={() => setWizardStep((prev) => prev - 1)}
                className="btn btn-outline text-xs px-4 py-2 font-bold"
              >
                Previous
              </button>
            ) : <div />}

            {wizardStep < 6 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="btn btn-primary text-xs px-5 py-2 font-bold flex items-center gap-1"
              >
                <span>Continue</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinishWizard}
                className="btn btn-saffron text-white text-xs px-6 py-2.5 font-bold shadow-md flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Register Political Party</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
