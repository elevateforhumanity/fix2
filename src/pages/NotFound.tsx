import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function NotFound() {
  return (
    <main className="min-h-screen grid place-items-center p-8 text-center">
      <Helmet>
        <title>404 - Page Not Found | Elevate for Humanity</title>
      </Helmet>
      <div>
        <h1 className="text-4xl font-bold">Page not found</h1>
        <p className="mt-2 text-gray-600">Let's get you back to the good stuff.</p>
        <Link 
          to="/" 
          className="inline-block mt-6 px-5 py-3 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}
