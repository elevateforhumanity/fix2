export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-50 to-white border-b border-orange-200">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            Contact Us
          </h1>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed max-w-2xl">
            Have questions about our programs? We're here to help you start your
            career journey.
          </p>
        </div>
      </section>
      {/* Contact Information */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Send Us a Message
            </h2>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label
                  htmlFor="program"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Program of Interest
                </label>
                <select
                  id="program"
                  name="program"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select a program</option>
                  <option value="barber">Barber Apprenticeship</option>
                  <option value="building-services">
                    Building Services Technician
                  </option>
                  <option value="hvac-welding">HVAC & Welding</option>
                  <option value="healthcare">Healthcare (CNA/QMA)</option>
                  <option value="drug-testing">Drug Testing Business</option>
                  <option value="digital-skills">Digital Skills</option>
                  <option value="leadership">Leadership Development</option>
                  <option value="peer-recovery">
                    Certified Peer Recovery Specialist
                  </option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
          {/* Contact Details */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Get in Touch
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  📍 Location
                </h3>
                <p className="text-gray-600">
                  Marion County, Indiana
                  <br />
                  Indianapolis, IN
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  📧 Email
                </h3>
                <p className="text-gray-600">
                  <a
                    href="mailto:info@elevateforhumanity.org"
                    className="text-orange-600 hover:text-orange-700"
                  >
                    info@elevateforhumanity.org
                  </a>
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  📞 Phone
                </h3>
                <p className="text-gray-600">
                  <a
                    href="tel:+13175551234"
                    className="text-orange-600 hover:text-orange-700"
                  >
                    (317) 555-1234
                  </a>
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  🕐 Hours
                </h3>
                <p className="text-gray-600">
                  Monday - Friday: 9:00 AM - 5:00 PM
                  <br />
                  Saturday - Sunday: Closed
                </p>
              </div>
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Follow Us
                </h3>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="text-gray-600 hover:text-orange-600 transition-colors"
                  >
                    Facebook
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-orange-600 transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-orange-600 transition-colors"
                  >
                    Twitter
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Are the programs really free?
              </h3>
              <p className="text-gray-600">
                Yes! All our programs are 100% funded through WIOA (Workforce
                Innovation and Opportunity Act) and WRG (Workforce Ready Grant)
                programs. There is no cost to eligible participants.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How do I know if I'm eligible?
              </h3>
              <p className="text-gray-600">
                Eligibility is determined by WorkOne Indiana. Generally, you
                must be a resident of Indiana and meet certain income or
                employment criteria. Contact us to learn more about your
                specific situation.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How long do the programs take?
              </h3>
              <p className="text-gray-600">
                Program lengths vary. The Barber Apprenticeship is 2,000 hours,
                while other programs have flexible schedules. Most programs can
                be completed in 6-18 months depending on your pace and schedule.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Will I get a job after completing the program?
              </h3>
              <p className="text-gray-600">
                We have a 92% job placement rate. Many of our programs include
                paid apprenticeships with employer partners, and we provide job
                placement assistance to all graduates.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
