import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

const CART_STORAGE_KEY = "farmers_marketplace_cart";

const CartContext = createContext(null);

const lineKey = (productId, variantId) => `${productId}::${variantId}`;

function readStoredCart() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(readStoredCart());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable */
    }
  }, [items, hydrated]);

  const addToCart = useCallback((item, quantity = 1) => {
    const max = Number(item.availableUnits) || 0;
    if (max <= 0) {
      toast.error("This variant is out of stock");
      return false;
    }
    let clamped = false;
    setItems((prev) => {
      const key = lineKey(item.productId, item.variantId);
      const existing = prev.find((line) => lineKey(line.productId, line.variantId) === key);
      if (existing) {
        const next = Math.min(existing.quantity + quantity, max);
        clamped = next === existing.quantity;
        return prev.map((line) =>
          lineKey(line.productId, line.variantId) === key
            ? { ...line, ...item, quantity: next }
            : line,
        );
      }
      return [...prev, { ...item, quantity: Math.min(quantity, max) }];
    });
    if (clamped) toast.warning(`Only ${max} units available`);
    else toast.success(`${item.productName} added to cart`);
    return true;
  }, []);

  const removeFromCart = useCallback((productId, variantId) => {
    setItems((prev) =>
      prev.filter((line) => lineKey(line.productId, line.variantId) !== lineKey(productId, variantId)),
    );
    toast.success("Removed from cart");
  }, []);

  const updateQuantity = useCallback((productId, variantId, quantity) => {
    setItems((prev) =>
      prev
        .map((line) => {
          if (lineKey(line.productId, line.variantId) !== lineKey(productId, variantId)) return line;
          const max = Number(line.availableUnits) || 0;
          const next = Math.max(0, Math.min(Number(quantity) || 0, max));
          return { ...line, quantity: next };
        })
        .filter((line) => line.quantity > 0),
    );
  }, []);

  const increaseQuantity = useCallback((productId, variantId) => {
    setItems((prev) =>
      prev.map((line) => {
        if (lineKey(line.productId, line.variantId) !== lineKey(productId, variantId)) return line;
        const max = Number(line.availableUnits) || 0;
        if (line.quantity >= max) {
          toast.warning(`Only ${max} units available`);
          return line;
        }
        return { ...line, quantity: line.quantity + 1 };
      }),
    );
  }, []);

  const decreaseQuantity = useCallback((productId, variantId) => {
    setItems((prev) =>
      prev
        .map((line) =>
          lineKey(line.productId, line.variantId) === lineKey(productId, variantId)
            ? { ...line, quantity: line.quantity - 1 }
            : line,
        )
        .filter((line) => line.quantity > 0),
    );
  }, []);

  const clearCart = useCallback((silent = false) => {
    setItems([]);
    if (!silent) toast.success("Cart cleared");
  }, []);

  const getCartTotal = useCallback(
    () => items.reduce((sum, line) => sum + Number(line.price || 0) * line.quantity, 0),
    [items],
  );

  const getCartItemCount = useCallback(
    () => items.reduce((sum, line) => sum + line.quantity, 0),
    [items],
  );

  const isInCart = useCallback(
    (productId, variantId) =>
      items.some((line) => lineKey(line.productId, line.variantId) === lineKey(productId, variantId)),
    [items],
  );

  const getCartItem = useCallback(
    (productId, variantId) =>
      items.find((line) => lineKey(line.productId, line.variantId) === lineKey(productId, variantId)) ||
      null,
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      hydrated,
      addToCart,
      removeFromCart,
      updateQuantity,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      getCartTotal,
      getCartItemCount,
      isInCart,
      getCartItem,
    }),
    [
      items,
      hydrated,
      addToCart,
      removeFromCart,
      updateQuantity,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      getCartTotal,
      getCartItemCount,
      isInCart,
      getCartItem,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
