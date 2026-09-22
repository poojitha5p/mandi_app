import { OrderStatus, ORDER_STATUS_LABEL } from "@/lib/types";

const TONE: Record<OrderStatus, string> = {
  placed: "bg-boneDim text-slate",
  confirmed: "bg-boneDim text-slate",
  processing: "bg-ember/15 text-ember",
  packed: "bg-ember/15 text-ember",
  out_for_delivery: "bg-oxblood/10 text-oxblood",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-700",
};

export default function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={`inline-block rounded-sm px-2 py-0.5 text-xs font-medium ${TONE[status]}`}>
      {ORDER_STATUS_LABEL[status]}
    </span>
  );
}
