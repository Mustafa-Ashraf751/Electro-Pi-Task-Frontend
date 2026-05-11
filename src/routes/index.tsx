import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, ArrowRight, Truck, Clock, Shield } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { categories, restaurants, meals } from "@/lib/data";
import { MealCard } from "@/components/MealCard";
import { RestaurantCard } from "@/components/RestaurantCard";
import { useI18n } from "@/lib/i18n";
import hero from "@/assets/hero-food.jpg";

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
          <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
            {categories.map((c) => (
              <Link
                key={c.id}
                to="/restaurants"
                className="group flex flex-col items-center gap-2 rounded-2xl border border-border/60 bg-card p-4 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-warm text-3xl">
                  {c.emoji}
                </div>
                <span className="text-sm font-medium">{c.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Popular meals */}
        <section className="container mx-auto px-4 py-12">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{t("popular")}</h2>
            <Link to="/restaurants" className="text-sm font-medium text-primary hover:underline">
              See all →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {meals.slice(0, 8).map((m) => (
              <MealCard key={m.id} meal={m} />
            ))}
          </div>
        </section>

        {/* Featured restaurants */}
        <section className="container mx-auto px-4 py-12">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{t("featured")}</h2>
            <Link to="/restaurants" className="text-sm font-medium text-primary hover:underline">
              See all →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {restaurants.slice(0, 6).map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 py-12">
          <div className="overflow-hidden rounded-3xl bg-gradient-primary p-8 text-primary-foreground shadow-glow md:p-12">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <h3 className="text-2xl font-bold md:text-3xl">Hungry? We've got you.</h3>
                <p className="mt-2 max-w-md text-primary-foreground/85">
                  Join thousands of happy customers ordering from top local restaurants.
                </p>
              </div>
              <Link to="/register">
                <Button size="lg" variant="secondary" className="shadow-card">
                  Get started <ArrowRight className="ms-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
