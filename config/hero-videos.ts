/**
 * Hero Video Configuration
 *
 * Available hero videos in /public/videos/
 * Switch between different videos by changing the export
 */

export const heroVideos = {
  // Main homepage hero (recommended)
  home: '/videos/hero-home.mp4',

  // Alternative homepage options
  homeNew: '/videos/homepage-hero-new.mp4',
  elevateOverview: '/videos/elevate-overview-web.mp4',

  // With audio narration
  heroWithAudio: '/videos/hero-video-with-audio.mp4',
  elevateOverviewNarration: '/videos/elevate-overview-with-narration.mp4',

  // Program-specific heroes
  barber: '/videos/barber-hero-final.mp4',
  business: '/videos/business-hero-final.mp4',
  cdl: '/videos/cdl-hero.mp4',
  cna: '/videos/cna-hero.mp4',
  cpr: '/videos/cpr-hero.mp4',
  hvac: '/videos/hvac-hero-final.mp4',
  medicalAssistant: '/videos/medical-assistant-hero.mp4',
  buildingTech: '/videos/building-technician-hero.mp4',

  // Section-specific videos
  about: '/videos/about-section-video.mp4',
  aboutNarration: '/videos/about-section-video-with-narration.mp4',
  apply: '/videos/apply-section-video.mp4',
  applyNarration: '/videos/apply-section-video-with-narration.mp4',
  employer: '/videos/employer-section-video.mp4',
  employerNarration: '/videos/employer-section-video-with-narration.mp4',

  // Other pages
  directory: '/videos/directory-hero-video.mp4',
  gettingStarted: '/videos/getting-started-hero.mp4',
  ourImpact: '/videos/our-impact-hero.mp4',
  volunteer: '/videos/volunteer-hero.mp4',
  employerPartner: '/videos/employer-partner-hero.mp4',
  studentNewsletter: '/videos/student-newsletter-hero.mp4',
};

// Current homepage hero video
export const currentHomeHero = heroVideos.elevateOverview;

// Enable audio narration (set to true to unmute by default)
export const enableAudioNarration = false;

export default heroVideos;
