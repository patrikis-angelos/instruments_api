import { DataSource } from 'typeorm';
import config from 'config';

const myDataSource = new DataSource({
  type: config.get('db.type'),
  host: config.get('db.host'),
  port: config.get('db.port'),
  username: config.get('db.user'),
  password: config.get('db.password'),
  database: config.get('db.name'),
  entities: ['src/models/*.js'],
  logging: config.get('db.logging'),
  synchronize: true,
  extra: {
    idleTimeoutMillis: config.get('db.idleTimeoutMillis'),
  }
});

const dbConnect = async () => {
  try {
    await myDataSource.initialize();
    console.log('Connection has been established successfully.');
  } catch(error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default dbConnect;
