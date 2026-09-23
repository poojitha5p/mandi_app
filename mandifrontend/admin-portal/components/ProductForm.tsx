"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { listCategories } from "@/lib/api";
import { Category, Product, ProductVariant } from "@/lib/types";

type Draft = Omit<Product, "id" | "createdAt">;

function emptyVariant(): ProductVariant {
  return { id: `new-${Math.random().toString(36).slice(2, 8)}`, weight: "", price: 0, stock: 0 };
}

export default function ProductForm({
  initial,
  onSubmit,
  submitLabel,
}: {
  initial?: Product;
  onSubmit: (draft: Draft) => Promise<void>;
  submitLabel: string;
}) {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState(initial?.name ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [status, setStatus] = useState<Product["status"]>(initial?.status ?? "active");
  const [variants, setVariants] = useState<ProductVariant[]>(initial?.variants ?? [emptyVariant()]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    listCategories().then(setCategories);
  }, []);

  function updateVariant(id: string, patch: Partial<ProductVariant>) {
    setVariants((prev) => prev.map((v) => (v.id === id ? { ...v, ...patch } : v)));
  }

  function addVariant() {
    setVariants((prev) => [...prev, emptyVariant()]);
  }

  function removeVariant(id: string) {
    setVariants((prev) => (prev.length > 1 ? prev.filter((v) => v.id !== id) : prev));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await onSubmit({ name, category, description, status, variants });
      router.push("/products");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl">
      <div className="bg-white border border-line rounded-md p-6 mb-6">
        <label className="block text-xs text-slate mb-1.5">Product name</label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-line rounded-sm px-3 py-2 text-sm mb-4"
          placeholder="e.g. Chicken Curry Cut"
        />

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs text-slate mb-1.5">Category</label>
            <select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-line rounded-sm px-3 py-2 text-sm bg-white"
            >
              <option value="" disabled>
                Select category
              </option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-slate mb-1.5">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Product["status"])}
              className="w-full border border-line rounded-sm px-3 py-2 text-sm bg-white"
            >
              <option value="active">Active</option>
              <option value="disabled">Disabled</option>
            </select>
          </div>
        </div>

        <label className="block text-xs text-slate mb-1.5">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full border border-line rounded-sm px-3 py-2 text-sm"
          placeholder="Short description shown on the product page"
        />
      </div>

      <div className="bg-white border border-line rounded-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg">Variants &amp; pricing</h3>
          <button type="button" onClick={addVariant} className="text-sm text-oxblood hover:underline">
            + Add variant
          </button>
        </div>

        <div className="space-y-3">
          {variants.map((variant) => (
            <div key={variant.id} className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-2 items-end">
              <div>
                <label className="block text-[11px] text-slate mb-1">Weight</label>
                <input
                  required
                  value={variant.weight}
                  onChange={(e) => updateVariant(variant.id, { weight: e.target.value })}
                  placeholder="500g"
                  className="w-full border border-line rounded-sm px-2 py-1.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate mb-1">Price (₹)</label>
                <input
                  required
                  type="number"
                  min={0}
                  value={variant.price}
                  onChange={(e) => updateVariant(variant.id, { price: Number(e.target.value) })}
                  className="w-full border border-line rounded-sm px-2 py-1.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate mb-1">Discount (₹)</label>
                <input
                  type="number"
                  min={0}
                  value={variant.discountPrice ?? ""}
                  onChange={(e) =>
                    updateVariant(variant.id, {
                      discountPrice: e.target.value ? Number(e.target.value) : undefined,
                    })
                  }
                  className="w-full border border-line rounded-sm px-2 py-1.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate mb-1">Stock</label>
                <input
                  required
                  type="number"
                  min={0}
                  value={variant.stock}
                  onChange={(e) => updateVariant(variant.id, { stock: Number(e.target.value) })}
                  className="w-full border border-line rounded-sm px-2 py-1.5 text-sm"
                />
              </div>
              <button
                type="button"
                onClick={() => removeVariant(variant.id)}
                className="text-slateLight hover:text-ember text-sm pb-1.5"
                aria-label="Remove variant"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="bg-oxblood hover:bg-oxbloodDeep transition-colors text-bone text-sm rounded-sm px-5 py-2.5 disabled:opacity-60"
        >
          {saving ? "Saving…" : submitLabel}
        </button>
        <button
          type="button"
          onClick={() => router.push("/products")}
          className="text-sm text-slate px-5 py-2.5 hover:text-oxblood"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
