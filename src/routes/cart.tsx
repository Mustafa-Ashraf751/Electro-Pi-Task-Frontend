import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag, CreditCard, Wallet } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/lib/cart";
import { useI18n } from "@/lib/i18n";
import { useState } from "react";
import { toast } from "sonner";

import { ordersApi } from "@/lib/api/orders-api";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart & Checkout — Yummly" }] }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, subtotal, clear } = useCart();
  const { t } = useI18n();
  const nav = useNavigate();
  const [pay, setPay] = useState("card");
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const delivery = subtotal > 0 ? 2.99 : 0;
  const total = Math.max(0, subtotal + delivery - discount);
  const [isPlacing, setIsPlacing] = useState(false);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");


  const apply = () => {
    if (promo.trim().toUpperCase() === "YUMMY10") {
      setDiscount(subtotal * 0.1);
      toast.success("Promo applied — 10% off!");
    } else {
      toast.error("Invalid promo code");
    }
  };

  const placeOrder = async () => {
      if (items.length === 0) return;
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to place an order");
        nav({ to: "/login" });
        return;
      }
      setIsPlacing(true);
      const orderItems = items.map((i) => ({
        productId: i.meal._id,
        title: i.meal.name,
        image: i.meal.image,
        price: i.meal.price,
        quantity: i.qty,
      }));
      const totalPrice = total;
      const totalQuantity = items.reduce((s, i) => s + i.qty, 0);
      const deliveryAddress = { fullName, phone, street, city, zip };
      if (!fullName || !phone || !street || !city || !zip) {
        toast.error("Please fill in your delivery address");
        return;
      }

      try {
        if (pay === "cod") {
          // Cash on delivery — create order directly
          await ordersApi.createOrder({
            items: orderItems,
            totalPrice,
            totalQuantity,
            paymentMethod: "cash",
            deliveryAddress,
          });
          toast.success("Order placed successfully!");
          clear();
          nav({ to: "/orders" });
        } else {
          // Card — Step 1: Create the order first
          const order = await ordersApi.createOrder({
            items: orderItems,
            totalPrice,
            totalQuantity,
            paymentMethod: "card",
            deliveryAddress,
          });
          // Step 2: Call payments/checkout/:orderId
          const res = await fetch(`${import.meta.env.VITE_API_URL}/payments/checkout/${order._id}`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!res.ok) throw new Error("Failed to create checkout session");
          const { url } = await res.json();
          // Step 3: Redirect to Stripe
          window.location.href = url;
        }
      } catch (err) {
        toast.error("Something went wrong. Please try again.");
        console.error(err);
      } finally {
        setIsPlacing(false);
      }
};
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold tracking-tight">{t("checkout")}</h1>

        {items.length === 0 ? (
          <Card className="mt-8 border-border/60 p-12 text-center shadow-soft">
            <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">Your cart is empty</h3>
            <p className="mt-1 text-sm text-muted-foreground">Add some delicious food to get started</p>
          </Card>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_400px]">
            <div className="space-y-6">
              <Card className="border-border/60 p-6 shadow-soft">
                <h2 className="mb-4 text-lg font-semibold">Items</h2>
                <div className="space-y-4">
                  {items.map((i) => (
                    <div key={i.meal._id} className="flex items-center gap-4">
                      <img src={i.meal.image} alt={i.meal.name} className="h-16 w-16 rounded-xl object-cover" />
                      <div className="min-w-0 flex-1">
                        <h4 className="truncate font-medium">{i.meal.name}</h4>
                        <p className="text-sm text-muted-foreground">${i.meal.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-1 rounded-full border border-border bg-muted/40 p-1">
                        <Button size="icon" variant="ghost" className="h-7 w-7 rounded-full" onClick={() => setQty(i.meal._id, i.qty - 1)}>
                          <Minus className="h-3.5 w-3.5" />
                        </Button>
                        <span className="w-6 text-center text-sm font-medium">{i.qty}</span>
                        <Button size="icon" variant="ghost" className="h-7 w-7 rounded-full" onClick={() => setQty(i.meal._id, i.qty + 1)}>
                          <Plus className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                      <Button size="icon" variant="ghost" onClick={() => remove(i.meal._id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="border-border/60 p-6 shadow-soft">
                <h2 className="mb-4 text-lg font-semibold">{t("address")}</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Full name</Label>
                    <Input placeholder="Jane Doe"  value={fullName} onChange={(e) => setFullName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input placeholder="+1 555 000 1234"  value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label>Street address</Label>
                    <Input placeholder="123 Main St, Apt 4B"  value={street} onChange={(e) => setStreet(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Input placeholder="New York"  value={city} onChange={(e) => setCity(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>ZIP</Label>
                    <Input placeholder="10001"  value={zip} onChange={(e) => setZip(e.target.value)} />
                  </div>
                </div>
              </Card>

              <Card className="border-border/60 p-6 shadow-soft">
                <h2 className="mb-4 text-lg font-semibold">{t("payment")}</h2>
                <RadioGroup value={pay} onValueChange={setPay} className="space-y-3">
                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border p-4 transition-colors hover:bg-muted/40 [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5">
                    <RadioGroupItem value="card" />
                    <CreditCard className="h-5 w-5 text-primary" />
                    <span className="font-medium">{t("card")}</span>
                  </label>
                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border p-4 transition-colors hover:bg-muted/40 [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5">
                    <RadioGroupItem value="cod" />
                    <Wallet className="h-5 w-5 text-primary" />
                    <span className="font-medium">{t("cod")}</span>
                  </label>
                </RadioGroup>
              </Card>
            </div>

            <aside>
              <Card className="sticky top-20 border-border/60 p-6 shadow-card">
                <h2 className="mb-4 text-lg font-semibold">Order summary</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">{t("subtotal")}</span><span>${subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">{t("delivery")}</span><span>${delivery.toFixed(2)}</span></div>
                  {discount > 0 && (
                    <div className="flex justify-between text-success"><span>Discount</span><span>−${discount.toFixed(2)}</span></div>
                  )}
                </div>
                <div className="mt-4 flex justify-between border-t border-border pt-4 text-base font-bold">
                  <span>{t("total")}</span><span className="text-primary">${total.toFixed(2)}</span>
                </div>
                <Button className="mt-6 w-full bg-gradient-primary shadow-soft" size="lg" onClick={placeOrder}>
                  {t("placeOrder")}
                </Button>
              </Card>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
