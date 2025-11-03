import React from 'react';
import ProgramTemplate from './ProgramTemplate';
import { programsData } from './programsData';

export default function BarberPage() {
  return <ProgramTemplate program={programsData.barber} />;
}
