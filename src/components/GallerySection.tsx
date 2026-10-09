import React, { useState } from 'react';
import { Camera, ZoomIn, Eye, Sparkles, Crown } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/content';
import { useLanguage } from '../context/LanguageContext';

interface GallerySectionProps {
  onOpenGallery: (idx: number) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onOpenGallery }) => {
  const { t, lang } = useLanguage();
  const [filter, setFilter] = useState<string>('all');

  const filterTabs = [
    { id: 'all', labelEn: 'All Photos (12)', labelMs: 'Semua Foto (12)' },
    { id: 'tyt', labelEn: '👑 TYT Melaka Inauguration', labelMs: '👑 Perasmian TYT Melaka' },
    { id: 'tour', labelEn: '🚜 Buggy & Farm Tour', labelMs: '🚜 Buggy & Lawatan' },
    { id: 'hall', labelEn: '🏛️ Covered Pavilion Hall', labelMs: '🏛️ Dewan Berbumbung' },
    { id: 'nursery', labelEn: '🪴 Nursery & Greenhouse', labelMs: '🪴 Nurseri & Kebun' },
    { id: 'cafe', labelEn: '☕ Legasi Cafe & Signs', labelMs: '☕ Kafe & Tanda' },
  ];

  const filteredGallery = GALLERY_ITEMS.map((item, index) => ({ ...item, originalIndex: index })).filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'tyt') return item.category.toLowerCase().includes('tyt') || item.category.toLowerCase().includes('perasmian');
    if (filter === 'tour') return item.category.toLowerCase().includes('buggy') || item.category.toLowerCase().includes('workshop');
    if (filter === 'hall') return item.category.toLowerCase().includes('hall') || item.category.toLowerCase().includes('pavilion');
    if (filter === 'nursery') return item.category.toLowerCase().includes('nursery') || item.category.toLowerCase().includes('trees') || item.category.toLowerCase().includes('soil') || item.category.toLowerCase().includes('greenhouse');
    if (filter === 'cafe') return item.category.toLowerCase().includes('cafe') || item.category.toLowerCase().includes('entrance');
    return true;
  });

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-agro-50 border border-agro-200 text-agro-800 text-xs font-bold uppercase tracking-wider mb-4">
            <Camera className="w-4 h-4 text-agro-600" />
            <span>{t('Authentic Photo Showcase (12 Photos)', 'Koleksi Foto Sebenar SAF (12 Foto)')}</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
            {t('Real Life at', 'Suasana Sebenar di')}{' '}
            <span className="text-gradient-agro">
              Synergy Agro Farm
            </span>
          </h2>

          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            {t(
              'Browse all 12 authentic photographs including the royal inauguration by TYT Yang di-Pertua Negeri Melaka, electric buggies AG 1 & AG 2, spacious dining pavilion, and Legasi Coffee.',
              'Lihat 12 foto sebenar merangkumi perasmian oleh TYT Yang di-Pertua Negeri Melaka, armada buggy elektrik AG 1 & 2, dewan terbuka kipas gergasi, dan kopi artisan Legasi Coffee.'
            )}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                filter === tab.id
                  ? 'bg-agro-800 text-white shadow-md scale-105'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {lang === 'en' ? tab.labelEn : tab.labelMs}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.src}
              onClick={() => onOpenGallery(item.originalIndex)}
              className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 border border-agro-100 bg-slate-100 h-72 flex flex-col justify-end"
            >
              <img
                src={item.src}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Category Pill */}
              <div className="absolute top-4 left-4 z-10">
                <span className={`px-3 py-1 rounded-full backdrop-blur-md font-bold text-[11px] shadow-sm ${
                  item.category.includes('TYT') 
                    ? 'bg-amber-400 text-slate-950 border border-amber-300' 
                    : 'bg-white/90 text-agro-950'
                }`}>
                  {item.category}
                </span>
              </div>

              {/* Zoom Hover Icon */}
              <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4" />
              </div>

              {/* Text Caption at Bottom */}
              <div className="relative p-5 text-white z-10">
                <h4 className="font-display font-bold text-base sm:text-lg leading-snug drop-shadow-sm group-hover:text-emerald-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-200 mt-1 line-clamp-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
