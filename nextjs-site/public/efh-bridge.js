/**
 * EFH Bridge Script - Durable Content Injector
 * Version: 1.1.0
 *
 * Injects dynamic content into Durable.co pages via data-efh-slot attributes
 *
 * Usage in Durable:
 * <script src="https://elevateforhumanity.github.io/fix2/efh-bridge.js"
 *         data-efh-org="elevate-for-humanity"
 *         data-env="prod"
 *         defer></script>
 *
 * Add slots: <div data-efh-slot="hero"></div>
 *
 * The script automatically detects its source URL and loads config from the same location.
 */

(async () => {
  'use strict';

  // Get configuration from script attributes
  const currentScript = document.currentScript;
  const ORG = currentScript?.getAttribute('data-efh-org') || 'efh';
  const ENV = currentScript?.getAttribute('data-env') || 'prod';

  // Determine BASE_URL from script source - auto-detect deployment location
  const scriptSrc = currentScript?.src || '';
  let BASE_URL;

  if (scriptSrc.includes('github.io')) {
    // GitHub Pages deployment
    BASE_URL = 'https://elevateforhumanity.github.io/fix2';
  } else if (scriptSrc.includes('netlify.app')) {
    // Netlify deployment - extract base URL from script source
    const url = new URL(scriptSrc);
    BASE_URL = `${url.protocol}//${url.host}`;
  } else if (currentScript?.getAttribute('data-base-url')) {
    // Manual override via attribute
    BASE_URL = currentScript.getAttribute('data-base-url');
  } else {
    // Default fallback
    BASE_URL = 'https://elevateforhumanity.github.io/fix2';
  }

  // Configuration endpoint
  const configUrl = `${BASE_URL}/api/efh-config.json?org=${ORG}&env=${ENV}&t=${Date.now()}`;

  console.log('[EFH Bridge] Initializing...', { org: ORG, env: ENV });

  // Fetch configuration
  let config;
  try {
    const response = await fetch(configUrl);
    if (!response.ok) {
      throw new Error(`Config fetch failed: ${response.status}`);
    }
    config = await response.json();
    console.log('[EFH Bridge] Config loaded:', config);
  } catch (error) {
    console.error('[EFH Bridge] Failed to load config:', error);
    return;
  }

  // Helper to find slot elements
  const getSlot = (slotName) =>
    document.querySelector(`[data-efh-slot="${slotName}"]`);

  // Sanitize HTML to prevent XSS
  const sanitize = (str) => {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  };

  // Inject Hero Section
  if (config.hero && getSlot('hero')) {
    const heroSlot = getSlot('hero');
    heroSlot.innerHTML = `
      <div style="
        padding: 48px 24px;
        border-radius: 16px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: #fff;
        text-align: center;
        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
      ">
        <h1 style="
          font-size: 3rem;
          font-weight: 800;
          margin: 0 0 16px 0;
          line-height: 1.2;
        ">${sanitize(config.hero.title)}</h1>
        <p style="
          font-size: 1.25rem;
          margin: 0 0 32px 0;
          opacity: 0.95;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        ">${sanitize(config.hero.subtitle)}</p>
        <a href="${sanitize(config.hero.ctaUrl)}" style="
          display: inline-block;
          padding: 14px 32px;
          background: #ff7a00;
          color: #fff;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.1rem;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 12px rgba(255, 122, 0, 0.4);
        " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(255, 122, 0, 0.5)';" 
           onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(255, 122, 0, 0.4)';">
          ${sanitize(config.hero.ctaLabel)}
        </a>
      </div>
    `;
    console.log('[EFH Bridge] Hero section injected');
  }

  // Inject Programs Grid
  if (
    Array.isArray(config.programs) &&
    config.programs.length > 0 &&
    getSlot('programs')
  ) {
    const programsSlot = getSlot('programs');
    programsSlot.innerHTML = `
      <div style="
        display: grid;
        gap: 24px;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        padding: 24px 0;
      ">
        ${config.programs
          .map(
            (program) => `
          <div style="
            border: 2px solid #e5e7eb;
            border-radius: 16px;
            padding: 24px;
            background: #fff;
            transition: all 0.3s;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          " onmouseover="this.style.borderColor='#667eea'; this.style.boxShadow='0 8px 24px rgba(102, 126, 234, 0.15)'; this.style.transform='translateY(-4px)';" 
             onmouseout="this.style.borderColor='#e5e7eb'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.05)'; this.style.transform='translateY(0)';">
            <h3 style="
              font-size: 1.5rem;
              font-weight: 700;
              margin: 0 0 12px 0;
              color: #1f2937;
            ">${sanitize(program.name)}</h3>
            <p style="
              color: #6b7280;
              margin: 0 0 16px 0;
              line-height: 1.6;
            ">${sanitize(program.summary || '')}</p>
            <a href="${sanitize(program.url)}" style="
              color: #667eea;
              text-decoration: none;
              font-weight: 600;
              display: inline-flex;
              align-items: center;
              gap: 4px;
            " onmouseover="this.style.color='#764ba2';" onmouseout="this.style.color='#667eea';">
              Learn more 
              <span style="transition: transform 0.2s;" onmouseover="this.style.transform='translateX(4px)';" onmouseout="this.style.transform='translateX(0)';">→</span>
            </a>
          </div>
        `
          )
          .join('')}
      </div>
    `;
    console.log('[EFH Bridge] Programs grid injected');
  }

  // Inject Features Section
  if (
    Array.isArray(config.features) &&
    config.features.length > 0 &&
    getSlot('features')
  ) {
    const featuresSlot = getSlot('features');
    featuresSlot.innerHTML = `
      <div style="
        display: grid;
        gap: 32px;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        padding: 24px 0;
      ">
        ${config.features
          .map(
            (feature) => `
          <div style="text-align: center; padding: 24px;">
            <div style="
              font-size: 3rem;
              margin-bottom: 16px;
            ">${feature.icon || '✨'}</div>
            <h3 style="
              font-size: 1.25rem;
              font-weight: 700;
              margin: 0 0 12px 0;
              color: #1f2937;
            ">${sanitize(feature.title)}</h3>
            <p style="
              color: #6b7280;
              margin: 0;
              line-height: 1.6;
            ">${sanitize(feature.description)}</p>
          </div>
        `
          )
          .join('')}
      </div>
    `;
    console.log('[EFH Bridge] Features section injected');
  }

  // Inject Testimonials
  if (
    Array.isArray(config.testimonials) &&
    config.testimonials.length > 0 &&
    getSlot('testimonials')
  ) {
    const testimonialsSlot = getSlot('testimonials');
    testimonialsSlot.innerHTML = `
      <div style="
        display: grid;
        gap: 24px;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        padding: 24px 0;
      ">
        ${config.testimonials
          .map(
            (testimonial) => `
          <blockquote style="
            border-left: 4px solid #667eea;
            padding: 24px;
            background: #f9fafb;
            border-radius: 8px;
            margin: 0;
          ">
            <p style="
              font-style: italic;
              color: #374151;
              margin: 0 0 16px 0;
              line-height: 1.6;
              font-size: 1.1rem;
            ">"${sanitize(testimonial.quote)}"</p>
            <cite style="
              font-style: normal;
              color: #6b7280;
              font-weight: 600;
            ">— ${sanitize(testimonial.author)}</cite>
          </blockquote>
        `
          )
          .join('')}
      </div>
    `;
    console.log('[EFH Bridge] Testimonials section injected');
  }

  // Inject CTA Section
  if (config.cta && getSlot('cta')) {
    const ctaSlot = getSlot('cta');
    ctaSlot.innerHTML = `
      <div style="
        padding: 48px 24px;
        border-radius: 16px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: #fff;
        text-align: center;
        margin: 48px 0;
      ">
        <h2 style="
          font-size: 2.5rem;
          font-weight: 800;
          margin: 0 0 16px 0;
        ">${sanitize(config.cta.title)}</h2>
        <p style="
          font-size: 1.25rem;
          margin: 0 0 32px 0;
          opacity: 0.95;
        ">${sanitize(config.cta.subtitle)}</p>
        <a href="${sanitize(config.cta.url)}" style="
          display: inline-block;
          padding: 14px 32px;
          background: #fff;
          color: #667eea;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.1rem;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(0, 0, 0, 0.3)';" 
           onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(0, 0, 0, 0.2)';">
          ${sanitize(config.cta.label)}
        </a>
      </div>
    `;
    console.log('[EFH Bridge] CTA section injected');
  }

  console.log('[EFH Bridge] Initialization complete ✅');
})();
// Updated Sat Nov  1 10:35:01 UTC 2025
