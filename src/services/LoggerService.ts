/**
 * Logger Service - Structured logging for the application
 * 
 * This service provides a centralized logging mechanism with different log levels.
 * In production, this can be extended to send logs to external services like
 * Sentry, LogRocket, or cloud logging providers.
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, unknown>;
  error?: Error;
}

class LoggerService {
  private static instance: LoggerService;
  private isDevelopment: boolean;
  private logLevel: LogLevel;

  private constructor() {
    this.isDevelopment = import.meta.env.DEV;
    this.logLevel = (import.meta.env.VITE_LOG_LEVEL as LogLevel) || 'info';
  }

  public static getInstance(): LoggerService {
    if (!LoggerService.instance) {
      LoggerService.instance = new LoggerService();
    }
    return LoggerService.instance;
  }

  private shouldLog(level: LogLevel): boolean {
    const levels: LogLevel[] = ['debug', 'info', 'warn', 'error'];
    const currentLevelIndex = levels.indexOf(this.logLevel);
    const targetLevelIndex = levels.indexOf(level);
    return targetLevelIndex >= currentLevelIndex;
  }

  private formatLogEntry(level: LogLevel, message: string, context?: Record<string, unknown>, error?: Error): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...(context && { context }),
      ...(error && { error: { name: error.name, message: error.message, stack: error.stack } })
    };
  }

  private outputLog(entry: LogEntry): void {
    if (!this.shouldLog(entry.level)) {
      return;
    }

    const logMessage = `[${entry.level.toUpperCase()}] ${entry.timestamp} - ${entry.message}`;
    
    switch (entry.level) {
      case 'debug':
        if (this.isDevelopment) {
          console.debug(logMessage, entry.context);
        }
        break;
      case 'info':
        console.info(logMessage, entry.context);
        break;
      case 'warn':
        console.warn(logMessage, entry.context);
        break;
      case 'error':
        console.error(logMessage, entry.context, entry.error);
        break;
    }

    // In production, you could send logs to an external service here
    // Example: await this.sendToExternalLogger(entry);
  }

  debug(message: string, context?: Record<string, unknown>): void {
    const entry = this.formatLogEntry('debug', message, context);
    this.outputLog(entry);
  }

  info(message: string, context?: Record<string, unknown>): void {
    const entry = this.formatLogEntry('info', message, context);
    this.outputLog(entry);
  }

  warn(message: string, context?: Record<string, unknown>): void {
    const entry = this.formatLogEntry('warn', message, context);
    this.outputLog(entry);
  }

  error(message: string, error?: Error, context?: Record<string, unknown>): void {
    const entry = this.formatLogEntry('error', message, context, error);
    this.outputLog(entry);
  }

  /**
   * Log API request/response for debugging
   */
  logApiCall(endpoint: string, method: string, status: number, durationMs: number, error?: Error): void {
    const level: LogLevel = status >= 500 ? 'error' : status >= 400 ? 'warn' : 'info';
    this[level](`API ${method} ${endpoint}`, {
      status,
      durationMs,
      ...(error && { error: error.message })
    });
  }

  /**
   * Log user actions for audit trail
   */
  logUserAction(userId: string, action: string, details?: Record<string, unknown>): void {
    this.info(`User action: ${action}`, {
      userId,
      ...details
    });
  }
}

export default LoggerService;
