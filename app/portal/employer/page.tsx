// app/portal/employer/page.tsx - EMPLOYER PORTAL LOGIN
"use client";

import { useState } from "react";
import Link from "next/link";
import { Briefcase, Mail, Lock, ArrowLeft } from "lucide-react";

export default function EmployerPortalLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // TODO: Implement Supabase authentication with role check
    setTimeout(() => {
      window.location.href = "/employer/dashboard";
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-slate-50 flex items-center justify-center px-6 py-12">
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
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-orange-500 text-white mb-4">
              <Briefcase size={28} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Employer Portal
            </h1>
            <p className="text-sm text-slate-600">
              Manage apprentices, post jobs, and connect with talent
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Company Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hr@company.com"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition"
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
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-slate-300 text-orange-500 focus:ring-orange-500" />
                <span className="text-slate-600">Remember me</span>
              </label>
              <Link href="/portal/employer/forgot-password" className="text-orange-600 hover:text-orange-700 font-medium">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg"
            >
              {isLoading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-slate-500">New employer?</span>
            </div>
          </div>

          <Link
            href="/employers"
            className="block w-full py-3 rounded-lg border-2 border-orange-500 text-orange-600 font-semibold text-center hover:bg-orange-50 transition"
          >
            Learn About Partnerships
          </Link>

          <p className="text-center text-sm text-slate-600 mt-6">
            Need help?{" "}
            <a href="mailto:Elevate4humanityedu@gmail.com" className="text-orange-600 hover:text-orange-700 font-medium">
              Contact Employer Relations
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
