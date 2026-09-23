"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { listOrders } from "@/lib/api";
import { Order, OrderStatus, ORDER_STATUS_LABEL } from "@/lib/types";
import OrderStatusBadge from "@/components/OrderStatusBadge";

const FILTERS: Array<OrderStatus | "all"> = [
  "all",
  "placed",
  "confirmed",
  "processing",
  "packed",
  "out_for_delivery",
  "delivered",
  "cancelled",
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<OrderStatus | "all">("all");

  useEffect(() => {
    listOrders().then(setOrders);
  }, []);

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div>
      <h1 className="font-display text-2xl mb-6">Orders</h1>

      <div className="flex gap-2 mb-5 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-xs rounded-sm px-3 py-1.5 border ${
              filter === f ? "bg-oxblood text-bone border-oxblood" : "border-line text-slate hover:border-oxblood"
            }`}
          >
            {f === "all" ? "All" : ORDER_STATUS_LABEL[f]}
          </button>
        ))}
      </div>

      <div className="bg-white border border-line rounded-md overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate border-b border-line">
              <th className="px-4 py-3 font-medium">Order</th>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Placed</th>
              <th className="px-4 py-3 font-medium">Payment</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <tr key={order.id} className="border-b border-line last:border-0">
                <td className="px-4 py-3">
                  <Link href={`/orders/${order.id}`} className="text-oxblood hover:underline">
                    {order.id}
                  </Link>
                </td>
                <td className="px-4 py-3">{order.customerName}</td>
                <td className="px-4 py-3 text-slate">
                  {new Date(order.placedAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                </td>
                <td className="px-4 py-3 capitalize">{order.paymentMethod}</td>
                <td className="px-4 py-3">
                  <OrderStatusBadge status={order.status} />
                </td>
                <td className="px-4 py-3 text-right tabular">₹{order.total}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slateLight text-sm">
                  No orders in this status.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
