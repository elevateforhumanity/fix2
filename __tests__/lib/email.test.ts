import { sendEmail, sendWelcomeEmail, sendEnrollmentEmail } from '@/lib/email';

// Mock fetch globally
global.fetch = jest.fn();

describe('Email Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset environment variables
    process.env.RESEND_API_KEY = 'test_key';
  });

  afterEach(() => {
    delete process.env.RESEND_API_KEY;
  });

  describe('sendEmail', () => {
    it('should send email successfully with API key', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: 'test-email-id' }),
      });

      const result = await sendEmail({
        to: 'test@example.com',
        subject: 'Test Subject',
        html: '<p>Test content</p>',
      });

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.resend.com/emails',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            Authorization: 'Bearer test_key',
            'Content-Type': 'application/json',
          }),
        })
      );

      expect(result).toEqual({ success: true, messageId: 'test-email-id' });
    });

    it('should handle missing API key gracefully', async () => {
      delete process.env.RESEND_API_KEY;

      const result = await sendEmail({
        to: 'test@example.com',
        subject: 'Test Subject',
        html: '<p>Test content</p>',
      });

      expect(global.fetch).not.toHaveBeenCalled();
      expect(result).toEqual({ success: true, messageId: 'dev-mode' });
    });

    it('should handle API errors', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'API Error' }),
      });

      await expect(
        sendEmail({
          to: 'test@example.com',
          subject: 'Test Subject',
          html: '<p>Test content</p>',
        })
      ).rejects.toThrow();
    });
  });

  describe('sendWelcomeEmail', () => {
    it('should send welcome email with correct parameters', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: 'welcome-email-id' }),
      });

      await sendWelcomeEmail({
        to: 'newuser@example.com',
        tenantId: 'tenant-123',
        licenseType: 'Professional',
        validUntil: '2025-12-31',
      });

      expect(global.fetch).toHaveBeenCalled();
      const callArgs = (global.fetch as jest.Mock).mock.calls[0][1];
      const body = JSON.parse(callArgs.body);

      expect(body.to).toEqual(['newuser@example.com']);
      expect(body.subject).toContain('Welcome');
      expect(body.html).toContain('Professional');
      expect(body.html).toContain('tenant-123');
    });
  });

  describe('sendEnrollmentEmail', () => {
    it('should send enrollment email with program details', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: 'enrollment-email-id' }),
      });

      await sendEnrollmentEmail({
        to: 'student@example.com',
        programName: 'Barber Apprenticeship',
        enrollmentId: 'enroll-456',
      });

      expect(global.fetch).toHaveBeenCalled();
      const callArgs = (global.fetch as jest.Mock).mock.calls[0][1];
      const body = JSON.parse(callArgs.body);

      expect(body.to).toEqual(['student@example.com']);
      expect(body.subject).toContain('Barber Apprenticeship');
      expect(body.html).toContain('enroll-456');
    });
  });
});
