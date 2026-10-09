import React from 'react';
import { 
  Coffee, 
  Sprout, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  Phone,
  Compass,
  Award,
  Car,
  Utensils
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenGallery: (index: number) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenGallery }) => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-8 pb-20 lg:pt-12 lg:pb-28 bg-gradient-to-b from-[#faf8f5] via-[#f3f9f3] to-[#faf8f5]">
      {/* Background Organic Ambient Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-emerald-200/35 via-lime-200/25 to-amber-100/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute -top-24 right-0 w-96 h-96 bg-agro-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-coffee-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Badges */}
        <div className="flex justify-center flex-wrap gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-agro-200 shadow-sm text-agro-900 text-xs sm:text-sm font-semibold hover:border-agro-400 transition-all cursor-default">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <Sparkles className="w-4 h-4 text-agro-600" />
            <span>
              {t(
                'Bukit Katil, Melaka • Agro Farm & Cafe Destination',
                'Bukit Katil, Melaka • Destinasi Agro Farm & Kafe Santai'
              )}
            </span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-300 text-amber-900 text-xs font-bold">
            <Car className="w-3.5 h-3.5 text-amber-700" />
            <span>SAF Electric Buggy Tour (AG 1 & AG 2)</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto mb-8">
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-[1.15] mb-6">
            {t('Nurturing Nature,', 'Menyemai Alam,')}{' '}
            <span className="text-gradient-agro">
              {t('Brewing Fresh', 'Membancuh Kopi')}
            </span>{' '}
            {t('Memories at', 'Terhebat di')}{' '}
            <span className="relative whitespace-nowrap">
              <span className="relative z-10 text-agro-900 font-black">Synergy Agro Farm</span>
              <span className="absolute bottom-2 left-0 w-full h-3 bg-emerald-200/60 -z-10 -rotate-1 rounded-sm"></span>
            </span>
          </h1>

          <p className="text-slate-600 text-lg sm:text-xl font-normal leading-relaxed max-w-2xl mx-auto">
            {t(
              'A unique sanctuary in Bukit Katil where healthy fruit tree nurseries, organic farming soil, and farm-fresh harvests meet handcrafted Legasi Coffee and electric buggy tours.',
              'Destinasi agro unik di Bukit Katil, Melaka yang menggabungkan nurseri anak pokok buah kahwin, tanah organik berkualiti, serta kopi artisan Legasi Coffee dan lawatan santai menaiki buggy elektrik.'
            )}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <a
            href="#cafe"
            className="flex items-center gap-2.5 bg-gradient-to-r from-agro-800 to-agro-900 hover:from-agro-900 hover:to-emerald-950 text-white font-bold text-base px-7 py-4 rounded-2xl shadow-xl shadow-agro-900/20 hover:shadow-2xl hover:scale-[1.02] transition-all duration-200"
          >
            <Coffee className="w-5 h-5 text-amber-300" />
            <span>{t('Explore Legasi Cafe Menu', 'Lihat Menu Legasi Coffee')}</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>

          <a
            href="#experience"
            className="flex items-center gap-2.5 bg-white hover:bg-slate-50 text-agro-900 font-bold text-base px-7 py-4 rounded-2xl border-2 border-agro-200 hover:border-agro-400 shadow-sm transition-all duration-200"
          >
            <Car className="w-5 h-5 text-amber-600" />
            <span>{t('Buggy & Farm Experience', 'Aktiviti Buggy & Ladang')}</span>
          </a>

          <button
            onClick={onOpenBooking}
            className="flex items-center gap-2 text-earth-800 hover:text-agro-800 font-semibold text-sm px-4 py-3 rounded-xl hover:bg-emerald-50/60 transition-colors"
          >
            <Compass className="w-4 h-4 text-agro-600" />
            <span>{t('Plan Farm Visit', 'Tempah Lawatan')}</span>
          </button>
        </div>

        {/* Behance-Style Bento Grid Hero Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Card 1: Electric Buggy Fleet (AG 1 & AG 2) */}
          <div className="md:col-span-7 rounded-3xl overflow-hidden shadow-xl border border-agro-100 bg-white relative group min-h-[380px] flex flex-col justify-end">
            <img
              src="/images/saf-buggy-ride.jpg"
              alt="Synergy Agro Farm Bukit Katil Electric Buggies AG 1 and AG 2"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-agro-950/90 via-agro-950/40 to-transparent" />
            
            {/* Tag Badge */}
            <div className="absolute top-5 left-5">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-agro-950 font-bold text-xs shadow-md">
                <Car className="w-4 h-4 text-amber-600" />
                {t('Electric Buggy & Tram Fleet', 'Armada Buggy Elektrik SAF')}
              </span>
            </div>

            {/* Click to expand button */}
            <button
              onClick={() => onOpenGallery(0)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-all text-xs flex items-center gap-1"
            >
              <span>{t('View Photo', 'Buka Foto')}</span>
            </button>

            {/* Bottom Card Content */}
            <div className="relative p-6 sm:p-8 text-white z-10">
              <span className="text-amber-300 font-semibold text-xs tracking-wider uppercase">
                {t('Exclusive Farm Tour Experience', 'Lawatan Santai Mengelilingi Ladang')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold mt-1 mb-2">
                {t('Tour SAF on Electric Buggies AG 1 & AG 2', 'Pusing Ladang Menaiki Buggy Elektrik AG 1 & AG 2')}
              </h2>
              <p className="text-slate-200 text-sm max-w-xl leading-relaxed">
                {t(
                  'Sit back with your family and enjoy guided buggy rides through our fruit orchards, greenhouse walkways, and nursery grounds.',
                  'Nikmati perjalanan santai bersama keluarga menaiki kenderaan buggy elektrik dan trem teduhan mengelilingi dusun dan nurseri SAF.'
                )}
              </p>
            </div>
          </div>

          {/* Right Bento Column: 2 Cards */}
          <div className="md:col-span-5 flex flex-col gap-6">
            {/* Card 2: Covered Event & Dining Pavilion */}
            <div 
              className="flex-1 rounded-3xl overflow-hidden shadow-lg border border-agro-200 bg-white relative group cursor-pointer min-h-[190px]"
              onClick={() => onOpenGallery(1)}
            >
              <img
                src="/images/saf-event-hall.jpg"
                alt="Covered Event & Dining Pavilion"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              
              <div className="relative p-5 text-white h-full flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-emerald-500/80 backdrop-blur-md px-2.5 py-1 rounded-full text-white">
                    <Utensils className="w-3 h-3 inline mr-1" />
                    {t('Covered Pavilion Hall', 'Dewan Santai Berbumbung')}
                  </span>
                  <span className="text-[11px] bg-black/40 px-2 py-0.5 rounded-lg text-slate-200">
                    Kapasiti 100+
                  </span>
                </div>

                <div>
                  <h3 className="font-display font-bold text-lg text-white">
                    {t('Spacious Open-Air Pavilion & Lounge', 'Dewan Terbuka Berangin & Sofa Santai')}
                  </h3>
                  <p className="text-xs text-slate-200 line-clamp-1 mt-0.5">
                    {t('Equipped with giant cooling fans and lush potted greens.', 'Dilengkapi kipas gergasi sejuk & tanaman bunga.')}
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: Legasi Coffee Feature Card */}
            <div className="rounded-3xl overflow-hidden shadow-lg border border-coffee-200/60 bg-gradient-to-br from-[#2c160a] to-[#4a2813] text-white p-5 flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-950/70 border border-amber-600/40 px-2 py-0.5 rounded-full">
                    <Coffee className="w-3 h-3" />
                    Legasi Coffee
                  </span>
                  <h4 className="font-bold text-base text-white mt-1.5">
                    "Heritage in Every Cup"
                  </h4>
                  <p className="text-xs text-amber-200/80">
                    Matcha Strawberry • Spanish Latte • Kopi O Kaw
                  </p>
                </div>

                <a
                  href="#cafe"
                  className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/40 border border-amber-400/30 text-amber-200 text-xs font-bold transition-all"
                >
                  {t('Menu', 'Menu')}
                </a>
              </div>

              <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-xs text-amber-200/80">
                <span>Bukit Katil, Melaka</span>
                <span className="text-amber-400 font-bold">8:00 AM – 6:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Bottom Trust Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-agro-200/60">
          <div className="text-center p-3">
            <span className="font-display font-extrabold text-3xl sm:text-4xl text-agro-900 block">500+</span>
            <span className="text-xs sm:text-sm text-slate-600 font-medium">
              {t('Plant & Tree Varieties', 'Pilihan Anak Pokok & Tanaman')}
            </span>
          </div>

          <div className="text-center p-3">
            <span className="font-display font-extrabold text-3xl sm:text-4xl text-amber-700 block">AG 1 & 2</span>
            <span className="text-xs sm:text-sm text-slate-600 font-medium">
              {t('Electric Buggy Farm Rides', 'Lawatan Buggy Elektrik')}
            </span>
          </div>

          <div className="text-center p-3">
            <span className="font-display font-extrabold text-3xl sm:text-4xl text-coffee-700 block">13+</span>
            <span className="text-xs sm:text-sm text-slate-600 font-medium">
              {t('Handcrafted Drink Selections', 'Pilihan Minuman Legasi Coffee')}
            </span>
          </div>

          <div className="text-center p-3">
            <span className="font-display font-extrabold text-3xl sm:text-4xl text-agro-800 block">100+</span>
            <span className="text-xs sm:text-sm text-slate-600 font-medium">
              {t('Pavilion Seating Capacity', 'Kapasiti Dewan Berbumbung')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
