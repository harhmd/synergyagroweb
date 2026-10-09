import React from 'react';
import { 
  Trees, 
  Coffee, 
  Users, 
  Sparkles, 
  Sun, 
  MapPin, 
  Calendar,
  CheckCircle2,
  ChevronRight,
  Car,
  Utensils,
  GraduationCap
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FarmExperienceProps {
  onOpenBooking: () => void;
  onOpenGallery: (idx: number) => void;
}

export const FarmExperience: React.FC<FarmExperienceProps> = ({ onOpenBooking, onOpenGallery }) => {
  const { t } = useLanguage();

  return (
    <section id="experience" className="py-20 lg:py-28 bg-[#faf7f2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-agro-100 text-agro-900 text-xs font-bold uppercase tracking-wider mb-4 border border-agro-200">
            <Trees className="w-4 h-4 text-agro-700" />
            <span>{t('Bukit Katil Melaka Experience', 'Aktiviti Menarik Di Bukit Katil')}</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
            {t('Explore, Taste & Experience', 'Terokai, Rasai & Alami')}{' '}
            <span className="text-gradient-agro">
              {t('Agro Life at Synergy Agro Farm', 'Keindahan Ladang Synergy Agro Farm')}
            </span>
          </h2>

          <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
            {t(
              'From electric buggy rides through green orchards to spacious covered dining pavilions and interactive workshops, SAF offers unforgettable experiences for the whole family.',
              'Daripada lawatan buggy elektrik melawat kebun hingga ke dewan makan berbumbung yang luas berangin dan bengkel masakan interaktif, SAF menyediakan pengalaman lengkap untuk semua.'
            )}
          </p>
        </div>

        {/* 4 Major Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Electric Buggy Rides (AG 1 & AG 2) */}
          <div className="bg-white rounded-3xl overflow-hidden border border-agro-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
            <div 
              className="h-52 overflow-hidden relative cursor-pointer"
              onClick={() => onOpenGallery(0)} // saf-buggy-ride.jpg
            >
              <img
                src="/images/saf-buggy-ride.jpg"
                alt="SAF Electric Buggies AG 1 and AG 2"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute bottom-3 left-4 text-white font-bold text-xs flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-amber-400" />
                {t('Electric Buggy & Tram Tour', 'Lawatan Buggy Elektrik & Tram')}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider block mb-1">
                  SAF AG 1 & AG 2
                </span>
                <h3 className="font-display font-bold text-lg text-slate-900 mb-2">
                  {t('Farm Buggy Rides', 'Pusing Ladang Naik Buggy')}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t(
                    'Hop on our stylish electric buggies AG 1, AG 2 and roofed tram carriage for an effortless scenic ride around our fruit trees and nursery.',
                    'Naiki buggy elektrik khas SAF AG 1, AG 2 dan trem berkanopi untuk lawatan mengelilingi ladang dan pokok buah dengan selesa.'
                  )}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-agro-700 font-semibold">
                <span>{t('Family Friendly', 'Sesuai Seisi Keluarga')}</span>
                <button 
                  onClick={onOpenBooking}
                  className="text-agro-800 font-bold hover:underline"
                >
                  {t('Book Ride →', 'Tempah →')}
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Covered Event & Dining Pavilion */}
          <div className="bg-white rounded-3xl overflow-hidden border border-agro-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
            <div 
              className="h-52 overflow-hidden relative cursor-pointer"
              onClick={() => onOpenGallery(1)} // saf-event-hall.jpg
            >
              <img
                src="/images/saf-event-hall.jpg"
                alt="Spacious Covered Event & Dining Pavilion"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute bottom-3 left-4 text-white font-bold text-xs flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-emerald-400" />
                {t('Spacious Covered Pavilion', 'Dewan Terbuka Berbumbung')}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block mb-1">
                  Giant Industrial Fans
                </span>
                <h3 className="font-display font-bold text-lg text-slate-900 mb-2">
                  {t('Grand Dining & Event Hall', 'Ruang Santai & Acara Luas')}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t(
                    'Huge high-ceiling ventilated hall equipped with industrial cooling fans, sofa lounge sets, and dining tables for meals, meetings, and gatherings.',
                    'Dewan terbuka berbumbung tinggi dilengkapi kipas gergasi sejuk, set sofa santai dan meja jamuan untuk santapan atau majlis perjumpaan.'
                  )}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-semibold">
                <span>{t('Capacity: 100+ Guests', 'Kapasiti 100+ Tetamu')}</span>
                <button 
                  onClick={() => onOpenGallery(2)}
                  className="text-emerald-800 font-bold hover:underline"
                >
                  {t('Dusk View', 'Foto Senja')}
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Hands-on Workshops & Classes */}
          <div className="bg-white rounded-3xl overflow-hidden border border-agro-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
            <div 
              className="h-52 overflow-hidden relative cursor-pointer"
              onClick={() => onOpenGallery(3)} // saf-workshop-class.jpg
            >
              <img
                src="/images/saf-workshop-class.jpg"
                alt="Hands-on Culinary & Agriculture Workshops"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute bottom-3 left-4 text-white font-bold text-xs flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
                {t('Workshops & Learning', 'Bengkel & Edu-Aktiviti')}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider block mb-1">
                  Interactive Classes
                </span>
                <h3 className="font-display font-bold text-lg text-slate-900 mb-2">
                  {t('Culinary & Farm Workshops', 'Kelas Masakan & Penanaman')}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t(
                    'Engage in hands-on food crafting and gardening workshops hosted at SAF. Great for team building, schools, and weekend learners.',
                    'Sertai bengkel masakan interaktif dan perkongsian ilmu pertanian di SAF. Sesuai untuk program team-building dan rombongan sekolah.'
                  )}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-purple-700 font-semibold">
                <span>{t('Group Bookings Available', 'Terbuka Untuk Kumpulan')}</span>
                <button 
                  onClick={onOpenBooking}
                  className="text-purple-800 font-bold hover:underline"
                >
                  {t('Inquire →', 'Tanya →')}
                </button>
              </div>
            </div>
          </div>

          {/* Card 4: Shaded Nursery Walkways & Plant Aisles */}
          <div className="bg-white rounded-3xl overflow-hidden border border-agro-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
            <div 
              className="h-52 overflow-hidden relative cursor-pointer"
              onClick={() => onOpenGallery(4)} // saf-nursery-aisle.jpg
            >
              <img
                src="/images/saf-nursery-aisle.jpg"
                alt="Greenhouse Nursery Aisles with Hanging Pots"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute bottom-3 left-4 text-white font-bold text-xs flex items-center gap-1.5">
                <Trees className="w-3.5 h-3.5 text-emerald-400" />
                {t('Nursery Aisles & Hanging Pots', 'Laluan Pokok Gantung')}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block mb-1">
                  RM10 Special Pots
                </span>
                <h3 className="font-display font-bold text-lg text-slate-900 mb-2">
                  {t('Shaded Walkway Trails', 'Jalan Santai Di Bawah Jaring')}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t(
                    'Stroll beneath canopy netting along clean gravel beds lined with hanging decorative pots and hundreds of thriving grafted saplings.',
                    'Laluan batu kelikir bersih tanpa lumpur di bawah jaring teduhan dihiasi deretan pokok gantung cantik bermula serendah RM10.'
                  )}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-agro-700 font-semibold">
                <span>{t('Free Entry Daily', 'Masuk Percuma Setiap Hari')}</span>
                <a href="#nursery" className="text-agro-800 font-bold hover:underline">
                  {t('View Plants →', 'Lihat Pokok →')}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Callout Banner: Experience Synergy Agro Farm */}
        <div className="mt-14 rounded-3xl bg-gradient-to-r from-agro-950 via-agro-900 to-agro-950 text-white p-8 sm:p-10 border border-agro-700/60 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center flex-shrink-0">
              <Car className="w-8 h-8 text-amber-300" />
            </div>
            <div>
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block mb-1">
                {t('Complete Agro-Tourism Hub in Melaka', 'Pusat Agro Pelancongan Lengkap di Melaka')}
              </span>
              <h4 className="text-xl sm:text-2xl font-bold text-white font-display">
                {t('Ready for Buggy Rides, Fresh Coffee & Green Living?', 'Jom Naik Buggy, Minum Kopi & Hayati Kehijauan?')}
              </h4>
              <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
                {t(
                  'Book a family buggy ride or reserve dining tables in our breezy covered pavilion hall at Bukit Katil.',
                  'Tempah giliran lawatan buggy atau tempah meja santai di dewan terbuka luas kami di Bukit Katil.'
                )}
              </p>
            </div>
          </div>

          <button
            onClick={onOpenBooking}
            className="w-full md:w-auto px-7 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-coffee-950 font-extrabold text-sm rounded-2xl shadow-lg shadow-amber-500/25 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            {t('Schedule Visit / Book Buggy', 'Rancang Lawatan / Tempah Buggy')}
          </button>
        </div>
      </div>
    </section>
  );
};
