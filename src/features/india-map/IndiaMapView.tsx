import React, { useState } from 'react';
import {
  MapPin,
  Users,
  Search,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Award,
  Vote
} from 'lucide-react';
import { StateInfo, ConstituencyInfo, PlayerProfile } from '../../types';

interface IndiaMapViewProps {
  states: StateInfo[];
  constituencies: ConstituencyInfo[];
  profile: PlayerProfile;
  selectedStateCode: string;
  onSelectStateCode: (code: string) => void;
  onNominateCandidate: (constituencyId: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const IndiaMapView: React.FC<IndiaMapViewProps> = ({
  states,
  constituencies,
  profile,
  selectedStateCode,
  onSelectStateCode,
  onNominateCandidate,
  onNavigateTab
}) => {
  const [mapMode, setMapMode] = useState<'lok_sabha' | 'assembly'>('lok_sabha');
  const [searchQuery, setSearchQuery] = useState('');

  const currentState = states.find((s) => s.code === selectedStateCode) || states[0];
  const stateConstituencies = constituencies.filter((c) => c.stateCode === selectedStateCode);

  const filteredStates = states.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-[#E5EAF1] shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-[#173B67] text-white">
              <MapPin className="w-5 h-5 text-[#F59E0B]" />
            </span>
            <h2 className="font-heading font-extrabold text-xl text-[#173B67]">
              Sovereign Bharat Constituency Explorer
            </h2>
          </div>
          <p className="text-xs text-[#687386]">
            Interactive electoral map across 28 States & 8 Union Territories · 543 Parliamentary Constituencies
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <div className="bg-[#F7F9FC] p-1 rounded-xl border border-[#E5EAF1] flex items-center gap-1">
            <button
              onClick={() => setMapMode('lok_sabha')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                mapMode === 'lok_sabha'
                  ? 'bg-[#173B67] text-white shadow-xs'
                  : 'text-[#687386] hover:text-[#172033]'
              }`}
            >
              Lok Sabha (Parliament)
            </button>
            <button
              onClick={() => setMapMode('assembly')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                mapMode === 'assembly'
                  ? 'bg-[#173B67] text-white shadow-xs'
                  : 'text-[#687386] hover:text-[#172033]'
              }`}
            >
              Vidhan Sabha (Assembly)
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Map Explorer & State Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): State Grid & Visual Interactive Map */}
        <div className="lg:col-span-2 space-y-4">
          <div className="card-base p-5">
            <div className="flex items-center justify-between gap-3 mb-4">
              <h3 className="font-heading font-extrabold text-base text-[#173B67] flex items-center gap-2">
                <span>Select State or Territory</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {states.length} Regions
                </span>
              </h3>

              {/* Search input */}
              <div className="relative w-48 sm:w-64">
                <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search state..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#F7F9FC] border border-[#E5EAF1] rounded-xl focus:outline-none focus:border-[#173B67]"
                />
              </div>
            </div>

            {/* Visual State Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-h-[380px] overflow-y-auto p-1">
              {filteredStates.map((st) => {
                const isSelected = st.code === selectedStateCode;
                const seatsCount = mapMode === 'lok_sabha' ? st.lokSabhaSeats : st.assemblySeats;
                return (
                  <button
                    key={st.code}
                    onClick={() => onSelectStateCode(st.code)}
                    className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden group ${
                      isSelected
                        ? 'bg-[#173B67] border-[#173B67] text-white shadow-md'
                        : 'bg-[#F7F9FC] border-[#E5EAF1] hover:border-[#173B67]/40 hover:bg-white text-[#172033]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-800'
                      }`}>
                        {st.code}
                      </span>
                      <span className={`text-[11px] font-bold ${
                        isSelected ? 'text-amber-300' : 'text-[#F59E0B]'
                      }`}>
                        {seatsCount} {mapMode === 'lok_sabha' ? 'MPs' : 'MLAs'}
                      </span>
                    </div>
                    <p className="font-heading font-bold text-xs truncate">{st.name}</p>
                    <p className={`text-[10px] truncate ${isSelected ? 'text-blue-200' : 'text-[#687386]'}`}>
                      Cap: {st.capital}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Key Constituencies in Selected State */}
          <div className="card-base p-5">
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#E5EAF1]">
              <div>
                <h3 className="font-heading font-extrabold text-base text-[#173B67]">
                  Key Seats in {currentState.name} ({mapMode === 'lok_sabha' ? `${currentState.lokSabhaSeats} Lok Sabha Seats` : `${currentState.assemblySeats} Assembly Seats`})
                </h3>
                <p className="text-xs text-[#687386]">
                  High-profile battles, historical margins, and simulated voting demographics.
                </p>
              </div>
            </div>

