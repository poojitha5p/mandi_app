"use client";

import { useEffect, useState } from "react";
import ProductForm from "@/components/ProductForm";
import { getProduct, updateProduct } from "@/lib/api";
import { Product } from "@/lib/types";

export default function EditProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    getProduct(params.id)
      .then(setProduct)
      .catch(() => setNotFound(true));
  }, [params.id]);

  if (notFound) {
    return <p className="text-slate text-sm">Product not found.</p>;
  }

  if (!product) {
    return <p className="text-slate text-sm">Loading…</p>;
  }

  return (
    <div>
      <h1 className="font-display text-2xl mb-6">Edit product</h1>
      <ProductForm
        initial={product}
        submitLabel="Save changes"
        onSubmit={(draft) => updateProduct(product.id, draft).then(() => {})}
      />
    </div>
  );
}
