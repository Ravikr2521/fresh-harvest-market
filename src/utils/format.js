export function formatCurrency(value) {
  const amount = Number(value) || 0;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function formatPack(quantity, unit) {
  if (!quantity && !unit) return "";
  const qty = Number(quantity);
  const clean = Number.isFinite(qty) ? String(qty).replace(/\.0+$/, "") : quantity;
  return `${clean} ${unit || ""}`.trim();
}

export const activeVariants = (product) =>
  (product?.variants || []).filter((variant) => variant?.is_active !== false);

export const variantImages = (variant) =>
  (variant?.all_media || []).map((media) => media?.file).filter(Boolean);

export function productPriceFrom(product) {
  const prices = activeVariants(product)
    .map((v) => Number(v?.price))
    .filter((p) => Number.isFinite(p));
  return prices.length ? Math.min(...prices) : null;
}

export const isValidIndianPhone = (value) => /^[6-9]\d{9}$/.test(String(value || "").trim());
export const isValidPincode = (value) => /^[1-9]\d{5}$/.test(String(value || "").trim());
