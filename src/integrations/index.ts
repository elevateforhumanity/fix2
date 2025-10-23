import { LtiDeepLinkConnector } from './connectors/lti1p3DeepLink';
import { WorkdayHrisConnector } from './connectors/workdayHris';
import { connectorRegistry } from './registry';

// Register first-party connectors. Additional ones can be discovered dynamically later.
connectorRegistry.register(new LtiDeepLinkConnector());
connectorRegistry.register(new WorkdayHrisConnector());

export { connectorRegistry } from './registry';
export type {
  Connector,
  ConnectorConfiguration,
  ConnectorExecuteResult,
} from './types';
