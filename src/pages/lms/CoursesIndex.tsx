import { Helmet } from 'react-helmet-async';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

const courses = [
  {
    id: 1,
    title: 'Milady Barber Apprenticeship',
    description: 'Complete barber training program with state certification',
    progress: 45,
    status: 'In Progress'
  },
  {
    id: 2,
    title: 'HVAC Fundamentals',
    description: 'Learn heating, ventilation, and air conditioning basics',
    progress: 0,
    status: 'Not Started'
  },
  {
    id: 3,
    title: 'CNA Certification',
    description: 'Certified Nursing Assistant training and certification',
    progress: 100,
    status: 'Completed'
  }
];

export default function CoursesIndex() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Helmet>
        <title>Courses | Elevate for Humanity</title>
      </Helmet>
      <Navigation />
      
      <main style={{ flex: 1, padding: 'var(--lw-space-8) var(--lw-space-4)', backgroundColor: 'var(--lw-gray-50)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ 
            fontSize: 'var(--lw-text-4xl)', 
            fontWeight: 'var(--lw-font-bold)',
            color: 'var(--lw-gray-900)',
            marginBottom: 'var(--lw-space-2)'
          }}>
            Available Courses
          </h1>
          <p style={{ 
            fontSize: 'var(--lw-text-lg)', 
            color: 'var(--lw-gray-600)',
            marginBottom: 'var(--lw-space-8)'
          }}>
            Explore our workforce training programs
          </p>
          
          <div style={{ display: 'grid', gap: 'var(--lw-space-6)', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))' }}>
            {courses.map(course => (
              <div key={course.id} className="lw-card">
                <div className="lw-card-header">
                  <h3 className="lw-card-title">{course.title}</h3>
                </div>
                <div style={{ padding: 'var(--lw-space-6)' }}>
                  <p style={{ color: 'var(--lw-gray-600)', marginBottom: 'var(--lw-space-4)' }}>
                    {course.description}
                  </p>
                  
                  {course.progress > 0 && (
                    <div style={{ marginBottom: 'var(--lw-space-4)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--lw-space-2)' }}>
                        <span style={{ fontSize: 'var(--lw-text-sm)', color: 'var(--lw-gray-600)' }}>Progress</span>
                        <span style={{ fontSize: 'var(--lw-text-sm)', fontWeight: 'var(--lw-font-semibold)', color: 'var(--lw-primary-600)' }}>
                          {course.progress}%
                        </span>
                      </div>
                      <div className="lw-progress">
                        <div className="lw-progress-bar" style={{ width: `${course.progress}%` }}></div>
                      </div>
                    </div>
                  )}
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className={`lw-badge ${
                      course.status === 'Completed' ? 'lw-badge-success' : 
                      course.status === 'In Progress' ? 'lw-badge-primary' : 
                      'lw-badge-warning'
                    }`}>
                      {course.status}
                    </span>
                    <button className={`lw-btn ${
                      course.status === 'Completed' ? 'lw-btn-secondary' : 'lw-btn-primary'
                    }`}>
                      {course.status === 'Completed' ? 'Review' : 
                       course.status === 'In Progress' ? 'Continue' : 'Start Course'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
