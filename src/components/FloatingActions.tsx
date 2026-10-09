import React, { useState, useEffect } from 'react';
import { MessageCircle, ArrowUp, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export const FloatingActions: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { totalCount, setIsCartOpen } = useCart();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside aria-label="Quick Actions" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="pointer-events-auto w-11 h-11 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-agro-800 shadow-lg border border-slate-200/80 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
          aria-label={t('Scroll back to top', 'Kembali ke atas')}
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Floating Cart Pill if items exist */}
      {totalCount > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="pointer-events-auto flex items-center gap-2 bg-coffee-800 hover:bg-coffee-900 text-amber-100 px-4 py-2.5 rounded-full shadow-xl shadow-coffee-950/25 border border-amber-400/30 transition-all hover:scale-105 active:scale-95 animate-bounce"
        >
          <ShoppingBag className="w-4 h-4 text-amber-300" />
          <span className="text-xs font-bold">
            {totalCount} {t('Items in Order', 'Pesanan')}
          </span>
        </button>
      )}

      {/* Primary WhatsApp Action */}
      <a
        href="https://wa.me/60184633326?text=Hai%20Synergy%20Agro%20Farm%20Bukit%20Katil!%20Saya%20ingin%20bertanya%20tentang%20produk%20nurseri%20dan%20kafe."
        target="_blank"
        rel="noreferrer"
        className="pointer-events-auto group relative flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-3 rounded-full shadow-2xl shadow-emerald-700/40 hover:scale-105 active:scale-95 transition-all"
        aria-label="Direct WhatsApp to Synergy Agro Farm"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full animate-ping" />
        <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
        <span className="hidden sm:inline">
          {t('WhatsApp +60 18 463 3326', 'WhatsApp Kami')}
        </span>
        <span className="sm:hidden font-bold">WhatsApp</span>
      </a>
    </aside>
  );
};
