/**
 * CLOUDFLARE WORKER: ENROLLMENT INJECTOR
 *
 * This worker intercepts ALL requests to elevateforhumanity.org
 * and intelligently injects the enrollment programs section.
 *
 * DEPLOYMENT: This runs at the CDN edge, before Durable.co even sees the request.
 * AUTOPILOT: Fully autonomous - no manual intervention required.
 * VERSION: 1.0.0 - Production deployment
 */

const ENROLLMENT_HTML = `
<section data-injected-by="cloudflare-worker" style="margin-top: 48px; background: linear-gradient(135deg, #0ea5e9 0%, #7c3aed 100%); padding: 48px 24px; border-radius: 16px; color: #fff; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 1200px; margin: 0 auto;">
    <h2 style="font-size: 32px; margin-bottom: 16px; font-weight: 700; text-align: center;">
      🎓 Enroll in Our Programs Today
    </h2>
    <p style="font-size: 18px; margin-bottom: 48px; opacity: 0.95; text-align: center; max-width: 800px; margin-left: auto; margin-right: auto;">
      Transform your career with industry-leading training programs. Federal funding available for qualified applicants.
    </p>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; margin-bottom: 48px;">
      
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

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    // Only intercept HTML pages (not API calls, images, etc.)
    if (
      !url.pathname.startsWith('/api/') &&
      !url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf)$/)
    ) {
      // Fetch the original response from Durable.co
      const response = await fetch(request);

      // Only modify HTML responses
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('text/html')) {
        // Get the HTML
        let html = await response.text();

        // Check if already injected
        if (html.includes('data-injected-by="cloudflare-worker"')) {
          return new Response(html, response);
        }

        // Find injection point - after first </section> tag
        const firstSectionEnd = html.indexOf('</section>');
        if (firstSectionEnd !== -1) {
          // Inject after first section
          html =
            html.slice(0, firstSectionEnd + 10) +
            '\n' +
            ENROLLMENT_HTML +
            '\n' +
            html.slice(firstSectionEnd + 10);
        } else {
          // Fallback: inject before </body>
          html = html.replace('</body>', ENROLLMENT_HTML + '\n</body>');
        }

        // Return modified HTML
        return new Response(html, {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
        });
      }
    }

    // Pass through everything else unchanged
    return fetch(request);
  },
};
