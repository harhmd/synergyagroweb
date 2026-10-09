import React, { useState } from 'react';
import { 
  Coffee, 
  Sparkles, 
  Flame, 
  Snowflake, 
  Plus, 
  ShoppingBag, 
  Check, 
  ExternalLink,
  Heart,
  Droplet
} from 'lucide-react';
import { DRINKS_DATA, DrinkItem } from '../data/content';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

interface CafeSectionProps {
  onOpenGallery: (idx: number) => void;
}

export const CafeSection: React.FC<CafeSectionProps> = ({ onOpenGallery }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedVariants, setSelectedVariants] = useState<Record<string, 'iced' | 'hot'>>({});
  const [addedItemEffect, setAddedItemEffect] = useState<string | null>(null);

  const { addToCart, setIsCartOpen } = useCart();
  const { t, lang } = useLanguage();

  const categories = [
    { id: 'all', labelEn: 'All Drinks', labelMs: 'Semua Minuman' },
    { id: 'matcha', labelEn: '🍵 Matcha Series', labelMs: '🍵 Siri Matcha' },
    { id: 'coffee', labelEn: '☕ Espresso & Lattes', labelMs: '☕ Kopi & Latte' },
    { id: 'local', labelEn: '🇲🇾 Malaysian Heritage', labelMs: '🇲🇾 Kopi Tradisi' },
    { id: 'specialty', labelEn: '🍫 Chocolate & Others', labelMs: '🍫 Coklat & Lain-lain' },
  ];

  const filteredDrinks = DRINKS_DATA.filter((drink) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'specialty') return drink.category === 'specialty' || drink.category === 'refresh';
    return drink.category === activeCategory;
  });

  const getVariant = (drink: DrinkItem) => {
    return selectedVariants[drink.id] || (drink.hotPrice && !drink.badge?.includes('Iced Only') ? 'iced' : 'iced');
  };

  const setVariant = (drinkId: string, variant: 'iced' | 'hot') => {
    setSelectedVariants((prev) => ({ ...prev, [drinkId]: variant }));
  };

  const getPrice = (drink: DrinkItem) => {
    const variant = getVariant(drink);
    if (variant === 'hot' && drink.hotPrice !== undefined) {
      return drink.hotPrice;
    }
    return drink.icedPrice;
  };

  const handleAddToCart = (drink: DrinkItem) => {
    const variant = getVariant(drink);
    const price = getPrice(drink);
    addToCart({
      productId: drink.id,
      name: drink.name,
      variant,
      price,
      image: drink.image,
    });

    setAddedItemEffect(drink.id);
    setTimeout(() => setAddedItemEffect(null), 1200);
  };

  return (
    <section id="cafe" className="py-20 lg:py-32 bg-[#faf6f0] relative overflow-hidden">
      {/* Decorative coffee bean background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-coffee-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Legasi Coffee identity */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-coffee-800 text-amber-200 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Coffee className="w-4 h-4 text-amber-400" />
            <span>LEGASI COFFEE • HERITAGE IN EVERY CUP</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
            {t('More Than Just Coffee,', 'Lebih Daripada Sekadar Kopi,')}{' '}
            <span className="text-gradient-coffee font-serif italic">
              {t('A Brighter Tomorrow', 'Hari Esok Yang Ceria')}
            </span>
          </h2>

          <p className="mt-4 text-slate-700 text-base sm:text-lg leading-relaxed">
            {t(
              'Handcrafted with premium ingredients, locally inspired, and naturally brewed. Enjoy your favourite iced matcha, creamy Spanish latte, or authentic Kopi O surrounded by the greenery of Synergy Agro Farm.',
              'Bahan berkualiti premium, diinspirasikan citarasa tempatan, dibancuh segar. Nikmati matcha dingin, latte berkrim, atau kopi tradisi di tengah kehijauan sejuk SAF Bukit Katil.'
            )}
          </p>

          {/* Quick Trigger to view original poster */}
          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              onClick={() => onOpenGallery(1)}
              className="inline-flex items-center gap-2 text-xs font-bold text-coffee-800 hover:text-coffee-950 bg-coffee-100 hover:bg-coffee-200 px-3.5 py-1.5 rounded-full transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{t('View Official Menu Poster', 'Lihat Poster Menu Rasmi')}</span>
            </button>
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-coffee-800 text-amber-100 shadow-md shadow-coffee-900/20 scale-105'
                  : 'bg-white hover:bg-coffee-50 text-slate-700 border border-coffee-200/80'
              }`}
            >
              {lang === 'en' ? cat.labelEn : cat.labelMs}
            </button>
          ))}
        </div>

        {/* Drink Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDrinks.map((drink) => {
            const currentVariant = getVariant(drink);
            const currentPrice = getPrice(drink);
            const hasBothOptions = drink.hotPrice !== undefined;
            const isAdded = addedItemEffect === drink.id;

            return (
              <div
                key={drink.id}
                className="bg-white rounded-3xl p-6 border border-coffee-100 shadow-sm hover:shadow-xl hover:border-coffee-300 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar: Badge and Category */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      {drink.category}
                    </span>

                    {drink.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-600" />
                        {drink.badge}
                      </span>
                    )}
                  </div>

                  {/* Drink Name & Description */}
                  <h3 className="font-display font-bold text-xl text-slate-900 group-hover:text-coffee-800 transition-colors">
                    {drink.name}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {lang === 'en' ? drink.descriptionEn : drink.descriptionMs}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  {/* Hot / Iced Selector if available */}
                  {hasBothOptions ? (
                    <div className="flex items-center gap-2 mb-4 bg-slate-100 p-1 rounded-xl">
                      <button
                        onClick={() => setVariant(drink.id, 'iced')}
                        className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          currentVariant === 'iced'
                            ? 'bg-blue-50 text-blue-800 shadow-sm border border-blue-200'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <Snowflake className="w-3.5 h-3.5 text-blue-500" />
                        <span>Iced (RM {drink.icedPrice})</span>
                      </button>

                      <button
                        onClick={() => setVariant(drink.id, 'hot')}
                        className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          currentVariant === 'hot'
                            ? 'bg-amber-50 text-amber-800 shadow-sm border border-amber-200'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <Flame className="w-3.5 h-3.5 text-amber-600" />
                        <span>Hot (RM {drink.hotPrice})</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 mb-4 text-xs font-semibold text-blue-800 bg-blue-50/80 px-2.5 py-1.5 rounded-xl border border-blue-100">
                      <Snowflake className="w-3.5 h-3.5 text-blue-600" />
                      <span>{t('Served Iced Only', 'Hidangan Sejuk')}</span>
                    </div>
                  )}

                  {/* Price & Add to Cart button */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-slate-500 block leading-tight font-medium">
                        {currentVariant === 'iced' ? t('Iced Price', 'Harga Sejuk') : t('Hot Price', 'Harga Panas')}
                      </span>
                      <span className="text-xl font-extrabold text-slate-900 font-display">
                        RM {currentPrice.toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAddToCart(drink)}
                      className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs transition-all duration-200 active:scale-95 ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-coffee-800 hover:bg-coffee-900 text-amber-100 hover:text-white shadow-md'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4 text-white" />
                          <span>{t('Added!', 'Ditambah!')}</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>{t('Add Order', 'Pesan')}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Order Action Banner */}
        <div className="mt-14 rounded-3xl bg-gradient-to-r from-coffee-900 via-coffee-800 to-[#1a0c05] text-amber-100 p-8 sm:p-10 border border-coffee-700/60 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center flex-shrink-0">
              <ShoppingBag className="w-8 h-8 text-amber-300" />
            </div>
            <div>
              <h4 className="text-xl sm:text-2xl font-bold text-white font-display">
                {t('Ready to Enjoy Artisanal Legasi Coffee?', 'Sedia Menikmati Kopi & Matcha Segar?')}
              </h4>
              <p className="text-amber-200/80 text-sm mt-1 max-w-xl">
                {t(
                  'Order in advance for quick dine-in or drive-thru pickup at Synergy Agro Farm Bukit Katil.',
                  'Pesan awal untuk dinikmati di gazebo taman atau bungkus semasa singgah di nurseri.'
                )}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-coffee-950 font-extrabold text-sm rounded-2xl shadow-lg shadow-amber-500/25 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            {t('View My Order & Send WhatsApp', 'Buka Pesanan & Hantar WhatsApp')}
          </button>
        </div>
      </div>
    </section>
  );
};
