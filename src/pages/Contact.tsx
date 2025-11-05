import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-600 to-brand-700 text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl opacity-90 max-w-2xl">
            Reach out to Elevate for Humanity for program funding assistance in
            Marion County, IN
          </p>
        </div>
      </section>
      {/* Contact Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-brand-text mb-6">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-brand-text mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-brand-text mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-brand-text mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600 resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
                <button type="submit" className="btn w-full">
                  Submit Inquiry
                </button>
              </form>
              <p className="text-sm text-brand-text-muted mt-4">
                This site is protected by reCAPTCHA and the Google{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-600 hover:underline"
                >
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a
                  href="https://policies.google.com/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-600 hover:underline"
                >
                  Terms of Service
                </a>{' '}
                apply.
              </p>
            </div>
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-brand-text mb-6">
                Get in Touch
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-brand-surface p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-brand-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-text mb-1">
                      Phone
                    </h3>
                    <a
                      href="tel:+13173143757"
                      className="text-brand-text-muted hover:text-brand-600"
                    >
                      (317) 314-3757
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-brand-surface p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-brand-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-text mb-1">
                      Email
                    </h3>
                    <a
                      href="mailto:Elizabethpowell6262@gmail.com"
                      className="text-brand-text-muted hover:text-brand-600"
                    >
                      Elizabethpowell6262@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-brand-surface p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-brand-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-text mb-1">
                      Location
                    </h3>
                    <p className="text-brand-text-muted">
                      Marion County, IN
                      <br />
                      Indianapolis, Indiana
                    </p>
                  </div>
                </div>
              </div>
              {/* Office Hours */}
              <div className="mt-8 p-6 bg-brand-surface rounded-lg">
                <h3 className="font-semibold text-brand-text mb-3">
                  Office Hours
                </h3>
                <div className="space-y-2 text-sm text-brand-text-muted">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span>By Appointment</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
