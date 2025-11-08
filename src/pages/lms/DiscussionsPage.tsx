import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import DiscussionForum from '../../components/DiscussionForum';

export default function DiscussionsPage() {
  const { courseId } = useParams();

  return (
    <div>
      <Helmet>
        <title>Course Discussions | Elevate for Humanity</title>
      </Helmet>
      <Navigation />
      <div className="section bg-beige-50">
        <div className="container max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-brown-900 mb-2">
              Course Discussions
            </h1>
            <p className="text-lg text-brown-600">
              Ask questions, share insights, and connect with your classmates
            </p>
          </div>
          {/* Discussion Forum */}
          <DiscussionForum courseId={courseId || ''} />
          {/* Community Guidelines */}
          <div className="card p-6 mt-8 bg-blue-50 border-l-4 border-blue-600">
            <h3 className="text-lg font-bold text-brown-900 mb-3">
              Community Guidelines
            </h3>
            <ul className="space-y-2 text-sm text-brown-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Be respectful and constructive in all interactions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Stay on topic and relevant to the course material</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Search before posting to avoid duplicate questions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>
                  Help others by sharing your knowledge and experience
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Report inappropriate content to instructors</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
