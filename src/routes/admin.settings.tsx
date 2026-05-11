import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/settings")({ component: AdminSettings });

function AdminSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Configure store preferences.</p>
      </div>
      <Card className="border-border/60 p-6 shadow-soft">
        <h3 className="mb-4 font-semibold">Store info</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2"><Label>Store name</Label><Input defaultValue="Yummly" /></div>
          <div className="space-y-2"><Label>Support email</Label><Input defaultValue="support@yummly.app" /></div>
          <div className="space-y-2"><Label>Currency</Label><Input defaultValue="USD" /></div>
          <div className="space-y-2"><Label>Min. delivery</Label><Input defaultValue="$10" /></div>
        </div>
      </Card>
      <Card className="border-border/60 p-6 shadow-soft">
        <h3 className="mb-4 font-semibold">Preferences</h3>
        <div className="space-y-4">
          {["Accept new orders", "Auto-print receipts", "Show out-of-stock items"].map((l, i) => (
            <div key={l} className="flex items-center justify-between">
              <Label>{l}</Label>
              <Switch defaultChecked={i !== 2} />
            </div>
          ))}
        </div>
      </Card>
      <div className="flex justify-end"><Button className="bg-gradient-primary">Save changes</Button></div>
    </div>
  );
}
