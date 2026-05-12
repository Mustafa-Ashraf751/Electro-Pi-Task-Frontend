const API_URL = import.meta.env.VITE_API_URL;

function getToken() {
  return localStorage.getItem("token");
}

export const mealsApi = {
  async getMeals(category?: string) {
    const url = category
      ? `${API_URL}/meals?category=${category.toLowerCase()}`
      : `${API_URL}/meals`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch meals");
    return res.json();
  },

  async getCategories() {
    const res = await fetch(`${API_URL}/categories`);
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
  },

  async createMeal(data: { name: string; description: string; price: number; category: string; image: string }) {
    const token = getToken();
    const res = await fetch(`${API_URL}/meals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create meal");
    return res.json();
  },

  async updateMeal(id: string, data: { name: string; description: string; price: number; category: string; image: string }) {
    const token = getToken();
    const res = await fetch(`${API_URL}/meals/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update meal");
    return res.json();
  },

  async deleteMeal(id: string) {
    const token = getToken();
    const res = await fetch(`${API_URL}/meals/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to delete meal");
    return res.json();
  },
};
