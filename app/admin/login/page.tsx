"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      router.push("/admin");
      router.refresh();
      return;
    }

    const data = await response.json().catch(() => null);
    setError(data?.message ?? "Login failed");
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f5f8ff] to-[#eef3ff] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-[#dbe5ff] bg-white p-8 shadow-[0_28px_56px_-30px_rgba(45,75,198,0.3)]">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6E75BF]">Admin Access</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">Sign in</h1>
        <p className="mt-3 text-slate-600">Enter your admin username and password to access the dashboard.</p>

        <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Username
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              required
              className="h-12 rounded-xl border border-[#dbe5ff] px-4 outline-none transition focus:border-[#6E75BF] focus:ring-2 focus:ring-[#6E75BF]/15"
              placeholder="admin"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Password
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              className="h-12 rounded-xl border border-[#dbe5ff] px-4 outline-none transition focus:border-[#6E75BF] focus:ring-2 focus:ring-[#6E75BF]/15"
              placeholder="••••••••"
            />
          </label>

          {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 h-12 rounded-xl bg-gradient-to-r from-[#6E75BF] to-[#6E75BF] text-base font-semibold text-white transition hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Enter Dashboard"}
          </button>
        </form>
      </div>
    </main>
  );
}
