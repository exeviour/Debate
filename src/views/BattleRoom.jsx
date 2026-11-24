import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Video, VideoOff, Clock, Radio, MessageSquare } from 'lucide-react';
import { INITIAL_CHAT_MESSAGES } from '../data/mockData';

// 4. ARENA (BATTLEROOM) VIEW (07:00 TIMER, WEBCAM, 70/30 SCORING, LIVE CHAT)
// ============================================================================

export default function BattleRoom({
  currentUser,
  battles,
  battle,
  onSelectBattle,
  voteCounts,
  votedEntryId,
  onVote,
  onSubmitJudgeScore
}) {
  const [secondsElapsed, setSecondsElapsed] = useState(74);
  const [isRunning, setIsRunning] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [cameraBanner, setCameraBanner] = useState('');

  const [selectedEntryForJudge, setSelectedEntryForJudge] = useState(battle.entries[0]?.id || '');
  const [ballot, setBallot] = useState({ content: 36, style: 34, strategy: 18 });

  const [chatMessages, setChatMessages] = useState(INITIAL_CHAT_MESSAGES);
  const [chatInput, setChatInput] = useState('');

  const videoRef = useRef(null);

  useEffect(() => {
    setSelectedEntryForJudge(battle.entries[0]?.id || '');
  }, [battle]);

  // 420-second (07:00) debate speech timer
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setSecondsElapsed((prev) => {
        if (prev >= 420) {
          setIsRunning(false);
          return 420;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    const videoEl = videoRef.current;
    return () => {
      const stream = videoEl?.srcObject;
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const toggleCamera = async () => {
    setCameraBanner('');
    if (cameraOn) {
      const stream = videoRef.current?.srcObject;
      stream?.getTracks().forEach((track) => track.stop());
      if (videoRef.current) videoRef.current.srcObject = null;
      setCameraOn(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
      setCameraOn(true);
    } catch (_err) {
      setCameraBanner('Webcam permission blocked in sandbox frame — live stage feed simulated.');
      setCameraOn(true);
    }
  };

  const formatTime = (secs) => {
    const m = String(Math.floor(secs / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const isProtectedTime = secondsElapsed < 60 || secondsElapsed > 360;
  const totalVotes = Object.values(voteCounts).reduce((sum, n) => sum + Number(n || 0), 0);

  const clampedContent = Math.max(0, Math.min(40, Number(ballot.content) || 0));
  const clampedStyle = Math.max(0, Math.min(40, Number(ballot.style) || 0));
  const clampedStrategy = Math.max(0, Math.min(20, Number(ballot.strategy) || 0));
  const ballotTotal = clampedContent + clampedStyle + clampedStrategy;

  const handleBallotSubmit = (e) => {
    e.preventDefault();
    if (!selectedEntryForJudge) return;
    onSubmitJudgeScore({
      battle_id: battle.id,
      entry_id: selectedEntryForJudge,
      content_score: clampedContent,
      style_score: clampedStyle,
      strategy_score: clampedStrategy
    });
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}`,
        user: currentUser.displayName,
        role: 'competitor',
        text: chatInput.trim()
      }
    ]);
    setChatInput('');
  };

  const propSpeaker = battle.entries[0];
  const oppSpeaker = battle.entries[1];

  return (
    <div className="space-y-6">
      {/* Arena Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs uppercase font-extrabold tracking-wider px-2.5 py-1 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30">
              <Radio className="w-3.5 h-3.5" /> Live Battle {battle.code}
            </span>
            <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
              {battle.category} • {battle.mode}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
            Motion: "{battle.title}"
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <select
            aria-label="Switch Arena Matchup"
            value={battle.id}
            onChange={(e) => onSelectBattle(e.target.value)}
            className="bg-[#0d121d] border border-white/15 rounded-xl px-3 py-2.5 text-xs font-semibold text-gray-200"
          >
            {battles.map((b) => (
              <option key={b.id} value={b.id}>
                {b.code}: {b.category} ({b.entries[0]?.full_name} vs {b.entries[1]?.full_name})
              </option>
            ))}
          </select>

          <div className="bg-[#0d121d] border border-emerald-500/30 px-4 py-2 rounded-xl text-right">
            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
              Live Prize Pool
            </p>
            <p className="text-xl font-black text-emerald-400">
              ${Number(battle.prize_pool).toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Main 3-Column Arena Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          {/* Video Stage Frame */}
          <div className="relative aspect-video bg-[#0b101b] rounded-2xl border border-cyan-500/25 overflow-hidden flex items-center justify-center shadow-2xl">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className={`w-full h-full object-cover ${cameraOn ? 'block' : 'hidden'}`}
            />

            {!cameraOn && (
              <div className="text-center px-6 space-y-2">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400">
                  <Video className="w-7 h-7" />
                </div>
                <p className="text-lg font-extrabold text-white">Stage Camera Standby</p>
                <p className="text-xs sm:text-sm text-gray-400">
                  Speaking Now:{' '}
                  <span className="text-cyan-400 font-bold">{propSpeaker?.full_name}</span> •{' '}
                  {propSpeaker?.institution}
                </p>
              </div>
            )}

            <div className="absolute top-4 left-4 bg-black/85 border border-white/15 px-3 py-1.5 rounded-xl flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  isRunning ? 'bg-rose-500 animate-ping' : 'bg-amber-400'
                }`}
              />
              <span className="text-xs font-extrabold uppercase tracking-wider">
                {isRunning ? 'Speaking Now' : 'Stage Ready'}
              </span>
            </div>

            <div className="absolute top-4 right-4 bg-black/90 border border-cyan-500/30 px-4 py-2.5 rounded-xl text-right shadow-lg">
              <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold flex items-center justify-end gap-1">
                <Clock className="w-3 h-3 text-amber-400" /> Speaking Timer
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-black text-amber-400">
                {formatTime(secondsElapsed)} <span className="text-xs text-gray-500">/ 07:00</span>
              </div>
              <div
                className={`mt-1 inline-block px-2 py-0.5 rounded text-[11px] font-extrabold ${
                  isProtectedTime
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}
              >
                {isProtectedTime ? 'PROTECTED TIME (NO POIs)' : 'OPEN FOR POIs'}
              </div>
            </div>
          </div>

          {cameraBanner && (
            <p className="text-xs text-amber-300 bg-amber-500/10 border border-amber-500/30 px-3.5 py-2 rounded-xl">
              {cameraBanner}
            </p>
          )}

          {/* Stage Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0d121d] p-4 rounded-2xl border border-white/10">
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={toggleCamera}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer ${
                  cameraOn
                    ? 'bg-rose-600 hover:bg-rose-500 text-white'
                    : 'bg-gradient-to-r from-cyan-400 to-blue-600 text-black font-extrabold'
                }`}
              >
                {cameraOn ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                {cameraOn ? 'Stop Camera' : 'Go Live (Camera)'}
              </button>

              <button
                onClick={() => setIsRunning((prev) => !prev)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs sm:text-sm transition cursor-pointer"
              >
                {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isRunning ? 'Pause Timer' : 'Start Speech Timer'}
              </button>

              <button
                onClick={() => {
                  setIsRunning(false);
                  setSecondsElapsed(0);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 font-bold text-xs sm:text-sm transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>

            <span className="text-xs text-gray-400">
              POI Window: <strong className="text-emerald-400">01:00 – 06:00</strong>
            </span>
          </div>

          {/* 1v1 Proposition vs Opposition Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[propSpeaker, oppSpeaker].filter(Boolean).map((sp, index) => {
              const vCount = Number(voteCounts[sp.id] || 0);
              const audPct = totalVotes > 0 ? Math.round((vCount / totalVotes) * 100) : 0;
              const composite = Number((Number(sp.judge_score) * 0.7 + audPct * 0.3).toFixed(1));
              return (
                <div
                  key={sp.id}
                  className={`p-5 rounded-2xl border space-y-2 ${
                    index === 0
                      ? 'bg-cyan-950/15 border-cyan-500/35'
                      : 'bg-blue-950/15 border-blue-500/35'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold uppercase tracking-wider text-cyan-400">
                      {sp.stance}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white/10 font-bold text-amber-300">
                      {sp.level}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-white">{sp.full_name}</h3>
                  <p className="text-xs text-gray-400">{sp.institution}</p>
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-gray-300">
                      Certified Judge: <strong className="text-amber-400">{sp.judge_score}/100</strong>
                    </span>
                    <span className="text-emerald-400 font-extrabold">
                      70/30 Score: {composite}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Live Audience Chat Feed */}
          <div className="bg-[#0d121d] border border-white/10 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center gap-2 text-white">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                Live Audience Chat
              </h3>
              <span className="text-xs text-emerald-400 font-semibold">1.8k Active</span>
            </div>

            <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
              {chatMessages.map((m) => (
                <div
                  key={m.id}
                  className="text-xs bg-black/50 border border-white/5 px-3 py-2 rounded-xl"
                >
                  <span
                    className={`font-extrabold mr-2 ${
                      m.role === 'judge' ? 'text-amber-400' : 'text-cyan-400'
                    }`}
                  >
                    {m.user}:
                  </span>
                  <span className="text-gray-300">{m.text}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendChat} className="flex gap-2 pt-1">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Drop live crowd commentary..."
                className="flex-1 bg-black/70 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-cyan-400 text-black font-extrabold text-xs hover:brightness-110 transition cursor-pointer"
              >
                Send
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Audience Voting (30%) & Official Judge Ballot (70%) */}
        <div className="space-y-6">
          <div className="bg-[#0d121d] p-5 rounded-2xl border border-white/10 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-black text-lg text-white">Audience Vote</h2>
                <p className="text-xs text-gray-400">{totalVotes} total crowd taps</p>
              </div>
              <span className="text-xs font-extrabold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 px-2.5 py-1 rounded-full">
                30% Weight
              </span>
            </div>

            <div className="space-y-3">
              {battle.entries.map((entry) => {
                const count = Number(voteCounts[entry.id] || 0);
                const pct = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
                const isSelected = votedEntryId === entry.id;

                return (
                  <div
                    key={entry.id}
                    className="p-3.5 rounded-xl bg-black/60 border border-white/10 space-y-2.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="font-bold text-sm text-white">{entry.full_name}</p>
                        <p className="text-xs text-gray-400">
                          {entry.stance} • Certified: {entry.judge_score}/100
                        </p>
                      </div>
                      <button
                        disabled={Boolean(votedEntryId)}
                        onClick={() => onVote(battle.id, entry.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition ${
                          isSelected
                            ? 'bg-emerald-500 text-black'
                            : votedEntryId
                            ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-cyan-400 to-blue-600 text-black hover:brightness-110 cursor-pointer'
                        }`}
                      >
                        {isSelected ? 'Voted ✓' : 'Tap Vote'}
                      </button>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-gray-400">{count} votes</span>
                        <span className="font-extrabold text-cyan-400">{pct}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <form
            onSubmit={handleBallotSubmit}
            className="bg-[#0d121d] p-5 rounded-2xl border border-amber-500/35 space-y-4"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-black text-lg text-amber-400">Official Judge Ballot</h2>
                <p className="text-xs text-gray-400">Expert Rubric (Out of 100 Points)</p>
              </div>
              <span className="text-xs font-extrabold bg-amber-500/15 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-full">
                70% Weight
              </span>
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1.5 font-semibold">Speaker</label>
              <select
                value={selectedEntryForJudge}
                onChange={(e) => setSelectedEntryForJudge(e.target.value)}
                className="w-full bg-black/70 border border-white/15 rounded-xl p-2.5 text-sm text-white"
              >
                {battle.entries.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.full_name} ({e.stance})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-3 gap-2.5 text-center">
              <div className="bg-black/60 border border-white/10 rounded-xl p-2.5">
                <label className="block text-[11px] text-gray-400 font-semibold">
                  Content (/40)
                </label>
                <input
                  type="number"
                  min="0"
                  max="40"
                  value={ballot.content}
                  onChange={(e) => setBallot({ ...ballot, content: e.target.value })}
                  className="w-full mt-1.5 bg-[#0d121d] border border-white/15 rounded-lg p-1.5 text-center font-black text-white"
                />
              </div>

              <div className="bg-black/60 border border-white/10 rounded-xl p-2.5">
                <label className="block text-[11px] text-gray-400 font-semibold">
                  Style (/40)
                </label>
                <input
                  type="number"
                  min="0"
                  max="40"
                  value={ballot.style}
                  onChange={(e) => setBallot({ ...ballot, style: e.target.value })}
                  className="w-full mt-1.5 bg-[#0d121d] border border-white/15 rounded-lg p-1.5 text-center font-black text-white"
                />
              </div>

              <div className="bg-black/60 border border-white/10 rounded-xl p-2.5">
                <label className="block text-[11px] text-gray-400 font-semibold">
                  Strategy (/20)
                </label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={ballot.strategy}
                  onChange={(e) => setBallot({ ...ballot, strategy: e.target.value })}
                  className="w-full mt-1.5 bg-[#0d121d] border border-white/15 rounded-lg p-1.5 text-center font-black text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black text-sm transition cursor-pointer shadow-lg shadow-amber-500/20"
            >
              Submit Judge Score ({ballotTotal}/100)
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
