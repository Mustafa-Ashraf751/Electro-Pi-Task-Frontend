import { Link, useRouterState } from "@tanstack/react-router";
import { Moon, Search, ShoppingBag, Sun, Globe, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { useCart } from "@/lib/cart";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export function Navbar() {
  const { t, lang, setLang } = useI18n();
  const { theme, toggle } = useTheme();
  const { count } = useCart();
  const path = useRouterState({ select: (s) => s.location.pathname });

  const links = [
    { to: "/", label: t("home") },
    { to: "/orders", label: t("orders") },
    { to: "/admin", label: t("admin") },
  ];

  const [isLoggedIn, setIsLoggedIn] = useState(() =>
  !!localStorage.getItem("token")
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
            <span className="text-lg">🍽️</span>
          </div>
          <span className="text-lg font-bold tracking-tight">{t("appName")}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted ${
                path === l.to ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden flex-1 max-w-sm md:block">
          <div className="relative">
            <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="ps-9 rounded-xl bg-muted/60 border-0" placeholder={t("searchPlaceholder")} />
          </div>
        </div>

        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Language">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLang("en")} className={lang === "en" ? "font-semibold" : ""}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLang("ar")} className={lang === "ar" ? "font-semibold" : ""}>
                العربية
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Theme">
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative" aria-label="Cart">
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <Badge className="absolute -end-1 -top-1 h-5 min-w-5 rounded-full bg-primary p-0 text-[10px]">
                  {count}
                </Badge>
              )}
            </Button>
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            {isLoggedIn ? (
              <>
                <Link to="/profile">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={() => {
                  localStorage.removeItem("token");
                  setIsLoggedIn(false);
                }}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    {t("login")}
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="bg-gradient-primary shadow-soft">
                    {t("signup")}
                  </Button>
                </Link>
              </>
            )}
          </div>


          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="mt-8 flex flex-col gap-1">
                {links.map((l) => (
                  <Link key={l.to} to={l.to} className="rounded-lg px-3 py-2 text-sm hover:bg-muted">
                    {l.label}
                  </Link>
                ))}
                <Link to="/profile" className="rounded-lg px-3 py-2 text-sm hover:bg-muted">
                  <User className="me-2 inline h-4 w-4" /> {t("profile")}
                </Link>
                <div className="mt-4 flex flex-col gap-2">
            {isLoggedIn ? (
              <Button variant="outline" className="w-full" onClick={() => {
                localStorage.removeItem("token");
                setIsLoggedIn(false);
              }}>
                Logout
              </Button>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="w-full">
                    {t("login")}
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="w-full bg-gradient-primary">{t("signup")}</Button>
                </Link>
              </>
            )}
          </div>

              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
