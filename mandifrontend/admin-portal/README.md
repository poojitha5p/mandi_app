# Meat Co. Admin Portal

Next.js (App Router) + TypeScript + Tailwind admin console covering login,
dashboard, product/category/inventory management, and order management.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000 — it redirects to the dashboard. The portal runs
entirely on mock data (`lib/mock-data.ts`) until an API base URL is set, so
every screen is clickable with no backend.

## Wiring in Poojitha's APIs

Everything goes through **`lib/api.ts`** — pages never call `fetch()`
directly. To connect a real backend:

1. Copy `.env.local.example` to `.env.local` and set
   `NEXT_PUBLIC_API_BASE_URL` to the backend URL.
2. In `lib/api.ts`, check each function's `request<...>("/admin/...")` call
   and adjust the path/payload shape to match the actual endpoint contract
   Poojitha provides.
3. `loginAdmin` expects `{ token, name }` back and stores the token in
   `localStorage` under `admin_token`; every subsequent request sends it as
   `Authorization: Bearer <token>`. Adjust if the real auth API differs.

Once `NEXT_PUBLIC_API_BASE_URL` is set, `USE_MOCKS` becomes `false`
automatically and every page switches from mock data to the real API with no
other code changes, and `AuthGuard` starts enforcing login.

## Structure

```
app/
  login/page.tsx              admin login
  (dashboard)/layout.tsx      sidebar shell + auth guard
  (dashboard)/page.tsx         dashboard (stat cards, recent orders)
  (dashboard)/products/        product list, add, edit, categories
  (dashboard)/inventory/       stock editing across all variants
  (dashboard)/orders/          order list + detail with status controls
components/                   Sidebar, forms, badges, stat cards
lib/api.ts                    single API layer (mock/live switch)
lib/mock-data.ts              placeholder data
lib/types.ts                  shared domain types (Product, Order, ...)
```

## Still to connect

- Real auth endpoint (currently mocked)
- Product/category/order endpoints from Poojitha
- Image upload for products (form currently has no image field wired up —
  add one once the upload endpoint/storage is decided)
- Customer management screens (not in this pass — scope was dashboard,
  products, orders per the current task list)
