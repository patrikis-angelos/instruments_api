import logger from '../startup/logger.js';
import ValidationError from '../errors/ValidationError.js';

export default (err, req, res, next) => {
  logger.error(err.stack || err.messsage);

  if (err instanceof ValidationError) {
    res.status(422).json({ message: err.message, data: err.data });
    return;
  }

  res.status(500).json({ message: 'Something went wrong' });
};
