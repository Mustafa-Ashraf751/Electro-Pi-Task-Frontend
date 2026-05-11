import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { ordersApi, type Order } from "@/lib/api/orders-api";

export const Route = createFileRoute("/orders/")({
  head: () => ({ meta: [{ title: "My orders — Yummly" }] }),
  component: OrdersPage,
});

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return `Today, ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  if (diffDays === 1) return "Yesterday";
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}

function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    ordersApi
      .getOrders()
      .then(setOrders)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold tracking-tight">My orders</h1>

        {loading && <p className="mt-6 text-muted-foreground">Loading orders…</p>}
        {error && <p className="mt-6 text-sm text-red-500">{error}</p>}

        {!loading && orders.length === 0 && (
          <Card className="mt-8 border-border/60 p-12 text-center shadow-soft">
            <h3 className="mt-4 text-lg font-semibold">No orders yet</h3>
            <p className="mt-1 text-sm text-muted-foreground">Your order history will appear here</p>
          </Card>
        )}

        <div className="mt-6 space-y-4">
          {orders.map((o) => (
            <Card key={o._id} className="flex flex-col gap-4 border-border/60 p-5 shadow-soft md:flex-row md:items-center">
              {o.items.length > 0 && (
                <div className="flex -space-x-2">
                  {o.items.slice(0, 3).map((i) => (
                    <img key={i.productId} src={i.image} alt={i.title} className="h-12 w-12 rounded-full border-2 border-background object-cover" />
                  ))}
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{o._id.slice(-6).toUpperCase()}</h3>
                  <Badge
                    variant={o.status === "Delivered" ? "secondary" : "default"}
                    className={o.status === "Delivered" ? "" : "bg-gradient-primary"}
                  >
                    {o.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {formatDate(o.createdAt)} · {o.items.length} items · ${o.totalPrice.toFixed(2)}
                </p>
              </div>
              <Link to="/orders/track">
                <Button variant="outline">Track order</Button>
              </Link>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
