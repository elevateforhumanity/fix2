// Production-safe logger - only logs in development
const isDev = import.meta.env.DEV;

export const logger = {
  log: (...args) => {
    if (isDev) console.log(...args);
  },
  error: (...args) => {
    if (isDev) console.error(...args);
  },
  warn: (...args) => {
    if (isDev) console.warn(...args);
  },
  info: (...args) => {
    if (isDev) console.info(...args);
  },
};

export default logger;
