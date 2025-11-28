import Link from 'next/link';

export const metadata = {
  title: 'Environment Configuration | Elevate for Humanity',
  description: 'Environment variables and configuration guide.',
};

export default function EnvConfigPage() {
  return (
    <main className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/docs" className="text-blue-600 hover:underline mb-6 inline-block">
          ← Back to Documentation
        </Link>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Environment Configuration</h1>
        
        <div className="prose max-w-none">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Required Environment Variables</h2>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Supabase Configuration</h3>
            <ul className="space-y-2 text-gray-700">
              <li><code className="bg-gray-200 px-2 py-1 rounded">NEXT_PUBLIC_SUPABASE_URL</code> - Your Supabase project URL</li>
              <li><code className="bg-gray-200 px-2 py-1 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> - Public anon key</li>
              <li><code className="bg-gray-200 px-2 py-1 rounded">SUPABASE_SERVICE_ROLE_KEY</code> - Service role key (server-side only)</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Optional Configuration</h3>
            <ul className="space-y-2 text-gray-700">
              <li><code className="bg-gray-200 px-2 py-1 rounded">OPENAI_API_KEY</code> - For AI features</li>
              <li><code className="bg-gray-200 px-2 py-1 rounded">RESEND_API_KEY</code> - For email notifications</li>
              <li><code className="bg-gray-200 px-2 py-1 rounded">STRIPE_SECRET_KEY</code> - For payment processing</li>
            </ul>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Setup Instructions</h2>
          
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            <li>Copy <code className="bg-gray-200 px-2 py-1 rounded">.env.example</code> to <code className="bg-gray-200 px-2 py-1 rounded">.env.local</code></li>
            <li>Fill in your Supabase credentials from your project dashboard</li>
            <li>Add any optional API keys you plan to use</li>
            <li>Restart your development server</li>
          </ol>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
            <p className="text-yellow-800">
              <strong>⚠️ Security Note:</strong> Never commit <code>.env.local</code> to version control. 
              The file is already in <code>.gitignore</code>.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
