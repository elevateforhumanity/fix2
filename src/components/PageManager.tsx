import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Page {
  id: string;
  name: string;
  slug: string;
  page_type: string;
  description: string;
  html: string;
  status: string;
  version: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

interface PageVersion {
  id: string;
  version: number;
  html: string;
  created_at: string;
}

export default function PageManager() {
  const [pages, setPages] = useState<Page[]>([]);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [versions, setVersions] = useState<PageVersion[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editedHtml, setEditedHtml] = useState('');

  useEffect(() => {
    loadPages();
  }, []);

  useEffect(() => {
    if (selectedPage) {
      loadVersions(selectedPage.id);
      setEditedHtml(selectedPage.html);
    }
  }, [selectedPage]);

  async function loadPages() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('generated_pages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPages(data || []);
    } catch (error) {
      console.error('Failed to load pages:', error);
    } finally {
      setLoading(false);
    }
  }

  async function loadVersions(pageId: string) {
    try {
      const { data, error } = await supabase
        .from('page_versions')
        .select('*')
        .eq('page_id', pageId)
        .order('version', { ascending: false });

      if (error) throw error;
      setVersions(data || []);
    } catch (error) {
      console.error('Failed to load versions:', error);
    }
  }

  async function updatePageStatus(pageId: string, status: string) {
    try {
      const updates: any = { status };
      if (status === 'published') {
        updates.published_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('generated_pages')
        .update(updates)
        .eq('id', pageId);

      if (error) throw error;

      alert(`Page ${status} successfully!`);
      loadPages();
    } catch (error: any) {
      console.error('Failed to update status:', error);
      alert('Failed to update page status: ' + error.message);
    }
  }

  async function deletePage(pageId: string) {
    if (!confirm('Are you sure you want to delete this page?')) return;

    try {
      const { error } = await supabase
        .from('generated_pages')
        .delete()
        .eq('id', pageId);

      if (error) throw error;

      alert('Page deleted successfully!');
      setSelectedPage(null);
      loadPages();
    } catch (error: any) {
      console.error('Failed to delete page:', error);
      alert('Failed to delete page: ' + error.message);
    }
  }

  async function saveEdits() {
    if (!selectedPage) return;

    try {
      const { error } = await supabase
        .from('generated_pages')
        .update({ html: editedHtml })
        .eq('id', selectedPage.id);

      if (error) throw error;

      alert('Changes saved successfully!');
      setEditMode(false);
      loadPages();
      // Reload the selected page
      const { data } = await supabase
        .from('generated_pages')
        .select('*')
        .eq('id', selectedPage.id)
        .single();
      if (data) setSelectedPage(data);
    } catch (error: any) {
      console.error('Failed to save edits:', error);
      alert('Failed to save changes: ' + error.message);
    }
  }

  async function rollbackToVersion(version: PageVersion) {
    if (!selectedPage) return;
    if (!confirm(`Rollback to version ${version.version}?`)) return;

    try {
      const { error } = await supabase
        .from('generated_pages')
        .update({ html: version.html })
        .eq('id', selectedPage.id);

      if (error) throw error;

      alert('Rolled back successfully!');
      loadPages();
      const { data } = await supabase
        .from('generated_pages')
        .select('*')
        .eq('id', selectedPage.id)
        .single();
      if (data) setSelectedPage(data);
    } catch (error: any) {
      console.error('Failed to rollback:', error);
      alert('Failed to rollback: ' + error.message);
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-red-600 mb-2">Page Manager</h1>
        <p className="text-gray-600">Manage, edit, and publish your AI-generated pages</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pages List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-orange-500 px-4 py-3">
              <h2 className="text-lg font-semibold text-white">All Pages ({pages.length})</h2>
            </div>

            <div className="divide-y divide-gray-200">
              {pages.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  No pages yet. Create one with the AI Page Builder!
                </div>
              ) : (
                pages.map((page) => (
                  <div
                    key={page.id}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedPage?.id === page.id ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => setSelectedPage(page)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{page.name}</h3>
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(page.status)}`}>
                        {page.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">/{page.slug}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <span className="mr-3">v{page.version}</span>
                      <span>{new Date(page.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Page Details */}
        <div className="lg:col-span-2">
          {selectedPage ? (
            <div className="space-y-6">
              {/* Actions */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedPage.name}</h2>
                    <p className="text-gray-600">/{selectedPage.slug}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedPage.status)}`}>
                    {selectedPage.status}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  {selectedPage.status === 'draft' && (
                    <button
                      onClick={() => updatePageStatus(selectedPage.id, 'published')}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Publish
                    </button>
                  )}
                  {selectedPage.status === 'published' && (
                    <button
                      onClick={() => updatePageStatus(selectedPage.id, 'draft')}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Unpublish
                    </button>
                  )}
                  <button
                    onClick={() => setEditMode(!editMode)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    {editMode ? 'Cancel Edit' : 'Edit HTML'}
                  </button>
                  <button
                    onClick={() => updatePageStatus(selectedPage.id, 'archived')}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Archive
                  </button>
                  <button
                    onClick={() => deletePage(selectedPage.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                </div>

                {selectedPage.published_at && (
                  <div className="mt-4 text-sm text-gray-600">
                    Published: {new Date(selectedPage.published_at).toLocaleString()}
                  </div>
                )}
              </div>

              {/* Edit Mode */}
              {editMode ? (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit HTML</h3>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 font-mono text-sm"
                    rows={20}
                    value={editedHtml}
                    onChange={(e) => setEditedHtml(e.target.value)}
                  />
                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={saveEdits}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => {
                        setEditMode(false);
                        setEditedHtml(selectedPage.html);
                      }}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                /* Preview */
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="bg-gray-100 px-6 py-3 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Preview</h3>
                  </div>
                  <div
                    className="p-6 overflow-auto"
                    style={{ maxHeight: '600px' }}
                    dangerouslySetInnerHTML={{ __html: selectedPage.html }}
                  />
                </div>
              )}

              {/* Version History */}
              {versions.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Version History ({versions.length})
                  </h3>
                  <div className="space-y-2">
                    {versions.map((version) => (
                      <div
                        key={version.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <span className="font-medium text-gray-900">Version {version.version}</span>
                          <span className="text-sm text-gray-600 ml-3">
                            {new Date(version.created_at).toLocaleString()}
                          </span>
                        </div>
                        <button
                          onClick={() => rollbackToVersion(version)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Rollback
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <svg
                className="mx-auto h-24 w-24 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Page Selected</h3>
              <p className="text-gray-500">Select a page from the list to view and manage it</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
