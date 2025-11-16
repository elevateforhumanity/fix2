'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import seeds from '@/seeds/elevate/elevate.json';
import { ExternalLink } from 'lucide-react';

export default function QuickLinksPage() {
  const links = seeds.quick_links;

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Quick Links</h1>
        <p className="text-muted-foreground">
          All important links organized by audience
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>For Students</CardTitle>
            <CardDescription>Student portal and program pages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {Object.entries(links.students).map(([key, url]) => (
              <Button
                key={key}
                asChild
                variant="outline"
                className="w-full justify-between"
              >
                <a
                  href={url as string}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>For Partners</CardTitle>
            <CardDescription>Partner and delegate portals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {Object.entries(links.partners).map(([key, url]) => (
              <Button
                key={key}
                asChild
                variant="outline"
                className="w-full justify-between"
              >
                <a
                  href={url as string}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>For Admins</CardTitle>
            <CardDescription>Admin dashboard and tools</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {Object.entries(links.admins).map(([key, url]) => (
              <Button
                key={key}
                asChild
                variant="outline"
                className="w-full justify-between"
              >
                <a
                  href={url as string}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Public Pages</CardTitle>
            <CardDescription>
              Certificate verification and contact
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {Object.entries(links.public).map(([key, url]) => (
              <Button
                key={key}
                asChild
                variant="outline"
                className="w-full justify-between"
              >
                <a
                  href={url as string}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
