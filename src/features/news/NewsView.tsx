import React, { useState } from 'react';
import {
  Newspaper,
  ShieldCheck,
  ExternalLink,
  PlusCircle,
  Filter,
  Sparkles,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { NewsEventItem, NewsCategory } from '../../types';

interface NewsViewProps {
  news: NewsEventItem[];
  onAddNotification: (msg: string) => void;
}

export const NewsView: React.FC<NewsViewProps> = ({ news, onAddNotification }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customSummary, setCustomSummary] = useState('');
  const [customCategory, setCustomCategory] = useState<NewsCategory>('National');
  const [customImpact, setCustomImpact] = useState('');

  const categories = ['All', 'National', 'State Elections', 'Economy', 'Judiciary', 'Public Welfare'];

  const filteredNews = selectedCategory === 'All'
    ? news
    : news.filter((item) => item.category === selectedCategory);

  const handlePublishNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim() || !customSummary.trim()) return;

    news.unshift({
      id: `news-${Date.now()}`,
      title: customTitle,
      summary: customSummary,
      category: customCategory,
      sourceName: 'Official Press Bureau',
      verificationStatus: 'verified',
      inGameImpact: customImpact || 'Public awareness and debate increased.',
      publishedAt: 'Just now'
    });

    onAddNotification(`Breaking Gazette Published: "${customTitle}"!`);
    setShowAddModal(false);
    setCustomTitle('');
    setCustomSummary('');
    setCustomImpact('');
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-[#E5EAF1] shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-[#173B67] text-white">
              <Newspaper className="w-5 h-5 text-[#F59E0B]" />
            </span>
            <h2 className="font-heading font-extrabold text-xl text-[#173B67]">
              Living World & Republic Gazette
            </h2>
          </div>
          <p className="text-xs text-[#687386]">
            Verified current affairs, statutory notifications, election commission circulars, and judicial rulings with in-game consequences.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary text-xs font-bold px-4 py-2.5 shadow-md flex items-center gap-2 self-start sm:self-center"
        >
          <PlusCircle className="w-4 h-4 text-[#F59E0B]" />
          <span>Dispatch News Bulletin</span>
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2 pb-2">
        <span className="text-xs font-bold text-[#687386] flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" /> Filter:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-[#173B67] text-white shadow-xs'
                : 'bg-white border border-[#E5EAF1] text-[#687386] hover:text-[#172033]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* News Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredNews.map((item) => (
          <div
            key={item.id}
            className="card-base p-5 card-hover flex flex-col justify-between border-l-4 border-l-[#173B67]"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-amber-100 text-amber-900 uppercase tracking-wider">
                  {item.category}
                </span>
                <span className="text-[11px] text-[#94A3B8] flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {item.publishedAt}
                </span>
              </div>

              <h3 className="font-heading font-extrabold text-base text-[#173B67] leading-snug mb-2">
                {item.title}
              </h3>

              <p className="text-xs text-[#687386] leading-relaxed mb-4">
                {item.summary}
              </p>

              {/* In-Game Consequence Card */}
              {item.inGameImpact && (
                <div className="p-3 rounded-xl bg-[#F7F9FC] border border-[#E5EAF1] text-xs text-[#172033] mb-4 space-y-1">
                  <span className="font-bold text-[#173B67] flex items-center gap-1.5 text-[11px]">
                    <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                    <span>In-Game Simulation Consequence:</span>
                  </span>
                  <p className="text-[11px] text-[#687386] leading-relaxed">
                    {item.inGameImpact}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[#E5EAF1] flex items-center justify-between text-xs">
              <span className="text-[#687386] font-medium">Source: {item.sourceName}</span>
              <span className="badge badge-green text-[10px]">
                <ShieldCheck className="w-3 h-3" /> Verified Official
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Publish Bulletin */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-[#E5EAF1] w-full max-w-lg p-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EAF1] mb-4">
              <h3 className="font-heading font-extrabold text-base text-[#173B67]">
                Dispatch Living World Bulletin
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                ✕ Cancel
              </button>
            </div>

            <form onSubmit={handlePublishNews} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#173B67] mb-1">Headline *</label>
                <input
                  type="text"
                  placeholder="e.g. Supreme Court Directs High-Level Mediation on River Waters"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F7F9FC] border border-[#E5EAF1] rounded-xl focus:outline-none focus:border-[#173B67]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#173B67] mb-1">Category</label>
                <select
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value as NewsCategory)}
                  className="w-full px-3 py-2 text-xs bg-[#F7F9FC] border border-[#E5EAF1] rounded-xl focus:outline-none focus:border-[#173B67]"
                >
                  <option value="National">National Governance</option>
                  <option value="State Elections">State Elections</option>
                  <option value="Economy">Economy & Reserve Bank</option>
                  <option value="Judiciary">Supreme Court & Law</option>
                  <option value="Public Welfare">Public Welfare & Climate</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#173B67] mb-1">Summary *</label>
                <textarea
                  rows={3}
                  placeholder="Official facts and verified context..."
                  value={customSummary}
                  onChange={(e) => setCustomSummary(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F7F9FC] border border-[#E5EAF1] rounded-xl focus:outline-none focus:border-[#173B67]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#173B67] mb-1">In-Game Impact</label>
                <input
                  type="text"
                  placeholder="e.g. Water policy approval in Southern states +6%"
                  value={customImpact}
                  onChange={(e) => setCustomImpact(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F7F9FC] border border-[#E5EAF1] rounded-xl focus:outline-none focus:border-[#173B67]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E5EAF1]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn btn-outline text-xs px-4 py-2 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary text-xs px-5 py-2 font-bold"
                >
                  Broadcast Bulletin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
