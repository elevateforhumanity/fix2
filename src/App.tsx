export default function App() {
  // Add a side effect to prove this component is rendering
  if (typeof window !== 'undefined') {
    const marker = document.createElement('div');
    marker.id = 'react-rendered-marker';
    marker.style.cssText = 'position:fixed;top:0;left:0;right:0;background:green;color:white;padding:10px;text-align:center;z-index:99999;font-size:20px;';
    marker.textContent = '✅ REACT IS RENDERING!';
    document.body.appendChild(marker);
  }
  
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', marginTop: '60px' }}>
      <h1 style={{ color: 'green' }}>✅ Hello World!</h1>
      <p>If you see this, React is working.</p>
      <p>Timestamp: {new Date().toISOString()}</p>
    </div>
  );
}
