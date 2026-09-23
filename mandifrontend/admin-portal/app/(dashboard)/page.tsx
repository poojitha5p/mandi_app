"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getDashboardStats, listOrders } from "@/lib/api";
import { DashboardStats, Order } from "@/lib/types";
import OrderStatusBadge from "@/components/OrderStatusBadge";
import StatCard from "@/components/StatCard";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);

  useEffect(() => {
    getDashboardStats().then(setStats);
    listOrders().then((orders) => setRecentOrders(orders.slice(0, 5)));
  }, []);

  return (
    <div>
      <h1 className="font-display text-2xl mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <StatCard label="Total orders" value={fmt(stats?.totalOrders)} />
        <StatCard label="Today's orders" value={fmt(stats?.todaysOrders)} />
        <StatCard label="Revenue" value={stats ? `₹${Number(stats.revenue).toLocaleString("en-IN")}` : "—"} />
        <StatCard label="Pending" value={fmt(stats?.pendingOrders)} tone="warn" />
        <StatCard label="Completed" value={fmt(stats?.completedOrders)} />
        <StatCard label="Cancelled" value={fmt(stats?.cancelledOrders)} />
        <StatCard label="Low stock alerts" value={fmt(stats?.lowStockCount)} tone="warn" />
      </div>

      <div className="flex items-center justify-between mb-3">
        <h2 className="font-display text-lg">Recent orders</h2>
        <Link href="/orders" className="text-sm text-oxblood hover:underline">
          View all orders
        </Link>
      </div>

      <div className="bg-white border border-line rounded-md overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate border-b border-line">
              <th className="px-4 py-3 font-medium">Order</th>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id} className="border-b border-line last:border-0">
                <td className="px-4 py-3">
                  <Link href={`/orders/${order.id}`} className="text-oxblood hover:underline">
                    {order.id}
                  </Link>
                </td>
                <td className="px-4 py-3">{order.customerName}</td>
                <td className="px-4 py-3">
                  <OrderStatusBadge status={order.status} />
                </td>
                <td className="px-4 py-3 text-right tabular">₹{order.total}</td>
              </tr>
            ))}
            {recentOrders.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slateLight text-sm">
                  No orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function fmt(n?: number) {
  return n === undefined ? "—" : n.toLocaleString("en-IN");
}
