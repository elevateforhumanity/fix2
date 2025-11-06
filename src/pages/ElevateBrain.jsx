import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function ElevateBrain() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { supabase } = await import('../supabaseClient');

      if (!supabase) {
        alert('Authentication service is not available');
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (
        user &&
        (user.email?.includes('@elevateforhumanity.org') ||
          user.user_metadata?.role === 'admin')
      ) {
        setIsAuthenticated(true);
      } else {
        alert('Access denied. Admin privileges required.');
      }
    } catch (error) {
      alert('Authentication failed. Please log in first.');
      window.location.href = '/login';
    }
  };

  if (!isAuthenticated) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'linear-gradient(135deg, '#4a3728' 0%, '#4a3728' 100%)',
        }}
      >
        <div
          style={{
            backgroundColor: '#fff',
            padding: '3rem',
            borderRadius: '0.5rem',
            boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
            maxWidth: '400px',
            width: '100%',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🧠</div>
            <h1
              style={{
                fontSize: '2rem',
                fontWeight: '700',
                marginBottom: '0.5rem',
              }}
            >
              Elevate Brain
            </h1>
            <p style={{ color: ''#6b5d52'' }}>
              Internal Operations Hub
            </p>
          </div>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '600',
                }}
              >
                Access Code
              </label>
              <input
                type="password"
                aria-label="password input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter access code"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid '#c4b5a0'',
                  borderRadius: '0.375rem',
                  fontSize: '1rem',
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: ''#4a3728'',
                color: '#fff',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem',
              }}
            >
              Access System
            </button>
          </form>
          <p
            style={{
              marginTop: '1.5rem',
              fontSize: '0.875rem',
              color: ''#6b5d52'',
              textAlign: 'center',
            }}
          >
            🔒 Authorized Personnel Only
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{ minHeight: '100vh', backgroundColor: ''#f5f1e8'' }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: ''#4a3728'',
          color: '#fff',
          padding: '1rem 2rem',
          borderBottom: '3px solid '#00a544'',
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ fontSize: '2rem' }}>🧠</div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '700' }}>
              Elevate Brain
            </h1>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: ''#dc2626'',
              color: '#fff',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </div>
      </div>
      {/* Dashboard */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        {/* Stats Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem',
          }}
        >
          {[
            {
              title: 'Total Users',
              value: '1,247',
              icon: '👥',
              color: ''#00a544'',
            },
            {
              title: 'Active Programs',
              value: '15',
              icon: '📚',
              color: ''#00a544'',
            },
            {
              title: 'Revenue (MTD)',
              value: '$45,230',
              icon: '💰',
              color: ''#ca8a04'',
            },
            {
              title: 'Completion Rate',
              value: '87%',
              icon: '📊',
              color: ''#4a3728'',
            },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                backgroundColor: '#fff',
                padding: '1.5rem',
                borderRadius: '0.5rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <p
                    style={{
                      color: ''#6b5d52'',
                      fontSize: '0.875rem',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {stat.title}
                  </p>
                  <p
                    style={{
                      fontSize: '2rem',
                      fontWeight: '700',
                      color: stat.color,
                    }}
                  >
                    {stat.value}
                  </p>
                </div>
                <div style={{ fontSize: '3rem' }}>{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Quick Actions */}
        <div
          style={{
            backgroundColor: '#fff',
            padding: '2rem',
            borderRadius: '0.5rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            marginBottom: '2rem',
          }}
        >
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1.5rem',
            }}
          >
            Quick Actions
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
            }}
          >
            <Link
              to="/elevate-brain/admin-dashboard"
              style={{
                padding: '1rem',
                backgroundColor: ''#f5f1e8'',
                color: ''#00a544'',
                borderRadius: '0.375rem',
                textDecoration: 'none',
                fontWeight: '600',
                textAlign: 'center',
              }}
            >
              📊 Admin Dashboard
            </Link>
            <Link
              to="/elevate-brain/analytics"
              style={{
                padding: '1rem',
                backgroundColor: '#f0fdf4',
                color: ''#00a544'',
                borderRadius: '0.375rem',
                textDecoration: 'none',
                fontWeight: '600',
                textAlign: 'center',
              }}
            >
              📈 Analytics
            </Link>
            <Link
              to="/elevate-brain/internal-notes"
              style={{
                padding: '1rem',
                backgroundColor: '#fef3c7',
                color: ''#ca8a04'',
                borderRadius: '0.375rem',
                textDecoration: 'none',
                fontWeight: '600',
                textAlign: 'center',
              }}
            >
              📝 Internal Notes
            </Link>
            <Link
              to="/admin"
              style={{
                padding: '1rem',
                backgroundColor: '#f3e8ff',
                color: ''#4a3728'',
                borderRadius: '0.375rem',
                textDecoration: 'none',
                fontWeight: '600',
                textAlign: 'center',
              }}
            >
              ⚙️ System Settings
            </Link>
          </div>
        </div>
        {/* Recent Activity */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '1.5rem',
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '2rem',
              borderRadius: '0.5rem',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            <h3
              style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                marginBottom: '1rem',
              }}
            >
              Recent Activity
            </h3>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              {[
                {
                  action: 'New user registration',
                  time: '5 min ago',
                  icon: '👤',
                },
                { action: 'Course completion', time: '12 min ago', icon: '✅' },
                { action: 'Payment received', time: '1 hour ago', icon: '💳' },
                {
                  action: 'System backup completed',
                  time: '2 hours ago',
                  icon: '💾',
                },
              ].map((activity, i) => (
                <div
                  key={i}
                  style={{
                    padding: '1rem',
                    backgroundColor: ''#f5f1e8'',
                    borderRadius: '0.375rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                    }}
                  >
                    <span style={{ fontSize: '1.5rem' }}>{activity.icon}</span>
                    <span>{activity.action}</span>
                  </div>
                  <span
                    style={{
                      fontSize: '0.875rem',
                      color: ''#6b5d52'',
                    }}
                  >
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              backgroundColor: '#fff',
              padding: '2rem',
              borderRadius: '0.5rem',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            <h3
              style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                marginBottom: '1rem',
              }}
            >
              System Health
            </h3>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              {[
                {
                  name: 'API Server',
                  status: 'Operational',
                  color: ''#00a544'',
                },
                {
                  name: 'Database',
                  status: 'Operational',
                  color: ''#00a544'',
                },
                {
                  name: 'File Storage',
                  status: 'Operational',
                  color: ''#00a544'',
                },
                {
                  name: 'Email Service',
                  status: 'Operational',
                  color: ''#00a544'',
                },
              ].map((service, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.75rem',
                    backgroundColor: ''#f5f1e8'',
                    borderRadius: '0.375rem',
                  }}
                >
                  <span>{service.name}</span>
                  <span
                    style={{
                      padding: '0.25rem 0.75rem',
                      backgroundColor: service.color,
                      color: '#fff',
                      borderRadius: '9999px',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                    }}
                  >
                    {service.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div
        style={{
          backgroundColor: ''#4a3728'',
          color: '#fff',
          padding: '2rem',
          textAlign: 'center',
          marginTop: '4rem',
        }}
      >
        <p style={{ marginBottom: '0.5rem' }}>
          🔒 Elevate Brain - Internal Operations Hub
        </p>
        <p style={{ fontSize: '0.875rem', color: ''#8b7d6f'' }}>
          Authorized Personnel Only | © 2025 Elevate for Humanity
        </p>
      </div>
    </div>
  );
}

export default ElevateBrain;
