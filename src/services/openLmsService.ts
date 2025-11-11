/**
 * Open LMS Integration Service
 * Connects our custom frontend to Open LMS (Moodle) backend
 */

import axios, { AxiosInstance } from 'axios';

interface OpenLMSConfig {
  url: string;
  token: string;
}

interface MoodleCourse {
  id: number;
  fullname: string;
  shortname: string;
  categoryid: number;
  summary: string;
  summaryformat: number;
  startdate: number;
  enddate: number;
  visible: number;
  format: string;
}

interface MoodleUser {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  department?: string;
  institution?: string;
}

interface CourseProgress {
  userid: number;
  courseid: number;
  completed: boolean;
  progress: number;
  timecompleted?: number;
}

interface GradeItem {
  id: number;
  itemname: string;
  itemtype: string;
  graderaw: number;
  grademax: number;
  grademin: number;
  gradedatesubmitted: number;
  gradedategraded: number;
  feedback: string;
}

export class OpenLMSService {
  private client: AxiosInstance;
  private config: OpenLMSConfig;

  constructor(config?: OpenLMSConfig) {
    this.config = config || {
      url: process.env.VITE_OPEN_LMS_URL || '',
      token: process.env.VITE_OPEN_LMS_TOKEN || '',
    };

    this.client = axios.create({
      baseURL: `${this.config.url}/webservice/rest/server.php`,
      params: {
        wstoken: this.config.token,
        moodlewsrestformat: 'json',
      },
    });
  }

  /**
   * Generic API call to Open LMS
   */
  private async call<T>(wsfunction: string, params: Record<string, any> = {}): Promise<T> {
    try {
      const response = await this.client.post('', null, {
        params: {
          wsfunction,
          ...params,
        },
      });

      if (response.data.exception) {
        throw new Error(response.data.message || 'Open LMS API error');
      }

      return response.data;
    } catch (error) {
      console.error(`Open LMS API Error (${wsfunction}):`, error);
      throw error;
    }
  }

  // ============================================
  // SITE INFORMATION
  // ============================================

  async getSiteInfo() {
    return this.call('core_webservice_get_site_info');
  }

  // ============================================
  // COURSE MANAGEMENT
  // ============================================

  async getCourses(ids?: number[]): Promise<MoodleCourse[]> {
    return this.call<MoodleCourse[]>('core_course_get_courses', {
      options: ids ? { ids } : {},
    });
  }

  async getCoursesByField(field: string, value: string): Promise<MoodleCourse[]> {
    return this.call<MoodleCourse[]>('core_course_get_courses_by_field', {
      field,
      value,
    });
  }

  async getCourseContents(courseid: number): Promise<any> {
    return this.call('core_course_get_contents', { courseid });
  }

  async createCourse(course: {
    fullname: string;
    shortname: string;
    categoryid: number;
    summary?: string;
    format?: string;
  }): Promise<MoodleCourse> {
    return this.call<MoodleCourse>('core_course_create_courses', {
      courses: [course],
    });
  }

  async updateCourse(course: Partial<MoodleCourse> & { id: number }): Promise<void> {
    return this.call('core_course_update_courses', {
      courses: [course],
    });
  }

  async deleteCourse(courseid: number): Promise<void> {
    return this.call('core_course_delete_courses', {
      courseids: [courseid],
    });
  }

  // ============================================
  // USER MANAGEMENT
  // ============================================

  async getUsers(criteria?: { key: string; value: string }[]): Promise<MoodleUser[]> {
    return this.call<MoodleUser[]>('core_user_get_users', {
      criteria: criteria || [],
    });
  }

  async getUserById(userid: number): Promise<MoodleUser> {
    const users = await this.call<MoodleUser[]>('core_user_get_users_by_field', {
      field: 'id',
      values: [userid],
    });
    return users[0];
  }

  async createUser(user: {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    email: string;
    auth?: string;
  }): Promise<MoodleUser> {
    return this.call<MoodleUser>('core_user_create_users', {
      users: [{ auth: 'manual', ...user }],
    });
  }

  async updateUser(user: Partial<MoodleUser> & { id: number }): Promise<void> {
    return this.call('core_user_update_users', {
      users: [user],
    });
  }

  async deleteUser(userid: number): Promise<void> {
    return this.call('core_user_delete_users', {
      userids: [userid],
    });
  }

  // ============================================
  // ENROLLMENT
  // ============================================

  async enrollUser(userid: number, courseid: number, roleid: number = 5): Promise<void> {
    // roleid 5 = Student
    return this.call('enrol_manual_enrol_users', {
      enrolments: [
        {
          roleid,
          userid,
          courseid,
        },
      ],
    });
  }

  async unenrollUser(userid: number, courseid: number): Promise<void> {
    return this.call('enrol_manual_unenrol_users', {
      enrolments: [
        {
          userid,
          courseid,
        },
      ],
    });
  }

  async getEnrolledUsers(courseid: number): Promise<MoodleUser[]> {
    return this.call<MoodleUser[]>('core_enrol_get_enrolled_users', {
      courseid,
    });
  }

  async getEnrolledCourses(userid: number): Promise<MoodleCourse[]> {
    return this.call<MoodleCourse[]>('core_enrol_get_users_courses', {
      userid,
    });
  }

