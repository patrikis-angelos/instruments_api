import morgan from 'morgan';
import config from 'config';
import logger from '../startup/logger.js';

const stream = {
  write: (message) => logger.http(message)
};

const skip = () => !config.get('log.morgan');

export default morgan(
  ':remote-addr :method :url :status :res[content-length] - :response-time ms',
  { stream, skip }
);