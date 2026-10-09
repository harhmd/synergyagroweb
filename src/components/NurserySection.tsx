import React, { useState } from 'react';
import { 
  Sprout, 
  Layers, 
  Search, 
  Sparkles, 
  Phone, 
  HelpCircle, 
  CheckCircle,
  ExternalLink,
  ShieldCheck,
  ShoppingBag
} from 'lucide-react';
import { NURSERY_DATA, NurseryItem } from '../data/content';
import { useLanguage } from '../context/LanguageContext';

interface NurserySectionProps {
  onOpenGallery: (idx: number) => void;
  onOpenBooking: () => void;
}

export const NurserySection: React.FC<NurserySectionProps> = ({ onOpenGallery, onOpenBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { t, lang } = useLanguage();

  const categories = [
    { id: 'all', labelEn: 'All Nursery & Soil', labelMs: 'Semua Nurseri & Baja' },
    { id: 'fruit', labelEn: '🥭 Fruit Tree Saplings', labelMs: '🥭 Anak Pokok Buah Kahwin' },
    { id: 'ornamental', labelEn: '🪴 Ornamental & Flowers', labelMs: '🪴 Pokok Bunga & Hiasan' },
    { id: 'soil', labelEn: '🌾 Soil & Fertilizers', labelMs: '🌾 Tanah & Baja Long You' },
  ];

  const filteredItems = NURSERY_DATA.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesQuery = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.descriptionEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.descriptionMs.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const sendWhatsAppInquiry = (item: NurseryItem) => {
    const text = encodeURIComponent(
      `Hai Synergy Agro Farm (SAF) Bukit Katil! Saya berminat untuk bertanya tentang stok/pembelian bagi:\n*${item.name}*\nHarga: ${item.price}\n\nAdakah stok ini sedia ada di nurseri? Terima kasih!`
    );
    window.open(`https://wa.me/60184633326?text=${text}`, '_blank');
  };

  return (
    <section id="nursery" className="py-20 lg:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-agro-100 text-agro-900 text-xs font-bold uppercase tracking-wider mb-4 border border-agro-200">
            <Sprout className="w-4 h-4 text-agro-700" />
            <span>{t('Nursery & Agricultural Supplies', 'Nurseri & Bekalan Pertanian SAF')}</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
            {t('Cultivate Your Garden With', 'Suburkan Laman Kebun Anda Bersama')}{' '}
            <span className="text-gradient-agro">
              {t('Premium Nursery Stock', 'Baka & Tanah Terbaik')}
            </span>
          </h2>

          <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
            {t(
              'Browse healthy polybag saplings, hanging pots, and genuine Long You 6-in-1 organic planting soil directly from our Bukit Katil nursery grounds.',
              'Pilihan anak pokok buah kahwin sihat, tanaman hiasan baka rimbun, dan stok sah Tanah Tanaman Organik Long You 6-in-1 terus dari ladang kami di Bukit Katil.'
            )}
          </p>
        </div>

        {/* Filter Bar & Search Input */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-100">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                  selectedCategory === cat.id
                    ? 'bg-agro-800 text-white shadow-md shadow-agro-900/15'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {lang === 'en' ? cat.labelEn : cat.labelMs}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t('Search plants or soil...', 'Cari pokok atau tanah...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-agro-500 focus:border-transparent bg-slate-50"
            />
          </div>
        </div>

        {/* Nursery Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-agro-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Product Image Container */}
                <div className="relative h-60 overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  
                  {/* Tag Pill */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-agro-950/80 backdrop-blur-md text-emerald-300 text-[11px] font-bold border border-agro-700/50">
                      {item.tag}
                    </span>
                  </div>

                  {/* Price Banner */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <span className="text-lg font-extrabold font-display drop-shadow-md">
                      {item.price}
                    </span>
                    <span className="text-xs bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
                      {item.category.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6">
                  <span className="text-[11px] font-semibold text-agro-700 tracking-wider uppercase block mb-1">
                    {item.specs}
                  </span>
                  <h3 className="font-display font-bold text-xl text-slate-900 group-hover:text-agro-800 transition-colors">
                    {item.name}
                  </h3>
                  <p className="mt-2.5 text-xs text-slate-600 leading-relaxed">
                    {lang === 'en' ? item.descriptionEn : item.descriptionMs}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => sendWhatsAppInquiry(item)}
                  className="w-full py-3 px-4 rounded-xl bg-agro-50 hover:bg-agro-100 text-agro-900 font-bold text-xs flex items-center justify-center gap-2 border border-agro-200 transition-all hover:border-agro-400 active:scale-95"
                >
                  <Phone className="w-3.5 h-3.5 text-agro-700" />
                  <span>{t('Inquire via WhatsApp', 'Tanya Stok di WhatsApp')}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Educational Gardening & Soil Tips Card */}
        <div className="mt-16 rounded-3xl bg-[#f4f8f4] border border-agro-200 p-8 sm:p-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-agro-800 text-emerald-300 flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-bold text-xl text-slate-900">
                {t('Tips from SAF Agronomy Team', 'Tip Penanaman Daripada Pakar SAF')}
              </h4>
              <p className="text-xs text-slate-600">
                {t('Bukit Katil Nursery planting practices for maximum yield', 'Amalan terbaik tanaman kebun untuk hasil optimum')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white rounded-2xl p-5 border border-agro-100 shadow-sm">
              <span className="w-7 h-7 rounded-full bg-agro-100 text-agro-800 font-bold text-xs flex items-center justify-center mb-3">1</span>
              <h5 className="font-bold text-slate-900 text-sm mb-1">
                {t('Soil Preparation with Long You 6-in-1', 'Penyediaan Tanah Long You 6-in-1')}
              </h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t(
                  'Mix 70% Long You organic soil with 30% local topsoil for enhanced root aeration and nutrient retention.',
                  'Campur 70% tanah organik Long You bersama 30% tanah asal untuk pengudaraan akar yang baik dan mengekalkan kelembapan.'
                )}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-agro-100 shadow-sm">
              <span className="w-7 h-7 rounded-full bg-agro-100 text-agro-800 font-bold text-xs flex items-center justify-center mb-3">2</span>
              <h5 className="font-bold text-slate-900 text-sm mb-1">
                {t('Mango Sapling Care in Polybags', 'Penjagaan Anak Pokok Mangga Polibeg')}
              </h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t(
                  'Ensure gentle watering twice daily. Keep in partial shade for 3-5 days before full sun transplanting.',
                  'Siram 2 kali sehari pagi dan petang. Letakkan di bawah teduhan selama 3-5 hari sebelum dialihkan ke tanah lapang.'
                )}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-agro-100 shadow-sm">
              <span className="w-7 h-7 rounded-full bg-agro-100 text-agro-800 font-bold text-xs flex items-center justify-center mb-3">3</span>
              <h5 className="font-bold text-slate-900 text-sm mb-1">
                {t('Organic Fertilizer Timing', 'Jadual Membaja Organik')}
              </h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t(
                  'Apply organic compost once every 2 weeks around the dripline to induce lush leafing and prolific flowering.',
                  'Taburkan baja organik setiap 2 minggu di sekeliling kanopi daun untuk menggalakkan pucuk baru dan pembungaan lebat.'
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
