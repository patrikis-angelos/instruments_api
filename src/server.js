import app from './app.js';
import config from 'config';

const port = config.get('port');

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
