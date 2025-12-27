import { injectSchema } from '@/lib/schema';
import { SafeHtml } from '@/lib/sanitize';

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
