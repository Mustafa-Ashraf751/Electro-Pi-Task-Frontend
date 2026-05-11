import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, ArrowRight, Truck, Clock, Shield } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Meal} from "@/lib/data";
import { MealCard } from "@/components/MealCard";
import { useI18n } from "@/lib/i18n";
import hero from "@/assets/hero-food.jpg";
import { mealsApi } from "@/lib/api/meals-api";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yummly — Order food you love, delivered fast" },
      {
        name: "description",
        content:
          "Order from your favorite local restaurants. Fresh meals, fast delivery, and clear order tracking.",
      },
      { property: "og:title", content: "Yummly — Order food you love" },
      { property: "og:description", content: "Fresh meals, fast delivery, and clear order tracking." },
    ],
  }),
  component: Index,
});

function Index() {
  const { t } = useI18n();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  useEffect(() => {
    setLoading(true);
    mealsApi.getMeals(activeCategory === "all" ? undefined : activeCategory)
      .then(setMeals)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  useEffect(() => {
    setLoading(true);
    mealsApi.getCategories().then(setCategories).catch((err) => setError(err.message)).finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="container mx-auto grid items-center gap-10 px-4 py-12 md:grid-cols-2 md:py-20">
            <div className="space-y-6">
              <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-soft">
                ⚡ {t("tagline")}
              </span>
              <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                {t("heroTitle")}
              </h1>
              <p className="max-w-md text-lg text-muted-foreground">{t("heroSubtitle")}</p>
              <div className="relative max-w-md">
                <Search className="pointer-events-none absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="h-14 ps-12 pe-32 rounded-2xl border-border/60 bg-card text-base shadow-card"
                  placeholder={t("searchPlaceholder")}
                />
                <Button className="absolute end-1.5 top-1/2 h-11 -translate-y-1/2 bg-gradient-primary px-5 shadow-soft">
                  Search <ArrowRight className="ms-1 h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-6 pt-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2"><Truck className="h-4 w-4 text-primary" />Free delivery over $25</span>
                <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-primary" />30 min average</span>
                <span className="inline-flex items-center gap-2"><Shield className="h-4 w-4 text-primary" />Secure checkout</span>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 -z-10 rounded-[2.5rem] bg-gradient-primary opacity-20 blur-3xl" />
              <img
                src={hero}
                alt="Delicious food"
                width={1536}
                height={1024}
                className="rounded-[2rem] shadow-glow"
              />
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="container mx-auto px-4 py-12">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{t("categories")}</h2>
          </div>
          <div className="grid grid-cols-3 gap-3 md:grid-cols-7">
            <button
              onClick={() => setActiveCategory("all")}
              className={`flex flex-col items-center gap-2 rounded-2xl border p-4 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card ${
                activeCategory === "all"
                  ? "border-primary bg-primary/10"
                  : "border-border/60 bg-card"
              }`}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-warm text-3xl">
                🍽️
              </div>
              <span className="text-sm font-medium">All</span>
            </button>
            {categories.map((c: any) => (
              <button
                key={c._id}
                onClick={() => setActiveCategory(c.name)}
                className={`flex flex-col items-center gap-2 rounded-2xl border p-4 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card ${
                  activeCategory === c.name
                    ? "border-primary bg-primary/10"
                    : "border-border/60 bg-card"
                }`}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-warm text-3xl">
                  {c.emoji || "🍴"}
                </div>
                <span className="text-sm font-medium">{c.name}</span>
              </button>
            ))}
          </div>
        </section>


        {/* Menu */}
        <section className="container mx-auto px-4 py-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{t("popular")}</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {loading ? (
              <p className="col-span-full text-center text-muted-foreground py-12">Loading menu…</p>
            ) : meals.length === 0 ? (
              <p className="col-span-full text-center text-muted-foreground py-12">No meals available</p>
            ) : (
              meals.map((m) => (
                <MealCard key={m._id} meal={m} />
              ))
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
