import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';

export const metadata = {
  title: 'Barber Apprenticeship | Elevate for Humanity',
  description:
    'State-approved barber apprenticeship program leading to Indiana barber license.',
};

export default function BarberProgramPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-red-600 to-orange-500">
        <div className="absolute inset-0 bg-black/40" />
        <Image
          src="/media/programs/barber-hero.jpg"
          alt="Professional barber at work"
          fill
          className="object-cover mix-blend-overlay"
          priority
        />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-3xl">
            <p className="text-sm uppercase tracking-wide mb-4 text-orange-200">
              State-Approved Apprenticeship
            </p>
            <h1 className="text-5xl font-bold mb-4">
              Barber Apprenticeship Program
            </h1>
            <p className="text-xl text-gray-100">
              Master the craft of barbering through a state-approved
              apprenticeship. Learn cutting, styling, and business skills in a
              real barbershop environment.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 space-y-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Program Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc list-inside">
                  <li>
                    State-approved curriculum aligned with Indiana licensing
                    requirements
                  </li>
                  <li>
                    1,500 hours of hands-on training in a working barbershop
                  </li>
                  <li>Learn classic and modern cutting techniques</li>
                  <li>Business management and customer service skills</li>
                  <li>Preparation for state licensing exam</li>
                  <li>Earn while you learn through apprenticeship model</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>What You'll Master</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Technical Skills</h4>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>Clipper techniques</li>
                      <li>Scissor work</li>
                      <li>Straight razor shaving</li>
                      <li>Fades and tapers</li>
                      <li>Beard grooming</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Professional Skills</h4>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>Client consultation</li>
                      <li>Sanitation and safety</li>
                      <li>Shop management</li>
                      <li>Retail and upselling</li>
                      <li>Building clientele</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Apprenticeship Pathway</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3 list-decimal list-inside">
                  <li>Apply and complete intake process</li>
                  <li>Match with a licensed master barber and approved shop</li>
                  <li>Begin apprenticeship with structured training plan</li>
                  <li>Complete 1,500 hours of documented training</li>
                  <li>Pass state licensing exam</li>
                  <li>Launch your career as a licensed barber</li>
                </ol>
              </CardContent>
            </Card>
          </div>
          <aside className="space-y-6">
            <Card className="border-l-4 border-l-red-600">
              <CardHeader>
                <CardTitle>Program Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Duration</h4>
                  <p className="text-sm text-muted-foreground">
                    12-18 months (1,500 hours)
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Format</h4>
                  <p className="text-sm text-muted-foreground">
                    In-shop apprenticeship with online coursework
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Funding</h4>
                  <p className="text-sm text-muted-foreground">
                    WIOA and apprenticeship funding available
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Outcome</h4>
                  <p className="text-sm text-muted-foreground">
                    Indiana State Barber License
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-red-50 to-orange-50">
              <CardHeader>
                <CardTitle>Start Your Journey</CardTitle>
                <CardDescription>
                  Join the next generation of professional barbers.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full bg-red-600 hover:bg-red-700">
                  <Link href="/apply">Apply for Barber Apprenticeship</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-orange-500 text-orange-700 hover:bg-orange-50"
                >
                  <Link href="/contact">Schedule a Visit</Link>
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>
    </main>
  );
}
