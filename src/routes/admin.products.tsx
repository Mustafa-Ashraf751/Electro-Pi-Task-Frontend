import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import { meals as initial, type Meal } from "@/lib/data";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/products")({
  component: AdminProducts,
});

function AdminProducts() {
  const [list, setList] = useState<Meal[]>(initial);
  const [editing, setEditing] = useState<Meal | null>(null);
  const [open, setOpen] = useState(false);

  const onSave = (m: Meal) => {
    setList((cur) => {
      const ex = cur.find((x) => x.id === m.id);
      return ex ? cur.map((x) => (x.id === m.id ? m : x)) : [m, ...cur];
    });
    setOpen(false);
    setEditing(null);
    toast.success("Product saved");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Manage your menu items.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary shadow-soft" onClick={() => setEditing(null)}>
              <Plus className="me-2 h-4 w-4" /> Add product
            </Button>
          </DialogTrigger>
          <ProductDialog meal={editing} onSave={onSave} />
        </Dialog>
      </div>

      <Card className="border-border/60 p-5 shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground">
              <tr className="border-b border-border">
                <th className="py-2 text-start font-medium">Product</th>
                <th className="py-2 text-start font-medium">Category</th>
                <th className="py-2 text-end font-medium">Price</th>
                <th className="py-2 text-end font-medium">Rating</th>
                <th className="py-2 text-end font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((m) => (
                <tr key={m.id} className="border-b border-border/60 last:border-0">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <img src={m.image} alt={m.name} className="h-10 w-10 rounded-lg object-cover" />
                      <div>
                        <p className="font-medium">{m.name}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">{m.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-muted-foreground capitalize">{m.category}</td>
                  <td className="py-3 text-end font-medium">${m.price.toFixed(2)}</td>
                  <td className="py-3 text-end text-muted-foreground">{m.rating}</td>
                  <td className="py-3 text-end">
                    <Button variant="ghost" size="icon" onClick={() => { setEditing(m); setOpen(true); }}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => { setList((c) => c.filter((x) => x.id !== m.id)); toast.success("Deleted"); }}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function ProductDialog({ meal, onSave }: { meal: Meal | null; onSave: (m: Meal) => void }) {
  const [name, setName] = useState(meal?.name ?? "");
  const [desc, setDesc] = useState(meal?.description ?? "");
  const [price, setPrice] = useState(meal?.price ?? 0);
  const [category, setCategory] = useState(meal?.category ?? "pizza");
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{meal ? "Edit product" : "New product"}</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4">
        <div className="space-y-2"><Label>Name</Label><Input value={name} onChange={(e) => setName(e.target.value)} /></div>
        <div className="space-y-2"><Label>Description</Label><Textarea value={desc} onChange={(e) => setDesc(e.target.value)} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2"><Label>Price ($)</Label><Input type="number" step="0.01" value={price} onChange={(e) => setPrice(+e.target.value)} /></div>
          <div className="space-y-2"><Label>Category</Label><Input value={category} onChange={(e) => setCategory(e.target.value)} /></div>
        </div>
      </div>
      <DialogFooter>
        <Button
          className="bg-gradient-primary"
          onClick={() =>
            onSave({
              id: meal?.id ?? `m${Date.now()}`,
              name, description: desc, price, category,
              rating: meal?.rating ?? 4.5,
              image: meal?.image ?? "",
              restaurantId: meal?.restaurantId ?? "r1",
            })
          }
        >
          Save product
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
