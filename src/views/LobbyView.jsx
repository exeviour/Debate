import React, { useMemo } from 'react';
import { Plus } from 'lucide-react';

// 3. LOBBY VIEW (MODE & CATEGORY FILTERS + CREATE BATTLE + $1.50 STAKING)
// ============================================================================

export default function LobbyView({
  battles,
  joinedBattleIds,
  modeFilter,
  setModeFilter,
  categoryFilter,
  setCategoryFilter,
  onJoinBattle,
  onOpenCreateBattle,
  onWatchRoom
}) {
  const modes = ['All', 'Live War', 'Recorded War'];
  const categories = ['All', 'Debate', 'Public Speaking', 'Poetry', 'Storytelling'];

  const filteredBattles = useMemo(() => {
    return battles.filter((b) => {
      const modeOk = modeFilter === 'All' || b.mode === modeFilter;
      const catOk = categoryFilter === 'All' || b.category === categoryFilter;
      return modeOk && catOk;
    });
  }, [battles, modeFilter, categoryFilter]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h1 className="text-3xl font-black">Battle Lobby</h1>
          <p className="text-sm text-gray-400 mt-1">
            Filter active battles by Mode and Category. Pay{' '}
            <strong className="text-cyan-400">$1.50</strong> from your wallet to enter any open battle.
          </p>
        </div>

        <button
          onClick={onOpenCreateBattle}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 text-black font-extrabold text-xs sm:text-sm shadow-lg shadow-cyan-500/20 hover:brightness-110 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Create / Submit Battle ($1.50)
        </button>
      </div>

      {/* Mode & Category Filter Bars */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#0d121d] p-4 rounded-2xl border border-white/10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-gray-400 mr-1">
            Mode:
          </span>
          {modes.map((m) => (
            <button
              key={m}
              onClick={() => setModeFilter(m)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                modeFilter === m
                  ? 'bg-cyan-400 text-black'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-gray-400 mr-1">
            Category:
          </span>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategoryFilter(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                categoryFilter === c
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              {c === 'All' ? 'All Categories' : c}
            </button>
          ))}
        </div>
      </div>

      {/* Filtered Battle Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBattles.map((b) => {
          const isJoined = joinedBattleIds.includes(b.id);
          return (
            <div
              key={b.id}
              className="p-6 rounded-2xl bg-[#0d121d] border border-white/10 hover:border-cyan-500/50 transition flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-300 text-[11px] font-bold">
                    {b.mode}
                  </span>
                  <span className="text-xs font-extrabold text-emerald-400">
                    Prize Pool: ${Number(b.prize_pool).toFixed(2)} ({b.slots})
                  </span>
                </div>

                <p className="text-[11px] uppercase font-bold tracking-wider text-amber-400">
                  {b.category} • Motion {b.code}
                </p>

                <h3 className="text-lg font-bold text-white leading-snug">"{b.title}"</h3>

                <p className="text-xs text-gray-400">
                  Host: <strong className="text-gray-200">{b.host}</strong> • Entry Fee:{' '}
                  <strong className="text-cyan-400">${Number(b.entry_fee).toFixed(2)}</strong>
                </p>
              </div>

              <div className="flex items-center gap-2.5 pt-2 border-t border-white/5">
                <button
                  onClick={() => onWatchRoom(b.id)}
                  className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-gray-200 transition cursor-pointer"
                >
                  {b.mode === 'Live War' ? 'Watch Room' : 'Listen Pitch'}
                </button>
                <button
                  onClick={() => onJoinBattle(b)}
                  className={`flex-1 py-2.5 rounded-xl font-extrabold text-xs transition cursor-pointer ${
                    isJoined
                      ? 'bg-emerald-500 text-black'
                      : 'bg-gradient-to-r from-cyan-400 to-blue-600 text-black hover:brightness-110'
                  }`}
                >
                  {isJoined ? 'Open Arena ✓' : 'Enter ($1.50)'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
