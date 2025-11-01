// Self-injecting bridge loader
// Add this to the Durable embed block instead of just the div
(function () {
  // Check if bridge is already loaded
  if (window.EFHBridge) {
    console.log('EFH Bridge already loaded');
    return;
  }

  // Create and inject the bridge script
  const script = document.createElement('script');
  script.src = 'https://main--elevateforhumanityfix.netlify.app/efh-bridge.js';
  script.setAttribute('data-efh-org', 'elevate-for-humanity');
  script.setAttribute('data-env', 'prod');
  script.defer = true;

  script.onload = function () {
    console.log('✅ EFH Bridge loaded successfully');
  };

  script.onerror = function () {
    console.error('❌ Failed to load EFH Bridge');
  };

  document.head.appendChild(script);
  console.log('🔄 Loading EFH Bridge...');
})();
// Auto-deployed Sat Nov  1 22:59:08 UTC 2025
