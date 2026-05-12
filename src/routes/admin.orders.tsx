import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { ordersApi, type Order } from "@/lib/api/orders-api";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/orders")({
  component: AdminOrders,
});

const STATUS_OPTIONS = ["pending", "preparing", "on the way", "delivered", "cancelled"];

function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ordersApi.getAllOrders().then(setOrders).catch(console.error).finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const updated = await ordersApi.updateOrderStatus(orderId, newStatus);
      setOrders((cur) => cur.map((o) => (o._id === orderId ? updated : o)));
      toast.success(`Status updated to "${newStatus}"`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground">Monitor all incoming orders.</p>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : orders.length === 0 ? (
        <Card className="border-border/60 p-12 text-center shadow-soft">
          <p className="text-muted-foreground">No orders yet.</p>
        </Card>
      ) : (
        <Card className="border-border/60 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-xs text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 text-start font-medium">Order</th>
                  <th className="px-4 py-3 text-start font-medium">Items</th>
                  <th className="px-4 py-3 text-start font-medium">Date</th>
                  <th className="px-4 py-3 text-start font-medium">Status</th>
                  <th className="px-4 py-3 text-start font-medium">Payment</th>
                  <th className="px-4 py-3 text-end font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o._id} className="border-b border-border/60 last:border-0">
                    <td className="px-4 py-3 font-medium">{o._id.slice(-6).toUpperCase()}</td>
                    <td className="px-4 py-3 text-muted-foreground">{o.items.length}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(o.createdAt).toLocaleDateString([], { month: "short", day: "numeric" })}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={o.status}
                        onChange={(e) => handleStatusChange(o._id, e.target.value)}
                        className="rounded-md border border-border bg-background px-2 py-1 text-xs font-medium outline-none focus:ring-2 focus:ring-primary"
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="secondary"
                        className={
                          o.paymentStatus === "paid" ? "bg-green-100 text-green-700" :
                          o.paymentStatus === "failed" ? "bg-red-100 text-red-700" :
                          "bg-yellow-100 text-yellow-700"
                        }
                      >
                        {o.paymentStatus}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-end font-medium">${o.totalPrice.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
