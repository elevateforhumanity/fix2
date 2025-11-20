export default function TestDeployPage() {
  const timestamp = new Date().toISOString();
  
  return (
    <div style={{ padding: '40px', fontFamily: 'system-ui' }}>
      <h1>✅ Deployment Test Page</h1>
      <p>If you see this, the latest code is deployed!</p>
      <p><strong>Build timestamp:</strong> {timestamp}</p>
      <p><strong>Commit:</strong> Latest from main branch</p>
      <hr />
      <p>Next step: Fix /lms/dashboard</p>
    </div>
  );
}
