"use client";

import { useEffect, useState } from "react";

import { api } from "@/lib/api";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const res = await api.get("/auth/me");

      setUser(res.data);
    } catch {
      window.location.href = "/login";
    }
  };

  if (!user) {
    return <main className="p-8 text-white">Loading...</main>;
  }

  return (
    <main className="min-h-screen p-8 text-white">
      <h1 className="text-4xl font-bold">🚀 AstraX Academy</h1>

      <div className="mt-8 rounded-2xl bg-slate-900 p-8">
        <h2 className="text-2xl font-bold">
          👨‍🚀 Welcome back, {user.displayName}
        </h2>

        <p className="mt-4 text-slate-400">{user.email}</p>

        <p className="mt-2 text-slate-400">QA Cadet • Level 1</p>
      </div>
    </main>
  );
}
