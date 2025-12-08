'use client';

import { useState } from 'react';
import { 

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/admin/ai-console",
  },
  title: 'Ai Console | Elevate For Humanity',
  description: 'Explore Ai Console and discover opportunities for career growth and development at Elevate For Humanity.',
};

  Brain, 
  MessageSquare, 
  Volume2, 
  BookOpen, 
  Image as ImageIcon,
  Sparkles,
  Mic,
  FileText,
  Zap,
  Settings
} from 'lucide-react';

export default function AIConsolePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [ttsText, setTtsText] = useState('');
  const [ttsLoading, setTtsLoading] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  const aiFeatures = [
    {
      id: 'ai-instructor',
      name: 'AI Instructor',
      description: '24/7 AI teaching assistant for students',
      icon: Brain,
      endpoint: '/api/ai-instructor/message',
      status: 'active',
      color: 'blue'
    },
    {
      id: 'ai-tutor',
      name: 'AI Tutor',
      description: 'Personalized learning assistance',
      icon: MessageSquare,
      endpoint: '/api/ai/tutor',
      status: 'active',
      color: 'green'
    },
    {
      id: 'text-to-speech',
      name: 'Text to Speech',
      description: 'Convert text to natural voice audio',
      icon: Volume2,
      endpoint: '/api/text-to-speech',
      status: 'active',
      color: 'purple'
    },
    {
      id: 'course-generator',
      name: 'Course Generator',
      description: 'AI-powered course content creation',
      icon: BookOpen,
      endpoint: '/api/ai/generate-course',
      status: 'active',
      color: 'orange'
    },
    {
      id: 'asset-generator',
      name: 'Asset Generator',
      description: 'Generate images and media with AI',
      icon: ImageIcon,
      endpoint: '/api/ai/generate-asset',
      status: 'active',
      color: 'pink'
    },
    {
      id: 'course-builder',
      name: 'AI Course Builder',
      description: 'Build complete courses with AI',
      icon: Sparkles,
      endpoint: '/api/ai/course-builder',
      status: 'active',
      color: 'indigo'
    }
  ];

  const handleTextToSpeech = async () => {
    if (!ttsText.trim()) return;
    
    setTtsLoading(true);
    try {
      const response = await fetch('/api/text-to-speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: ttsText })
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
      } else {
        alert('Text-to-speech failed. Check API keys in environment variables.');
      }
    } catch (error) {
      console.error('TTS error:', error);
      alert('Error generating speech');
    } finally {
      setTtsLoading(false);
    }
  };

  const handleAIChat = async () => {
    if (!chatMessage.trim()) return;
    
    setChatLoading(true);
    setChatResponse('');
    try {
      const response = await fetch('/api/ai-instructor/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: chatMessage,
          courseId: 'admin-test'
        })
      });

      const data = await response.json();
      setChatResponse(data.response || data.message || 'No response');
    } catch (error) {
      console.error('AI chat error:', error);
      setChatResponse('Error: Could not get AI response');
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/gallery/image8.jpg"
          alt="Ai Console"
          fill
          className="object-cover"
          quality={100}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/90" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-2xl">
            Ai Console
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 drop-shadow-lg">
            Transform your career with free training and industry certifications
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-2xl"
            >
              Get Started Free
            </Link>
            <Link
              href="/programs"
              className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-2xl"
            >
              View Programs
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-700 to-purple-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <Brain className="w-12 h-12" />
              <div>
                <h1 className="text-4xl font-bold">AI Console</h1>
                <p className="text-xl text-blue-100">Access all AI features and OpenAI integrations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm border mb-6">
            <div className="flex border-b overflow-x-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-3 font-medium ${
                  activeTab === 'overview'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('instructor')}
                className={`px-6 py-3 font-medium ${
                  activeTab === 'instructor'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                AI Instructor
              </button>
              <button
                onClick={() => setActiveTab('tts')}
                className={`px-6 py-3 font-medium ${
                  activeTab === 'tts'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Text-to-Speech
              </button>
              <button
                onClick={() => setActiveTab('autopilots')}
                className={`px-6 py-3 font-medium ${
                  activeTab === 'autopilots'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Autopilots
              </button>
            </div>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.id}
                    className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition"
                  >
                    <div className={`w-12 h-12 bg-${feature.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className={`w-6 h-6 text-${feature.color}-600`} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{feature.description}</p>
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        feature.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {feature.status}
                      </span>
                      <code className="text-xs text-gray-500">{feature.endpoint}</code>
                    
      {/* Storytelling Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                  Your Journey Starts Here
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Every great career begins with a single step. Whether you're looking to change careers, 
                  upgrade your skills, or enter the workforce for the first time, we're here to help you succeed. 
                  Our programs are 100% free, government-funded, and designed to get you hired fast.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">100% free training - no tuition, no hidden costs</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Industry-recognized certifications that employers value</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Job placement assistance and career support</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Flexible scheduling for working adults</span>
                  </li>
                </ul>
              </div>
              <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/gallery/image3.jpg"
                  alt="Students learning"
                  fill
                  className="object-cover"
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-purple-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands who have launched successful careers through our free training programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/apply"
                className="bg-white text-blue-700 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 text-lg shadow-2xl transition-all"
              >
                Apply Now - It's Free
              </Link>
              <Link
                href="/programs"
                className="bg-blue-800 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-900 border-2 border-white text-lg shadow-2xl transition-all"
              >
                Browse All Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      </div>
    </div>
  );
              })}
            </div>
          )}

          {/* AI Instructor Tab */}
          {activeTab === 'instructor' && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-bold mb-4">AI Instructor Chat</h2>
              <p className="text-gray-600 mb-6">Test the AI instructor that helps students 24/7</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ask a question:
                  </label>
                  <textarea
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                    placeholder="e.g., Explain how HVAC systems work..."
                  />
                </div>
                
                <button
                  onClick={handleAIChat}
                  disabled={chatLoading || !chatMessage.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {chatLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                      Thinking...
                    </>
                  ) : (
                    <>
                      <MessageSquare className="w-5 h-5" />
                      Ask AI Instructor
                    </>
                  )}
                </button>

                {chatResponse && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-900 mb-2">AI Response:</h3>
                    <p className="text-gray-700 whitespace-pre-wrap">{chatResponse}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Text-to-Speech Tab */}
          {activeTab === 'tts' && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-bold mb-4">Text-to-Speech Generator</h2>
              <p className="text-gray-600 mb-6">Convert any text to natural-sounding speech</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter text to convert:
                  </label>
                  <textarea
                    value={ttsText}
                    onChange={(e) => setTtsText(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={6}
                    placeholder="Enter the text you want to convert to speech..."
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Character count: {ttsText.length}
                  </p>
                </div>
                
                <button
                  onClick={handleTextToSpeech}
                  disabled={ttsLoading || !ttsText.trim()}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {ttsLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-5 h-5" />
                      Generate Speech
                    </>
                  )}
                </button>

                <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h3 className="font-semibold text-purple-900 mb-2">API Configuration:</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Supports ElevenLabs (premium quality)</li>
                    <li>• Supports Google Cloud TTS (good quality)</li>
                    <li>• Configure API keys in environment variables</li>
                    <li>• Falls back to browser speech synthesis</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Autopilots Tab */}
          {activeTab === 'autopilots' && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-bold mb-4">Autopilot Tasks</h2>
              <p className="text-gray-600 mb-6">Automated AI-powered tasks</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href="/admin/autopilots"
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="w-6 h-6 text-blue-600" />
                    <h3 className="font-semibold">Autopilot Control Center</h3>
                  </div>
                  <p className="text-sm text-gray-600">Run automated build, fix, and deploy tasks</p>
                </a>

                <a
                  href="/admin/course-studio"
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <BookOpen className="w-6 h-6 text-green-600" />
                    <h3 className="font-semibold">Course Studio</h3>
                  </div>
                  <p className="text-sm text-gray-600">AI-powered course builder and editor</p>
                </a>

                <a
                  href="/admin/media-studio"
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <ImageIcon className="w-6 h-6 text-purple-600" 
          quality={100}
        />
                    <h3 className="font-semibold">Media Studio</h3>
                  </div>
                  <p className="text-sm text-gray-600">Upload and manage images and media</p>
                </a>

                <a
                  href="/admin/dev-studio"
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Settings className="w-6 h-6 text-orange-600" />
                    <h3 className="font-semibold">Dev Studio</h3>
                  </div>
                  <p className="text-sm text-gray-600">Live code editor with GitHub integration</p>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {items.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">{item.id.slice(0, 8)}...</td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {item.title || item.name || item.email || 'N/A'}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            item.status === 'active' ? 'bg-green-100 text-green-800' :
                            item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {item.status || 'N/A'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(item.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <Link 
                            href={`/admin/ai-console/${item.id}`}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-12 text-center text-gray-500">
                  <p className="text-lg mb-2">No items found</p>
                  <p className="text-sm">Items will appear here once they are created</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
