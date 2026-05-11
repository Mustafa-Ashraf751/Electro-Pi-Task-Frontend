const API_URL = import.meta.env.VITE_API_URL;

function getToken() {
  return localStorage.getItem("token");
}

export type CartApiItem = {
  productId: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
};

export const cartApi = {
  async syncCart(items: CartApiItem[], totalPrice: number, totalQuantity: number) {
    const token = getToken();
    if (!token) return;

    const res = await fetch(`${API_URL}/carts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({items, totalPrice, totalQuantity }),
    });
    if (!res.ok) throw new Error("Failed to sync cart");
    return res.json();
  },

  async getCart() {
    const token = getToken();
    if (!token) return null;

    const res = await fetch(`${API_URL}/carts`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch cart");
    return res.json();
  },
};
