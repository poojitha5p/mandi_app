"use client";

import { useEffect, useState } from "react";
import { listProducts, updateStock } from "@/lib/api";
import { Product } from "@/lib/types";

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    listProducts().then(setProducts);
  }, []);

  async function handleStockChange(productId: string, variantId: string, stock: number) {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? { ...p, variants: p.variants.map((v) => (v.id === variantId ? { ...v, stock } : v)) }
          : p
      )
    );
    await updateStock(productId, variantId, stock);
  }

  return (
    <div>
      <h1 className="font-display text-2xl mb-6">Inventory</h1>

      <div className="bg-white border border-line rounded-md overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate border-b border-line">
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Variant</th>
              <th className="px-4 py-3 font-medium">Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.flatMap((product) =>
              product.variants.map((variant) => (
                <tr key={variant.id} className="border-b border-line last:border-0">
                  <td className="px-4 py-3">{product.name}</td>
                  <td className="px-4 py-3">{variant.weight}</td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      min={0}
                      value={variant.stock}
                      onChange={(e) => handleStockChange(product.id, variant.id, Number(e.target.value))}
                      className={`w-24 border rounded-sm px-2 py-1.5 text-sm tabular ${
                        variant.stock === 0 ? "border-ember text-ember" : "border-line"
                      }`}
                    />
                    {variant.stock === 0 && <span className="ml-2 text-xs text-ember">Out of stock</span>}
                    {variant.stock > 0 && variant.stock <= 5 && (
                      <span className="ml-2 text-xs text-ember">Low stock</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
