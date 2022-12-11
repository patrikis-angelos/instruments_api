import fs from 'fs';
import dbConnect, { dataSource } from '../src/startup/db.js';

describe('Database configuration', () => {
  test('Migrations', async () => {
    await dbConnect();
    const files = fs.readdirSync('./src/migrations')
      .filter((file) => file !== 'index.js')
      .map((file) => file.replace('.js', '').split('-').reverse().join(''));

    const exports = dataSource.migrations.map((migration) => migration.constructor.name);

    for (let i = 0; i < files.length; i ++) {
      expect(files[i], `Migration ${files[i]} is not exported or the export order is wrong`).toBe(exports[i]);
    }
  });
});
