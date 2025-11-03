import React from 'react';
import ProgramTemplate from './ProgramTemplate';
import { programsData } from './programsData';

export default function BuildingTechPage() {
  return <ProgramTemplate program={programsData['building-tech']} />;
}
