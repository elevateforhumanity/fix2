"use client";

import Link from "next/link";
import Image from "next/image";

export default function CompliantFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About Column */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.png"
                alt="Elevate For Humanity"
                width={48}
                height={48}
                className="h-12 w-12"
              />
              <div className="leading-tight">
                <div className="font-bold text-lg">Elevate For Humanity</div>
                <div className="text-xs text-gray-400">Career & Technical Institute</div>
              </div>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              ETPL Approved Provider • DOL Registered Apprenticeship Sponsor • WIOA Funded Programs
            </p>
            <div className="space-y-2 text-sm">
              <a href="tel:+13173143757" className="flex items-center gap-2 text-gray-300 hover:text-white">
                <Phone className="w-4 h-4" />
                (317) 314-3757
              </a>
              <a href="mailto:Elevate4humanityedu@gmail.com" className="flex items-center gap-2 text-gray-300 hover:text-white">
                <Mail className="w-4 h-4" />
                Elevate4humanityedu@gmail.com
              </a>
              <div className="flex items-start gap-2 text-gray-300">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>Indianapolis, IN</span>
              </div>
            </div>
          </div>

          {/* Programs Column */}
          <div>
            <h3 className="font-bold text-lg mb-4">Programs</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/programs?category=healthcare" className="text-gray-300 hover:text-white">Healthcare</Link></li>
              <li><Link href="/programs?category=trades" className="text-gray-300 hover:text-white">Skilled Trades</Link></li>
              <li><Link href="/programs?category=business" className="text-gray-300 hover:text-white">Business & Technology</Link></li>
              <li><Link href="/programs?category=beauty" className="text-gray-300 hover:text-white">Beauty & Wellness</Link></li>
              <li><Link href="/apprenticeships" className="text-gray-300 hover:text-white">Apprenticeships</Link></li>
              <li><Link href="/programs" className="text-gray-300 hover:text-white">View All Programs</Link></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/funding" className="text-gray-300 hover:text-white">Funding Options</Link></li>
              <li><Link href="/eligibility" className="text-gray-300 hover:text-white">Check Eligibility</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-white">Student Services</Link></li>
              <li><Link href="/employers" className="text-gray-300 hover:text-white">For Employers</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h3 className="font-bold text-lg mb-4">Connect With Us</h3>
            <p className="text-sm text-gray-300 mb-4">
              Follow us on social media for updates, success stories, and career opportunities.
            </p>
            
            {/* Animated Social Media Icons */}
            <div className="flex gap-3 mb-6">
              <a 
                href="https://www.facebook.com/elevateforhumanity" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 hover:bg-blue-500"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 hover:bg-sky-400"
              >
              </a>
              <a 
                href="https://www.instagram.com/elevateforhumanity" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/company/elevate-for-humanity" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 hover:bg-blue-600"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://www.youtube.com/@elevateforhumanity" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 hover:bg-red-500"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>

            {/* Newsletter Signup */}
            <div>
              <h4 className="font-semibold text-sm mb-2">Stay Updated</h4>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 rounded bg-gray-800 border border-gray-700 text-sm focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 rounded font-semibold text-sm hover:bg-blue-700 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Government Compliance Section */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl mb-2">🏛️</div>
              <h4 className="font-bold text-sm mb-1">ETPL Approved</h4>
              <p className="text-xs text-gray-400">Eligible Training Provider List<br/>State of Indiana</p>
            </div>
            <div>
              <div className="text-3xl mb-2">🇺🇸</div>
              <h4 className="font-bold text-sm mb-1">DOL Registered</h4>
              <p className="text-xs text-gray-400">U.S. Department of Labor<br/>Apprenticeship Sponsor</p>
            </div>
            <div>
              <div className="text-3xl mb-2">💰</div>
              <h4 className="font-bold text-sm mb-1">WIOA Funded</h4>
              <p className="text-xs text-gray-400">Workforce Innovation &<br/>Opportunity Act Programs</p>
            </div>
          </div>
        </div>
      </div>

      {/* SELFISH INC Family */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-6">
            <p className="text-sm font-semibold text-gray-300">Part of the SELFISH INC Family of Services</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-bold mb-2">Career Training</h4>
              <p className="text-gray-400">
                <strong className="text-white">Elevate for Humanity Training Center</strong><br/>
                ETPL Provider ID: 10000949<br/>
                30+ workforce development programs
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-2">Mental Wellness</h4>
              <p className="text-gray-400">
                <strong className="text-white">Selfish Inc Mental Wellness</strong><br/>
                Trauma recovery, divorce support, addiction services<br/>
                <a href="https://www.selfishinc.org" className="text-blue-400 hover:underline">selfishinc.org</a>
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-2">Financial Literacy</h4>
              <p className="text-gray-400">
                <strong className="text-white">RISE Forward Foundation</strong><br/>
                IRS-certified VITA tax preparation<br/>
                Business & financial education
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
            <div className="text-center md:text-left">
              <p className="font-semibold text-gray-300">© {currentYear} Elevate For Humanity. All Rights Reserved.</p>
              <p className="mt-1">A 501(c)(3) nonprofit workforce development program of SELFISH INC</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
              <Link href="/terms-of-service" className="hover:text-white">Terms of Service</Link>
              <Link href="/refund-policy" className="hover:text-white">Refund Policy</Link>
              <Link href="/equal-opportunity" className="hover:text-white">Equal Opportunity</Link>
              <Link href="/grievance" className="hover:text-white">Grievance Procedure</Link>
              <Link href="/accessibility" className="hover:text-white">Accessibility</Link>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Elevate For Humanity is an equal opportunity employer and program provider. We do not discriminate on the basis of race, color, religion, sex, national origin, age, disability, or political affiliation.
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Auxiliary aids and services available upon request. TDD/TTY: 1-800-743-3333
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
