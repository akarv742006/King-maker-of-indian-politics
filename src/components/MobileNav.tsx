import React from 'react';
import {
  LayoutDashboard,
  MapPin,
  Vote,
  MessageSquare,
  Landmark,
  UserCheck,
  Menu
} from 'lucide-react';

interface MobileNavProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenFullMenu: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeTab,
  onSelectTab,
  onOpenFullMenu
}) => {
  const primaryMobileItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'map', label: 'Map', icon: MapPin },
    { id: 'elections', label: 'Chunav', icon: Vote, isSpecial: true },
    { id: 'deshconnect', label: 'Desh', icon: MessageSquare },
    { id: 'profile', label: 'Profile', icon: UserCheck }
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-[#E5EAF1] shadow-lg px-2 py-1.5 flex items-center justify-around">
      {primaryMobileItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelectTab(item.id)}
            className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition-all relative ${
              isActive ? 'text-[#173B67] font-bold' : 'text-[#687386]'
            }`}
          >
            {item.isSpecial ? (
              <div className="w-10 h-10 -mt-5 rounded-full bg-[#173B67] text-white flex items-center justify-center shadow-md border-2 border-white">
                <Icon className="w-5 h-5 text-[#F59E0B]" />
              </div>
            ) : (
              <Icon className="w-5 h-5" />
            )}
            <span className="text-[10px] mt-0.5">{item.label}</span>
            {isActive && !item.isSpecial && (
              <span className="w-1 h-1 rounded-full bg-[#173B67] -mt-0.5" />
            )}
          </button>
        );
      })}
      <button
        onClick={onOpenFullMenu}
        className="flex flex-col items-center justify-center p-1.5 rounded-xl text-[#687386]"
      >
        <Menu className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">More</span>
      </button>
    </nav>
  );
};
