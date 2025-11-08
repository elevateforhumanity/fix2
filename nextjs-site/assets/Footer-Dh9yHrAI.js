import { j as e } from './vendor-react-C-ZQNdj3.js';
import { L as r } from './vendor-router-CQjfSXV_.js';
const n = () =>
  e.jsxs('footer', {
    className: 'site-footer',
    children: [
      e.jsxs('div', {
        className: 'footer-container',
        children: [
          e.jsxs('div', {
            className: 'footer-section',
            children: [
              e.jsx('h3', { children: 'Elevate for Humanity' }),
              e.jsx('p', {
                children:
                  'Empowering communities through technology and innovation',
              }),
            ],
          }),
          e.jsxs('div', {
            className: 'footer-section',
            children: [
              e.jsx('h4', { children: 'Quick Links' }),
              e.jsx(r, { to: '/', children: 'Home' }),
              e.jsx(r, { to: '/about', children: 'About' }),
              e.jsx(r, { to: '/blog', children: 'Blog' }),
              e.jsx(r, { to: '/contact', children: 'Contact' }),
              e.jsx(r, { to: '/accessibility', children: 'Accessibility' }),
            ],
          }),
          e.jsxs('div', {
            className: 'footer-section',
            children: [
              e.jsx('h4', { children: 'Connect' }),
              e.jsx('a', {
                href: 'https://facebook.com',
                target: '_blank',
                rel: 'noopener noreferrer',
                children: 'Facebook',
              }),
              e.jsx('a', {
                href: 'https://linkedin.com',
                target: '_blank',
                rel: 'noopener noreferrer',
                children: 'LinkedIn',
              }),
              e.jsx('a', {
                href: 'https://www.youtube.com/@elevateforhumanity',
                target: '_blank',
                rel: 'noopener noreferrer',
                children: 'YouTube',
              }),
            ],
          }),
        ],
      }),
      e.jsxs('div', {
        className: 'footer-bottom',
        children: [
          e.jsxs('div', {
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBottom: '1rem',
            },
            children: [
              e.jsxs('div', {
                style: {
                  backgroundColor: '#7c3aed',
                  color: '#fff',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                },
                children: [
                  e.jsx('span', { children: '🏛️' }),
                  e.jsx('span', { children: '501(c)(3) Nonprofit' }),
                ],
              }),
              e.jsxs('div', {
                style: {
                  backgroundColor: '#000',
                  color: '#fff',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                },
                children: [
                  e.jsx('span', {
                    style: { fontSize: '1.2rem' },
                    children: '✊🏿',
                  }),
                  e.jsx('span', { children: 'ByBlack Certified' }),
                ],
              }),
              e.jsxs('div', {
                style: {
                  backgroundColor: '#1e40af',
                  color: '#fff',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                },
                children: [
                  e.jsx('span', { children: '✅' }),
                  e.jsx('span', { children: 'SAM.gov Registered' }),
                ],
              }),
              e.jsxs('div', {
                style: {
                  backgroundColor: '#059669',
                  color: '#fff',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                },
                children: [
                  e.jsx('span', { children: '📋' }),
                  e.jsx('span', { children: 'IRS VITA Partner' }),
                ],
              }),
            ],
          }),
          e.jsxs('p', {
            children: [
              '© ',
              new Date().getFullYear(),
              ' Elevate for Humanity. All rights reserved.',
            ],
          }),
        ],
      }),
    ],
  });
export { n as F };
