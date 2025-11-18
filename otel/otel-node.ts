// otel/otel-node.ts
import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

const exporter = new OTLPTraceExporter({
  url:
    process.env.OTEL_EXPORTER_OTLP_ENDPOINT ||
    'http://otel-collector:4318/v1/traces',
});

const sdk = new NodeSDK({
  traceExporter: exporter,
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'efh-next-app',
  }),
});

sdk
  .start()
  .then(() => {
    console.log('OpenTelemetry SDK started');
  })
  .catch((error) => console.log('Error starting OpenTelemetry:', error));

process.on('SIGTERM', () => {
  sdk
    .shutdown()
    .then(() => console.log('OpenTelemetry SDK shut down'))
    .catch((error) => console.log('Error shutting down OpenTelemetry', error))
    .finally(() => process.exit(0));
});
