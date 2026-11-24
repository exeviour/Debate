import React from 'react';
import { Wallet, LogOut, Mail, MapPin, Calendar, Award } from 'lucide-react';
import { RECENT_BATTLE_HISTORY } from '../data/mockData';

// 6. PROFILE VIEW (VETERAN ORATOR STATS, BATTLE HISTORY & LOG OUT)
// ============================================================================

export default function ProfileView({ currentUser, walletBalance, onOpenWallet, onGoLobby, onLogout }) {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* MC Profile Hero Card */}
      <div className="rounded-3xl bg-gradient-to-r from-[#0d121d] via-[#101828] to-[#0d121d] border border-cyan-500/30 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-cyan-400 to-blue-600 text-black font-black text-3xl flex items-center justify-center shadow-xl shadow-cyan-500/25">
            {currentUser.displayName.slice(0, 2).toUpperCase()}
          </div>
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                {currentUser.displayName}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
                {currentUser.handle}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-amber-300">
              {currentUser.classification}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 pt-1">
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" /> {currentUser.location}
              </span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" /> Member since{' '}
                {currentUser.memberSince}
              </span>
              <span className="inline-flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-cyan-400" /> {currentUser.email}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onOpenWallet}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 text-black font-extrabold text-xs cursor-pointer"
          >
            Wallet (${Number(walletBalance).toFixed(2)})
          </button>
          <button
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/35 text-rose-300 font-extrabold text-xs transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" /> Log Out
          </button>
        </div>
      </div>

      {/* Career Performance Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0d121d] border border-white/10 rounded-2xl p-5">
          <p className="text-xs uppercase font-bold text-gray-400">Total Battles</p>
          <p className="text-3xl font-black text-white mt-1">24</p>
          <p className="text-xs text-gray-500 mt-1">19 Wins / 5 Losses</p>
        </div>
        <div className="bg-[#0d121d] border border-white/10 rounded-2xl p-5">
          <p className="text-xs uppercase font-bold text-gray-400">Win Rate</p>
          <p className="text-3xl font-black text-cyan-400 mt-1">79.1%</p>
          <p className="text-xs text-gray-500 mt-1">Top 5% Season 4</p>
        </div>
        <div className="bg-[#0d121d] border border-white/10 rounded-2xl p-5">
          <p className="text-xs uppercase font-bold text-gray-400">Total Winnings</p>
          <p className="text-3xl font-black text-emerald-400 mt-1">$342.00</p>
          <p className="text-xs text-gray-500 mt-1">EcoCash &amp; PayPal Verified</p>
        </div>
        <div className="bg-[#0d121d] border border-white/10 rounded-2xl p-5">
          <p className="text-xs uppercase font-bold text-gray-400">Avg Judge Score</p>
          <p className="text-3xl font-black text-amber-400 mt-1">87.4</p>
          <p className="text-xs text-gray-500 mt-1">70% Expert Weight</p>
        </div>
      </div>

      {/* Recent Battle Ledger */}
      <div className="bg-[#0d121d] border border-white/10 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black flex items-center gap-2">
            <Award className="w-5 h-5 text-cyan-400" />
            Recent Battle Ledger
          </h2>
          <button
            onClick={onGoLobby}
            className="text-xs font-extrabold text-cyan-400 hover:text-cyan-300 cursor-pointer"
          >
            Enter Next Battle ($1.50) →
          </button>
        </div>

        <div className="space-y-3">
          {RECENT_BATTLE_HISTORY.map((item) => (
            <div
              key={item.id}
              className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-black/60 border border-white/10"
            >
              <div>
                <p className="font-bold text-sm text-white">{item.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {item.category} • {item.date} • 70/30 Composite:{' '}
                  <strong className="text-cyan-300">{item.compositeScore}</strong>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  {item.result}
                </span>
                <span className="font-black text-emerald-400 text-sm">{item.payout}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
