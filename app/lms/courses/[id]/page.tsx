'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  CheckCircle2, 
  Circle, 
  Lock,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  FileText,
  Video,
  HelpCircle
} from 'lucide-react';

// Mock course data - replace with Supabase
const courseData = {
  id: 1,
  title: 'Barber Fundamentals',
  instructor: 'Master Barber Johnson',
  progress: 65,
  modules: [
    {
      id: 1,
      title: 'Introduction to Barbering',
      lessons: [
        { id: 1, title: 'Welcome & Course Overview', type: 'video', duration: '10:30', completed: true, locked: false },
        { id: 2, title: 'History of Barbering', type: 'video', duration: '15:20', completed: true, locked: false },
        { id: 3, title: 'Tools & Equipment', type: 'video', duration: '20:15', completed: true, locked: false },
        { id: 4, title: 'Module 1 Quiz', type: 'quiz', duration: '10 min', completed: true, locked: false },
      ]
    },
    {
      id: 2,
      title: 'Basic Cutting Techniques',
      lessons: [
        { id: 5, title: 'Clipper Fundamentals', type: 'video', duration: '25:40', completed: true, locked: false },
        { id: 6, title: 'Scissor Techniques', type: 'video', duration: '30:15', completed: true, locked: false },
        { id: 7, title: 'Blending & Fading', type: 'video', duration: '35:20', completed: true, locked: false },
        { id: 8, title: 'Practice Assignment', type: 'assignment', duration: '1 week', completed: false, locked: false },
      ]
    },
    {
      id: 3,
      title: 'Advanced Cutting Techniques',
      lessons: [
        { id: 9, title: 'Texturizing Methods', type: 'video', duration: '28:30', completed: false, locked: false },
        { id: 10, title: 'Razor Techniques', type: 'video', duration: '32:45', completed: false, locked: true },
        { id: 11, title: 'Creative Designs', type: 'video', duration: '40:00', completed: false, locked: true },
        { id: 12, title: 'Final Assessment', type: 'quiz', duration: '30 min', completed: false, locked: true },
      ]
    },
  ]
};

const getLessonIcon = (type: string) => {
  switch (type) {
    case 'video': return Video;
    case 'quiz': return HelpCircle;
    case 'assignment': return FileText;
    default: return BookOpen;
  }
};

export default function CoursePage({ params }: { params: { id: string } }) {
  const [currentLesson, setCurrentLesson] = useState(9);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/lms/courses">
                  <ChevronLeft className="h-5 w-5" />
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold">{courseData.title}</h1>
                <p className="text-sm text-muted-foreground">{courseData.instructor}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">
                <div className="text-sm text-muted-foreground">Your Progress</div>
                <div className="text-lg font-bold">{courseData.progress}%</div>
              </div>
              <Button variant="outline" asChild>
                <Link href="/lms/dashboard">Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video bg-black flex items-center justify-center">
                  <Play className="h-20 w-20 text-white opacity-50" />
                </div>
              </CardContent>
            </Card>

            {/* Lesson Info */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>Texturizing Methods</CardTitle>
                    <p className="text-sm text-muted-foreground mt-2">
                      Learn advanced texturizing techniques for different hair types and styles
                    </p>
                  </div>
                  <Badge>28:30</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Mark Complete
                  </Button>
                  <Button variant="outline">
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  <Button variant="outline">
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Lesson Content */}
            <Card>
              <CardHeader>
                <CardTitle>Lesson Overview</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <p>
                  In this lesson, you'll learn professional texturizing methods that add dimension 
                  and movement to haircuts. We'll cover:
                </p>
                <ul>
                  <li>Point cutting techniques</li>
                  <li>Slide cutting for texture</li>
                  <li>Notching and channeling</li>
                  <li>Thinning shear applications</li>
                </ul>
                <h3>Learning Objectives</h3>
                <ul>
                  <li>Understand when to use different texturizing methods</li>
                  <li>Master point cutting for soft edges</li>
                  <li>Apply slide cutting for volume control</li>
                  <li>Use thinning shears effectively</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Course Curriculum */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Course Curriculum</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
                  {courseData.modules.map((module) => (
                    <div key={module.id} className="border-b last:border-0">
                      <div className="p-4 bg-muted/50 font-semibold">
                        {module.title}
                      </div>
                      <div>
                        {module.lessons.map((lesson) => {
                          const Icon = getLessonIcon(lesson.type);
                          const isActive = lesson.id === currentLesson;
                          
                          return (
                            <button
                              key={lesson.id}
                              onClick={() => !lesson.locked && setCurrentLesson(lesson.id)}
                              disabled={lesson.locked}
                              className={`
                                w-full text-left p-4 border-b last:border-0 
                                hover:bg-accent transition-colors
                                ${isActive ? 'bg-accent' : ''}
                                ${lesson.locked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                              `}
                            >
                              <div className="flex items-start gap-3">
                                <div className="mt-1">
                                  {lesson.locked ? (
                                    <Lock className="h-4 w-4 text-muted-foreground" />
                                  ) : lesson.completed ? (
                                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                                  ) : (
                                    <Circle className="h-4 w-4 text-muted-foreground" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Icon className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                                    <span className="text-sm font-medium truncate">
                                      {lesson.title}
                                    </span>
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {lesson.duration}
                                  </div>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
