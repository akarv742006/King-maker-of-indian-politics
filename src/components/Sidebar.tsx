import React from 'react';
import {
  LayoutDashboard,
  MapPin,
  Vote,
  Users,
  MessageSquare,
  Landmark,
  Briefcase,
  TrendingUp,
  Newspaper,
  Radio,
  UserCheck,
  ShieldAlert
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onSelectTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Home Dashboard', icon: LayoutDashboard },
    { id: 'map', label: 'India Map & Seats', icon: MapPin },
    { id: 'elections', label: 'Elections & Campaign', icon: Vote, badge: 'Live' },
    { id: 'parties', label: 'Parties & Alliances', icon: Users },
    { id: 'deshconnect', label: 'DeshConnect Social', icon: MessageSquare, badge: 'Feed' },
    { id: 'parliament', label: 'Parliament (Sansad)', icon: Landmark },
    { id: 'government', label: 'Government & Cabinet', icon: Briefcase },
    { id: 'economy', label: 'Economy & Welfare', icon: TrendingUp },
    { id: 'news', label: 'News & Events', icon: Newspaper },
    { id: 'multiplayer', label: 'Lok Sabha Chamber', icon: Radio },
    { id: 'profile', label: 'Rankings & Profile', icon: UserCheck },
    { id: 'admin', label: 'ECI Commission', icon: ShieldAlert }
  ];

  return (
    <aside className="w-64 bg-white border-r border-[#E5EAF1] flex flex-col justify-between h-[calc(100vh-4.25rem)] sticky top-17 hidden lg:flex select-none">
      <div className="py-4 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
          Republic Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all group ${
                isActive
                  ? 'bg-[#173B67] text-white shadow-sm'
                  : 'text-[#687386] hover:bg-[#F7F9FC] hover:text-[#172033]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-[#F59E0B]' : 'text-[#687386] group-hover:text-[#173B67]'
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : item.badge === 'Live'
                      ? 'bg-rose-100 text-rose-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom info card */}
      <div className="p-3 border-t border-[#E5EAF1] bg-[#F7F9FC]/60">
        <div className="p-3 rounded-xl bg-white border border-[#E5EAF1] text-xs space-y-1">
          <div className="flex items-center justify-between text-[#173B67] font-bold">
            <span>Sovereign Republic</span>
            <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1 rounded font-mono">v1.0</span>
          </div>
          <p className="text-[11px] text-[#687386]">
            Constitutional simulation with authoritative server synchronization.
          </p>
        </div>
      </div>
    </aside>
  );
};
