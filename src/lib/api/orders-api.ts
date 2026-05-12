const API_URL = import.meta.env.VITE_API_URL;

function getToken() {
  return localStorage.getItem("token");
}

export type OrderItem = {
  productId: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
};

export type Order = {
  _id: string;
  userId: string;
  items: OrderItem[];
  totalPrice: number;
  totalQuantity: number;
  status: string;
  createdAt: string;
  paymentStatus: string;
  deliveryAddress?: {
    fullName?: string;
    phone?: string;
    street?: string;
    city?: string;
    zip?: string;
  };
};

export const ordersApi = {
  async getOrders(): Promise<Order[]> {
    const token = getToken();
    if (!token) return [];

    const res = await fetch(`${API_URL}/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch orders");
    return res.json();
  },

  async createOrder(data: {
    items: OrderItem[];
    totalPrice: number;
    totalQuantity: number;
    paymentMethod: string;
    deliveryAddress?: {
      fullName?: string;
      phone?: string;
      street?: string;
      city?: string;
      zip?: string;
    };
  }): Promise<Order> {
    const token = getToken();
    if (!token) throw new Error("Unauthorized");

    const res = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed to create order");
    return res.json();
  },

  async getAllOrders(): Promise<Order[]> {
    const token = getToken();
    if (!token) return [];

    const res = await fetch(`${API_URL}/orders/admin/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch all orders");
    return res.json();
  },

  async updateOrderStatus(orderId: string, status: string): Promise<Order> {
    const token = getToken();
    if (!token) throw new Error("Unauthorized");

    const res = await fetch(`${API_URL}/orders/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error("Failed to update order status");
    return res.json();
  },

  async getOrderById(orderId: string): Promise<Order> {
    const token = getToken();
    if (!token) throw new Error("Unauthorized");

    const res = await fetch(`${API_URL}/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch order");
    return res.json();
  },


};
