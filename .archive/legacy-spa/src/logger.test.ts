import { describe, it, expect, vi, beforeEach } from 'vitest';
import { setLogLevel, LogLevel, log } from './logger';

describe('logger', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('sets level without throwing', () => {
    setLogLevel('error');
    expect(true).toBe(true);
  });

  it('ignores unknown log level', () => {
    expect(() => setLogLevel('unknown' as LogLevel)).not.toThrow();
  });

  it('logs debug messages when level is debug', () => {
    setLogLevel('debug');
    log.debug('test message');
    expect(console.log).toHaveBeenCalledWith('test message');
  });

  it('logs info messages when level is info', () => {
    setLogLevel('info');
    log.info('test info');
    expect(console.log).toHaveBeenCalledWith('test info');
  });

  it('logs warnings when level is warn', () => {
    setLogLevel('warn');
    log.warn('test warning');
    expect(console.warn).toHaveBeenCalledWith('test warning');
  });

  it('logs errors when level is error', () => {
    setLogLevel('error');
    log.error('test error');
    expect(console.error).toHaveBeenCalledWith('test error');
  });

  it('respects log level hierarchy', () => {
    setLogLevel('warn');
    log.debug('should not log');
    log.info('should not log');
    log.warn('should log');
    log.error('should log');
    
    expect(console.log).not.toHaveBeenCalled();
    expect(console.warn).toHaveBeenCalledWith('should log');
    expect(console.error).toHaveBeenCalledWith('should log');
  });
});
