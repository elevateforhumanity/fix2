// lib/partners/base.ts
// Shared types + abstract base for all partner LMS APIs
export type PartnerType =
  | "hsi"
  | "certiport"
  | "careersafe"
  | "milady"
  | "jri"
  | "nrf"
  | "nds";
export interface StudentData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: string;
}
export interface PartnerAccount {
  externalId: string;
  username: string;
  loginUrl: string;
  passwordPlaintext?: string;
}
export interface CourseEnrollment {
  externalEnrollmentId: string;
  courseId: string;
  courseName?: string;
  accessUrl?: string;
}
export interface ProgressData {
  percentage: number;
  completed: boolean;
  completedAt?: Date;
  lastAccessed?: Date;
  lessonsCompleted?: number;
  totalLessons?: number;
}
export interface CertificateData {
  certificateId: string;
  certificateNumber?: string;
  issuedDate: Date;
  expirationDate?: Date;
  downloadUrl: string;
  verificationUrl?: string;
}
export interface PartnerAPIConfig {
  baseUrl?: string;
  apiKey?: string;
  apiSecret?: string;
  orgId?: string;
}
/**
 * Abstract class – each real partner (HSI, Certiport, etc.)
 * will implement these methods using THEIR official API docs.
 */
export abstract class BasePartnerAPI {
  protected config: PartnerAPIConfig;
  protected partner: PartnerType;
  protected httpClient: unknown; // HTTP client for API calls
  constructor(partner: PartnerType, config: PartnerAPIConfig = {}) {
    this.partner = partner;
    this.config = config;
    this.httpClient = null; // Initialize as needed in subclasses
  }
  /**
   * Logging helper
   */
  protected log(message: string, data?: any): void {
    }] ${message}`, data || '');
  }
  /**
   * Get default headers for API requests
   */
  protected getDefaultHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      'User-Agent': 'ElevateForHumanity/1.0',
    };
  }
  abstract createAccount(student: StudentData): Promise<PartnerAccount>;
  abstract enrollInCourse(
    accountExternalId: string,
    courseExternalCode: string
  ): Promise<CourseEnrollment>;
  abstract getProgress(
    externalEnrollmentId: string
  ): Promise<ProgressData | null>;
  abstract getCertificate(
    externalEnrollmentId: string
  ): Promise<CertificateData | null>;
  /**
   * Create SSO / deep link so student can jump straight into the course
   */
  abstract getSsoLaunchUrl(params: {
    accountExternalId: string;
    externalEnrollmentId: string;
    returnTo?: string;
  }): Promise<string>;
}
