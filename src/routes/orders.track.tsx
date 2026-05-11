import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ChefHat, Bike, PartyPopper, Phone, MessageSquare, MapPin } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { meals } from "@/lib/data";

export const Route = createFileRoute("/orders/track")({
  head: () => ({ meta: [{ title: "Order tracking — Yummly" }] }),
  component: TrackPage,
});

const steps = [
  { key: "received", label: "Order received", icon: CheckCircle2, time: "2:14 PM" },
  { key: "preparing", label: "Preparing your food", icon: ChefHat, time: "2:18 PM" },
  { key: "onway", label: "On the way", icon: Bike, time: "2:35 PM" },
  { key: "delivered", label: "Delivered", icon: PartyPopper, time: "2:52 PM" },
];

function TrackPage() {
  const current = 2; // on the way
  const sample = meals.slice(0, 3);
  const subtotal = sample.reduce((s, m) => s + m.price, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto grid gap-8 px-4 py-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Order tracking</h1>
            <p className="mt-1 text-muted-foreground">Order #YM-10238 · Estimated delivery in <span className="font-semibold text-primary">17 minutes</span></p>
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
                      <span className="text-xs text-muted-foreground">{s.time}</span>
                    </div>
                    {i === current && (
                      <p className="mt-1 text-sm text-muted-foreground">Your driver is heading to you now.</p>
                    )}
                  </li>
                );
              })}
            </ol>
          </Card>

          <Card className="border-border/60 p-6 shadow-soft">
            <h2 className="mb-4 text-lg font-semibold">Your driver</h2>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-primary text-xl font-bold text-primary-foreground shadow-glow">
                A
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Ahmed M.</h3>
                <p className="text-sm text-muted-foreground">Toyota Corolla · ABC-1234</p>
              </div>
              <Button variant="outline" size="icon"><Phone className="h-4 w-4" /></Button>
              <Button variant="outline" size="icon"><MessageSquare className="h-4 w-4" /></Button>
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-muted/40 p-3 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" /> 0.8 km away — arriving soon
            </div>
          </Card>
        </div>

        <aside>
          <Card className="sticky top-20 border-border/60 p-6 shadow-card">
            <h2 className="mb-4 text-lg font-semibold">Order summary</h2>
            <div className="space-y-3">
              {sample.map((m) => (
                <div key={m.id} className="flex items-center gap-3">
                  <img src={m.image} alt={m.name} className="h-12 w-12 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{m.name}</p>
                    <p className="text-xs text-muted-foreground">1×</p>
                  </div>
                  <span className="text-sm font-medium">${m.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span>$2.99</span></div>
              <div className="flex justify-between border-t border-border pt-2 font-bold"><span>Total</span><span className="text-primary">${(subtotal + 2.99).toFixed(2)}</span></div>
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
