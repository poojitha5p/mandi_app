// -----------------------------------------------------------------------------
// Meat Co. Admin API
// All frontend/backend communication goes through this file.
// Backend: Django + DRF + SimpleJWT
// Default local backend: http://127.0.0.1:8000
// -----------------------------------------------------------------------------

import {
  Category,
  DashboardStats,
  Order,
  OrderStatus,
  Product,
  ProductStatus,
  ProductVariant,
} from "./types";
import {
  mockCategories,
  mockOrders,
  mockProducts,
  mockStats,
} from "./mock-data";

const BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000").replace(/\/$/, "");
export const USE_MOCKS = false;

function toNumber(value: unknown, fallback = 0): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function normalizeStatus(value: unknown): ProductStatus {
  return String(value ?? "active").toLowerCase() === "disabled" ? "disabled" : "active";
}

function normalizeOrderStatus(value: unknown): OrderStatus {
  const status = String(value ?? "placed").toLowerCase() as OrderStatus;
  return [
    "placed",
    "confirmed",
    "processing",
    "packed",
    "out_for_delivery",
    "delivered",
    "cancelled",
  ].includes(status)
    ? status
    : "placed";
}

function normalizeCategory(raw: any): Category {
  return {
    id: String(raw?.id ?? raw?.pk ?? ""),
    name: String(raw?.name ?? ""),
    productCount: toNumber(raw?.productCount ?? raw?.product_count ?? raw?.products_count),
  };
}

function normalizeVariant(raw: any): ProductVariant {
  return {
    id: String(raw?.id ?? raw?.pk ?? ""),
    weight: String(raw?.weight ?? raw?.weight_label ?? raw?.weightLabel ?? ""),
    price: toNumber(raw?.price ?? raw?.unit_price),
    discountPrice:
      raw?.discountPrice != null || raw?.discount_price != null
        ? toNumber(raw?.discountPrice ?? raw?.discount_price)
        : undefined,
    stock: toNumber(raw?.stock ?? raw?.quantity ?? raw?.inventory?.stock),
  };
}

function normalizeProduct(raw: any): Product {
  const category = raw?.category;
  const variantsRaw = raw?.variants ?? raw?.product_variants ?? raw?.productVariants ?? [];

  return {
    id: String(raw?.id ?? raw?.pk ?? ""),
    name: String(raw?.name ?? raw?.product_name ?? ""),
    category:
      typeof category === "object"
        ? String(category?.name ?? category?.title ?? "")
        : String(category ?? raw?.category_name ?? ""),
    description: String(raw?.description ?? ""),
    imageUrl: raw?.imageUrl ?? raw?.image_url ?? raw?.image ?? undefined,
    status: normalizeStatus(raw?.status),
    variants: Array.isArray(variantsRaw) ? variantsRaw.map(normalizeVariant) : [],
    createdAt: String(raw?.createdAt ?? raw?.created_at ?? new Date().toISOString()),
  };
}

function normalizeOrderItem(raw: any) {
  return {
    productId: String(raw?.variant ?? raw?.product ?? raw?.product_id ?? ""),
    productName: String(raw?.product_name ?? raw?.productName ?? raw?.name ?? ""),
    variant: String(raw?.weight_label ?? raw?.weight ?? raw?.variant_label ?? ""),
    quantity: toNumber(raw?.quantity, 1),
    price: toNumber(raw?.unit_price ?? raw?.price),
  };
}

