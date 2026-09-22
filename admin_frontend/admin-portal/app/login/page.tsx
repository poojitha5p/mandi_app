"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { token } = await loginAdmin(email, password);
      localStorage.setItem("admin_token", token);
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <div className="text-bone font-display text-3xl tracking-tight">Meat Co.</div>
          <div className="text-slateLight text-sm mt-1">Operations console</div>
        </div>

        <form onSubmit={handleSubmit} className="bg-charcoal2 border border-charcoal rounded-md p-8">
          <label className="block text-xs text-slateLight mb-1.5">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@meatco.in"
            className="w-full bg-charcoal text-bone rounded-sm border border-charcoal2 px-3 py-2.5 text-sm mb-5 placeholder:text-slateLight/60"
          />

          <label className="block text-xs text-slateLight mb-1.5">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-charcoal text-bone rounded-sm border border-charcoal2 px-3 py-2.5 text-sm mb-6 placeholder:text-slateLight/60"
          />

          {error && (
            <p className="text-ember text-xs mb-4" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-oxblood hover:bg-oxbloodDeep transition-colors text-bone rounded-sm py-2.5 text-sm font-medium disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
