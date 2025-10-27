import { Link } from 'react-router-dom';
import { XCircle, ArrowLeft, HelpCircle } from 'lucide-react';

export default function PaymentCancelled() {
  return (
    <section className="section">
      <div className="container max-w-2xl mx-auto">
        <div className="card p-8 text-center">
          <div className="w-20 h-20 bg-brand-surface rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-12 h-12 text-orange-600" />
          </div>
          <h1 className="text-3xl font-bold text-brand-text">
            Enrollment Cancelled
          </h1>
          <p className="mt-3 text-lg text-brand-text-muted">
            No worries! Your payment was not processed and you haven't been
            charged.
          </p>
          <div className="mt-8 space-y-3">
            <Link
              to="/programs"
              className="btn w-full text-lg flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Programs
            </Link>
            <Link to="/" className="btn-outline w-full">
              Go Home
            </Link>
          </div>
          <div className="mt-8 p-6 bg-brand-surface rounded-lg text-left">
            <div className="flex items-center gap-2 font-semibold text-brand-text mb-3">
              <HelpCircle className="w-5 h-5 text-brand-600" />
              <span>Need Help?</span>
            </div>
            <p className="text-sm text-brand-text-muted mb-4">
              If you had questions or concerns about enrolling, we're here to
              help!
            </p>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium">📞 Call us:</span>{' '}
                <a
                  href="tel:+13175550100"
                  className="text-brand-600 hover:underline"
                >
                  (317) 555-0100
                </a>
              </div>
              <div>
                <span className="font-medium">✉️ Email:</span>{' '}
                <a
                  href="mailto:elevateforhumanity@gmail.com"
                  className="text-brand-600 hover:underline"
                >
                  elevateforhumanity@gmail.com
                </a>
              </div>
              <div>
                <span className="font-medium">💬 Live Chat:</span>{' '}
                <span className="text-brand-text-muted">
                  Click the chat button in the bottom right
                </span>
              </div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">
              💡 Remember: Most Programs are 100% FREE!
            </div>
            <p className="text-sm text-brand-success">
              Many of our programs are fully funded through WIOA and other
              scholarships. Check if you qualify for free training!
            </p>
            <Link
              to="/apply"
              className="mt-3 inline-block text-sm font-medium text-green-700 hover:text-green-900"
            >
              Apply for Free Training →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
