const API_URL = import.meta.env.VITE_API_URL;

export const authApi = {
  async register(fullName: string, email: string, username: string, password: string) {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email, username, password }),
    });
    if (!res.ok) throw new Error("Registration failed");
    return res.json();
  },
  async login(identifier: string, password: string) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }),
    });
    if (!res.ok) throw new Error("Login failed");
    return res.json();
  },
};
