import { apiClient } from "./client";

const ORDER_PATH = "/order";

/**
 * createOrder(payload)
 * payload: { products: [{ no_of_units, variant }], delivery_address,
 *            delivery_pincode, buyer_name, buyer_phone }
 */
export async function createOrder(payload, { signal } = {}) {
  const data = await apiClient.post(ORDER_PATH, payload, { signal });
  return data?.data ?? data;
}

/** getOrdersByPhone(phone) -> { count, next, previous, results } */
export async function getOrdersByPhone(phone, { signal } = {}) {
  const data = await apiClient.get(ORDER_PATH, { buyer_phone: phone }, { signal });
  const body = data?.data ?? data;
  return {
    count: body?.count ?? 0,
    next: body?.next ?? null,
    previous: body?.previous ?? null,
    results: Array.isArray(body?.results) ? body.results : [],
  };
}