function normalizeOrder(raw: any): Order {
  return {
    id: String(raw?.id ?? raw?.order_id ?? ""),
    customerName: String(raw?.user_name ?? raw?.customer_name ?? raw?.customerName ?? ""),
    customerEmail: raw?.user_email ?? raw?.customer_email ?? undefined,
    customerPhone: String(raw?.user_phone ?? raw?.customer_phone ?? raw?.phone ?? "—"),
    items: Array.isArray(raw?.items) ? raw.items.map(normalizeOrderItem) : [],
    status: normalizeOrderStatus(raw?.status),
    paymentMethod: String(raw?.payment_method ?? raw?.paymentMethod ?? "—"),
    total: toNumber(raw?.total),
    placedAt: String(raw?.created_at ?? raw?.placed_at ?? raw?.placedAt ?? ""),
    address: String(raw?.delivery_address ?? raw?.address ?? "—"),
    deliverySlot: raw?.delivery_slot ?? raw?.deliverySlot ?? undefined,
    subtotal: raw?.subtotal != null ? toNumber(raw.subtotal) : undefined,
    deliveryFee: raw?.delivery_fee != null ? toNumber(raw.delivery_fee) : undefined,
    discount: raw?.discount != null ? toNumber(raw.discount) : undefined,
  };
}

