import type { Metadata } from 'next';
import { CategoryPageTemplate } from '@/components/templates/CategoryPageTemplate';
import { categoryData, getCategoryPrograms } from '@/lib/category-data';

export const metadata: Metadata = {
  title: 'Skilled Trades Programs',
  description: 'HVAC, Electrical, Plumbing, and Construction training programs. Free with funding when eligible.',
};

export default function SkilledTradesPage() {
  const data = categoryData['skilled-trades'];
  const programs = getCategoryPrograms('skilled-trades');

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
