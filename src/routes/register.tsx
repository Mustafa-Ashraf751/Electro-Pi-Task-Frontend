import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n";
import { useState } from "react";
import { authApi } from "@/lib/api/auth-api";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Sign up — Yummly" },
      { name: "description", content: "Create your Yummly account in seconds." },
    ],
  }),
  component: RegisterPage,
});

interface FieldErrors {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
}

function validateRegisterForm(name: string, username: string, email: string, password: string): FieldErrors {
  const errors: FieldErrors = {};

  if (!name.trim()) {
    errors.name = "Full name is required";
  }

  if (!username.trim()) {
    errors.username = "Username is required";
  } else if (username.trim().length < 3) {
    errors.username = "Username must be at least 3 characters";
  }

  if (!email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.email = "Please enter a valid email address";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  return errors;
}

function RegisterPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const clearFieldError = (field: keyof FieldErrors) => {
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    // Validate fields
    const errors = validateRegisterForm(name, username, email, password);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsLoading(true);
    try {
      const data = await authApi.register(name, email, username, password);
      //store the token in local storage
      localStorage.setItem("token", data.token);
      navigate({to:"/"});
    } catch (err: any) {
      setServerError(err?.message || "Registration failed. Please try again.");
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
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="mt-1 text-sm text-muted-foreground">Start ordering in under a minute</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Full name</Label>
            <Input
              placeholder="Jane Doe"
              value={name}
              onChange={(e) => { setName(e.target.value); clearFieldError("name"); }}
              className={fieldErrors.name ? "border-red-500 focus-visible:ring-red-500" : ""}
            />
            {fieldErrors.name && <p className="text-xs text-red-500">{fieldErrors.name}</p>}
          </div>
          <div className="space-y-2">
            <Label>Username</Label>
            <Input
              placeholder="janedoe55"
              value={username}
              onChange={(e) => { setUsername(e.target.value); clearFieldError("username"); }}
              className={fieldErrors.username ? "border-red-500 focus-visible:ring-red-500" : ""}
            />
            {fieldErrors.username && <p className="text-xs text-red-500">{fieldErrors.username}</p>}
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); clearFieldError("email"); }}
              className={fieldErrors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
            />
            {fieldErrors.email && <p className="text-xs text-red-500">{fieldErrors.email}</p>}
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => { setPassword(e.target.value); clearFieldError("password"); }}
              className={fieldErrors.password ? "border-red-500 focus-visible:ring-red-500" : ""}
            />
            {fieldErrors.password && <p className="text-xs text-red-500">{fieldErrors.password}</p>}
          </div>
          {serverError && <p className="text-sm text-red-500">{serverError}</p>}
          <Button className="w-full bg-gradient-primary shadow-soft" disabled={isLoading}>
            {isLoading ? "Signing up…" : t("signup")}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            {t("login")}
          </Link>
        </p>
      </Card>
    </div>
  );
}
