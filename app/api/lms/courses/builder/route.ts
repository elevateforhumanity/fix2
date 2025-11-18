// app/api/lms/courses/builder/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { query } from '@/lib/db';

type LessonInput = {
  id: string;
  title: string;
  type: 'video' | 'reading' | 'quiz' | 'assignment';
};

type ModuleInput = {
  id: string;
  title: string;
  lessons: LessonInput[];
};

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { program_code, title, level, delivery_mode, modules } = body;

    if (!program_code || !title || !level || !delivery_mode) {
      return NextResponse.json(
        { error: 'Missing required fields: program_code, title, level, delivery_mode' },
        { status: 400 }
      );
    }

    if (!Array.isArray(modules) || modules.length === 0) {
      return NextResponse.json(
        { error: 'At least one module is required' },
        { status: 400 }
      );
    }

    // Create the course
    const courseResult = await query(
      `INSERT INTO courses (program_code, title, level, delivery_mode, created_by, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
       RETURNING id`,
      [program_code, title, level, delivery_mode, session.user.id]
    );

    const courseId = courseResult.rows[0].id;

    // Create modules and lessons
    for (let moduleIndex = 0; moduleIndex < modules.length; moduleIndex++) {
      const module = modules[moduleIndex] as ModuleInput;

      const moduleResult = await query(
        `INSERT INTO course_modules (course_id, title, order_index, created_at, updated_at)
         VALUES ($1, $2, $3, NOW(), NOW())
         RETURNING id`,
        [courseId, module.title, moduleIndex + 1]
      );

      const moduleId = moduleResult.rows[0].id;

      // Create lessons for this module
      if (Array.isArray(module.lessons)) {
        for (let lessonIndex = 0; lessonIndex < module.lessons.length; lessonIndex++) {
          const lesson = module.lessons[lessonIndex];

          await query(
            `INSERT INTO lessons (module_id, title, type, order_index, created_at, updated_at)
             VALUES ($1, $2, $3, $4, NOW(), NOW())`,
            [moduleId, lesson.title, lesson.type, lessonIndex + 1]
          );
        }
      }
    }

    // Log the course creation
    await query(
      `INSERT INTO activity_logs (user_id, action, entity_type, entity_id, details, created_at)
       VALUES ($1, 'create', 'course', $2, $3, NOW())`,
      [
        session.user.id,
        courseId,
        JSON.stringify({
          program_code,
          title,
          level,
          delivery_mode,
          module_count: modules.length,
          lesson_count: modules.reduce(
            (sum: number, m: ModuleInput) => sum + (m.lessons?.length || 0),
            0
          )
        })
      ]
    );

    return NextResponse.json({
      success: true,
      courseId,
      message: 'Course created successfully'
    });
  } catch (error: any) {
    console.error('Error creating course:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create course' },
      { status: 500 }
    );
  }
}
