"use client";

import { useEffect, useState } from "react";
import { createCategory, listCategories } from "@/lib/api";
import { Category } from "@/lib/types";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newName, setNewName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    listCategories().then(setCategories);
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;
    setSaving(true);
    try {
      const created = await createCategory(newName.trim());
      setCategories((prev) => [...prev, created]);
      setNewName("");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <h1 className="font-display text-2xl mb-6">Categories</h1>

      <form onSubmit={handleAdd} className="flex gap-2 mb-6 max-w-md">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New category name"
          className="flex-1 bg-white border border-line rounded-sm px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={saving}
          className="bg-oxblood hover:bg-oxbloodDeep transition-colors text-bone text-sm rounded-sm px-4 py-2 disabled:opacity-60"
        >
          Add
        </button>
      </form>

      <div className="bg-white border border-line rounded-md overflow-hidden max-w-md">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate border-b border-line">
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium text-right">Products</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id} className="border-b border-line last:border-0">
                <td className="px-4 py-3">{c.name}</td>
                <td className="px-4 py-3 text-right tabular">{c.productCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
