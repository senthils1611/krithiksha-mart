"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/types/product";
import { CartItem } from "@/types/cart";

type CartContextType = {
  cart: CartItem[];
  cartCount: number;
  addToCart: (product: Product) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
};



const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };
  const cartCount = cart.reduce(
  (total, item) => total + item.quantity,
  0
);

 return (
  <CartContext.Provider
    value={{ cart, cartCount, addToCart }}
  >
    {children}
  </CartContext.Provider>
);
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}