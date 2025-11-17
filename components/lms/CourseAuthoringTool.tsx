'use client';

import { useState, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Plus, GripVertical, Trash2, Edit, Eye, Save, Video, FileText, Image, Code, CheckSquare, Link as LinkIcon } from 'lucide-react';

interface ContentBlock {
  id: string;
  type: 'text' | 'video' | 'image' | 'quiz' | 'code' | 'file' | 'embed';
  order: number;
  content: any;
  settings?: any;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  blocks: ContentBlock[];
}

interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export default function CourseAuthoringTool() {
  const [modules, setModules] = useState<Module[]>([]);
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  // Add new module
  const addModule = () => {
    const newModule: Module = {
      id: `module-${Date.now()}`,
      title: 'New Module',
      description: '',
      lessons: []
    };
    setModules([...modules, newModule]);
    setActiveModule(newModule.id);
  };

  // Add new lesson to module
  const addLesson = (moduleId: string) => {
    const newLesson: Lesson = {
      id: `lesson-${Date.now()}`,
      title: 'New Lesson',
      description: '',
      blocks: []
    };
    
    setModules(modules.map(module => 
      module.id === moduleId 
        ? { ...module, lessons: [...module.lessons, newLesson] }
        : module
    ));
    setActiveLesson(newLesson.id);
  };

  // Add content block to lesson
  const addBlock = (moduleId: string, lessonId: string, blockType: ContentBlock['type']) => {
    const newBlock: ContentBlock = {
      id: `block-${Date.now()}`,
      type: blockType,
      order: 0,
      content: getDefaultContent(blockType)
    };

    setModules(modules.map(module => 
      module.id === moduleId 
        ? {
            ...module,
            lessons: module.lessons.map(lesson =>
              lesson.id === lessonId
                ? { ...lesson, blocks: [...lesson.blocks, newBlock] }
                : lesson
            )
          }
        : module
    ));
  };

  // Get default content for block type
  const getDefaultContent = (type: ContentBlock['type']) => {
    switch (type) {
      case 'text':
        return { html: '<p>Enter your text here...</p>' };
      case 'video':
        return { url: '', title: '', duration: 0 };
      case 'image':
        return { url: '', alt: '', caption: '' };
      case 'quiz':
        return { questions: [], passingScore: 70 };
      case 'code':
        return { code: '', language: 'javascript' };
      case 'file':
        return { url: '', filename: '', size: 0 };
      case 'embed':
        return { embedCode: '', url: '' };
      default:
        return {};
    }
  };

  // Handle drag and drop
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination, type } = result;

    if (type === 'module') {
      const newModules = Array.from(modules);
      const [removed] = newModules.splice(source.index, 1);
      newModules.splice(destination.index, 0, removed);
      setModules(newModules);
    } else if (type === 'lesson') {
      // Handle lesson reordering within modules
      const moduleId = source.droppableId.replace('lessons-', '');
      setModules(modules.map(module => {
        if (module.id === moduleId) {
          const newLessons = Array.from(module.lessons);
          const [removed] = newLessons.splice(source.index, 1);
          newLessons.splice(destination.index, 0, removed);
          return { ...module, lessons: newLessons };
        }
        return module;
      }));
    } else if (type === 'block') {
      // Handle block reordering within lessons
      const [moduleId, lessonId] = source.droppableId.replace('blocks-', '').split('-');
      setModules(modules.map(module => {
        if (module.id === moduleId) {
          return {
            ...module,
            lessons: module.lessons.map(lesson => {
              if (lesson.id === lessonId) {
                const newBlocks = Array.from(lesson.blocks);
                const [removed] = newBlocks.splice(source.index, 1);
                newBlocks.splice(destination.index, 0, removed);
                return { ...lesson, blocks: newBlocks };
              }
              return lesson;
            })
          };
        }
        return module;
      }));
    }
  };

  // Delete module
  const deleteModule = (moduleId: string) => {
    if (confirm('Are you sure you want to delete this module?')) {
      setModules(modules.filter(m => m.id !== moduleId));
      if (activeModule === moduleId) setActiveModule(null);
    }
  };

  // Delete lesson
  const deleteLesson = (moduleId: string, lessonId: string) => {
    if (confirm('Are you sure you want to delete this lesson?')) {
      setModules(modules.map(module =>
        module.id === moduleId
          ? { ...module, lessons: module.lessons.filter(l => l.id !== lessonId) }
          : module
      ));
      if (activeLesson === lessonId) setActiveLesson(null);
    }
  };

  // Delete block
  const deleteBlock = (moduleId: string, lessonId: string, blockId: string) => {
    setModules(modules.map(module =>
      module.id === moduleId
        ? {
            ...module,
            lessons: module.lessons.map(lesson =>
              lesson.id === lessonId
                ? { ...lesson, blocks: lesson.blocks.filter(b => b.id !== blockId) }
                : lesson
            )
          }
        : module
    ));
  };

  // Save course
  const saveCourse = async () => {
    try {
      const courseData = {
        modules: modules.map((module, moduleIndex) => ({
          ...module,
          order: moduleIndex,
          lessons: module.lessons.map((lesson, lessonIndex) => ({
            ...lesson,
            order: lessonIndex,
            blocks: lesson.blocks.map((block, blockIndex) => ({
              ...block,
              order: blockIndex
            }))
          }))
        }))
      };

      const response = await fetch('/api/courses/authoring/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseData)
      });

      if (response.ok) {
        alert('Course saved successfully!');
      }
    } catch (error) {
      console.error('Error saving course:', error);
      alert('Failed to save course');
    }
  };

  const blockIcons = {
    text: FileText,
    video: Video,
    image: Image,
    quiz: CheckSquare,
    code: Code,
    file: FileText,
    embed: LinkIcon
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Course Authoring Tool</h1>
          <p className="text-sm text-gray-600">Create engaging courses with drag-and-drop simplicity</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Eye className="w-4 h-4" />
            {previewMode ? 'Edit Mode' : 'Preview'}
          </button>
          <button
            onClick={saveCourse}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Save className="w-4 h-4" />
            Save Course
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Module/Lesson Tree */}
        <div className="w-80 bg-white border-r overflow-y-auto">
          <div className="p-4">
            <button
              onClick={addModule}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              Add Module
            </button>
          </div>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="modules" type="module">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="px-4 pb-4">
                  {modules.map((module, moduleIndex) => (
                    <Draggable key={module.id} draggableId={module.id} index={moduleIndex}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="mb-4 bg-gray-50 rounded-lg border border-gray-200"
                        >
                          {/* Module Header */}
                          <div className="p-3 flex items-center gap-2">
                            <div {...provided.dragHandleProps}>
                              <GripVertical className="w-4 h-4 text-gray-400" />
                            </div>
                            <div className="flex-1">
                              <input
                                type="text"
                                value={module.title}
                                onChange={(e) => {
                                  setModules(modules.map(m =>
                                    m.id === module.id ? { ...m, title: e.target.value } : m
                                  ));
                                }}
                                className="w-full font-semibold bg-transparent border-none focus:outline-none"
                              />
                            </div>
                            <button
                              onClick={() => addLesson(module.id)}
                              className="p-1 hover:bg-gray-200 rounded"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteModule(module.id)}
                              className="p-1 hover:bg-red-100 rounded text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Lessons */}
                          <Droppable droppableId={`lessons-${module.id}`} type="lesson">
                            {(provided) => (
                              <div {...provided.droppableProps} ref={provided.innerRef} className="px-3 pb-2">
                                {module.lessons.map((lesson, lessonIndex) => (
                                  <Draggable key={lesson.id} draggableId={lesson.id} index={lessonIndex}>
                                    {(provided) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        className={`mb-2 p-2 bg-white rounded border ${
                                          activeLesson === lesson.id ? 'border-blue-500' : 'border-gray-200'
                                        }`}
                                        onClick={() => {
                                          setActiveModule(module.id);
                                          setActiveLesson(lesson.id);
                                        }}
                                      >
                                        <div className="flex items-center gap-2">
                                          <div {...provided.dragHandleProps}>
                                            <GripVertical className="w-3 h-3 text-gray-400" />
                                          </div>
                                          <input
                                            type="text"
                                            value={lesson.title}
                                            onChange={(e) => {
                                              setModules(modules.map(m =>
                                                m.id === module.id
                                                  ? {
                                                      ...m,
                                                      lessons: m.lessons.map(l =>
                                                        l.id === lesson.id ? { ...l, title: e.target.value } : l
                                                      )
                                                    }
                                                  : m
                                              ));
                                            }}
                                            className="flex-1 text-sm bg-transparent border-none focus:outline-none"
                                            onClick={(e) => e.stopPropagation()}
                                          />
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              deleteLesson(module.id, lesson.id);
                                            }}
                                            className="p-1 hover:bg-red-100 rounded text-red-600"
                                          >
                                            <Trash2 className="w-3 h-3" />
                                          </button>
                                        </div>
                                        <div className="text-xs text-gray-500 ml-5 mt-1">
                                          {lesson.blocks.length} blocks
                                        </div>
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          {activeModule && activeLesson ? (
            <div className="max-w-4xl mx-auto p-8">
              {modules
                .find(m => m.id === activeModule)
                ?.lessons.find(l => l.id === activeLesson) && (
                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    {modules.find(m => m.id === activeModule)?.lessons.find(l => l.id === activeLesson)?.title}
                  </h2>
                  <textarea
                    placeholder="Lesson description..."
                    value={modules.find(m => m.id === activeModule)?.lessons.find(l => l.id === activeLesson)?.description || ''}
                    onChange={(e) => {
                      setModules(modules.map(m =>
                        m.id === activeModule
                          ? {
                              ...m,
                              lessons: m.lessons.map(l =>
                                l.id === activeLesson ? { ...l, description: e.target.value } : l
                              )
                            }
                          : m
                      ));
                    }}
                    className="w-full p-3 border rounded-lg mb-6 resize-none"
                    rows={2}
                  />

                  {/* Content Blocks */}
                  <div className="space-y-4 mb-6">
                    {modules
                      .find(m => m.id === activeModule)
                      ?.lessons.find(l => l.id === activeLesson)
                      ?.blocks.map((block, index) => {
                        const Icon = blockIcons[block.type];
                        return (
                          <div key={block.id} className="border rounded-lg p-4 bg-white">
                            <div className="flex items-center gap-2 mb-3">
                              <GripVertical className="w-4 h-4 text-gray-400" />
                              <Icon className="w-4 h-4 text-gray-600" />
                              <span className="text-sm font-medium capitalize">{block.type} Block</span>
                              <div className="flex-1" />
                              <button
                                onClick={() => deleteBlock(activeModule, activeLesson, block.id)}
                                className="p-1 hover:bg-red-100 rounded text-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <BlockEditor block={block} moduleId={activeModule} lessonId={activeLesson} setModules={setModules} modules={modules} />
                          </div>
                        );
                      })}
                  </div>

                  {/* Add Block Buttons */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <p className="text-sm text-gray-600 mb-4 text-center">Add content to your lesson</p>
                    <div className="grid grid-cols-4 gap-3">
                      {(['text', 'video', 'image', 'quiz', 'code', 'file', 'embed'] as const).map((type) => {
                        const Icon = blockIcons[type];
                        return (
                          <button
                            key={type}
                            onClick={() => addBlock(activeModule, activeLesson, type)}
                            className="flex flex-col items-center gap-2 p-4 border rounded-lg hover:bg-gray-50 hover:border-blue-500"
                          >
                            <Icon className="w-6 h-6 text-gray-600" />
                            <span className="text-sm capitalize">{type}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              <div className="text-center">
                <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-lg">Select a lesson to start editing</p>
                <p className="text-sm">or create a new module to get started</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Block Editor Component
function BlockEditor({ block, moduleId, lessonId, setModules, modules }: any) {
  const updateBlockContent = (content: any) => {
    setModules(modules.map((m: Module) =>
      m.id === moduleId
        ? {
            ...m,
            lessons: m.lessons.map((l: Lesson) =>
              l.id === lessonId
                ? {
                    ...l,
                    blocks: l.blocks.map((b: ContentBlock) =>
                      b.id === block.id ? { ...b, content } : b
                    )
                  }
                : l
            )
          }
        : m
    ));
  };

  switch (block.type) {
    case 'text':
      return (
        <textarea
          value={block.content.html}
          onChange={(e) => updateBlockContent({ html: e.target.value })}
          className="w-full p-3 border rounded resize-none"
          rows={6}
          placeholder="Enter your text content here..."
        />
      );
    
    case 'video':
      return (
        <div className="space-y-3">
          <input
            type="text"
            value={block.content.url}
            onChange={(e) => updateBlockContent({ ...block.content, url: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="Video URL (YouTube, Vimeo, or direct link)"
          />
          <input
            type="text"
            value={block.content.title}
            onChange={(e) => updateBlockContent({ ...block.content, title: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="Video title"
          />
        </div>
      );
    
    case 'image':
      return (
        <div className="space-y-3">
          <input
            type="text"
            value={block.content.url}
            onChange={(e) => updateBlockContent({ ...block.content, url: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="Image URL"
          />
          <input
            type="text"
            value={block.content.alt}
            onChange={(e) => updateBlockContent({ ...block.content, alt: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="Alt text (for accessibility)"
          />
          <input
            type="text"
            value={block.content.caption}
            onChange={(e) => updateBlockContent({ ...block.content, caption: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="Caption (optional)"
          />
        </div>
      );
    
    case 'quiz':
      return (
        <div className="p-4 bg-blue-50 rounded">
          <p className="text-sm text-blue-900">Quiz builder will open in a modal</p>
          <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Configure Quiz
          </button>
        </div>
      );
    
    case 'code':
      return (
        <div className="space-y-3">
          <select
            value={block.content.language}
            onChange={(e) => updateBlockContent({ ...block.content, language: e.target.value })}
            className="p-2 border rounded"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
          </select>
          <textarea
            value={block.content.code}
            onChange={(e) => updateBlockContent({ ...block.content, code: e.target.value })}
            className="w-full p-3 border rounded font-mono text-sm resize-none"
            rows={10}
            placeholder="Enter your code here..."
          />
        </div>
      );
    
    case 'file':
      return (
        <div className="space-y-3">
          <input
            type="text"
            value={block.content.url}
            onChange={(e) => updateBlockContent({ ...block.content, url: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="File URL"
          />
          <input
            type="text"
            value={block.content.filename}
            onChange={(e) => updateBlockContent({ ...block.content, filename: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="Filename"
          />
        </div>
      );
    
    case 'embed':
      return (
        <textarea
          value={block.content.embedCode}
          onChange={(e) => updateBlockContent({ ...block.content, embedCode: e.target.value })}
          className="w-full p-3 border rounded font-mono text-sm resize-none"
          rows={6}
          placeholder="Paste embed code here (iframe, etc.)"
        />
      );
    
    default:
      return <div>Unknown block type</div>;
  }
}
