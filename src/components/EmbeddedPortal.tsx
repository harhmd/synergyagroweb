import React, { useState, useRef } from 'react';
import { 
  Sprout, 
  ArrowLeft, 
  LogOut, 
  RefreshCw, 
  Maximize2, 
  Minimize2, 
  ExternalLink, 
  ShieldCheck, 
  Lock,
  Layers,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface EmbeddedPortalProps {
  onBackToHome: () => void;
  onLogout: () => void;
}

export const EmbeddedPortal: React.FC<EmbeddedPortalProps> = ({ onBackToHome, onLogout }) => {
  const { t } = useLanguage();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleRefresh = () => {
    setIsLoading(true);
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-900 text-white">
      {/* Top Embedded Control Header */}
      <header className="h-14 bg-slate-950/95 border-b border-emerald-900/40 backdrop-blur px-4 flex items-center justify-between gap-3 shrink-0 select-none">
        {/* Left: Branding & Status */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 transition-all active:scale-95"
            title="Back to Main Landing Page"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t('Back to SAF Website', 'Kembali ke Laman SAF')}</span>
            <span className="sm:hidden">{t('Back', 'Kembali')}</span>
          </button>

          <div className="h-5 w-px bg-slate-800 hidden sm:block" />

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center shadow-sm">
              <Sprout className="w-4 h-4 text-emerald-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xs sm:text-sm tracking-tight text-emerald-400">
                  SYNERGY AGRO FARM
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-950 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-700/60 hidden md:inline-block">
                  Donezo Portal
                </span>
              </div>
            </div>
          </div>

          {/* Active Domain Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-700/40 text-[11px] text-emerald-300">
            <Lock className="w-3 h-3 text-emerald-400" />
            <span>Embedded:</span>
            <span className="font-mono font-bold text-white">synergy.famamelaka.cc/portal/</span>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {/* User Status Pill */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>User:</span>
            <span className="font-bold text-white">demo (Admin)</span>
          </div>

          {/* Reload Iframe */}
          <button
            onClick={handleRefresh}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Reload Portal Frame"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-emerald-400' : ''}`} />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors hidden sm:block"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Direct Link in New Tab */}
          <a
            href="/portal/"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors hidden sm:block"
            title="Open in Separate Tab"
          >
            <ExternalLink className="w-4 h-4" />
          </a>

          {/* Log Out */}
          <button
            onClick={onLogout}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-red-950/60 hover:bg-red-900/80 text-red-300 hover:text-white text-xs font-semibold border border-red-800/50 transition-all active:scale-95"
            title="Log Out of Management Portal"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t('Log Out', 'Log Keluar')}</span>
          </button>
        </div>
      </header>

      {/* Main Iframe Content Area */}
      <div className="relative flex-1 w-full bg-[#ebedf0] overflow-hidden">
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-sm text-white">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-3 animate-pulse">
              <Sprout className="w-7 h-7 text-white" />
            </div>
            <div className="w-6 h-6 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mb-2" />
            <p className="text-sm font-bold text-white tracking-wide">
              {t('Connecting to SAF Management Portal...', 'Menyambung ke Portal Pengurusan SAF...')}
            </p>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              synergy.famamelaka.cc/portal/ • Donezo POS & Inventory
            </p>
          </div>
        )}

        {/* Embedded Iframe */}
        <iframe
          ref={iframeRef}
          src="/portal/"
          onLoad={() => setIsLoading(false)}
          className="w-full h-full border-0"
          title="Synergy Agro Farm Management Portal"
          allow="clipboard-write; fullscreen"
        />
      </div>
    </div>
  );
};
