/**
 * INTELLIGENT ENROLLMENT INJECTOR
 *
 * This script intelligently injects enrollment programs into Durable.co sites
 * by understanding the DOM structure and finding the right injection point.
 */

(function () {
  'use strict';

  console.log('🎓 Enrollment Injector Loading...');

  // The enrollment HTML to inject - uses Durable's container and styling classes
  const enrollmentHTML = `
<div class="relative z-10 container mx-auto pt-12 lg:pt-20 pb-12 lg:pb-20">
  <div class="flex flex-col gap-6 max-w-4xl mx-auto">
    <h2 class="heading-large text-center" style="color:#000000">Enroll in Our Programs Today</h2>
    <p class="body-large text-center" style="color:#000000;max-width:800px;margin:0 auto">
      Transform your career with industry-leading training programs. Federal funding available for qualified applicants.
    </p>
    
    <div class="flex flex-wrap relative justify-start" style="margin-top:2rem">
      
      <!-- Barber Apprenticeship -->
      <div class="group w-full relative overflow-hidden">
        <div class="transition-all h-full">
          <div class="flex flex-col h-full">
            <div class="flex flex-col items-start py-6" style="color:#000000">
              <p class="heading-medium mb-4" style="color:currentColor">Barber Apprenticeship</p>
              <div class="body-small mb-4" style="color:currentColor;opacity:0.8">2,000 hours • State Licensure</div>
              <div class="rich-text-block mb-4" style="color:currentColor">
                Earn while you learn. Master fades, line-ups, braids, and business skills. Qualify for Indiana Barber Licensure.
              </div>
              <div style="background:#F2F0D9;padding:8px 12px;border-radius:6px;font-size:13px;margin-bottom:20px;display:inline-block;color:#4D4B37">
                💰 WRG • WIOA • Apprenticeship
              </div>
              <a href="/barber-apprenticeship" class="button w-full md:w-max" style="border-width:2px;border-style:solid;box-shadow:none">
                Learn More →
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Building Services Technician -->
      <div class="group w-full relative overflow-hidden">
        <div class="transition-all h-full">
          <div class="flex flex-col h-full">
            <div class="flex flex-col items-start py-6" style="color:#000000">
              <p class="heading-medium mb-4" style="color:currentColor">Building Services Technician</p>
              <div class="body-small mb-4" style="color:currentColor;opacity:0.8">Multi-Trade • OSHA-10</div>
              <div class="rich-text-block mb-4" style="color:currentColor">
                Cross-trained in electrical, HVAC, plumbing, welding, and construction. Prepare for facilities and maintenance roles.
              </div>
              <div style="background:#F2F0D9;padding:8px 12px;border-radius:6px;font-size:13px;margin-bottom:20px;display:inline-block;color:#4D4B37">
                💰 WRG • WIOA • Employer Partners
              </div>
              <a href="/programs" class="button w-full md:w-max" style="border-width:2px;border-style:solid;box-shadow:none">
                Learn More →
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <!-- CNA -->
      <div class="group w-full relative overflow-hidden">
        <div class="transition-all h-full">
          <div class="flex flex-col h-full">
            <div class="flex flex-col items-start py-6" style="color:#000000">
              <p class="heading-medium mb-4" style="color:currentColor">Certified Nursing Assistant</p>
              <div class="body-small mb-4" style="color:currentColor;opacity:0.8">Healthcare • CNA Certification</div>
              <div class="rich-text-block mb-4" style="color:currentColor">
                Launch your healthcare career. Learn patient care, safety protocols, and professional ethics.
              </div>
              <div style="background:#F2F0D9;padding:8px 12px;border-radius:6px;font-size:13px;margin-bottom:20px;display:inline-block;color:#4D4B37">
                💰 WIOA • WRG • Employer Partners
              </div>
              <a href="/programs" class="button w-full md:w-max" style="border-width:2px;border-style:solid;box-shadow:none">
                Learn More →
              </a>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    
    <div class="text-center" style="margin-top:2rem">
      <a href="/programs" class="button" style="border-width:2px;border-style:solid;box-shadow:none;display:inline-block">
        View All Programs →
      </a>
    </div>
  </div>
</div>
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
