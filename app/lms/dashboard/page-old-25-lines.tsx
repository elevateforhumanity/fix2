export default function SimpleDashboard() {
  const deployId = 'DEPLOY_TEST_' + Date.now();

  return (
    <div
      style={{
        padding: '40px',
        fontFamily: 'system-ui',
        background: '#f0f9ff',
      }}
    >
      <h1 style={{ color: '#dc2626' }}>🚀 NEW BUILD DEPLOYED SUCCESSFULLY</h1>
      <p style={{ fontSize: '20px', fontWeight: 'bold' }}>
        Welcome back, Elevate Learner!
      </p>
      <p
        style={{
          background: '#fef3c7',
          padding: '10px',
          border: '2px solid #f59e0b',
        }}
      >
        ✅ If you see this yellow box, the latest code is deployed!
      </p>
      <p>Deploy ID: {deployId}</p>
      <hr />
      <h2>Your Stats</h2>
      <ul style={{ fontSize: '18px' }}>
        <li>✅ Active Courses: 3</li>
        <li>✅ Completed: 1</li>
        <li>✅ Certificates: 1</li>
      </ul>
      <p
        style={{
          marginTop: '20px',
          padding: '15px',
          background: '#dcfce7',
          border: '2px solid #16a34a',
        }}
      >
        <strong>SUCCESS:</strong> This is the simplified dashboard from the
        latest commit. The old complex dashboard has been replaced.
      </p>
    </div>
  );
}
