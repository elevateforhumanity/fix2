// lib/partners/careersafe.ts
// CareerSafe API Integration
// OSHA 10, OSHA 30, Safety Training

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

export class CareerSafeAPI extends BasePartnerAPI {
  constructor(config: PartnerConfig) {
    super('careersafe', config);
  }

  protected getDefaultHeaders(): Record<string, string> {
    return {
      ...super.getDefaultHeaders(),
      'X-API-Key': this.config.apiKey || '',
      'X-Organization-Code': this.config.orgId || '',
    };
  }

  async createAccount(student: StudentData): Promise<PartnerAccount> {
    // @ts-expect-error TS2554: Expected 1-2 arguments, but got 3.
    this.log('info', 'Creating CareerSafe account', {
      studentId: student.id,
    });

    try {
      // @ts-expect-error TS2339: Property 'post' does not exist on type 'unknown'.
      const response = await this.httpClient.post<{
        memberId: string;
        username: string;
        loginUrl: string;
        temporaryPassword?: string;
      }>('/api/members', {
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        organizationCode: this.config.orgId,
      });

      // @ts-expect-error TS2554: Expected 1-2 arguments, but got 3.
      this.log('info', 'CareerSafe account created', {
        externalId: response.data.memberId,
      });

      return {
        externalId: response.data.memberId,
        username: response.data.username,
        loginUrl: response.data.loginUrl,
        passwordPlaintext: response.data.temporaryPassword,
      };
    } catch (error: unknown) {
      // @ts-expect-error TS2554: Expected 1-2 arguments, but got 3.
      this.log('error', 'Failed to create CareerSafe account', {
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
    this.log('info', 'Enrolling in CareerSafe course', {
      accountExternalId,
      courseExternalCode,
    });

    try {
      // @ts-expect-error TS2339: Property 'post' does not exist on type 'unknown'.
      const response = await this.httpClient.post<{
        enrollmentId: string;
        courseName: string;
        courseUrl: string;
      }>('/api/enrollments', {
        memberId: accountExternalId,
        courseCode: courseExternalCode,
        organizationCode: this.config.orgId,
      });

      // @ts-expect-error TS2554: Expected 1-2 arguments, but got 3.
      this.log('info', 'CareerSafe enrollment created', {
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
      this.log('error', 'Failed to enroll in CareerSafe course', {
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
    this.log('info', 'Fetching CareerSafe progress', {
      externalEnrollmentId,
    });

    try {
      // @ts-expect-error TS2339: Property 'get' does not exist on type 'unknown'.
      const response = await this.httpClient.get<{
        percentComplete: number;
        status: string;
        completionDate?: string;
        lastAccessDate?: string;
        chaptersCompleted: number;
        totalChapters: number;
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
        lessonsCompleted: response.data.chaptersCompleted,
        totalLessons: response.data.totalChapters,
      };
    } catch (error: unknown) {
      if (error instanceof PartnerAPIError && error.statusCode === 404) {
        return null;
      }
      // @ts-expect-error TS2554: Expected 1-2 arguments, but got 3.
      this.log('error', 'Failed to fetch CareerSafe progress', {
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
    this.log('info', 'Fetching CareerSafe certificate', {
      externalEnrollmentId,
    });

    try {
      // @ts-expect-error TS2339: Property 'get' does not exist on type 'unknown'.
      const response = await this.httpClient.get<{
        certificateId: string;
        cardNumber: string;
        issueDate: string;
        expirationDate: string;
        pdfUrl: string;
        verificationUrl: string;
      }>(`/api/enrollments/${externalEnrollmentId}/certificate`);

      return {
        certificateId: response.data.certificateId,
        certificateNumber: response.data.cardNumber,
        issuedDate: new Date(response.data.issueDate),
        expirationDate: new Date(response.data.expirationDate),
        downloadUrl: response.data.pdfUrl,
        verificationUrl: response.data.verificationUrl,
      };
    } catch (error: unknown) {
      if (error instanceof PartnerAPIError && error.statusCode === 404) {
        return null;
      }
      // @ts-expect-error TS2554: Expected 1-2 arguments, but got 3.
      this.log('error', 'Failed to fetch CareerSafe certificate', {
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
    this.log('info', 'Generating CareerSafe SSO launch URL', params);

    try {
      // @ts-expect-error TS2339: Property 'post' does not exist on type 'unknown'.
      const response = await this.httpClient.post<{
        launchUrl: string;
        expiresAt: string;
      }>('/api/sso/launch', {
        memberId: params.accountExternalId,
        enrollmentId: params.externalEnrollmentId,
        returnUrl: params.returnTo,
      });

      return response.data.launchUrl;
    } catch (error: unknown) {
      // @ts-expect-error TS2554: Expected 1-2 arguments, but got 3.
      this.log('error', 'Failed to generate CareerSafe SSO URL', {
        // @ts-expect-error TS2339: Property 'message' does not exist on type 'unknown'.
        error: error.message,
      });
      throw error;
    }
  }
}
