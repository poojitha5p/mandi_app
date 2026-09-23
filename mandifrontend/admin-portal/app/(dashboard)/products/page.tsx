"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { listProducts, setProductStatus } from "@/lib/api";
import { Product } from "@/lib/types";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    listProducts().then(setProducts);
  }, []);

  async function toggleStatus(product: Product) {
    const next = product.status === "active" ? "disabled" : "active";
    setProducts((prev) => prev.map((p) => (p.id === product.id ? { ...p, status: next } : p)));
    await setProductStatus(product.id, next);
  }

  const filtered = products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl">Products</h1>
        <Link
          href="/products/new"
          className="bg-oxblood hover:bg-oxbloodDeep transition-colors text-bone text-sm rounded-sm px-4 py-2"
        >
          Add product
        </Link>
      </div>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products…"
        className="w-full max-w-xs bg-white border border-line rounded-sm px-3 py-2 text-sm mb-5"
      />

      <div className="bg-white border border-line rounded-md overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate border-b border-line">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Variants</th>
              <th className="px-4 py-3 font-medium">Stock</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => {
              const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0);
              return (
                <tr key={product.id} className="border-b border-line last:border-0">
                  <td className="px-4 py-3">
                    <Link href={`/products/${product.id}/edit`} className="text-oxblood hover:underline">
                      {product.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3">{product.category}</td>
                  <td className="px-4 py-3">{product.variants.map((v) => v.weight).join(", ")}</td>
                  <td className={`px-4 py-3 tabular ${totalStock === 0 ? "text-ember" : ""}`}>{totalStock}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleStatus(product)}
                      className={`text-xs rounded-sm px-2 py-1 ${
                        product.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-boneDim text-slate"
                      }`}
                    >
                      {product.status === "active" ? "Active" : "Disabled"}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/products/${product.id}/edit`} className="text-sm text-slate hover:text-oxblood">
                      Edit
                    </Link>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slateLight text-sm">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
