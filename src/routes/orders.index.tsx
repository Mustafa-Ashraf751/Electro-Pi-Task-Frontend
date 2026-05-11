import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { meals } from "@/lib/data";

export const Route = createFileRoute("/orders/")({
  head: () => ({ meta: [{ title: "My orders — Yummly" }] }),
  component: OrdersPage,
});

const orders = [
  { id: "YM-10238", date: "Today, 2:14 PM", status: "On the way", total: 28.47, items: meals.slice(0, 3) },
  { id: "YM-10210", date: "Yesterday", status: "Delivered", total: 14.5, items: meals.slice(2, 4) },
  { id: "YM-10185", date: "May 5", status: "Delivered", total: 36.9, items: meals.slice(4, 7) },
];

function OrdersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold tracking-tight">My orders</h1>
        <div className="mt-6 space-y-4">
          {orders.map((o) => (
            <Card key={o.id} className="flex flex-col gap-4 border-border/60 p-5 shadow-soft md:flex-row md:items-center">
              <div className="flex -space-x-2">
                {o.items.map((i) => (
                  <img key={i.id} src={i.image} alt="" className="h-12 w-12 rounded-full border-2 border-background object-cover" />
                ))}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{o.id}</h3>
                  <Badge variant={o.status === "Delivered" ? "secondary" : "default"} className={o.status === "Delivered" ? "" : "bg-gradient-primary"}>{o.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{o.date} · {o.items.length} items · ${o.total.toFixed(2)}</p>
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
