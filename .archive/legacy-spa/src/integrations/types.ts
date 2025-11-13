import type { SupabaseClient } from '@supabase/supabase-js';

/**
 * Categories supported by the connector marketplace.
 */
export type ConnectorCategory =
  | 'lti'
  | 'hris'
  | 'crm'
  | 'content'
  | 'payment'
  | 'custom';

/**
 * Basic shape of the configuration that administrators will provide when enabling a connector.
 */
export interface ConnectorConfiguration {
  id: string;
  displayName: string;
  category: ConnectorCategory;
  description?: string;
  enabled: boolean;
  /** Stored in Vault/Secrets – never persisted in the configuration table. */
  secretNames?: string[];
  /** Arbitrary metadata for the connector implementation. */
  options?: Record<string, unknown>;
}

/**
 * Normalised event payload that connectors emit so we can fan-in telemetry.
 */
export interface ConnectorEvent {
  connectorId: string;
  category: ConnectorCategory;
  level: 'info' | 'warn' | 'error';
  message: string;
  details?: Record<string, unknown>;
  timestamp: string;
}

/**
 * Provided helpers when a connector executes an action.
 */
export interface ConnectorRuntime {
  supabase: SupabaseClient;
  fetch: typeof fetch;
  emit: (event: ConnectorEvent) => void;
  /**
   * Resolve a secret that belongs to the connector (i.e. OAuth client secret).
   */
  resolveSecret: (name: string) => Promise<string | undefined>;
}

export interface ConnectorContext {
  config: ConnectorConfiguration;
  runtime: ConnectorRuntime;
}

export type ConnectorExecuteResult = {
  success: boolean;
  payload?: Record<string, unknown>;
  error?: string;
};

/**
 * Contract each marketplace connector implements.
 */
export interface Connector {
  readonly id: string;
  readonly displayName: string;
  readonly category: ConnectorCategory;
  readonly description: string;
  /**
   * Checks prerequisites before the connector can be enabled (e.g. OAuth credentials set).
   */
  verify(context: ConnectorContext): Promise<ConnectorExecuteResult>;
  /**
   * Called whenever the connector should sync data.
   */
  sync?(context: ConnectorContext): Promise<ConnectorExecuteResult>;
  /**
   * Optional webhook handler for inbound calls from the partner.
   */
  handleWebhook?(
    payload: unknown,
    context: ConnectorContext
  ): Promise<ConnectorExecuteResult>;
}

/**
 * Definition for connectors exposing course content or templates.
 */
export interface ContentPackageProvider extends Connector {
  readonly category: 'content';
  listPackages(context: ConnectorContext): Promise<ConnectorExecuteResult>;
}

export type RegisteredConnector = Connector | ContentPackageProvider;
