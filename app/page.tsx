import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Award, Users, TrendingUp, CheckCircle } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Elevate Your Career with Professional Training
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Access industry-leading workforce development programs designed to help you succeed in high-demand careers.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" asChild className="bg-white text-blue-600 hover:bg-blue-50">
                <Link href="/signup">Get Started Free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10">
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Elevate for Humanity?</h2>
            <p className="text-muted-foreground text-lg">
              Comprehensive training programs designed for your success
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <BookOpen className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Expert-Led Courses</CardTitle>
                <CardDescription>
                  Learn from industry professionals with real-world experience
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Award className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Earn Certificates</CardTitle>
                <CardDescription>
                  Receive recognized certifications upon course completion
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Community Support</CardTitle>
                <CardDescription>
                  Connect with peers and mentors throughout your journey
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Career Growth</CardTitle>
                <CardDescription>
                  Access job placement assistance and career resources
                </CardDescription>
              </CardHeader>
            </Card>
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
