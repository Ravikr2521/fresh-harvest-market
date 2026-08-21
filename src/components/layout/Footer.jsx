import { Link } from "@tanstack/react-router";
import { Sprout } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-cream">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Sprout className="size-4" aria-hidden="true" />
            </span>
            <span className="font-display text-lg font-semibold">Harvest Haat</span>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            A farm-direct marketplace connecting growers with buyers. Fresh produce, honest
            pricing, no middlemen.
          </p>
        </div>
        <nav aria-label="Footer" className="space-y-2 text-sm">
          <h2 className="font-display text-base font-semibold">Marketplace</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/products" className="hover:text-foreground">Shop produce</Link></li>
            <li><Link to="/cart" className="hover:text-foreground">Your cart</Link></li>
            <li><Link to="/orders" className="hover:text-foreground">Track orders</Link></li>
          </ul>
        </nav>
        <div className="space-y-2 text-sm">
          <h2 className="font-display text-base font-semibold">How it works</h2>
          <p className="text-muted-foreground">
            Pick a variant, add it to your cart and place an order with your phone number. Track
            everything from the Orders page — no account needed.
          </p>
        </div>
      </div>
      <div className="border-t border-border px-4 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Harvest Haat. All rights reserved.
      </div>
    </footer>
  );
}
