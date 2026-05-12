import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, ChefHat, Bike, PartyPopper, Phone, MessageSquare, MapPin } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {  useEffect, useState } from "react";
import { ordersApi, type Order } from "@/lib/api/orders-api";

export const Route = createFileRoute("/orders/track")({
  head: () => ({ meta: [{ title: "Order tracking — Yummly" }] }),
  validateSearch: (search: Record<string, unknown>) => ({
    orderId: (search.orderId as string) || "",
  }),
  component: TrackPage,
});

const steps = [
  { key: "received", label: "Order received", icon: CheckCircle2 },
  { key: "preparing", label: "Preparing your food", icon: ChefHat },
  { key: "onway", label: "On the way", icon: Bike },
  { key: "delivered", label: "Delivered", icon: PartyPopper },
];

function statusToStep(status: string): number {
  const map: Record<string, number> = {
    pending: 0,
    received: 0,
    preparing: 1,
    on_the_way: 2,
    delivered: 3,
    cancelled: 0,
  };
  return map[status.toLowerCase()] ?? 0;
}

function TrackPage() {
  const { orderId } = Route.useSearch();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();
  
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      nav({ to: "/login" });
      return;
    }
    if (!orderId) {
        setLoading(false);
        return;
    }
    ordersApi
        .getOrderById(orderId)
        .then(setOrder)
        .catch(console.error)
        .finally(() => setLoading(false));
  }, [orderId]);

  const current = order ? statusToStep(order.status) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <p className="text-muted-foreground">Loading order…</p>
        </main>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold tracking-tight">Order tracking</h1>
          <Card className="mt-8 border-border/60 p-12 text-center shadow-soft">
            <h3 className="mt-4 text-lg font-semibold">No orders to track</h3>
            <Link to="/orders">
              <Button variant="outline" className="mt-4">View all orders</Button>
            </Link>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto grid gap-8 px-4 py-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Order tracking</h1>
           <p className="mt-1 text-muted-foreground">
              Order #{order._id.slice(-6).toUpperCase()} · Status: <span className="font-semibold text-primary">{order.status}</span>
              {" · "}Payment: <span className={`font-semibold ${
                order.paymentStatus === "paid" ? "text-green-600" :
                order.paymentStatus === "failed" ? "text-red-600" :
                "text-yellow-600"
              }`}>{order.paymentStatus}</span>
            </p>
          </div>

          <Card className="border-border/60 p-6 shadow-soft">
            <ol className="relative space-y-6 ps-6">
              <div className="absolute start-[10px] top-2 bottom-2 w-px bg-border" />
              {steps.map((s, i) => {
                const done = i <= current;
                const Icon = s.icon;
                return (
                  <li key={s.key} className="relative">
                    <span
                      className={`absolute -start-[26px] top-0 flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                        done ? "border-primary bg-gradient-primary text-primary-foreground shadow-glow" : "border-border bg-card text-muted-foreground"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <div className="flex items-center justify-between">
                      <span className={`font-medium ${done ? "" : "text-muted-foreground"}`}>{s.label}</span>
                    </div>
                    {i === current && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {current === 2 ? "Your driver is heading to you now." : "Processing…"}
                      </p>
                    )}
                  </li>
                );
              })}
            </ol>
          </Card>
        </div>

        <aside>
          <Card className="sticky top-20 border-border/60 p-6 shadow-card">
            <h2 className="mb-4 text-lg font-semibold">Order summary</h2>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.productId} className="flex items-center gap-3">
                  <img src={item.image} alt={item.title} className="h-12 w-12 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.quantity}×</p>
                  </div>
                  <span className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total</span>
                <span className="font-bold text-primary">${order.totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <Link to="/orders">
              <Button variant="outline" className="mt-4 w-full">All orders</Button>
            </Link>
          </Card>
        </aside>
      </main>
      <Footer />
    </div>
  );
}
