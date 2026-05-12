import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n";
import { useState } from "react";
import { authApi } from "@/lib/api/auth-api";
import type { Meal } from "@/lib/data";
import { cartApi } from "@/lib/api/cart-api";
export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — Yummly" },
      { name: "description", content: "Log in to your Yummly account to order food fast." },
    ],
  }),
  component: LoginPage,
});

interface FieldErrors {
  identifier?: string;
  password?: string;
}

function validateLoginForm(identifier: string, password: string): FieldErrors {
  const errors: FieldErrors = {};
  if (!identifier.trim()) {
    errors.identifier = "Email or username is required";
  }
  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }
  return errors;
}

function LoginPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setServerError("");

      // Validate fields
      const errors = validateLoginForm(identifier, password);
      setFieldErrors(errors);
      if (Object.keys(errors).length > 0) return;

      setIsLoading(true);
      try {
        const data = await authApi.login(identifier, password);
        localStorage.setItem("token", data.token);

        // Sync guest cart to backend
        const CART_KEY = import.meta.env.VITE_CART_KEY;
        const raw = localStorage.getItem(CART_KEY);
        if (raw) {
          const localCart = JSON.parse(raw) as { meal: Meal; qty: number }[];
          if (localCart.length > 0) {
            const apiItems = localCart.map((i) => ({
              productId: i.meal._id,
              title: i.meal.name,
              image: i.meal.image,
              price: i.meal.price,
              quantity: i.qty,
            }));
            const totalPrice = localCart.reduce((s, i) => s + i.qty * i.meal.price, 0);
            const totalQuantity = localCart.reduce((s, i) => s + i.qty, 0);
            await cartApi.syncCart(apiItems, totalPrice, totalQuantity);
          }
        }

        navigate({ to: "/" });
      } catch (err: any) {
        setServerError(err?.message || "Invalid email/username or password");
      } finally {
        setIsLoading(false);
      }
  };


  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-warm p-4">
      <Card className="w-full max-w-md border-border/60 p-8 shadow-card">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">🍽️</div>
          <span className="text-xl font-bold">{t("appName")}</span>
        </Link>
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="mt-1 text-sm text-muted-foreground">Log in to continue ordering</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Email or Username</Label>
            <Input
              type="text"
              placeholder="you@example.com or username"
              value={identifier}
              onChange={(e) => {
                setIdentifier(e.target.value);
                if (fieldErrors.identifier) setFieldErrors((prev) => ({ ...prev, identifier: undefined }));
              }}
              className={fieldErrors.identifier ? "border-red-500 focus-visible:ring-red-500" : ""}
            />
            {fieldErrors.identifier && (
              <p className="text-xs text-red-500">{fieldErrors.identifier}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (fieldErrors.password) setFieldErrors((prev) => ({ ...prev, password: undefined }));
              }}
              className={fieldErrors.password ? "border-red-500 focus-visible:ring-red-500" : ""}
            />
            {fieldErrors.password && (
              <p className="text-xs text-red-500">{fieldErrors.password}</p>
            )}
          </div>
          {serverError && <p className="text-sm text-red-500">{serverError}</p>}
          <Button className="w-full bg-gradient-primary shadow-soft" disabled={isLoading}>
            {isLoading ? "Logging in…" : t("login")}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-primary hover:underline">
            {t("signup")}
          </Link>
        </p>
      </Card>
    </div>
  );
}
