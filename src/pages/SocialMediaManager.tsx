/**
 * Social Media Manager Dashboard
 * Manage and automate social media posts via Zapier
 */

import { useState, useEffect } from 'react';
import AppLayout from '../layouts/AppLayout.jsx';
import {
  zapierSocial,
  postToSocialMedia,
  announceProgram,
  shareSuccessStory,
  announceEvent,
  postMotivation,
  announcePartnership,
} from '../integrations/zapier-social-automation';

export default function SocialMediaManager() {
  const [activeTab, setActiveTab] = useState<'post' | 'templates' | 'status'>(
    'post'
  );
  const [content, setContent] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([
    'facebook',
    'linkedin',
    'youtube',
  ]);
  const [scheduledTime, setScheduledTime] = useState('');
  const [posting, setPosting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [configStatus, setConfigStatus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    loadConfigStatus();
  }, []);

  function loadConfigStatus() {
    const status = zapierSocial.getConfigurationStatus();
    setConfigStatus(status);
  }

  async function handlePost() {
    if (!content.trim()) {
      alert('Please enter content to post');
      return;
    }

    setPosting(true);
    setResult(null);

    try {
      const platforms = selectedPlatforms as (
        | 'facebook'
        | 'linkedin'
        | 'youtube'
      )[];
      const response = await postToSocialMedia(content, {
        platforms,
        mediaUrl: mediaUrl || undefined,
        scheduledTime: scheduledTime || undefined,
      });

      setResult(response);

      // Clear form on success
      if (Object.values(response).every((r) => r.success)) {
        setContent('');
        setMediaUrl('');
        setScheduledTime('');
      }
    } catch (error) {
      console.error('Failed to post:', error);
      alert('Failed to post to social media');
    } finally {
      setPosting(false);
    }
  }

  async function handleTemplatePost(type: string) {
    setPosting(true);
    setResult(null);

    try {
      let response;

      switch (type) {
        case 'program':
          response = await announceProgram({
            name: 'Sample Program',
            description: 'This is a sample program announcement',
            enrollmentUrl: 'https://elevateforhumanity.org/programs',
          });
          break;

        case 'success':
          response = await shareSuccessStory({
            studentName: 'John Doe',
            programName: 'IT Certification',
            achievement:
              'Successfully completed the program and secured a job!',
          });
          break;

        case 'event':
          response = await announceEvent({
            name: 'Open House',
            date: new Date(
              Date.now() + 7 * 24 * 60 * 60 * 1000
            ).toLocaleDateString(),
            description:
              'Join us for an open house to learn about our programs!',
            registrationUrl: 'https://elevateforhumanity.org/events',
          });
          break;

        case 'motivation':
          response = await postMotivation(
            'The only way to do great work is to love what you do.',
            'Steve Jobs'
          );
          break;

        case 'partnership':
          response = await announcePartnership({
            name: 'Sample Partner',
            description: 'We are excited to partner with this organization!',
            websiteUrl: 'https://example.com',
          });
          break;

        default:
          return;
      }

      setResult(response);
    } catch (error) {
      console.error('Failed to post template:', error);
      alert('Failed to post template');
    } finally {
      setPosting(false);
    }
  }

  function togglePlatform(platform: string) {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  }

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brand-text">
            Social Media Manager
          </h1>
          <p className="mt-2 text-brand-text-muted">
            Automate social media posts via Zapier integration
          </p>
        </div>
        {/* Tabs */}
        <div className="border-b border-brand-border mb-6">
          <nav role="navigation" className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('post')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'post'
                  ? 'border-blue-500 text-brand-info'
                  : 'border-transparent text-brand-text-light hover:text-brand-text hover:border-brand-border-dark'
              }`}
            >
              Create Post
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'templates'
                  ? 'border-blue-500 text-brand-info'
                  : 'border-transparent text-brand-text-light hover:text-brand-text hover:border-brand-border-dark'
              }`}
            >
              Templates
            </button>
            <button
              onClick={() => setActiveTab('status')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'status'
                  ? 'border-blue-500 text-brand-info'
                  : 'border-transparent text-brand-text-light hover:text-brand-text hover:border-brand-border-dark'
              }`}
            >
              Configuration
            </button>
          </nav>
        </div>
        {/* Create Post Tab */}
        {activeTab === 'post' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-brand-text mb-4">
              Create New Post
            </h2>
            {/* Platform Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-brand-text mb-2">
                Select Platforms
              </label>
              <div className="flex space-x-4">
                {['facebook', 'linkedin', 'youtube'].map((platform) => (
                  <label key={platform} className="flex items-center">
                    <input
                      type="checkbox"
                      aria-label="checkbox input"
                      checked={selectedPlatforms.includes(platform)}
                      onChange={() => togglePlatform(platform)}
                      className="h-4 w-4 text-brand-info focus:ring-brand-focus border-brand-border-dark rounded"
                    />
                    <span className="ml-2 text-sm text-brand-text capitalize">
                      {platform}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            {/* Content */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-brand-text mb-2">
                Post Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-brand-border-dark rounded-md focus:outline-none focus:ring-2 focus:ring-brand-focus"
                placeholder="What would you like to share?"
              />
              <p className="mt-1 text-sm text-brand-text-light">
                {content.length} characters
              </p>
            </div>
            {/* Media URL */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-brand-text mb-2">
                Media URL (Optional)
              </label>
              <input
                type="url"
                aria-label="url input"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                className="w-full px-3 py-2 border border-brand-border-dark rounded-md focus:outline-none focus:ring-2 focus:ring-brand-focus"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            {/* Scheduled Time */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-brand-text mb-2">
                Schedule for Later (Optional)
              </label>
              <input
                type="datetime-local"
                aria-label="datetime-local input"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="w-full px-3 py-2 border border-brand-border-dark rounded-md focus:outline-none focus:ring-2 focus:ring-brand-focus"
              />
            </div>
            {/* Post Button */}
            <button
              onClick={handlePost}
              disabled={posting || selectedPlatforms.length === 0}
              className="w-full bg-brand-info text-white py-3 px-4 rounded-md hover:bg-brand-info-hover disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
            >
              {posting
                ? 'Posting...'
                : scheduledTime
                  ? 'Schedule Post'
                  : 'Post Now'}
            </button>
            {/* Result */}
            {result && (
              <div className="mt-6 p-4 bg-brand-surface rounded-md">
                <h3 className="font-semibold text-brand-text mb-2">
                  Post Results:
                </h3>
                {Object.entries(result).map(
                  ([platform, res]: [string, any]) => (
                    <div
                      key={platform}
                      className="flex items-center justify-between py-2"
                    >
                      <span className="capitalize text-brand-text">
                        {platform}:
                      </span>
                      <span
                        className={`font-medium ${
                          res.success ? 'text-brand-success' : 'text-red-600'
                        }`}
                      >
                        {res.success ? '✓ Success' : `✗ ${res.error}`}
                      </span>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        )}
        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Program Announcement */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-brand-text mb-2">
                Program Announcement
              </h3>
              <p className="text-sm text-brand-text-muted mb-4">
                Announce a new training program or course
              </p>
              <button
                onClick={() => handleTemplatePost('program')}
                disabled={posting}
                className="w-full bg-brand-info text-white py-2 px-4 rounded-md hover:bg-brand-info-hover disabled:bg-gray-400"
              >
                Use Template
              </button>
            </div>
            {/* Success Story */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-brand-text mb-2">
                Success Story
              </h3>
              <p className="text-sm text-brand-text-muted mb-4">
                Share a student achievement or success story
              </p>
              <button
                onClick={() => handleTemplatePost('success')}
                disabled={posting}
                className="w-full bg-brand-success text-white py-2 px-4 rounded-md hover:bg-brand-success-hover disabled:bg-gray-400"
              >
                Use Template
              </button>
            </div>
            {/* Event Announcement */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-brand-text mb-2">
                Event Announcement
              </h3>
              <p className="text-sm text-brand-text-muted mb-4">
                Promote an upcoming event or webinar
              </p>
              <button
                onClick={() => handleTemplatePost('event')}
                disabled={posting}
                className="w-full bg-brand-secondary text-white py-2 px-4 rounded-md hover:bg-brand-secondary-hover disabled:bg-gray-400"
              >
                Use Template
              </button>
            </div>
            {/* Daily Motivation */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-brand-text mb-2">
                Daily Motivation
              </h3>
              <p className="text-sm text-brand-text-muted mb-4">
                Share an inspirational quote or message
              </p>
              <button
                onClick={() => handleTemplatePost('motivation')}
                disabled={posting}
                className="w-full bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700 disabled:bg-gray-400"
              >
                Use Template
              </button>
            </div>
            {/* Partnership Announcement */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-brand-text mb-2">
                Partnership Announcement
              </h3>
              <p className="text-sm text-brand-text-muted mb-4">
                Announce a new partnership or collaboration
              </p>
              <button
                onClick={() => handleTemplatePost('partnership')}
                disabled={posting}
                className="w-full bg-brand-info text-white py-2 px-4 rounded-md hover:bg-brand-info-hover disabled:bg-gray-400"
              >
                Use Template
              </button>
            </div>
            {/* Template Result */}
            {result && (
              <div className="md:col-span-2 bg-brand-surface rounded-lg p-6">
                <h3 className="font-semibold text-brand-text mb-4">
                  Template Post Results:
                </h3>
                {Object.entries(result).map(
                  ([platform, res]: [string, any]) => (
                    <div
                      key={platform}
                      className="flex items-center justify-between py-2"
                    >
                      <span className="capitalize text-brand-text">
                        {platform}:
                      </span>
                      <span
                        className={`font-medium ${
                          res.success ? 'text-brand-success' : 'text-red-600'
                        }`}
                      >
                        {res.success ? '✓ Success' : `✗ ${res.error}`}
                      </span>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        )}
        {/* Configuration Tab */}
        {activeTab === 'status' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-brand-text mb-4">
              Zapier Configuration Status
            </h2>
            <div className="space-y-4">
              {/* Facebook */}
              <div className="flex items-center justify-between p-4 bg-brand-surface rounded-md">
                <div>
                  <h3 className="font-medium text-brand-text">Facebook</h3>
                  <p className="text-sm text-brand-text-muted">
                    Webhook configuration
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    configStatus.facebook
                      ? 'bg-brand-surface text-brand-success'
                      : 'bg-brand-surface text-red-800'
                  }`}
                >
                  {configStatus.facebook ? 'Configured' : 'Not Configured'}
                </span>
              </div>
              {/* LinkedIn */}
              <div className="flex items-center justify-between p-4 bg-brand-surface rounded-md">
                <div>
                  <h3 className="font-medium text-brand-text">LinkedIn</h3>
                  <p className="text-sm text-brand-text-muted">
                    Webhook configuration
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    configStatus.linkedin
                      ? 'bg-brand-surface text-brand-success'
                      : 'bg-brand-surface text-red-800'
                  }`}
                >
                  {configStatus.linkedin ? 'Configured' : 'Not Configured'}
                </span>
              </div>
              {/* YouTube */}
              <div className="flex items-center justify-between p-4 bg-brand-surface rounded-md">
                <div>
                  <h3 className="font-medium text-brand-text">YouTube</h3>
                  <p className="text-sm text-brand-text-muted">
                    Webhook configuration
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    configStatus.youtube
                      ? 'bg-brand-surface text-brand-success'
                      : 'bg-brand-surface text-red-800'
                  }`}
                >
                  {configStatus.youtube ? 'Configured' : 'Not Configured'}
                </span>
              </div>
              {/* All Platforms Webhook */}
              <div className="flex items-center justify-between p-4 bg-brand-surface rounded-md">
                <div>
                  <h3 className="font-medium text-brand-text">
                    All Platforms (Single Webhook)
                  </h3>
                  <p className="text-sm text-brand-text-muted">
                    Optional unified webhook
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    configStatus.all
                      ? 'bg-brand-surface text-brand-success'
                      : 'bg-brand-surface-dark text-brand-text'
                  }`}
                >
                  {configStatus.all ? 'Configured' : 'Optional'}
                </span>
              </div>
              {/* API Key */}
              <div className="flex items-center justify-between p-4 bg-brand-surface rounded-md">
                <div>
                  <h3 className="font-medium text-brand-text">
                    Zapier API Key
                  </h3>
                  <p className="text-sm text-brand-text-muted">
                    Optional authentication
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    configStatus.apiKey
                      ? 'bg-brand-surface text-brand-success'
                      : 'bg-brand-surface-dark text-brand-text'
                  }`}
                >
                  {configStatus.apiKey ? 'Configured' : 'Optional'}
                </span>
              </div>
            </div>
            {/* Setup Instructions */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
              <h3 className="font-semibold text-blue-900 mb-2">
                Setup Instructions
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-brand-info">
                <li>
                  Create Zaps in Zapier for each platform (Facebook, LinkedIn,
                  YouTube)
                </li>
                <li>Use "Webhooks by Zapier" as the trigger</li>
                <li>Copy the webhook URLs from Zapier</li>
                <li>
                  Add webhook URLs to your environment variables:
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li>VITE_ZAPIER_FACEBOOK_WEBHOOK</li>
                    <li>VITE_ZAPIER_LINKEDIN_WEBHOOK</li>
                    <li>VITE_ZAPIER_YOUTUBE_WEBHOOK</li>
                    <li>VITE_ZAPIER_ALL_PLATFORMS_WEBHOOK (optional)</li>
                    <li>VITE_ZAPIER_API_KEY (optional)</li>
                  </ul>
                </li>
                <li>
                  Configure Zapier actions to post to respective platforms
                </li>
                <li>Test the integration using the templates</li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
