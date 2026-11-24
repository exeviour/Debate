import React, { useState } from 'react';
import { Mic, Play, ArrowRight, Lock, Mail, User, GraduationCap, Headphones, Sparkles, KeyRound, AlertCircle } from 'lucide-react';

// 0. MICWARS SECURE AUTHENTICATION v2.4 PORTAL (LOGIN & CREATE ACCOUNT)
// ============================================================================

export default function AuthPortal({ onAuthenticate }) {
  const [authTab, setAuthTab] = useState('login'); // 'login' | 'register'
  const [errorMsg, setErrorMsg] = useState('');
  const [recoveryNotice, setRecoveryNotice] = useState('');

  // Log In Form State ("Welcome Back, MC")
  const [loginIdentifier, setLoginIdentifier] = useState('@kinglex');
  const [loginPassword, setLoginPassword] = useState('••••••••••••');
  const [rememberDevice, setRememberDevice] = useState(true);

  // Create Account Form State ("Join the MicWars")
  const [regHandle, setRegHandle] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [classification, setClassification] = useState('Student MC');
  const [agreedTerms, setAgreedTerms] = useState(true);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!loginIdentifier.trim() || !loginPassword.trim()) {
      setErrorMsg('Please enter your Email or MC Handle and Password.');
      return;
    }

    const raw = loginIdentifier.trim();
    const cleanHandle = raw.startsWith('@')
      ? raw
      : `@${raw.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '')}`;
    const displayName =
      raw.toLowerCase().includes('kinglex')
        ? 'Kinglex'
        : raw.toLowerCase().includes('exeviour')
        ? 'Exeviour'
        : cleanHandle.replace('@', '');

    onAuthenticate({
      displayName,
      handle: cleanHandle,
      email: raw.includes('@') && !raw.startsWith('@') ? raw : `${cleanHandle.slice(1)}@micwars.com`,
      classification: raw.toLowerCase().includes('exeviour')
        ? 'Veteran Orator • Admin & Judge'
        : 'Student MC • Season 4 Competitor',
      location: 'Harare, Zimbabwe',
      memberSince: 'Jan 2026',
      rememberDevice
    });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!regHandle.trim() || !regEmail.trim()) {
      setErrorMsg('Please enter both an MC Handle and a valid Email Address.');
      return;
    }
    if (regPassword.length < 8) {
      setErrorMsg('Password must be at least 8 characters long.');
      return;
    }
    if (!agreedTerms) {
      setErrorMsg('You must agree to the MicWars Terms and Fair Play Code.');
      return;
    }

    const formattedHandle = regHandle.trim().startsWith('@')
      ? regHandle.trim()
      : `@${regHandle.trim().replace(/\s+/g, '_')}`;
    const displayName = formattedHandle.replace('@', '');

    onAuthenticate({
      displayName,
      handle: formattedHandle,
      email: regEmail.trim(),
      classification,
      location: 'Harare, Zimbabwe',
      memberSince: 'Nov 2026',
      rememberDevice: true
    });
  };

  const handleQuickDemoSignIn = (preset) => {
    if (preset === 'admin') {
      onAuthenticate({
        displayName: 'Exeviour',
        handle: '@exeviour',
        email: 'exeviour@micwars.com',
        classification: 'Veteran Orator • Admin & Certified Judge',
        location: 'Harare, Zimbabwe',
        memberSince: 'Jan 2026',
        rememberDevice: true
      });
    } else if (preset === 'kinglex') {
      onAuthenticate({
        displayName: 'Kinglex',
        handle: '@kinglex',
        email: 'kinglex@micwars.com',
        classification: 'Student MC • Season 4 #1 Ranked',
        location: 'Harare, Zimbabwe',
        memberSince: 'Jan 2026',
        rememberDevice: true
      });
    } else {
      onAuthenticate({
        displayName: `${preset}_MC`,
        handle: `@${preset.toLowerCase()}_orator`,
        email: `${preset.toLowerCase()}@micwars.com`,
        classification: 'Creator • OAuth Verified',
        location: 'Harare, Zimbabwe',
        memberSince: 'Nov 2026',
        rememberDevice: true
      });
    }
  };

  const classifications = [
    { id: 'Student MC', icon: GraduationCap, sub: 'Campus & Open Leagues' },
    { id: 'Battle Fan', icon: Headphones, sub: 'Live Crowd Voting (30%)' },
    { id: 'Creator', icon: Sparkles, sub: 'Recorded & Live Host' }
  ];

  return (
    <div className="min-h-screen bg-[#07090e] text-white flex flex-col justify-between relative overflow-hidden selection:bg-cyan-400 selection:text-black">
      {/* Ambient Neon Cyber Background Glows */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[640px] h-[320px] bg-cyan-500/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[420px] h-[260px] bg-blue-600/15 blur-3xl pointer-events-none" />

      {/* Top Auth Header Bar */}
      <header className="relative z-10 max-w-6xl w-full mx-auto px-4 sm:px-6 pt-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <Mic className="w-6 h-6 text-black" />
          </div>
          <div>
            <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent block leading-none">
              MicWars
            </span>
            <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
              Battle Your Bars. Win The Mic.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-extrabold tracking-wide">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          Season 4 Live
        </div>
      </header>

      {/* Center Authentication Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg bg-[#0b101b]/95 border border-cyan-500/25 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl space-y-6">
          {/* Log In / Create Account Tab Switcher */}
          <div className="grid grid-cols-2 gap-1.5 p-1.5 rounded-2xl bg-black/70 border border-white/10">
            <button
              type="button"
              onClick={() => {
                setAuthTab('login');
                setErrorMsg('');
                setRecoveryNotice('');
              }}
              className={`py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition cursor-pointer ${
                authTab === 'login'
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-600 text-black shadow-lg shadow-cyan-500/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthTab('register');
                setErrorMsg('');
                setRecoveryNotice('');
              }}
              className={`py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition cursor-pointer ${
                authTab === 'register'
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-600 text-black shadow-lg shadow-cyan-500/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Feedback Banners */}
          {errorMsg && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-200 text-xs font-semibold">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {recoveryNotice && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-cyan-500/15 border border-cyan-500/40 text-cyan-200 text-xs font-semibold">
              <KeyRound className="w-4 h-4 shrink-0 text-cyan-400" />
              <span>{recoveryNotice}</span>
            </div>
          )}

          {/* ================================================================ */}
          {/* TAB A: LOG IN ("Welcome Back, MC")                               */}
          {/* ================================================================ */}
          {authTab === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  Welcome Back, MC
                </h1>
                <p className="text-xs sm:text-sm text-gray-400">
                  Step back into the battle arena and claim your bars.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-gray-400 mb-1.5">
                    Email or MC Handle
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      placeholder="@The Beast or user@micwars.com"
                      className="w-full bg-black/75 border border-white/15 focus:border-cyan-400 focus:outline-none rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-gray-400 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter your arena password"
                      className="w-full bg-black/75 border border-white/15 focus:border-cyan-400 focus:outline-none rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-gray-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberDevice}
                    onChange={(e) => setRememberDevice(e.target.checked)}
                    className="rounded border-white/20 bg-black text-cyan-400 focus:ring-cyan-400"
                  />
                  <span>Remember me on this device</span>
                </label>

                <button
                  type="button"
                  onClick={() =>
                    setRecoveryNotice(
                      `Password reset & 2FA recovery link dispatched to ${
                        loginIdentifier || 'your registered email'
                      }.`
                    )
                  }
                  className="font-bold text-cyan-400 hover:text-cyan-300 transition cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 text-black font-black text-sm sm:text-base shadow-xl shadow-cyan-500/25 hover:brightness-110 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Enter Battle Arena</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Quick Demo Account Buttons for Instant Testing */}
              <div className="pt-2 border-t border-white/10 space-y-2">
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 text-center">
                  Instant Arena Access
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickDemoSignIn('admin')}
                    className="py-2.5 px-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/35 text-amber-300 text-xs font-extrabold transition cursor-pointer"
                  >
                    Sign in as (Admin/Judge)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemoSignIn('kinglex')}
                    className="py-2.5 px-3 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/35 text-cyan-300 text-xs font-extrabold transition cursor-pointer"
                  >
                    Sign in as (Competitor)
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* ============================================================== */
            /* TAB B: CREATE ACCOUNT ("Join the MicWars")                     */
            /* ============================================================== */
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  Join the MicWars
                </h1>
                <p className="text-xs sm:text-sm text-gray-400">
                  Create your account and start your rap battle legacy.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-gray-400 mb-1">
                    MC Handle / Username
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={regHandle}
                      onChange={(e) => setRegHandle(e.target.value)}
                      placeholder="@lyrical_beast"
                      className="w-full bg-black/75 border border-white/15 focus:border-cyan-400 focus:outline-none rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-gray-400 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="student@university.edu"
                      className="w-full bg-black/75 border border-white/15 focus:border-cyan-400 focus:outline-none rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder-gray-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-gray-400 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className="w-full bg-black/75 border border-white/15 focus:border-cyan-400 focus:outline-none rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500"
                  />
                </div>
              </div>

              {/* MC Classification Selector Cards */}
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-gray-400 mb-1.5">
                  MC Classification
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {classifications.map((cls) => {
                    const IconComp = cls.icon;
                    const selected = classification === cls.id;
                    return (
                      <button
                        key={cls.id}
                        type="button"
                        onClick={() => setClassification(cls.id)}
                        className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                          selected
                            ? 'bg-cyan-500/15 border-cyan-400 text-white'
                            : 'bg-black/60 border-white/10 text-gray-400 hover:border-white/25'
                        }`}
                      >
                        <IconComp
                          className={`w-4 h-4 mb-1 ${
                            selected ? 'text-cyan-400' : 'text-gray-400'
                          }`}
                        />
                        <p className="text-xs font-extrabold leading-tight">{cls.id}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">{cls.sub}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <label className="flex items-start gap-2.5 text-xs text-gray-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreedTerms}
                  onChange={(e) => setAgreedTerms(e.target.checked)}
                  className="mt-0.5 rounded border-white/20 bg-black text-cyan-400"
                />
                <span>I agree to the MicWars Terms and Fair Play Code.</span>
              </label>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 text-black font-black text-sm sm:text-base shadow-xl shadow-cyan-500/25 hover:brightness-110 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Initialize MC Profile</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* OAuth Provider Bar ("OR CONTINUE WITH") */}
          <div className="space-y-3 pt-1">
            <div className="relative flex items-center justify-center">
              <div className="border-t border-white/10 w-full" />
              <span className="bg-[#0b101b] px-3 text-[10px] font-extrabold uppercase tracking-widest text-gray-500 whitespace-nowrap">
                Or continue with
              </span>
              <div className="border-t border-white/10 w-full" />
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {['Discord', 'Google', 'Apple'].map((provider) => (
                <button
                  key={provider}
                  type="button"
                  onClick={() => handleQuickDemoSignIn(provider)}
                  className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-gray-200 transition cursor-pointer"
                >
                  {provider}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Security Footer */}
      <footer className="relative z-10 py-5 px-4 text-center text-[11px] text-gray-500 border-t border-white/5">
        MicWars Secure Authentication v2.4. Powered by Web Audio Core • ©2026 MicWars. Battle your bars. Win the mic. All rights reserved.
      </footer>
    </div>
  );
}

// ============================================================================
