import { Sequelize } from 'sequelize';
import config from 'config';

const sequelize = new Sequelize(
  config.get('db.name'),
  config.get('db.user'),
  config.get('db.password'),
  {
    host: config.get('db.host'),
    dialect: config.get('db.dialect'),
    port: config.get('db.port'),
    pool: {
      max: config.get('db.maxConnections'),
      min: config.get('db.minConnections'),
      idle: config.get('db.idleConnectionTime')
    }
  },
);

const dbConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default dbConnect;
