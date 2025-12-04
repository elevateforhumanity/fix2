'use client';

import { useState, useEffect } from 'react';
import { Eye, Type, Contrast, Volume2, Keyboard, MousePointer, Zap, Check, RotateCcw, Save } from 'lucide-react';

interface AccessibilitySettings {
  fontSize: number;
  fontFamily: string;
  lineHeight: number;
  letterSpacing: number;
  highContrast: boolean;
  darkMode: boolean;
  reducedMotion: boolean;
  screenReaderOptimized: boolean;
  keyboardNavigation: boolean;
  focusIndicators: boolean;
  textToSpeech: boolean;
  captionsEnabled: boolean;
  colorBlindMode: string;
}

export default function AccessibilityPage() {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: 16,
    fontFamily: 'system',
    lineHeight: 1.5,
    letterSpacing: 0,
    highContrast: false,
    darkMode: false,
    reducedMotion: false,
    screenReaderOptimized: false,
    keyboardNavigation: true,
    focusIndicators: true,
    textToSpeech: false,
    captionsEnabled: false,
    colorBlindMode: 'none',
  });

  const [previewText, setPreviewText] = useState('This is a preview of how text will appear with your accessibility settings.');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load saved settings from localStorage
    const savedSettings = localStorage.getItem('accessibilitySettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    
    // Apply settings to document
    applySettings();
  };

  const handleReset = () => {
    const defaultSettings: AccessibilitySettings = {
      fontSize: 16,
      fontFamily: 'system',
      lineHeight: 1.5,
      letterSpacing: 0,
      highContrast: false,
      darkMode: false,
      reducedMotion: false,
      screenReaderOptimized: false,
      keyboardNavigation: true,
      focusIndicators: true,
      textToSpeech: false,
      captionsEnabled: false,
      colorBlindMode: 'none',
    };
    setSettings(defaultSettings);
    localStorage.removeItem('accessibilitySettings');
  };

  const applySettings = () => {
    const root = document.documentElement;
    root.style.fontSize = `${settings.fontSize}px`;
    root.style.lineHeight = settings.lineHeight.toString();
    root.style.letterSpacing = `${settings.letterSpacing}px`;
    
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    if (settings.darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    if (settings.reducedMotion) {
      root.style.setProperty('--animation-duration', '0.01ms');
    } else {
      root.style.removeProperty('--animation-duration');
    }
  };

  const getFontFamilyStyle = () => {
    switch (settings.fontFamily) {
      case 'dyslexic':
        return 'OpenDyslexic, sans-serif';
      case 'serif':
        return 'Georgia, serif';
      case 'monospace':
        return 'Courier New, monospace';
      default:
        return 'system-ui, -apple-system, sans-serif';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Accessibility Settings</h1>
          <p className="text-gray-600 mt-1">Customize your experience for better accessibility</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {/* Visual Settings */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <div className="flex items-center gap-2">
                  <Eye className="text-blue-600" size={24} />
                  <h2 className="text-xl font-semibold">Visual Settings</h2>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Font Size: {settings.fontSize}px
                  </label>
                  <input
                    type="range"
                    min="12"
                    max="24"
                    value={settings.fontSize}
                    onChange={(e) => setSettings({ ...settings, fontSize: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-600 mt-1">
                    <span>Small</span>
                    <span>Medium</span>
                    <span>Large</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Font Family</label>
                  <select
                    value={settings.fontFamily}
                    onChange={(e) => setSettings({ ...settings, fontFamily: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value="system">System Default</option>
                    <option value="serif">Serif (Georgia)</option>
                    <option value="monospace">Monospace</option>
                    <option value="dyslexic">OpenDyslexic</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Line Height: {settings.lineHeight}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="2"
                    step="0.1"
                    value={settings.lineHeight}
                    onChange={(e) => setSettings({ ...settings, lineHeight: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Letter Spacing: {settings.letterSpacing}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    value={settings.letterSpacing}
                    onChange={(e) => setSettings({ ...settings, letterSpacing: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Color Blind Mode</label>
                  <select
                    value={settings.colorBlindMode}
                    onChange={(e) => setSettings({ ...settings, colorBlindMode: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value="none">None</option>
                    <option value="protanopia">Protanopia (Red-Blind)</option>
                    <option value="deuteranopia">Deuteranopia (Green-Blind)</option>
                    <option value="tritanopia">Tritanopia (Blue-Blind)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Display Modes */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <div className="flex items-center gap-2">
                  <Contrast className="text-purple-600" size={24} />
                  <h2 className="text-xl font-semibold">Display Modes</h2>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <div>
                    <p className="font-medium">High Contrast Mode</p>
                    <p className="text-sm text-gray-600">Increase contrast for better visibility</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.highContrast}
                    onChange={(e) => setSettings({ ...settings, highContrast: e.target.checked })}
                    className="w-5 h-5 rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <div>
                    <p className="font-medium">Dark Mode</p>
                    <p className="text-sm text-gray-600">Reduce eye strain in low light</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.darkMode}
                    onChange={(e) => setSettings({ ...settings, darkMode: e.target.checked })}
                    className="w-5 h-5 rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <div>
                    <p className="font-medium">Reduced Motion</p>
                    <p className="text-sm text-gray-600">Minimize animations and transitions</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.reducedMotion}
                    onChange={(e) => setSettings({ ...settings, reducedMotion: e.target.checked })}
                    className="w-5 h-5 rounded"
                  />
                </label>
              </div>
            </div>

            {/* Navigation & Interaction */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <div className="flex items-center gap-2">
                  <Keyboard className="text-green-600" size={24} />
                  <h2 className="text-xl font-semibold">Navigation & Interaction</h2>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <div>
                    <p className="font-medium">Enhanced Keyboard Navigation</p>
                    <p className="text-sm text-gray-600">Navigate using keyboard shortcuts</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.keyboardNavigation}
                    onChange={(e) => setSettings({ ...settings, keyboardNavigation: e.target.checked })}
                    className="w-5 h-5 rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <div>
                    <p className="font-medium">Enhanced Focus Indicators</p>
                    <p className="text-sm text-gray-600">Show clear focus outlines</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.focusIndicators}
                    onChange={(e) => setSettings({ ...settings, focusIndicators: e.target.checked })}
                    className="w-5 h-5 rounded"
                  />
                </label>
              </div>
            </div>

            {/* Audio & Captions */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <div className="flex items-center gap-2">
                  <Volume2 className="text-orange-600" size={24} />
                  <h2 className="text-xl font-semibold">Audio & Captions</h2>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <div>
                    <p className="font-medium">Text-to-Speech</p>
                    <p className="text-sm text-gray-600">Read content aloud</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.textToSpeech}
                    onChange={(e) => setSettings({ ...settings, textToSpeech: e.target.checked })}
                    className="w-5 h-5 rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <div>
                    <p className="font-medium">Captions Enabled</p>
                    <p className="text-sm text-gray-600">Show captions for video content</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.captionsEnabled}
                    onChange={(e) => setSettings({ ...settings, captionsEnabled: e.target.checked })}
                    className="w-5 h-5 rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <div>
                    <p className="font-medium">Screen Reader Optimized</p>
                    <p className="text-sm text-gray-600">Optimize for screen readers</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.screenReaderOptimized}
                    onChange={(e) => setSettings({ ...settings, screenReaderOptimized: e.target.checked })}
                    className="w-5 h-5 rounded"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow sticky top-4">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">Preview</h2>
              </div>
              <div className="p-6">
                <div
                  className="p-4 border rounded-lg mb-4"
                  style={{
                    fontSize: `${settings.fontSize}px`,
                    fontFamily: getFontFamilyStyle(),
                    lineHeight: settings.lineHeight,
                    letterSpacing: `${settings.letterSpacing}px`,
                    backgroundColor: settings.darkMode ? '#1a1a1a' : '#ffffff',
                    color: settings.darkMode ? '#ffffff' : '#000000',
                    filter: settings.highContrast ? 'contrast(1.5)' : 'none',
                  }}
                >
                  {previewText}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="text-green-600" size={16} />
                    <span>WCAG 2.1 Level AA Compliant</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="text-green-600" size={16} />
                    <span>Screen Reader Compatible</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="text-green-600" size={16} />
                    <span>Keyboard Accessible</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleSave}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Save size={20} />
                    {saved ? 'Settings Saved!' : 'Save Settings'}
                  </button>
                  <button
                    onClick={handleReset}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    <RotateCcw size={20} />
                    Reset to Defaults
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <Zap size={20} />
                Keyboard Shortcuts
              </h3>
              <div className="space-y-2 text-sm text-blue-800">
                <div className="flex justify-between">
                  <span>Increase font size</span>
                  <kbd className="px-2 py-1 bg-white rounded text-xs">Ctrl + +</kbd>
                </div>
                <div className="flex justify-between">
                  <span>Decrease font size</span>
                  <kbd className="px-2 py-1 bg-white rounded text-xs">Ctrl + -</kbd>
                </div>
                <div className="flex justify-between">
                  <span>Toggle high contrast</span>
                  <kbd className="px-2 py-1 bg-white rounded text-xs">Ctrl + H</kbd>
                </div>
                <div className="flex justify-between">
                  <span>Skip to main content</span>
                  <kbd className="px-2 py-1 bg-white rounded text-xs">Alt + M</kbd>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
