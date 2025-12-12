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
          src="https://cms-artifacts.artlist.io/content/generated-image-v1/image__8/image-96fb9850-11b3-4a4b-b272-f2318aa47c8b.png?Expires=2080931577&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=wxuR4n47Ur6YnSL5Uzd8kTRC7t1mXA6YCvDzHziBqwsENTQIGBkXkLcMcp2~QBXUaZgmxrS~a1II8ygKorH5O6IRf-IAXg8bRGFN8qKCG-YI7ucStQDIdoOgkBGb4GbK4qYFgSMsXiF6rtWHli3fun~73aehkCIirR49Y-zQKmI7lIV6qoNz1f61vk~YblxBF8pQWJhbdqTIl9sQTEgLHEN7fnzCkA3-yc0fydrTlV~k7oVfQfoMiQN6KZ4VvnVLxYouzwHjoMeqa8O91H4wrcAWh26RdR4mq4DwWXksKEwqrsnZMIKnFUQDfC6MVaYw6gtdaQBdaiyHd9TVMMHMkQ__"
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
