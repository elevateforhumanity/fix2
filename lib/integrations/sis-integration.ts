/**
 * SIS (Student Information System) Integration
 * Sync student data, enrollments, and grades with external SIS platforms
 */

export interface SISStudent {
  sisId: string;
  firstName: string;
  lastName: string;
  email: string;
  studentNumber: string;
  dateOfBirth?: string;
  grade?: string;
  status: 'active' | 'inactive' | 'graduated' | 'withdrawn';
}

export interface SISEnrollment {
  sisId: string;
  studentSisId: string;
  courseSisId: string;
  sectionSisId?: string;
  enrollmentDate: string;
  status: 'active' | 'completed' | 'dropped' | 'withdrawn';
}

export interface SISGrade {
  studentSisId: string;
  courseSisId: string;
  grade: string;
  percentage: number;
  credits: number;
  term: string;
  gradedDate: string;
}

export interface SISConfig {
  provider: 'powerschool' | 'infinite-campus' | 'skyward' | 'custom';
  apiUrl: string;
  apiKey: string;
  clientId?: string;
  clientSecret?: string;
  syncInterval: number; // minutes
  autoSync: boolean;
}

/**
 * PowerSchool Integration
 */
export class PowerSchoolIntegration {
  private config: SISConfig;

  constructor(config: SISConfig) {
    this.config = config;
  }

