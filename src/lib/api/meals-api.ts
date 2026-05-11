const API_URL = import.meta.env.VITE_API_URL;

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
};