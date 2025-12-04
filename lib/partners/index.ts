// lib/partners/index.ts
import {
  BasePartnerAPI,
  PartnerAPIConfig,
  PartnerType,
  StudentData,
  PartnerAccount,
  CourseEnrollment,
  ProgressData,
  CertificateData,
} from "./base";

/**
 * Generic Partner LMS API Implementation
 * Supports multiple partner integrations through configuration
 */
class GenericPartnerAPI extends BasePartnerAPI {
  private apiKey: string;
  private apiSecret: string;

  constructor(partner: PartnerType, config: PartnerAPIConfig) {
    super(partner, config);
    this.apiKey = process.env[`${partner.toUpperCase()}_API_KEY`] || '';
    this.apiSecret = process.env[`${partner.toUpperCase()}_API_SECRET`] || '';
  }

  private async makeRequest(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: any
  ): Promise<any> {
    const url = `${this.config.baseUrl}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
    };

    // Add partner-specific auth headers
    if (this.apiSecret) {
      headers['X-API-Secret'] = this.apiSecret;
    }

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Partner API error (${response.status}): ${errorText}`);
      }

      return await response.json();
    } catch (error: any) {
      console.error(`[${this.partner}] API request failed:`, error);
      throw error;
    }
  }

  async createAccount(student: StudentData): Promise<PartnerAccount> {
    try {
      const response = await this.makeRequest('/users', 'POST', {
        email: student.email,
        first_name: student.firstName,
        last_name: student.lastName,
        external_id: student.id,
      });

      return {
        externalId: response.id || response.user_id,
        username: response.username || student.email,
        loginUrl: response.login_url || `${this.config.baseUrl}/login`,
        passwordPlaintext: response.temporary_password,
      };
    } catch (error) {
      console.error(`[${this.partner}] Failed to create account:`, error);
      throw error;
    }
  }

  async enrollInCourse(
    accountExternalId: string,
    courseExternalCode: string
  ): Promise<CourseEnrollment> {
    try {
      const response = await this.makeRequest('/enrollments', 'POST', {
        user_id: accountExternalId,
        course_id: courseExternalCode,
      });

      return {
        externalEnrollmentId: response.enrollment_id || response.id,
        courseId: courseExternalCode,
        courseName: response.course_name || response.course?.name,
        accessUrl: response.access_url || response.launch_url,
      };
    } catch (error) {
      console.error(`[${this.partner}] Failed to enroll in course:`, error);
      throw error;
    }
  }

  async getProgress(
    externalEnrollmentId: string
  ): Promise<ProgressData | null> {
    try {
      const response = await this.makeRequest(
        `/enrollments/${externalEnrollmentId}/progress`,
        'GET'
      );

      return {
        percentage: response.completion_percentage || response.progress || 0,
        completed: response.completed || response.status === 'completed',
        lastAccessed: response.last_accessed ? new Date(response.last_accessed) : new Date(),
        lessonsCompleted: response.lessons_completed || response.completed_lessons || 0,
        totalLessons: response.total_lessons || response.lesson_count || 0,
      };
    } catch (error) {
      console.error(`[${this.partner}] Failed to get progress:`, error);
      return null;
    }
  }

  async getCertificate(
    externalEnrollmentId: string
  ): Promise<CertificateData | null> {
    try {
      const response = await this.makeRequest(
        `/enrollments/${externalEnrollmentId}/certificate`,
        'GET'
      );

      if (!response || !response.certificate_url) {
        return null;
      }

      return {
        certificateId: response.id || response.certificate_id,
        certificateNumber: response.certificate_number,
        downloadUrl: response.certificate_url || response.download_url,
        issuedDate: response.issued_date ? new Date(response.issued_date) : new Date(),
        expirationDate: response.expiry_date ? new Date(response.expiry_date) : undefined,
        verificationUrl: response.verification_url,
      };
    } catch (error) {
      console.error(`[${this.partner}] Failed to get certificate:`, error);
      return null;
    }
  }

  async getSsoLaunchUrl(params: {
    accountExternalId: string;
    externalEnrollmentId: string;
    returnTo?: string;
  }): Promise<string> {
    try {
      const response = await this.makeRequest('/sso/launch', 'POST', {
        user_id: params.accountExternalId,
        enrollment_id: params.externalEnrollmentId,
        return_url: params.returnTo,
      });

      return response.launch_url || response.sso_url;
    } catch (error) {
      console.error(`[${this.partner}] Failed to generate SSO URL:`, error);
      // Fallback to basic URL
      return `${this.config.baseUrl}/sso/launch?enrollment=${encodeURIComponent(
        params.externalEnrollmentId
      )}`;
    }
  }
}

export function getPartnerClient(partner: PartnerType): BasePartnerAPI {
  // Get partner-specific configuration from environment variables
  const baseUrlKey = `${partner.toUpperCase()}_API_BASE_URL`;
  const baseUrl = process.env[baseUrlKey] || process.env.PARTNER_API_BASE_URL;
  
  const config: PartnerAPIConfig = {
    baseUrl,
  };
  
  // Return real API implementation
  // If no API credentials configured, will throw errors on API calls
  return new GenericPartnerAPI(partner, config);
}

export * from "./base";
