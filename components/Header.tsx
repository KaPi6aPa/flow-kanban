import React from 'react';
import { Search, Bell, Menu, Plus } from 'lucide-react';

interface HeaderProps {
  onOpenNewIssue?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenNewIssue }) => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-3.5 border-b border-white/5 bg-zinc-950/70 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <button className="p-2 -ml-2 text-zinc-400 hover:text-zinc-100 transition-colors rounded-md hover:bg-white/5 lg:hidden">
          <Menu size={20} />
        </button>
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center shadow-glow">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1 className="text-lg font-semibold tracking-tight text-zinc-100">Flow</h1>
          <span className="px-2 py-0.5 text-[10px] font-medium text-zinc-500 bg-zinc-900 border border-white/5 rounded-full hidden sm:inline-block">BETA</span>
        </div>

        <div className="h-6 w-px bg-white/10 mx-2 hidden md:block"></div>

        <nav className="hidden md:flex items-center gap-1">
          {['Overview', 'Active Sprint', 'Roadmap'].map((item, i) => (
            <button 
              key={item}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                i === 1 
                  ? 'text-zinc-100 bg-white/10 shadow-sm' 
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <div className="relative group hidden sm:block">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="h-9 w-48 bg-zinc-900/50 border border-white/5 rounded-lg pl-9 pr-3 text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:bg-zinc-900 transition-all placeholder:text-zinc-600"
          />
        </div>

        <button className="p-2 text-zinc-400 hover:text-zinc-100 transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-indigo-500 rounded-full border border-zinc-950"></span>
        </button>

        <button 
          onClick={onOpenNewIssue}
          className="hidden sm:flex items-center gap-2 h-8 px-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-lg transition-all shadow-lg shadow-indigo-500/20"
        >
          <Plus size={14} />
          <span>New Issue</span>
        </button>

        <img 
          src="https://picsum.photos/100/100?random=user" 
          alt="User" 
          className="w-8 h-8 rounded-full border border-white/10 cursor-pointer hover:border-indigo-500/50 transition-colors"
        />
      </div>
    </header>
  );
};

export default Header;