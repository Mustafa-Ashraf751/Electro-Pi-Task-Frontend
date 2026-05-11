import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Heart, Settings, Bell, CreditCard, Plus } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { meals } from "@/lib/data";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — Yummly" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Card className="border-border/60 p-6 shadow-soft">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-primary text-3xl font-bold text-primary-foreground shadow-glow">
              J
            </div>
            <div className="flex-1 text-center sm:text-start">
              <h1 className="text-2xl font-bold">Jane Doe</h1>
              <p className="text-sm text-muted-foreground">jane.doe@example.com · +1 555 000 1234</p>
            </div>
            <Button variant="outline">Edit profile</Button>
          </div>
        </Card>

        <Tabs defaultValue="addresses" className="mt-8">
          <TabsList className="flex-wrap">
            <TabsTrigger value="addresses"><MapPin className="me-2 h-4 w-4" />Addresses</TabsTrigger>
            <TabsTrigger value="favorites"><Heart className="me-2 h-4 w-4" />Favorites</TabsTrigger>
            <TabsTrigger value="payment"><CreditCard className="me-2 h-4 w-4" />Payment</TabsTrigger>
            <TabsTrigger value="settings"><Settings className="me-2 h-4 w-4" />Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="addresses" className="mt-6 space-y-3">
            {[
              { label: "Home", addr: "123 Main St, Apt 4B, New York, 10001", primary: true },
              { label: "Work", addr: "500 Tech Plaza, Floor 12, New York, 10018" },
            ].map((a) => (
              <Card key={a.label} className="flex items-center gap-4 border-border/60 p-4 shadow-soft">
                <MapPin className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="font-medium">{a.label} {a.primary && <span className="ms-2 rounded bg-primary/10 px-2 py-0.5 text-xs text-primary">Default</span>}</p>
                  <p className="text-sm text-muted-foreground">{a.addr}</p>
                </div>
                <Button variant="ghost" size="sm">Edit</Button>
              </Card>
            ))}
            <Button variant="outline" className="w-full"><Plus className="me-2 h-4 w-4" />Add address</Button>
          </TabsContent>

          <TabsContent value="favorites" className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {meals.slice(0, 6).map((m) => (
              <Card key={m.id} className="overflow-hidden border-border/60 p-0 shadow-soft">
                <img src={m.image} alt={m.name} className="aspect-video w-full object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold">{m.name}</h3>
                  <p className="mt-1 text-sm font-bold text-primary">${m.price.toFixed(2)}</p>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="payment" className="mt-6 space-y-3">
            <Card className="flex items-center gap-4 border-border/60 p-4 shadow-soft">
              <CreditCard className="h-5 w-5 text-primary" />
              <div className="flex-1">
                <p className="font-medium">Visa •••• 4242</p>
                <p className="text-sm text-muted-foreground">Expires 12/27</p>
              </div>
              <Button variant="ghost" size="sm">Remove</Button>
            </Card>
            <Button variant="outline" className="w-full"><Plus className="me-2 h-4 w-4" />Add payment method</Button>
          </TabsContent>

          <TabsContent value="settings" className="mt-6 space-y-3">
            <Card className="border-border/60 p-5 shadow-soft">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-primary" />
                  <div>
                    <Label className="font-medium">Push notifications</Label>
                    <p className="text-sm text-muted-foreground">Updates about your orders</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </Card>
            <Card className="border-border/60 p-5 shadow-soft">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Marketing emails</Label>
                  <p className="text-sm text-muted-foreground">Promotions and offers</p>
                </div>
                <Switch />
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
