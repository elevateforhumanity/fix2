import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketplace - Workforce Development Platform | Elevate for Humanity",
  description: "Elevate for Humanity connects job seekers with free career training and employers with skilled talent.",
  keywords: ["workforce development", "career training", "job placement", "WIOA"],
  openGraph: {
    title: "Marketplace - Workforce Development Platform | Elevate for Humanity",
    description: "Elevate for Humanity connects job seekers with free career training and employers with skilled talent.",
    images: ["/images/hero-banner-new.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marketplace - Workforce Development Platform | Elevate for Humanity",
    description: "Elevate for Humanity connects job seekers with free career training and employers with skilled talent.",
    images: ["/images/hero-banner-new.png"],
  },
};



async function getMarketplaceCourses() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("marketplace_courses")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  return data || [];
}

export default async function MarketplacePage() {
  const courses = await getMarketplaceCourses();

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Enhanced Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-200 mb-2">
              Elevate Marketplace
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Your Next Career Path
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Browse 27+ fully-funded training programs. Filter by industry, duration, and funding source.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search programs (e.g., HVAC, Medical Assistant, Barber)"
                  className="flex-1 px-6 py-4 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition">
                  Search
                </button>
              </div>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {['Healthcare', 'Skilled Trades', 'Beauty & Wellness', 'Technology', 'Business'].map((cat) => (
                <button key={cat} className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition">
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-b border-slate-200 py-8">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">27+</div>
              <div className="text-sm text-slate-600">Training Programs</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">100%</div>
              <div className="text-sm text-slate-600">Funded Training</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">2,847</div>
              <div className="text-sm text-slate-600">Students Enrolled</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">85%</div>
              <div className="text-sm text-slate-600">Job Placement Rate</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <header className="mb-6">
          <h2 className="text-2xl font-semibold text-slate-900">
            Available Programs
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Browse ready-to-launch programs you can license for your school,
            workforce board, or employer academy.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          {courses.map((c) => (
            <Link
              key={c.id}
              href={`/marketplace/${c.id}`}
              className="rounded-2xl border border-slate-100 bg-white p-4 text-sm shadow-sm hover:border-orange-500"
            >
              <h2 className="text-base font-semibold text-slate-900">
                {c.title}
              </h2>
              <p className="mt-1 line-clamp-3 text-xs text-slate-600">
                {c.summary}
              </p>
              <p className="mt-3 text-xs font-semibold text-orange-600">
                {c.price_cents === 0
                  ? "Free / Partnership"
                  : `$${(c.price_cents / 100).toFixed(2)} per tenant`}
              </p>
            </Link>
          ))}
          {courses.length === 0 && (
            <p className="text-sm text-slate-500">
              No marketplace programs yet. Check back soon!
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
