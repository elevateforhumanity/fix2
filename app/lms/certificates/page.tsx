'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, Award, Calendar, Share2 } from 'lucide-react';

const certificates = [
  {
    id: 'CERT-2024-001',
    courseName: 'Barber Fundamentals',
    studentName: 'John Doe',
    completionDate: '2024-11-01',
    issueDate: '2024-11-05',
    status: 'issued',
    credentialUrl: 'https://credentials.elevateforhumanity.org/CERT-2024-001',
  },
];

const inProgressCourses = [
  {
    id: 2,
    courseName: 'CNA Certification Prep',
    progress: 65,
    estimatedCompletion: '2024-12-15',
  },
];

export default function CertificatesPage() {
  const handleDownload = (certId: string) => {
    // TODO: Generate and download PDF certificate
    alert(`Downloading certificate ${certId}...`);
  };

  const handleShare = (certId: string) => {
    // TODO: Share certificate
    alert(`Share certificate ${certId} on LinkedIn, Twitter, etc.`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">My Certificates</h1>
              <p className="text-muted-foreground mt-1">
                View and download your earned certificates
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/lms/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Earned Certificates */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Earned Certificates</h2>
          {certificates.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {certificates.map((cert) => (
                <Card key={cert.id} className="overflow-hidden">
                  <div className="h-32 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                    <Award className="h-16 w-16 text-white" />
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{cert.courseName}</CardTitle>
                        <CardDescription className="mt-2">
                          Certificate of Completion
                        </CardDescription>
                      </div>
                      <Badge variant="default">Issued</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Student:</span>
                        <span className="font-medium">{cert.studentName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Completed:</span>
                        <span className="font-medium">
                          {new Date(cert.completionDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Issued:</span>
                        <span className="font-medium">
                          {new Date(cert.issueDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Certificate ID:</span>
                        <span className="font-mono text-xs">{cert.id}</span>
                      </div>
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <Button className="w-full" onClick={() => handleDownload(cert.id)}>
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                      <Button variant="outline" className="w-full" onClick={() => handleShare(cert.id)}>
                        <Share2 className="h-4 w-4 mr-2" />
                        Share Certificate
                      </Button>
                      <Button variant="ghost" className="w-full" asChild>
                        <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                          View Credential
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Award className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Certificates Yet</h3>
                <p className="text-muted-foreground mb-6">
                  Complete a course to earn your first certificate
                </p>
                <Button asChild>
                  <Link href="/lms/courses">Browse Courses</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </section>

        {/* In Progress */}
        {inProgressCourses.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">In Progress</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {inProgressCourses.map((course) => (
                <Card key={course.id}>
                  <CardHeader>
                    <CardTitle>{course.courseName}</CardTitle>
                    <CardDescription>
                      Complete this course to earn your certificate
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      Est. completion: {new Date(course.estimatedCompletion).toLocaleDateString()}
                    </div>
                    <Button className="w-full" asChild>
                      <Link href={`/lms/courses/${course.id}`}>
                        Continue Course
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
