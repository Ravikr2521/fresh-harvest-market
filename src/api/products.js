import { apiClient } from "./client";

const PRODUCTS_PATH = "/products/marketplace";

/**
 * getProducts({ page, perPage, q })
 * Returns { count, next, previous, results }
 */
export async function getProducts({ page = 1, perPage = 20, q = "", signal } = {}) {
  const data = await apiClient.get(
    PRODUCTS_PATH,
    { qc_status: "approved", per_page: perPage, page, q: q || undefined },
    { signal },
  );
  return {
    count: data?.count ?? 0,
    next: data?.next ?? null,
    previous: data?.previous ?? null,
    results: Array.isArray(data?.results) ? data.results : [],
  };
}

/** searchProducts is a thin alias that uses the API `q` parameter. */
export function searchProducts(params) {
  return getProducts(params);
}

/**
 * The API has no single-product endpoint, so we search the marketplace list
 * and pick the requested id. Falls back to scanning a larger page size.
 */
export async function getProductById(id, { signal } = {}) {
  const data = await getProducts({ page: 1, perPage: 100, signal });
  return data.results.find((product) => product.id === id) || null;
}
