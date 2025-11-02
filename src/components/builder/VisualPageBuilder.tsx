import React, { useState, useRef, useEffect } from 'react';

interface Component {
  id: string;
  type: string;
  content: any;
  styles: Record<string, string>;
}

interface Page {
  id: string;
  title: string;
  components: Component[];
}

const componentLibrary = [
  {
    type: 'hero',
    label: 'Hero Section',
    icon: '🎯',
    defaultContent: {
      title: 'Welcome to Our Platform',
      subtitle: 'Transform your career with our training programs',
      ctaText: 'Get Started',
      ctaLink: '/programs',
    },
  },
  {
    type: 'features',
    label: 'Feature Grid',
    icon: '⭐',
    defaultContent: {
      title: 'Our Features',
      features: [
        {
          icon: '📚',
          title: 'Expert Training',
          description: 'Learn from industry professionals',
        },
        {
          icon: '💼',
          title: 'Job Placement',
          description: '92% placement rate',
        },
        {
          icon: '📱',
          title: 'Mobile Learning',
          description: 'Learn anywhere, anytime',
        },
      ],
    },
  },
  {
    type: 'cta',
    label: 'Call to Action',
    icon: '📢',
    defaultContent: {
      title: 'Ready to Get Started?',
      description: 'Join thousands of successful graduates',
      buttonText: 'Enroll Now',
      buttonLink: '/apply',
    },
  },
  {
    type: 'testimonial',
    label: 'Testimonial',
    icon: '💬',
    defaultContent: {
      quote: 'This program changed my life!',
      author: 'John Doe',
      role: 'Graduate',
      image: '',
    },
  },
];

