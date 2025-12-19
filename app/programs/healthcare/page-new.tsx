import type { Metadata } from 'next';
import { CategoryPageTemplate } from '@/components/templates/CategoryPageTemplate';
import { categoryData, getCategoryPrograms } from '@/lib/category-data';

export const metadata: Metadata = {
  title: 'Healthcare Programs',
  description: 'CNA, Medical Assistant, Phlebotomy, and Home Health Aide training programs. Free with funding when eligible.',
};

export default function HealthcarePage() {
  const data = categoryData.healthcare;
  const programs = getCategoryPrograms('healthcare');

  return (
    <CategoryPageTemplate
      data={{
        ...data,
        programs: programs.map((p) => ({
          slug: p.slug,
          name: p.name,
          shortDescription: p.shortDescription || '',
          duration: p.duration || '',
          price: p.price,
          heroImage: p.heroImage,
        })),
      }}
    />
  );
}
