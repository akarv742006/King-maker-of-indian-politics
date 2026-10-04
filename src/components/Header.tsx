import React, { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  Clock,
  Sparkles,
  Shield,
  RotateCcw
} from 'lucide-react';
import { PlayerProfile, Election } from '../types';
import { isSupabaseConfigured } from '../services/supabase';

interface HeaderProps {
  profile: PlayerProfile;
  election: Election;
  notifications: string[];
  userRole: 'admin' | 'player';
  onToggleRole: (role: 'admin' | 'player') => void;
  onReset: () => void;
  onNavigateTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  election,
  notifications,
  userRole,
  onToggleRole,
  onReset,
  onNavigateTab
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}m ${s < 10 ? '0' : ''}${s}s`;
  };

  const getPhaseBadge = (phase: Election['phase']) => {
    switch (phase) {
      case 'draft':
        return { label: 'Draft Notification', color: 'bg-slate-100 text-slate-700 border-slate-200' };
      case 'scheduled':
        return { label: 'Election Scheduled', color: 'bg-blue-100 text-blue-800 border-blue-200' };
      case 'nominations':
        return { label: 'Nominations Open', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' };
      case 'verification':
        return { label: 'Scrutiny & Verification', color: 'bg-cyan-100 text-cyan-800 border-cyan-200' };
      case 'campaigning':
        return { label: 'Active Campaigning', color: 'bg-amber-100 text-amber-800 border-amber-200' };
      case 'voting':
        return { label: 'Polling in Progress', color: 'bg-emerald-100 text-emerald-800 border-emerald-200 animate-pulse' };
      case 'voting_closed':
        return { label: 'Polling Concluded', color: 'bg-slate-100 text-slate-800 border-slate-200' };
      case 'counting':
        return { label: 'Vote Counting Live', color: 'bg-rose-100 text-rose-800 border-rose-200 animate-pulse' };
      case 'results_locked':
        return { label: 'Results Locked (ECI Review)', color: 'bg-purple-100 text-purple-800 border-purple-200' };
      case 'results_declared':
        return { label: 'Official Results Released', color: 'bg-green-100 text-green-800 border-green-200' };
      case 'completed':
        return { label: 'Tenure Completed', color: 'bg-slate-100 text-slate-800 border-slate-200' };
      default:
        return { label: String(phase), color: 'bg-slate-100 text-slate-800 border-slate-200' };
    }
  };

  const phaseBadge = getPhaseBadge(election.phase);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5EAF1] shadow-xs">
      {/* Tricolor Accent Stripe at top */}
      <div className="tricolor-stripe" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigateTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-[#173B67] flex items-center justify-center text-white shadow-md relative overflow-hidden group">
              <span className="text-xl">🇮🇳</span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-base sm:text-lg md:text-xl tracking-tight text-[#173B67]">
                  KING MAKER OF INDIAN POLITICS
                </span>
                {isSupabaseConfigured ? (
                  <span className="hidden md:inline-flex text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    SUPABASE CLOUD
                  </span>
                ) : (
                  <span className="hidden md:inline-flex text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
                    LOCAL SIM
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#687386] font-medium leading-none hidden sm:block">
                Your Republic. Your Decisions.
              </p>
            </div>
          </div>

          {/* Center: Live Election Phase Indicator */}
          <div className="hidden lg:flex items-center gap-3 px-3 py-1.5 rounded-full bg-[#F7F9FC] border border-[#E5EAF1]">
            <div className="flex items-center gap-1.5 text-xs text-[#687386] font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-dot" />
              <span>Lok Sabha 2026:</span>
            </div>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${phaseBadge.color}`}>
              {phaseBadge.label}
            </span>
            {election.phaseTimeRemainingSeconds > 0 && (
              <span className="text-xs font-semibold text-[#173B67] flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#F59E0B]" />
                {formatTime(election.phaseTimeRemainingSeconds)}
              </span>
            )}
          </div>

          {/* Right: Notifications & Profile Badge */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Results Locked Notification for Admin */}
            {election.resultsLocked && !election.resultsReleased && (
              <button
                onClick={() => {
                  onToggleRole('admin');
                  onNavigateTab('admin');
                }}
                className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold hover:bg-rose-100 transition-colors"
                title="Election Commission review required before official release"
              >
                <span>🔒 Results Locked</span>
                <span className="text-[10px] text-rose-600 underline">ECI Release</span>
              </button>
            )}

            {/* Role Switcher Toggle Button */}
            <button
              onClick={() => {
                const nextRole = userRole === 'admin' ? 'player' : 'admin';
                onToggleRole(nextRole);
                if (nextRole === 'admin') {
                  onNavigateTab('admin');
                }
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs border ${
                userRole === 'admin'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-400 ring-2 ring-amber-300/40'
                  : 'bg-[#173B67] text-white border-[#173B67] hover:bg-[#0f2644]'
              }`}
              title="Toggle between Citizen/Player view and Election Commission God Mode"
            >
              {userRole === 'admin' ? (
                <>
                  <span className="text-sm">👑</span>
                  <span className="hidden sm:inline">ECI GOD MODE</span>
                  <span className="sm:hidden">ECI</span>
                </>
              ) : (
                <>
                  <span className="text-sm">👤</span>
                  <span className="hidden sm:inline">PLAYER MODE</span>
                  <span className="sm:hidden">CITIZEN</span>
                </>
              )}
            </button>

            {/* Reset simulation button */}
            <button
              onClick={() => {
                if (window.confirm('Reset the simulation world to default baseline?')) {
                  onReset();
                }
              }}
              title="Reset Simulation World"
              className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors hidden sm:inline-flex"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-xl text-[#173B67] hover:bg-[#F7F9FC] border border-transparent hover:border-[#E5EAF1] relative transition-all"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#F59E0B] rounded-full ring-2 ring-white" />
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-[#E5EAF1] py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 pb-2 border-b border-[#E5EAF1] flex items-center justify-between">
                    <span className="font-heading font-bold text-sm text-[#173B67]">Official Gazette & Alerts</span>
                    <span className="text-xs text-[#687386]">{notifications.length} alerts</span>
                  </div>
                  <div className="max-h-72 overflow-y-auto py-1">
                    {notifications.map((notif, index) => (
                      <div key={index} className="px-4 py-2.5 hover:bg-[#F7F9FC] text-xs text-[#172033] flex items-start gap-2.5 border-b border-slate-50 last:border-none">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{notif}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Pill */}
            <div
              onClick={() => onNavigateTab('profile')}
              className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full bg-white border border-[#E5EAF1] hover:border-[#173B67]/30 shadow-xs cursor-pointer transition-all"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-100 border border-slate-200 relative">
                <img
                  src={profile.avatarUrl}
                  alt={profile.displayName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to avatar letter
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="w-full h-full flex items-center justify-center font-bold text-xs text-[#173B67] bg-blue-50">
                  {profile.displayName.charAt(0)}
                </div>
              </div>
              <div className="text-left hidden sm:block">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-[#173B67] truncate max-w-[110px]">
                    {profile.displayName}
                  </span>
                  {profile.isVerified && <Shield className="w-3 h-3 text-blue-500 fill-blue-500" />}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#687386]">
                  <span className="font-semibold text-emerald-700 bg-emerald-50 px-1 rounded">Lvl {profile.level}</span>
                  <span className="truncate max-w-[80px]">{profile.partyAbbr || 'Independent'}</span>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>{profile.politicalXp} XP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
