import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RestaurantCard } from "@/components/RestaurantCard";
import { restaurants, categories } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const Route = createFileRoute("/restaurants/")({
  head: () => ({
    meta: [
      { title: "Restaurants — Yummly" },
      { name: "description", content: "Browse top-rated local restaurants near you." },
    ],
  }),
  component: RestaurantsPage,
});

function RestaurantsPage() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold tracking-tight">Restaurants near you</h1>
        <p className="mt-1 text-muted-foreground">{restaurants.length} places ready to deliver</p>

        <div className="mt-6 flex flex-wrap gap-2">
          <Button
            variant={active === null ? "default" : "outline"}
            size="sm"
            className={active === null ? "bg-gradient-primary" : ""}
            onClick={() => setActive(null)}
          >
            All
          </Button>
          {categories.map((c) => (
            <Button
              key={c.id}
              variant={active === c.id ? "default" : "outline"}
              size="sm"
              className={active === c.id ? "bg-gradient-primary" : ""}
              onClick={() => setActive(c.id)}
            >
              <span className="me-1">{c.emoji}</span> {c.name}
            </Button>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {restaurants.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
