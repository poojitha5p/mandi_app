// -----------------------------------------------------------------------------
// API LAYER
//
// This is the ONLY file that should talk to the backend. Every page/component
// calls the functions below instead of calling fetch() directly, so wiring in
// Poojitha's real endpoints later means editing this one file, not every page.
//
// Set NEXT_PUBLIC_API_BASE_URL in .env.local once the backend URL is known:
//   NEXT_PUBLIC_API_BASE_URL=https://api.yourproject.com
//
// Until then, USE_MOCKS stays true and every function returns mock data so the
// UI is fully clickable without a backend.
// -----------------------------------------------------------------------------

import { Category, Order, OrderStatus, Product } from "./types";
import { mockCategories, mockOrders, mockProducts, mockStats } from "./mock-data";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
export const USE_MOCKS = BASE_URL === "";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options?.headers ?? {}),
    },
  });
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${await res.text()}`);
  }
  return res.json() as Promise<T>;
}

function delay<T>(value: T, ms = 350): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

// ---- Auth ----------------------------------------------------------------

export async function loginAdmin(email: string, password: string) {
  if (USE_MOCKS) {
    if (!email || !password) throw new Error("Email and password are required");
    return delay({ token: "mock-token", name: "Admin" });
  }
  // Expected contract from Poojitha's auth API — adjust path/fields to match.
  return request<{ token: string; name: string }>("/admin/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

// ---- Dashboard -------------------------------------------------------------

export async function getDashboardStats() {
  if (USE_MOCKS) return delay(mockStats);
  return request<typeof mockStats>("/admin/dashboard/stats");
}

// ---- Products ---------------------------------------------------------------

export async function listProducts() {
  if (USE_MOCKS) return delay(mockProducts);
  return request<Product[]>("/admin/products");
}

export async function getProduct(id: string) {
  if (USE_MOCKS) {
    const found = mockProducts.find((p) => p.id === id);
    if (!found) throw new Error("Product not found");
    return delay(found);
  }
  return request<Product>(`/admin/products/${id}`);
}

export async function createProduct(product: Omit<Product, "id" | "createdAt">) {
  if (USE_MOCKS) return delay({ ...product, id: `mock-${Date.now()}`, createdAt: new Date().toISOString() });
  return request<Product>("/admin/products", { method: "POST", body: JSON.stringify(product) });
}

export async function updateProduct(id: string, product: Partial<Product>) {
  if (USE_MOCKS) return delay({ ...product, id } as Product);
  return request<Product>(`/admin/products/${id}`, { method: "PATCH", body: JSON.stringify(product) });
}

export async function setProductStatus(id: string, status: Product["status"]) {
  if (USE_MOCKS) return delay({ id, status });
  return request<Product>(`/admin/products/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) });
}

export async function updateStock(productId: string, variantId: string, stock: number) {
  if (USE_MOCKS) return delay({ productId, variantId, stock });
  return request(`/admin/products/${productId}/variants/${variantId}/stock`, {
    method: "PATCH",
    body: JSON.stringify({ stock }),
  });
}

// ---- Categories ---------------------------------------------------------------

export async function listCategories() {
  if (USE_MOCKS) return delay(mockCategories);
  return request<Category[]>("/admin/categories");
}

export async function createCategory(name: string) {
  if (USE_MOCKS) return delay({ id: `mock-${Date.now()}`, name, productCount: 0 });
  return request<Category>("/admin/categories", { method: "POST", body: JSON.stringify({ name }) });
}

// ---- Orders ---------------------------------------------------------------

export async function listOrders() {
  if (USE_MOCKS) return delay(mockOrders);
  return request<Order[]>("/admin/orders");
}

export async function getOrder(id: string) {
  if (USE_MOCKS) {
    const found = mockOrders.find((o) => o.id === id);
    if (!found) throw new Error("Order not found");
    return delay(found);
  }
  return request<Order>(`/admin/orders/${id}`);
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
  if (USE_MOCKS) return delay({ id, status });
  return request<Order>(`/admin/orders/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) });
}
