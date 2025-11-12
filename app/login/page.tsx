import Link from 'next/link';

export const metadata = {
  title: 'Sign In | Elevate for Humanity',
  description: 'Sign in to your student portal.',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4">
            E
          </div>
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Sign in to your student portal</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>
          <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700">
            Sign In
          </button>
        </div>

        <div className="mt-6 text-center space-y-2">
          <Link href="/signup" className="block text-blue-600 hover:underline">
            Don't have an account? Sign up
          </Link>
          <Link href="/" className="block text-gray-600 hover:underline">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
