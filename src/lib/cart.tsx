import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Meal } from "./data";

export type CartItem = { meal: Meal; qty: number };

type Ctx = {
  items: CartItem[];
  add: (m: Meal) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const CartCtx = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const api = useMemo<Ctx>(() => {
    const add = (m: Meal) =>
      setItems((cur) => {
        const ex = cur.find((i) => i.meal.id === m.id);
        if (ex) return cur.map((i) => (i.meal.id === m.id ? { ...i, qty: i.qty + 1 } : i));
        return [...cur, { meal: m, qty: 1 }];
      });
    const remove = (id: string) => setItems((cur) => cur.filter((i) => i.meal.id !== id));
    const setQty = (id: string, qty: number) =>
      setItems((cur) =>
        qty <= 0 ? cur.filter((i) => i.meal.id !== id) : cur.map((i) => (i.meal.id === id ? { ...i, qty } : i)),
      );
    const clear = () => setItems([]);
    const count = items.reduce((s, i) => s + i.qty, 0);
    const subtotal = items.reduce((s, i) => s + i.qty * i.meal.price, 0);
    return { items, add, remove, setQty, clear, count, subtotal };
  }, [items]);

  return <CartCtx.Provider value={api}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const c = useContext(CartCtx);
  if (!c) throw new Error("CartProvider missing");
  return c;
}
