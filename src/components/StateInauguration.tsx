import React from 'react';
import { Award, CheckCircle2, Crown, Sparkles, Building2, GraduationCap, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface StateInaugurationProps {
  onOpenGallery: (idx: number) => void;
  onOpenBooking: () => void;
}

export const StateInauguration: React.FC<StateInaugurationProps> = ({ onOpenGallery, onOpenBooking }) => {
  const { t } = useLanguage();

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white via-[#f9f7f2] to-white relative overflow-hidden border-y border-amber-200/50">
      {/* Decorative Golden Ambient Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Prestige Header Badge */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-extrabold uppercase tracking-wider mb-4 shadow-sm">
            <Crown className="w-4 h-4 text-amber-600 fill-amber-500" />
            <span>{t('Official State Inauguration & Endorsement', 'Perasmian Rasmi & Pengiktirafan Negeri Melaka')}</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
            {t('Officially Inaugurated by', 'Disempurnakan & Dirasmikan Oleh')}{' '}
            <span className="text-amber-800 underline decoration-amber-400 decoration-wavy decoration-2">
              TYT Yang di-Pertua Negeri Melaka
            </span>
          </h2>

          <p className="mt-4 text-slate-700 text-base sm:text-lg leading-relaxed">
            {t(
              'Synergy Agro Farm (SAF) Bukit Katil was proudly inaugurated by His Excellency Tun Seri Setia Dr. Haji Mohd Ali bin Mohd Rustam, Yang di-Pertua Negeri Melaka, also establishing SAF as the official Pusat Latihan Agrofarm UGM - KADMDI.',
              'Synergy Agro Farm (SAF) Bukit Katil telah dirasmikan secara gilang-gemilang oleh Tuan Yang Terutama Tun Seri Setia Dr. Haji Mohd Ali bin Mohd Rustam, Yang di-Pertua Negeri Melaka, yang turut memaktubkan SAF sebagai Pusat Latihan Agrofarm UGM - KADMDI.'
            )}
          </p>
        </div>

        {/* 2-Card Prestige Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* Card 1: TYT Signing Plaque Moment (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl overflow-hidden border border-amber-200/80 shadow-xl flex flex-col justify-between group">
            <div 
              className="relative h-80 sm:h-96 overflow-hidden cursor-pointer bg-slate-900"
              onClick={() => onOpenGallery(0)} // saf-perasmian-tyt-signing.jpg
            >
              <img
                src="/images/saf-perasmian-tyt-signing.jpg"
                alt="TYT Tun Seri Setia Dr. Haji Mohd Ali signing the inauguration plaque at Synergy Agro Farm"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Plaque Signing Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3.5 py-1.5 rounded-full bg-amber-500/90 text-slate-950 font-bold text-xs shadow-md backdrop-blur-md flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-slate-950" />
                  {t('Historic Signing Moment', 'Detik Bersejarah Menandatangani Plak')}
                </span>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-amber-300 text-xs font-bold uppercase tracking-wider block">
                  Plak Emas Perasmian Rasmi
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl mt-1">
                  Synergy Agro Farm & Pusat Latihan Agrofarm UGM - KADMDI
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">
                <Building2 className="w-4 h-4 text-emerald-600" />
                <span>Universiti Geomatika Malaysia (UGM) • KADMDI • SAF</span>
              </div>
              <h4 className="font-display font-bold text-xl text-slate-900">
                {t(
                  'Two Prestigious Golden Commemorative Plaques',
                  'Dua Plak Emas Peringatan Perasmian Rasmi'
                )}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                {t(
                  'Signed on-site in Bukit Katil: One honoring the launch of Synergy Agro Farm, and the second commemorating SAF as the official Agrofarm Training Centre (Pusat Latihan Agrofarm) in collaboration with Universiti Geomatika Malaysia and KADMDI.',
                  'Ditandatangani secara rasmi di Bukit Katil: Satu plak bagi perasmian Synergy Agro Farm, dan satu lagi bagi Pusat Latihan Agrofarm hasil jalinan kerjasama Universiti Geomatika Malaysia dan KADMDI.'
                )}
              </p>
            </div>
          </div>

          {/* Card 2: Certificate Presentation & Training Facility (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-agro-950 via-agro-900 to-agro-950 text-white rounded-3xl overflow-hidden shadow-xl border border-agro-800 flex flex-col justify-between group">
            <div 
              className="relative h-64 sm:h-72 overflow-hidden cursor-pointer bg-slate-900"
              onClick={() => onOpenGallery(1)} // saf-penyampaian-sijil-tyt.jpg
            >
              <img
                src="/images/saf-penyampaian-sijil-tyt.jpg"
                alt="TYT Tun Seri Setia Dr. Haji Mohd Ali presenting certificate at Synergy Agro Farm"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-white/20 text-white font-bold text-xs backdrop-blur-md flex items-center gap-1.5 border border-white/20">
                  <GraduationCap className="w-4 h-4 text-amber-300" />
                  {t('Certificate Presentation', 'Penyampaian Sijil')}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                  Pusat Latihan Agro & Kulinari
                </span>
                <h4 className="font-display font-bold text-xl text-white">
                  {t(
                    'Empowering Community & Youth Through Agro-Skills',
                    'Memperkasakan Komuniti Melalui Kemahiran Agro & Kulinari'
                  )}
                </h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {t(
                    'TYT Yang di-Pertua Negeri Melaka personally presented certificates of participation to course graduates, affirming SAF’s commitment to education, modern farming, and culinary arts.',
                    'TYT Yang di-Pertua Negeri Melaka menyempurnakan penyerahan sijil penyertaan kepada para peserta kursus kulinari dan pertanian moden di SAF.'
                  )}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-amber-200 font-semibold">
                  {t('Certified Training Centre', 'Pusat Latihan Diiktiraf')}
                </span>
                <button
                  onClick={onOpenBooking}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1"
                >
                  <span>{t('Join Courses', 'Sertai Kursus')}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillar Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-amber-50/60 p-6 rounded-3xl border border-amber-200/60">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold flex-shrink-0 shadow-md">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-slate-900 text-sm">
                {t('State-Level Recognition', 'Dirasmikan TYT Melaka')}
              </h5>
              <p className="text-xs text-slate-600">
                {t('Tun Seri Setia Dr. Haji Mohd Ali', 'Disempurnakan pada perasmian rasmi')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-md">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-slate-900 text-sm">
                {t('Pusat Latihan Agrofarm', 'Pusat Latihan UGM-KADMDI')}
              </h5>
              <p className="text-xs text-slate-600">
                {t('Universiti Geomatika Malaysia', 'Pusat latihan & bengkel kemahiran')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-agro-900 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-md">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h5 className="font-bold text-slate-900 text-sm">
                {t('Bukit Katil Landmark', 'Mercu Tanda Bukit Katil')}
              </h5>
              <p className="text-xs text-slate-600">
                {t('Agro-tourism, Nursery & Cafe', 'Agro-pelancongan, nurseri & kafe')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
