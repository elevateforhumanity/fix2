import type {
  Connector,
  ConnectorContext,
  ConnectorExecuteResult,
} from '../types';

const LTI_KEY_NAMES = ['LTI_CLIENT_ID', 'LTI_PRIVATE_KEY', 'LTI_PLATFORM_URL'];

export class LtiDeepLinkConnector implements Connector {
  readonly id = 'lti-1p3-deeplink';
  readonly displayName = 'LTI 1.3 Deep Linking';
  readonly category = 'lti' as const;
  readonly description =
    'Publishes LMS content using the LTI 1.3 Deep Linking flow.';

  async verify({ runtime }: ConnectorContext): Promise<ConnectorExecuteResult> {
    const missing: string[] = [];
    for (const key of LTI_KEY_NAMES) {
      const value = await runtime.resolveSecret(key);
      if (!value) missing.push(key);
    }

    if (missing.length) {
      runtime.emit({
        connectorId: this.id,
        category: this.category,
        level: 'warn',
        message: 'Missing required LTI secrets',
        details: { missing },
        timestamp: new Date().toISOString(),
      });

      return {
        success: false,
        error: `Missing required secrets: ${missing.join(', ')}`,
      };
    }

    return { success: true };
  }

  async sync({ runtime }: ConnectorContext): Promise<ConnectorExecuteResult> {
    runtime.emit({
      connectorId: this.id,
      category: this.category,
      level: 'info',
      message: 'Sync invoked for LTI deep link connector',
      timestamp: new Date().toISOString(),
    });

    return { success: true };
  }
}
