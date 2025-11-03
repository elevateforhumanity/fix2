import React from 'react';
import ProgramTemplate from './ProgramTemplate';
import { programsData } from './programsData';

export default function DrugTestingPage() {
  return <ProgramTemplate program={programsData['drug-testing']} />;
}
