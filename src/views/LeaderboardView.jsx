import React from 'react';
import { Crown } from 'lucide-react';
import { PODIUM_LEADERS, GLOBAL_STANDINGS } from '../data/mockData';

// 5. LEADERBOARD VIEW (SEASON 4 PODIUM + GLOBAL SPEAKER STANDINGS TABLE)
// ============================================================================

export default function LeaderboardView({ currentUser, onEnterBattle }) {
  return (
    <div className="space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-extrabold uppercase tracking-widest">
          Season 4 Global Rankings
        </span>
        <h1 className="text-3xl sm:text-4xl font-black">Top MicWars Orators</h1>
        <p className="text-sm text-gray-400">
          Rankings calculated by win rates, certified judge scores (70%), and total cash earnings.
        </p>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end max-w-5xl mx-auto pt-4">
        {PODIUM_LEADERS.map((p) => {
          const isFirst = p.rank === 1;
          return (
            <div
              key={p.rank}
              className={`relative rounded-3xl p-6 text-center border transition ${
                isFirst
                  ? 'bg-gradient-to-b from-cyan-950/40 to-[#0d121d] border-cyan-400/60 shadow-2xl shadow-cyan-500/15 md:-translate-y-4'
                  : 'bg-[#0d121d] border-white/10'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-full mx-auto -mt-10 mb-4 flex items-center justify-center font-black text-sm shadow-lg ${
                  isFirst
                    ? 'bg-amber-400 text-black'
                    : p.rank === 2
                    ? 'bg-slate-400 text-black'
                    : 'bg-amber-700 text-white'
                }`}
              >
                {isFirst ? <Crown className="w-5 h-5" /> : p.rank}
              </div>

              <div
                className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center text-2xl font-black border-2 ${
                  isFirst
                    ? 'bg-cyan-500/15 border-cyan-400 text-cyan-300'
                    : 'bg-white/5 border-white/20 text-gray-200'
                }`}
              >
                {p.name.slice(0, 2).toUpperCase()}
              </div>

              <h3 className="text-xl font-black text-white mt-4">{p.name}</h3>
              <p className="text-[11px] font-bold tracking-wider uppercase text-cyan-400 mt-0.5">
                {p.country} • {p.category}
              </p>

              <div className="grid grid-cols-2 gap-2 bg-black/50 border border-white/10 rounded-xl p-3 my-4 text-xs">
                <div>
                  <span className="block text-[10px] text-gray-400 uppercase">Win Rate</span>
                  <span className="font-extrabold text-emerald-400">{p.winRate}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-gray-400 uppercase">Battles</span>
                  <span className="font-extrabold text-white">{p.battles}</span>
                </div>
              </div>

              <p className="text-2xl font-black text-emerald-400">
                {p.earnings} <span className="text-xs font-semibold text-gray-400">Won</span>
              </p>
            </div>
          );
        })}
      </div>

      {/* Global Speaker Standings Table */}
      <div className="max-w-5xl mx-auto bg-[#0d121d] border border-white/10 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <h2 className="font-black text-lg">Global Speaker Standings</h2>
          <button
            onClick={onEnterBattle}
            className="px-3.5 py-1.5 rounded-xl bg-cyan-400 text-black font-extrabold text-xs cursor-pointer"
          >
            Climb Ranks ($1.50)
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-gray-400 bg-black/40 border-b border-white/10">
              <tr>
                <th className="py-3 px-6">Rank</th>
                <th className="py-3 px-6">Orator / MC</th>
                <th className="py-3 px-6">Country</th>
                <th className="py-3 px-6">Category</th>
                <th className="py-3 px-6">Battles Won</th>
                <th className="py-3 px-6 text-right">Total Earnings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {GLOBAL_STANDINGS.map((row) => (
                <tr key={row.rank} className="hover:bg-white/5 transition">
                  <td className="py-4 px-6 font-black text-amber-400">#{row.rank}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-extrabold text-xs flex items-center justify-center">
                        {row.rank === 7
                          ? currentUser.displayName.slice(0, 2).toUpperCase()
                          : row.initials}
                      </span>
                      <span className="font-bold text-white">
                        {row.rank === 7 ? `${currentUser.displayName} (You)` : row.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-300">{row.country}</td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-gray-300">
                      {row.category}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-semibold text-gray-200">{row.record}</td>
                  <td className="py-4 px-6 text-right font-extrabold text-emerald-400">
                    {row.earnings}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
