import { j as o } from './vendor-react-C-ZQNdj3.js';
import { L as e } from './vendor-router-CQjfSXV_.js';
import './vendor-Da1LjC7-.js';
function i() {
  return o.jsx('div', {
    style: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
      padding: 20,
    },
    children: o.jsxs('div', {
      style: {
        maxWidth: 500,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 48,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
      },
      children: [
        o.jsx('div', {
          style: { fontSize: 64, marginBottom: 24 },
          children: '✉️',
        }),
        o.jsx('h1', {
          style: { fontSize: 28, fontWeight: 700, marginBottom: 16 },
          children: 'Verify Your Email',
        }),
        o.jsx('p', {
          style: { fontSize: 16, color: '#6b5d52', marginBottom: 24 },
          children:
            "We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.",
        }),
        o.jsx(e, {
          to: '/login',
          style: {
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: '#00a544',
            color: '#fff',
            borderRadius: 6,
            fontSize: 14,
            fontWeight: 600,
            textDecoration: 'none',
          },
          children: 'Back to Login',
        }),
      ],
    }),
  });
}
export { i as default };
