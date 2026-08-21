/**
 * Centralised API client for the Farmers Marketplace backend.
 * Base URL comes from VITE_API_BASE_URL (see .env.example).
 */

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://vaaradhi-dev.agrani.tech/marketplace/api";

export class ApiError extends Error {
  constructor(message, status, payload) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

function buildUrl(path, params) {
  const url = new URL(
    `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`,
  );
  Object.entries(params || {}).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    url.searchParams.set(key, String(value));
  });
  return url.toString();
}

export async function request(path, { params, method = "GET", body, signal } = {}) {
  let response;
  try {
    response = await fetch(buildUrl(path, params), {
      method,
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: body ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch (error) {
    if (error?.name === "AbortError") throw error;
    throw new ApiError(
      "Network error. Please check your connection and try again.",
      0,
    );
  }

  let payload = null;
  const text = await response.text();
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = { message: text };
    }
  }

  if (!response.ok) {
    throw new ApiError(
      payload?.message || payload?.detail || `Request failed (${response.status})`,
      response.status,
      payload,
    );
  }

  return payload;
}

export const apiClient = {
  get: (path, params, options) => request(path, { ...options, params }),
  post: (path, body, options) => request(path, { ...options, method: "POST", body }),
};
