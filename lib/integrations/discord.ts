/**
 * Discord Webhook Integration
 * Handles notifications and alerts to Discord channels
 */

interface DiscordConfig {
  webhookUrl: string;
}

interface DiscordEmbed {
  title?: string;
  description?: string;
  color?: number;
  fields?: Array<{ name: string; value: string; inline?: boolean }>;
  footer?: { text: string; icon_url?: string };
  timestamp?: string;
  thumbnail?: { url: string };
  image?: { url: string };
}

interface DiscordMessage {
  content?: string;
  embeds?: DiscordEmbed[];
  username?: string;
  avatar_url?: string;
}

class DiscordClient {
  private config: DiscordConfig;

  constructor(config: DiscordConfig) {
    this.config = config;
  }

  async sendMessage(message: string | DiscordMessage): Promise<void> {
    const payload: DiscordMessage = typeof message === 'string'
      ? { content: message }
      : message;

    const response = await fetch(this.config.webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Discord webhook failed: ${response.statusText}`);
    }
  }

  async sendEmbed(embed: DiscordEmbed): Promise<void> {
    await this.sendMessage({
      embeds: [embed],
      username: 'Elevate for Humanity',
    });
  }

  async sendEnrollmentAlert(studentName: string, courseName: string, enrollmentDate: string): Promise<void> {
    const embed: DiscordEmbed = {
      title: '🎓 New Course Enrollment',
      description: 'A student has enrolled in a course',
      color: 0x0F766E,
      fields: [
        { name: 'Student', value: studentName, inline: true },
        { name: 'Course', value: courseName, inline: true },
        { name: 'Date', value: enrollmentDate, inline: false },
      ],
      timestamp: new Date().toISOString(),
    };

    await this.sendEmbed(embed);
  }

  async sendCompletionAlert(studentName: string, courseName: string, completionDate: string): Promise<void> {
    const embed: DiscordEmbed = {
      title: '🏆 Course Completion',
      description: 'A student has completed a course',
      color: 0x10B981,
      fields: [
        { name: 'Student', value: studentName, inline: true },
        { name: 'Course', value: courseName, inline: true },
        { name: 'Completion Date', value: completionDate, inline: false },
      ],
      timestamp: new Date().toISOString(),
    };

    await this.sendEmbed(embed);
  }

  async sendErrorAlert(error: string, context?: Record<string, string>): Promise<void> {
    const fields = context
      ? Object.entries(context).map(([name, value]) => ({ name, value, inline: true }))
      : [];

    const embed: DiscordEmbed = {
      title: '❌ Error Alert',
      description: error,
      color: 0xEF4444,
      fields,
      timestamp: new Date().toISOString(),
    };

    await this.sendEmbed(embed);
  }

  async sendPerformanceAlert(pageName: string, loadTime: number): Promise<void> {
    const embed: DiscordEmbed = {
      title: '⚠️ Performance Alert',
      description: 'Slow page load detected',
      color: 0xF59E0B,
      fields: [
        { name: 'Page', value: pageName, inline: true },
        { name: 'Load Time', value: `${loadTime}ms`, inline: true },
        { name: 'Threshold', value: '3000ms', inline: true },
      ],
      timestamp: new Date().toISOString(),
    };

    await this.sendEmbed(embed);
  }

  async sendPaymentAlert(amount: number, customerEmail: string, courseName: string): Promise<void> {
    const embed: DiscordEmbed = {
      title: '💰 Payment Received',
      description: 'A new payment has been processed',
      color: 0x10B981,
      fields: [
        { name: 'Amount', value: `$${(amount / 100).toFixed(2)}`, inline: true },
        { name: 'Customer', value: customerEmail, inline: true },
        { name: 'Course', value: courseName, inline: false },
      ],
      timestamp: new Date().toISOString(),
    };

    await this.sendEmbed(embed);
  }
}

export function createDiscordClient(): DiscordClient | null {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    if (process.env.NODE_ENV === 'development') {
    }
    return null;
  }

  return new DiscordClient({ webhookUrl });
}

export const discord = createDiscordClient();
