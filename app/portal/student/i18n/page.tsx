'use client';

import { useState } from 'react';
import { Globe, Check, Download, Upload, Search, Plus, Edit, Trash2, Languages, FileText, Settings } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  progress: number;
  isActive: boolean;
}

interface Translation {
  key: string;
  english: string;
  translated: string;
  context: string;
  status: 'complete' | 'pending' | 'review';
}

export default function InternationalizationPage() {
  const [languages] = useState<Language[]>([
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', progress: 100, isActive: true },
    { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', progress: 95, isActive: true },
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', progress: 80, isActive: true },
    { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', progress: 75, isActive: false },
    { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', progress: 60, isActive: false },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', progress: 45, isActive: false },
  ]);

  const [translations] = useState<Translation[]>([
    {
      key: 'dashboard.welcome',
      english: 'Welcome to your dashboard',
      translated: 'Bienvenido a tu panel',
      context: 'Dashboard greeting',
      status: 'complete',
    },
    {
      key: 'courses.title',
      english: 'My Courses',
      translated: 'Mis Cursos',
      context: 'Course page title',
      status: 'complete',
    },
    {
      key: 'assignments.due',
      english: 'Due Date',
      translated: 'Fecha de Vencimiento',
      context: 'Assignment due date label',
      status: 'review',
    },
  ]);

  const [selectedLanguage, setSelectedLanguage] = useState('es');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredTranslations = translations.filter(t => {
    const matchesSearch = t.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         t.english.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || t.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const activeLanguages = languages.filter(l => l.isActive);
  const totalTranslations = translations.length;
  const completeTranslations = translations.filter(t => t.status === 'complete').length;
  const avgProgress = languages.reduce((sum, l) => sum + l.progress, 0) / languages.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Internationalization</h1>
          <p className="text-gray-600 mt-1">Manage languages and translations</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <Globe className="text-blue-600 mb-3" size={32} />
            <p className="text-2xl font-bold">{languages.length}</p>
            <p className="text-sm text-gray-600">Total Languages</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <Check className="text-green-600 mb-3" size={32} />
            <p className="text-2xl font-bold">{activeLanguages.length}</p>
            <p className="text-sm text-gray-600">Active Languages</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <FileText className="text-purple-600 mb-3" size={32} />
            <p className="text-2xl font-bold">{completeTranslations}/{totalTranslations}</p>
            <p className="text-sm text-gray-600">Translations Complete</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <Languages className="text-orange-600 mb-3" size={32} />
            <p className="text-2xl font-bold">{avgProgress.toFixed(0)}%</p>
            <p className="text-sm text-gray-600">Avg Progress</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Translations</h2>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">
                      <Upload size={16} />
                      Import
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">
                      <Download size={16} />
                      Export
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                      <Plus size={16} />
                      Add
                    </button>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search translations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm"
                    />
                  </div>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="px-4 py-2 border rounded-lg text-sm"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </option>
                    ))}
                  </select>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border rounded-lg text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="complete">Complete</option>
                    <option value="pending">Pending</option>
                    <option value="review">Review</option>
                  </select>
                </div>
              </div>
              <div className="p-6">
                {filteredTranslations.length > 0 ? (
                  <div className="space-y-3">
                    {filteredTranslations.map((translation) => (
                      <div key={translation.key} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <code className="text-sm font-mono text-blue-600">{translation.key}</code>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                translation.status === 'complete' ? 'bg-green-100 text-green-700' :
                                translation.status === 'review' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-gray-100 text-gray-700'
                              }`}>
                                {translation.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{translation.context}</p>
                          </div>
                          <div className="flex gap-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                              <Edit size={16} />
                            </button>
                            <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs text-gray-600 mb-1 block">English</label>
                            <p className="text-sm">{translation.english}</p>
                          </div>
                          <div>
                            <label className="text-xs text-gray-600 mb-1 block">
                              {languages.find(l => l.code === selectedLanguage)?.name}
                            </label>
                            <p className="text-sm">{translation.translated}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Languages className="mx-auto text-gray-400 mb-4" size={64} />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Translations Found</h3>
                    <p className="text-gray-600">Try adjusting your search or filters</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">Settings</h2>
              </div>
              <div className="p-6 space-y-4">
                <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <div>
                    <p className="font-medium">Auto-detect Language</p>
                    <p className="text-sm text-gray-600">Automatically detect user's preferred language</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
                </label>

                <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <div>
                    <p className="font-medium">Show Language Selector</p>
                    <p className="text-sm text-gray-600">Display language selector in navigation</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
                </label>

                <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <div>
                    <p className="font-medium">RTL Support</p>
                    <p className="text-sm text-gray-600">Enable right-to-left text direction for Arabic, Hebrew</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5 rounded" />
                </label>

                <div className="p-4 border rounded-lg">
                  <label className="block text-sm font-medium mb-2">Default Language</label>
                  <select className="w-full px-4 py-2 border rounded-lg">
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="p-4 border rounded-lg">
                  <label className="block text-sm font-medium mb-2">Fallback Language</label>
                  <select className="w-full px-4 py-2 border rounded-lg">
                    <option value="en">🇺🇸 English</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">Languages</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {languages.map((lang) => (
                    <div key={lang.code} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{lang.flag}</span>
                          <div>
                            <p className="font-semibold">{lang.name}</p>
                            <p className="text-sm text-gray-600">{lang.nativeName}</p>
                          </div>
                        </div>
                        {lang.isActive && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                            Active
                          </span>
                        )}
                      </div>
                      <div className="mb-2">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-semibold">{lang.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${lang.progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                          {lang.isActive ? 'Manage' : 'Activate'}
                        </button>
                        <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">
                          <Settings size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-2">Translation Tips</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• Keep translations concise and clear</li>
                <li>• Maintain consistent terminology</li>
                <li>• Consider cultural context</li>
                <li>• Test with native speakers</li>
                <li>• Use professional translation services for critical content</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
