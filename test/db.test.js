import fs from 'fs';
import entities from '../src/entities/index.js';
import migrations from '../src/migrations/index.js';

describe('Database configuration', () => {
  test('Migrations', async () => {
    const files = fs.readdirSync('./src/migrations')
      .filter((file) => file !== 'index.js')
      .map((file) => file.replace('.js', '').split('-').reverse().join(''));

    const exports = migrations.map(migration => migration.name);

    for (let i = 0; i < files.length; i ++) {
      expect(files[i], `Migration ${files[i]} is not exported or the export order is wrong`).toBe(exports[i]);
    }
  });

  test('Entities', async () => {
    const files = fs.readdirSync('./src/entities')
      .filter((file) => !['index.js', 'BaseEntity.js'].includes(file))
      .map((file) => file.replace('.js', ''));
    
    const exports = entities.map(entity => entity.options.name);

    for (let i = 0; i < files.length; i ++) {
      expect(files[i], `Entity ${files[i]} is not exported or the export order is wrong`).toBe(exports[i]);
    }
  });
});
