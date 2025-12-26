import { createContext, useContext, useState, ReactNode } from 'react';
import { Perfume } from '@/data/perfumes';

interface CartItem {
  perfume: Perfume;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (perfume: Perfume) => void;
  removeFromCart: (perfumeId: number) => void;
  updateQuantity: (perfumeId: number, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  total: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (perfume: Perfume) => {
    setItems(prev => {
      const existing = prev.find(item => item.perfume.id === perfume.id);
      if (existing) {
        return prev.map(item =>
          item.perfume.id === perfume.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { perfume, quantity: 1 }];
    });
  };

  const removeFromCart = (perfumeId: number) => {
    setItems(prev => prev.filter(item => item.perfume.id !== perfumeId));
  };

  const updateQuantity = (perfumeId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(perfumeId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.perfume.id === perfumeId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.perfume.price * item.quantity, 0);
  const total = subtotal; // Can add shipping, tax etc here

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        total,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
