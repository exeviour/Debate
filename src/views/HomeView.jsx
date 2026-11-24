import React from 'react';
import { Mic, Play, Flame } from 'lucide-react';

// 2. HOME VIEW (HERO, STATS, LIVE BATTLES, 4-STEP HOW IT WORKS)
// ============================================================================

export default function HomeView({ currentUser, battles, onNavigate, onJoinBattle, onWatchArena }) {
  const featuredBattles = battles.slice(0, 3);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative rounded-3xl border border-cyan-500/20 bg-gradient-to-b from-cyan-950/20 via-[#0b0f19] to-[#07090e] p-8 sm:p-14 text-center overflow-hidden">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-cyan-500/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-extrabold uppercase tracking-widest">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            Signed in as {currentUser.handle} • Season 4 Active • $1.50 Entry Fee
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05]">
            Your Mic. Your War.{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent">
              Your Money.
            </span>
          </h1>

          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            The ultimate battle arena for public speakers, debaters, poets, and storytellers. Compete 1v1 live or via recorded pitch, get judged by certified experts (70%) and the live audience (30%), and cash out your winnings instantly.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={() => onWatchArena('btl-12894')}
              className="px-7 py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 text-black font-extrabold text-sm sm:text-base shadow-xl shadow-cyan-500/25 hover:scale-[1.02] transition flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-5 h-5 fill-black" /> Watch Live Arena
            </button>

            <button
              onClick={() => onNavigate('lobby')}
              className="px-7 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold text-sm sm:text-base transition cursor-pointer"
            >
              Browse Open Battles
            </button>
          </div>

          {/* Platform Metrics Strip */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10 max-w-xl mx-auto">
            <div>
              <p className="text-2xl sm:text-3xl font-black text-white">50K+</p>
              <p className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
                Battles Hosted
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-cyan-400">200K+</p>
              <p className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
                Active MCs
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-emerald-400">$45K+</p>
              <p className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
                Prizes Paid
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Battles Right Now */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-cyan-400">
              On Air &amp; Open Brackets
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mt-0.5">Live Battles Right Now</h2>
          </div>
          <button
            onClick={() => onNavigate('lobby')}
            className="text-sm font-bold text-cyan-400 hover:text-cyan-300 transition cursor-pointer"
          >
            View All Lobby Battles →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredBattles.map((battle) => (
            <div
              key={battle.id}
              className="p-6 rounded-2xl bg-[#0d121d] border border-white/10 hover:border-cyan-500/40 transition flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase bg-rose-500/15 text-rose-300 border border-rose-500/30">
                    {battle.mode}
                  </span>
                  <span className="text-xs font-extrabold text-emerald-400">
                    Prize Pool: ${Number(battle.prize_pool).toFixed(2)}
                  </span>
                </div>

                <p className="text-[11px] uppercase tracking-wider font-bold text-cyan-400">
                  Category: {battle.category}
                </p>
                <h3 className="text-lg font-bold text-white leading-snug">"{battle.title}"</h3>

                <div className="p-3 rounded-xl bg-black/50 border border-white/5 flex items-center justify-between text-xs">
                  <span className="font-bold text-cyan-300">{battle.entries[0]?.full_name}</span>
                  <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-black text-amber-400">
                    VS
                  </span>
                  <span className="font-bold text-blue-300">{battle.entries[1]?.full_name}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => onWatchArena(battle.id)}
                  className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white transition cursor-pointer"
                >
                  Watch &amp; Vote Live
                </button>
                <button
                  onClick={() => onJoinBattle(battle)}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 text-black font-extrabold text-xs hover:brightness-110 transition cursor-pointer"
                >
                  Enter ($1.50)
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rules & Mechanics: 4-Step How a MicWar Battle Works */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase font-bold tracking-widest text-amber-400">
            Rules &amp; Mechanics
          </span>
          <h2 className="text-2xl sm:text-3xl font-black mt-1">How a MicWar Battle Works</h2>
          <p className="text-sm text-gray-400 mt-1">
            Fair, transparent, and structured for real talent to shine.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              step: '1',
              title: 'Pay $1.50 Entry',
              desc: 'Low barrier entry fee via EcoCash, InnBucks, Stripe, or PayPal.'
            },
            {
              step: '2',
              title: 'Live or Recorded',
              desc: 'Battle head-to-head live in timed rounds or upload a 2-minute video pitch.'
            },
            {
              step: '3',
              title: '70/30 Judging',
              desc: 'Certified expert judges account for 70% of the score, and the audience has 30% weight.'
            },
            {
              step: '4',
              title: 'Win Cash Prizes',
              desc: 'Winners take the cash prize pool directly into their MicWars wallet for withdrawal.'
            }
          ].map((item) => (
            <div
              key={item.step}
              className="p-6 rounded-2xl bg-[#0d121d] border border-white/10 space-y-3 hover:border-cyan-500/30 transition"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 font-black flex items-center justify-center">
                {item.step}
              </div>
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ============================================================================
