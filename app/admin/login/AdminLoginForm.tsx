"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/admin/service-requests";
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { ok?: boolean; message?: string };
      if (!res.ok || !data.ok) {
        setError(data.message ?? "Could not log in.");
        setLoading(false);
        return;
      }
      router.push(from.startsWith("/admin") ? from : "/admin/service-requests");
      router.refresh();
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-[60vh] justify-center px-5 py-24 md:py-28">
      <div className="w-full max-w-[420px] rounded-2xl border border-black/[0.08] bg-white p-8 shadow-[0_24px_64px_rgba(0,0,0,0.1)] ring-1 ring-black/[0.04] md:p-10">
        <p className="font-display text-[11px] font-bold uppercase tracking-[2.5px] text-exit-green">
          Exit 18 Equipment
        </p>
        <h1 className="font-display mt-2 text-[1.625rem] font-black uppercase tracking-tight text-exit-dark">
          Admin sign-in
        </h1>
        <p className="mt-2 text-[14px] leading-relaxed text-exit-gray">
          Enter the admin password for service requests.
        </p>

        <form onSubmit={onSubmit} className="mt-10 space-y-5">
          <div>
            <label
              className="mb-2 block text-[12px] font-bold uppercase tracking-[0.12em] text-exit-dark/70"
              htmlFor="admin-password"
            >
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-exit-dark/[0.14] px-4 py-3 text-[15px] outline-none ring-0 focus:border-exit-green focus:ring-2 focus:ring-exit-green/25"
              required
            />
          </div>
          {error && (
            <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-[13px] text-red-800">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full min-h-[52px] items-center justify-center rounded-lg border-2 border-exit-green bg-exit-green text-sm font-extrabold uppercase tracking-[0.05em] text-white transition hover:border-exit-green-mid hover:bg-exit-green-mid disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Continue"}
          </button>
        </form>
      </div>
    </main>
  );
}
