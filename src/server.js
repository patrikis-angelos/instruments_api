import app from './app.js';
import config from 'config';
import logger from './startup/logger.js';

const port = config.get('port');

app.listen(port, () => {
  logger.info(`Listening on port: ${port}`);
});
