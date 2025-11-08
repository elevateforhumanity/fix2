import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './styles/durable-design.css';
import App from './App';

// Start autopilot worker (runs in all environments)
import('../workers/autopilot-worker.js').catch(error => {
  console.warn('⚠️ Autopilot worker not available:', error.message);
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
