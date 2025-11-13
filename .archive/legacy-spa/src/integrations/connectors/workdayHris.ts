import type {
  Connector,
  ConnectorContext,
  ConnectorExecuteResult,
} from '../types';

export class WorkdayHrisConnector implements Connector {
  readonly id = 'workday-hris';
  readonly displayName = 'Workday HRIS';
  readonly category = 'hris' as const;
  readonly description =
    'Synchronises learner rosters and job roles from Workday into the LMS.';

  async verify({ runtime }: ConnectorContext): Promise<ConnectorExecuteResult> {
    const token = await runtime.resolveSecret('WORKDAY_BEARER_TOKEN');
    if (!token) {
      return {
        success: false,
        error: 'WORKDAY_BEARER_TOKEN secret is not configured',
      };
    }

    try {
      const response = await runtime.fetch(
        'https://wd5-impl-services1.workday.com/ccx/api/v1/tenant/workers',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        return {
          success: false,
          error: `Workday API returned ${response.status}`,
        };
      }

      runtime.emit({
        connectorId: this.id,
        category: this.category,
        level: 'info',
        message: 'Workday credentials validated successfully',
        timestamp: new Date().toISOString(),
      });

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Unknown Workday verification error',
      };
    }
  }

  async sync({
    runtime,
    config,
  }: ConnectorContext): Promise<ConnectorExecuteResult> {
    runtime.emit({
      connectorId: this.id,
      category: this.category,
      level: 'info',
      message: 'Starting Workday roster sync',
      details: { connectorConfig: config },
      timestamp: new Date().toISOString(),
    });

    // Placeholder: Map Workday payload to the platform schema and upsert via Supabase.
    return { success: true };
  }
}
