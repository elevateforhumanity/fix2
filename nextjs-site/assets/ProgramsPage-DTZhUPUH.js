import { j as e, H as i } from './vendor-react-C-ZQNdj3.js';
import { N as r } from './Navigation-Bbm4Xzc1.js';
import { H as n } from './Hero-OZm9SWPG.js';
import { S as t } from './Section-DjKsK8lK.js';
import { P as a } from './ProgramCard-Cgx3ANiy.js';
import { F as s } from './Footer-Dh9yHrAI.js';
import './vendor-Da1LjC7-.js';
import './vendor-router-CQjfSXV_.js';
function o() {
  return e.jsxs('div', {
    children: [
      e.jsxs(i, {
        children: [
          e.jsx('title', {
            children: 'Career Programs | Elevate for Humanity',
          }),
          e.jsx('meta', {
            name: 'description',
            content:
              'Choose from 8 high-demand career pathways with 100% funding available. Barber, HVAC, Healthcare, and more.',
          }),
        ],
      }),
      e.jsx(r, {}),
      e.jsx(n, {
        title: 'Our Career Programs',
        subtitle:
          'Choose from 8 high-demand career pathways with 100% funding available',
        badges: [
          { icon: '💰', text: '100% Funded' },
          { icon: '📜', text: '8 Programs' },
          { icon: '🎓', text: 'Industry Certifications' },
          { icon: '📍', text: 'Marion County' },
        ],
        primaryButton: { text: 'Apply Now', href: '/apply' },
        secondaryButton: { text: 'Contact Us', href: '/contact' },
      }),
      e.jsx(t, {
        children: e.jsxs('div', {
          className: 'flex flex-wrap gap-8',
          children: [
            e.jsx(a, {
              icon: '🪒',
              title: 'Barber Apprenticeship',
              duration: '2,000 hours • State Licensure',
              description:
                'Earn while you learn. Master professional barbering skills and qualify for Indiana State Licensure.',
              funding: '💰 WRG • WIOA • Apprenticeship',
              href: '/programs/barber',
            }),
            e.jsx(a, {
              icon: '🔧',
              title: 'Building Services Technician',
              duration: 'Flexible • Industry Certification',
              description:
                'Learn essential building maintenance and repair skills for commercial and residential properties.',
              funding: '💰 WRG • WIOA',
              href: '/programs/building-services',
            }),
            e.jsx(a, {
              icon: '🔥',
              title: 'HVAC & Welding',
              duration: 'Dual Certification • High Demand',
              description:
                'Master two in-demand trades with comprehensive training in heating, ventilation, air conditioning, and welding.',
              funding: '💰 WRG • WIOA',
              href: '/programs/hvac-welding',
            }),
            e.jsx(a, {
              icon: '🏥',
              title: 'Healthcare Training',
              duration: 'Certification Programs • High Demand',
              description:
                'Enter the healthcare field with comprehensive training in patient care, medical terminology, and clinical skills.',
              funding: '💰 WRG • WIOA',
              href: '/programs/healthcare',
            }),
            e.jsx(a, {
              icon: '🧪',
              title: 'Drug Testing Specialist',
              duration: 'Certification • Compliance Training',
              description:
                'Become a certified drug testing specialist with training in collection procedures, chain of custody, and compliance.',
              funding: '💰 WRG • WIOA',
              href: '/programs/drug-testing',
            }),
            e.jsx(a, {
              icon: '💻',
              title: 'Digital Skills',
              duration: 'Self-Paced • Multiple Certifications',
              description:
                'Build essential digital literacy skills including Microsoft Office, Google Workspace, and online communication.',
              funding: '💰 WRG • WIOA',
              href: '/programs/digital-skills',
            }),
            e.jsx(a, {
              icon: '👔',
              title: 'Leadership Development',
              duration: 'Professional Development • Soft Skills',
              description:
                'Develop leadership, communication, and professional skills to advance your career and lead teams effectively.',
              funding: '💰 WRG • WIOA',
              href: '/programs/leadership',
            }),
            e.jsx(a, {
              icon: '🤝',
              title: 'Peer Recovery Support',
              duration: 'Certification • Community Impact',
              description:
                'Train to become a certified peer recovery support specialist and help others on their recovery journey.',
              funding: '💰 WRG • WIOA',
              href: '/programs/peer-recovery',
            }),
          ],
        }),
      }),
      e.jsx(t, {
        background: 'green',
        children: e.jsxs('div', {
          className: 'mx-auto max-w-[800px] text-center',
          children: [
            e.jsx('h2', {
              className: 'section-title',
              children: 'Why Choose Our Programs?',
            }),
            e.jsxs('div', {
              className: 'grid grid-cols-1 md:grid-cols-3 gap-8 mt-8',
              children: [
                e.jsxs('div', {
                  children: [
                    e.jsx('div', {
                      className: 'text-4xl mb-4',
                      children: '💰',
                    }),
                    e.jsx('h3', {
                      className: 'text-xl font-bold mb-2',
                      children: '100% Funded',
                    }),
                    e.jsx('p', {
                      children:
                        'No cost to eligible participants through WIOA and WRG funding',
                    }),
                  ],
                }),
                e.jsxs('div', {
                  children: [
                    e.jsx('div', {
                      className: 'text-4xl mb-4',
                      children: '🎯',
                    }),
                    e.jsx('h3', {
                      className: 'text-xl font-bold mb-2',
                      children: 'Job Placement',
                    }),
                    e.jsx('p', {
                      children:
                        '92% of graduates secure employment within 6 months',
                    }),
                  ],
                }),
                e.jsxs('div', {
                  children: [
                    e.jsx('div', {
                      className: 'text-4xl mb-4',
                      children: '📜',
                    }),
                    e.jsx('h3', {
                      className: 'text-xl font-bold mb-2',
                      children: 'Certifications',
                    }),
                    e.jsx('p', {
                      children:
                        'Industry-recognized credentials that employers value',
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
      e.jsx(s, {}),
    ],
  });
}
export { o as default };
