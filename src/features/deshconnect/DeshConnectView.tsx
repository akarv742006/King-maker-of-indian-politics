import React, { useState } from 'react';
import {
  MessageSquare,
  Heart,
  Share2,
  BarChart2,
  Image,
  Send,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Bookmark,
  CheckCircle2,
  Plus
} from 'lucide-react';
import { DeshPost, PlayerProfile } from '../../types';

interface DeshConnectViewProps {
  posts: DeshPost[];
  profile: PlayerProfile;
  onCreatePost: (content: string, hashtags: string[], pollQ?: string, pollOptions?: string[]) => void;
  onToggleLike: (postId: string) => void;
  onVotePoll: (postId: string, optionIdx: number) => void;
  onAddNotification: (msg: string) => void;
}

export const DeshConnectView: React.FC<DeshConnectViewProps> = ({
  posts,
  profile,
  onCreatePost,
  onToggleLike,
  onVotePoll,
  onAddNotification
}) => {
  const [postText, setPostText] = useState('');
  const [hashtagsText, setHashtagsText] = useState('');
  const [includePoll, setIncludePoll] = useState(false);
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOpt1, setPollOpt1] = useState('');
  const [pollOpt2, setPollOpt2] = useState('');
  const [activeFilterTag, setActiveFilterTag] = useState<string | null>(null);

  const TRENDING_HASHTAGS = [
    { tag: 'LokSabha2026', count: '48.2K posts' },
    { tag: 'ViksitBharat', count: '34.8K posts' },
    { tag: 'KisaanNyay', count: '29.1K posts' },
    { tag: 'Varanasi', count: '18.4K posts' },
    { tag: 'DigitalAIAct', count: '12.6K posts' },
    { tag: 'MSPStatutory', count: '9.8K posts' }
  ];

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postText.trim()) return;

    const tags = hashtagsText
      .split(' ')
      .map((t) => t.replace('#', '').trim())
      .filter(Boolean);

    const pollOptions = includePoll && pollOpt1.trim() && pollOpt2.trim() ? [pollOpt1, pollOpt2] : undefined;

    onCreatePost(
      postText,
      tags.length > 0 ? tags : ['DemocracyInAction'],
      includePoll ? pollQuestion : undefined,
      pollOptions
    );

    setPostText('');
    setHashtagsText('');
    setIncludePoll(false);
    setPollQuestion('');
    setPollOpt1('');
    setPollOpt2('');
  };

  const filteredPosts = activeFilterTag
    ? posts.filter((p) => p.hashtags.some((h) => h.toLowerCase() === activeFilterTag.toLowerCase()))
    : posts;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-[#E5EAF1] shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-[#173B67] text-white">
              <MessageSquare className="w-5 h-5 text-[#F59E0B]" />
            </span>
            <h2 className="font-heading font-extrabold text-xl text-[#173B67]">
              DeshConnect (देश कनेक्ट)
            </h2>
          </div>
          <p className="text-xs text-[#687386]">
            The sovereign political public square. Broadcast policy pledges, debate issues, run constituent polls, and build grassroots support.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Feed Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-5">
          {/* Post Creation Box */}
          <div className="card-base p-5 shadow-xs">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                <img
                  src={profile.avatarUrl}
                  alt={profile.displayName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="w-full h-full flex items-center justify-center font-bold text-xs text-[#173B67] bg-blue-50">
                  {profile.displayName.charAt(0)}
                </div>
              </div>
              <div className="flex-1">
                <form onSubmit={handlePublish} className="space-y-3">
                  <textarea
                    rows={3}
                    placeholder={`What is your political vision for Bharat today, ${profile.displayName}?`}
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    className="w-full p-3 text-xs bg-[#F7F9FC] border border-[#E5EAF1] rounded-xl focus:outline-none focus:border-[#173B67] resize-none"
                  />

                  {/* Optional Poll inputs */}
                  {includePoll && (
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                      <input
                        type="text"
                        placeholder="Poll Question: e.g. Should agricultural loans receive interest subsidy?"
                        value={pollQuestion}
                        onChange={(e) => setPollQuestion(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#E5EAF1] rounded-lg"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Option 1"
                          value={pollOpt1}
                          onChange={(e) => setPollOpt1(e.target.value)}
                          className="px-3 py-1.5 text-xs bg-white border border-[#E5EAF1] rounded-lg"
                        />
                        <input
                          type="text"
                          placeholder="Option 2"
                          value={pollOpt2}
                          onChange={(e) => setPollOpt2(e.target.value)}
                          className="px-3 py-1.5 text-xs bg-white border border-[#E5EAF1] rounded-lg"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="#Hashtags (e.g. #Varanasi #Jobs)"
                        value={hashtagsText}
                        onChange={(e) => setHashtagsText(e.target.value)}
                        className="px-3 py-1.5 text-xs bg-[#F7F9FC] border border-[#E5EAF1] rounded-lg w-44 sm:w-56"
                      />
                      <button
                        type="button"
                        onClick={() => setIncludePoll(!includePoll)}
                        className={`p-2 rounded-lg text-xs font-bold border flex items-center gap-1 ${
                          includePoll
                            ? 'bg-amber-100 text-amber-800 border-amber-300'
                            : 'bg-white border-[#E5EAF1] text-[#687386]'
                        }`}
                      >
                        <BarChart2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Poll</span>
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={!postText.trim()}
                      className="btn btn-primary text-xs font-bold px-4 py-2 flex items-center gap-1.5 shadow-sm disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Broadcast</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Active Filter Tag Indicator */}
          {activeFilterTag && (
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900">
              <span>Showing posts tagged with <b>#{activeFilterTag}</b></span>
              <button
                onClick={() => setActiveFilterTag(null)}
                className="font-bold text-blue-700 hover:underline"
              >
                Clear Filter
              </button>
            </div>
          )}

          {/* Posts Stream */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div key={post.id} className="card-base p-5 hover:border-[#173B67]/30 transition-all">
                {/* Author Info */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                      <img
                        src={post.authorAvatar}
                        alt={post.authorName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div className="w-full h-full flex items-center justify-center font-bold text-xs text-[#173B67] bg-blue-50">
                        {post.authorName.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-heading font-extrabold text-sm text-[#172033]">
                          {post.authorName}
                        </h4>
                        {post.isVerified && (
                          <ShieldCheck className="w-4 h-4 text-blue-600 fill-blue-500" />
                        )}
                        {post.partyAbbr && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700">
                            {post.partyAbbr}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#687386]">
                        {post.authorRole} · {post.timestamp}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <p className="text-xs text-[#172033] leading-relaxed mb-3 whitespace-pre-line">
                  {post.content}
                </p>

                {/* Attached Image if any */}
                {post.imageUrl && (
                  <div className="rounded-xl overflow-hidden mb-3 border border-slate-200/80 max-h-72 bg-slate-100">
                    <img
                      src={post.imageUrl}
                      alt="Post visual"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Interactive Poll if any */}
                {post.poll && (
                  <div className="mb-4 p-4 rounded-xl bg-[#F7F9FC] border border-[#E5EAF1] space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#173B67]">
                      <BarChart2 className="w-4 h-4 text-[#F59E0B]" />
                      <span>{post.poll.question}</span>
                    </div>
                    <div className="space-y-2">
                      {post.poll.options.map((opt, oIdx) => {
                        const totalPollVotes = post.poll?.options.reduce((a, b) => a + b.votes, 0) || 1;
                        const optPct = ((opt.votes / totalPollVotes) * 100).toFixed(0);
                        const isChosen = post.poll?.userSelected === oIdx;

                        return (
                          <button
                            key={oIdx}
                            onClick={() => onVotePoll(post.id, oIdx)}
                            disabled={post.poll?.userSelected !== undefined}
                            className={`w-full p-2.5 rounded-xl border text-xs text-left relative overflow-hidden transition-all ${
                              isChosen
                                ? 'bg-amber-50 border-amber-300 font-bold'
                                : 'bg-white border-[#E5EAF1] hover:bg-slate-50'
                            }`}
                          >
                            <div
                              className="absolute top-0 bottom-0 left-0 bg-[#F59E0B]/15"
                              style={{ width: `${optPct}%` }}
                            />
                            <div className="relative z-10 flex items-center justify-between">
                              <span>{opt.text}</span>
                              <span className="font-mono text-[11px] text-[#687386]">
                                {optPct}% ({opt.votes})
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Hashtags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {post.hashtags.map((h, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveFilterTag(h)}
                      className="text-[11px] font-semibold text-[#173B67] hover:text-[#F59E0B] bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded-md"
                    >
                      #{h}
                    </button>
                  ))}
                </div>

                {/* Social Actions Bar */}
                <div className="flex items-center justify-between pt-3 border-t border-[#E5EAF1] text-xs text-[#687386]">
                  <button
                    onClick={() => onToggleLike(post.id)}
                    className={`flex items-center gap-1.5 font-bold transition-colors ${
                      post.isLiked ? 'text-rose-600' : 'hover:text-rose-600'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-rose-600' : ''}`} />
                    <span>{post.likesCount.toLocaleString()}</span>
                  </button>

                  <button className="flex items-center gap-1.5 font-bold hover:text-[#173B67] transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.commentsCount.toLocaleString()}</span>
                  </button>

                  <button
                    onClick={() => onAddNotification('Statement reposted on your political profile timeline.')}
                    className="flex items-center gap-1.5 font-bold hover:text-emerald-700 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>{post.sharesCount.toLocaleString()}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (1 Col): Trending Topics & Political Debates */}
        <div className="space-y-5">
          <div className="card-base p-5 border-t-4 border-t-[#173B67]">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-[#F59E0B]" />
              <h3 className="font-heading font-extrabold text-sm text-[#173B67]">
                DeshConnect Trends · Bharat
              </h3>
            </div>
            <div className="divide-y divide-[#E5EAF1]">
              {TRENDING_HASHTAGS.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveFilterTag(item.tag)}
                  className="py-2.5 flex items-center justify-between cursor-pointer hover:bg-slate-50 px-2 rounded-lg transition-colors"
                >
                  <div>
                    <p className="text-xs font-bold text-[#173B67] hover:text-[#F59E0B]">
                      #{item.tag}
                    </p>
                    <p className="text-[10px] text-[#687386]">{item.count}</p>
                  </div>
                  <span className="text-xs font-bold text-slate-400">#{idx + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
