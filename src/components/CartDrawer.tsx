import React from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Send, 
  Snowflake, 
  Flame, 
  Coffee,
  ArrowRight
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    totalPrice, 
    sendWhatsAppOrder 
  } = useCart();

  const { t } = useLanguage();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="absolute inset-0" 
        onClick={() => setIsCartOpen(false)}
        aria-label="Close Backdrop"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-agro-100">
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-coffee-950 via-coffee-900 to-coffee-800 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-white">
                  {t('Your Order Cart', 'Troli Pesanan Anda')}
                </h3>
                <p className="text-xs text-amber-200/80">
                  Legasi Coffee & SAF Nursery
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close Cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4 text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-slate-800 text-base">
                  {t('Your cart is empty', 'Troli anda masih kosong')}
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  {t(
                    'Explore our Legasi Coffee drinks and nursery selections to start an order.',
                    'Pilih minuman Legasi Coffee atau produk nurseri untuk memulakan pesanan.'
                  )}
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-5 px-5 py-2.5 rounded-xl bg-coffee-800 text-amber-100 font-bold text-xs"
                >
                  {t('Browse Menu', 'Lihat Menu')}
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
                  <span>{cart.length} {t('Items in cart', 'Item dalam troli')}</span>
                  <button
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 font-semibold"
                  >
                    {t('Clear all', 'Kosongkan')}
                  </button>
                </div>

                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5">
                        <h5 className="font-bold text-slate-900 text-sm">{item.name}</h5>
                        {item.variant === 'iced' && (
                          <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200 flex items-center gap-0.5">
                            <Snowflake className="w-2.5 h-2.5" /> Sejuk
                          </span>
                        )}
                        {item.variant === 'hot' && (
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 flex items-center gap-0.5">
                            <Flame className="w-2.5 h-2.5" /> Panas
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-500 font-medium">
                        RM {item.price.toFixed(2)} each
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-white rounded-lg border border-slate-200 p-0.5 shadow-sm">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-slate-100 rounded text-slate-600"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-slate-100 rounded text-slate-600"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Footer Subtotal & WhatsApp CTA */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#faf8f5] border-t border-slate-200 space-y-4">
              <div className="flex items-center justify-between text-base font-bold text-slate-900">
                <span>{t('Estimated Total', 'Jumlah Anggaran')}:</span>
                <span className="text-2xl font-extrabold text-agro-900 font-display">
                  RM {totalPrice.toFixed(2)}
                </span>
              </div>

              <button
                onClick={sendWhatsAppOrder}
                className="w-full py-4 px-6 bg-gradient-to-r from-emerald-600 to-agro-800 hover:from-emerald-500 hover:to-agro-700 text-white font-extrabold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-emerald-700/25 active:scale-95 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>{t('Send Order via WhatsApp (+60 18 463 3326)', 'Hantar Pesanan ke WhatsApp')}</span>
              </button>

              <p className="text-[11px] text-center text-slate-500">
                {t(
                  'Your order details will open directly in WhatsApp for quick confirmation with SAF Bukit Katil.',
                  'Butiran pesanan akan dipaparkan terus di WhatsApp untuk pengesahan segera bersama staf SAF.'
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
