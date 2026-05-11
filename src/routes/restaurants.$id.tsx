import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, Clock, Bike, MapPin, ShoppingBag } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MealCard } from "@/components/MealCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { restaurants, meals, categories } from "@/lib/data";
import { useCart } from "@/lib/cart";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/restaurants/$id")({
  component: RestaurantPage,
});

function RestaurantPage() {
  const { id } = Route.useParams();
  const r = restaurants.find((x) => x.id === id) ?? restaurants[0];
  const list = meals.filter((m) => m.restaurantId === r.id);
  const cats = Array.from(new Set(list.map((m) => m.category)));
  const tabs = cats.length ? cats : [list[0]?.category ?? "all"];
  const { items, count, subtotal } = useCart();
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        {/* Hero */}
        <div className="overflow-hidden rounded-3xl shadow-card">
          <div className="relative h-48 md:h-64">
            <img src={r.image} alt={r.name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 start-4 end-4 text-white">
              <h1 className="text-2xl font-bold md:text-4xl">{r.name}</h1>
              <p className="text-sm opacity-90">{r.cuisine}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 bg-card p-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1"><Star className="h-4 w-4 fill-warning text-warning" /> {r.rating}</span>
            <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" /> {r.deliveryTime}</span>
            <span className="inline-flex items-center gap-1"><Bike className="h-4 w-4" /> ${r.deliveryFee.toFixed(2)} delivery</span>
            <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> 1.2 km away</span>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <Tabs defaultValue={tabs[0]}>
              <TabsList className="mb-4">
                {tabs.map((c) => (
                  <TabsTrigger key={c} value={c}>
                    {categories.find((x) => x.id === c)?.name ?? c}
                  </TabsTrigger>
                ))}
              </TabsList>
              {tabs.map((c) => (
                <TabsContent key={c} value={c} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {list.filter((m) => m.category === c).map((m) => (
                    <MealCard key={m.id} meal={m} />
                  ))}
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Sticky cart */}
          <aside className="hidden lg:block">
            <Card className="sticky top-20 border-border/60 p-5 shadow-soft">
              <div className="mb-3 flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-primary" />
                <h3 className="font-semibold">{t("cart")} ({count})</h3>
              </div>
              {items.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">Your cart is empty</p>
              ) : (
                <>
                  <div className="space-y-3">
                    {items.map((i) => (
                      <div key={i.meal.id} className="flex items-center justify-between gap-2 text-sm">
                        <span className="truncate"><span className="text-muted-foreground">{i.qty}×</span> {i.meal.name}</span>
                        <span className="font-medium">${(i.qty * i.meal.price).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                    <span className="text-sm text-muted-foreground">{t("subtotal")}</span>
                    <span className="font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  <Link to="/cart">
                    <Button className="mt-4 w-full bg-gradient-primary shadow-soft">{t("checkout")}</Button>
                  </Link>
                </>
              )}
            </Card>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
