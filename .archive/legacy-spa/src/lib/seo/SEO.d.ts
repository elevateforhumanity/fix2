import { FC } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  canonical?: string;
}

declare const SEO: FC<SEOProps>;
export default SEO;
