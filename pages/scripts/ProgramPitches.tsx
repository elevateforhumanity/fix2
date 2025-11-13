'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import seeds from '@/seeds/elevate/elevate.json';

export default function ProgramPitchesPage() {
  const { programs } = seeds.program_pitches;

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Program Pitches</h1>
        <p className="text-muted-foreground">
          Ready-to-use program descriptions for marketing and sales
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {Object.entries(programs).map(([key, program]) => (
          <Card key={key}>
            <CardHeader>
              <CardTitle>{program.name}</CardTitle>
              <CardDescription>Program Pitch</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{program.pitch}</p>
              <Button asChild>
                <a href={program.url} target="_blank" rel="noopener noreferrer">
                  View Program
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
