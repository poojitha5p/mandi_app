export type ProductStatus = "active" | "disabled";

export type ProductVariant = {
  id: string;
  weight: string;
  price: number;
  discountPrice?: number;
  stock: number;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  imageUrl?: string;
  status: ProductStatus;
  variants: ProductVariant[];
  createdAt: string;
};

export type Category = {
  id: string;
  name: string;
  productCount: number;
};

export type DashboardStats = {
  totalOrders: number;
  todaysOrders: number;
  revenue: number;
  pendingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  lowStockCount: number;
  totalProducts: number;
  activeProducts: number;
  ordersByStatus: Array<{ status: string; count: number }>;
};

export type OrderStatus =
  | "placed"
  | "confirmed"
  | "processing"
  | "packed"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export type OrderItem = {
  productId: string;
  productName: string;
  variant: string;
  quantity: number;
  price: number;
};

export type Order = {
  id: string;
  customerName: string;
  customerEmail?: string;
  customerPhone: string;
  items: OrderItem[];
  status: OrderStatus;
  paymentMethod: string;
  total: number;
  placedAt: string;
  address: string;
  deliverySlot?: string;
  subtotal?: number;
  deliveryFee?: number;
  discount?: number;
};

export const ORDER_STATUS_FLOW: OrderStatus[] = [
  "placed",
  "confirmed",
  "processing",
  "packed",
  "out_for_delivery",
  "delivered",
];

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  placed: "Placed",
  confirmed: "Confirmed",
  processing: "Processing",
  packed: "Packed",
  out_for_delivery: "Out for delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};
