"use client";

import ProductForm from "@/components/ProductForm";
import { createProduct } from "@/lib/api";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="font-display text-2xl mb-6">Add product</h1>
      <ProductForm submitLabel="Create product" onSubmit={(draft) => createProduct(draft).then(() => {})} />
    </div>
  );
}
