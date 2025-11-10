export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

// Set log level based on environment
const isProduction = import.meta.env.MODE === 'production';
let current: LogLevel = isProduction ? 'warn' : 'info';

const order: LogLevel[] = ['debug', 'info', 'warn', 'error'];

export function setLogLevel(level: LogLevel) {
  current = level;
}

function enabled(level: LogLevel) {
  return order.indexOf(level) >= order.indexOf(current);
}

// In production, only log warnings and errors
// In development, log everything
export const log = {
  debug: (...a: unknown[]) => enabled('debug') && void 0,
  info: (...a: unknown[]) => enabled('info') && void 0,
  warn: (...a: unknown[]) => enabled('warn') && void 0,
  error: (...a: unknown[]) => enabled('error') && void 0,
};

// Export default for convenience
export default log;
