import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Elevate for Humanity',
    short_name: 'Elevate',
    description: 'Free workforce training and apprenticeships in Indianapolis. WIOA, WRG, and JRI funded programs.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ea580c',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
