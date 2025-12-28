export default function TestPage() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>✅ Test Page Works</h1>
      <p>If you can see this, Next.js routing is working.</p>
      <p>Current time: {new Date().toISOString()}</p>
      <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>Go to Homepage</a>
    </div>
  );
}
