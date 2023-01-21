import logger from '../startup/logger.js';
import ValidationError from '../errors/ValidationError.js';
import ApiError from '../errors/ApiError.js';

export default (err, req, res, next) => {
  logger.error(err.stack || err.messsage);

  if (err instanceof ValidationError) {
    res.status(422).json({ message: err.message, data: err.data });
    return;
  }

  if (err instanceof ApiError) {
    res.status(err.code).json({ message: err.message });
    return;
  }

  res.status(500).json({ message: 'Something went wrong' });
};
