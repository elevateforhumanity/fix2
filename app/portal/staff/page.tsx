// app/portal/staff/page.tsx - STAFF PORTAL LOGIN
"use client";
// Suggested image: /images/success-new/success-16.jpg

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Users, Mail, Lock, ArrowLeft, AlertCircle } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";

export const dynamic = 'force-dynamic';

export default function StaffPortalLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { signIn } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      await signIn(email, password);
      // TODO: Check user role and redirect accordingly
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <Link
          href="/portal"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-8 transition"
        >
          <ArrowLeft size={16} />
          Back to Portal Home
        </Link>

        <div className="rounded-2xl bg-white p-8 shadow-xl ring-1 ring-slate-200">
          <div className="text-center mb-8">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500 text-white mb-4">
              <Users size={28} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Staff Portal
            </h1>
            <p className="text-sm text-slate-600">
              Access staff tools, manage enrollments, and support learners
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Staff Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="staff@elevateforhumanity.org"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-slate-300 text-blue-500 focus:ring-blue-500" />
                <span className="text-slate-600">Remember me</span>
              </label>
              <Link href="/portal/staff/forgot-password" className="text-blue-600 hover:text-blue-700 font-medium">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg"
            >
              {isLoading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-600 mt-6">
            Staff access only. Need help?{" "}
            <a href="mailto:Elevate4humanityedu@gmail.com" className="text-blue-600 hover:text-blue-700 font-medium">
              Contact IT Support
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
