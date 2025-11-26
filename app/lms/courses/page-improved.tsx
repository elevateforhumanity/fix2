import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Search, Filter, Clock, Users, Star, TrendingUp, BookOpen } from "lucide-react";

export default async function CoursesPage() {
  const supabase = await createClient();
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const { data: courses } = await supabase
    .from("courses")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section with Prominent Search */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-4">Discover Your Next Course</h1>
          <p className="text-blue-50 text-lg mb-8">
            Explore {courses?.length || 0} courses designed to advance your career
          </p>

          {/* Prominent Search Bar */}
          <div className="max-w-3xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
              <input
                type="text"
                placeholder="Search for courses, skills, or topics..."
                className="w-full pl-14 pr-4 py-4 text-lg rounded-xl border-0 focus:outline-none focus:ring-4 focus:ring-blue-300 text-slate-900"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="text-sm text-blue-100">Popular:</span>
              {['Medical Assistant', 'HVAC', 'CDL Training', 'Welding', 'IT Support'].map((topic) => (
                <button
                  key={topic}
                  className="px-4 py-1.5 bg-white/20 hover:bg-white/30 rounded-full text-sm font-medium transition"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-slate-900">Filters</h2>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Clear All
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-slate-900 mb-3">Category</h3>
                <div className="space-y-2">
                  {['Healthcare', 'Technology', 'Trades', 'Business', 'Transportation'].map((category) => (
                    <label key={category} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                      <span className="text-sm text-slate-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Level Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-slate-900 mb-3">Level</h3>
                <div className="space-y-2">
                  {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                    <label key={level} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                      <span className="text-sm text-slate-700">{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Duration Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-slate-900 mb-3">Duration</h3>
                <div className="space-y-2">
                  {['< 4 weeks', '4-8 weeks', '8-12 weeks', '> 12 weeks'].map((duration) => (
                    <label key={duration} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                      <span className="text-sm text-slate-700">{duration}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Price</h3>
                <div className="space-y-2">
                  {['Free', 'Paid', 'Funded (WIOA/WRG)'].map((price) => (
                    <label key={price} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                      <span className="text-sm text-slate-700">{price}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Course Grid */}
          <div className="lg:col-span-3">
            {/* Sort and View Options */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-slate-600">
                Showing <span className="font-semibold">{courses?.length || 0}</span> courses
              </p>
              <div className="flex items-center gap-4">
                <select className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Most Popular</option>
                  <option>Newest First</option>
                  <option>Highest Rated</option>
                  <option>Shortest Duration</option>
                </select>
              </div>
            </div>

            {/* Course Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses?.map((course) => (
                <Link
                  key={course.id}
                  href={`/lms/courses/${course.slug || course.id}`}
                  className="bg-white rounded-xl shadow-sm border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 overflow-hidden group"
                >
                  {/* Course Image */}
                  <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
                    {course.thumbnail_url ? (
                      <img
                        src={course.thumbnail_url}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="w-16 h-16 text-white/50" />
                      </div>
                    )}
                    {/* Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-blue-700">
                        {course.category || 'Course'}
                      </span>
                    </div>
                  </div>

                  {/* Course Info */}
                  <div className="p-5">
                    <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-blue-600 transition">
                      {course.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                      {course.description || 'Learn essential skills for your career advancement.'}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>8 weeks</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>1.2k students</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>4.8</span>
                      </div>
                    </div>

                    {/* Enroll Button */}
                    <button className="mt-4 w-full py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
                      Enroll Now
                    </button>
                  </div>
                </Link>
              ))}
            </div>

            {/* Empty State */}
            {(!courses || courses.length === 0) && (
              <div className="text-center py-16">
                <BookOpen className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No courses found</h3>
                <p className="text-slate-600 mb-6">Try adjusting your filters or search terms</p>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
