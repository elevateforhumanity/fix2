/**
 * Not Authorized Page
 * Shown when user tries to access a route they don't have permission for
 */

import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function NotAuthorized() {
  return (
    <div className="min-h-screen bg-surface-base">
      <Helmet>
        <title>Not Authorized | Elevate for Humanity</title>
        <meta name="description" content="You don't have permission to access this page" />
      </Helmet>

      <Navigation />

      <main id="main-content" className="container mx-auto py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <svg
              className="mx-auto h-24 w-24 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <h1 className="heading-1 mb-4">Access Denied</h1>
          <p className="body-large text-text-secondary mb-8">
            You don't have permission to access this page. This area is restricted to authorized
            staff and administrators.
          </p>

          <div className="flex gap-4 justify-center">
            <Link to="/student-portal" className="btn btn-primary">
              Go to Student Portal
            </Link>
            <Link to="/" className="btn btn-outline">
              Return Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
