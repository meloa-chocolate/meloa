"use client";

import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { availableProducts } from "@/data/products";

type Quantities = Record<string, number>;

type CartContextValue = {
  quantities: Quantities;
  setQuantity: (id: string, next: number) => void;
  increment: (id: string) => void;
  count: number;
  total: number;
  reset: () => void;
};

const createEmpty = () => Object.fromEntries(availableProducts.map((product) => [product.id, 0])) as Quantities;
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [quantities, setQuantities] = useState<Quantities>(createEmpty);

  const setQuantity = (id: string, next: number) => {
    setQuantities((current) => ({ ...current, [id]: Math.max(0, Math.min(20, next)) }));
  };

  const increment = (id: string) => {
    setQuantities((current) => ({ ...current, [id]: Math.min(20, (current[id] ?? 0) + 1) }));
  };

  const summary = useMemo(() => availableProducts.reduce(
    (acc, product) => {
      const quantity = quantities[product.id] ?? 0;
      acc.count += quantity;
      acc.total += quantity * product.price;
      return acc;
    },
    { count: 0, total: 0 }
  ), [quantities]);

  const value = useMemo(() => ({
    quantities,
    setQuantity,
    increment,
    count: summary.count,
    total: summary.total,
    reset: () => setQuantities(createEmpty()),
  }), [quantities, summary.count, summary.total]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
