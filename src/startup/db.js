import { DataSource } from 'typeorm';
import config from 'config';
import { WinstonAdaptor } from 'typeorm-logger-adaptor/logger/winston/index.js';
import logger from './logger.js';
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
  logger: new WinstonAdaptor(logger, 'all'),
  synchronize: false,
  extra: {
    idleTimeoutMillis: config.get('db.idleTimeoutMillis')
  }
});

const dbConnect = async () => {
  await dataSource.initialize();
  logger.info(`Connection to ${config.get('db.name')} has been established successfully.`);
};

export default dbConnect;
