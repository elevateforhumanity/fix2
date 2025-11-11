import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/hero-banner.css';

interface HeroBannerProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  primaryCTA?: {
    text: string;
    link: string;
  };
  secondaryCTA?: {
    text: string;
    link: string;
  };
  badges?: string[];
  stats?: {
    value: string;
    label: string;
  }[];
  overlay?: 'light' | 'dark' | 'gradient';
  height?: 'small' | 'medium' | 'large' | 'full';
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  title,
  subtitle,
  backgroundImage,
  primaryCTA,
  secondaryCTA,
  badges,
  stats,
  overlay = 'gradient',
  height = 'large'
}) => {
  const overlayStyles = {
    light: 'rgba(255, 255, 255, 0.85)',
    dark: 'rgba(0, 0, 0, 0.6)',
    gradient: 'linear-gradient(135deg, rgba(228, 30, 38, 0.9) 0%, rgba(249, 115, 22, 0.85) 100%)'
  };

  const heightClasses = {
    small: 'hero-banner--small',
    medium: 'hero-banner--medium',
    large: 'hero-banner--large',
    full: 'hero-banner--full'
  };

  return (
    <section 
      className={`hero-banner ${heightClasses[height]}`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}
    >
      {/* Overlay */}
      <div 
        className="hero-banner__overlay"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: overlayStyles[overlay],
          zIndex: 1
        }}
      />

      {/* Content */}
      <div className="hero-banner__content">
        <div className="hero-banner__inner">
          {/* Title */}
          <h1 className="hero-banner__title">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="hero-banner__subtitle">
            {subtitle}
          </p>

          {/* Badges */}
          {badges && badges.length > 0 && (
            <div className="hero-banner__badges">
              {badges.map((badge, index) => (
                <span key={index} className="hero-banner__badge">
                  {badge}
                </span>
              ))}
            </div>
          )}

          {/* CTAs */}
          {(primaryCTA || secondaryCTA) && (
            <div className="hero-banner__ctas">
              {primaryCTA && (
                <Link 
                  to={primaryCTA.link} 
                  className="hero-banner__cta hero-banner__cta--primary"
                >
                  {primaryCTA.text}
                </Link>
              )}
              {secondaryCTA && (
                <Link 
                  to={secondaryCTA.link} 
                  className="hero-banner__cta hero-banner__cta--secondary"
                >
                  {secondaryCTA.text}
                </Link>
              )}
            </div>
          )}

          {/* Stats */}
          {stats && stats.length > 0 && (
            <div className="hero-banner__stats">
              {stats.map((stat, index) => (
                <div key={index} className="hero-banner__stat">
                  <div className="hero-banner__stat-value">{stat.value}</div>
                  <div className="hero-banner__stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="hero-banner__decoration hero-banner__decoration--1" />
      <div className="hero-banner__decoration hero-banner__decoration--2" />
    </section>
  );
};

export default HeroBanner;
