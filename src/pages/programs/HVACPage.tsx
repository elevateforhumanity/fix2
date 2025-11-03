import React from 'react';
import ProgramTemplate from './ProgramTemplate';
import { programsData } from './programsData';

export default function HVACPage() {
  return <ProgramTemplate program={programsData.hvac} />;
}
