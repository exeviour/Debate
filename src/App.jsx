import React, { useState, useMemo } from 'react';
import { Wallet, CheckCircle2, User, Upload } from 'lucide-react';
import { INITIAL_BATTLES, INITIAL_VOTES_BY_BATTLE, INITIAL_PENDING_PAYOUTS, INITIAL_INQUIRIES } from './data/mockData';
import AuthPortal from './views/AuthPortal';
import Navbar from './components/Navbar';
import HomeView from './views/HomeView';
import LobbyView from './views/LobbyView';
import BattleRoom from './views/BattleRoom';
import LeaderboardView from './views/LeaderboardView';
import ProfileView from './views/ProfileView';
import AdminPortal from './views/AdminPortal';
import WalletModal from './components/WalletModal';
import CreateBattleModal from './components/CreateBattleModal';

// MAIN APPLICATION COMPONENT (WITH AUTHENTICATION PORTAL GATE)
// ============================================================================

export default function App() {
  // Authenticated User State (starts null so the user lands on the Login Portal first)
  const [currentUser, setCurrentUser] = useState(null);
  const [currentTab, setCurrentTab] = useState('home');
  const [walletBalance, setWalletBalance] = useState(24.5);
  const [walletOpen, setWalletOpen] = useState(false);
  const [createBattleOpen, setCreateBattleOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Battles, Votes, and Judge Scores State
  const [battles, setBattles] = useState(INITIAL_BATTLES);
  const [activeBattleId, setActiveBattleId] = useState('btl-12894');
  const [joinedBattleIds, setJoinedBattleIds] = useState(['btl-12894']);
  const [votesByBattle, setVotesByBattle] = useState(INITIAL_VOTES_BY_BATTLE);
  const [userVotedByBattle, setUserVotedByBattle] = useState({});

  // Lobby Filters
  const [modeFilter, setModeFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Admin Portal State
  const [pendingPayouts, setPendingPayouts] = useState(INITIAL_PENDING_PAYOUTS);
  const [inquiries, setInquiries] = useState(INITIAL_INQUIRIES);
  const [totalEntryFees] = useState(486.0);
  const [totalPaidOut, setTotalPaidOut] = useState(312.5);

  const showToast = (text, tone = 'cyan') => {
    setToast({ text, tone });
    setTimeout(() => {
      setToast((prev) => (prev?.text === text ? null : prev));
    }, 3800);
  };

  const activeBattle = useMemo(
    () => battles.find((b) => b.id === activeBattleId) || battles[0],
    [battles, activeBattleId]
  );

  // Handle Login / Create Account Success
  const handleAuthenticate = (userSession) => {
    setCurrentUser(userSession);
    setWalletBalance(24.5);
    setCurrentTab('home');
    showToast(
      `Welcome to the Arena, ${userSession.displayName} (${userSession.handle})!`,
      'emerald'
    );
  };

  // Handle Log Out back to Authentication Portal
  const handleLogout = () => {
    setCurrentUser(null);
    setWalletOpen(false);
    setCreateBattleOpen(false);
    setCurrentTab('home');
  };

  // Wallet Deposit / Withdraw Handler
  const handleWalletTransaction = ({ type, gateway, account, amount }) => {
    const numericAmount = Number(amount || 0);
    if (numericAmount <= 0) return;

    if (type === 'withdraw') {
      if (numericAmount > walletBalance) {
        showToast('Insufficient wallet balance for withdrawal.', 'rose');
        return;
      }
      setWalletBalance((prev) => Number((prev - numericAmount).toFixed(2)));
      showToast(
        `Withdrew $${numericAmount.toFixed(2)} via ${gateway.toUpperCase()} to ${account || 'linked wallet'}.`,
        'amber'
      );
    } else {
      setWalletBalance((prev) => Number((prev + numericAmount).toFixed(2)));
      showToast(
        `Deposited $${numericAmount.toFixed(2)} via ${gateway.toUpperCase()}! Ready to stake.`,
        'emerald'
      );
    }
  };

  // Join Battle ($1.50 Entry Fee Deduction + Prize Pool Increment)
  const handleJoinBattle = (battle) => {
    if (joinedBattleIds.includes(battle.id)) {
      setActiveBattleId(battle.id);
      setCurrentTab('arena');
      return;
    }

    const fee = Number(battle.entry_fee || 1.5);
    if (walletBalance < fee) {
      showToast('Wallet balance below $1.50. Please top up first.', 'rose');
      setWalletOpen(true);
      return;
    }

    setWalletBalance((prev) => Number((prev - fee).toFixed(2)));
    setJoinedBattleIds((prev) => [...prev, battle.id]);
    setBattles((prev) =>
      prev.map((b) =>
        b.id === battle.id
          ? { ...b, prize_pool: Number((Number(b.prize_pool) + fee * 0.8).toFixed(2)) }
          : b
      )
    );
    setActiveBattleId(battle.id);
    setCurrentTab('arena');
    showToast(`Staked $${fee.toFixed(2)} entry into "${battle.title}". Entered Arena!`, 'emerald');
  };

  // Create New Battle / Submit Recorded Pitch ($1.50 Entry Stake)
  const handleCreateBattle = ({ title, category, mode, pitchFileName }) => {
    const fee = 1.5;
    if (walletBalance < fee) {
      showToast('Wallet balance below $1.50. Please deposit funds first.', 'rose');
      setCreateBattleOpen(false);
      setWalletOpen(true);
      return;
    }

    const codeNum = Math.floor(310 + Math.random() * 680);
    const newId = `btl-${codeNum}`;
    const newBattle = {
      id: newId,
      code: `#${codeNum}`,
      title,
      category,
      mode,
      host: currentUser.displayName,
      entry_fee: 1.5,
      prize_pool: 6.0,
      slots: '1/4 MCs',
      status: mode === 'Live War' ? 'live' : 'open',
      payouts_disbursed: false,
      pitchFileName: pitchFileName || null,
      entries: [
        {
          id: `ent-${Date.now()}-1`,
          full_name: currentUser.displayName,
          handle: currentUser.handle,
          level: 'LVL 34',
          stance: mode === 'Live War' ? 'Proposition (A)' : 'Featured Pitch',
          institution: `${currentUser.location} • MicWars`,
          judge_score: 86.0,
          default_gateway: 'ecocash',
          recipient_account: '+263 77 123 4567'
        },
        {
          id: `ent-${Date.now()}-2`,
          full_name: 'Kinglex',
          handle: '@kinglex',
          level: 'LVL 42',
          stance: mode === 'Live War' ? 'Opposition (B)' : 'Challenger Pitch',
          institution: 'Harare Debate Society • Zimbabwe',
          judge_score: 84.5,
          default_gateway: 'ecocash',
          recipient_account: '+263 77 123 4567'
        }
      ]
    };

    setWalletBalance((prev) => Number((prev - fee).toFixed(2)));
    setBattles((prev) => [newBattle, ...prev]);
    setJoinedBattleIds((prev) => [...prev, newId]);
    setVotesByBattle((prev) => ({
      ...prev,
      [newId]: {
        [newBattle.entries[0].id]: 14,
        [newBattle.entries[1].id]: 11
      }
    }));
    setActiveBattleId(newId);
    setCreateBattleOpen(false);
    setCurrentTab('arena');
    showToast(
      `Created & entered "${title}" ($1.50 staked). Live in the Arena!`,
      'emerald'
    );
  };

  // Cast Live Audience Vote (30% Weight)
  const handleCastVote = (battleId, entryId) => {
    if (userVotedByBattle[battleId]) return;
    setUserVotedByBattle((prev) => ({ ...prev, [battleId]: entryId }));
    setVotesByBattle((prev) => {
      const current = prev[battleId] || {};
      return {
        ...prev,
        [battleId]: {
          ...current,
          [entryId]: (current[entryId] || 0) + 1
        }
      };
    });
    showToast('Audience vote locked in (30% weight updated live).', 'cyan');
  };

  // Submit Official Judge Ballot (70% Weight)
  const handleSubmitJudgeScore = ({ battle_id, entry_id, content_score, style_score, strategy_score }) => {
    const total = Number(content_score) + Number(style_score) + Number(strategy_score);
    setBattles((prev) =>
      prev.map((b) => {
        if (b.id !== battle_id) return b;
        return {
          ...b,
          entries: b.entries.map((ent) =>
            ent.id === entry_id ? { ...ent, judge_score: total } : ent
          )
        };
      })
    );
    showToast(`Certified Judge Ballot recorded: ${total}/100 (70% weight).`, 'amber');
  };

  // Admin: Settle 70/30 Scores & Split Prize Pool (60% / 25% / 15%)
  const handleSettleBattle = (battleId) => {
    const target = battles.find((b) => b.id === battleId);
    if (!target || target.payouts_disbursed) return;

    const splits = [0.6, 0.25, 0.15];
    const bVotes = votesByBattle[battleId] || {};
    const totalVotes = Object.values(bVotes).reduce((sum, n) => sum + Number(n || 0), 0);

    const ranked = [...target.entries]
      .map((ent) => {
        const voteCount = Number(bVotes[ent.id] || 0);
        const audiencePct = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0;
        const composite = Number((Number(ent.judge_score) * 0.7 + audiencePct * 0.3).toFixed(2));
        return { ...ent, composite };
      })
      .sort((a, b) => b.composite - a.composite);

    const createdPayouts = ranked.slice(0, 3).map((winner, idx) => ({
      id: `tx-${Date.now()}-${idx + 1}`,
      full_name: winner.full_name,
      rank: idx + 1,
      amount: Number((Number(target.prize_pool) * (splits[idx] || 0)).toFixed(2)),
      battle_title: target.title,
      gateway_ref: `MW-PAY-${target.code.replace('#', '')}-${idx + 1}-${String(Date.now()).slice(-4)}`,
      gateway: winner.default_gateway || 'ecocash',
      recipient_account: winner.recipient_account || '+263 77 123 4567'
    }));

    setBattles((prev) =>
      prev.map((b) =>
        b.id === battleId ? { ...b, status: 'completed', payouts_disbursed: true } : b
      )
    );
    setPendingPayouts((prev) => [...createdPayouts, ...prev]);
    showToast(`70/30 scores finalized for "${target.title}". Winner payouts queued!`, 'emerald');
  };

  // Admin: Disburse Payout
  const handleDisbursePayout = (tx, chosenGateway, chosenAccount) => {
    setPendingPayouts((prev) => prev.filter((item) => item.id !== tx.id));
    setTotalPaidOut((prev) => Number((prev + Number(tx.amount)).toFixed(2)));
    showToast(
      `Disbursed $${Number(tx.amount).toFixed(2)} to ${tx.full_name} via ${chosenGateway.toUpperCase()} (${chosenAccount}).`,
      'emerald'
    );
  };

  // ==========================================================================
  // RENDER LOGIN / CREATE ACCOUNT PORTAL WHEN NOT SIGNED IN
  // ==========================================================================
  if (!currentUser) {
    return <AuthPortal onAuthenticate={handleAuthenticate} />;
  }

  // ==========================================================================
  // RENDER AUTHENTICATED MICWARS v0.2 PLATFORM
  // ==========================================================================
  return (
    <div className="min-h-screen bg-[#07090e] text-white font-sans selection:bg-cyan-400 selection:text-black flex flex-col">
      {/* Global Top Navbar */}
      <Navbar
        currentUser={currentUser}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        walletBalance={walletBalance}
        pendingCount={pendingPayouts.length}
        onOpenWallet={() => setWalletOpen(true)}
        onLogout={handleLogout}
      />

      {/* Toast Notification Banner */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 max-w-md">
          <div
            className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border shadow-2xl backdrop-blur-md text-xs sm:text-sm font-semibold ${
              toast.tone === 'emerald'
                ? 'bg-emerald-950/95 border-emerald-500/50 text-emerald-200'
                : toast.tone === 'amber'
                ? 'bg-amber-950/95 border-amber-500/50 text-amber-200'
                : toast.tone === 'rose'
                ? 'bg-rose-950/95 border-rose-500/50 text-rose-200'
                : 'bg-cyan-950/95 border-cyan-500/50 text-cyan-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{toast.text}</span>
          </div>
        </div>
      )}

      {/* Main Page Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {currentTab === 'home' && (
          <HomeView
            currentUser={currentUser}
            battles={battles}
            onNavigate={setCurrentTab}
            onJoinBattle={handleJoinBattle}
            onWatchArena={(battleId) => {
              setActiveBattleId(battleId);
              setCurrentTab('arena');
            }}
          />
        )}

        {currentTab === 'lobby' && (
          <LobbyView
            battles={battles}
            joinedBattleIds={joinedBattleIds}
            modeFilter={modeFilter}
            setModeFilter={setModeFilter}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            onJoinBattle={handleJoinBattle}
            onOpenCreateBattle={() => setCreateBattleOpen(true)}
            onWatchRoom={(battleId) => {
              setActiveBattleId(battleId);
              setCurrentTab('arena');
            }}
          />
        )}

        {currentTab === 'arena' && (
          <BattleRoom
            currentUser={currentUser}
            battles={battles}
            battle={activeBattle}
            onSelectBattle={setActiveBattleId}
            voteCounts={votesByBattle[activeBattle.id] || {}}
            votedEntryId={userVotedByBattle[activeBattle.id] || null}
            onVote={handleCastVote}
            onSubmitJudgeScore={handleSubmitJudgeScore}
          />
        )}

        {currentTab === 'leaderboard' && (
          <LeaderboardView
            currentUser={currentUser}
            onEnterBattle={() => setCurrentTab('lobby')}
          />
        )}

        {currentTab === 'profile' && (
          <ProfileView
            currentUser={currentUser}
            walletBalance={walletBalance}
            onOpenWallet={() => setWalletOpen(true)}
            onGoLobby={() => setCurrentTab('lobby')}
            onLogout={handleLogout}
          />
        )}

        {currentTab === 'admin' && (
          <AdminPortal
            battles={battles}
            pendingPayouts={pendingPayouts}
            inquiries={inquiries}
            setInquiries={setInquiries}
            totalEntryFees={totalEntryFees}
            totalPaidOut={totalPaidOut}
            onSettleBattle={handleSettleBattle}
            onDisbursePayout={handleDisbursePayout}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/50 py-6 px-4 sm:px-6 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <span className="font-black text-white tracking-wider">MicWars</span>
            <span>•</span>
            <span>
              The ultimate speech, debate, poetry, and storytelling battle arena. Powered by EcoCash, InnBucks, Stripe, and PayPal.
            </span>
          </div>
          <p className="text-gray-500">© 2026 MicWars Inc. All rights reserved.</p>
        </div>
      </footer>

      {/* Secure Deposit & Withdraw Modal */}
      <WalletModal
        open={walletOpen}
        walletBalance={walletBalance}
        onClose={() => setWalletOpen(false)}
        onSubmitTransaction={handleWalletTransaction}
      />

      {/* Create Battle / Recorded Pitch Upload Modal */}
      <CreateBattleModal
        open={createBattleOpen}
        onClose={() => setCreateBattleOpen(false)}
        onCreateBattle={handleCreateBattle}
      />
    </div>
  );
}

// ============================================================================
