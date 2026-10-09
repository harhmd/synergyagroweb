import React from 'react';
import { 
  Sprout, 
  Coffee, 
  MapPin, 
  Clock, 
  Phone, 
  Heart, 
  ShieldCheck, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-agro-950 text-slate-300 pt-16 pb-10 border-t border-agro-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-agro-800/60">
          {/* Col 1 & 2: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-agro-600 to-agro-800 flex items-center justify-center border border-emerald-400/30 shadow-md">
                <Sprout className="w-7 h-7 text-emerald-300" />
              </div>
              <div>
                <span className="font-extrabold text-xl text-white tracking-tight block">
                  SYNERGY AGRO FARM (SAF)
                </span>
                <span className="text-xs text-emerald-400 font-semibold">
                  Bukit Katil, Melaka
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {t(
                'Bukit Katil Melaka’s premier integrated agro farm and coffee sanctuary. Specialising in hybrid fruit trees, high-nutrient organic soil, and artisanal Legasi Coffee brews.',
                'Destinasi agro bersepadu terulung di Bukit Katil, Melaka. Khusus dalam anak pokok buah kahwin berkualiti, tanah organik berkhasiat tinggi, serta sajian kopi Legasi Coffee.'
              )}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-agro-900 border border-agro-700/60 text-xs font-semibold text-emerald-300">
                <Coffee className="w-3.5 h-3.5 text-amber-400" />
                Legasi Coffee
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-agro-900 border border-agro-700/60 text-xs font-semibold text-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Long You 6-in-1 Soil
              </span>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {t('Navigation', 'Pautan Pantas')}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#pillars" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-agro-500" />
                  {t('4 Core Pillars', '4 Teras SAF')}
                </a>
              </li>
              <li>
                <a href="#cafe" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-agro-500" />
                  {t('Legasi Coffee Menu', 'Menu Kafe Legasi')}
                </a>
              </li>
              <li>
                <a href="#nursery" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-agro-500" />
                  {t('Nursery & Fruit Trees', 'Nurseri & Pokok Buah')}
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-agro-500" />
                  {t('Farm Experience', 'Aktiviti Ladang')}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-agro-500" />
                  {t('Location & Hours', 'Lokasi & Waktu Operasi')}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Offerings (From Signboard) */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {t('Our Services', 'Perkhidmatan Kami')}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-start gap-1.5">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong>Kafe:</strong> Sedap & Menyelerakan</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-lime-400 font-bold">•</span>
                <span><strong>Buah-Buahan:</strong> Segar & Berkualiti</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Nurseri:</strong> Pokok Bunga, buah-buahan</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-yellow-400 font-bold">•</span>
                <span><strong>Baja:</strong> Berkualiti & Berkesan</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-300 font-bold">•</span>
                <span><strong>Tanah:</strong> Long You 6-in-1 Organik</span>
              </li>
            </ul>
          </div>

          {/* Col 5: Operational Hours & Contact */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {t('Visit & Inquire', 'Waktu & Pertanyaan')}
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Isnin – Ahad (Mon – Sun)</span>
                  <span>8.00 Pagi – 6.00 Petang</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Bukit Katil, Melaka, Malaysia</span>
              </div>

              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <a
                  href="https://wa.me/60184633326"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-bold"
                >
                  +60 18 463 3326
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Synergy Agro Farm (SAF) & Legasi Coffee. Bukit Katil, Melaka. All rights reserved.
          </p>

          <div className="flex items-center gap-1.5 text-slate-300">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>love by <strong className="text-emerald-400 font-semibold">Ts. Hj HAR</strong> | <strong className="text-white font-semibold">FAMA</strong></span>
          </div>
        </div>
      </div>
    </footer>
  );
};
