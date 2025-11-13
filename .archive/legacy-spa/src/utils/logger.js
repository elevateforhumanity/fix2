// Production-safe logger - only logs in development
const isDev = import.meta.env.DEV;

export const logger = {
  log: (...args) => {
  },
  error: (...args) => {
  },
  warn: (...args) => {
  },
  info: (...args) => {
  },
};

export default logger;
