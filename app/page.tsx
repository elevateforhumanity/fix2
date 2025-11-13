import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Award, Users, TrendingUp, CheckCircle } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <header className="elevate-nav">
        <div className="elevate-logo">
          <div className="elevate-logo-mark">E</div>
          <span>Elevate for Humanity</span>
        </div>
        <div className="flex gap-3 items-center">
          <Link href="/programs" className="text-gray-700 hover:text-red-600 font-medium">
            Programs
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-red-600 font-medium">
            About
          </Link>
          <Link href="/login" className="elevate-btn-secondary">
            Sign In
          </Link>
          <Link href="/signup" className="elevate-btn-primary">
            Get Started Free
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="elevate-hero">
        <div className="elevate-hero-content">
          <div className="elevate-hero-kicker">
            ✓ WIOA-Funded Training • 100% Free for Eligible Participants
          </div>
          <h1 className="elevate-hero-title">
            Transform Your Future with FREE Workforce Training
          </h1>
          <p className="elevate-hero-subtitle">
            Access high-quality career training programs funded by the Workforce Innovation and Opportunity Act (WIOA). Get the skills employers need—at no cost to you.
          </p>
          <div className="flex gap-4">
            <Link href="/enroll" className="elevate-btn-primary" style={{fontSize: '1.125rem', padding: '1rem 2rem'}}>
              Check Your Eligibility
            </Link>
            <Link href="/programs" className="elevate-btn-secondary" style={{fontSize: '1.125rem', padding: '1rem 2rem'}}>
              Browse Programs
            </Link>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-8 flex gap-6 items-center text-sm opacity-90">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>WIOA Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>Industry-Recognized Credentials</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>Job Placement Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="elevate-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">100%</div>
              <div className="text-gray-600">Free Training</div>
              <div className="text-sm text-gray-500 mt-1">WIOA-Funded</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">10+</div>
              <div className="text-gray-600">Career Programs</div>
              <div className="text-sm text-gray-500 mt-1">High-Demand Fields</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">85%</div>
              <div className="text-gray-600">Job Placement</div>
              <div className="text-sm text-gray-500 mt-1">Within 6 Months</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">$45K+</div>
              <div className="text-gray-600">Avg. Starting Salary</div>
              <div className="text-sm text-gray-500 mt-1">For Graduates</div>
            </div>
          </div>
        </div>
      </section>

      {/* What is WIOA Section */}
      <section className="py-16 bg-gray-50">
        <div className="elevate-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What is WIOA?</h2>
              <p className="text-lg text-gray-600">
                The Workforce Innovation and Opportunity Act provides FREE training to help Americans get high-quality jobs
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="elevate-card elevate-card-red">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Who Qualifies?</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Adults seeking career advancement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Dislocated workers needing retraining</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Youth ages 16-24 entering the workforce</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Individuals with barriers to employment</span>
                  </li>
                </ul>
              </div>
              
              <div className="elevate-card elevate-card-blue">
                <h3 className="text-xl font-bold text-gray-900 mb-3">What's Included?</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>100% free tuition and training materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Industry-recognized certifications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Job placement and career counseling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Support services (childcare, transportation)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Popular Training Programs</h2>
            <p className="text-muted-foreground text-lg">
              Choose from our wide range of professional development courses
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <div className="h-40 bg-gradient-to-br from-blue-500 to-blue-600" />
              <CardHeader>
                <CardTitle>Barber Fundamentals</CardTitle>
                <CardDescription>
                  Master the art of barbering with comprehensive training in cutting, styling, and business skills.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    24 lessons
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Certificate included
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    32 hours of content
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <div className="h-40 bg-gradient-to-br from-purple-500 to-purple-600" />
              <CardHeader>
                <CardTitle>CNA Certification Prep</CardTitle>
                <CardDescription>
                  Prepare for your Certified Nursing Assistant certification with expert-led training.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    30 lessons
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    State exam prep
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    45 hours of content
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <div className="h-40 bg-gradient-to-br from-orange-500 to-orange-600" />
              <CardHeader>
                <CardTitle>HVAC Technician Training</CardTitle>
                <CardDescription>
                  Learn heating, ventilation, and air conditioning systems from industry experts.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    28 lessons
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Hands-on training
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    48 hours of content
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/signup">Explore All Programs</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white border-0">
            <CardHeader className="text-center py-12">
              <CardTitle className="text-4xl mb-4">Ready to Start Learning?</CardTitle>
              <CardDescription className="text-blue-100 text-lg mb-8">
                Join thousands of students who have transformed their careers with Elevate for Humanity
              </CardDescription>
              <div className="flex gap-4 justify-center">
                <Button size="lg" asChild className="bg-white text-blue-600 hover:bg-blue-50">
                  <Link href="/signup">Create Free Account</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10">
                  <Link href="/lms/courses">Browse Courses</Link>
                </Button>
              </div>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="font-bold text-lg">Elevate for Humanity</p>
              <p className="text-sm text-muted-foreground">Empowering careers through education</p>
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/terms-of-service" className="text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link href="/privacy-policy" className="text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
