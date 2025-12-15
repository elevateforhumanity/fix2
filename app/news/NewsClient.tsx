'use client';

import { Suspense, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowRight, Tag } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  featured: boolean;
}

interface NewsClientProps {
  newsArticles: Article[];
  categories: string[];
}

export function NewsClient({ newsArticles, categories }: NewsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const featuredArticles = newsArticles.filter((article) => article.featured);
  const filteredArticles = newsArticles.filter(
    (article) =>
      !article.featured &&
      (selectedCategory === 'All' || article.category === selectedCategory)
  );

  return (
    <>
      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                Featured Stories
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {featuredArticles.map((article) => (
                  <div
                    key={article.id}
                    className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition"
                  >
                    <div className="relative h-64">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-blue-600 text-white text-sm font-bold rounded-full">
                          Featured
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(article.date).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Tag className="w-4 h-4" />
                          {article.category}
                        </span>
                      </div>
                      <h3 className="text-lg md:text-lg font-bold mb-3 text-slate-900">
                        {article.title}
                      </h3>
                      <p className="text-slate-600 mb-4 leading-relaxed">
                        {article.excerpt}
                      </p>
                      <Link
                        href={`/news/${article.slug}`}
                        className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-8 bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full border transition font-semibold text-sm ${
                    selectedCategory === category
                      ? 'border-blue-600 bg-blue-50 text-blue-600'
                      : 'border-slate-300 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Articles */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Recent Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-lg overflow-hidden border border-slate-200 hover:shadow-lg transition"
                >
                  <div className="relative h-48">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-slate-600 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(article.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                      <span className="px-2 py-1 bg-slate-100 rounded text-xs font-semibold">
                        {article.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-slate-900">
                      {article.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <Link
                      href={`/news/${article.slug}`}
                      className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 text-sm"
                    >
                      Read More
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
