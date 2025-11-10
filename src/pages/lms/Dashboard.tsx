import { Helmet } from 'react-helmet-async';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

export default function Dashboard() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Helmet>
        <title>Dashboard | Elevate for Humanity</title>
      </Helmet>
      <Navigation />
      
      <main style={{ flex: 1, padding: 'var(--lw-space-8) var(--lw-space-4)', backgroundColor: 'var(--lw-gray-50)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ 
            fontSize: 'var(--lw-text-4xl)', 
            fontWeight: 'var(--lw-font-bold)',
            color: 'var(--lw-gray-900)',
            marginBottom: 'var(--lw-space-8)'
          }}>
            Student Dashboard
          </h1>
          
          <div style={{ display: 'grid', gap: 'var(--lw-space-6)', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {/* Progress Card */}
            <div className="lw-card">
              <div className="lw-card-header">
                <h3 className="lw-card-title">My Progress</h3>
              </div>
              <div style={{ padding: 'var(--lw-space-6)' }}>
                <div className="lw-progress" style={{ marginBottom: 'var(--lw-space-4)' }}>
                  <div className="lw-progress-bar" style={{ width: '65%' }}></div>
                </div>
                <p style={{ color: 'var(--lw-gray-600)', fontSize: 'var(--lw-text-sm)' }}>
                  65% Complete
                </p>
              </div>
            </div>

            {/* Courses Card */}
            <div className="lw-card">
              <div className="lw-card-header">
                <h3 className="lw-card-title">My Courses</h3>
              </div>
              <div style={{ padding: 'var(--lw-space-6)' }}>
                <p style={{ color: 'var(--lw-gray-600)', marginBottom: 'var(--lw-space-4)' }}>
                  3 Active Courses
                </p>
                <button className="lw-btn lw-btn-primary">
                  View All Courses
                </button>
              </div>
            </div>

            {/* Achievements Card */}
            <div className="lw-card">
              <div className="lw-card-header">
                <h3 className="lw-card-title">Achievements</h3>
              </div>
              <div style={{ padding: 'var(--lw-space-6)' }}>
                <div style={{ display: 'flex', gap: 'var(--lw-space-2)', flexWrap: 'wrap' }}>
                  <span className="lw-badge lw-badge-success">Completed 5 Lessons</span>
                  <span className="lw-badge lw-badge-primary">Quiz Master</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lw-card" style={{ marginTop: 'var(--lw-space-8)' }}>
            <div className="lw-card-header">
              <h3 className="lw-card-title">Recent Activity</h3>
            </div>
            <div style={{ padding: 'var(--lw-space-6)' }}>
              <p style={{ color: 'var(--lw-gray-600)' }}>
                Your recent learning activity will appear here.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
