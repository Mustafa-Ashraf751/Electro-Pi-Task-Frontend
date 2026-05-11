const API_URL = import.meta.env.VITE_API_URL;

export const mealsApi = {
  async getMeals(category?: string) {
    if (category) {
      const res = await fetch(`${API_URL}/meals?category=${category}`);
      if (!res.ok) throw new Error("Failed to fetch meals");
      return res.json();
    }
    const res = await fetch(`${API_URL}/meals`);
    if (!res.ok) throw new Error("Failed to fetch meals");
    return res.json();
  },

  async getCategories() {
    const res = await fetch(`${API_URL}/categories`);
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
  },
};