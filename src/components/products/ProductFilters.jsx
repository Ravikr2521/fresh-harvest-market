import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { formatCurrency } from "@/utils/format";

function Group({ title, options, selected, onToggle }) {
  if (!options.length) return null;
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold">{title}</h3>
      <div className="space-y-2">
        {options.map((option) => {
          const id = `${title}-${option}`;
          return (
            <div key={option} className="flex items-center gap-2.5">
              <Checkbox
                id={id}
                checked={selected.includes(option)}
                onCheckedChange={() => onToggle(option)}
              />
              <Label htmlFor={id} className="min-w-0 cursor-pointer truncate text-sm font-normal">
                {option}
              </Label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ProductFilters({ facets, filters, onChange, onReset }) {
  const toggle = (key, value) => {
    const list = filters[key];
    onChange({
      ...filters,
      [key]: list.includes(value) ? list.filter((item) => item !== value) : [...list, value],
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-lg font-semibold">Filters</h2>
        <Button variant="ghost" size="sm" onClick={onReset} className="rounded-full">
          Reset
        </Button>
      </div>

      <Group title="Category" options={facets.categories} selected={filters.categories} onToggle={(v) => toggle("categories", v)} />
      <Separator />
      <Group title="Seller" options={facets.sellers} selected={filters.sellers} onToggle={(v) => toggle("sellers", v)} />
      <Separator />
      <Group title="Pack unit" options={facets.units} selected={filters.units} onToggle={(v) => toggle("units", v)} />
      <Separator />

      <div className="space-y-3">
        <h3 className="text-sm font-semibold">Max price</h3>
        <Slider
          value={[filters.maxPrice]}
          min={facets.minPrice}
          max={facets.maxPrice}
          step={10}
          onValueChange={([value]) => onChange({ ...filters, maxPrice: value })}
          aria-label="Maximum price"
        />
        <p className="text-sm text-muted-foreground">Up to {formatCurrency(filters.maxPrice)}</p>
      </div>

      <Separator />
      <div className="flex items-center gap-2.5">
        <Checkbox
          id="in-stock"
          checked={filters.inStockOnly}
          onCheckedChange={(checked) => onChange({ ...filters, inStockOnly: Boolean(checked) })}
        />
        <Label htmlFor="in-stock" className="cursor-pointer text-sm font-normal">
          In stock only
        </Label>
      </div>
    </div>
  );
}
