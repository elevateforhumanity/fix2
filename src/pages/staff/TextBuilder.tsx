/**
 * Text/Article Builder
 * Rich text editor for creating written lesson content
 */

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Save, 
  Eye, 
  Bold, 
  Italic, 
  Underline,
  List,
  ListOrdered,
  Link2,
  Image,
  Code,
  Quote,
  Heading1,
  Heading2,
  AlignLeft,
  AlignCenter,
  AlignRight
} from 'lucide-react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

export default function TextBuilder() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const insertFormatting = (format: string) => {
    // Simple formatting insertion - in production, use a proper rich text editor library
    const textarea = document.getElementById('content-editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let formattedText = '';
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'h1':
        formattedText = `# ${selectedText}`;
        break;
      case 'h2':
        formattedText = `## ${selectedText}`;
        break;
      case 'link':
        formattedText = `[${selectedText}](url)`;
        break;
      case 'code':
        formattedText = `\`${selectedText}\``;
        break;
      case 'quote':
        formattedText = `> ${selectedText}`;
        break;
      default:
        formattedText = selectedText;
    }

    const newContent = content.substring(0, start) + formattedText + content.substring(end);
    setContent(newContent);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Text Builder | Staff Portal</title>
      </Helmet>

      <Navigation />

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Text/Article Builder</h1>
              <p className="text-gray-600">Create written content for your lessons</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                <Eye className="h-5 w-5" />
                {showPreview ? 'Edit' : 'Preview'}
              </button>
              <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                <Save className="h-5 w-5" />
                Save Lesson
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Editor */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow">
                {!showPreview ? (
                  <>
                    {/* Toolbar */}
                    <div className="border-b p-4">
                      <div className="flex flex-wrap gap-2">
                        {/* Text Formatting */}
                        <div className="flex gap-1 border-r pr-2">
                          <button
                            onClick={() => insertFormatting('bold')}
                            className="p-2 hover:bg-gray-100 rounded transition"
                            title="Bold"
                          >
                            <Bold className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => insertFormatting('italic')}
                            className="p-2 hover:bg-gray-100 rounded transition"
                            title="Italic"
                          >
                            <Italic className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => insertFormatting('underline')}
                            className="p-2 hover:bg-gray-100 rounded transition"
                            title="Underline"
                          >
                            <Underline className="h-5 w-5" />
                          </button>
                        </div>

                        {/* Headings */}
                        <div className="flex gap-1 border-r pr-2">
                          <button
                            onClick={() => insertFormatting('h1')}
                            className="p-2 hover:bg-gray-100 rounded transition"
                            title="Heading 1"
                          >
                            <Heading1 className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => insertFormatting('h2')}
                            className="p-2 hover:bg-gray-100 rounded transition"
                            title="Heading 2"
                          >
                            <Heading2 className="h-5 w-5" />
                          </button>
                        </div>

                        {/* Lists */}
                        <div className="flex gap-1 border-r pr-2">
                          <button
                            className="p-2 hover:bg-gray-100 rounded transition"
                            title="Bullet List"
                          >
                            <List className="h-5 w-5" />
                          </button>
                          <button
                            className="p-2 hover:bg-gray-100 rounded transition"
                            title="Numbered List"
                          >
                            <ListOrdered className="h-5 w-5" />
                          </button>
                        </div>

                        {/* Alignment */}
                        <div className="flex gap-1 border-r pr-2">
                          <button
                            className="p-2 hover:bg-gray-100 rounded transition"
                            title="Align Left"
                          >
                            <AlignLeft className="h-5 w-5" />
                          </button>
                          <button
                            className="p-2 hover:bg-gray-100 rounded transition"
                            title="Align Center"
                          >
                            <AlignCenter className="h-5 w-5" />
                          </button>
                          <button
                            className="p-2 hover:bg-gray-100 rounded transition"
                            title="Align Right"
                          >
                            <AlignRight className="h-5 w-5" />
                          </button>
                        </div>

                        {/* Insert */}
                        <div className="flex gap-1">
                          <button
                            onClick={() => insertFormatting('link')}
                            className="p-2 hover:bg-gray-100 rounded transition"
                            title="Insert Link"
                          >
                            <Link2 className="h-5 w-5" />
                          </button>
                          <button
                            className="p-2 hover:bg-gray-100 rounded transition"
                            title="Insert Image"
                          >
                            <Image className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => insertFormatting('code')}
                            className="p-2 hover:bg-gray-100 rounded transition"
                            title="Code Block"
                          >
                            <Code className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => insertFormatting('quote')}
                            className="p-2 hover:bg-gray-100 rounded transition"
                            title="Quote"
                          >
                            <Quote className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Title Input */}
                    <div className="p-6 border-b">
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Lesson Title"
                        className="w-full text-3xl font-bold text-gray-900 border-none focus:outline-none"
                      />
                    </div>

                    {/* Content Editor */}
                    <div className="p-6">
                      <textarea
                        id="content-editor"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Start writing your lesson content here...

You can use Markdown formatting:
- **bold text**
- *italic text*
- # Heading 1
- ## Heading 2
- [link text](url)
- `code`
- > quote"
                        className="w-full min-h-[600px] text-gray-900 border-none focus:outline-none resize-none font-mono text-sm"
                      />
                    </div>
                  </>
                ) : (
                  /* Preview */
                  <div className="p-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-8">
                      {title || 'Untitled Lesson'}
                    </h1>
                    <div className="prose prose-lg max-w-none">
                      {content ? (
                        <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }} />
                      ) : (
                        <p className="text-gray-500 italic">No content yet. Start writing to see preview.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Settings Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-8">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Lesson Settings</h2>

                {/* Reading Time */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Estimated Reading Time
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 10 minutes"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Difficulty */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Difficulty Level
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>

                {/* Tags */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tags
                  </label>
                  <input
                    type="text"
                    placeholder="Add tags (comma separated)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Attachments */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Attachments
                  </label>
                  <button className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-blue-500 hover:text-blue-600 transition">
                    + Add Files
                  </button>
                </div>

                {/* Word Count */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Word Count</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {content.split(/\s+/).filter(word => word.length > 0).length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
