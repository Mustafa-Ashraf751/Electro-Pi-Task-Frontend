import { createFileRoute } from "@tanstack/react-router";
import { DollarSign, ShoppingBag, Users, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar, CartesianGrid,
} from "recharts";
import { meals } from "@/lib/data";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

const revenueData = [
  { d: "Mon", v: 1240 }, { d: "Tue", v: 1820 }, { d: "Wed", v: 1490 },
  { d: "Thu", v: 2210 }, { d: "Fri", v: 2680 }, { d: "Sat", v: 3120 }, { d: "Sun", v: 2780 },
];
const categoryData = [
  { c: "Pizza", v: 420 }, { c: "Burger", v: 380 }, { c: "Sushi", v: 280 },
  { c: "Chicken", v: 320 }, { c: "Dessert", v: 180 }, { c: "Drinks", v: 140 },
];
const stats = [
  { label: "Total revenue", value: "$24,580", change: "+12.4%", up: true, icon: DollarSign },
  { label: "Orders", value: "1,284", change: "+8.2%", up: true, icon: ShoppingBag },
  { label: "Customers", value: "842", change: "+5.1%", up: true, icon: Users },
  { label: "Avg. order value", value: "$19.14", change: "−1.2%", up: false, icon: TrendingUp },
];
const recent = [
  { id: "YM-10238", customer: "Jane Doe", total: 28.47, status: "On the way" },
  { id: "YM-10237", customer: "Mark Smith", total: 14.5, status: "Preparing" },
  { id: "YM-10236", customer: "Lina K.", total: 36.9, status: "Delivered" },
  { id: "YM-10235", customer: "Omar A.", total: 9.99, status: "Delivered" },
  { id: "YM-10234", customer: "Sara P.", total: 22.3, status: "Cancelled" },
];

function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back. Here's what's happening today.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="border-border/60 p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <s.icon className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-bold">{s.value}</div>
            <div className={`mt-1 inline-flex items-center gap-1 text-xs ${s.up ? "text-success" : "text-destructive"}`}>
              {s.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {s.change} vs last week
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="border-border/60 p-5 shadow-soft lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold">Revenue this week</h3>
            <Badge variant="secondary">+18% vs last</Badge>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="d" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Area type="monotone" dataKey="v" stroke="var(--primary)" strokeWidth={2} fill="url(#rev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="border-border/60 p-5 shadow-soft">
          <h3 className="mb-4 font-semibold">Top categories</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="c" stroke="var(--muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Bar dataKey="v" fill="var(--primary)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="border-border/60 p-5 shadow-soft lg:col-span-2">
          <h3 className="mb-4 font-semibold">Recent orders</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground">
                <tr className="border-b border-border">
                  <th className="py-2 text-start font-medium">Order</th>
                  <th className="py-2 text-start font-medium">Customer</th>
                  <th className="py-2 text-start font-medium">Status</th>
                  <th className="py-2 text-end font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((o) => (
                  <tr key={o.id} className="border-b border-border/60 last:border-0">
                    <td className="py-3 font-medium">{o.id}</td>
                    <td className="py-3 text-muted-foreground">{o.customer}</td>
                    <td className="py-3">
                      <Badge
                        variant="secondary"
                        className={
                          o.status === "Delivered" ? "bg-success/15 text-success" :
                          o.status === "Cancelled" ? "bg-destructive/15 text-destructive" :
                          "bg-primary/15 text-primary"
                        }
                      >
                        {o.status}
                      </Badge>
                    </td>
                    <td className="py-3 text-end font-medium">${o.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="border-border/60 p-5 shadow-soft">
          <h3 className="mb-4 font-semibold">Top selling</h3>
          <div className="space-y-3">
            {meals.slice(0, 5).map((m, i) => (
              <div key={m.id} className="flex items-center gap-3">
                <span className="w-4 text-sm font-bold text-muted-foreground">{i + 1}</span>
                <img src={m.image} alt={m.name} className="h-10 w-10 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{m.name}</p>
                  <p className="text-xs text-muted-foreground">${m.price.toFixed(2)}</p>
                </div>
                <span className="text-xs text-muted-foreground">{120 - i * 14} sold</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
