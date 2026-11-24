import React, { useState } from 'react';
import { Wallet, X, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

// 8. SECURE WALLET MODAL (ECOCASH, INNBUCKS, STRIPE, PAYPAL DEPOSIT & WITHDRAW)
// ============================================================================

export default function WalletModal({ open, walletBalance, onClose, onSubmitTransaction }) {
  const [txType, setTxType] = useState('deposit');
  const [gateway, setGateway] = useState('ecocash');
  const [account, setAccount] = useState('+263 771234567');
  const [amount, setAmount] = useState(5.0);

  if (!open) return null;

  const gateways = [
    { id: 'ecocash', label: 'EcoCash (Zim)' },
    { id: 'innbucks', label: 'InnBucks' },
    { id: 'stripe', label: 'Stripe (Card)' },
    { id: 'paypal', label: 'PayPal' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitTransaction({
      type: txType,
      gateway,
      account,
      amount: Number(amount)
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#0d121d] border border-cyan-500/30 rounded-3xl p-6 w-full max-w-md space-y-5 shadow-2xl"
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-black text-white">MicWars Secure Wallet</h2>
            <p className="text-xs text-gray-400">
              Deposit &amp; Withdraw Funds • EcoCash, InnBucks, Stripe, PayPal
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/30 flex items-center justify-between">
          <span className="text-xs uppercase font-bold text-gray-400">Available Balance</span>
          <span className="text-2xl font-black text-emerald-400">
            ${Number(walletBalance).toFixed(2)}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 bg-black/60 p-1 rounded-xl border border-white/10">
          <button
            type="button"
            onClick={() => setTxType('deposit')}
            className={`py-2 rounded-lg text-xs font-extrabold flex items-center justify-center gap-1.5 transition cursor-pointer ${
              txType === 'deposit' ? 'bg-cyan-400 text-black' : 'text-gray-400 hover:text-white'
            }`}
          >
            <ArrowDownLeft className="w-3.5 h-3.5" /> Deposit
          </button>
          <button
            type="button"
            onClick={() => setTxType('withdraw')}
            className={`py-2 rounded-lg text-xs font-extrabold flex items-center justify-center gap-1.5 transition cursor-pointer ${
              txType === 'withdraw' ? 'bg-amber-400 text-black' : 'text-gray-400 hover:text-white'
            }`}
          >
            <ArrowUpRight className="w-3.5 h-3.5" /> Withdraw
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {gateways.map((gw) => (
            <button
              key={gw.id}
              type="button"
              onClick={() => setGateway(gw.id)}
              className={`p-2.5 rounded-xl border text-xs font-bold text-left transition cursor-pointer ${
                gateway === gw.id
                  ? 'bg-cyan-500/15 border-cyan-400 text-cyan-300'
                  : 'bg-black/50 border-white/10 text-gray-300 hover:border-white/25'
              }`}
            >
              {gw.label}
            </button>
          ))}
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1.5 font-semibold">
            {gateway === 'ecocash' || gateway === 'innbucks'
              ? `${gateway === 'ecocash' ? 'EcoCash' : 'InnBucks'} Phone Number`
              : 'Account Email / Card Reference'}
          </label>
          <input
            type="text"
            required
            placeholder="+263 771234567"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            className="w-full bg-black/70 border border-white/15 rounded-xl p-3 text-sm text-white"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1.5 font-semibold">Amount ($ USD)</label>
          <input
            type="number"
            step="0.5"
            min="1.5"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-black/70 border border-white/15 rounded-xl p-3 text-sm font-bold text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 text-black font-black text-sm shadow-lg shadow-cyan-500/25 hover:brightness-110 transition cursor-pointer"
        >
          {txType === 'deposit' ? 'Confirm & Deposit Funds' : 'Request Instant Withdrawal'}
        </button>
      </form>
    </div>
  );
}

// ============================================================================
