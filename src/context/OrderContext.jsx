import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const PHONE_STORAGE_KEY = "farmers_marketplace_buyer_phone";
const LAST_ORDER_KEY = "farmers_marketplace_last_order";

const OrderContext = createContext(null);

export function OrderProvider({ children }) {
  const [buyerPhone, setBuyerPhoneState] = useState("");
  const [lastOrder, setLastOrderState] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      setBuyerPhoneState(window.localStorage.getItem(PHONE_STORAGE_KEY) || "");
      const raw = window.localStorage.getItem(LAST_ORDER_KEY);
      setLastOrderState(raw ? JSON.parse(raw) : null);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  const setBuyerPhone = useCallback((phone) => {
    setBuyerPhoneState(phone || "");
    try {
      if (phone) window.localStorage.setItem(PHONE_STORAGE_KEY, phone);
      else window.localStorage.removeItem(PHONE_STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const setLastOrder = useCallback((order) => {
    setLastOrderState(order);
    try {
      if (order) window.localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
      else window.localStorage.removeItem(LAST_ORDER_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({ buyerPhone, setBuyerPhone, lastOrder, setLastOrder, hydrated }),
    [buyerPhone, setBuyerPhone, lastOrder, setLastOrder, hydrated],
  );

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders must be used within an OrderProvider");
  return context;
}
