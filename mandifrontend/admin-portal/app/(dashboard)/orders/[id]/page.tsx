"use client";

import { useEffect, useState } from "react";
import { getOrder, updateOrderStatus } from "@/lib/api";
import { Order, OrderStatus, ORDER_STATUS_FLOW, ORDER_STATUS_LABEL } from "@/lib/types";
import OrderStatusBadge from "@/components/OrderStatusBadge";

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<Order | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    getOrder(params.id)
      .then(setOrder)
      .catch(() => setNotFound(true));
  }, [params.id]);

  async function handleStatusChange(status: OrderStatus) {
    if (!order) return;
    setUpdating(true);
    try {
      setOrder({ ...order, status });
      await updateOrderStatus(order.id, status);
    } finally {
      setUpdating(false);
    }
  }

  if (notFound) return <p className="text-slate text-sm">Order not found.</p>;
  if (!order) return <p className="text-slate text-sm">Loading…</p>;

  const currentIndex = ORDER_STATUS_FLOW.indexOf(order.status);

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-1">
        <h1 className="font-display text-2xl">{order.id}</h1>
        <OrderStatusBadge status={order.status} />
      </div>
      <p className="text-slate text-sm mb-6">
        Placed {new Date(order.placedAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
      </p>

      <div className="bg-white border border-line rounded-md p-6 mb-6">
        <h2 className="font-display text-lg mb-3">Customer</h2>
        <p className="text-sm">{order.customerName}</p>
        <p className="text-sm text-slate">{order.customerPhone}</p>
        <p className="text-sm text-slate mt-1">{order.address}</p>
      </div>

      <div className="bg-white border border-line rounded-md p-6 mb-6">
        <h2 className="font-display text-lg mb-3">Items</h2>
        <table className="w-full text-sm">
          <tbody>
            {order.items.map((item, i) => (
              <tr key={i} className="border-b border-line last:border-0">
                <td className="py-2">{item.productName}</td>
                <td className="py-2 text-slate">{item.variant}</td>
                <td className="py-2 text-slate">× {item.quantity}</td>
                <td className="py-2 text-right tabular">₹{item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between pt-3 mt-1 border-t border-line font-medium text-sm">
          <span>Total</span>
          <span className="tabular">₹{order.total}</span>
        </div>
        <p className="text-xs text-slate mt-1 capitalize">Payment method: {order.paymentMethod}</p>
      </div>

      <div className="bg-white border border-line rounded-md p-6">
        <h2 className="font-display text-lg mb-4">Order status</h2>

        {order.status === "cancelled" ? (
          <p className="text-sm text-slate">This order was cancelled.</p>
        ) : (
          <>
            <div className="flex flex-wrap gap-2 mb-4">
              {ORDER_STATUS_FLOW.map((status, i) => (
                <button
                  key={status}
                  disabled={updating}
                  onClick={() => handleStatusChange(status)}
                  className={`text-xs rounded-sm px-3 py-1.5 border transition-colors ${
                    i === currentIndex
                      ? "bg-oxblood text-bone border-oxblood"
                      : i < currentIndex
                      ? "border-line text-slateLight"
                      : "border-line text-slate hover:border-oxblood"
                  }`}
                >
                  {ORDER_STATUS_LABEL[status]}
                </button>
              ))}
            </div>
            <button
              disabled={updating}
              onClick={() => handleStatusChange("cancelled")}
              className="text-xs text-ember hover:underline"
            >
              Cancel order
            </button>
          </>
        )}
      </div>
    </div>
  );
}