            {stateConstituencies.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {stateConstituencies.map((con) => {
                  const isUserSeat = profile.constituencyName === con.name;
                  return (
                    <div
                      key={con.id}
                      className={`p-4 rounded-xl border transition-all ${
                        isUserSeat
                          ? 'bg-amber-50/50 border-amber-300 ring-1 ring-amber-300'
                          : 'bg-[#F7F9FC] border-[#E5EAF1] hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5">
                          <span className="font-heading font-extrabold text-sm text-[#173B67]">
                            #{con.number} {con.name}
                          </span>
                          {isUserSeat && (
                            <span className="badge badge-saffron text-[9px]">Your Seat</span>
                          )}
                        </div>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">
                          {con.category}
                        </span>
                      </div>

                      <div className="text-xs text-[#687386] space-y-1 mb-3">
                        <p>Registered Electors: <span className="font-semibold text-[#172033]">{(con.registeredVoters / 100000).toFixed(1)} Lakh</span></p>
                        <p>Demography: <span className="font-semibold text-[#172033]">{(con.urbanRatio * 100).toFixed(0)}% Urban · {(100 - con.urbanRatio * 100).toFixed(0)}% Rural</span></p>
                        {con.previousWinner && (
                          <p className="text-[11px] text-slate-500">
                            Last Winner: <span className="font-bold text-[#173B67]">{con.previousWinner.candidate} ({con.previousWinner.party})</span> by {con.previousWinner.margin.toLocaleString()} votes
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 pt-2 border-t border-slate-200/60">
                        <button
                          onClick={() => {
                            onNominateCandidate(con.id);
                            onNavigateTab('elections');
                          }}
                          className="btn btn-primary text-xs w-full py-1.5 font-bold flex items-center justify-center gap-1.5"
                        >
                          <Vote className="w-3.5 h-3.5" />
                          <span>Contest This Seat</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 text-center bg-[#F7F9FC] rounded-xl border border-dashed border-[#CBD5E1]">
                <MapPin className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs font-bold text-[#173B67]">Showing State Level Seat Distribution</p>
                <p className="text-xs text-[#687386] max-w-sm mx-auto mt-1">
                  {currentState.name} holds {currentState.lokSabhaSeats} Lok Sabha seats. You can register candidates in any of these constituencies during the nomination phase.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (1 Col): Selected State Deep Dossier */}
        <div className="space-y-5">
          <div className="card-base p-5 border-t-4 border-t-[#173B67]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-blue-100 text-blue-900 uppercase tracking-wider">
                State Dossier
              </span>
              <span className="text-xs font-bold text-[#173B67]">Code: {currentState.code}</span>
            </div>

            <h3 className="font-heading font-extrabold text-2xl text-[#173B67] mb-1">
              {currentState.name}
            </h3>
            <p className="text-xs text-[#687386] mb-4">Capital: <span className="font-semibold text-[#172033]">{currentState.capital}</span></p>

            <div className="space-y-3 pb-4 border-b border-[#E5EAF1]">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#687386]">Population:</span>
                <span className="font-bold text-[#173B67]">{(currentState.population / 10000000).toFixed(1)} Crore</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#687386]">Lok Sabha Seats:</span>
                <span className="font-bold text-[#F59E0B]">{currentState.lokSabhaSeats} MPs</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#687386]">Vidhan Sabha Seats:</span>
                <span className="font-bold text-[#16845B]">{currentState.assemblySeats} MLAs</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#687386]">Current Incumbent:</span>
                <span className="font-bold text-[#173B67]">{currentState.currentRulingParty || 'Coalition'}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#687386]">Voter Sentiment:</span>
                <span className="font-bold text-blue-700 capitalize bg-blue-50 px-2 py-0.5 rounded">
                  {currentState.voterMood || 'Competitive'}
                </span>
              </div>
            </div>

            {/* Dominant Political Issues */}
            <div className="mt-4">
              <h4 className="text-xs font-bold text-[#173B67] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                <span>Dominant Campaign Issues</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {currentState.dominantIssues.map((issue, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#F7F9FC] text-[#173B67] border border-[#E5EAF1]"
                  >
                    {issue}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 space-y-2">
              <button
                onClick={() => onNavigateTab('elections')}
                className="btn btn-saffron w-full text-xs font-bold py-2 shadow-xs"
              >
                Plan Campaign Rallies in {currentState.code}
              </button>
              <button
                onClick={() => onNavigateTab('parties')}
                className="btn btn-outline w-full text-xs font-bold py-2"
              >
                Form State Alliance in {currentState.name}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
