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
  title: 'HVAC Technician Pathway | Elevate for Humanity',
  description:
    'Launch your HVAC career with workforce-ready training, apprenticeships, and funding pathways.',
};

export default function HVACProgramPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-red-600 to-orange-500">
        <div className="absolute inset-0 bg-black/40" />
        <Image
          src="/media/programs/trades-1.jpg"
          alt="HVAC technician at work"
          fill
          className="object-cover mix-blend-overlay"
          priority
        />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-3xl">
            <p className="text-sm uppercase tracking-wide mb-4 text-orange-200">
              Workforce Training Program
            </p>
            <h1 className="text-5xl font-bold mb-4">
              HVAC Technician Career Pathway
            </h1>
            <p className="text-xl text-gray-100">
              Hands-on, workforce-focused HVAC training built for working
              adults, career changers, and young people who want a skilled trade
              with real demand.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 space-y-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>What You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc list-inside">
                  <li>
                    HVAC fundamentals: heating, cooling, ventilation, and
                    refrigeration
                  </li>
                  <li>
                    Tools, safety, and field etiquette for residential and light
                    commercial work
                  </li>
                  <li>Basic electrical concepts related to HVAC systems</li>
                  <li>
                    Troubleshooting, maintenance, and customer communication
                  </li>
                  <li>
                    Preparation for industry-recognized entry-level
                    certifications
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Who This Program Is For</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc list-inside">
                  <li>
                    Adults looking for a new career in a high-demand trade
                  </li>
                  <li>
                    Young adults who want a skilled trade instead of a 4-year
                    degree
                  </li>
                  <li>
                    People already in construction who want to specialize and
                    increase earnings
                  </li>
                  <li>
                    Anyone seeking stable employment with growth potential
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Program Pathway</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3 list-decimal list-inside">
                  <li>Complete your Elevate intake and funding screening</li>
                  <li>Enroll in the HVAC program and attend orientation</li>
                  <li>
                    Complete online modules and guided in-person or lab
                    experiences
                  </li>
                  <li>
                    Work with our team on employer connections and
                    apprenticeships
                  </li>
                  <li>
                    Transition into employment with job search support and
                    coaching
                  </li>
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
                  <h4 className="font-semibold mb-2">Format</h4>
                  <p className="text-sm text-muted-foreground">
                    Blended online + hands-on
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Schedule</h4>
                  <p className="text-sm text-muted-foreground">
                    Flexible, evenings and weekends available
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Funding</h4>
                  <p className="text-sm text-muted-foreground">
                    Workforce grant pathways may be available
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Support</h4>
                  <p className="text-sm text-muted-foreground">
                    1:1 case management and career coaching
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-red-50 to-orange-50">
              <CardHeader>
                <CardTitle>Ready to Get Started?</CardTitle>
                <CardDescription>
                  Complete the interest form and our team will follow up with
                  next steps.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full bg-red-600 hover:bg-red-700">
                  <Link href="/apply">Start HVAC Interest Form</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-orange-500 text-orange-700 hover:bg-orange-50"
                >
                  <Link href="/contact">Talk with the Elevate Team</Link>
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>
    </main>
  );
}
