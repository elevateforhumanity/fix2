// lib/partners/jri.ts
// JRI (Janitorial Resource Institute) API Integration
// Janitorial and Custodial Training

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

export class JriAPI extends BasePartnerAPI {
  constructor(config: PartnerConfig) {
    super('jri', config);
  }

  protected getDefaultHeaders(): Record<string, string> {
    return {
      ...super.getDefaultHeaders(),
      'X-API-Key': this.config.apiKey || '',
      'X-Organization-Id': this.config.orgId || '',
    };
  }

  async createAccount(student: StudentData): Promise<PartnerAccount> {
    // @ts-expect-error TS2554: Expected 1-2 arguments, but got 3.
    this.log('info', 'Creating JRI account', { studentId: student.id });

    try {
      // @ts-expect-error TS2339: Property 'post' does not exist on type 'unknown'.
      const response = await this.httpClient.post<{
        userId: string;
        username: string;
        portalUrl: string;
      }>('/api/users', {
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        organizationId: this.config.orgId,
      });

      // @ts-expect-error TS2554: Expected 1-2 arguments, but got 3.
      this.log('info', 'JRI account created', {
        externalId: response.data.userId,
      });

      return {
        externalId: response.data.userId,
        username: response.data.username,
        loginUrl: response.data.portalUrl,
      };
    } catch (error: unknown) {
      // @ts-expect-error TS2554: Expected 1-2 arguments, but got 3.
      this.log('error', 'Failed to create JRI account', {
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
    this.log('info', 'Enrolling in JRI course', {
      accountExternalId,
      courseExternalCode,
    });

    try {
      // @ts-expect-error TS2339: Property 'post' does not exist on type 'unknown'.
      const response = await this.httpClient.post<{
        enrollmentId: string;
        courseName: string;
        accessUrl: string;
      }>('/api/enrollments', {
        userId: accountExternalId,
        courseCode: courseExternalCode,
      });

      // @ts-expect-error TS2554: Expected 1-2 arguments, but got 3.
      this.log('info', 'JRI enrollment created', {
        enrollmentId: response.data.enrollmentId,
      });

      return {
        externalEnrollmentId: response.data.enrollmentId,
        courseId: courseExternalCode,
        courseName: response.data.courseName,
        accessUrl: response.data.accessUrl,
      };
    } catch (error: unknown) {
      // @ts-expect-error TS2554: Expected 1-2 arguments, but got 3.
      this.log('error', 'Failed to enroll in JRI course', {
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
    this.log('info', 'Fetching JRI progress', { externalEnrollmentId });

    try {
      // @ts-expect-error TS2339: Property 'get' does not exist on type 'unknown'.
      const response = await this.httpClient.get<{
        percentComplete: number;
        status: string;
        completionDate?: string;
        lastAccessDate?: string;
        modulesCompleted: number;
        totalModules: number;
      }>(`/api/enrollments/${externalEnrollmentId}/progress`);

      const completed = response.data.status === 'completed';

      return {
        percentage: response.data.percentComplete,
        completed,
        completedAt: response.data.completionDate
          ? new Date(response.data.completionDate)
          : undefined,
        lastAccessed: response.data.lastAccessDate
          ? new Date(response.data.lastAccessDate)
          : undefined,
        lessonsCompleted: response.data.modulesCompleted,
        totalLessons: response.data.totalModules,
      };
    } catch (error: unknown) {
      if (error instanceof PartnerAPIError && error.statusCode === 404) {
        return null;
      }
      // @ts-expect-error TS2554: Expected 1-2 arguments, but got 3.
      this.log('error', 'Failed to fetch JRI progress', {
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
    this.log('info', 'Fetching JRI certificate', { externalEnrollmentId });

    try {
      // @ts-expect-error TS2339: Property 'get' does not exist on type 'unknown'.
      const response = await this.httpClient.get<{
        certificateId: string;
        certificateNumber: string;
        issuedDate: string;
        downloadUrl: string;
        verificationUrl: string;
      }>(`/api/enrollments/${externalEnrollmentId}/certificate`);

      return {
        certificateId: response.data.certificateId,
        certificateNumber: response.data.certificateNumber,
        issuedDate: new Date(response.data.issuedDate),
        downloadUrl: response.data.downloadUrl,
        verificationUrl: response.data.verificationUrl,
      };
    } catch (error: unknown) {
      if (error instanceof PartnerAPIError && error.statusCode === 404) {
        return null;
      }
      // @ts-expect-error TS2554: Expected 1-2 arguments, but got 3.
      this.log('error', 'Failed to fetch JRI certificate', {
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
    this.log('info', 'Generating JRI SSO launch URL', params);

    try {
      // @ts-expect-error TS2339: Property 'post' does not exist on type 'unknown'.
      const response = await this.httpClient.post<{
        launchUrl: string;
        expiresAt: string;
      }>('/api/sso/launch', {
        userId: params.accountExternalId,
        enrollmentId: params.externalEnrollmentId,
        returnUrl: params.returnTo,
      });

      return response.data.launchUrl;
    } catch (error: unknown) {
      // @ts-expect-error TS2554: Expected 1-2 arguments, but got 3.
      this.log('error', 'Failed to generate JRI SSO URL', {
        // @ts-expect-error TS2339: Property 'message' does not exist on type 'unknown'.
        error: error.message,
      });
      throw error;
    }
  }
}
