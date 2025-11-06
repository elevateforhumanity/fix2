/**
 * ProgramCard Component
 * Matches elevateforhumanity.org program card design exactly
 * Extracted from: https://www.elevateforhumanity.org
 */

import React from 'react';
import { Link } from 'react-router-dom';

interface ProgramCardProps {
  icon: string;
  title: string;
  duration: string;
  description: string;
  funding: string;
  href: string;
  className?: string;
}

export default function ProgramCard({
  icon,
  title,
  duration,
  description,
  funding,
  href,
  className = '',
}: ProgramCardProps) {
  return (
    <div className={`program-card flex-1 min-w-[280px] ${className}`}>
      <div className="program-icon">{icon}</div>
      <h3 className="program-title">{title}</h3>
      <p className="body-small opacity-80 mb-4">{duration}</p>
      <p className="mb-4">{description}</p>
      <div className="program-funding">{funding}</div>
      <Link to={href} className="button mt-6 w-full">
        Learn More →
      </Link>
    </div>
  );
}
