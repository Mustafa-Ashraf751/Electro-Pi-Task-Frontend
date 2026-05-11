import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Line, LineChart, PieChart, Pie, Cell, Legend } from "recharts";

export const Route = createFileRoute("/admin/analytics")({ component: Analytics });

const monthly = Array.from({ length: 12 }).map((_, i) => ({
  m: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
  v: 4000 + Math.round(Math.random() * 6000),
}));
const traffic = [
  { name: "Direct", value: 38 },
  { name: "Search", value: 32 },
  { name: "Social", value: 18 },
  { name: "Referral", value: 12 },
];
const colors = ["var(--primary)", "var(--primary-glow)", "var(--success)", "var(--warning)"];

function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Performance over time.</p>
      </div>
      <Card className="border-border/60 p-5 shadow-soft">
        <h3 className="mb-4 font-semibold">Monthly revenue</h3>
        <div className="h-72">
          <ResponsiveContainer>
            <AreaChart data={monthly}>
              <defs>
                <linearGradient id="m" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Area type="monotone" dataKey="v" stroke="var(--primary)" fill="url(#m)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-border/60 p-5 shadow-soft">
          <h3 className="mb-4 font-semibold">Active users (live)</h3>
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={monthly}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Line type="monotone" dataKey="v" stroke="var(--primary)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="border-border/60 p-5 shadow-soft">
          <h3 className="mb-4 font-semibold">Traffic sources</h3>
          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={traffic} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} paddingAngle={3}>
                  {traffic.map((_, i) => <Cell key={i} fill={colors[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
