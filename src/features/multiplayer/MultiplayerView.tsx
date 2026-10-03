import React, { useState } from 'react';
import {
  Radio,
  Send,
  Users,
  Shield,
  MessageSquare,
  Landmark,
  Circle
} from 'lucide-react';
import { ChatMessage, PlayerProfile } from '../../types';

interface MultiplayerViewProps {
  messages: ChatMessage[];
  profile: PlayerProfile;
  onSendMessage: (content: string, channel: 'all' | 'party' | 'parliament') => void;
}

export const MultiplayerView: React.FC<MultiplayerViewProps> = ({
  messages,
  profile,
  onSendMessage
}) => {
  const [activeChannel, setActiveChannel] = useState<'all' | 'party' | 'parliament'>('all');
  const [inputContent, setInputContent] = useState('');

  // Simulated active online politicians in room
  const onlineMembers = [
    { name: 'Narendra Modi (PM)', role: 'Prime Minister', party: 'BJP', status: 'In Session' },
    { name: 'Rahul Gandhi (MP)', role: 'Opposition Leader', party: 'INC', status: 'Active' },
    { name: 'Akhilesh Yadav (MP)', role: 'SP Chief', party: 'SP', status: 'Active' },
    { name: 'Mamata Banerjee (CM)', role: 'Chief Minister', party: 'TMC', status: 'Online' },
    { name: 'M.K. Stalin (CM)', role: 'Chief Minister', party: 'DMK', status: 'Online' },
    { name: `${profile.displayName} (You)`, role: profile.currentRole, party: profile.partyAbbr || 'IND', status: 'Online', isSelf: true }
  ];

  const filteredMessages = messages.filter(
    (m) => activeChannel === 'all' || m.channel === activeChannel
  );

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputContent.trim()) return;
    onSendMessage(inputContent, activeChannel);
    setInputContent('');
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-[#E5EAF1] shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-[#173B67] text-white">
              <Radio className="w-5 h-5 text-[#F59E0B]" />
            </span>
            <h2 className="font-heading font-extrabold text-xl text-[#173B67]">
              Multiplayer Political Chambers
            </h2>
          </div>
          <p className="text-xs text-[#687386]">
            Synchronized live parliament debate halls, party caucuses, and public rooms with real-time presence.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 pulse-dot" />
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Room: Bharat Central 01 · 28 Lawmakers Live
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column (1 Col): Channel Selector & Active Lawmakers */}
        <div className="space-y-5">
          <div className="card-base p-4 space-y-2">
            <span className="text-[10px] font-bold text-[#687386] uppercase tracking-wider block mb-1">
              Select Chamber Channel
            </span>
            <button
              onClick={() => setActiveChannel('all')}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all ${
                activeChannel === 'all'
                  ? 'bg-[#173B67] text-white shadow-xs'
                  : 'bg-[#F7F9FC] text-[#687386] hover:bg-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Central Public Square</span>
              </div>
            </button>

            <button
              onClick={() => setActiveChannel('parliament')}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all ${
                activeChannel === 'parliament'
                  ? 'bg-[#173B67] text-white shadow-xs'
                  : 'bg-[#F7F9FC] text-[#687386] hover:bg-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <Landmark className="w-4 h-4 text-[#F59E0B]" />
                <span>Sansad Floor Debates</span>
              </div>
            </button>

            <button
              onClick={() => setActiveChannel('party')}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all ${
                activeChannel === 'party'
                  ? 'bg-[#173B67] text-white shadow-xs'
                  : 'bg-[#F7F9FC] text-[#687386] hover:bg-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-500" />
                <span>{profile.partyAbbr || 'Party'} Inner Caucus</span>
              </div>
            </button>
          </div>

          {/* Active Politicians in Session */}
          <div className="card-base p-4">
            <span className="text-[10px] font-bold text-[#687386] uppercase tracking-wider block mb-3">
              Lawmakers in Session (6)
            </span>
            <div className="space-y-2.5">
              {onlineMembers.map((m, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Circle className="w-2 h-2 text-emerald-500 fill-emerald-500 shrink-0" />
                    <span className={`font-semibold truncate max-w-[130px] ${m.isSelf ? 'text-[#173B67] font-bold' : 'text-[#172033]'}`}>
                      {m.name}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                    {m.party}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (3 Cols): Live Message Stream & Input */}
        <div className="lg:col-span-3 card-base p-5 flex flex-col justify-between h-[540px]">
          {/* Messages Container */}
          <div className="overflow-y-auto space-y-3.5 pr-2">
            {filteredMessages.map((msg) => {
              const isSelf = msg.senderName.includes(profile.displayName);
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 text-xs ${isSelf ? 'flex-row-reverse' : ''}`}
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                    <img
                      src={msg.avatarUrl}
                      alt={msg.senderName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="w-full h-full flex items-center justify-center font-bold text-[10px] text-[#173B67] bg-blue-50">
                      {msg.senderName.charAt(0)}
                    </div>
                  </div>

                  <div className={`max-w-md ${isSelf ? 'items-end' : ''}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-[#173B67]">{msg.senderName}</span>
                      {msg.partyAbbr && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700">
                          {msg.partyAbbr}
                        </span>
                      )}
                      <span className="text-[10px] text-[#94A3B8]">{msg.timestamp}</span>
                    </div>
                    <div
                      className={`p-3 rounded-2xl text-xs leading-relaxed ${
                        isSelf
                          ? 'bg-[#173B67] text-white rounded-tr-none'
                          : 'bg-[#F7F9FC] border border-[#E5EAF1] text-[#172033] rounded-tl-none'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chat Input Bar */}
          <form onSubmit={handleSend} className="pt-3 border-t border-[#E5EAF1] flex gap-2">
            <input
              type="text"
              placeholder={`Send message to #${activeChannel === 'all' ? 'Public-Square' : activeChannel}...`}
              value={inputContent}
              onChange={(e) => setInputContent(e.target.value)}
              className="flex-1 px-3.5 py-2 text-xs bg-[#F7F9FC] border border-[#E5EAF1] rounded-xl focus:outline-none focus:border-[#173B67]"
            />
            <button
              type="submit"
              disabled={!inputContent.trim()}
              className="btn btn-primary text-xs font-bold px-4 shrink-0 flex items-center gap-1.5 disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Broadcast</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
