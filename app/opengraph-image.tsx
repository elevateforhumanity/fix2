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
          src="https://cms-artifacts.artlist.io/content/generated-image-v1/image__5/image-00bcede7-220e-4356-97d3-0589398400e5.png?Expires=2081095425&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=s88ug6yhiDabHpkKCw5kM0Jkvbjh1HIqxz9hB5tXusrsd9DuQO4bQo4RLCNC~S0v48C-S6hZl~C4Xb~JWS4BA1YLuPs2BCBB98M9z8vWhkxoi36r8Rgbv7jP9fkOT0R1QtzuRuwOS~2VaKcnkqx-6iqNUqr11CPb3HbhT-ZQiSyuNV3CeS30sjIU6kT7ErZmRWcpGcAuZeV3KMrExqnXzwDrEwlzf9K43LmHteC-~dgByGgEE1Lv1CmSe2RUs7dUXR1EPTE2Xy6LAHaXdUpHRv1HfP2gAmGYZp3M~KM1UttrbX3ORTGxoUZlpHRRHbuETqaYHh~GrEUYluIycvTFaw__"
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
