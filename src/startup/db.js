import { DataSource } from 'typeorm';
import config from 'config';
import migrations from '../migrations/index.js';
import entities from '../entities/index.js';

export const dataSource = new DataSource({
  type: config.get('db.type'),
  host: config.get('db.host'),
  port: config.get('db.port'),
  username: config.get('db.user'),
  password: config.get('db.password'),
  database: config.get('db.name'),
  entities: entities,
  migrations: migrations,
  migrationsTableName: 'migrations',
  logging: config.get('db.logging'),
  synchronize: false,
  extra: {
    idleTimeoutMillis: config.get('db.idleTimeoutMillis')
  }
});

const dbConnect = async () => {
  try {
    await dataSource.initialize();
    console.log('Connection has been established successfully.');
  } catch(error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default dbConnect;
