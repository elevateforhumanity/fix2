import React from 'react';
import ProgramTemplate from './ProgramTemplate';
import { programsData } from './programsData';

export default function HealthcarePage() {
  return <ProgramTemplate program={programsData.healthcare} />;
}
