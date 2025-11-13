/*
  Copyright (c) 2025 Elevate for Humanity
  Commercial License. No resale, sublicensing, or redistribution allowed.
  See LICENSE file for details.
*/

import React from 'react';
import { Shield, CheckCircle2, Award } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

export default function CertificationBadges({ variant = 'full' }) {
  const certifications = [
    {
      name: '501(c)(3) Nonprofit',
      category: 'Tax Status',
      icon: Shield,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      name: 'ByBlack Certified',
      category: 'Diversity',
      icon: Award,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      name: 'SAM.gov (3 Entities)',
      category: 'Federal',
      icon: CheckCircle2,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      name: 'IRS VITA Partner',
      category: 'Federal',
      icon: CheckCircle2,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      detail: 'SIDN: S28011182',
    },
    {
      name: 'Indiana State Bidder',
      category: 'State',
      icon: CheckCircle2,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
      detail: 'ID: 0000067741',
    },
    {
      name: 'DOL Compliant',
      category: 'Federal',
      icon: CheckCircle2,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
  ];

  if (variant === 'compact') {
    return (
      <div className="flex flex-wrap gap-2 justify-center">
        {certifications.slice(0, 3).map((cert, idx) => (
          <Badge
            key={idx}
            className="px-4 py-2 text-sm font-semibold"
            variant="secondary"
          >
            <cert.icon className="h-4 w-4 mr-2" />
            {cert.name}
          </Badge>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {certifications.map((cert, idx) => (
        <Card
          key={idx}
          className="text-center hover:shadow-lg transition-all hover:scale-105 animate-bounce-in"
          style={{ animationDelay: `${idx * 50}ms` }}
        >
          <CardContent className="p-4">
            <div
              className={`w-12 h-12 ${cert.bg} rounded-xl flex items-center justify-center mx-auto mb-2`}
            >
              <cert.icon className={`h-6 w-6 ${cert.color}`} />
            </div>
            <p className="font-semibold text-sm text-brand-text mb-1">
              {cert.name}
            </p>
            {cert.detail && (
              <p className="text-xs text-brand-text-muted">{cert.detail}</p>
            )}
            <Badge className="mt-2 text-xs" variant="secondary">
              {cert.category}
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
