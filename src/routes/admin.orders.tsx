import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const Route = createFileRoute("/admin/orders")({
  component: AdminOrders,
});

const orders = Array.from({ length: 12 }).map((_, i) => ({
  id: `YM-${10240 - i}`,
  customer: ["Jane Doe", "Mark Smith", "Lina K.", "Omar A.", "Sara P."][i % 5],
  items: (i % 4) + 1,
  total: +(8 + Math.random() * 40).toFixed(2),
  status: ["Delivered", "On the way", "Preparing", "Delivered", "Cancelled"][i % 5],
  date: `May ${10 - (i % 8)}`,
}));

function AdminOrders() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground">Manage and review all incoming orders.</p>
      </div>
      <Card className="border-border/60 p-5 shadow-soft">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search orders…" className="ps-9" />
          </div>
          <Button variant="outline">Export</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground">
              <tr className="border-b border-border">
                <th className="py-2 text-start font-medium">Order</th>
                <th className="py-2 text-start font-medium">Customer</th>
                <th className="py-2 text-start font-medium">Items</th>
                <th className="py-2 text-start font-medium">Date</th>
                <th className="py-2 text-start font-medium">Status</th>
                <th className="py-2 text-end font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-border/60 last:border-0 hover:bg-muted/30">
                  <td className="py-3 font-medium">{o.id}</td>
                  <td className="py-3 text-muted-foreground">{o.customer}</td>
                  <td className="py-3 text-muted-foreground">{o.items}</td>
                  <td className="py-3 text-muted-foreground">{o.date}</td>
                  <td className="py-3">
                    <Badge
                      variant="secondary"
                      className={
                        o.status === "Delivered" ? "bg-success/15 text-success" :
                        o.status === "Cancelled" ? "bg-destructive/15 text-destructive" :
                        "bg-primary/15 text-primary"
                      }
                    >{o.status}</Badge>
                  </td>
                  <td className="py-3 text-end font-medium">${o.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
