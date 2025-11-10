/**
 * Client Well-Being & Safety Certification Enrollment
 * Partner Program Integration
 */

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../supabaseClient';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { miladyRISECourse } from '../../data/milady-rise-course';

export default function MiladyRISEEnrollment() {
  const { user } = useAuth();
  const [enrolling, setEnrolling] = useState(false);
  const [error, setError] = useState('');

  const handleEnroll = async () => {
    if (!user) {
      window.location.href = '/login?returnTo=/lms/milady-riseenrollment';
      return;
    }

    setEnrolling(true);
    setError('');

    try {
      // Record enrollment in database
      const { error: enrollError } = await supabase
        .from('enrollments')
        .insert({
          user_id: user.id,
          course_id: miladyRISECourse.id,
          status: 'active',
          external_enrollment_id: `milady-${Date.now()}`
        });

      if (enrollError && enrollError.code !== '23505') { // Ignore duplicate key error
        throw enrollError;
      }

      // Redirect to partner platform with promo code
      const enrollmentUrl = `${miladyRISECourse.enrollment.url}?promo=${miladyRISECourse.enrollment.promo_code}`;
      window.open(enrollmentUrl, '_blank');

      // Show success message
      alert('Opening enrollment page. Use promo code: ' + miladyRISECourse.enrollment.promo_code);
    } catch (err) {
      setError(err.message);
    } finally {
      setEnrolling(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-base">
      <Helmet>
        <title>Client Well-Being & Safety Certification | Elevate for Humanity</title>
        <meta name="description" content="Enroll in the Client Well-Being & Safety Certification program" />
      </Helmet>

      <Navigation />

      <main id="main-content" className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="heading-1 mb-4">{miladyRISECourse.title}</h1>
            <p className="body-large text-text-secondary">
              {miladyRISECourse.description}
            </p>
          </div>

          {/* Course Info */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Left Column */}
            <div className="card card-spacious">
              <h2 className="heading-3 mb-4">Program Details</h2>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-text-secondary">Provider</dt>
                  <dd className="text-base text-text-primary">{miladyRISECourse.provider}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-text-secondary">Duration</dt>
                  <dd className="text-base text-text-primary">{miladyRISECourse.total_duration}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-text-secondary">Cost</dt>
                  <dd className="text-base text-brand font-semibold">FREE with promo code</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-text-secondary">Certification</dt>
                  <dd className="text-base text-text-primary">{miladyRISECourse.certification.name}</dd>
                </div>
              </dl>
            </div>

            {/* Right Column */}
            <div className="card card-spacious bg-brand-light">
              <h2 className="heading-3 mb-4">Scholarship Opportunity</h2>
              <div className="text-center py-4">
                <div className="text-4xl font-bold text-brand mb-2">
                  ${miladyRISECourse.scholarship.amount}
                </div>
                <p className="text-sm text-text-secondary mb-4">
                  {miladyRISECourse.scholarship.frequency}
                </p>
                <p className="text-sm">
                  {miladyRISECourse.scholarship.recipients_per_period} recipients per period
                </p>
              </div>
              <p className="text-sm text-text-secondary mt-4">
                Complete the certification to become eligible for the RISE Scholarship
              </p>
            </div>
          </div>

          {/* Course Topics */}
          <div className="card card-spacious mb-12">
            <h2 className="heading-3 mb-6">What You'll Learn</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {miladyRISECourse.topics.map((topic) => (
                <div key={topic.id} className="border-l-4 border-brand pl-4">
                  <h3 className="font-semibold text-text-primary mb-2">{topic.title}</h3>
                  <p className="text-sm text-text-secondary mb-2">{topic.description}</p>
                  <p className="text-xs text-brand font-medium">{topic.duration}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="card card-spacious mb-12">
            <h2 className="heading-3 mb-4">Learning Outcomes</h2>
            <ul className="space-y-2">
              {miladyRISECourse.learning_outcomes.map((outcome, index) => (
                <li key={index} className="flex items-start">
                  <svg className="h-6 w-6 text-brand flex-shrink-0 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-text-primary">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Enrollment Instructions */}
          <div className="card card-spacious mb-12">
            <h2 className="heading-3 mb-4">How to Enroll</h2>
            <ol className="space-y-3">
              {miladyRISECourse.enrollment.instructions.map((instruction, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-brand text-white rounded-full flex items-center justify-center mr-3 font-semibold">
                    {index + 1}
                  </span>
                  <span className="text-text-primary pt-1">{instruction}</span>
                </li>
              ))}
            </ol>
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm font-medium text-yellow-800">
                <strong>Promo Code:</strong> {miladyRISECourse.enrollment.promo_code}
              </p>
              <p className="text-xs text-yellow-700 mt-1">
                {miladyRISECourse.enrollment.redemptions_available} redemptions available
              </p>
            </div>
          </div>

          {/* Enroll Button */}
          <div className="text-center">
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                {error}
              </div>
            )}
            <button
              onClick={handleEnroll}
              disabled={enrolling}
              className="btn btn-primary text-lg px-8 py-4"
            >
              {enrolling ? 'Enrolling...' : 'Enroll Now - FREE'}
            </button>
            <p className="text-sm text-text-secondary mt-4">
              You'll be redirected to the partner platform to complete enrollment
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
