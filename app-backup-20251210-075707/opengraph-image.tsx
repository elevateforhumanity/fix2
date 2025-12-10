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
          fontSize: 60,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '80px',
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 'bold',
            marginBottom: 20,
            textAlign: 'center',
          }}
        >
          Elevate for Humanity
        </div>
        <div
          style={{
            fontSize: 40,
            textAlign: 'center',
            opacity: 0.9,
          }}
        >
          Workforce Training & Career Development
        </div>
        <div
          style={{
            fontSize: 30,
            marginTop: 40,
            textAlign: 'center',
            opacity: 0.8,
          }}
        >
          FREE Programs • WIOA Funded • Career Ready
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
