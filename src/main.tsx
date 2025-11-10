import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles/design-system.css'
function App(){
  return (
    <main style={{padding:'2rem'}}>
      <div className="card shadow-soft" style={{maxWidth:1100,margin:'0 auto'}}>
        <img src="/assets/banner-feature.svg" alt="EFH banner" style={{width:'100%',borderRadius:'16px'}}/>
        <h1 style={{margin:'1rem 0 0 0'}}>Elevate for Humanity</h1>
        <p style={{color:'var(--efh-muted)'}}>Government-ready workforce LMS • Apprenticeships • Certifications</p>
        <div style={{display:'flex',gap:'1rem',flexWrap:'wrap',marginTop:'1rem'}}>
          <a className="button" href="/lms">Enter LMS</a>
          <a className="button" style={{background:'var(--efh-blue)'}} href="/courses">Browse Courses</a>
        </div>
      </div>
    </main>
  )
}
createRoot(document.getElementById('root')!).render(<App/>)
