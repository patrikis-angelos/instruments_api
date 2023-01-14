import logger from '../startup/logger.js';

export default (err, req, res, next) => {
  logger.error(err.stack || err.messsage);
  res.status(500).json({ message: 'Something went wrong' });
};
