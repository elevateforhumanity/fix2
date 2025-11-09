import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page not found — Elevate for Humanity</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="min-h-screen grid place-items-center p-8 text-center">
        <div>
          <h1 className="text-4xl font-bold">Page not found</h1>
          <p className="mt-2 opacity-80">Let's get you back to the good stuff.</p>
          <Link
            to="/"
            className="inline-block mt-6 px-5 py-3 rounded-lg bg-black text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </>
  );
}
