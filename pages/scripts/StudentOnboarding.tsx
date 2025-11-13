'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import seeds from '@/seeds/elevate/elevate.json';

export default function StudentOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const { steps, supportLine } = seeds.student_onboarding;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = steps[currentStep];

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Student Onboarding</h1>
        <p className="text-muted-foreground">
          Step {currentStep + 1} of {steps.length}
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{step.name}</CardTitle>
          <CardDescription>Step {step.step}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-6">{step.script}</p>
          
          <div className="flex gap-4">
            <Button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              variant="outline"
            >
              Previous
            </Button>
            
            {step.cta && (
              <Button asChild>
                <a href={step.ctaUrl} target="_blank" rel="noopener noreferrer">
                  {step.cta}
                </a>
              </Button>
            )}
            
            <Button
              onClick={handleNext}
              disabled={currentStep === steps.length - 1}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 md:grid-cols-9 gap-2">
        {steps.map((s, index) => (
          <button
            key={s.step}
            onClick={() => setCurrentStep(index)}
            className={`h-2 rounded-full transition-colors ${
              index === currentStep
                ? 'bg-primary'
                : index < currentStep
                ? 'bg-primary/50'
                : 'bg-muted'
            }`}
            aria-label={`Go to step ${index + 1}`}
          />
        ))}
      </div>

      <div className="mt-8 p-4 bg-muted rounded-lg">
        <p className="text-sm text-center">{supportLine}</p>
      </div>
    </div>
  );
}
