import React from 'react';
import ProgramTemplate from './ProgramTemplate';
import { programsData } from './programsData';

export default function CPRSPage() {
  return <ProgramTemplate program={programsData.cprs} />;
}
