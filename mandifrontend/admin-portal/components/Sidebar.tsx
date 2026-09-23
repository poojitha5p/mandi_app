"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV = [
  { href: "/", label: "Dashboard" },
  { href: "/products", label: "Products" },
  { href: "/products/categories", label: "Categories" },
  { href: "/inventory", label: "Inventory" },
  { href: "/orders", label: "Orders" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  function logout() {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_refresh_token");
    router.push("/login");
  }

  return (
    <aside className="w-56 shrink-0 bg-charcoal text-bone min-h-screen flex flex-col">
      <div className="px-6 py-6 border-b border-white/10">
        <div className="font-display text-xl">Meat Co.</div>
        <div className="text-slateLight text-xs mt-0.5">Operations console</div>
      </div>

      <nav className="flex-1 py-4">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-6 py-2.5 text-sm border-l-2 transition-colors ${
              isActive(item.href)
                ? "border-ember text-bone bg-white/5"
                : "border-transparent text-slateLight hover:text-bone hover:bg-white/5"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <button
        onClick={logout}
        className="mx-6 mb-6 text-left text-xs text-slateLight hover:text-bone transition-colors"
      >
        Sign out
      </button>
    </aside>
  );
}
