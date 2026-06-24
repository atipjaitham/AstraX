"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

import { api } from "@/lib/api";
import { auth } from "@/lib/auth";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const res = await api.post("/auth/register", {
        email,
        displayName,
        password,
      });

      auth.setToken(res.data.accessToken);

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <Card>
        <h1 className="mb-2 text-4xl font-bold text-white">
          🚀 AstraX Academy
        </h1>

        <p className="mb-8 text-slate-400">Become a QA Cadet</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Display Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />

          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-sm text-red-400">{error}</p>}

          <Button>{loading ? "Creating Account..." : "Launch Mission"}</Button>
        </form>
      </Card>
    </main>
  );
}
