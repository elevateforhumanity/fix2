import React from 'react';
import ProgramTemplate from './ProgramTemplate';
import { programsData } from './programsData';

export default function DigitalSkillsPage() {
  return <ProgramTemplate program={programsData.digital} />;
}
