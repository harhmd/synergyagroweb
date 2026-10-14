import React, { useState, useEffect } from 'react';
import { 
  Coffee, 
  Sprout, 
  ShoppingBag, 
  Menu as MenuIcon, 
  X, 
  Clock, 
  MapPin, 
  Globe, 
  CalendarDays,
  PhoneCall,
  Crown,
  Lock,
  ShieldCheck,
  LogIn
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenLogin: () => void;
  isAuthenticated: boolean;
  onOpenPortal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenBooking, 
  onOpenLogin, 
  isAuthenticated, 
  onOpenPortal 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalCount, setIsCartOpen } = useCart();
  const { lang, toggleLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isOperatingNow = () => {
    const now = new Date();
    const hours = now.getHours();
    return hours >= 8 && hours < 18;
  };

  const navLinks = [
    { label: t('Pillars', 'Teras SAF'), href: '#pillars' },
    { label: t('State Inauguration', 'Perasmian TYT'), href: '#inauguration' },
    { label: t('Legasi Coffee', 'Kafe Legasi'), href: '#cafe' },
    { label: t('Nursery & Plants', 'Nurseri & Pokok'), href: '#nursery' },
    { label: t('Experience', 'Aktiviti & Buggy'), href: '#experience' },
    { label: t('Gallery', 'Galeri (12)'), href: '#gallery' },
    { label: t('Contact & Location', 'Lokasi & Waktu'), href: '#contact' },
  ];

  return (
    <>
      {/* Top micro announcement bar */}
      <div className="bg-agro-950 text-emerald-200 text-xs py-2 px-4 border-b border-agro-800/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 font-medium">
              <span className={`w-2 h-2 rounded-full ${isOperatingNow() ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
              {isOperatingNow() 
                ? t('Open Today: 8:00 AM – 6:00 PM (Mon – Sun)', 'Buka Hari Ini: 8.00 Pagi – 6.00 Petang (Isnin – Ahad)') 
                : t('Opens Daily at 8:00 AM • Bukit Katil, Melaka', 'Buka Setiap Hari 8.00 Pagi • Bukit Katil, Melaka')}
            </span>

            <span className="hidden lg:inline-flex items-center gap-1.5 text-amber-300 font-semibold pl-2 border-l border-agro-800">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('Dirasmikan Oleh TYT Yang di-Pertua Negeri Melaka', 'Dirasmikan Oleh TYT Yang di-Pertua Negeri Melaka')}</span>
            </span>

            <span className="hidden md:inline-flex items-center gap-1 text-emerald-300/80">
              <MapPin className="w-3.5 h-3.5 text-agro-400" />
              Bukit Katil, Melaka
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="https://wa.me/60184633326" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1 text-emerald-300 hover:text-white transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-emerald-400" />
              <span>+60 18 463 3326</span>
            </a>

            <span className="text-agro-700">|</span>

            <button
              onClick={toggleLang}
              className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded bg-agro-900/80 hover:bg-agro-800 text-emerald-100 transition-colors"
              title="Change Language"
            >
              <Globe className="w-3 h-3 text-agro-400" />
              <span>{lang === 'en' ? 'Bahasa Melayu' : 'English'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-md py-3.5 border-b border-agro-100'
            : 'bg-white/80 backdrop-blur-sm py-4 border-b border-agro-100/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand */}
          <a href="#" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-agro-500 rounded-lg p-1">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-agro-700 via-agro-800 to-agro-950 flex items-center justify-center shadow-md shadow-agro-900/20 group-hover:scale-105 transition-transform duration-300 border border-agro-500/30">
              <Sprout className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-agro-950 group-hover:text-agro-700 transition-colors">
                  SYNERGY AGRO FARM
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-agro-100 text-agro-800 px-1.5 py-0.5 rounded-full border border-agro-200">
                  SAF
                </span>
              </div>
              <p className="text-xs text-earth-600 flex items-center gap-1 font-medium">
                <span>Bukit Katil, Melaka</span>
                <span className="w-1 h-1 rounded-full bg-coffee-400"></span>
                <span className="text-coffee-700 flex items-center gap-1">
                  <Coffee className="w-3 h-3 text-coffee-600 inline" /> Legasi Coffee
                </span>
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs xl:text-sm font-semibold text-slate-700 hover:text-agro-700 transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-agro-600 hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Staff / Management Portal Trigger */}
            {isAuthenticated ? (
              <button
                onClick={onOpenPortal}
                className="flex items-center gap-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 font-bold text-xs xl:text-sm px-3.5 py-2.5 rounded-xl transition-all shadow-sm active:scale-95"
                title="Open Management Portal"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>{t('Staff Portal', 'Portal Staf')}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </button>
            ) : (
              <button
                onClick={onOpenLogin}
                className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200 font-bold text-xs xl:text-sm px-3.5 py-2.5 rounded-xl transition-all active:scale-95"
                title="Staff & Management Login"
              >
                <Lock className="w-3.5 h-3.5 text-agro-700" />
                <span>{t('Staff Login', 'Log Masuk Staf')}</span>
              </button>
            )}

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl border border-agro-200 bg-agro-50/70 hover:bg-agro-100 text-agro-800 transition-all duration-200 active:scale-95"
              aria-label="View Order Cart"
            >
              <ShoppingBag className="w-5 h-5 text-agro-700" />
              {totalCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-coffee-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow-sm">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Plan Visit Modal Trigger */}
            <button
              onClick={onOpenBooking}
              className="flex items-center gap-2 bg-gradient-to-r from-agro-700 to-agro-800 hover:from-agro-800 hover:to-agro-900 text-white font-semibold text-xs xl:text-sm px-4 py-2.5 rounded-xl shadow-md shadow-agro-900/15 hover:shadow-lg transition-all duration-200 active:scale-95"
            >
              <CalendarDays className="w-4 h-4 text-emerald-300" />
              <span>{t('Plan Visit / Buggy', 'Rancang Lawatan')}</span>
            </button>
          </div>

          {/* Mobile Menu & Cart Icon */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-lg bg-agro-50 text-agro-800 border border-agro-200"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5 text-agro-700" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-coffee-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-slate-900" /> : <MenuIcon className="w-6 h-6 text-slate-900" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-lg border-b border-agro-100 px-4 pt-4 pb-6 mt-3 shadow-xl animate-in slide-in-from-top-4 duration-200">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold text-slate-800 hover:text-agro-700 px-3 py-2 rounded-lg hover:bg-agro-50 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full py-3 bg-agro-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 text-sm"
                >
                  <CalendarDays className="w-4 h-4" />
                  <span>{t('Plan Farm Visit & Buggy Tour', 'Rancang Lawatan & Buggy')}</span>
                </button>
                {/* Mobile Staff Login / Portal Button */}
                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenPortal();
                    }}
                    className="w-full py-2.5 bg-emerald-100 text-emerald-950 font-bold rounded-xl flex items-center justify-center gap-2 text-sm border border-emerald-300"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>{t('Open Management Portal (demo)', 'Buka Portal Pengurusan (demo)')}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenLogin();
                    }}
                    className="w-full py-2.5 bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold rounded-xl flex items-center justify-center gap-2 text-sm border border-slate-200"
                  >
                    <Lock className="w-4 h-4 text-agro-700" />
                    <span>{t('Staff & Management Login (demo)', 'Log Masuk Staf & Pengurusan')}</span>
                  </button>
                )}

                <a
                  href="https://wa.me/60184633326"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 text-center text-xs font-semibold text-emerald-800 bg-emerald-50 rounded-xl border border-emerald-200"
                >
                  WhatsApp: +60 18 463 3326
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
