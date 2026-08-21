import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductCarousel } from "./ProductCarousel";
import { VariantSelector } from "./VariantSelector";
import { SellerDialog } from "./SellerDialog";
import { useCart } from "@/context/CartContext";
import { activeVariants, formatCurrency, formatPack, variantImages } from "@/utils/format";

export function ProductCard({ product }) {
  const variants = useMemo(() => activeVariants(product), [product]);
  const [selectedId, setSelectedId] = useState(variants[0]?.id);
  const selected = variants.find((variant) => variant.id === selectedId) || variants[0];
  const { addToCart, isInCart } = useCart();

  const images = variantImages(selected);
  const available = Number(selected?.no_of_units) || 0;
  const inCart = selected ? isInCart(product.id, selected.id) : false;

  const handleAdd = () => {
    if (!selected) return;
    addToCart({
      productId: product.id,
      productName: product.name,
      variantId: selected.id,
      variantName: selected.name,
      packQuantity: selected.pack_quantity,
      packUnit: selected.pack_unit,
      price: selected.price,
      availableUnits: available,
      seller: product.seller_detail?.user_name || "Farmer",
      image: images[0] || "",
      category: product.category || "",
    });
  };

  return (
    <article className="surface-card group flex h-full flex-col overflow-hidden transition-shadow hover:shadow-[var(--shadow-lift)]">
      <div className="relative">
        <ProductCarousel images={images} alt={product.name || "Product"} />
        {product.category ? (
          <Badge className="absolute top-3 left-3 rounded-full bg-background/90 text-foreground">
            {product.category}
          </Badge>
        ) : null}
        {available <= 0 ? (
          <Badge variant="destructive" className="absolute top-3 right-3 rounded-full">
            Out of stock
          </Badge>
        ) : null}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-3 p-4">
        <div className="min-w-0 space-y-1">
          <h3 className="truncate font-display text-lg font-semibold" title={product.name}>
            {product.name}
          </h3>
          <p className="text-xl font-bold text-primary">
            {variants.length > 1 ? "From " : ""}
            {formatCurrency(selected?.price)}
          </p>
        </div>

        <p className="text-sm text-muted-foreground">
          Seller:{" "}
          <SellerDialog seller={product.seller_detail} />
        </p>

        {variants.length > 1 ? (
          <VariantSelector
            variants={variants}
            selectedId={selected?.id}
            onSelect={(variant) => setSelectedId(variant.id)}
            size="sm"
          />
        ) : (
          <p className="text-sm text-muted-foreground">
            Variant: <span className="font-medium text-foreground capitalize">{selected?.name || "—"}</span>{" "}
            · {formatPack(selected?.pack_quantity, selected?.pack_unit)}
          </p>
        )}

        <p className="text-xs text-muted-foreground">
          {available > 0 ? `${available} pack${available > 1 ? "s" : ""} available` : "Currently unavailable"}
        </p>

        <div className="mt-auto grid grid-cols-2 gap-2 pt-1">
          <Button
            onClick={handleAdd}
            disabled={!selected || available <= 0}
            className="w-full rounded-full"
          >
            {inCart ? <Check className="size-4" aria-hidden="true" /> : <ShoppingCart className="size-4" aria-hidden="true" />}
            <span className="truncate">{inCart ? "In cart" : "Add"}</span>
          </Button>
          <Button asChild variant="outline" className="w-full rounded-full">
            <Link to="/products/$id" params={{ id: product.id }}>
              Details
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
