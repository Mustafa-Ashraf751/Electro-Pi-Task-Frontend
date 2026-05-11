import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Meal } from "./data";
import { cartApi } from "./api/cart-api";

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

const CART_KEY = import.meta.env.VITE_CART_KEY;

const CartCtx = createContext<Ctx | null>(null);

function loadCart(): CartItem[] {
  try {
    const s = localStorage.getItem(CART_KEY);
    return s ? JSON.parse(s) : [];
  } catch (err) {
    console.error("Cart loading error", err);
    return [];
  }
}

function saveCartLocal(items: CartItem[]) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch (err) {
    console.error("Cart saving error", err);
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart());

  useEffect(() => {
    saveCartLocal(items);

    // If logged in, sync to backend
    if (localStorage.getItem("token") && items.length > 0) {
      const apiItems = items.map((i) => ({
        productId: i.meal._id,
        title: i.meal.name,
        image: i.meal.image,
        price: i.meal.price,
        quantity: i.qty,
      }));
      const totalPrice = items.reduce((s, i) => s + i.qty * i.meal.price, 0);
      const totalQuantity = items.reduce((s, i) => s + i.qty, 0);

      cartApi.syncCart(apiItems, totalPrice, totalQuantity).catch((err) =>
        console.error("Cart API sync failed", err)
      );
    }
  }, [items]);

  const api = useMemo<Ctx>(() => {
    const add = (m: Meal) =>
      setItems((cur) => {
        const ex = cur.find((i) => i.meal._id === m._id);
        if (ex) return cur.map((i) => (i.meal._id === m._id ? { ...i, qty: i.qty + 1 } : i));
        return [...cur, { meal: m, qty: 1 }];
      });
    const remove = (id: string) => setItems((cur) => cur.filter((i) => i.meal._id !== id));
    const setQty = (id: string, qty: number) =>
      setItems((cur) =>
        qty <= 0 ? cur.filter((i) => i.meal._id !== id) : cur.map((i) => (i.meal._id === id ? { ...i, qty } : i)),
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