  // ============================================
  // PROGRESS TRACKING
  // ============================================

  async getCourseProgress(userid: number, courseid: number): Promise<CourseProgress> {
    const completion = await this.call<any>('core_completion_get_course_completion_status', {
      userid,
      courseid,
    });

    return {
      userid,
      courseid,
      completed: completion.completionstatus?.completed || false,
      progress: completion.completionstatus?.progress || 0,
      timecompleted: completion.completionstatus?.timecompleted,
    };
  }

  async getActivityCompletion(userid: number, courseid: number): Promise<any> {
    return this.call('core_completion_get_activities_completion_status', {
      userid,
      courseid,
    });
  }

  async updateActivityCompletion(
    userid: number,
    cmid: number,
    completed: boolean
  ): Promise<void> {
    return this.call('core_completion_update_activity_completion_status_manually', {
      cmid,
      completed: completed ? 1 : 0,
    });
  }

  // ============================================
  // GRADES
  // ============================================

  async getGrades(userid: number, courseid: number): Promise<GradeItem[]> {
    const response = await this.call<any>('gradereport_user_get_grade_items', {
      userid,
      courseid,
    });
    return response.usergrades?.[0]?.gradeitems || [];
  }

  async updateGrade(
    courseid: number,
    component: string,
    activityid: number,
    userid: number,
    grade: number
  ): Promise<void> {
    return this.call('core_grades_update_grades', {
      source: component,
      courseid,
      component,
      activityid,
      itemnumber: 0,
      grades: [
        {
          studentid: userid,
          grade,
        },
      ],
    });
  }

  // ============================================
  // COMPETENCIES (Moodle's Competency Framework)
  // ============================================

  async getCompetencies(courseid: number): Promise<any> {
    return this.call('core_competency_list_course_competencies', {
      id: courseid,
    });
  }

  async getUserCompetencies(userid: number, courseid: number): Promise<any> {
    return this.call('core_competency_list_user_competencies_in_course', {
      userid,
      courseid,
    });
  }

  async gradeCompetency(userid: number, competencyid: number, grade: number): Promise<void> {
    return this.call('core_competency_grade_competency', {
      userid,
      competencyid,
      grade,
    });
  }

  // ============================================
  // ASSIGNMENTS
  // ============================================

  async getAssignments(courseids: number[]): Promise<any> {
    return this.call('mod_assign_get_assignments', {
      courseids,
    });
  }

  async getSubmissions(assignid: number): Promise<any> {
    return this.call('mod_assign_get_submissions', {
      assignmentids: [assignid],
    });
  }

  async submitAssignment(
    assignid: number,
    userid: number,
    data: { text?: string; files?: any[] }
  ): Promise<void> {
    return this.call('mod_assign_save_submission', {
      assignmentid: assignid,
      plugindata: {
        onlinetext_editor: {
          text: data.text || '',
          format: 1,
        },
        files_filemanager: data.files || [],
      },
    });
  }

  // ============================================
  // CERTIFICATES
  // ============================================

  async getCertificates(userid: number): Promise<any> {
    return this.call('mod_customcert_get_issued_certificates', {
      userid,
    });
  }

  async issueCertificate(certificateid: number, userid: number): Promise<void> {
    return this.call('mod_customcert_issue_certificate', {
      certificateid,
      userid,
    });
  }

  // ============================================
  // REPORTS
  // ============================================

  async getCourseReport(courseid: number): Promise<any> {
    return this.call('core_course_get_course_module_completion', {
      courseid,
    });
  }

  async getUserReport(userid: number): Promise<any> {
    return this.call('core_user_get_user_preferences', {
      userid,
    });
  }

  // ============================================
  // MESSAGING
  // ============================================

  async sendMessage(touserid: number, message: string): Promise<void> {
    return this.call('core_message_send_instant_messages', {
      messages: [
        {
          touserid,
          text: message,
        },
      ],
    });
  }

  async getMessages(userid: number): Promise<any> {
    return this.call('core_message_get_messages', {
      useridto: userid,
    });
  }

  // ============================================
  // FILE MANAGEMENT
  // ============================================

  async uploadFile(file: File, contextid: number, component: string, filearea: string): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('contextid', contextid.toString());
    formData.append('component', component);
    formData.append('filearea', filearea);
    formData.append('filepath', '/');
    formData.append('filename', file.name);

    const response = await axios.post(`${this.config.url}/webservice/upload.php`, formData, {
      params: {
        token: this.config.token,
      },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  }

  // ============================================
  // HEALTH CHECK
  // ============================================

  async healthCheck(): Promise<{ status: 'healthy' | 'unhealthy'; message: string }> {
    try {
      const siteInfo = await this.getSiteInfo();
      return {
        status: 'healthy',
        message: `Connected to ${siteInfo.sitename}`,
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        message: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

// Singleton instance
let openLmsInstance: OpenLMSService | null = null;

export function getOpenLMSService(config?: OpenLMSConfig): OpenLMSService {
  if (!openLmsInstance) {
    openLmsInstance = new OpenLMSService(config);
  }
  return openLmsInstance;
}

export default OpenLMSService;
