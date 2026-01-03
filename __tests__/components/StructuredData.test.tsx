import { render } from '@testing-library/react';
import { StructuredData, createOrganizationSchema, createCourseSchema } from '@/components/StructuredData';

describe('StructuredData Component', () => {
  it('should render JSON-LD script tag', () => {
    const testData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Test Org',
    };

    const { container } = render(<StructuredData data={testData} />);
    const script = container.querySelector('script[type="application/ld+json"]');

    expect(script).toBeInTheDocument();
    expect(script?.textContent).toBe(JSON.stringify(testData));
  });

  it('should handle complex nested data', () => {
    const complexData = {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'Test Course',
      provider: {
        '@type': 'Organization',
        name: 'Test Provider',
      },
    };

    const { container } = render(<StructuredData data={complexData} />);
    const script = container.querySelector('script[type="application/ld+json"]');

    expect(script?.textContent).toContain('Test Course');
    expect(script?.textContent).toContain('Test Provider');
  });
});

describe('Schema Helpers', () => {
  describe('createOrganizationSchema', () => {
    it('should create valid organization schema', () => {
      const schema = createOrganizationSchema();

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('EducationalOrganization');
      expect(schema.name).toBe('Elevate for Humanity');
      expect(schema.url).toBe('https://elevateforhumanity.org');
      expect(schema.address).toBeDefined();
      expect(schema.contactPoint).toBeDefined();
    });
  });

  describe('createCourseSchema', () => {
    it('should create valid course schema', () => {
      const course = {
        name: 'Barber Apprenticeship',
        description: 'Learn barbering skills',
        url: 'https://elevateforhumanity.org/programs/barber',
        duration: 'P12W',
        price: 0,
      };

      const schema = createCourseSchema(course);

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('Course');
      expect(schema.name).toBe(course.name);
      expect(schema.description).toBe(course.description);
      expect(schema.offers.price).toBe(0);
      expect(schema.offers.priceCurrency).toBe('USD');
    });

    it('should handle optional fields', () => {
      const course = {
        name: 'Test Course',
        description: 'Test Description',
        url: 'https://example.com',
      };

      const schema = createCourseSchema(course);

      expect(schema.timeRequired).toBeUndefined();
      expect(schema.offers.price).toBe(0);
    });
  });
});
