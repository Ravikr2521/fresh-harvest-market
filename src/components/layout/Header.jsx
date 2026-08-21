import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, ShoppingCart, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Shop" },
  { to: "/orders", label: "Orders" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { getCartItemCount, hydrated } = useCart();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const count = hydrated ? getCartItemCount() : 0;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-2.5" aria-label="Harvest Haat home">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <Sprout className="size-5" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-lg leading-tight font-semibold">
              Harvest Haat
            </span>
            <span className="hidden text-xs text-muted-foreground sm:block">
              Farm-direct marketplace
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary ${
                  pathname === link.to ? "bg-secondary text-secondary-foreground" : "text-foreground/80"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Button asChild variant="outline" className="relative rounded-full">
            <Link to="/cart" aria-label={`Cart with ${count} items`}>
              <ShoppingCart className="size-4" aria-hidden="true" />
              <span className="hidden sm:inline">Cart</span>
              {count > 0 ? (
                <Badge className="absolute -top-2 -right-2 h-5 min-w-5 justify-center rounded-full px-1.5 text-[11px]">
                  {count}
                </Badge>
              ) : null}
            </Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="size-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm">
              <SheetHeader>
                <SheetTitle className="font-display">Harvest Haat</SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="flex flex-col gap-1 px-4 pb-6">
                {[...NAV_LINKS, { to: "/cart", label: "Cart" }].map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 text-base font-medium transition-colors hover:bg-secondary"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