  async authenticate(): Promise<string> {
    const response = await fetch(`${this.config.apiUrl}/oauth/access_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: this.config.clientId!,
        client_secret: this.config.clientSecret!,
      }),
    });

    const data = await response.json();
    return data.access_token;
  }

  async syncStudents(): Promise<SISStudent[]> {
    const token = await this.authenticate();
    
    const response = await fetch(`${this.config.apiUrl}/ws/v1/student`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });

    const data = await response.json();
    
    return data.students.map((s: any) => ({
      sisId: s.id.toString(),
      firstName: s.name.first_name,
      lastName: s.name.last_name,
      email: s.contact.email,
      studentNumber: s.local_id,
      dateOfBirth: s.demographics.birth_date,
      grade: s.school_enrollment.grade_level,
      status: s.school_enrollment.enroll_status === 0 ? 'active' : 'inactive',
    }));
  }

  async syncEnrollments(studentSisId: string): Promise<SISEnrollment[]> {
    const token = await this.authenticate();
    
    const response = await fetch(
      `${this.config.apiUrl}/ws/v1/student/${studentSisId}/section`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      }
    );

    const data = await response.json();
    
    return data.sections.map((s: any) => ({
      sisId: s.id.toString(),
      studentSisId,
      courseSisId: s.course_number,
      sectionSisId: s.section_number,
      enrollmentDate: s.enrollment_date,
      status: 'active',
    }));
  }

  async pushGrades(grades: SISGrade[]): Promise<void> {
    const token = await this.authenticate();
    
    for (const grade of grades) {
      await fetch(`${this.config.apiUrl}/ws/v1/student/${grade.studentSisId}/grade`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          course_number: grade.courseSisId,
          store_code: grade.term,
          grade: grade.grade,
          percent: grade.percentage,
          credit_earned: grade.credits,
        }),
      });
    }
  }
}

/**
 * Infinite Campus Integration
 */
export class InfiniteCampusIntegration {
  private config: SISConfig;

  constructor(config: SISConfig) {
    this.config = config;
  }

  async syncStudents(): Promise<SISStudent[]> {
    const response = await fetch(`${this.config.apiUrl}/campus/api/person/students`, {
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Accept': 'application/json',
      },
    });

    const data = await response.json();
    
    return data.map((s: any) => ({
      sisId: s.personID.toString(),
      firstName: s.firstName,
      lastName: s.lastName,
      email: s.email,
      studentNumber: s.studentNumber,
      dateOfBirth: s.birthdate,
      grade: s.grade,
      status: s.active ? 'active' : 'inactive',
    }));
  }

  async syncEnrollments(studentSisId: string): Promise<SISEnrollment[]> {
    const response = await fetch(
      `${this.config.apiUrl}/campus/api/enrollment/student/${studentSisId}`,
      {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Accept': 'application/json',
        },
      }
    );

    const data = await response.json();
    
    return data.map((e: any) => ({
      sisId: e.enrollmentID.toString(),
      studentSisId,
      courseSisId: e.courseNumber,
      sectionSisId: e.sectionNumber,
      enrollmentDate: e.startDate,
      status: e.active ? 'active' : 'completed',
    }));
  }

  async pushGrades(grades: SISGrade[]): Promise<void> {
    for (const grade of grades) {
      await fetch(`${this.config.apiUrl}/campus/api/grade`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personID: grade.studentSisId,
          courseNumber: grade.courseSisId,
          termCode: grade.term,
          grade: grade.grade,
          percentage: grade.percentage,
          credits: grade.credits,
        }),
      });
    }
  }
}

/**
 * Generic SIS Integration Factory
 */
export function createSISIntegration(config: SISConfig) {
  switch (config.provider) {
    case 'powerschool':
      return new PowerSchoolIntegration(config);
    case 'infinite-campus':
      return new InfiniteCampusIntegration(config);
    default:
      throw new Error(`Unsupported SIS provider: ${config.provider}`);
  }
}

/**
 * Sync students from SIS to Supabase
 */
export async function syncSISStudents(config: SISConfig) {
  const integration = createSISIntegration(config);
  const students = await integration.syncStudents();
  
  // Import to Supabase
  const { createClient } = await import('@/lib/supabase/server');
  const supabase = await createClient();
  
  for (const student of students) {
    await supabase.from('profiles').upsert({
      sis_id: student.sisId,
      first_name: student.firstName,
      last_name: student.lastName,
      email: student.email,
      student_number: student.studentNumber,
      date_of_birth: student.dateOfBirth,
      grade_level: student.grade,
      status: student.status,
      role: 'student',
    }, {
      onConflict: 'sis_id',
    });
  }
  
  return students.length;
}

/**
 * Sync enrollments from SIS to Supabase
 */
export async function syncSISEnrollments(config: SISConfig, studentSisId: string) {
  const integration = createSISIntegration(config);
  const enrollments = await integration.syncEnrollments(studentSisId);
  
  const { createClient } = await import('@/lib/supabase/server');
  const supabase = await createClient();
  
  for (const enrollment of enrollments) {
    await supabase.from('enrollments').upsert({
      sis_id: enrollment.sisId,
      student_sis_id: enrollment.studentSisId,
      course_sis_id: enrollment.courseSisId,
      section_sis_id: enrollment.sectionSisId,
      enrollment_date: enrollment.enrollmentDate,
      status: enrollment.status,
    }, {
      onConflict: 'sis_id',
    });
  }
  
  return enrollments.length;
}

/**
 * Push grades from Supabase to SIS
 */
export async function pushGradesToSIS(config: SISConfig, courseId: string) {
  const { createClient } = await import('@/lib/supabase/server');
  const supabase = await createClient();
  
  // Get grades to push
  const { data: grades } = await supabase
    .from('grades')
    .select(`
      *,
      student:profiles!student_id(sis_id),
      course:courses!course_id(sis_id)
    `)
    .eq('course_id', courseId)
    .eq('synced_to_sis', false);
  
  if (!grades || grades.length === 0) return 0;
  
  const sisGrades: SISGrade[] = grades.map(g => ({
    studentSisId: g.student.sis_id,
    courseSisId: g.course.sis_id,
    grade: g.letter_grade,
    percentage: g.percentage,
    credits: g.credits || 0,
    term: g.term || 'current',
    gradedDate: g.graded_at,
  }));
  
  const integration = createSISIntegration(config);
  await integration.pushGrades(sisGrades);
  
  // Mark as synced
  await supabase
    .from('grades')
    .update({ synced_to_sis: true, sis_synced_at: new Date().toISOString() })
    .in('id', grades.map(g => g.id));
  
  return grades.length;
}
