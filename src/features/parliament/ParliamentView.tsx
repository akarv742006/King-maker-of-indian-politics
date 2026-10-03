import React, { useState } from 'react';
import {
  Landmark,
  PlusCircle,
  CheckCircle2,
  XCircle,
  MinusCircle,
  FileText,
  MessageSquare,
  Users,
  Shield,
  Send
} from 'lucide-react';
import { ParliamentBill, PlayerProfile, SpeakerElection } from '../../types';

interface ParliamentViewProps {
  bills: ParliamentBill[];
  profile: PlayerProfile;
  speakerElection: SpeakerElection;
  onVoteSpeaker: (candidateId: string) => void;
  onVoteBill: (billId: string, choice: 'aye' | 'no' | 'abstain') => void;
  onSubmitBill: (data: { title: string; summary: string; category: ParliamentBill['category']; clauses: string[] }) => void;
  onAddNotification: (msg: string) => void;
}

export const ParliamentView: React.FC<ParliamentViewProps> = ({
  bills,
  profile,
  speakerElection,
  onVoteSpeaker,
  onVoteBill,
  onSubmitBill,
  onAddNotification
}) => {
  const [showNewBillModal, setShowNewBillModal] = useState(false);
  const [selectedBillId, setSelectedBillId] = useState<string>(bills[0]?.id || '');
  const [speechText, setSpeechText] = useState('');

  // Form State
  const [billTitle, setBillTitle] = useState('');
  const [billSummary, setBillSummary] = useState('');
  const [billCategory, setBillCategory] = useState<ParliamentBill['category']>('Public Welfare');
  const [clause1, setClause1] = useState('');
  const [clause2, setClause2] = useState('');

  const activeBill = bills.find((b) => b.id === selectedBillId) || bills[0];

  const handleCreateBill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!billTitle.trim() || !billSummary.trim()) {
      alert('Please provide title and summary for the bill.');
      return;
    }
    const clauses = [clause1, clause2].filter(Boolean);
    if (clauses.length === 0) clauses.push('Clause 1: Initial statutory framework provision.');

    onSubmitBill({
      title: billTitle,
      summary: billSummary,
      category: billCategory,
      clauses
    });
    setShowNewBillModal(false);
    setBillTitle('');
    setBillSummary('');
    setClause1('');
    setClause2('');
  };

  const handleDeliverSpeech = () => {
    if (!speechText.trim()) return;
    onAddNotification(`Speech delivered from the floor of Sansad: "${speechText.slice(0, 50)}..."`);
    setSpeechText('');
  };

  return (
    <div className="space-y-6">
      {/* Parliament Chamber Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-[#E5EAF1] shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-[#173B67] text-white">
              <Landmark className="w-5 h-5 text-[#F59E0B]" />
            </span>
            <h2 className="font-heading font-extrabold text-xl text-[#173B67]">
              Parliament of India (Sansad Bhavan)
            </h2>
          </div>
          <p className="text-xs text-[#687386]">
            Lok Sabha Chamber · Question Hour & Legislative Floor Debates · 543 Sovereign Lawmakers
          </p>
        </div>

        <button
          onClick={() => setShowNewBillModal(true)}
          className="btn btn-primary text-xs font-bold px-4 py-2.5 shadow-md flex items-center gap-2 self-start sm:self-center"
        >
          <PlusCircle className="w-4 h-4 text-[#F59E0B]" />
          <span>Introduce New Government Bill</span>
        </button>
      </div>

      {/* SPEAKER ELECTION (REAL PLAYER LEGISLATIVE BALLOT - Prompt 20) */}
      <div className="card-base p-5 border-l-4 border-l-[#F59E0B]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E5EAF1] mb-3">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="badge badge-saffron text-[10px]">Real Player Ballot</span>
              <h3 className="font-heading font-extrabold text-base text-[#173B67]">
                Election of the Speaker of the Lok Sabha
              </h3>
            </div>
            <p className="text-xs text-[#687386]">
              Only elected MPs/MLAs cast secret ballots in the division lobby. Turnout: {speakerElection.votesCastCount} / {speakerElection.eligibleVotersCount} ({((speakerElection.votesCastCount / speakerElection.eligibleVotersCount) * 100).toFixed(1)}%).
            </p>
          </div>

          {speakerElection.winner && (
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
              <span className="text-[10px] text-emerald-700 font-bold uppercase block">Elected Speaker</span>
              <span className="font-heading font-extrabold text-[#173B67]">{speakerElection.winner}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {speakerElection.candidates.map((cand) => {
            const isVoted = speakerElection.userVotedFor === cand.id;
            return (
              <div key={cand.id} className="p-3.5 rounded-xl bg-[#F7F9FC] border border-[#E5EAF1] flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cand.partyColor }} />
                    <span className="font-bold text-xs text-[#172033]">{cand.name}</span>
                  </div>
                  <span className="text-[11px] text-[#687386] font-mono">{cand.partyAbbr} · {cand.votes} votes</span>
                </div>

                <button
                  onClick={() => onVoteSpeaker(cand.id)}
                  disabled={Boolean(speakerElection.userVotedFor)}
                  className={`btn text-xs font-bold px-3 py-1.5 rounded-lg ${
                    isVoted
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : speakerElection.userVotedFor
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-[#173B67] hover:bg-[#0f2644] text-white shadow-xs'
                  }`}
                >
                  {isVoted ? 'Voted' : 'Vote Speaker'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* SANSAD BENCHES VISUAL CHAMBER */}
      <div className="card-base p-6 bg-gradient-to-b from-[#F7F9FC] to-white border border-[#E5EAF1] shadow-sm">
        <div className="flex flex-col items-center mb-6">
          <div className="w-28 py-1.5 rounded-xl bg-[#173B67] text-white text-center font-heading font-bold text-xs shadow-md border-b-2 border-amber-400">
            SPEAKER'S DAIS
          </div>
          <div className="text-[10px] text-[#687386] font-semibold mt-1">Hon'ble Presiding Officer</div>
        </div>

        {/* Treasury vs Opposition Arc Benches */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          {/* Treasury Benches (Ruling Party & Allies) */}
          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200">
            <div className="flex items-center justify-between mb-3">
              <span className="font-heading font-bold text-xs text-[#173B67] flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF9933]" />
                <span>TREASURY BENCHES (Ruling NDA)</span>
              </span>
              <span className="text-[11px] font-extrabold text-[#173B67]">293 Seats</span>
            </div>
            <div className="grid grid-cols-6 sm:grid-cols-8 gap-1.5">
              {Array.from({ length: 24 }).map((_, i) => (
                <div
                  key={i}
                  title="Treasury MP"
                  className="h-6 rounded bg-[#FF9933]/80 hover:bg-[#FF9933] cursor-pointer flex items-center justify-center text-[9px] font-bold text-white shadow-2xs"
                >
                  T{i + 1}
                </div>
              ))}
            </div>
            <p className="text-[10px] text-slate-500 mt-2">Led by: Prime Minister & Cabinet Ministers</p>
          </div>

          {/* Opposition Benches */}
          <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200">
            <div className="flex items-center justify-between mb-3">
              <span className="font-heading font-bold text-xs text-[#173B67] flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1976D2]" />
                <span>OPPOSITION BENCHES (I.N.D.I.A Alliance)</span>
              </span>
              <span className="text-[11px] font-extrabold text-[#173B67]">234 Seats</span>
            </div>
            <div className="grid grid-cols-6 sm:grid-cols-8 gap-1.5">
              {Array.from({ length: 24 }).map((_, i) => (
                <div
                  key={i}
                  title="Opposition MP"
                  className="h-6 rounded bg-[#1976D2]/80 hover:bg-[#1976D2] cursor-pointer flex items-center justify-center text-[9px] font-bold text-white shadow-2xs"
                >
                  O{i + 1}
                </div>
              ))}
            </div>
            <p className="text-[10px] text-slate-500 mt-2">Led by: Leader of the Opposition</p>
          </div>
        </div>
      </div>

      {/* Main Two-Column: Bill Inspector & Parliamentary Votes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (1 Col): Bills Navigation List */}
        <div className="space-y-3">
          <h3 className="font-heading font-extrabold text-sm text-[#173B67] uppercase tracking-wider">
            Order of Business (Legislative Bills)
          </h3>
          <div className="space-y-2.5">
            {bills.map((b) => {
              const isSelected = b.id === activeBill.id;
              return (
                <div
                  key={b.id}
                  onClick={() => setSelectedBillId(b.id)}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-white border-[#173B67] shadow-md ring-1 ring-[#173B67]'
                      : 'bg-[#F7F9FC] border-[#E5EAF1] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700">
                      {b.category}
                    </span>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase ${
                      b.status === 'passed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : b.status === 'voting'
                        ? 'bg-amber-100 text-amber-800 animate-pulse'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {b.status}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-[#173B67] line-clamp-2 leading-snug">
                    {b.title}
                  </h4>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/50 text-[10px] text-[#687386]">
                    <span>Sponsor: {b.sponsorName}</span>
                    <span className="font-bold text-[#173B67]">{b.ayesCount} Ayes · {b.noesCount} Noes</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (2 Cols): Bill Reader & Teller Voting Machine */}
        <div className="lg:col-span-2 space-y-5">
          {activeBill ? (
            <div className="card-base p-6">
              <div className="flex items-start justify-between gap-3 pb-4 border-b border-[#E5EAF1] mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                      {activeBill.category}
                    </span>
                    <span className="text-xs text-[#687386]">
                      Sponsor: <span className="font-bold text-[#173B67]">{activeBill.sponsorName} ({activeBill.sponsorParty})</span>
                    </span>
                  </div>
                  <h3 className="font-heading font-extrabold text-lg text-[#173B67]">
                    {activeBill.title}
                  </h3>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-[#687386] block">Status</span>
                  <span className="text-xs font-extrabold text-blue-700 uppercase bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {activeBill.status}
                  </span>
                </div>
              </div>

              {/* Bill Summary */}
              <div className="mb-4">
                <h4 className="text-xs font-bold text-[#173B67] uppercase tracking-wider mb-1">
                  Statement of Objects & Reasons:
                </h4>
                <p className="text-xs text-[#687386] leading-relaxed bg-[#F7F9FC] p-3 rounded-xl border border-[#E5EAF1]">
                  {activeBill.summary}
                </p>
              </div>

              {/* Statutory Clauses */}
              <div className="mb-5">
                <h4 className="text-xs font-bold text-[#173B67] uppercase tracking-wider mb-2">
                  Clauses for Consideration:
                </h4>
                <div className="space-y-2">
                  {activeBill.clauses.map((clause, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white border border-[#E5EAF1] text-xs text-[#172033] flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-md bg-slate-100 font-bold text-[10px] text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{clause}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Division / Voting Controls */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mb-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="font-heading font-extrabold text-sm text-[#173B67]">
                      Recorded Parliamentary Division (Roll-Call)
                    </span>
                    <p className="text-xs text-[#687386]">Cast your vote as the Member of Parliament for Varanasi.</p>
                  </div>
                  {activeBill.userVoted && (
                    <span className="badge badge-green text-xs">
                      Recorded: {activeBill.userVoted.toUpperCase()}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => onVoteBill(activeBill.id, 'aye')}
                    disabled={activeBill.userVoted !== undefined}
                    className={`btn text-xs font-bold py-2.5 flex items-center justify-center gap-1.5 ${
                      activeBill.userVoted === 'aye'
                        ? 'bg-emerald-600 text-white'
                        : 'btn-green'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>AYES ({activeBill.ayesCount})</span>
                  </button>

                  <button
                    onClick={() => onVoteBill(activeBill.id, 'no')}
                    disabled={activeBill.userVoted !== undefined}
                    className={`btn text-xs font-bold py-2.5 flex items-center justify-center gap-1.5 ${
                      activeBill.userVoted === 'no'
                        ? 'bg-rose-600 text-white'
                        : 'bg-rose-500 hover:bg-rose-600 text-white'
                    }`}
                  >
                    <XCircle className="w-4 h-4" />
                    <span>NOES ({activeBill.noesCount})</span>
                  </button>

                  <button
                    onClick={() => onVoteBill(activeBill.id, 'abstain')}
                    disabled={activeBill.userVoted !== undefined}
                    className="btn btn-outline text-xs font-bold py-2.5 flex items-center justify-center gap-1.5"
                  >
                    <MinusCircle className="w-4 h-4" />
                    <span>ABSTAIN</span>
                  </button>
                </div>
              </div>

              {/* Floor Speech / Intervention Input */}
              <div className="pt-3 border-t border-[#E5EAF1]">
                <label className="block text-xs font-bold text-[#173B67] mb-1.5">
                  Deliver Floor Speech / Intervention:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Address the Speaker on this clause..."
                    value={speechText}
                    onChange={(e) => setSpeechText(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs bg-[#F7F9FC] border border-[#E5EAF1] rounded-xl focus:outline-none focus:border-[#173B67]"
                  />
                  <button
                    onClick={handleDeliverSpeech}
                    className="btn btn-primary text-xs font-bold px-4 shrink-0 flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Speak</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="card-base p-8 text-center text-xs text-[#687386]">
              Select a bill from the order of business.
            </div>
          )}
        </div>
      </div>

      {/* MODAL: Introduce New Bill */}
      {showNewBillModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-[#E5EAF1] w-full max-w-xl p-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EAF1] mb-4">
              <h3 className="font-heading font-extrabold text-base text-[#173B67]">
                Notice of Motion: Introduce Legislative Bill
              </h3>
              <button
                onClick={() => setShowNewBillModal(false)}
                className="text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                ✕ Cancel
              </button>
            </div>

            <form onSubmit={handleCreateBill} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#173B67] mb-1">
                  Title of the Bill *
                </label>
                <input
                  type="text"
                  placeholder="e.g. National Clean Air & Solar Subsidy Statutory Bill, 2026"
                  value={billTitle}
                  onChange={(e) => setBillTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F7F9FC] border border-[#E5EAF1] rounded-xl focus:outline-none focus:border-[#173B67]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#173B67] mb-1">
                  Legislative Category
                </label>
                <select
                  value={billCategory}
                  onChange={(e) => setBillCategory(e.target.value as ParliamentBill['category'])}
                  className="w-full px-3 py-2 text-xs bg-[#F7F9FC] border border-[#E5EAF1] rounded-xl focus:outline-none focus:border-[#173B67]"
                >
                  <option value="Public Welfare">Public Welfare & Healthcare</option>
                  <option value="Financial">Financial & Tax Incentives</option>
                  <option value="Infrastructure">Infrastructure & High-Speed Transit</option>
                  <option value="Constitutional">Constitutional Amendment</option>
                  <option value="Security">National Security & Cyber Sovereignty</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#173B67] mb-1">
                  Statement of Objects & Reasons *
                </label>
                <textarea
                  rows={3}
                  placeholder="Briefly state why this law is necessary for citizens..."
                  value={billSummary}
                  onChange={(e) => setBillSummary(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F7F9FC] border border-[#E5EAF1] rounded-xl focus:outline-none focus:border-[#173B67]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#173B67] mb-1">
                  Clause 1 (Primary Mandate)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Establishment of statutory green funding agency with 100% audited accounts."
                  value={clause1}
                  onChange={(e) => setClause1(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F7F9FC] border border-[#E5EAF1] rounded-xl focus:outline-none focus:border-[#173B67]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E5EAF1]">
                <button
                  type="button"
                  onClick={() => setShowNewBillModal(false)}
                  className="btn btn-outline text-xs px-4 py-2 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary text-xs px-5 py-2 font-bold"
                >
                  Table Bill in Lok Sabha
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
