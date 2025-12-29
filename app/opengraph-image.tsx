import { ImageResponse } from 'next/og';

// Note: OG images automatically use edge runtime for optimal performance
export const alt = 'Elevate for Humanity - Workforce Training & Career Development';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
        }}
      >
        <img
          src="/images/heroes/hero-homepage.jpg"
          alt="Elevate for Humanity"
          width="1200"
          height="630"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