export const VisualPageBuilder: React.FC = () => {
  const [page, setPage] = useState<Page>({
    id: 'new-page',
    title: 'New Page',
    components: [],
  });
  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    null
  );
  const [isDragging, setIsDragging] = useState(false);
  const [showComponentLibrary, setShowComponentLibrary] = useState(true);

  const addComponent = (componentType: string) => {
    const template = componentLibrary.find((c) => c.type === componentType);
    if (!template) return;

    const newComponent: Component = {
      id: `${componentType}-${Date.now()}`,
      type: componentType,
      content: template.defaultContent,
      styles: {},
    };

    setPage((prev) => ({
      ...prev,
      components: [...prev.components, newComponent],
    }));
  };

  const updateComponent = (id: string, updates: Partial<Component>) => {
    setPage((prev) => ({
      ...prev,
      components: prev.components.map((c) =>
        c.id === id ? { ...c, ...updates } : c
      ),
    }));
  };

  const deleteComponent = (id: string) => {
    setPage((prev) => ({
      ...prev,
      components: prev.components.filter((c) => c.id !== id),
    }));
    setSelectedComponent(null);
  };

  const moveComponent = (id: string, direction: 'up' | 'down') => {
    setPage((prev) => {
      const index = prev.components.findIndex((c) => c.id === id);
      if (index === -1) return prev;
      if (direction === 'up' && index === 0) return prev;
      if (direction === 'down' && index === prev.components.length - 1)
        return prev;

      const newComponents = [...prev.components];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      [newComponents[index], newComponents[targetIndex]] = [
        newComponents[targetIndex],
        newComponents[index],
      ];

      return { ...prev, components: newComponents };
    });
  };

  const renderComponent = (component: Component) => {
    const isSelected = selectedComponent === component.id;

    switch (component.type) {
      case 'hero':
        return (
          <div
            className={`relative bg-gradient-to-r from-blue-600 to-blue-800 text-white p-16 rounded-lg ${
              isSelected ? 'ring-4 ring-blue-500' : ''
            }`}
            onClick={() => setSelectedComponent(component.id)}
          >
            <h1 className="text-5xl font-bold mb-4">
              {component.content.title}
            </h1>
            <p className="text-xl mb-8">{component.content.subtitle}</p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
              {component.content.ctaText}
            </button>
          </div>
        );

      case 'features':
        return (
          <div
            className={`relative p-12 ${isSelected ? 'ring-4 ring-blue-500 rounded-lg' : ''}`}
            onClick={() => setSelectedComponent(component.id)}
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              {component.content.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {component.content.features.map((feature: any, index: number) => (
                <div key={index} className="text-center">
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'cta':
        return (
          <div
            className={`relative bg-blue-50 p-12 rounded-lg text-center ${
              isSelected ? 'ring-4 ring-blue-500' : ''
            }`}
            onClick={() => setSelectedComponent(component.id)}
          >
            <h2 className="text-3xl font-bold mb-4">
              {component.content.title}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {component.content.description}
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700">
              {component.content.buttonText}
            </button>
          </div>
        );

      case 'testimonial':
        return (
          <div
            className={`relative bg-white p-8 rounded-lg shadow-lg ${
              isSelected ? 'ring-4 ring-blue-500' : ''
            }`}
            onClick={() => setSelectedComponent(component.id)}
          >
            <div className="text-4xl text-blue-600 mb-4">"</div>
            <p className="text-lg italic mb-6">{component.content.quote}</p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-4" />
              <div>
                <div className="font-semibold">{component.content.author}</div>
                <div className="text-sm text-gray-600">
                  {component.content.role}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderEditor = () => {
    if (!selectedComponent) return null;

    const component = page.components.find((c) => c.id === selectedComponent);
    if (!component) return null;

    return (
      <div className="p-6 border-t border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-lg">Edit Component</h3>
          <button
            onClick={() => setSelectedComponent(null)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="space-y-4">
          {Object.entries(component.content).map(([key, value]) => {
            if (typeof value === 'string') {
              return (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) =>
                      updateComponent(component.id, {
                        content: {
                          ...component.content,
                          [key]: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              );
            }
            return null;
          })}
          <div className="pt-4 border-t border-gray-200 space-y-2">
            <button
              onClick={() => moveComponent(component.id, 'up')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              ↑ Move Up
            </button>
            <button
              onClick={() => moveComponent(component.id, 'down')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              ↓ Move Down
            </button>
            <button
              onClick={() => deleteComponent(component.id)}
              className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Component Library Sidebar */}
      <div
        className={`w-64 bg-white border-r border-gray-200 overflow-y-auto ${showComponentLibrary ? '' : 'hidden'}`}
      >
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-semibold text-lg">Components</h2>
          <p className="text-sm text-gray-600">Drag or click to add</p>
        </div>
        <div className="p-4 space-y-2">
          {componentLibrary.map((component) => (
            <button
              key={component.type}
              onClick={() => addComponent(component.type)}
              className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
            >
              <div className="text-2xl mb-1">{component.icon}</div>
              <div className="font-medium text-sm">{component.label}</div>
            </button>
          ))}
        </div>
      </div>
      {/* Canvas */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-5xl mx-auto">
          {/* Toolbar */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowComponentLibrary(!showComponentLibrary)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                {showComponentLibrary ? '← Hide' : '→ Show'} Components
              </button>
              <input
                type="text"
                value={page.title}
                onChange={(e) => setPage({ ...page, title: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Page Title"
              />
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                💾 Save Draft
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                🚀 Publish
              </button>
            </div>
          </div>
          {/* Page Canvas */}
          <div className="bg-white rounded-lg shadow-lg min-h-screen p-8">
            {page.components.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <div className="text-6xl mb-4">📄</div>
                <p className="text-lg">Your page is empty</p>
                <p className="text-sm">
                  Add components from the sidebar to get started
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {page.components.map((component) => (
                  <div key={component.id} className="relative group">
                    {renderComponent(component)}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Properties Panel */}
      {selectedComponent && (
        <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
          {renderEditor()}
        </div>
      )}
    </div>
  );
};

export default VisualPageBuilder;
