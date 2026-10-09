import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Send, 
  Navigation, 
  Calendar, 
  CheckCircle2, 
  ExternalLink,
  MessageCircle,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ContactLocation: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: 'pertanyaan-umum',
    message: '',
  });

  const isOperatingNow = () => {
    const now = new Date();
    const hours = now.getHours();
    return hours >= 8 && hours < 18;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `*🌿 Mesej Laman Web Synergy Agro Farm (SAF) Bukit Katil*\n\n` +
      `*Nama:* ${formData.name}\n` +
      `*No Telefon:* ${formData.phone}\n` +
      `*Subjek:* ${formData.subject}\n` +
      `*Mesej:* ${formData.message}\n\n` +
      `Hai SAF, saya ingin mendapatkan maklumat lanjut. Terima kasih!`
    );
    window.open(`https://wa.me/60184633326?text=${text}`, '_blank');
  };

  const openGoogleMaps = () => {
    window.open('https://www.google.com/maps/search/?api=1&query=Bukit+Katil+Melaka+Synergy+Agro+Farm', '_blank');
  };

  const openWaze = () => {
    window.open('https://waze.com/ul?q=Bukit+Katil+Melaka', '_blank');
  };

  return (
    <section id="contact" className="py-20 lg:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-agro-100 text-agro-900 text-xs font-bold uppercase tracking-wider mb-4 border border-agro-200">
            <MapPin className="w-4 h-4 text-agro-700" />
            <span>{t('Visit Us in Bukit Katil', 'Kunjungi Kami di Bukit Katil')}</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
            {t('Find Us in the Heart of', 'Lokasi Strategik Kami di')}{' '}
            <span className="text-gradient-agro">
              Bukit Katil, Melaka
            </span>
          </h2>

          <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
            {t(
              'Conveniently accessible with ample parking, fresh country air, and warm Melaka hospitality. Stop by for your plant cravings and artisanal coffee.',
              'Mudah dikunjungi dengan kawasan parkir luas, udara desa nyaman, dan keramahan Melaka. Singgah untuk anak pokok idaman dan secawan kopi aroma.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Hours, Verification, Navigation (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Live Operational Status Box */}
            <div className="bg-[#faf8f5] rounded-3xl p-6 sm:p-8 border border-agro-100 shadow-sm">
              <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className={`w-3.5 h-3.5 rounded-full ${isOperatingNow() ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'}`} />
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                      {t('Operating Status', 'Status Operasi')}
                    </span>
                    <h3 className="font-bold text-slate-900 text-lg">
                      {isOperatingNow() 
                        ? t('Open Now (Closes at 6:00 PM)', 'Buka Sekarang (Tutup 6.00 Petang)') 
                        : t('Closed Now (Opens 8:00 AM Tomorrow)', 'Tutup Sekarang (Buka 8.00 Pagi Esok)')}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
                    {t('7 Days a Week', '7 Hari Seminggu')}
                  </span>
                </div>
              </div>

              {/* Time details table */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-agro-100 text-agro-800 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-agro-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      {t('Operating Hours', 'Waktu Operasi')}
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5 font-medium">
                      Isnin – Ahad (Mon – Sun)
                    </p>
                    <p className="text-sm font-bold text-agro-800">
                      8:00 AM – 6:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      {t('Official Hotline / WhatsApp', 'Talian Rasmi / WhatsApp')}
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5 font-medium">
                      Synergy Agro Farm (SAF)
                    </p>
                    <a
                      href="https://wa.me/60184633326"
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-bold text-emerald-700 hover:underline block"
                    >
                      +60 18 463 3326
                    </a>
                  </div>
                </div>
              </div>

              {/* Navigation Action Buttons */}
              <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center gap-3">
                <button
                  onClick={openGoogleMaps}
                  className="flex-1 min-w-[140px] py-3 px-4 rounded-xl bg-agro-800 hover:bg-agro-900 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                >
                  <Navigation className="w-4 h-4 text-emerald-300" />
                  <span>Google Maps</span>
                </button>

                <button
                  onClick={openWaze}
                  className="flex-1 min-w-[140px] py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                >
                  <Navigation className="w-4 h-4 text-blue-200" />
                  <span>Waze Navigation</span>
                </button>

                <a
                  href="https://wa.me/60184633326"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 min-w-[140px] py-3 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center justify-center gap-2 border border-emerald-200 transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Chat WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Simulated Live Location Graphic Card */}
            <div className="rounded-3xl overflow-hidden border border-agro-100 shadow-md bg-gradient-to-br from-agro-950 via-agro-900 to-agro-950 text-white p-7 relative">
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>Synergy Agro Farm (SAF) • Bukit Katil</span>
                </div>
                <h4 className="font-display font-bold text-xl sm:text-2xl text-white">
                  Bukit Katil, 75450 Melaka, Malaysia
                </h4>
                <p className="text-xs text-slate-300 mt-2 max-w-lg leading-relaxed">
                  {t(
                    'Nestled near primary connecting roads in Bukit Katil. Look for our signature entrance board with the green SAF seedling insignia.',
                    'Terletak berhampiran laluan utama Bukit Katil. Cari papan tanda hitam SAF dengan logo tunas hijau dan tanda Legasi Coffee.'
                  )}
                </p>

                <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-2 rounded-xl bg-white/10 border border-white/10">
                    <span className="font-bold text-emerald-300 block">🚗 Parkir Luas</span>
                    <span className="text-[10px] text-slate-300">Ample Parking</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white/10 border border-white/10">
                    <span className="font-bold text-emerald-300 block">☕ Kafe Santai</span>
                    <span className="text-[10px] text-slate-300">Legasi Coffee</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white/10 border border-white/10">
                    <span className="font-bold text-emerald-300 block">🪴 500+ Pokok</span>
                    <span className="text-[10px] text-slate-300">Healthy Nursery</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white/10 border border-white/10">
                    <span className="font-bold text-emerald-300 block">🌾 Baja Organik</span>
                    <span className="text-[10px] text-slate-300">Long You 6-in-1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Inquiry Form (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-agro-200 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-bold text-agro-800 uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-agro-600" />
              <span>{t('Instant Direct Message', 'Hubungi Kami Terus')}</span>
            </div>

            <h3 className="font-display font-extrabold text-2xl text-slate-900 mb-2">
              {t('Have a Question?', 'Ada Sebarang Pertanyaan?')}
            </h3>

            <p className="text-xs text-slate-600 mb-6 leading-relaxed">
              {t(
                'Send us a message regarding sapling availability, bulk soil deliveries, or cafe group reservations.',
                'Hantarkan pertanyaan berkenaan stok anak pokok, pembelian pukal tanah organik, atau tempahan kafe.'
              )}
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  {t('Your Name', 'Nama Penuh')}
                </label>
                <input
                  type="text"
                  required
                  placeholder={t('e.g. Ahmad Azman', 'cth. Ahmad Azman')}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-agro-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  {t('Phone / WhatsApp Number', 'Nombor Telefon / WhatsApp')}
                </label>
                <input
                  type="tel"
                  required
                  placeholder="01X-XXXXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-agro-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  {t('Topic of Inquiry', 'Tajuk Pertanyaan')}
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-agro-500 focus:outline-none bg-white"
                >
                  <option value="stok-pokok-buah">Anak Pokok Buah Kahwin (Mangga Harum Manis, etc)</option>
                  <option value="tanah-long-you-baja">Tanah Organik Long You 6-in-1 & Baja</option>
                  <option value="pesanan-kafe-legasi">Kafe Legasi Coffee / Tempahan Meja</option>
                  <option value="lawatan-rombongan">Lawatan Berkumpulan / Edu-Tour</option>
                  <option value="pertanyaan-umum">Lain-lain / Pertanyaan Umum</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  {t('Your Message', 'Mesej Anda')}
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder={t('Write your questions here...', 'Tuliskan soalan atau keperluan anda di sini...')}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-agro-500 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-gradient-to-r from-agro-800 to-agro-900 hover:from-agro-700 hover:to-agro-800 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-agro-900/15 active:scale-95 transition-all text-sm"
              >
                <Send className="w-4 h-4 text-emerald-300" />
                <span>{t('Send via WhatsApp (+60 18 463 3326)', 'Hantar Mesej Melalui WhatsApp')}</span>
              </button>

              <div className="pt-2 flex items-center justify-center gap-1.5 text-xs text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{t('Fast response during operating hours', 'Respon pantas dalam waktu operasi')}</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
