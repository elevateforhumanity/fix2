// app/api/lms/courses/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { query } from '@/lib/db';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const courseId = params.id;

    // Fetch course with modules and lessons
    const courseResult = await query(
      `SELECT id, program_code, title, level, delivery_mode, created_at
       FROM courses
       WHERE id = $1`,
      [courseId]
    );

    if (courseResult.rows.length === 0) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    const course = courseResult.rows[0];

    // Fetch modules
    const modulesResult = await query(
      `SELECT id, title, order_index
       FROM course_modules
       WHERE course_id = $1
       ORDER BY order_index ASC`,
      [courseId]
    );

    // Fetch all lessons for these modules
    const moduleIds = modulesResult.rows.map((m) => m.id);
    let lessons: any[] = [];

    if (moduleIds.length > 0) {
      const lessonsResult = await query(
        `SELECT id, module_id, title, type, order_index
         FROM lessons
         WHERE module_id = ANY($1)
         ORDER BY order_index ASC`,
        [moduleIds]
      );
      lessons = lessonsResult.rows;
    }

    // Group lessons by module
    const modules = modulesResult.rows.map((module) => ({
      ...module,
      lessons: lessons.filter((l) => l.module_id === module.id),
    }));

    return NextResponse.json({
      course: {
        ...course,
        modules,
      },
    });
  } catch (error: any) {
    console.error('Error fetching course:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch course' },
      { status: 500 }
    );
  }
}
