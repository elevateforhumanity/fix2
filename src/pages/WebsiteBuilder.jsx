/*
  Copyright (c) 2025 Elevate for Humanity
  Commercial License. No resale, sublicensing, or redistribution allowed.
  See LICENSE file for details.
*/
import React, { useState, useEffect } from 'react';
import AppLayout from '../layouts/AppLayout';
import AIPageBuilder from '../components/AIPageBuilder';
import AdvancedLMSFeatures from '../lms/advanced-lms-features';
import { supabase } from '../lib/supabase';

export default function WebsiteBuilder() {
  const [lmsFeatures, setLmsFeatures] = useState(null);
  const [activeTab, setActiveTab] = useState('ai-builder');
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeLMS();
    loadWebsites();
  }, []);

  async function initializeLMS() {
    try {
      const features = new AdvancedLMSFeatures();
      setLmsFeatures(features);
    } catch (error) {
      console.error('Failed to initialize LMS features:', error);
    }
  }

  async function loadWebsites() {
    try {
      const { data, error } = await supabase
        .from('school_websites')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setWebsites(data);
      }
    } catch (error) {
      console.error('Failed to load websites:', error);
    } finally {
      setLoading(false);
    }
  }

  async function createAIWebsite(config) {
    if (!lmsFeatures) {
      alert('LMS features not initialized');
      return;
    }

    try {
      setLoading(true);
      const website = await lmsFeatures.createAIWebsiteBuilder(config);
      await loadWebsites();
      alert('Website created successfully!');
      return website;
    } catch (error) {
      console.error('Failed to create website:', error);
      alert('Failed to create website: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppLayout>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16 }}>
          AI Website Builder
        </h1>
        <p
          style={{
            fontSize: 16,
            color: 'var(--brand-text-muted)',
            marginBottom: 32,
          }}
        >
          Create professional learning websites with AI-powered design and
          content generation.
        </p>
        {/* Tabs */}
        <div
          style={{
            display: 'flex',
            gap: 16,
            marginBottom: 32,
            borderBottom: '2px solid var(--brand-border)',
          }}
        >
          <button
            onClick={() => setActiveTab('ai-builder')}
            style={{
              padding: '12px 24px',
              background:
                activeTab === 'ai-builder'
                  ? 'var(--brand-primary)'
                  : 'transparent',
              color: activeTab === 'ai-builder' ? '#fff' : 'var(--brand-text)',
              border: 'none',
              borderRadius: '8px 8px 0 0',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            AI Page Builder
          </button>
          <button
            onClick={() => setActiveTab('my-websites')}
            style={{
              padding: '12px 24px',
              background:
                activeTab === 'my-websites'
                  ? 'var(--brand-primary)'
                  : 'transparent',
              color: activeTab === 'my-websites' ? '#fff' : 'var(--brand-text)',
              border: 'none',
              borderRadius: '8px 8px 0 0',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            My Websites ({websites.length})
          </button>
          <button
            onClick={() => setActiveTab('enterprise')}
            style={{
              padding: '12px 24px',
              background:
                activeTab === 'enterprise'
                  ? 'var(--brand-primary)'
                  : 'transparent',
              color: activeTab === 'enterprise' ? '#fff' : 'var(--brand-text)',
              border: 'none',
              borderRadius: '8px 8px 0 0',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            Enterprise Builder
          </button>
        </div>
        {/* Content */}
        {activeTab === 'ai-builder' && (
          <div>
            <AIPageBuilder />
          </div>
        )}
        {activeTab === 'my-websites' && (
          <div>
            {loading ? (
              <p>Loading websites...</p>
            ) : websites.length === 0 ? (
              <div
                style={{
                  backgroundColor: '#fff',
                  padding: 48,
                  borderRadius: 8,
                  border: '1px solid var(--brand-border)',
                  textAlign: 'center',
                }}
              >
                <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>
                  No websites yet
                </h3>
                <p
                  style={{ color: 'var(--brand-text-muted)', marginBottom: 24 }}
                >
                  Create your first AI-powered website using the AI Page Builder
                  tab.
                </p>
                <button
                  onClick={() => setActiveTab('ai-builder')}
                  style={{
                    padding: '12px 24px',
                    background: 'var(--brand-primary)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: 16,
                  }}
                >
                  Get Started
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: 24,
                }}
              >
                {websites.map((website) => (
                  <div
                    key={website.id}
                    style={{
                      backgroundColor: '#fff',
                      padding: 24,
                      borderRadius: 8,
                      border: '1px solid var(--brand-border)',
                    }}
                  >
                    <h3
                      style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}
                    >
                      {website.design?.schoolName || 'Untitled Website'}
                    </h3>
                    <p
                      style={{
                        fontSize: 14,
                        color: 'var(--brand-text-muted)',
                        marginBottom: 16,
                      }}
                    >
                      {website.domain || 'No domain set'}
                    </p>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        style={{
                          flex: 1,
                          padding: '8px 16px',
                          background: 'var(--brand-primary)',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 6,
                          cursor: 'pointer',
                          fontSize: 14,
                        }}
                      >
                        Edit
                      </button>
                      <button
                        style={{
                          flex: 1,
                          padding: '8px 16px',
                          background: 'transparent',
                          color: 'var(--brand-primary)',
                          border: '1px solid var(--brand-primary)',
                          borderRadius: 6,
                          cursor: 'pointer',
                          fontSize: 14,
                        }}
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {activeTab === 'enterprise' && (
          <div
            style={{
              backgroundColor: '#fff',
              padding: 48,
              borderRadius: 8,
              border: '1px solid var(--brand-border)',
            }}
          >
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
              Enterprise Website Builder
            </h2>
            <p
              style={{
                fontSize: 16,
                color: 'var(--brand-text-muted)',
                marginBottom: 32,
              }}
            >
              Create complete learning websites with AI-powered design, content
              generation, and advanced features.
            </p>
            <div style={{ display: 'grid', gap: 24 }}>
              <div>
                <label
                  style={{ display: 'block', fontWeight: 600, marginBottom: 8 }}
                >
                  School Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your school or organization name"
                  style={{
                    width: '100%',
                    padding: 12,
                    border: '1px solid var(--brand-border)',
                    borderRadius: 6,
                    fontSize: 16,
                  }}
                />
              </div>
              <div>
                <label
                  style={{ display: 'block', fontWeight: 600, marginBottom: 8 }}
                >
                  School Type
                </label>
                <select
                  style={{
                    width: '100%',
                    padding: 12,
                    border: '1px solid var(--brand-border)',
                    borderRadius: 6,
                    fontSize: 16,
                  }}
                >
                  <option value="">Select type...</option>
                  <option value="university">University</option>
                  <option value="college">College</option>
                  <option value="k12">K-12 School</option>
                  <option value="training">Training Center</option>
                  <option value="corporate">Corporate Training</option>
                  <option value="nonprofit">Nonprofit</option>
                </select>
              </div>
              <div>
                <label
                  style={{ display: 'block', fontWeight: 600, marginBottom: 8 }}
                >
                  Target Audience
                </label>
                <input
                  type="text"
                  placeholder="e.g., Working professionals, Students, Job seekers"
                  style={{
                    width: '100%',
                    padding: 12,
                    border: '1px solid var(--brand-border)',
                    borderRadius: 6,
                    fontSize: 16,
                  }}
                />
              </div>
              <div>
                <label
                  style={{ display: 'block', fontWeight: 600, marginBottom: 8 }}
                >
                  Brand Colors
                </label>
                <input
                  type="text"
                  placeholder="e.g., #3B82F6, #10B981"
                  style={{
                    width: '100%',
                    padding: 12,
                    border: '1px solid var(--brand-border)',
                    borderRadius: 6,
                    fontSize: 16,
                  }}
                />
              </div>
              <div>
                <label
                  style={{ display: 'block', fontWeight: 600, marginBottom: 8 }}
                >
                  Industry
                </label>
                <input
                  type="text"
                  placeholder="e.g., Technology, Healthcare, Finance"
                  style={{
                    width: '100%',
                    padding: 12,
                    border: '1px solid var(--brand-border)',
                    borderRadius: 6,
                    fontSize: 16,
                  }}
                />
              </div>
              <button
                disabled={loading}
                style={{
                  padding: '16px 32px',
                  background: loading ? '#ccc' : 'var(--brand-primary)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontWeight: 600,
                  fontSize: 18,
                }}
              >
                {loading ? 'Generating Website...' : 'Generate AI Website'}
              </button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
