/**
 * INTELLIGENT ENROLLMENT INJECTOR
 *
 * This script intelligently injects enrollment programs into Durable.co sites
 * by understanding the DOM structure and finding the right injection point.
 */

(function () {
  'use strict';

  console.log('🎓 Enrollment Injector Loading...');

  // The enrollment HTML to inject
  const enrollmentHTML = `
<section style="margin-top: 48px; background: linear-gradient(135deg, #0ea5e9 0%, #7c3aed 100%); padding: 48px 24px; border-radius: 16px; color: #fff; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 1200px; margin: 0 auto;">
    <h2 style="font-size: 32px; margin-bottom: 16px; font-weight: 700; text-align: center;">
      🎓 Enroll in Our Programs Today
    </h2>
    <p style="font-size: 18px; margin-bottom: 48px; opacity: 0.95; text-align: center; max-width: 800px; margin-left: auto; margin-right: auto;">
      Transform your career with industry-leading training programs. Federal funding available for qualified applicants.
    </p>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; margin-bottom: 48px;">
      
      <!-- Barber Apprenticeship -->
      <div style="background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); padding: 32px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.2);">
        <h3 style="font-size: 24px; margin-bottom: 12px; font-weight: 600;">Barber Apprenticeship</h3>
        <div style="font-size: 14px; opacity: 0.9; margin-bottom: 16px; font-weight: 500;">2,000 hours • State Licensure</div>
        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px; opacity: 0.95;">
          Earn while you learn. Master fades, line-ups, braids, and business skills. Qualify for Indiana Barber Licensure.
        </p>
        <div style="background: rgba(255,255,255,0.2); padding: 8px 12px; border-radius: 6px; font-size: 13px; margin-bottom: 20px; display: inline-block;">
          💰 WRG • WIOA • Apprenticeship
        </div>
        <a href="/programs/barber" style="display: block; width: 100%; background: #fff; color: #0ea5e9; padding: 14px 28px; border-radius: 8px; text-align: center; text-decoration: none; font-size: 16px; font-weight: 600;">
          Learn More →
        </a>
      </div>
      
      <!-- Building Services Technician -->
      <div style="background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); padding: 32px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.2);">
        <h3 style="font-size: 24px; margin-bottom: 12px; font-weight: 600;">Building Services Technician</h3>
        <div style="font-size: 14px; opacity: 0.9; margin-bottom: 16px; font-weight: 500;">Multi-Trade • OSHA-10</div>
        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px; opacity: 0.95;">
          Cross-trained in electrical, HVAC, plumbing, welding, and construction. Prepare for facilities and maintenance roles.
        </p>
        <div style="background: rgba(255,255,255,0.2); padding: 8px 12px; border-radius: 6px; font-size: 13px; margin-bottom: 20px; display: inline-block;">
          💰 WRG • WIOA • Employer Partners
        </div>
        <a href="/programs/building-tech" style="display: block; width: 100%; background: #fff; color: #0ea5e9; padding: 14px 28px; border-radius: 8px; text-align: center; text-decoration: none; font-size: 16px; font-weight: 600;">
          Learn More →
        </a>
      </div>
      
      <!-- CNA -->
      <div style="background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); padding: 32px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.2);">
        <h3 style="font-size: 24px; margin-bottom: 12px; font-weight: 600;">Certified Nursing Assistant</h3>
        <div style="font-size: 14px; opacity: 0.9; margin-bottom: 16px; font-weight: 500;">Healthcare • CNA Certification</div>
        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px; opacity: 0.95;">
          Launch your healthcare career. Learn patient care, safety protocols, and professional ethics.
        </p>
        <div style="background: rgba(255,255,255,0.2); padding: 8px 12px; border-radius: 6px; font-size: 13px; margin-bottom: 20px; display: inline-block;">
          💰 WIOA • WRG • Employer Partners
        </div>
        <a href="/programs/cna" style="display: block; width: 100%; background: #fff; color: #0ea5e9; padding: 14px 28px; border-radius: 8px; text-align: center; text-decoration: none; font-size: 16px; font-weight: 600;">
          Learn More →
        </a>
      </div>
      
    </div>
    
    <div style="text-align: center;">
      <a href="/programs" style="display: inline-block; background: rgba(255,255,255,0.2); color: #fff; padding: 16px 40px; border-radius: 8px; text-decoration: none; font-size: 18px; font-weight: 600; border: 2px solid rgba(255,255,255,0.3);">
        View All 9 Programs →
      </a>
    </div>
  </div>
</section>
`;

  // Wait for DOM to be ready
  function waitForDOM() {
    return new Promise((resolve) => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', resolve);
      } else {
        resolve();
      }
    });
  }

  // Find the best injection point
  function findInjectionPoint() {
    // Strategy 1: Look for sections
    const sections = document.querySelectorAll('section');
    if (sections.length > 1) {
      // Inject after the first section (usually hero)
      return { element: sections[0], position: 'afterend' };
    }

    // Strategy 2: Look for main content area
    const main =
      document.querySelector('main') ||
      document.querySelector('[role="main"]') ||
      document.querySelector('#main-body');
    if (main && main.children.length > 0) {
      return { element: main.children[0], position: 'afterend' };
    }

    // Strategy 3: Look for body
    if (document.body && document.body.children.length > 0) {
      return { element: document.body.children[0], position: 'afterend' };
    }

    return null;
  }

  // Inject the enrollment section
  async function inject() {
    await waitForDOM();

    // Check if already injected
    if (document.querySelector('[data-enrollment-injected]')) {
      console.log('✅ Enrollment section already present');
      return;
    }

    // Wait a bit for Durable's React to finish rendering
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const injectionPoint = findInjectionPoint();
    if (!injectionPoint) {
      console.error('❌ Could not find injection point');
      return;
    }

    // Create container
    const container = document.createElement('div');
    container.setAttribute('data-enrollment-injected', 'true');
    container.innerHTML = enrollmentHTML;

    // Inject
    injectionPoint.element.insertAdjacentElement(
      injectionPoint.position,
      container
    );

    console.log('✅ Enrollment programs injected successfully!');
  }

  // Run injection
  inject().catch((err) => {
    console.error('❌ Injection failed:', err);
  });
})();
