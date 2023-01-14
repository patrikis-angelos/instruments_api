import config from 'config';
import winston from 'winston';

// Define severity levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
};

// Define different colors for each level
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white'
};

// Set severity level
const level = config.get('log.level');

// Set silent mode
const silent = config.get('log.silent');

winston.addColors(colors);

const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.stack || info.message}`)
);

const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.json()
);

const transports = [
  new winston.transports.Console({
    format: consoleFormat
  }),
  new winston.transports.File({
    format: fileFormat,
    filename: 'logs/error.log',
    level: 'error'
  }),
  new winston.transports.File({
    format: fileFormat,
    filename: 'logs/all.log'
  })
];

const logger = winston.createLogger({
  level,
  levels,
  transports,
  silent
});

export default logger;
