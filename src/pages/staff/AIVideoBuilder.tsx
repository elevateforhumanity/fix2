/**
 * AI Video Builder
 * Generate videos from scripts with text-to-speech, scenes, and templates
 */

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Play,
  Plus,
  Trash2,
  Save,
  Download,
  Upload,
  Image as ImageIcon,
  Type,
  Mic,
  Video,
  Settings,
  Eye,
  Wand2,
  Copy,
  GripVertical,
  Sparkles,
  Search,
  Music
} from 'lucide-react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { 
  videoTemplates, 
  templateCategories, 
  getTemplatesByCategory,
  type VideoTemplate 
} from '../../data/video-templates';
import {
  stockImages,
  stockVideos,
  backgroundMusic,
  mediaCategories,
  getImagesByCategory,
  getVideosByCategory,
  searchMedia,
  type StockImage,
  type StockVideo
} from '../../data/stock-media';

interface Scene {
  id: string;
  type: 'title' | 'content' | 'image' | 'video' | 'split';
  duration: number;
  script: string;
  voiceOver: boolean;
  background: string;
  textPosition: 'center' | 'top' | 'bottom';
  animation: 'fade' | 'slide' | 'zoom' | 'none';
  image?: string;
}

export default function AIVideoBuilder() {
  const [videoTitle, setVideoTitle] = useState('');
  const [totalDuration, setTotalDuration] = useState(0);
  const [scenes, setScenes] = useState<Scene[]>([
    {
      id: 'scene-1',
      type: 'title',
      duration: 5,
      script: 'Welcome to WIOA Workforce Training',
      voiceOver: true,
      background: '#2563EB',
      textPosition: 'center',
      animation: 'fade'
    }
  ]);

  const [selectedScene, setSelectedScene] = useState<Scene | null>(scenes[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Template & Media state
  const [activeTab, setActiveTab] = useState<'builder' | 'templates' | 'media'>('templates');
  const [selectedTemplate, setSelectedTemplate] = useState<VideoTemplate | null>(null);
  const [templateCategory, setTemplateCategory] = useState('All Templates');
  const [mediaCategory, setMediaCategory] = useState('All');
  const [mediaType, setMediaType] = useState<'images' | 'videos' | 'music'>('images');
  const [searchQuery, setSearchQuery] = useState('');

  const loadTemplate = (template: VideoTemplate) => {
    setSelectedTemplate(template);
    setVideoTitle(template.name);
    const convertedScenes: Scene[] = template.scenes.map((scene, index) => ({
      id: `scene-${index + 1}`,
      type: scene.type,
      duration: scene.duration,
      script: scene.script,
      voiceOver: scene.voiceOver,
      background: scene.background,
      textPosition: scene.textPosition,
      animation: scene.animation,
      image: scene.media?.url
    }));
    setScenes(convertedScenes);
    setSelectedScene(convertedScenes[0]);
    setActiveTab('builder');
  };

  const addScene = (type: Scene['type']) => {
    const newScene: Scene = {
      id: `scene-${Date.now()}`,
      type,
      duration: 5,
      script: '',
      voiceOver: true,
      background: '#FFFFFF',
      textPosition: 'center',
      animation: 'fade'
    };
    setScenes([...scenes, newScene]);
    setSelectedScene(newScene);
  };

  const updateScene = (id: string, updates: Partial<Scene>) => {
    setScenes(scenes.map(s => s.id === id ? { ...s, ...updates } : s));
    if (selectedScene?.id === id) {
      setSelectedScene({ ...selectedScene, ...updates });
    }
  };

  const deleteScene = (id: string) => {
    setScenes(scenes.filter(s => s.id !== id));
    if (selectedScene?.id === id) {
      setSelectedScene(scenes[0] || null);
    }
  };

  const generateVideo = async () => {
    setIsGenerating(true);
    // Simulate video generation
    setTimeout(() => {
      setIsGenerating(false);
      alert('Video generation complete! (This is a demo - integrate with actual video API)');
    }, 3000);
  };

  const calculateTotalDuration = () => {
    return scenes.reduce((total, scene) => total + scene.duration, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>AI Video Builder | Staff Portal</title>
      </Helmet>

      <Navigation />

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Video Builder</h1>
              <p className="text-gray-600">Create videos from scripts with AI-powered tools</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition">
                <Eye className="h-5 w-5" />
                Preview
              </button>
              <button
                onClick={generateVideo}
                disabled={isGenerating}
                className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-5 w-5" />
                    Generate Video
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('templates')}
                  className={`px-6 py-4 text-sm font-medium border-b-2 ${
                    activeTab === 'templates'
                      ? 'border-purple-600 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Templates
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('media')}
                  className={`px-6 py-4 text-sm font-medium border-b-2 ${
                    activeTab === 'media'
                      ? 'border-purple-600 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    Free Media
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('builder')}
                  className={`px-6 py-4 text-sm font-medium border-b-2 ${
                    activeTab === 'builder'
                      ? 'border-purple-600 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4" />
                    Video Builder ({scenes.length} scenes)
                  </div>
                </button>
              </nav>
            </div>
          </div>

          {/* Templates Tab */}
          {activeTab === 'templates' && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Choose a Template</h2>
                <p className="text-gray-600 mb-4">Start with a professional template using free, license-free resources</p>
                
                {/* Category Filter */}
                <div className="flex gap-2 mb-4 flex-wrap">
                  {templateCategories.map(category => (
                    <button
                      key={category}
                      onClick={() => setTemplateCategory(category)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        templateCategory === category
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Template Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getTemplatesByCategory(templateCategory).map(template => (
                  <div
                    key={template.id}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer"
                    onClick={() => loadTemplate(template)}
                  >
                    <div className="aspect-video bg-gray-100 relative">
                      <img
                        src={template.thumbnail}
                        alt={template.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                        {template.duration}s
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {template.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Free Media Tab */}
          {activeTab === 'media' && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Free Stock Media</h2>
                <p className="text-gray-600 mb-4">All resources are free for commercial use (Unsplash, Pexels, Free Music Archive)</p>
                
                {/* Media Type Selector */}
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setMediaType('images')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      mediaType === 'images'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      Images
                    </div>
                  </button>
                  <button
                    onClick={() => setMediaType('videos')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      mediaType === 'videos'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4" />
                      Videos
                    </div>
                  </button>
                  <button
                    onClick={() => setMediaType('music')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      mediaType === 'music'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Music className="w-4 h-4" />
                      Music
                    </div>
                  </button>
                </div>

                {/* Category Filter */}
                {mediaType !== 'music' && (
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {mediaCategories.map(category => (
                      <button
                        key={category}
                        onClick={() => setMediaCategory(category)}
                        className={`px-3 py-1 rounded text-sm ${
                          mediaCategory === category
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}

                {/* Search */}
                {mediaType !== 'music' && (
                  <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder={`Search ${mediaType}...`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                )}
              </div>

              {/* Media Grid */}
              {mediaType === 'images' && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {(searchQuery ? searchMedia(searchQuery).images : getImagesByCategory(mediaCategory)).map(image => (
                    <div key={image.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer group">
                      <div className="aspect-square bg-gray-100 relative">
                        <img src={image.thumbnail} alt={image.description} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition flex items-center justify-center">
                          <button className="opacity-0 group-hover:opacity-100 px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium">
                            Use Image
                          </button>
                        </div>
                      </div>
                      <div className="p-2">
                        <p className="text-xs text-gray-600 truncate">by {image.photographer}</p>
                        <p className="text-xs text-gray-400">{image.source}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {mediaType === 'videos' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(searchQuery ? searchMedia(searchQuery).videos : getVideosByCategory(mediaCategory)).map(video => (
                    <div key={video.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer group">
                      <div className="aspect-video bg-gray-100 relative">
                        <img src={video.thumbnail} alt={video.description} className="w-full h-full object-cover" />
                        <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                          {video.duration}s
                        </div>
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition flex items-center justify-center">
                          <button className="opacity-0 group-hover:opacity-100 px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium">
                            Use Video
                          </button>
                        </div>
                      </div>
                      <div className="p-2">
                        <p className="text-xs text-gray-600 truncate">by {video.creator}</p>
                        <p className="text-xs text-gray-400">{video.source}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {mediaType === 'music' && (
                <div className="space-y-3">
                  {backgroundMusic.map(music => (
                    <div key={music.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{music.name}</h3>
                          <p className="text-sm text-gray-600">by {music.artist}</p>
                          <div className="flex gap-2 mt-2">
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">{music.genre}</span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">{music.mood}</span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                              {Math.floor(music.duration / 60)}:{(music.duration % 60).toString().padStart(2, '0')}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">{music.license}</p>
                        </div>
                        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium">
                          Use Track
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Video Builder Tab */}
          {activeTab === 'builder' && (
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Scene Timeline */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Scenes</h2>
                  <button
                    onClick={() => addScene('content')}
                    className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>

                {/* Total Duration */}
                <div className="mb-4 p-3 bg-purple-50 rounded-lg">
                  <div className="text-sm text-purple-600 font-semibold">Total Duration</div>
                  <div className="text-2xl font-bold text-purple-900">{calculateTotalDuration()}s</div>
                </div>

                {/* Scene List */}
                <div className="space-y-2">
                  {scenes.map((scene, index) => (
                    <div
                      key={scene.id}
                      onClick={() => setSelectedScene(scene)}
                      className={`p-3 rounded-lg cursor-pointer transition ${
                        selectedScene?.id === scene.id
                          ? 'bg-purple-100 border-2 border-purple-500'
                          : 'bg-gray-50 border-2 border-transparent hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <GripVertical className="h-4 w-4 text-gray-400" />
                        <span className="font-semibold text-sm">Scene {index + 1}</span>
                        <span className="ml-auto text-xs text-gray-600">{scene.duration}s</span>
                      </div>
                      <div className="text-xs text-gray-600 truncate pl-6">
                        {scene.script || 'Empty scene'}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Scene Templates */}
                <div className="mt-4 pt-4 border-t">
                  <div className="text-sm font-semibold text-gray-700 mb-2">Add Scene:</div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => addScene('title')}
                      className="p-2 bg-blue-50 hover:bg-blue-100 rounded text-xs font-semibold text-blue-900 transition"
                    >
                      Title
                    </button>
                    <button
                      onClick={() => addScene('content')}
                      className="p-2 bg-green-50 hover:bg-green-100 rounded text-xs font-semibold text-green-900 transition"
                    >
                      Content
                    </button>
                    <button
                      onClick={() => addScene('image')}
                      className="p-2 bg-orange-50 hover:bg-orange-100 rounded text-xs font-semibold text-orange-900 transition"
                    >
                      Image
                    </button>
                    <button
                      onClick={() => addScene('split')}
                      className="p-2 bg-purple-50 hover:bg-purple-100 rounded text-xs font-semibold text-purple-900 transition"
                    >
                      Split
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Scene Editor */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow p-6">
                {selectedScene ? (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-gray-900">Scene Editor</h2>
                      <button
                        onClick={() => deleteScene(selectedScene.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Scene Preview */}
                    <div
                      className="mb-6 aspect-video rounded-lg flex items-center justify-center text-white text-2xl font-bold"
                      style={{ backgroundColor: selectedScene.background }}
                    >
                      <div className={`text-center px-8 ${
                        selectedScene.textPosition === 'top' ? 'self-start mt-8' :
                        selectedScene.textPosition === 'bottom' ? 'self-end mb-8' :
                        ''
                      }`}>
                        {selectedScene.script || 'Enter script text...'}
                      </div>
                    </div>

                    {/* Script Input */}
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Script / Text
                      </label>
                      <textarea
                        value={selectedScene.script}
                        onChange={(e) => updateScene(selectedScene.id, { script: e.target.value })}
                        placeholder="Enter the script for this scene..."
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-gray-600">
                          {selectedScene.script.length} characters
                        </span>
                        <button className="text-sm text-purple-600 hover:text-purple-700 font-semibold">
                          Generate with AI
                        </button>
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Duration (seconds)
                      </label>
                      <input
                        type="number"
                        value={selectedScene.duration}
                        onChange={(e) => updateScene(selectedScene.id, { duration: parseInt(e.target.value) || 5 })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        min="1"
                        max="60"
                      />
                    </div>

                    {/* Voice Over */}
                    <div className="mb-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedScene.voiceOver}
                          onChange={(e) => updateScene(selectedScene.id, { voiceOver: e.target.checked })}
                          className="w-4 h-4 text-purple-600 rounded"
                        />
                        <Mic className="h-4 w-4 text-gray-600" />
                        <span className="text-sm font-semibold text-gray-700">Enable Voice Over (Text-to-Speech)</span>
                      </label>
                    </div>

                    {/* Background Color */}
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Background Color
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={selectedScene.background}
                          onChange={(e) => updateScene(selectedScene.id, { background: e.target.value })}
                          className="w-16 h-10 rounded border border-gray-300"
                        />
                        <input
                          type="text"
                          value={selectedScene.background}
                          onChange={(e) => updateScene(selectedScene.id, { background: e.target.value })}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>

                    {/* Text Position */}
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Text Position
                      </label>
                      <div className="flex gap-2">
                        {(['top', 'center', 'bottom'] as const).map((pos) => (
                          <button
                            key={pos}
                            onClick={() => updateScene(selectedScene.id, { textPosition: pos })}
                            className={`flex-1 py-2 rounded-lg font-semibold transition ${
                              selectedScene.textPosition === pos
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {pos.charAt(0).toUpperCase() + pos.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Animation */}
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Animation
                      </label>
                      <select
                        value={selectedScene.animation}
                        onChange={(e) => updateScene(selectedScene.id, { animation: e.target.value as any })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="none">None</option>
                        <option value="fade">Fade In</option>
                        <option value="slide">Slide In</option>
                        <option value="zoom">Zoom In</option>
                      </select>
                    </div>

                    {/* Image Upload (for image scenes) */}
                    {selectedScene.type === 'image' && (
                      <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Background Image
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-500 transition cursor-pointer">
                          <ImageIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">Click to upload image</p>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <Video className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Select a scene to edit</p>
                  </div>
                )}
              </div>
            </div>

            {/* Settings Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-8">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Video Settings
                </h2>

                {/* Video Title */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Video Title
                  </label>
                  <input
                    type="text"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    placeholder="e.g., WIOA Program Overview"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                {/* Video Format */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Video Format
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option>16:9 (Landscape)</option>
                    <option>9:16 (Portrait)</option>
                    <option>1:1 (Square)</option>
                  </select>
                </div>

                {/* Resolution */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Resolution
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option>1080p (Full HD)</option>
                    <option>720p (HD)</option>
                    <option>4K (Ultra HD)</option>
                  </select>
                </div>

                {/* Voice */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Voice (Text-to-Speech)
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option>Male - Professional</option>
                    <option>Female - Professional</option>
                    <option>Male - Casual</option>
                    <option>Female - Casual</option>
                  </select>
                </div>

                {/* Background Music */}
                <div className="mb-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-purple-600 rounded" />
                    <span className="text-sm font-semibold text-gray-700">Add Background Music</span>
                  </label>
                </div>

                {/* Templates */}
                <div className="mb-6">
                  <div className="text-sm font-semibold text-gray-700 mb-2">Quick Templates</div>
                  <div className="space-y-2">
                    <button className="w-full text-left px-3 py-2 bg-blue-50 hover:bg-blue-100 rounded text-sm font-semibold text-blue-900 transition">
                      Program Overview
                    </button>
                    <button className="w-full text-left px-3 py-2 bg-green-50 hover:bg-green-100 rounded text-sm font-semibold text-green-900 transition">
                      Success Story
                    </button>
                    <button className="w-full text-left px-3 py-2 bg-orange-50 hover:bg-orange-100 rounded text-sm font-semibold text-orange-900 transition">
                      How to Apply
                    </button>
                  </div>
                </div>

                {/* Export Options */}
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition">
                    <Download className="h-5 w-5" />
                    Export Video
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg font-semibold hover:bg-gray-50 transition">
                    <Save className="h-5 w-5" />
                    Save Project
                  </button>
                </div>
              </div>
            </div>
          </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
