import React, { useState } from 'react';
import {
  User,
  Lock,
  Eye,
  EyeOff,
  Shield,
  ArrowRight,
  Vote,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Building2
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../services/supabase';

interface LoginViewProps {
  onLoginSuccess: (role: 'player' | 'admin', username?: string) => void;
  initialMode?: 'player' | 'admin';
}

export const LoginView: React.FC<LoginViewProps> = ({
  onLoginSuccess,
  initialMode = 'player'
}) => {
  const [activeTab, setActiveTab] = useState<'player' | 'admin' | 'signup'>(initialMode);
  const [separateAdminView, setSeparateAdminView] = useState<boolean>(initialMode === 'admin');

  // Form states
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Signup fields
  const [fullName, setFullName] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [selectedState, setSelectedState] = useState('Uttar Pradesh');
  const [selectedConstituency, setSelectedConstituency] = useState('Varanasi');
  const [signupPassword, setSignupPassword] = useState('');

  // UI state
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Quick Demo Login handlers
  const handleQuickDemoLogin = (role: 'player' | 'admin') => {
    setLoading(true);
    setErrorMsg(null);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess(role, role === 'player' ? 'Akash K' : 'Chief Election Commissioner');
    }, 400);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!usernameOrEmail.trim() || !password.trim()) {
      setErrorMsg('Please enter both username/email and password.');
      return;
    }

    setLoading(true);

    try {
      if (isSupabaseConfigured && supabase) {
        // Attempt Supabase Auth
        const { data, error } = await supabase.auth.signInWithPassword({
          email: usernameOrEmail,
          password: password,
        });

        if (error) {
          // If supabase auth fails or user is testing with username
          console.warn('Supabase Auth error, checking local simulation fallback:', error.message);
          // Fall back gracefully for demo usernames
          const isEciAdmin = usernameOrEmail.toLowerCase().includes('admin') || activeTab === 'admin' || separateAdminView;
          onLoginSuccess(isEciAdmin ? 'admin' : 'player', usernameOrEmail);
        } else {
          const isEciAdmin = activeTab === 'admin' || separateAdminView;
          onLoginSuccess(isEciAdmin ? 'admin' : 'player', data.user.email || usernameOrEmail);
        }
      } else {
        // Local simulation instant login
        setTimeout(() => {
          const isEciAdmin = usernameOrEmail.toLowerCase().includes('admin') || activeTab === 'admin' || separateAdminView;
          onLoginSuccess(isEciAdmin ? 'admin' : 'player', usernameOrEmail);
        }, 500);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!fullName.trim() || !signupUsername.trim() || !signupPassword.trim()) {
      setErrorMsg('Please complete all registration fields.');
      return;
    }

    setLoading(true);

    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signUp({
          email: `${signupUsername.toLowerCase().replace(/\s+/g, '')}@citizen.in`,
          password: signupPassword,
          options: {
            data: {
              display_name: fullName,
              state: selectedState,
              constituency: selectedConstituency,
            }
          }
        });

        if (error) {
          setErrorMsg(error.message);
        } else {
          setSuccessMsg('Account registered successfully! Entering the Republic...');
          setTimeout(() => {
            onLoginSuccess('player', fullName);
          }, 600);
        }
      } else {
        setSuccessMsg('Citizen identity registered! Entering the Republic...');
        setTimeout(() => {
          onLoginSuccess('player', fullName);
        }, 600);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Signup failed.');
    } finally {
      setLoading(false);
    }
  };

  // =========================================================================
  // VIEW 10: SEPARATE ADMIN / ECI CONTROL CENTER LOGIN (Matching Design Card 10)
  // =========================================================================
  if (separateAdminView) {
    return (
      <div className="relative min-h-screen w-full flex items-center justify-center p-4 select-none bg-[#091424]">
        {/* Background Image: Sansad Bhavan / Parliament */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 scale-105 transition-transform duration-1000"
          style={{ backgroundImage: `url('/assets/parliament_admin_bg.jpg')` }}
        />
        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060D17] via-[#091424]/80 to-[#0A182E]/90 backdrop-blur-xs" />

        {/* Center Card */}
        <div className="relative z-10 w-full max-w-md bg-[#0F2644]/90 backdrop-blur-xl border border-white/15 rounded-3xl p-8 sm:p-10 shadow-2xl text-white">
          {/* Header ECI Badge */}
          <div className="flex flex-col items-center text-center mb-7">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-3 shadow-inner">
              <Shield className="w-7 h-7" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400/10 text-amber-300 text-[11px] font-bold uppercase tracking-wider border border-amber-400/20 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              NIRVACHAN SADAN · ECI CONTROL CENTER
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
              Admin Login
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Secure access for Election Commission of India
            </p>
          </div>

          {errorMsg && (
            <div className="mb-5 p-3 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Commission Officer ID / Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  placeholder="admin.eci or cec@eci.gov.in"
                  className="w-full bg-[#173B67]/70 border border-white/20 rounded-xl px-4 py-3 pl-11 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                  required
                />
                <User className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Passcode / Secret Key
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#173B67]/70 border border-white/20 rounded-xl px-4 py-3 pl-11 pr-11 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                  required
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-slate-400">Security Clearance Level 1</span>
              <a href="#reset" onClick={(e) => { e.preventDefault(); alert('Demo Master Admin Key: admin / password'); }} className="text-amber-400 hover:underline">
                Forgot Passcode?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-heading font-extrabold text-sm py-3 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Authenticate & Enter Control Room</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Access */}
          <div className="mt-5 pt-4 border-t border-white/10 text-center">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('admin')}
              className="text-xs text-amber-300/90 hover:text-amber-300 font-semibold bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-amber-400/20 transition-all inline-flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>One-Click Chief Election Commissioner Access</span>
            </button>
          </div>

          {/* Footer security note */}
          <div className="mt-6 flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Authorized personnel only</span>
            </div>
            <button
              onClick={() => {
                setSeparateAdminView(false);
                setActiveTab('player');
              }}
              className="text-blue-300 hover:text-white underline cursor-pointer"
            >
              ← Back to Player Portal
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 1: SPLIT SCREEN LOGIN / SIGNUP (Matching Design Card 1)
  // =========================================================================
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#F7F9FC] text-[#172033] select-none">
      {/* ----------------- LEFT HERO PANE (India Gate & Republic Stats) ----------------- */}
      <div className="relative lg:w-1/2 min-h-[380px] lg:min-h-screen bg-[#102A4E] text-white flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-hidden">
        {/* India Gate Background Photo */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-65 scale-100 lg:scale-105 transition-transform duration-700"
          style={{ backgroundImage: `url('/assets/india_gate_login.jpg')` }}
        />
        {/* Saffron-to-Navy Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C1E38] via-[#102A4E]/75 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-1.5 tricolor-stripe" />

        {/* Top Branding */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-2xl shadow-lg">
            🇮🇳
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-black text-lg sm:text-xl tracking-wide uppercase text-white drop-shadow-sm">
                KING MAKER OF INDIAN POLITICS
              </span>
            </div>
            <p className="text-xs text-amber-200/90 font-medium">
              Your Republic. Your Decisions.
            </p>
          </div>
        </div>

        {/* Center Hero Punchline */}
        <div className="relative z-10 max-w-lg my-8 lg:my-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold text-amber-300 border border-white/20 mb-4">
            <Vote className="w-3.5 h-3.5" />
            <span>Sovereign Political Strategy & Democracy Sim</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-5xl leading-tight tracking-tight text-white drop-shadow-md">
            Democracy is not just a system, <br />
            <span className="text-amber-400 italic font-serif">it's a journey.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-200 mt-3 leading-relaxed">
            Begin as a grassroots voter, found historic political coalitions, campaign across parliamentary constituencies, and govern the world's largest democracy.
          </p>
        </div>

        {/* Bottom 4 Counters Bar (Matching Design Card 1 exactly) */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 border-t border-white/20">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 text-center">
            <div className="font-heading font-black text-xl sm:text-2xl text-amber-400">28</div>
            <div className="text-[11px] font-semibold text-slate-200 uppercase tracking-wider">States</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 text-center">
            <div className="font-heading font-black text-xl sm:text-2xl text-white">8</div>
            <div className="text-[11px] font-semibold text-slate-200 uppercase tracking-wider">UTs</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 text-center">
            <div className="font-heading font-black text-xl sm:text-2xl text-amber-400">543</div>
            <div className="text-[11px] font-semibold text-slate-200 uppercase tracking-wider">Lok Sabha Seats</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 text-center">
            <div className="font-heading font-black text-xl sm:text-2xl text-emerald-400">1000+</div>
            <div className="text-[11px] font-semibold text-slate-200 uppercase tracking-wider">Political Stories</div>
          </div>
        </div>
      </div>

      {/* ----------------- RIGHT AUTH FORM PANE ----------------- */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 sm:p-10 lg:p-16">
        <div className="w-full max-w-md space-y-6">
          {/* Header */}
          <div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#173B67] tracking-tight">
              {activeTab === 'signup' ? 'Create Citizen Account' : 'Welcome Back'}
            </h1>
            <p className="text-xs sm:text-sm text-[#687386] mt-1">
              {activeTab === 'signup'
                ? 'Register your voter credentials to contest or lead'
                : 'Login to continue your political journey'}
            </p>
          </div>

          {/* Dual Pill Tab: Player Login | Admin Login (Matching Design Card 1) */}
          <div className="flex p-1 rounded-xl bg-[#E5EAF1]/70 border border-[#CBD5E1]">
            <button
              type="button"
              onClick={() => {
                setActiveTab('player');
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'player'
                  ? 'bg-[#173B67] text-white shadow-sm'
                  : 'text-[#687386] hover:text-[#172033]'
              }`}
            >
              Player Login
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('admin');
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'admin'
                  ? 'bg-[#173B67] text-white shadow-sm'
                  : 'text-[#687386] hover:text-[#172033]'
              }`}
            >
              Admin Login
            </button>
          </div>

          {/* Feedback Alerts */}
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* ---------------- LOGIN FORM ---------------- */}
          {activeTab !== 'signup' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#173B67] mb-1.5">
                  {activeTab === 'admin' ? 'Officer ID / Email' : 'Email or Username'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={usernameOrEmail}
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                    placeholder={activeTab === 'admin' ? 'admin@eci.gov.in' : 'akash@democracy.in or akash'}
                    className="w-full bg-white border border-[#CBD5E1] rounded-xl px-4 py-3 pl-11 text-sm text-[#172033] placeholder-[#94A3B8] focus:outline-none focus:border-[#173B67] focus:ring-1 focus:ring-[#173B67] transition-all shadow-xs"
                    required
                  />
                  <User className="w-4 h-4 text-[#94A3B8] absolute left-4 top-3.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#173B67] mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-white border border-[#CBD5E1] rounded-xl px-4 py-3 pl-11 pr-11 text-sm text-[#172033] placeholder-[#94A3B8] focus:outline-none focus:border-[#173B67] focus:ring-1 focus:ring-[#173B67] transition-all shadow-xs"
                    required
                  />
                  <Lock className="w-4 h-4 text-[#94A3B8] absolute left-4 top-3.5" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-[#94A3B8] hover:text-[#172033]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Forgot Password & Create Account Links */}
              <div className="flex items-center justify-between text-xs pt-0.5">
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Demo Mode: Click below for instant one-click login!');
                  }}
                  className="text-[#687386] hover:text-[#173B67] font-medium"
                >
                  Forgot Password?
                </a>
                <button
                  type="button"
                  onClick={() => setActiveTab('signup')}
                  className="text-[#173B67] hover:underline font-bold"
                >
                  Create Player Account
                </button>
              </div>

              {/* Main Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#173B67] hover:bg-[#1E4D85] text-white font-heading font-extrabold text-sm py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{activeTab === 'admin' ? 'Login as ECI Officer' : 'Login'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* OR Divider */}
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-[#E5EAF1]" />
                <span className="flex-shrink mx-4 text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">
                  OR
                </span>
                <div className="flex-grow border-t border-[#E5EAF1]" />
              </div>

              {/* Dedicated Election Commission Login Button (Matching Design Card 1) */}
              <button
                type="button"
                onClick={() => setSeparateAdminView(true)}
                className="w-full bg-white hover:bg-[#F7F9FC] text-[#173B67] border border-[#CBD5E1] hover:border-[#173B67] font-bold text-xs py-2.5 px-4 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Shield className="w-4 h-4 text-[#F59E0B]" />
                <span>Election Commission Login</span>
              </button>

              {/* Instant One-Click Demo Access */}
              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80">
                <div className="text-[11px] font-bold text-amber-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Instant Quick Play</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('player')}
                    className="text-xs font-bold py-2 px-3 rounded-lg bg-white border border-amber-300 text-[#173B67] hover:bg-amber-100/50 shadow-xs transition-all text-center"
                  >
                    Play as Citizen Akash
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('admin')}
                    className="text-xs font-bold py-2 px-3 rounded-lg bg-[#173B67] text-white hover:bg-[#1E4D85] shadow-xs transition-all text-center"
                  >
                    Chief Commissioner
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* ---------------- SIGN UP FORM ---------------- */
            <form onSubmit={handleSignupSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#173B67] mb-1">
                  Full Citizen Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Akash Kumar"
                    className="w-full bg-white border border-[#CBD5E1] rounded-xl px-4 py-2.5 pl-10 text-sm focus:outline-none focus:border-[#173B67]"
                    required
                  />
                  <User className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#173B67] mb-1">
                  Voter Handle / Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={signupUsername}
                    onChange={(e) => setSignupUsername(e.target.value)}
                    placeholder="akash2026"
                    className="w-full bg-white border border-[#CBD5E1] rounded-xl px-4 py-2.5 pl-10 text-sm focus:outline-none focus:border-[#173B67]"
                    required
                  />
                  <Building2 className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-[#173B67] mb-1">
                    State
                  </label>
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full bg-white border border-[#CBD5E1] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#173B67]"
                  >
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Delhi">Delhi NCT</option>
                    <option value="Bihar">Bihar</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#173B67] mb-1">
                    Constituency
                  </label>
                  <select
                    value={selectedConstituency}
                    onChange={(e) => setSelectedConstituency(e.target.value)}
                    className="w-full bg-white border border-[#CBD5E1] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#173B67]"
                  >
                    <option value="Varanasi">Varanasi</option>
                    <option value="Gandhinagar">Gandhinagar</option>
                    <option value="Wayanad">Wayanad</option>
                    <option value="Baramati">Baramati</option>
                    <option value="Bengaluru South">Bengaluru South</option>
                    <option value="New Delhi">New Delhi</option>
                    <option value="Coimbatore South">Coimbatore South</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#173B67] mb-1">
                  Secret Passcode
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-white border border-[#CBD5E1] rounded-xl px-4 py-2.5 pl-10 text-sm focus:outline-none focus:border-[#173B67]"
                    required
                  />
                  <Lock className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-extrabold text-sm py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Register & Enter Lok Sabha Sim</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('player')}
                  className="text-xs text-[#173B67] hover:underline font-bold"
                >
                  Already registered? Back to Player Login
                </button>
              </div>
            </form>
          )}

          {/* Footer Motto (Matching Design Card 1 bottom) */}
          <div className="text-center pt-4">
            <p className="text-xs text-[#94A3B8] font-medium tracking-wide">
              — Play · Build · Lead · Change —
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
