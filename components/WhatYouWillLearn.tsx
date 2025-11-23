'use client';

import { CheckCircle } from 'lucide-react';

interface WhatYouWillLearnProps {
  items: string[];
  title?: string;
  className?: string;
}

export function WhatYouWillLearn({ 
  items, 
  title = "What you'll learn",
  className = '' 
}: WhatYouWillLearnProps) {
  return (
    <section className={`bg-white rounded-2xl border border-slate-200 p-6 md:p-8 ${className}`}>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">{title}</h2>
      <ul className="grid md:grid-cols-2 gap-4">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
            <span className="text-slate-700 text-sm leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

interface SkillsYouWillGainProps {
  skills: string[];
  className?: string;
}

export function SkillsYouWillGain({ skills, className = '' }: SkillsYouWillGainProps) {
  return (
    <section className={`bg-white rounded-2xl border border-slate-200 p-6 md:p-8 ${className}`}>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Skills you'll gain</h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium border border-emerald-200 hover:bg-emerald-100 transition"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
