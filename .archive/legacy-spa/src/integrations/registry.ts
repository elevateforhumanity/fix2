import type {
  ConnectorConfiguration,
  ConnectorContext,
  ConnectorExecuteResult,
  RegisteredConnector,
} from './types';

/**
 * Lightweight in-memory registry. In production this would be backed by Supabase tables.
 */
export class ConnectorRegistry {
  private readonly connectors = new Map<string, RegisteredConnector>();

  register(connector: RegisteredConnector): void {
    if (this.connectors.has(connector.id)) {
      throw new Error(`Connector with id "${connector.id}" already registered`);
    }
    this.connectors.set(connector.id, connector);
  }

  list(): RegisteredConnector[] {
    return Array.from(this.connectors.values());
  }

  get(id: string): RegisteredConnector | undefined {
    return this.connectors.get(id);
  }

  async verify(
    config: ConnectorConfiguration,
    context: ConnectorContext
  ): Promise<ConnectorExecuteResult> {
    const connector = this.get(config.id);
    if (!connector) {
      return {
        success: false,
        error: `Connector ${config.id} is not registered`,
      };
    }
    return connector.verify(context);
  }
}

export const connectorRegistry = new ConnectorRegistry();
