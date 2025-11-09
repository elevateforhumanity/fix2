/**
 * Milady Barber Apprenticeship Course Page
 * DOL Registered Apprenticeship - 2,000 Hours
 * Now with enrollment and course access
 */

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../supabaseClient';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { miladyBarberCourse } from '../../data/miladyBarberCourse';

export default function MiladyBarberCourse() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [expandedModule, setExpandedModule] = useState(null);
  const [enrolled, setEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [loading, setLoading] = useState(true);
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    loadCourseData();
  }, [user]);

  const loadCourseData = async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    try {
      // Load course from database
      const { data: course } = await supabase
        .from('courses')
        .select(`
          *,
          modules (
            *,
            lessons (*)
          )
        `)
        .eq('code', 'BARBER-2000')
        .single();

      if (course) {
        setCourseData(course);
      }

      // Check if user is enrolled
      if (user) {
        const { data: enrollment } = await supabase
          .from('enrollments')
          .select('*')
          .eq('user_id', user.id)
          .eq('course_id', course?.id)
          .maybeSingle();

        setEnrolled(!!enrollment);
      }
    } catch (error) {
      console.error('Error loading course:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    if (!user) {
      navigate('/login?returnTo=/lms/milady-barber-course');
      return;
    }

    if (!courseData) {
      alert('Course data not loaded. Please refresh the page.');
      return;
    }

    setEnrolling(true);

    try {
      const { error } = await supabase
        .from('enrollments')
        .insert({
          user_id: user.id,
          course_id: courseData.id,
          status: 'active'
        });

      if (error && error.code !== '23505') { // Ignore duplicate key error
        throw error;
      }

      setEnrolled(true);
      alert('Successfully enrolled! You can now access course content.');
    } catch (error) {
      alert('Error enrolling: ' + error.message);
    } finally {
      setEnrolling(false);
    }
  };

  const toggleModule = (moduleId) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  return (
    <div className="min-h-screen bg-surface-base">
      <Helmet>
        <title>{miladyBarberCourse.title} | Elevate for Humanity</title>
        <meta name="description" content="DOL Registered Barber Apprenticeship Program - 2,000 hours of comprehensive training" />
      </Helmet>

      <Navigation />

      <main id="main-content" className="container mx-auto py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              {miladyBarberCourse.dolRegistered && (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  DOL Registered
                </span>
              )}
              {miladyBarberCourse.etplApproved && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  ETPL Approved
                </span>
              )}
            </div>
            <h1 className="heading-1 mb-4">{miladyBarberCourse.title}</h1>
            <div className="flex flex-wrap gap-6 text-text-secondary">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{miladyBarberCourse.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>{miladyBarberCourse.format}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <span>{miladyBarberCourse.certification}</span>
              </div>
            </div>
          </div>

          {/* Program Overview */}
          <div className="card card-spacious mb-12">
            <h2 className="heading-3 mb-4">Program Overview</h2>
            <p className="body-base text-text-secondary mb-6">
              This comprehensive 2,000-hour apprenticeship program combines on-the-job training with classroom instruction to prepare you for a successful career in barbering. Upon completion, you'll be eligible for the Indiana State Barber License.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-surface-elevated rounded-lg">
                <div className="text-3xl font-bold text-brand mb-2">{miladyBarberCourse.modules.length}</div>
                <div className="text-sm text-text-secondary">Modules</div>
              </div>
              <div className="text-center p-4 bg-surface-elevated rounded-lg">
                <div className="text-3xl font-bold text-brand mb-2">2,000</div>
                <div className="text-sm text-text-secondary">Training Hours</div>
              </div>
              <div className="text-center p-4 bg-surface-elevated rounded-lg">
                <div className="text-3xl font-bold text-brand mb-2">FREE</div>
                <div className="text-sm text-text-secondary">With WIOA Funding</div>
              </div>
            </div>
          </div>

          {/* Curriculum */}
          <div className="mb-12">
            <h2 className="heading-2 mb-6">Curriculum</h2>
            <div className="space-y-4">
              {miladyBarberCourse.modules.map((module, index) => (
                <div key={module.id} className="card">
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-surface-elevated transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="flex-shrink-0 w-8 h-8 bg-brand text-white rounded-full flex items-center justify-center font-semibold text-sm">
                          {index + 1}
                        </span>
                        <h3 className="heading-4">{module.title}</h3>
                      </div>
                      <p className="text-sm text-text-secondary ml-11">{module.description}</p>
                      <p className="text-xs text-brand font-medium ml-11 mt-1">{module.hours} hours</p>
                    </div>
                    <svg
                      className={`h-6 w-6 text-text-secondary transition-transform ${
                        expandedModule === module.id ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {expandedModule === module.id && (
                    <div className="px-6 pb-6 border-t border-gray-200">
                      <div className="mt-4 space-y-4">
                        {module.lessons.map((lesson) => (
                          <div key={lesson.id} className="pl-11">
                            <h4 className="font-semibold text-text-primary mb-2">{lesson.title}</h4>
                            <p className="text-sm text-brand mb-2">{lesson.duration}</p>
                            <ul className="space-y-1">
                              {lesson.topics.map((topic, topicIndex) => (
                                <li key={topicIndex} className="text-sm text-text-secondary flex items-start">
                                  <span className="text-brand mr-2">•</span>
                                  <span>{topic}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA / Enrollment */}
          <div className="card card-spacious bg-brand-light text-center">
            {loading ? (
              <p>Loading...</p>
            ) : enrolled ? (
              <>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="heading-3 mb-4">You're Enrolled!</h2>
                <p className="body-base text-text-secondary mb-6">
                  Access your course content and start learning.
                </p>
                <Link to="/lms" className="btn btn-primary text-lg">
                  Go to My Courses
                </Link>
              </>
            ) : (
              <>
                <h2 className="heading-3 mb-4">Ready to Start Your Barbering Career?</h2>
                <p className="body-base text-text-secondary mb-6">
                  This program is 100% funded through WIOA. No cost to eligible students.
                </p>
                {user ? (
                  <button
                    onClick={handleEnroll}
                    disabled={enrolling}
                    className="btn btn-primary text-lg"
                  >
                    {enrolling ? 'Enrolling...' : 'Enroll in Course'}
                  </button>
                ) : (
                  <div className="space-y-3">
                    <Link to="/apply" className="btn btn-primary text-lg block">
                      Apply for Program
                    </Link>
                    <p className="text-sm text-text-secondary">
                      Already approved?{' '}
                      <Link to="/login?returnTo=/lms/milady-barber-course" className="text-brand underline">
                        Sign in to enroll
                      </Link>
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
