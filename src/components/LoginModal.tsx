import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  AlertCircle,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { t } = useLanguage();
  const [username, setUsername] = useState('demo');
  const [password, setPassword] = useState('demo');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Authenticate against /api/auth/login with fallback to client check
      let loginSuccess = false;
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: username.trim(), password: password.trim() }),
        });
        const data = await res.json();
        if (data.success) {
          loginSuccess = true;
        }
      } catch {
        // Fallback to strict client validation if offline
        if (username.trim() === 'demo' && password.trim() === 'demo') {
          loginSuccess = true;
        }
      }

      if (loginSuccess) {
        setIsSuccess(true);
        localStorage.setItem('saf_portal_authenticated', 'true');
        localStorage.setItem('saf_portal_user', 'demo');
        localStorage.setItem('saf_portal_login_time', new Date().toISOString());

        setTimeout(() => {
          setIsLoading(false);
          setIsSuccess(false);
          onSuccess();
        }, 600);
      } else {
        setIsLoading(false);
        setError(t(
          'Invalid username or password. Please use demo / demo.',
          'Nama pengguna atau kata laluan tidak sah. Sila gunakan demo / demo.'
        ));
      }
    } catch {
      setIsLoading(false);
      setError('An error occurred during authentication. Please try again.');
    }
  };

  const fillDemo = () => {
    setUsername('demo');
    setPassword('demo');
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-agro-100 overflow-hidden transform transition-all duration-300 animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Gradient Bar */}
        <div className="h-2.5 bg-gradient-to-r from-agro-600 via-emerald-500 to-coffee-500" />

        {/* Modal Header */}
        <div className="p-6 sm:p-7 pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-agro-700 to-agro-900 flex items-center justify-center shadow-lg shadow-agro-900/20 text-white">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-agro-100 text-agro-800 border border-agro-200 inline-block mb-1">
                  Staff & Management
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  {t('SAF Management Portal', 'Portal Pengurusan SAF')}
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            {t(
              'Sign in to access farm stock inventory, POS orders, and Donezo management system.',
              'Log masuk untuk mengakses inventori tapak semaian, pesanan POS, dan sistem Donezo.'
            )}
          </p>
        </div>

        {/* Quick Demo Credentials Pill Card */}
        <div className="mx-6 sm:mx-7 mb-4 p-3.5 bg-gradient-to-r from-emerald-50 to-agro-50 rounded-2xl border border-emerald-200/70 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <div className="text-xs">
              <p className="font-semibold text-emerald-950">
                {t('Demo Credentials Ready', 'Kelayakan Akses Demo')}
              </p>
              <p className="text-slate-600 font-mono text-[11px]">
                User: <span className="font-bold text-emerald-800">demo</span> • Pass: <span className="font-bold text-emerald-800">demo</span>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={fillDemo}
            className="text-[11px] font-bold px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all active:scale-95 shrink-0"
          >
            {t('Auto-Fill', 'Isi Demo')}
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mx-6 sm:mx-7 mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2.5 text-xs text-red-700 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Success Alert */}
        {isSuccess && (
          <div className="mx-6 sm:mx-7 mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2.5 text-xs text-emerald-800 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 animate-bounce" />
            <span>{t('Authenticated as demo! Embedding SAF Portal...', 'Akses berjaya! Membuka Portal SAF...')}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="px-6 sm:px-7 pb-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {t('Username', 'Nama Pengguna')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="demo"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-agro-500 focus:border-transparent transition-all font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {t('Password', 'Kata Laluan')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="demo"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-agro-500 focus:border-transparent transition-all font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="Toggle Password Visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col gap-2">
            <button
              type="submit"
              disabled={isLoading || isSuccess}
              className="w-full py-3 px-4 bg-gradient-to-r from-agro-700 to-agro-900 hover:from-agro-800 hover:to-slate-950 text-white font-bold text-sm rounded-xl shadow-lg shadow-agro-900/20 flex items-center justify-center gap-2 transition-all duration-200 active:scale-98 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>{t('Authenticating...', 'Mengesahkan...')}</span>
                </>
              ) : (
                <>
                  <span>{t('Sign In & Open Portal', 'Log Masuk & Buka Portal')}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 text-center text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
            >
              {t('Cancel', 'Batal')}
            </button>
          </div>
        </form>

        {/* Footer info note */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
            <span>Synergy Agro Farm (SAF) Management</span>
            <span>•</span>
            <span className="font-mono text-emerald-700">synergy.famamelaka.cc</span>
          </p>
        </div>
      </div>
    </div>
  );
};
