import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, test } from 'vitest';
import Sitemap from './Sitemap';

const renderSitemap = () =>
  render(
    <HelmetProvider>
      <BrowserRouter>
        <Sitemap />
      </BrowserRouter>
    </HelmetProvider>
  );

describe('Sitemap page', () => {
  test('renders primary heading', () => {
    renderSitemap();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Site Map'
    );
  });

  test('lists key navigation links', () => {
    renderSitemap();

    const expectations = [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Course Library', href: '/courses' },
      { label: 'Student Portal', href: '/student' },
      { label: 'Instructor Portal', href: '/instructor' },
      { label: 'Analytics', href: '/analytics' },
      { label: 'Ecosystem', href: '/ecosystem' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Refund Policy', href: '/refund-policy' },
      { label: 'Terms of Service', href: '/terms-of-service' },
      { label: 'Accessibility', href: '/accessibility' },
      { label: 'Student Handbook', href: '/student-handbook' },
    ];

    expectations.forEach(({ label, href }) => {
      const links = screen.getAllByRole('link', { name: label });
      const hrefs = links.map((link) => link.getAttribute('href'));
      expect(hrefs).toContain(href);
    });
  });

  test('shows handbook artwork with alt text', () => {
    renderSitemap();
    const handbookImage = screen.getByAltText(
      'Elevate for Humanity Student Handbook cover'
    );
    expect(handbookImage).toHaveAttribute('src', '/images/handbook-cover.jpg');
  });

  test('renders footer policy links', () => {
    renderSitemap();

    [
      'Privacy Policy',
      'Refund Policy',
      'Terms of Service',
      'Accessibility',
    ].forEach((label) => {
      expect(
        screen.getAllByRole('link', { name: label })[0]
      ).toBeInTheDocument();
    });
  });
});
