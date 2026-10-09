import React from 'react';
import { X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/content';
import { useLanguage } from '../context/LanguageContext';

interface GalleryModalProps {
  isOpen: boolean;
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({
  isOpen,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  const currentItem = GALLERY_ITEMS[currentIndex] || GALLERY_ITEMS[0];

  const handlePrev = () => {
    onNavigate((currentIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  };

  const handleNext = () => {
    onNavigate((currentIndex + 1) % GALLERY_ITEMS.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all z-10"
        aria-label="Close Photo Gallery"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Main Image Container */}
      <div className="max-w-4xl w-full flex flex-col items-center">
        <div className="relative w-full max-h-[75vh] flex items-center justify-center rounded-2xl overflow-hidden bg-black/50 border border-white/10">
          <img
            src={currentItem.src}
            alt={currentItem.title}
            className="max-h-[72vh] w-auto object-contain rounded-xl"
          />

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-md transition-all border border-white/10"
            aria-label="Previous Photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-md transition-all border border-white/10"
            aria-label="Next Photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Caption & Navigation Dots */}
        <div className="mt-4 text-center text-white max-w-xl">
          <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-1 border border-emerald-400/30">
            {currentItem.category} • {currentIndex + 1} of {GALLERY_ITEMS.length}
          </div>
          <h4 className="font-display font-bold text-lg">{currentItem.title}</h4>
          <p className="text-xs text-slate-300 mt-0.5">{currentItem.desc}</p>
        </div>

        {/* Thumbnail Selector */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto p-1 max-w-full">
          {GALLERY_ITEMS.map((item, idx) => (
            <button
              key={item.src}
              onClick={() => onNavigate(idx)}
              className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                idx === currentIndex
                  ? 'border-emerald-400 scale-105 shadow-md shadow-emerald-500/40'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
