import React, { useState } from 'react';
import { ShieldCheck, Check } from 'lucide-react';

// 7. ADMIN PORTAL VIEW (70/30 SETTLEMENT, PAYOUTS, INQUIRIES INBOX)
// ============================================================================

export default function AdminPortal({
  battles,
  pendingPayouts,
  inquiries,
  setInquiries,
  totalEntryFees,
  totalPaidOut,
  onSettleBattle,
  onDisbursePayout
}) {
  const [gatewayByTx, setGatewayByTx] = useState({});
  const [accountByTx, setAccountByTx] = useState({});

  const handleResolveInquiry = (id) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status: 'resolved' } : inq))
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs uppercase font-extrabold tracking-wider px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <ShieldCheck className="w-3.5 h-3.5" /> MicWars Command • Admin Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-black mt-2">
            Prize Pool Payouts &amp; Operations
          </h1>
        </div>
        <div className="text-xs bg-[#0d121d] border border-white/10 px-4 py-2 rounded-xl text-gray-300">
          Inquiry Inbox: <strong className="text-cyan-400">micwars@gmail.com</strong>
        </div>
      </div>

      {/* KPI Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#0d121d] border border-white/10 rounded-2xl p-5">
          <p className="text-xs uppercase font-bold text-gray-400">Completed Entry Fees</p>
          <p className="text-3xl font-black text-emerald-400 mt-1">
            ${Number(totalEntryFees).toFixed(2)}
          </p>
          <p className="text-xs text-gray-500 mt-1">80% funds live prize pools</p>
        </div>
        <div className="bg-[#0d121d] border border-white/10 rounded-2xl p-5">
          <p className="text-xs uppercase font-bold text-gray-400">Total Prizes Disbursed</p>
          <p className="text-3xl font-black text-amber-400 mt-1">
            ${Number(totalPaidOut).toFixed(2)}
          </p>
          <p className="text-xs text-gray-500 mt-1">EcoCash, InnBucks, Stripe &amp; PayPal</p>
        </div>
        <div className="bg-[#0d121d] border border-white/10 rounded-2xl p-5">
          <p className="text-xs uppercase font-bold text-gray-400">Pending Payout Queue</p>
          <p className="text-3xl font-black text-cyan-400 mt-1">{pendingPayouts.length}</p>
          <p className="text-xs text-gray-500 mt-1">60% / 25% / 15% bracket splits</p>
        </div>
      </div>

      {/* Battles — Score Finalization & Prize Pool Split */}
      <section className="bg-[#0d121d] border border-white/10 rounded-2xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-black">
              Battles — Score Finalization &amp; Prize Pool Split
            </h2>
            <p className="text-xs text-gray-400">
              Computes final 70% judge + 30% audience scores and queues 60% / 25% / 15% payouts.
            </p>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-black/50 border border-white/10 text-amber-300">
            Split: 60% / 25% / 15%
          </span>
        </div>

        <div className="space-y-2.5">
          {battles.map((battle) => (
            <div
              key={battle.id}
              className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-black/60 border border-white/10"
            >
              <div>
                <p className="font-bold text-sm text-white">{battle.title}</p>
                <p className="text-xs text-gray-400">
                  {battle.category} • Pool:{' '}
                  <strong className="text-emerald-400">
                    ${Number(battle.prize_pool).toFixed(2)}
                  </strong>{' '}
                  • Status: <span className="capitalize">{battle.status}</span>
                </p>
              </div>
              <button
                disabled={battle.payouts_disbursed}
                onClick={() => onSettleBattle(battle.id)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition ${
                  battle.payouts_disbursed
                    ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-400 to-blue-600 text-black hover:brightness-110 cursor-pointer'
                }`}
              >
                {battle.payouts_disbursed ? 'Settled ✓' : 'Finalize 70/30 & Queue Prizes'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Pending Prize Payouts */}
      <section className="bg-[#0d121d] border border-white/10 rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-black">Pending Prize Payouts</h2>
        {pendingPayouts.length === 0 ? (
          <p className="text-sm text-gray-400">
            No pending prize payouts right now. Finalize a battle above to queue winner payouts.
          </p>
        ) : (
          <div className="space-y-3">
            {pendingPayouts.map((tx) => {
              const chosenGw = gatewayByTx[tx.id] || tx.gateway || 'ecocash';
              const chosenAcc =
                accountByTx[tx.id] !== undefined ? accountByTx[tx.id] : tx.recipient_account;

              return (
                <div
                  key={tx.id}
                  className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-black/60 border border-white/10"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">{tx.full_name}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400/20 text-amber-300">
                        Rank #{tx.rank}
                      </span>
                      <span className="text-emerald-400 font-black">
                        ${Number(tx.amount).toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {tx.battle_title} • Ref: {tx.gateway_ref}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <select
                      value={chosenGw}
                      onChange={(e) => setGatewayByTx({ ...gatewayByTx, [tx.id]: e.target.value })}
                      className="bg-[#0d121d] border border-white/15 rounded-xl px-3 py-2 text-xs font-bold text-white"
                    >
                      <option value="ecocash">EcoCash</option>
                      <option value="innbucks">InnBucks</option>
                      <option value="paypal">PayPal</option>
                      <option value="stripe">Stripe</option>
                    </select>

                    <input
                      type="text"
                      value={chosenAcc}
                      onChange={(e) => setAccountByTx({ ...accountByTx, [tx.id]: e.target.value })}
                      placeholder="Phone or payout account"
                      className="bg-[#0d121d] border border-white/15 rounded-xl px-3 py-2 text-xs text-white w-44"
                    />

                    <button
                      onClick={() => onDisbursePayout(tx, chosenGw, chosenAcc)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-extrabold cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" /> Mark Disbursed
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Student & Institution Inquiries (micwars@gmail.com) */}
      <section className="bg-[#0d121d] border border-white/10 rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-black">
          Student &amp; Institution Inquiries (micwars@gmail.com)
        </h2>
        <div className="space-y-3">
          {inquiries.map((inq) => (
            <div
              key={inq.id}
              className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-1.5"
            >
              <div className="flex flex-wrap justify-between gap-2 text-xs">
                <span className="font-bold text-white">
                  {inq.full_name} ({inq.email}) •{' '}
                  <span className="text-cyan-400">{inq.institution}</span>
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                      inq.status === 'resolved'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-amber-500/20 text-amber-300'
                    }`}
                  >
                    {inq.status}
                  </span>
                  <span className="text-gray-500">{inq.created_at}</span>
                </div>
              </div>
              <p className="font-bold text-sm text-cyan-300">{inq.subject}</p>
              <p className="text-sm text-gray-300">{inq.message}</p>
              {inq.status !== 'resolved' && (
                <div className="pt-1">
                  <button
                    onClick={() => handleResolveInquiry(inq.id)}
                    className="px-3 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold hover:bg-emerald-500/25 cursor-pointer"
                  >
                    Mark Resolved
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ============================================================================
