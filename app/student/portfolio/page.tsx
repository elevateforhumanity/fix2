'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default function StudentPortfolio() {
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [apprenticeship, setApprenticeship] = useState<any>(null);
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    setUser(user);

    const { data: apprenticeshipData } = await supabase
      .from('apprenticeship_enrollments')
      .select('*')
      .eq('student_id', user.id)
      .eq('status', 'active')
      .single();

    if (apprenticeshipData) {
      setApprenticeship(apprenticeshipData);
      const { data: portfolioData } = await supabase
        .from('apprenticeship_portfolio')
        .select('*')
        .eq('apprenticeship_id', apprenticeshipData.id)
        .order('date_created', { ascending: false });

      setPortfolio(portfolioData || []);

      const { data: skillsData } = await supabase
        .from('skill_competencies')
        .select('*')
        .eq('apprenticeship_id', apprenticeshipData.id)
        .order('times_practiced', { ascending: false });

      setSkills(skillsData || []);
    }

    setLoading(false);
  }

  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file || !apprenticeship) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('portfolio')
      .upload(fileName, file);

    if (!uploadError && uploadData) {
      const {
        data: { publicUrl },
      } = supabase.storage.from('portfolio').getPublicUrl(fileName);

      await supabase.from('apprenticeship_portfolio').insert({
        apprenticeship_id: apprenticeship.id,
        student_id: user.id,
        item_type: file.type.startsWith('image/') ? 'photo' : 'document',
        title: file.name,
        file_url: publicUrl,
        file_type: file.type,
      });

      await loadData();
    }

    setUploading(false);
  }

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!apprenticeship) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center text-white overflow-hidden">
          <Image
            src="/images/gallery/image8.jpg"
            alt="Portfolio"
            fill
            className="object-cover"
            quality={100}
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0   " />
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-2xl">
              Portfolio
            </h1>
            <p className="text-base md:text-lg md:text-xl mb-8 text-gray-100 drop-shadow-lg">
              Transform your career with free training and industry
              certifications
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-2xl"
              >
                Get Started Free
              </Link>
              <Link
                href="/programs"
                className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-2xl"
              >
                View Programs
              </Link>
            </div>
          </div>
        </section>

        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No Active Apprenticeship</h1>
          <p className="text-gray-600">
            Enroll in an apprenticeship to access your portfolio.
          </p>

          {/* Storytelling Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-2xl md:text-3xl md:text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                      Your Journey Starts Here
                    </h2>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      Every great career begins with a single step. Whether
                      you're looking to change careers, upgrade your skills, or
                      enter the workforce for the first time, we're here to help
                      you succeed. Our programs are 100% free,
                      government-funded, and designed to get you hired fast.
                    </p>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <svg
                          className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-700">
                          100% free training - no tuition, no hidden costs
                        </span>
                      </li>
                      <li className="flex items-start">
                        <svg
                          className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-700">
                          Industry-recognized certifications that employers
                          value
                        </span>
                      </li>
                      <li className="flex items-start">
                        <svg
                          className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-700">
                          Job placement assistance and career support
                        </span>
                      </li>
                      <li className="flex items-start">
                        <svg
                          className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-700">
                          Flexible scheduling for working adults
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="/images/gallery/image3.jpg"
                      alt="Students learning"
                      fill
                      className="object-cover"
                      quality={100}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="   text-white p-6">
        <h1 className="text-2xl font-bold mb-2">My Portfolio</h1>
        <p className="text-blue-100">Digital binder of your work and skills</p>
      </div>

      <div className="p-4 space-y-6">
        {/* Skills Progress */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="font-bold">Skills Mastered</h2>
            <span className="text-sm text-gray-600">
              {skills.length} skills
            </span>
          </div>
          <div className="p-4 space-y-3">
            {skills.slice(0, 5).map((skill) => (
              <div key={skill.id}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">
                    {skill.skill_name}
                  </span>
                  <span className="text-xs text-gray-600">
                    {skill.times_practiced}x
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        skill.proficiency_level === 'master'
                          ? 'bg-purple-600'
                          : skill.proficiency_level === 'advanced'
                            ? 'bg-blue-600'
                            : skill.proficiency_level === 'intermediate'
                              ? 'bg-green-600'
                              : 'bg-yellow-600'
                      }`}
                      style={{
                        width:
                          skill.proficiency_level === 'master'
                            ? '100%'
                            : skill.proficiency_level === 'advanced'
                              ? '75%'
                              : skill.proficiency_level === 'intermediate'
                                ? '50%'
                                : '25%',
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-600 capitalize">
                    {skill.proficiency_level}
                  </span>
                </div>
              </div>
            ))}
            {skills.length === 0 && (
              <p className="text-center text-gray-500 py-4">
                No skills tracked yet
              </p>
            )}
          </div>
        </div>

        {/* Upload Button */}
        <div className="bg-white rounded-lg shadow p-6">
          <label className="block">
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileUpload}
              disabled={uploading}
              className="hidden"
            />
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500">
              {uploading ? (
                <p className="text-gray-600">Uploading...</p>
              ) : (
                <>
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <p className="mt-2 text-sm text-gray-600">
                    Click to upload photos or documents
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Photos of your work, certificates, etc.
                  </p>
                </>
              )}
            </div>
          </label>
        </div>

        {/* Portfolio Grid */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="font-bold">My Work</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 p-4">
            {portfolio.map((item) => (
              <div
                key={item.id}
                className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden"
              >
                {item.item_type === 'photo' && item.file_url ? (
                  <Image
                    src={item.file_url}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    quality={100}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                )}
                {item.approved && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
          {portfolio.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <p>No portfolio items yet</p>
              <p className="text-sm mt-1">
                Upload photos of your work to build your portfolio
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
