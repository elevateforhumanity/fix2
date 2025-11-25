/*
  Copyright (c) 2025 Elevate for Humanity
  Commercial License. No resale, sublicensing, or redistribution allowed.
  See LICENSE file for details.
  
  Admin Dashboard - Analytics and overview for platform administrators
*/

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Simple stat card component
function StatCard({ title, value, change, icon, color }: any) {
  return (
    <div style={{
      backgroundColor: 'white',
      padding: 24,
      borderRadius: 8,
      border: '1px solid #e5e7eb',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 8 }}>{title}</p>
          <p style={{ fontSize: 32, fontWeight: 700, color: '#111827' }}>{value}</p>
          <p style={{ fontSize: 14, color: change >= 0 ? '#10b981' : '#ef4444', marginTop: 4 }}>
            {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
          </p>
        </div>
        <div style={{ fontSize: 32 }}>{icon}</div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/dashboard');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      } else {
        setStats(getMockData());
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      setStats(getMockData());
    } finally {
      setIsLoading(false);
    }
  };

  const getMockData = () => ({
    overview: {
      totalUsers: { value: 12458, change: 12.5 },
      activeCourses: { value: 342, change: 8.3 },
      revenue: { value: 45230, change: 15.7 },
      supportTickets: { value: 23, change: -18.2 },
    },
  });

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  const data = stats || getMockData();

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: 32 }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32,
      }}>
        <h1 style={{ fontSize: 32, fontWeight: 700 }}>
          Admin Analytics Dashboard
        </h1>
        <button
          onClick={fetchDashboardData}
          style={{
            padding: '10px 20px',
            fontSize: 14,
            border: '1px solid #e5e7eb',
            borderRadius: 6,
            backgroundColor: 'white',
            cursor: 'pointer',
          }}
        >
          🔄 Refresh
        </button>
      </div>

      {/* Overview Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: 20,
        marginBottom: 40,
      }}>
        <StatCard
          title="Total Users"
          value={data.overview.totalUsers.value.toLocaleString()}
          change={data.overview.totalUsers.change}
          icon="👥"
          color="#3b82f6"
        />
        <StatCard
          title="Active Courses"
          value={data.overview.activeCourses.value.toLocaleString()}
          change={data.overview.activeCourses.change}
          icon="📚"
          color="#10b981"
        />
        <StatCard
          title="Revenue (MTD)"
          value={`$${data.overview.revenue.value.toLocaleString()}`}
          change={data.overview.revenue.change}
          icon="💰"
          color="#f59e0b"
        />
        <StatCard
          title="Support Tickets"
          value={data.overview.supportTickets.value.toLocaleString()}
          change={data.overview.supportTickets.change}
          icon="🎫"
          color="#ef4444"
        />
      </div>

      {/* Quick Actions */}
      <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 20 }}>
        Quick Actions
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 24,
      }}>
        <Link
          href="/admin/users"
          style={{
            backgroundColor: 'white',
            padding: 24,
            borderRadius: 8,
            border: '1px solid #e5e7eb',
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 12 }}>👥</div>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
            User Management
          </h3>
          <p style={{ fontSize: 14, color: '#6b7280' }}>
            Manage users, roles, and permissions
          </p>
        </Link>

        <Link
          href="/admin/courses"
          style={{
            backgroundColor: 'white',
            padding: 24,
            borderRadius: 8,
            border: '1px solid #e5e7eb',
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 12 }}>📚</div>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
            Course Management
          </h3>
          <p style={{ fontSize: 14, color: '#6b7280' }}>
            Review and manage all courses
          </p>
        </Link>

        <Link
          href="/admin/course-authoring"
          style={{
            backgroundColor: 'white',
            padding: 24,
            borderRadius: 8,
            border: '1px solid #10b981',
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 12 }}>✏️</div>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
            Course Authoring
          </h3>
          <p style={{ fontSize: 14, color: '#6b7280' }}>
            Create and edit course content
          </p>
        </Link>

        <Link
          href="/admin/analytics"
          style={{
            backgroundColor: 'white',
            padding: 24,
            borderRadius: 8,
            border: '1px solid #e5e7eb',
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 12 }}>📊</div>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
            Detailed Analytics
          </h3>
          <p style={{ fontSize: 14, color: '#6b7280' }}>
            View platform analytics and reports
          </p>
        </Link>

        <Link
          href="/admin/reports"
          style={{
            backgroundColor: 'white',
            padding: 24,
            borderRadius: 8,
            border: '1px solid #3b82f6',
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 12 }}>📈</div>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
            Workforce Reports
          </h3>
          <p style={{ fontSize: 14, color: '#6b7280' }}>
            WIOA, WRG, JRI caseload reports
          </p>
        </Link>

        <Link
          href="/admin/settings"
          style={{
            backgroundColor: 'white',
            padding: 24,
            borderRadius: 8,
            border: '1px solid #e5e7eb',
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 12 }}>⚙️</div>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
            Platform Settings
          </h3>
          <p style={{ fontSize: 14, color: '#6b7280' }}>
            Configure platform settings
          </p>
        </Link>
      </div>
    </div>
  );
}
