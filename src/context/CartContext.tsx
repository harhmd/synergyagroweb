import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string; // unique key e.g. item.id + variant
  productId: string;
  name: string;
  variant: 'iced' | 'hot' | 'standard';
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity' | 'id'>, qty?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  totalCount: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  sendWhatsAppOrder: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('saf_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('saf_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  const addToCart = (item: Omit<CartItem, 'quantity' | 'id'>, qty = 1) => {
    const id = `${item.productId}-${item.variant}`;
    setCart((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [...prev, { ...item, id, quantity: qty }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((i) => i.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.id === cartItemId ? { ...i, quantity: newQty } : i))
    );
  };

  const clearCart = () => setCart([]);

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const sendWhatsAppOrder = () => {
    if (cart.length === 0) return;
    let message = `*🌿 Pesanan / Order dari Synergy Agro Farm (SAF) Website*\n\n`;
    message += `*Lokasi:* Bukit Katil, Melaka\n`;
    message += `--------------------------------------\n`;
    cart.forEach((item, index) => {
      const variantText = item.variant === 'iced' ? '[SEJUK / ICED]' : item.variant === 'hot' ? '[PANAS / HOT]' : '';
      message += `${index + 1}. *${item.name}* ${variantText}\n`;
      message += `   Kuantiti: ${item.quantity}x @ RM ${item.price.toFixed(2)} = RM ${(item.price * item.quantity).toFixed(2)}\n`;
    });
    message += `--------------------------------------\n`;
    message += `*Jumlah Anggaran / Total:* RM ${totalPrice.toFixed(2)}\n\n`;
    message += `Hai Synergy Agro Farm / Legasi Coffee! Saya ingin mengesahkan pesanan di atas untuk pick-up / makan di kafe. Terima kasih!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/60184633326?text=${encoded}`, '_blank');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCount,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
        sendWhatsAppOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
