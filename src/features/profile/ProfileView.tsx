import React, { useState } from 'react';
import {
  UserCheck,
  Shield,
  Award,
  Sparkles,
  MapPin,
  Landmark,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  RotateCcw
} from 'lucide-react';
import { PlayerProfile } from '../../types';

interface ProfileViewProps {
  profile: PlayerProfile;
  onUpdateProfile: (updated: Partial<PlayerProfile>) => void;
  onAddNotification: (msg: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  onUpdateProfile,
  onAddNotification
}) => {
  const [displayName, setDisplayName] = useState(profile.displayName);
  const [bio, setBio] = useState(profile.bio);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({ displayName, bio });
    onAddNotification('Player profile credentials updated successfully.');
  };

  const handleSwitchPersona = (role: PlayerProfile['currentRole'], name: string, party: string, partyAbbr: string, avatar: string) => {
    onUpdateProfile({
      displayName: name,
      currentRole: role,
      partyName: party,
      partyAbbr,
      avatarUrl: avatar,
      politicalXp: profile.politicalXp + 500
    });
    setDisplayName(name);
    onAddNotification(`Switched persona to ${name} (${role})!`);
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="card-base p-6 border-l-4 border-l-[#173B67] bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border-2 border-[#173B67] shrink-0">
              <img
                src={profile.avatarUrl}
                alt={profile.displayName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="w-full h-full flex items-center justify-center font-bold text-xl text-[#173B67] bg-blue-50">
                {profile.displayName.charAt(0)}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-heading font-extrabold text-2xl text-[#173B67]">
                  {profile.displayName}
                </h2>
                {profile.isVerified && (
                  <Shield className="w-4 h-4 text-blue-600 fill-blue-500" />
                )}
                <span className="badge badge-saffron text-xs">
                  {profile.currentRole}
                </span>
              </div>
              <p className="text-xs text-[#687386] mt-0.5">
                @{profile.username} · Member of Parliament Constituency: <span className="font-bold text-[#173B67]">{profile.constituencyName} ({profile.stateCode})</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              <span>Rank: Level {profile.level} ({profile.politicalXp} XP)</span>
            </span>
          </div>
        </div>

        <p className="text-xs text-[#172033] mt-4 leading-relaxed bg-[#F7F9FC] p-3 rounded-xl border border-[#E5EAF1]">
          {profile.bio}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Quick Switch Persona & Edit Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Switch Political Test Personas */}
          <div className="card-base p-5">
            <h3 className="font-heading font-extrabold text-sm text-[#173B67] uppercase tracking-wider mb-2">
              Switch Political Persona (Simulation Sandbox)
            </h3>
            <p className="text-xs text-[#687386] mb-3">
              Test the republic simulation through different constitutional perspectives.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => handleSwitchPersona('Candidate', 'Akash Sharma', 'Bharatiya Janata Party', 'BJP', '/assets/image16.jpeg')}
                className="p-3 rounded-xl border border-[#E5EAF1] hover:border-[#173B67] bg-[#F7F9FC] text-left transition-all"
              >
                <p className="font-heading font-bold text-xs text-[#173B67]">Akash Sharma</p>
                <p className="text-[11px] text-[#687386]">Youth Candidate · BJP</p>
                <span className="badge badge-saffron text-[9px] mt-2">Grassroots</span>
              </button>

              <button
                onClick={() => handleSwitchPersona('Prime Minister', 'Narendra Modi', 'Bharatiya Janata Party', 'BJP', '/assets/image1.jpeg')}
                className="p-3 rounded-xl border border-[#E5EAF1] hover:border-[#173B67] bg-[#F7F9FC] text-left transition-all"
              >
                <p className="font-heading font-bold text-xs text-[#173B67]">Narendra Modi</p>
                <p className="text-[11px] text-[#687386]">Head of Government · PM</p>
                <span className="badge badge-navy text-[9px] mt-2">Treasury Bench</span>
              </button>

              <button
                onClick={() => handleSwitchPersona('Opposition Leader', 'Rahul Gandhi', 'Indian National Congress', 'INC', '/assets/image5.jpeg')}
                className="p-3 rounded-xl border border-[#E5EAF1] hover:border-[#173B67] bg-[#F7F9FC] text-left transition-all"
              >
                <p className="font-heading font-bold text-xs text-[#173B67]">Rahul Gandhi</p>
                <p className="text-[11px] text-[#687386]">Opposition Leader · INC</p>
                <span className="badge badge-green text-[9px] mt-2">Shadow Cabinet</span>
              </button>
            </div>
          </div>

          {/* Edit Profile Form */}
          <div className="card-base p-5">
            <h3 className="font-heading font-extrabold text-sm text-[#173B67] uppercase tracking-wider mb-3">
              Update Politician Credentials
            </h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#173B67] mb-1">Display Name</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F7F9FC] border border-[#E5EAF1] rounded-xl focus:outline-none focus:border-[#173B67]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#173B67] mb-1">Public Bio</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F7F9FC] border border-[#E5EAF1] rounded-xl focus:outline-none focus:border-[#173B67]"
                />
              </div>

              <div className="flex justify-end">
                <button type="submit" className="btn btn-primary text-xs font-bold px-4 py-2">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Badges & Statistics */}
        <div className="space-y-5">
          <div className="card-base p-5 border-t-4 border-t-[#F59E0B]">
            <h3 className="font-heading font-extrabold text-sm text-[#173B67] mb-3 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#F59E0B]" />
              <span>Earned Constitutional Badges</span>
            </h3>
            <div className="space-y-2">
              {profile.badges.map((badge, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-[#F7F9FC] border border-[#E5EAF1] text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-bold text-[#173B67]">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
