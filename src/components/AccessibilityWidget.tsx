/**
 * Accessibility Widget
 * Provides users with accessibility controls
 * Section 508 & WCAG 2.1 AA compliant
 */

import { useState } from 'react';
import { Settings, Type, Contrast, Eye, Keyboard } from 'lucide-react';

interface AccessibilitySettings {
  fontSize: 'normal' | 'large' | 'xlarge';
  contrast: 'normal' | 'high';
  reducedMotion: boolean;
  keyboardNav: boolean;
}

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const saved = localStorage.getItem('accessibility-settings');
    return saved ? JSON.parse(saved) : {
      fontSize: 'normal',
      contrast: 'normal',
      reducedMotion: false,
      keyboardNav: true,
    };
  });

  const updateSettings = (newSettings: Partial<AccessibilitySettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem('accessibility-settings', JSON.stringify(updated));
    applySettings(updated);
  };

  const applySettings = (settings: AccessibilitySettings) => {
    const root = document.documentElement;
    
    // Font size
    root.classList.remove('text-normal', 'text-large', 'text-xlarge');
    root.classList.add(`text-${settings.fontSize}`);
    
    // Contrast
    root.classList.toggle('high-contrast', settings.contrast === 'high');
    
    // Reduced motion
    root.classList.toggle('reduce-motion', settings.reducedMotion);
    
    // Keyboard navigation
    root.classList.toggle('keyboard-nav', settings.keyboardNav);
  };

  return (
    <>
      {/* Accessibility Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-40 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300"
        aria-label="Accessibility settings"
        aria-expanded={isOpen}
      >
        <Settings className="w-6 h-6" aria-hidden="true" />
      </button>

      {/* Accessibility Panel */}
      {isOpen && (
        <div
          className="fixed bottom-20 right-4 z-40 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 p-6"
          role="dialog"
          aria-label="Accessibility settings panel"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">
              Accessibility Settings
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              aria-label="Close accessibility settings"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            {/* Font Size */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Type className="w-4 h-4" aria-hidden="true" />
                Font Size
              </label>
              <div className="flex gap-2">
                {(['normal', 'large', 'xlarge'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => updateSettings({ fontSize: size })}
                    className={`flex-1 px-3 py-2 rounded border text-sm font-medium transition-colors ${
                      settings.fontSize === size
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'
                    }`}
                    aria-pressed={settings.fontSize === size}
                  >
                    {size === 'normal' ? 'A' : size === 'large' ? 'A+' : 'A++'}
                  </button>
                ))}
              </div>
            </div>

            {/* Contrast */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Contrast className="w-4 h-4" aria-hidden="true" />
                Contrast
              </label>
              <div className="flex gap-2">
                {(['normal', 'high'] as const).map((contrast) => (
                  <button
                    key={contrast}
                    onClick={() => updateSettings({ contrast })}
                    className={`flex-1 px-3 py-2 rounded border text-sm font-medium transition-colors ${
                      settings.contrast === contrast
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'
                    }`}
                    aria-pressed={settings.contrast === contrast}
                  >
                    {contrast === 'normal' ? 'Normal' : 'High'}
                  </button>
                ))}
              </div>
            </div>

            {/* Reduced Motion */}
            <div>
              <label className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Eye className="w-4 h-4" aria-hidden="true" />
                  Reduce Motion
                </span>
                <button
                  onClick={() => updateSettings({ reducedMotion: !settings.reducedMotion })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    settings.reducedMotion ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  role="switch"
                  aria-checked={settings.reducedMotion}
                  aria-label="Toggle reduced motion"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.reducedMotion ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </label>
              <p className="text-xs text-gray-600 mt-1">
                Reduces animations and transitions
              </p>
            </div>

            {/* Keyboard Navigation */}
            <div>
              <label className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Keyboard className="w-4 h-4" aria-hidden="true" />
                  Keyboard Navigation
                </span>
                <button
                  onClick={() => updateSettings({ keyboardNav: !settings.keyboardNav })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    settings.keyboardNav ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  role="switch"
                  aria-checked={settings.keyboardNav}
                  aria-label="Toggle keyboard navigation highlights"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.keyboardNav ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </label>
              <p className="text-xs text-gray-600 mt-1">
                Enhanced focus indicators
              </p>
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={() => {
              const defaults: AccessibilitySettings = {
                fontSize: 'normal',
                contrast: 'normal',
                reducedMotion: false,
                keyboardNav: true,
              };
              updateSettings(defaults);
            }}
            className="w-full mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Reset to Defaults
          </button>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
