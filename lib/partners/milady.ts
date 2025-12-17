// lib/partners/milady.ts
// Milady RISE API Integration
// Cosmetology, Barbering, Beauty Industry Training

import {
  BasePartnerAPI,
  StudentData,
  PartnerAccount,
  CourseEnrollment,
  ProgressData,
  CertificateData,
} from './base';
import { PartnerConfig } from './config';
import { PartnerAPIError } from './http-client';

// Get Milady config from Vercel environment variables
function getMiladyConfig(): PartnerConfig {
  return {
    apiKey:
      process.env.MILADY_API_KEY ||
      process.env.NEXT_PUBLIC_MILADY_API_KEY ||
      '',
    baseUrl: process.env.MILADY_API_URL || 'https://api.miladytraining.com',
    orgId: process.env.MILADY_SCHOOL_ID || '',
    // @ts-expect-error TS2353: Object literal may only specify known properties, and 'enabled' does not exis...
    enabled: true,
  };
}

// Singleton instance
let miladyInstance: MiladyAPI | null = null;

export function getMiladyAPI(): MiladyAPI {
  if (!miladyInstance) {
    miladyInstance = new MiladyAPI(getMiladyConfig());
  }
  return miladyInstance;
}

// Helper functions for easy use
export async function createAccount(
  student: StudentData,
  apiKey?: string
): Promise<PartnerAccount> {
  const api = apiKey
    ? new MiladyAPI({ ...getMiladyConfig(), apiKey })
    : getMiladyAPI();
  return api.createAccount(student);
}

export async function enrollInCourse(
  accountExternalId: string,
  courseExternalCode: string,
  apiKey?: string
): Promise<CourseEnrollment> {
  const api = apiKey
    ? new MiladyAPI({ ...getMiladyConfig(), apiKey })
    : getMiladyAPI();
  return api.enrollInCourse(accountExternalId, courseExternalCode);
}

export async function getSsoLaunchUrl(
  accountExternalId: string,
  externalEnrollmentId: string,
  apiKey?: string,
  returnTo?: string
): Promise<string> {
  const api = apiKey
    ? new MiladyAPI({ ...getMiladyConfig(), apiKey })
    : getMiladyAPI();
  return api.getSsoLaunchUrl({
    accountExternalId,
    externalEnrollmentId,
    returnTo,
  });
}

export class MiladyAPI extends BasePartnerAPI {
  constructor(config: PartnerConfig) {
    super('milady', config);
  }

  protected getDefaultHeaders(): Record<string, string> {
    return {
      ...super.getDefaultHeaders(),
      Authorization: `Bearer ${this.config.apiKey}`,
      'X-School-Id': this.config.orgId || '',
    };
  }

  async createAccount(student: StudentData): Promise<PartnerAccount> {
    // @ts-expect-error TS2554: Expected 1-2 arguments, but got 3.
    this.log('info', 'Creating Milady RISE account', {
      studentId: student.id,
    });

    try {
      // @ts-expect-error TS2339: Property 'post' does not exist on type 'unknown'.
      const response = await this.httpClient.post<{
        studentId: string;
        username: string;
        accessUrl: string;
      }>('/api/v1/students', {
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        schoolId: this.config.orgId,
      });

      // @ts-expect-error TS2554: Expected 1-2 arguments, but got 3.
      this.log('info', 'Milady RISE account created', {
        externalId: response.data.studentId,
      });

      return {
        externalId: response.data.studentId,
        username: response.data.username,
        loginUrl: response.data.accessUrl,
      };
    } catch (error: unknown) {
      // @ts-expect-error TS2554: Expected 1-2 arguments, but got 3.
      this.log('error', 'Failed to create Milady RISE account', {
        // @ts-expect-error TS2339: Property 'message' does not exist on type 'unknown'.
        error: error.message,
      });
      throw error;
    }
  }

