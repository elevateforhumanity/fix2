import { injectSchema } from '@/lib/schema';

interface StructuredDataProps {
  data: any;
}

export default function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={injectSchema(data)}
    />
  );
}
