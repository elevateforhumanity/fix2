import Link from 'next/link';

export default function PayDirectPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Video Hero */}
      <section className="relative h-[300px] w-full overflow-hidden bg-slate-900">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/barber-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-slate-900/60" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Pay for Training
            </h1>
            <p className="text-xl">
              Click below to complete your payment
            </p>
          </div>
        </div>
      </section>

      {/* Payment Links */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
              Select Your Program to Pay
            </h2>

            <div className="space-y-4">
              {/* Barber Apprenticeship */}
              <a
                href="https://buy.stripe.com/YOUR_BARBER_LINK_HERE"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 border-2 border-blue-500 rounded-lg hover:bg-blue-50 transition-all"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Barber Apprenticeship</h3>
                    <p className="text-sm text-slate-600">12 months • DOL Registered</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-700">$4,890</div>
                    <div className="text-sm text-blue-600">Pay Now →</div>
                  </div>
                </div>
              </a>

              {/* Medical Assistant */}
              <a
                href="https://buy.stripe.com/YOUR_MA_LINK_HERE"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 border-2 border-slate-300 rounded-lg hover:bg-slate-50 transition-all"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Medical Assistant</h3>
                    <p className="text-sm text-slate-600">21 days • Healthcare</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-slate-700">$4,325</div>
                    <div className="text-sm text-slate-600">Pay Now →</div>
                  </div>
                </div>
              </a>

              {/* HVAC Technician */}
              <a
                href="https://buy.stripe.com/YOUR_HVAC_LINK_HERE"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 border-2 border-slate-300 rounded-lg hover:bg-slate-50 transition-all"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">HVAC Technician</h3>
                    <p className="text-sm text-slate-600">60 days • Skilled Trade</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-slate-700">$5,000</div>
                    <div className="text-sm text-slate-600">Pay Now →</div>
                  </div>
                </div>
              </a>

              {/* Add more programs as needed */}
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-900 text-center">
                💳 Each link goes directly to secure Stripe checkout with all payment options
              </p>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-yellow-900 mb-2">⚠️ Setup Required:</h3>
            <p className="text-sm text-yellow-800 mb-4">
              To activate these payment links, you need to:
            </p>
            <ol className="text-sm text-yellow-800 space-y-2 ml-4">
              <li>1. Go to your Stripe Dashboard</li>
              <li>2. Create a Payment Link for each program</li>
              <li>3. Copy each Payment Link URL</li>
              <li>4. Replace the placeholder URLs in this page</li>
            </ol>
            <p className="text-sm text-yellow-800 mt-4">
              <strong>File to edit:</strong> <code className="bg-yellow-100 px-2 py-1 rounded">app/pay-direct/page.tsx</code>
            </p>
          </div>

          {/* Contact */}
          <div className="text-center">
            <p className="text-slate-600 mb-2">Questions or need help?</p>
            <a href="tel:3173143757" className="text-2xl font-bold text-orange-600 hover:text-orange-700">
              Call 317-314-3757
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
