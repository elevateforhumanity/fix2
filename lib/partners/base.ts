// lib/partners/base.ts
// Shared types + abstract base for all partner LMS APIs

import { HttpClient, PartnerAPIError } from "./http-client";
import { PartnerConfig } from "./config";

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

export interface WebhookPayload {
  event: string;
  timestamp: string;
  data: any;
}

/**
 * Abstract class – each real partner (HSI, Certiport, etc.)
 * will implement these methods using THEIR official API docs.
 */
export abstract class BasePartnerAPI {
  protected config: PartnerConfig;
  protected partner: PartnerType;
  protected httpClient: HttpClient;

  constructor(partner: PartnerType, config: PartnerConfig) {
    this.partner = partner;
    this.config = config;
    this.httpClient = new HttpClient({
      baseUrl: config.baseUrl,
      timeout: config.timeout,
      retryAttempts: config.retryAttempts,
      retryDelay: config.retryDelay,
      headers: this.getDefaultHeaders(),
    });
  }

  protected getDefaultHeaders(): Record<string, string> {
    return {
      "User-Agent": "ElevateForHumanity/1.0",
      Accept: "application/json",
    };
  }

  protected log(level: "info" | "warn" | "error", message: string, data?: any) {
    const logData = {
      partner: this.partner,
      level,
      message,
      timestamp: new Date().toISOString(),
      ...(data && { data }),
    };

    if (level === "error") {
      console.error("[PartnerAPI]", logData);
    } else if (level === "warn") {
      console.warn("[PartnerAPI]", logData);
    } else {
      console.log("[PartnerAPI]", logData);
    }
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

  abstract getSsoLaunchUrl(params: {
    accountExternalId: string;
    externalEnrollmentId: string;
    returnTo?: string;
  }): Promise<string>;

  /**
   * Verify webhook signature (override per partner)
   */
  verifyWebhookSignature(
    payload: string,
    signature: string,
    secret: string
  ): boolean {
    return true;
  }

  /**
   * Process webhook payload (override per partner)
   */
  async processWebhook(payload: WebhookPayload): Promise<void> {
    this.log("info", "Webhook received", { event: payload.event });
  }
}

export { PartnerAPIError };
