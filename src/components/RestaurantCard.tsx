import { Link } from "@tanstack/react-router";
import { Star, Clock, Bike } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Restaurant } from "@/lib/data";
import { useI18n } from "@/lib/i18n";

export function RestaurantCard({ restaurant: r }: { restaurant: Restaurant }) {
  const { t } = useI18n();
  return (
    <Link to="/restaurants/$id" params={{ id: r.id }}>
      <Card className="group overflow-hidden border-border/60 p-0 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={r.image}
            alt={r.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute end-3 top-3 flex items-center gap-1 rounded-full bg-background/95 px-2 py-1 text-xs font-semibold shadow-soft">
            <Star className="h-3 w-3 fill-warning text-warning" />
            {r.rating}
          </div>
        </div>
        <div className="space-y-2 p-4">
          <h3 className="font-semibold">{r.name}</h3>
          <p className="text-xs text-muted-foreground">{r.cuisine}</p>
          <div className="flex items-center gap-3 pt-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {r.deliveryTime}
            </span>
            <span className="inline-flex items-center gap-1">
              <Bike className="h-3.5 w-3.5" /> ${r.deliveryFee.toFixed(2)}
            </span>
          </div>
          <div className="pt-1 text-xs font-medium text-primary">{t("viewMenu")} →</div>
        </div>
      </Card>
    </Link>
  );
}
