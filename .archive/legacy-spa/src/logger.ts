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
  debug: (...a: unknown[]) => enabled('debug') && console.log(...a),
  info: (...a: unknown[]) => enabled('info') && console.log(...a),
  warn: (...a: unknown[]) => enabled('warn') && console.warn(...a),
  error: (...a: unknown[]) => enabled('error') && console.error(...a),
};

// Export default for convenience
export default log;
