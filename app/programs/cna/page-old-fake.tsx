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
  title: 'CNA Certification | Elevate for Humanity',
  description:
    'Certified Nursing Assistant training program with clinical experience and state certification.',
};

export default function CNAProgramPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-red-600 to-orange-500">
        <div className="absolute inset-0 bg-black/40" />
        <Image
          src="/media/programs/healthcare-1.jpg"
          alt="CNA training"
          fill
          className="object-cover mix-blend-overlay"
          priority
        />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-3xl">
            <p className="text-sm uppercase tracking-wide mb-4 text-orange-200">
              Healthcare Career Training
            </p>
            <h1 className="text-5xl font-bold mb-4">
              Certified Nursing Assistant (CNA)
            </h1>
            <p className="text-xl text-gray-100">
              Start your healthcare career with CNA certification. Gain the skills and credentials needed to provide essential patient care.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 space-y-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Program Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc list-inside">
                  <li>State-approved CNA training program</li>
                  <li>
                    75+ hours of classroom instruction and clinical practice
                  </li>
                  <li>Hands-on experience in real healthcare settings</li>
                  <li>Preparation for state certification exam</li>
                  <li>Job placement assistance upon completion</li>
                  <li>Fast-track to employment in growing healthcare field</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Skills You'll Develop</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Clinical Skills</h4>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>Vital signs monitoring</li>
                      <li>Patient hygiene and comfort</li>
                      <li>Mobility assistance</li>
                      <li>Nutrition and feeding</li>
                      <li>Infection control</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Professional Skills</h4>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>Patient communication</li>
                      <li>Medical documentation</li>
                      <li>Team collaboration</li>
                      <li>Ethics and professionalism</li>
                      <li>Emergency response</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Training Pathway</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3 list-decimal list-inside">
                  <li>Complete application and background check</li>
                  <li>Attend classroom instruction (theory and skills lab)</li>
                  <li>Complete clinical rotation in healthcare facility</li>
                  <li>Pass state certification exam (written and skills)</li>
                  <li>Receive CNA certification and begin employment</li>
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
                    4-6 weeks (75+ hours)
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Schedule</h4>
                  <p className="text-sm text-muted-foreground">
                    Day and evening classes available
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Requirements</h4>
                  <p className="text-sm text-muted-foreground">
                    High school diploma/GED, background check
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Funding</h4>
                  <p className="text-sm text-muted-foreground">
                    Workforce grants and payment plans available
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-red-50 to-orange-50">
              <CardHeader>
                <CardTitle>Begin Your Healthcare Career</CardTitle>
                <CardDescription>
                  High demand, stable employment, and opportunities for
                  advancement.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full bg-red-600 hover:bg-red-700">
                  <Link href="/apply">Apply for CNA Training</Link>
                </Button>
                <Button asChild variant="outline" className="w-full border-orange-500 text-orange-700 hover:bg-orange-50">
                  <Link href="/contact">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>
    </main>
  );
}
