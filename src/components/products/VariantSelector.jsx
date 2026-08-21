import { cn } from "@/lib/utils";
import { formatCurrency, formatPack } from "@/utils/format";

export function VariantSelector({ variants = [], selectedId, onSelect, size = "default" }) {
  if (!variants.length) return null;

  return (
    <div
      role="radiogroup"
      aria-label="Select variant"
      className={cn("flex flex-wrap gap-2", size === "sm" && "gap-1.5")}
    >
      {variants.map((variant) => {
        const selected = variant.id === selectedId;
        const outOfStock = !variant.no_of_units;
        return (
          <button
            key={variant.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={(event) => { event.preventDefault(); onSelect(variant); }}
            className={cn(
              "rounded-xl border px-3 py-2 text-left transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
              size === "sm" ? "text-xs" : "text-sm",
              selected
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border bg-background hover:bg-secondary",
              outOfStock && "opacity-60",
            )}
          >
            <span className="block font-medium capitalize">{variant.name || "Variant"}</span>
            <span className="block text-muted-foreground">
              {formatPack(variant.pack_quantity, variant.pack_unit)} · {formatCurrency(variant.price)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
