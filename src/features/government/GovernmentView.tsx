import React, { useState } from 'react';
import {
  Briefcase,
  Award,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Users,
  Shield,
  Send,
  Sparkles
} from 'lucide-react';
import { GovernmentFormation, PlayerProfile, Party } from '../../types';

interface GovernmentViewProps {
  government: GovernmentFormation;
  profile: PlayerProfile;
  parties: Party[];
  onConductFloorTest: (vote: 'aye' | 'no') => void;
  onAddNotification: (msg: string) => void;
}

export const GovernmentView: React.FC<GovernmentViewProps> = ({
  government,
  profile,
  parties,
  onConductFloorTest,
  onAddNotification
}) => {
  const [allocatedPortfolios, setAllocatedPortfolios] = useState(government.portfolios);
  const [selectedMinister, setSelectedMinister] = useState(profile.displayName);
  const [selectedPortfolio, setSelectedPortfolio] = useState('Minister of Technology & AI');

  const handleAddPortfolio = () => {
    if (allocatedPortfolios.some((p) => p.portfolio === selectedPortfolio)) {
      onAddNotification(`The portfolio "${selectedPortfolio}" is already assigned!`);
      return;
    }
    const newEntry = {
      portfolio: selectedPortfolio,
      ministerName: selectedMinister,
      partyAbbr: profile.partyAbbr || 'IND'
    };
    setAllocatedPortfolios((prev) => [...prev, newEntry]);
    onAddNotification(`Portfolio "${selectedPortfolio}" assigned to ${selectedMinister}!`);
  };

  return (
    <div className="space-y-6">
      {/* Government Formation Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-[#E5EAF1] shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-[#173B67] text-white">
              <Briefcase className="w-5 h-5 text-[#F59E0B]" />
            </span>
            <h2 className="font-heading font-extrabold text-xl text-[#173B67]">
              Union Government & Council of Ministers
            </h2>
          </div>
          <p className="text-xs text-[#687386]">
            Constitutional executive formation · Majority threshold: {government.majorityThreshold} seats · Rashtrapati Bhavan Mandate
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-xs font-extrabold px-3 py-1 rounded-full uppercase border ${
            government.status === 'confidence_passed'
              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
              : 'bg-amber-100 text-amber-800 border-amber-300 animate-pulse'
          }`}>
            {government.status.replace('_', ' ')}
          </span>
        </div>
      </div>

      {/* Majority Mandate Card */}
      <div className="card-base p-6 bg-gradient-to-r from-white to-[#F7F9FC] border border-[#E5EAF1]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2 space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-extrabold text-lg text-[#173B67]">
                Executive Mandate: {government.headOfGovernment}
              </h3>
              <span className="badge badge-navy">Leader of the House</span>
            </div>
            <p className="text-xs text-[#687386] leading-relaxed">
              Ruling Alliance comprises <span className="font-bold text-[#173B67]">{government.coalitionParties.join(', ')}</span> with a collective strength of{' '}
              <span className="font-bold text-emerald-700">{government.claimedSeats} Seats</span> in the 543-member Lok Sabha (Required: 272).
            </p>

            <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden mt-3 relative">
              <div
                className="bg-emerald-600 h-3 rounded-full transition-all duration-700"
                style={{ width: `${(government.claimedSeats / 543) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-[#687386]">
              <span>0 Seats</span>
              <span className="font-bold text-slate-800">272 Majority Mark</span>
              <span>543 Total</span>
            </div>
          </div>

          {/* FLOOR TEST ACTION BOX */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-3">
            <div>
              <span className="text-xs font-bold text-[#173B67] block">Constitutional Floor Test</span>
              <span className="text-[11px] text-[#687386]">Test majority on the floor of the House</span>
            </div>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => onConductFloorTest('aye')}
                className="btn btn-green text-xs font-bold py-2 px-4 shadow-sm"
              >
                Pass Floor Test (Aye)
              </button>
              <button
                onClick={() => onConductFloorTest('no')}
                className="btn bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold py-2 px-3 shadow-sm"
              >
                No-Confidence (No)
              </button>
            </div>
            {government.floorTestVotes && (
              <p className="text-[10px] font-mono text-emerald-700 font-bold">
                Last Division: {government.floorTestVotes.ayes} Ayes vs {government.floorTestVotes.noes} Noes ({government.floorTestVotes.result.toUpperCase()})
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Council of Ministers / Portfolios Grid */}
      <div className="card-base p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5EAF1] mb-5">
          <div>
            <h3 className="font-heading font-extrabold text-base text-[#173B67]">
              Union Council of Ministers (Cabinet Portfolios)
            </h3>
            <p className="text-xs text-[#687386]">
              Allocated ministerial portfolios across coalition partners.
            </p>
          </div>

          {/* Add custom portfolio */}
          <div className="flex items-center gap-2">
            <select
              value={selectedPortfolio}
              onChange={(e) => setSelectedPortfolio(e.target.value)}
              className="text-xs font-bold bg-[#F7F9FC] border border-[#E5EAF1] rounded-xl px-3 py-1.5 focus:outline-none"
            >
              <option value="Minister of Technology & AI">Technology & AI</option>
              <option value="Minister of Youth & Sports">Youth & Sports</option>
              <option value="Minister of Renewable Energy">Renewable Energy</option>
              <option value="Minister of Urban Infrastructure">Urban Infrastructure</option>
              <option value="Minister of Agriculture Welfare">Agriculture Welfare</option>
            </select>
            <button
              onClick={handleAddPortfolio}
              className="btn btn-primary text-xs font-bold py-1.5 px-3"
            >
              Induct
            </button>
          </div>
        </div>

        {/* Portfolio Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {allocatedPortfolios.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#F7F9FC] border border-[#E5EAF1] hover:bg-white hover:border-[#173B67]/30 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-blue-100 text-blue-900 uppercase">
                  {item.partyAbbr}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <h4 className="font-heading font-extrabold text-sm text-[#173B67] leading-snug mb-1">
                {item.portfolio}
              </h4>
              <p className="text-xs font-semibold text-[#172033] mb-2">{item.ministerName}</p>
              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-[#687386]">
                <span>Status: Sworn-in</span>
                <span className="font-bold text-emerald-700">Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
