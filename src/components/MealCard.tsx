import { Star, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Meal } from "@/lib/data";
import { useCart } from "@/lib/cart";
import { useI18n } from "@/lib/i18n";
import { toast } from "sonner";

export function MealCard({ meal }: { meal: Meal }) {
  const { add } = useCart();
  const { t } = useI18n();
  return (
    <Card className="group overflow-hidden border-border/60 p-0 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card">
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={meal.image}
          alt={meal.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold leading-tight">{meal.name}</h3>
          <div className="flex shrink-0 items-center gap-1 rounded-md bg-warning/15 px-1.5 py-0.5 text-xs font-medium text-warning-foreground">
            <Star className="h-3 w-3 fill-warning text-warning" />
            {meal.rating}
          </div>
        </div>
        <p className="line-clamp-2 text-xs text-muted-foreground">{meal.description}</p>
        <div className="flex items-center justify-between pt-1">
          <span className="text-lg font-bold text-primary">${meal.price.toFixed(2)}</span>
          <Button
            size="sm"
            className="bg-gradient-primary shadow-soft"
            onClick={() => {
              add(meal);
              toast.success(`${meal.name} ${t("addToCart").toLowerCase()}`);
            }}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