function normalizeDashboardStats(raw: any, orders: Order[]): DashboardStats {
  const today = new Date();
  const todaysOrders = orders.filter((order) => {
    const date = new Date(order.placedAt);
    return (
      !Number.isNaN(date.getTime()) &&
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  }).length;

  return {
    totalOrders: toNumber(raw?.total_orders ?? raw?.totalOrders),
    todaysOrders: toNumber(raw?.today_orders ?? raw?.todays_orders ?? raw?.todaysOrders, todaysOrders),
    revenue: toNumber(raw?.total_revenue ?? raw?.revenue),
    pendingOrders: toNumber(raw?.pending_orders ?? raw?.pendingOrders),
    completedOrders: toNumber(raw?.delivered_orders ?? raw?.completed_orders ?? raw?.completedOrders),
    cancelledOrders: toNumber(raw?.cancelled_orders ?? raw?.cancelledOrders),
    lowStockCount: toNumber(raw?.low_stock_variants ?? raw?.lowStockCount),
    totalProducts: toNumber(raw?.total_products ?? raw?.totalProducts),
    activeProducts: toNumber(raw?.active_products ?? raw?.activeProducts),
    ordersByStatus: Array.isArray(raw?.orders_by_status)
      ? raw.orders_by_status.map((item: any) => ({
          status: String(item?.status ?? "").toLowerCase(),
          count: toNumber(item?.count),
        }))
      : [],
  };
}

async function parseResponse<T>(res: Response, url: string): Promise<T> {
  const text = await res.text();

  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${text.slice(0, 800)}`);
  }

  if (!text) return undefined as T;

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(`Backend returned non-JSON response for ${url}: ${text.slice(0, 300)}`);
  }
}

async function refreshAccessToken(): Promise<string | null> {
  if (typeof window === "undefined") return null;

  const refresh = localStorage.getItem("admin_refresh_token");
  if (!refresh) return null;

  const res = await fetch(`${BASE_URL}/api/auth/token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });

  if (!res.ok) {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_refresh_token");
    return null;
  }

  const data = await parseResponse<{ access: string }>(res, `${BASE_URL}/api/auth/token/refresh/`);
  if (!data?.access) return null;

  localStorage.setItem("admin_token", data.access);
  return data.access;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${BASE_URL}${path}`;
  let token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;

  const makeRequest = (accessToken: string | null) =>
    fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...(options?.headers ?? {}),
      },
    });

  let res = await makeRequest(token);

  // Automatically recover from an expired access token.
  if (res.status === 401 && typeof window !== "undefined") {
    const newToken = await refreshAccessToken();
    if (newToken) {
      token = newToken;
      res = await makeRequest(token);
    }
  }

  return parseResponse<T>(res, url);
}

function delay<T>(value: T, ms = 150): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

// ---- Auth ------------------------------------------------------------------

export async function loginAdmin(email: string, password: string) {
  if (USE_MOCKS) {
    if (!email || !password) throw new Error("Email and password are required");
    return delay({ token: "mock-token", refresh: "mock-refresh", name: "Admin" });
  }

  const data = await request<{ access: string; refresh: string }>("/api/auth/login/", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (typeof window !== "undefined") {
    localStorage.setItem("admin_token", data.access);
    localStorage.setItem("admin_refresh_token", data.refresh);
  }

  return { token: data.access, refresh: data.refresh, name: "Admin" };
}

// ---- Dashboard -------------------------------------------------------------

export async function getDashboardStats(): Promise<DashboardStats> {
  if (USE_MOCKS) return delay(mockStats);

  const raw = await request<any>("/api/admin/dashboard/");
  // The dashboard API does not currently return today_orders, so get orders
  // once and calculate it locally when needed.
  let orders: Order[] = [];
  try {
    const orderRaw = await request<any[]>("/api/admin/orders/");
    orders = orderRaw.map(normalizeOrder);
  } catch {
    // Stats should still render if the order list is temporarily unavailable.
  }
  return normalizeDashboardStats(raw, orders);
}

// ---- Products --------------------------------------------------------------

export async function listProducts(): Promise<Product[]> {
  if (USE_MOCKS) return delay(mockProducts);
  const data = await request<any>("/api/products/");
  const rows = Array.isArray(data) ? data : data?.results ?? [];
  return rows.map(normalizeProduct);
}

export async function getProduct(id: string): Promise<Product> {
  if (USE_MOCKS) {
    const found = mockProducts.find((p) => p.id === id);
    if (!found) throw new Error("Product not found");
    return delay(found);
  }
  return normalizeProduct(await request<any>(`/api/products/${id}/`));
}

export async function createProduct(product: Omit<Product, "id" | "createdAt">) {
  if (USE_MOCKS) {
    return delay({ ...product, id: `mock-${Date.now()}`, createdAt: new Date().toISOString() });
  }
  return normalizeProduct(await request<any>("/api/products/", {
    method: "POST",
    body: JSON.stringify(product),
  }));
}

export async function updateProduct(id: string, product: Partial<Product>) {
  if (USE_MOCKS) return delay({ ...product, id } as Product);
  return normalizeProduct(await request<any>(`/api/products/${id}/`, {
    method: "PATCH",
    body: JSON.stringify(product),
  }));
}

export async function setProductStatus(id: string, status: ProductStatus) {
  if (USE_MOCKS) return delay({ id, status });
  return normalizeProduct(await request<any>(`/api/products/${id}/status/`, {
    method: "PATCH",
    body: JSON.stringify({ status: status.toUpperCase() }),
  }));
}

export async function updateStock(productId: string, variantId: string, stock: number) {
  if (USE_MOCKS) return delay({ productId, variantId, stock });
  return request(`/api/products/${productId}/variants/${variantId}/stock/`, {
    method: "PATCH",
    body: JSON.stringify({ stock }),
  });
}

// ---- Categories ------------------------------------------------------------

export async function listCategories(): Promise<Category[]> {
  if (USE_MOCKS) return delay(mockCategories);
  const data = await request<any>("/api/categories/");
  const rows = Array.isArray(data) ? data : data?.results ?? [];
  return rows.map(normalizeCategory);
}

export async function createCategory(name: string): Promise<Category> {
  if (USE_MOCKS) return delay({ id: `mock-${Date.now()}`, name, productCount: 0 });
  return normalizeCategory(await request<any>("/api/categories/", {
    method: "POST",
    body: JSON.stringify({ name }),
  }));
}

// ---- Orders ----------------------------------------------------------------

export async function listOrders(): Promise<Order[]> {
  if (USE_MOCKS) return delay(mockOrders);
  const data = await request<any>("/api/admin/orders/");
  const rows = Array.isArray(data) ? data : data?.results ?? [];
  return rows.map(normalizeOrder);
}

export async function getOrder(id: string): Promise<Order> {
  if (USE_MOCKS) {
    const found = mockOrders.find((o) => o.id === id);
    if (!found) throw new Error("Order not found");
    return delay(found);
  }
  return normalizeOrder(await request<any>(`/api/admin/orders/${id}/`));
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
  if (USE_MOCKS) return delay({ id, status });
  return normalizeOrder(await request<any>(`/api/admin/orders/${id}/status/`, {
    method: "PATCH",
    body: JSON.stringify({ status: status.toUpperCase() }),
  }));
}
