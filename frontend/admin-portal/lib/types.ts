export type ProductStatus = "active" | "disabled";

export type ProductVariant = {
  id: string;
  weight: string; // e.g. "250g", "500g", "1kg"
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
  customerPhone: string;
  items: OrderItem[];
  status: OrderStatus;
  paymentStatus: "paid" | "pending" | "refunded";
  total: number;
  placedAt: string;
  address: string;
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
