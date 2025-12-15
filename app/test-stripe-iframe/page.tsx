'use client';

export default function TestStripeIframePage() {
  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">
          Test: Can Stripe Payment Links Load in Iframe?
        </h1>

        <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4 mb-6">
          <p className="text-yellow-900 font-semibold mb-2">
            ⚠️ Testing Stripe Iframe Embedding
          </p>
          <p className="text-sm text-yellow-800">
            If you see "Refused to display in a frame" error, Stripe Payment
            Links CANNOT be embedded. In that case, we need to use a direct link
            that opens in a new tab instead.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Stripe Payment Link Test:</h2>

          <div className="border-2 border-slate-300 rounded-lg overflow-hidden mb-4">
            <iframe
              src="https://buy.stripe.com/test_00000000000000"
              className="w-full"
              style={{ height: '600px', border: 'none' }}
              title="Test Stripe Iframe"
            />
          </div>

          <div className="space-y-4 text-sm">
            <div>
              <strong>What you should see:</strong>
              <ul className="list-disc ml-6 mt-2 text-slate-600">
                <li>If iframe works: Stripe checkout form loads above</li>
                <li>If iframe blocked: Blank space or error message</li>
              </ul>
            </div>

            <div className="bg-red-50 border border-red-200 rounded p-4">
              <strong className="text-red-900">If Iframe is Blocked:</strong>
              <p className="text-red-800 mt-2">
                Stripe Payment Links block iframe embedding for security. We'll
                need to use a direct link that opens in a new tab or redirects
                the page instead.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded p-4">
              <strong className="text-green-900">If Iframe Works:</strong>
              <p className="text-green-800 mt-2">
                Great! We can keep the embedded iframe approach on the /pay
                page.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a href="/pay" className="text-blue-600 hover:underline">
            ← Back to Pay Page
          </a>
        </div>
      </div>
    </main>
  );
}
