import { createFileRoute } from "@tanstack/react-router";
import { DollarSign, ShoppingBag, Package } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { ordersApi, type Order } from "@/lib/api/orders-api";
import { mealsApi } from "@/lib/api/meals-api";
import type { Meal } from "@/lib/data";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([ordersApi.getAllOrders(), mealsApi.getMeals()])
      .then(([o, m]) => {
        setOrders(o);
        setMeals(m);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const totalRevenue = orders.reduce((s, o) => s + (o.totalPrice || 0), 0);
  const totalOrders = orders.length;
  const totalProducts = meals.length;

  const stats = [
    { label: "Total Revenue", value: `$${totalRevenue.toFixed(2)}`, icon: DollarSign },
    { label: "Total Orders", value: totalOrders.toString(), icon: ShoppingBag },
    { label: "Total Products", value: totalProducts.toString(), icon: Package },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your store.</p>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((s) => (
              <Card key={s.label} className="border-border/60 p-5 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{s.label}</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <s.icon className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-2 text-2xl font-bold">{s.value}</div>
              </Card>
            ))}
          </div>

          <Card className="border-border/60 p-5 shadow-soft">
            <h3 className="mb-4 font-semibold">Recent orders</h3>
            {orders.length === 0 ? (
              <p className="text-sm text-muted-foreground">No orders yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-xs text-muted-foreground">
                    <tr className="border-b border-border">
                      <th className="py-2 text-start font-medium">Order</th>
                      <th className="py-2 text-start font-medium">Items</th>
                      <th className="py-2 text-start font-medium">Status</th>
                      <th className="py-2 text-start font-medium">Payment</th>
                      <th className="py-2 text-end font-medium">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(-5).reverse().map((o) => (
                      <tr key={o._id} className="border-b border-border/60 last:border-0">
                        <td className="py-3 font-medium">{o._id.slice(-6).toUpperCase()}</td>
                        <td className="py-3 text-muted-foreground">{o.items.length}</td>
                        <td className="py-3">
                          <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                            o.status === "Delivered" ? "bg-green-100 text-green-700" :
                            o.status === "Cancelled" ? "bg-red-100 text-red-700" :
                            "bg-primary/10 text-primary"
                          }`}>
                            {o.status}
                          </span>
                        </td>
                        <td className="py-3">
                          <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                            o.paymentStatus === "paid" ? "bg-green-100 text-green-700" :
                            o.paymentStatus === "failed" ? "bg-red-100 text-red-700" :
                            "bg-yellow-100 text-yellow-700"
                          }`}>
                            {o.paymentStatus}
                          </span>
                        </td>

                        <td className="py-3 text-end font-medium">${o.totalPrice.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </>
      )}
    </div>
  );
}
