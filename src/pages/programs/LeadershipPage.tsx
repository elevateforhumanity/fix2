import React from 'react';
import ProgramTemplate from './ProgramTemplate';
import { programsData } from './programsData';

export default function LeadershipPage() {
  return <ProgramTemplate program={programsData.leadership} />;
}
