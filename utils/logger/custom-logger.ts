// Custom logger for React Native with emojis and colors
// Use it for debugging and logging in the app bro
import { Platform } from 'react-native';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';
type LogCategory = 'NAV' | 'RENDER' | 'STORAGE' | 'SCREEN' | 'APP';

class Logger {
  private readonly colors = {
    debug: '\x1b[36m', // Cyan
    info: '\x1b[32m', // Green
    warn: '\x1b[33m', // Yellow
    error: '\x1b[31m', // Red
    reset: '\x1b[0m', // Reset color
    timestamp: '\x1b[90m', // Gray
    category: '\x1b[35m', // Magenta
  };

  private readonly emojis = {
    NAV: '🚦',
    RENDER: '🔄',
    STORAGE: '💾',
    SCREEN: '📱',
    APP: '📲',
    debug: '🐛',
    info: 'ℹ️',
    warn: '⚠️',
    error: '❌',
  };

  private shouldLog(level: LogLevel): boolean {
    // Change this based on your environment (e.g., __DEV__ for development only)
    return true;
  }

  private getTimestamp(): string {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const milliseconds = now.getMilliseconds().toString().padStart(3, '0');
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  }

  private formatMessage(
    level: LogLevel,
    category: LogCategory,
    message: string,
    ...args: any[]
  ): string {
    const timestamp = this.getTimestamp();
    const emoji = this.emojis[category] || '';
    const levelEmoji = this.emojis[level] || '';
    
    let formattedMessage = `[${timestamp}] ${emoji} ${levelEmoji} ${category}: ${message}`;
    
    if (args.length > 0) {
      formattedMessage += ` ${args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg) : arg
      ).join(' ')}`;
    }

    return formattedMessage;
  }

  private logToConsole(
    level: LogLevel,
    category: LogCategory,
    message: string,
    ...args: any[]
  ) {
    if (!this.shouldLog(level)) return;

    const formattedMessage = this.formatMessage(level, category, message, ...args);
    
    if (Platform.OS === 'web') {
      // Web/Chrome console with colors
      const style = `color: ${this.colors[level]}`;
      console.log(`%c${formattedMessage}`, style);
    } else {
      // React Native console
      switch (level) {
        case 'debug':
          console.debug(formattedMessage);
          break;
        case 'info':
          console.info(formattedMessage);
          break;
        case 'warn':
          console.warn(formattedMessage);
          break;
        case 'error':
          console.error(formattedMessage);
          break;
        default:
          console.log(formattedMessage);
      }
    }
  }

  // Public API
  debug(category: LogCategory, message: string, ...args: any[]) {
    this.logToConsole('debug', category, message, ...args);
  }

  info(category: LogCategory, message: string, ...args: any[]) {
    this.logToConsole('info', category, message, ...args);
  }

  warn(category: LogCategory, message: string, ...args: any[]) {
    this.logToConsole('warn', category, message, ...args);
  }

  error(category: LogCategory, message: string, ...args: any[]) {
    this.logToConsole('error', category, message, ...args);
  }

  // Specialized logging methods
  navigation(from: string, to: string) {
    this.info('NAV', `Navigating from ${from} -> ${to}...`);
  }

  rerender(componentName: string) {
    this.debug('RENDER', `Re-rendering ${componentName}...`);
  }

  storageChange(key: string, value?: any) {
    this.debug('STORAGE', `"${key}" changed!`, value);
  }

  screenRegistration(screenName: string, time?: number) {
    const message = time 
      ? `Lazily registered Screen "${screenName}" in ${time}ms`
      : `Lazily registering Screen "${screenName}"...`;
    this.info('SCREEN', message);
  }
}

// Singleton instance
const logger = new Logger();
export default logger;