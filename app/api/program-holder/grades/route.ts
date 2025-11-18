// app/api/program-holder/grades/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { query } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const programCode = searchParams.get('program_code');
    const cohortId = searchParams.get('cohort_id');

    // Get all grades for students in the program holder's programs
    let gradesQuery = `
      SELECT 
        g.id,
        g.score,
        g.max_score,
        g.passed,
        g.graded_at,
        g.student_id,
        u.full_name as student_name,
        u.email as student_email,
        c.id as course_id,
        c.title as course_title,
        q.title as quiz_title,
        a.title as assignment_title
      FROM grades g
      INNER JOIN users u ON g.student_id = u.id
      INNER JOIN courses c ON g.course_id = c.id
      LEFT JOIN quizzes q ON g.quiz_id = q.id
      LEFT JOIN assignments a ON g.assignment_id = a.id
      WHERE 1=1
    `;

    const params: any[] = [];
    let paramIndex = 1;

    if (programCode) {
      gradesQuery += ` AND c.program_code = $${paramIndex}`;
      params.push(programCode);
      paramIndex++;
    }

    if (cohortId) {
      gradesQuery += ` AND EXISTS (
        SELECT 1 FROM enrollments e
        WHERE e.student_id = g.student_id
        AND e.course_id = g.course_id
        AND e.cohort_id = $${paramIndex}
      )`;
      params.push(cohortId);
      paramIndex++;
    }

    gradesQuery += ` ORDER BY g.graded_at DESC LIMIT 100`;

    const result = await query(gradesQuery, params);

    // Calculate summary stats
    const grades = result.rows;
    const totalGrades = grades.length;
    const passedGrades = grades.filter((g) => g.passed).length;
    const averageScore =
      totalGrades > 0
        ? Math.round(
            grades.reduce((sum, g) => sum + (g.score / g.max_score) * 100, 0) /
              totalGrades
          )
        : 0;

    // Group by student
    const studentGrades = grades.reduce((acc: any, grade) => {
      if (!acc[grade.student_id]) {
        acc[grade.student_id] = {
          student_id: grade.student_id,
          student_name: grade.student_name,
          student_email: grade.student_email,
          grades: [],
          average: 0,
          passed: 0,
          total: 0,
        };
      }
      acc[grade.student_id].grades.push(grade);
      acc[grade.student_id].total++;
      if (grade.passed) {
        acc[grade.student_id].passed++;
      }
      return acc;
    }, {});

    // Calculate averages for each student
    Object.values(studentGrades).forEach((student: any) => {
      student.average =
        student.total > 0
          ? Math.round(
              student.grades.reduce(
                (sum: number, g: any) => sum + (g.score / g.max_score) * 100,
                0
              ) / student.total
            )
          : 0;
    });

    return NextResponse.json({
      summary: {
        total_grades: totalGrades,
        passed_grades: passedGrades,
        average_score: averageScore,
      },
      students: Object.values(studentGrades),
      recent_grades: grades.slice(0, 20),
    });
  } catch (error: any) {
    console.error('Error fetching grades:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch grades' },
      { status: 500 }
    );
  }
}
