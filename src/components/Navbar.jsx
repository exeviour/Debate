import React from 'react';
import { Mic, Wallet, LogOut } from 'lucide-react';

// 1. TOP NAVBAR COMPONENT (WITH ACTIVE MC SESSION & LOG OUT BUTTON)
// ============================================================================

export default function Navbar({
  currentUser,
  currentTab,
  setCurrentTab,
  walletBalance,
  pendingCount,
  onOpenWallet,
  onLogout
}) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'lobby', label: 'Lobby' },
    { id: 'arena', label: 'Arena' },
    { id: 'leaderboard', label: 'Rankings' },
    { id: 'profile', label: 'Profile' },
    { id: 'admin', label: 'Admin', badge: pendingCount }
  ];

  return (
    <header className="border-b border-cyan-500/20 bg-black/75 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Brand Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setCurrentTab('home')}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:scale-105 transition">
            <Mic className="w-5 h-5 text-black" />
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black tracking-wider bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent block leading-none">
              MicWars
            </span>
            <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
              Battle Your Bars. Win The Mic.
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 overflow-x-auto">
          {navItems.map((item) => {
            const active = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                  active
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-400 border border-cyan-500/40'
                    : 'text-gray-300 hover:text-cyan-400'
                }`}
              >
                <span>{item.label}</span>
                {item.badge > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-extrabold bg-amber-400 text-black">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Wallet Balance, Active MC Pill & Log Out */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenWallet}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 text-xs font-bold hover:border-cyan-400 transition cursor-pointer"
          >
            <Wallet className="w-4 h-4" />
            <div className="text-left leading-tight">
              <span className="block text-[9px] uppercase tracking-wider text-cyan-300/70">
                Wallet Balance
              </span>
              <span>${Number(walletBalance).toFixed(2)}</span>
            </div>
          </button>

          <button
            onClick={onOpenWallet}
            className="hidden sm:inline-flex px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 text-black font-extrabold text-xs shadow-lg shadow-cyan-500/25 hover:brightness-110 transition cursor-pointer"
          >
            Deposit $1.50
          </button>

          <button
            onClick={() => setCurrentTab('profile')}
            title="View MC Profile"
            className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-gray-200 transition cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>{currentUser.handle}</span>
          </button>

          <button
            onClick={onLogout}
            title="Log Out to Authentication Portal"
            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/35 text-rose-300 text-xs font-extrabold transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </header>
  );
}

// ============================================================================
