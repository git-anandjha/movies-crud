import winston, { format } from 'winston';

const { combine, timestamp, colorize, printf } = format;

const errorStackTracerFormat = winston.format((info) => {
  if (info instanceof Error) {
    // DO NOT DELETE THIS
    console.error(info);
  }
  return info;
});

const options: winston.LoggerOptions = {
  format: combine(
    timestamp(),
    errorStackTracerFormat(),
    colorize({
      all: true,
      colors: { info: 'green', warn: 'orange', error: 'red' },
    }),
    printf((info) => `${info.timestamp}|-|${info.level}|-|${info.message}`)
  ),
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
    }),
    new winston.transports.File({ filename: 'debug.log', level: 'debug' }),
  ],
};

const logger = winston.createLogger(options);

if (process.env.NODE_ENV !== 'production') {
  logger.debug('Logging initialized at debug level');
}

export default {
  error: (message?: string, error?: any) => {
    if (typeof error === 'object') {
      logger.log('error', `${message} - ${JSON.stringify(error, null, 4)}`);
    } else {
      logger.log('error', `${message} - ${error}`);
    }
  },
  warning: (warning: string) => {
    logger.log('warn', `${warning}`);
  },
  info: (info: any) => {
    if (typeof info === 'object') {
      logger.log('info', `${JSON.stringify(info, null, 4)}`);
    } else {
      logger.log('info', `${info}`);
    }
  },
  debug: (debug: any) => {
    if (typeof debug === 'object') {
      logger.log('debug', `${JSON.stringify(debug, null, 4)}`);
    } else {
      logger.log('debug', `${debug}`);
    }
  },
};
