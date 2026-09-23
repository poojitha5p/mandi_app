import { Category, Order, Product } from "./types";

export const mockStats = {
  totalOrders: 1284,
  todaysOrders: 42,
  revenue: 386400,
  pendingOrders: 18,
  completedOrders: 1190,
  cancelledOrders: 76,
  lowStockCount: 5,
};

export const mockCategories: Category[] = [
  { id: "cat-chicken", name: "Chicken", productCount: 14 },
  { id: "cat-mutton", name: "Mutton", productCount: 9 },
  { id: "cat-fish", name: "Fish & Seafood", productCount: 11 },
  { id: "cat-rtc", name: "Ready to Cook", productCount: 7 },
  { id: "cat-eggs", name: "Eggs", productCount: 3 },
  { id: "cat-combos", name: "Combos", productCount: 5 },
];

export const mockProducts: Product[] = [
  {
    id: "p-1",
    name: "Chicken Curry Cut",
    category: "Chicken",
    description: "Farm-fresh chicken, hand-cut for curry, skin-off on request.",
    status: "active",
    createdAt: "2026-08-01T10:00:00Z",
    variants: [
      { id: "v-1a", weight: "250g", price: 99, discountPrice: 89, stock: 42 },
      { id: "v-1b", weight: "500g", price: 189, discountPrice: 169, stock: 30 },
      { id: "v-1c", weight: "1kg", price: 359, stock: 12 },
    ],
  },
  {
    id: "p-2",
    name: "Mutton Boneless",
    category: "Mutton",
    description: "Tender boneless mutton, trimmed and ready to cook.",
    status: "active",
    createdAt: "2026-08-03T10:00:00Z",
    variants: [
      { id: "v-2a", weight: "250g", price: 249, stock: 3 },
      { id: "v-2b", weight: "500g", price: 469, stock: 8 },
    ],
  },
  {
    id: "p-3",
    name: "Rohu Fish Curry Cut",
    category: "Fish & Seafood",
    description: "Fresh river Rohu, curry-cut with head and tail options.",
    status: "disabled",
    createdAt: "2026-08-05T10:00:00Z",
    variants: [{ id: "v-3a", weight: "500g", price: 199, stock: 0 }],
  },
  {
    id: "p-4",
    name: "Chicken Seekh Kebab (Marinated)",
    category: "Ready to Cook",
    description: "Ready-to-cook seekh kebabs, marinated in-house.",
    status: "active",
    createdAt: "2026-08-10T10:00:00Z",
    variants: [{ id: "v-4a", weight: "400g (8 pc)", price: 229, discountPrice: 199, stock: 20 }],
  },
];

export const mockOrders: Order[] = [
  {
    id: "ORD-10231",
    customerName: "Ravi Teja",
    customerPhone: "+91 90000 12345",
    items: [
      { productId: "p-1", productName: "Chicken Curry Cut", variant: "500g", quantity: 2, price: 169 },
      { productId: "p-4", productName: "Chicken Seekh Kebab", variant: "400g", quantity: 1, price: 199 },
    ],
    status: "out_for_delivery",
    paymentStatus: "paid",
    total: 537,
    placedAt: "2026-09-22T08:12:00Z",
    address: "Flat 302, Jubilee Residency, Madhapur, Hyderabad",
  },
  {
    id: "ORD-10232",
    customerName: "Sindhu Reddy",
    customerPhone: "+91 90000 54321",
    items: [{ productId: "p-2", productName: "Mutton Boneless", variant: "500g", quantity: 1, price: 469 }],
    status: "processing",
    paymentStatus: "paid",
    total: 469,
    placedAt: "2026-09-22T09:40:00Z",
    address: "12-4-56, Banjara Hills Rd 3, Hyderabad",
  },
  {
    id: "ORD-10233",
    customerName: "Kiran Kumar",
    customerPhone: "+91 90000 98765",
    items: [{ productId: "p-1", productName: "Chicken Curry Cut", variant: "1kg", quantity: 1, price: 359 }],
    status: "placed",
    paymentStatus: "pending",
    total: 359,
    placedAt: "2026-09-22T10:05:00Z",
    address: "Door No 8-2-120, Gachibowli, Hyderabad",
  },
  {
    id: "ORD-10230",
    customerName: "Anitha Rao",
    customerPhone: "+91 90000 11223",
    items: [{ productId: "p-3", productName: "Rohu Fish Curry Cut", variant: "500g", quantity: 1, price: 199 }],
    status: "cancelled",
    paymentStatus: "refunded",
    total: 199,
    placedAt: "2026-09-21T18:22:00Z",
    address: "Plot 45, Kondapur, Hyderabad",
  },
];
