import React, { useState } from 'react';
import { 
  X, 
  CalendarDays, 
  Clock, 
  Users, 
  Send, 
  CheckCircle, 
  Sprout, 
  Coffee,
  MessageSquare,
  Car
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface VisitPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VisitPlannerModal: React.FC<VisitPlannerModalProps> = ({ isOpen, onClose }) => {
  const { t, lang } = useLanguage();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:00');
  const [guests, setGuests] = useState('2');
  const [purpose, setPurpose] = useState('buggy-tour');
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const purposeMap: Record<string, string> = {
      'buggy-tour': 'Lawatan Buggy Elektrik (AG 1 & AG 2) & Ladang',
      'hall-booking': 'Tempahan Dewan Terbuka / Majlis Makan / Perjumpaan',
      'workshop': 'Penyertaan Bengkel Masakan / Pertanian',
      'cafe-nursery': 'Santai Kafe (Legasi Coffee) & Melawat Nurseri',
      'nursery-trees': 'Membeli Anak Pokok Buah Kahwin & Bunga',
      'soil-fertilizer': 'Membeli Tanah Organik Long You 6-in-1 / Baja',
    };

    let msg = `*🌿 Tempahan / Rancang Lawatan Synergy Agro Farm (SAF) Bukit Katil*\n\n`;
    if (name) msg += `*Nama Pelawat:* ${name}\n`;
    msg += `*Tarikh Kunjungan:* ${date || 'Akan Datang / Hari Ini'}\n`;
    msg += `*Waktu Cadangan:* ${time} (Waktu Operasi 8AM - 6PM)\n`;
    msg += `*Bilangan Orang:* ${guests} orang\n`;
    msg += `*Tujuan Kunjungan:* ${purposeMap[purpose] || purpose}\n`;
    if (notes) msg += `*Catatan Tambahan:* ${notes}\n`;
    msg += `\nHai Synergy Agro Farm! Saya ingin mengesahkan masa lawatan ini. Terima kasih!`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/60184633326?text=${encoded}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-agro-100 relative">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-agro-950 via-agro-900 to-agro-800 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-1">
            <CalendarDays className="w-4 h-4" />
            <span>{t('Plan Your Farm Experience', 'Rancang Kunjungan Anda')}</span>
          </div>

          <h3 className="font-display font-extrabold text-2xl text-white">
            Synergy Agro Farm (SAF)
          </h3>
          <p className="text-xs text-emerald-100/90 mt-1">
            Bukit Katil, Melaka • {t('Open Daily 8:00 AM – 6:00 PM', 'Buka Setiap Hari 8.00 Pagi – 6.00 Petang')}
          </p>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block font-bold text-slate-800 mb-1">
              {t('Your Name', 'Nama Anda')}
            </label>
            <input
              type="text"
              required
              placeholder={t('e.g. Encik Farhan / Sarah', 'cth. Encik Farhan / Sarah')}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-agro-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                {t('Preferred Date', 'Tarikh Cadangan')}
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-agro-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                {t('Estimated Time', 'Anggaran Waktu')}
              </label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-agro-500 focus:outline-none bg-white"
              >
                <option value="08:30">8:30 AM (Pagi)</option>
                <option value="10:00">10:00 AM (Pagi)</option>
                <option value="12:00">12:00 PM (Tengahari)</option>
                <option value="14:30">2:30 PM (Petang)</option>
                <option value="16:30">4:30 PM (Petang)</option>
                <option value="17:30">5:30 PM (Petang)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                {t('Number of Guests', 'Bilangan Pengunjung')}
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-agro-500 focus:outline-none bg-white"
              >
                <option value="1-2">1 - 2 Orang</option>
                <option value="3-5">3 - 5 Orang (Keluarga)</option>
                <option value="6-10">6 - 10 Orang (Rombongan Kecil)</option>
                <option value="10-30">10 - 30 Orang (Kumpulan Besar)</option>
                <option value="30+">30+ Orang (Acara / Dewan)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                {t('Primary Interest', 'Tujuan Utama')}
              </label>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-agro-500 focus:outline-none bg-white"
              >
                <option value="buggy-tour">🚜 Naik Buggy Elektrik (AG 1 & 2)</option>
                <option value="hall-booking">🏛️ Tempah Dewan Berbumbung / Majlis</option>
                <option value="workshop">👩‍🍳 Bengkel Masakan / Pertanian</option>
                <option value="cafe-nursery">☕ Kafe Legasi & Nurseri</option>
                <option value="nursery-trees">🥭 Beli Anak Pokok Buah Kahwin</option>
                <option value="soil-fertilizer">🌾 Tanah Long You / Baja</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">
              {t('Special Requests / Questions (Optional)', 'Permintaan Khas / Soalan (Pilihan)')}
            </label>
            <textarea
              rows={2}
              placeholder={t('e.g. Inquiring about Buggy availability or pavilion reservation...', 'cth. Tanya slot buggy tour atau tempahan meja dewan...')}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-agro-500 focus:outline-none resize-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-agro-800 hover:from-emerald-500 hover:to-agro-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/20 active:scale-95 transition-all text-sm"
            >
              <Send className="w-4 h-4" />
              <span>{t('Submit & Send to WhatsApp (+60 18 463 3326)', 'Hantar Maklumat ke WhatsApp')}</span>
            </button>
            <p className="text-[11px] text-center text-slate-500 mt-2">
              {t(
                'Direct link to SAF Bukit Katil WhatsApp. Fast confirmation.',
                'Disambungkan terus ke WhatsApp rasmi SAF Bukit Katil. Respon pantas.'
              )}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
