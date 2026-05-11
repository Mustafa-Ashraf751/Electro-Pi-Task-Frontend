import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/admin/users")({ component: AdminUsers });

const users = [
  { name: "Jane Doe", email: "jane@example.com", orders: 24, joined: "Jan 2024", role: "Customer" },
  { name: "Mark Smith", email: "mark@example.com", orders: 12, joined: "Mar 2024", role: "Customer" },
  { name: "Lina K.", email: "lina@example.com", orders: 38, joined: "Nov 2023", role: "VIP" },
  { name: "Omar A.", email: "omar@example.com", orders: 5, joined: "May 2024", role: "Customer" },
  { name: "Sara P.", email: "sara@example.com", orders: 19, joined: "Feb 2024", role: "Customer" },
];

function AdminUsers() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <p className="text-muted-foreground">Manage customer accounts.</p>
      </div>
      <Card className="border-border/60 p-5 shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground">
              <tr className="border-b border-border">
                <th className="py-2 text-start font-medium">User</th>
                <th className="py-2 text-start font-medium">Role</th>
                <th className="py-2 text-end font-medium">Orders</th>
                <th className="py-2 text-end font-medium">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.email} className="border-b border-border/60 last:border-0">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-primary text-sm font-bold text-primary-foreground">{u.name[0]}</div>
                      <div>
                        <p className="font-medium">{u.name}</p>
                        <p className="text-xs text-muted-foreground">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3"><Badge variant="secondary" className={u.role === "VIP" ? "bg-warning/20 text-warning-foreground" : ""}>{u.role}</Badge></td>
                  <td className="py-3 text-end font-medium">{u.orders}</td>
                  <td className="py-3 text-end text-muted-foreground">{u.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
