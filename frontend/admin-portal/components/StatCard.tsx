export default function StatCard({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "warn";
}) {
  return (
    <div
      className={`bg-white px-5 py-4 border-l-[3px] ${
        tone === "warn" ? "border-ember" : "border-oxblood"
      }`}
    >
      <div className="text-slate text-xs">{label}</div>
      <div className="font-display text-2xl mt-1 tabular">{value}</div>
    </div>
  );
}
