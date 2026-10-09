import React from 'react';
import { 
  Coffee, 
  Apple, 
  Sprout, 
  Layers, 
  ArrowUpRight, 
  CheckCircle2, 
  ShieldCheck,
  HeartHandshake
} from 'lucide-react';
import { FARM_PILLARS } from '../data/content';
import { useLanguage } from '../context/LanguageContext';

interface AboutSAFProps {
  onOpenBooking: () => void;
  onOpenGallery: (idx: number) => void;
}

export const AboutSAF: React.FC<AboutSAFProps> = ({ onOpenBooking, onOpenGallery }) => {
  const { t, lang } = useLanguage();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coffee':
        return <Coffee className="w-7 h-7 text-amber-500" />;
      case 'Apple':
        return <Apple className="w-7 h-7 text-lime-500" />;
      case 'Sprout':
        return <Sprout className="w-7 h-7 text-emerald-400" />;
      case 'Shovel':
      default:
        return <Layers className="w-7 h-7 text-amber-400" />;
    }
  };

  return (
    <section id="pillars" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-agro-50 border border-agro-200 text-agro-800 text-xs font-bold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4 text-agro-600" />
            {t('The 4 Core Pillars of SAF', '4 Teras Utama Synergy Agro Farm')}
          </div>
          
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
            {t('Everything You Need For', 'Segala Keperluan Untuk')}{' '}
            <span className="text-gradient-agro">
              {t('Green Living & Great Moments', 'Kehidupan Hijau & Detik Santai')}
            </span>
          </h2>

          <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
            {t(
              'Direct from our Bukit Katil entrance signage: We combine healthy nursery botany, organic farming supplies, farm-fresh fruit harvests, and handcrafted cafe refreshments under one roof.',
              'Berdasarkan teras rasmi papan tanda kami di Bukit Katil: Kami menggabungkan botani nurseri, tanah & baja organik, buah-buahan segar, dan minuman kafe artisan di bawah satu bumbung.'
            )}
          </p>
        </div>

        {/* 4 Pillars Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FARM_PILLARS.map((pillar, index) => (
            <div
              key={pillar.id}
              className="group relative bg-[#faf8f5] hover:bg-white rounded-3xl p-7 border border-agro-100 hover:border-agro-300 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                {/* Header with Icon and Tag */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-agro-950 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    {getIcon(pillar.icon)}
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-agro-100 text-agro-800 border border-agro-200">
                    {pillar.tag}
                  </span>
                </div>

                <div className="mb-2">
                  <span className="text-xs font-semibold text-coffee-700 uppercase tracking-wider block">
                    {lang === 'en' ? pillar.subEn : pillar.subMs}
                  </span>
                  <h3 className="text-xl font-bold font-display text-slate-900 group-hover:text-agro-800 transition-colors">
                    {lang === 'en' ? pillar.titleEn : pillar.titleMs}
                  </h3>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {lang === 'en' ? pillar.descEn : pillar.descMs}
                </p>
              </div>

              {/* Action Link */}
              <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                <a
                  href={pillar.id === 'kafe' ? '#cafe' : '#nursery'}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-agro-700 hover:text-agro-900 group-hover:underline"
                >
                  <span>{t('Discover More', 'Ketahui Lebih Lanjut')}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                {index === 0 && (
                  <button 
                    onClick={() => onOpenGallery(1)}
                    className="text-[11px] text-slate-500 hover:text-slate-800"
                  >
                    {t('Menu Pic', 'Foto Menu')}
                  </button>
                )}
                {index === 1 && (
                  <button 
                    onClick={() => onOpenGallery(3)}
                    className="text-[11px] text-slate-500 hover:text-slate-800"
                  >
                    {t('Trees Pic', 'Foto Pokok')}
                  </button>
                )}
                {index === 2 && (
                  <button 
                    onClick={() => onOpenGallery(2)}
                    className="text-[11px] text-slate-500 hover:text-slate-800"
                  >
                    {t('Garden Pic', 'Foto Nurseri')}
                  </button>
                )}
                {index === 3 && (
                  <button 
                    onClick={() => onOpenGallery(4)}
                    className="text-[11px] text-slate-500 hover:text-slate-800"
                  >
                    {t('Soil Pic', 'Foto Tanah')}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Feature Split Banner: Authentic Heritage */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-agro-950 via-agro-900 to-emerald-950 text-white p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-300 bg-white/10 px-3 py-1 rounded-full mb-3">
                <HeartHandshake className="w-4 h-4 text-emerald-400" />
                {t('Bukit Katil, Melaka Agro Community', 'Komuniti Agro & Gaya Hidup Sihat Melaka')}
              </span>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                {t(
                  'More Than A Farm — A Relaxing Gathering Place for Families & Plant Lovers',
                  'Bukan Sekadar Ladang — Tempat Rehat & Santai Pilihan Seisi Keluarga'
                )}
              </h3>
              <p className="mt-3 text-emerald-100/90 text-sm sm:text-base leading-relaxed max-w-2xl">
                {t(
                  'Whether you are scouting high-yield fruit saplings for your backyard orchard, restocking 6-in-1 Long You organic soil, or enjoying an iced Dirty Matcha with friends, SAF Bukit Katil welcomes you 7 days a week.',
                  'Sama ada anda ingin mencari anak pokok buah kahwin berkualiti, membeli tanah organik 6-in-1 Long You untuk kebun, atau menikmati Dirty Matcha sejuk bersama rakan di kafe, SAF Bukit Katil dibuka 7 hari seminggu.'
                )}
              </p>
              
              <div className="mt-6 flex flex-wrap gap-4 text-xs font-medium text-emerald-200">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  {t('Free Nursery Entry & Farm Walk', 'Masuk & Lawatan Nurseri Percuma')}
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  {t('Expert Planting Guidance', 'Bimbingan Khidmat Nasihat Penanaman')}
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  {t('Wheelchair & Family Friendly', 'Mesra Kanak-kanak & Keluarga')}
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                onClick={onOpenBooking}
                className="w-full py-4 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-agro-950 font-bold text-center transition-all shadow-lg shadow-emerald-500/30 hover:scale-[1.02]"
              >
                {t('Plan Your Visit Today', 'Rancang Kunjungan Anda')}
              </button>
              <a
                href="https://wa.me/60184633326?text=Hai%20Synergy%20Agro%20Farm,%20saya%20ingin%20bertanya%20tentang%20lawatan%20dan%20stok%20nurseri"
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 px-6 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-center border border-white/20 transition-all"
              >
                {t('WhatsApp Inquiry', 'Pertanyaan WhatsApp')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