  async enrollInCourse(
    accountExternalId: string,
    courseExternalCode: string
  ): Promise<CourseEnrollment> {
    // @ts-expect-error TS2554: Expected 1-2 arguments, but got 3.
    this.log('info', 'Enrolling in Milady RISE course', {
      accountExternalId,
      courseExternalCode,
    });

    try {
      // @ts-expect-error TS2339: Property 'post' does not exist on type 'unknown'.
      const response = await this.httpClient.post<{
        enrollmentId: string;
        courseName: string;
        courseUrl: string;
      }>('/api/v1/enrollments', {
        studentId: accountExternalId,
        courseCode: courseExternalCode,
        schoolId: this.config.orgId,
      });

      // @ts-expect-error TS2554: Expected 1-2 arguments, but got 3.
      this.log('info', 'Milady RISE enrollment created', {
        enrollmentId: response.data.enrollmentId,
      });

      return {
        externalEnrollmentId: response.data.enrollmentId,
        courseId: courseExternalCode,
        courseName: response.data.courseName,
        accessUrl: response.data.courseUrl,
      };
    } catch (error: unknown) {
      // @ts-expect-error TS2554: Expected 1-2 arguments, but got 3.
      this.log('error', 'Failed to enroll in Milady RISE course', {
        // @ts-expect-error TS2339: Property 'message' does not exist on type 'unknown'.
        error: error.message,
      });
      throw error;
    }
  }

  async getProgress(
    externalEnrollmentId: string
  ): Promise<ProgressData | null> {
    // @ts-expect-error TS2554: Expected 1-2 arguments, but got 3.
    this.log('info', 'Fetching Milady RISE progress', {
      externalEnrollmentId,
    });

    try {
      // @ts-expect-error TS2339: Property 'get' does not exist on type 'unknown'.
      const response = await this.httpClient.get<{
        progressPercent: number;
        status: string;
        completedDate?: string;
        lastActivityDate?: string;
        lessonsCompleted: number;
        totalLessons: number;
      }>(`/api/v1/enrollments/${externalEnrollmentId}/progress`);

      const completed = response.data.status === 'completed';

      return {
        percentage: response.data.progressPercent,
        completed,
        completedAt: response.data.completedDate
          ? new Date(response.data.completedDate)
          : undefined,
        lastAccessed: response.data.lastActivityDate
          ? new Date(response.data.lastActivityDate)
          : undefined,
        lessonsCompleted: response.data.lessonsCompleted,
        totalLessons: response.data.totalLessons,
      };
    } catch (error: unknown) {
      if (error instanceof PartnerAPIError && error.statusCode === 404) {
        return null;
      }
      // @ts-expect-error TS2554: Expected 1-2 arguments, but got 3.
      this.log('error', 'Failed to fetch Milady RISE progress', {
        // @ts-expect-error TS2339: Property 'message' does not exist on type 'unknown'.
        error: error.message,
      });
      throw error;
    }
  }

  async getCertificate(
    externalEnrollmentId: string
  ): Promise<CertificateData | null> {
    // @ts-expect-error TS2554: Expected 1-2 arguments, but got 3.
    this.log('info', 'Fetching Milady RISE certificate', {
      externalEnrollmentId,
    });

    try {
      // @ts-expect-error TS2339: Property 'get' does not exist on type 'unknown'.
      const response = await this.httpClient.get<{
        certificateId: string;
        certificateNumber: string;
        issuedDate: string;
        downloadUrl: string;
      }>(`/api/v1/enrollments/${externalEnrollmentId}/certificate`);

      return {
        certificateId: response.data.certificateId,
        certificateNumber: response.data.certificateNumber,
        issuedDate: new Date(response.data.issuedDate),
        downloadUrl: response.data.downloadUrl,
      };
    } catch (error: unknown) {
      if (error instanceof PartnerAPIError && error.statusCode === 404) {
        return null;
      }
      // @ts-expect-error TS2554: Expected 1-2 arguments, but got 3.
      this.log('error', 'Failed to fetch Milady RISE certificate', {
        // @ts-expect-error TS2339: Property 'message' does not exist on type 'unknown'.
        error: error.message,
      });
      throw error;
    }
  }

  async getSsoLaunchUrl(params: {
    accountExternalId: string;
    externalEnrollmentId: string;
    returnTo?: string;
  }): Promise<string> {
    // @ts-expect-error TS2554: Expected 1-2 arguments, but got 3.
    this.log('info', 'Generating Milady RISE SSO launch URL', params);

    try {
      // @ts-expect-error TS2339: Property 'post' does not exist on type 'unknown'.
      const response = await this.httpClient.post<{
        launchUrl: string;
        expiresIn: number;
      }>('/api/v1/sso/launch', {
        studentId: params.accountExternalId,
        enrollmentId: params.externalEnrollmentId,
        returnUrl: params.returnTo,
      });

      return response.data.launchUrl;
    } catch (error: unknown) {
      // @ts-expect-error TS2554: Expected 1-2 arguments, but got 3.
      this.log('error', 'Failed to generate Milady RISE SSO URL', {
        // @ts-expect-error TS2339: Property 'message' does not exist on type 'unknown'.
        error: error.message,
      });
      throw error;
    }
  }
}
