import request from 'supertest';
import app from '../../src/app.js';
import { dataSource } from '../../src/startup/db.js';
import Instrument from '../../src/entities/Instrument.js';
import Category from '../../src/entities/Category.js';

describe('instruments', () => {
  test('GET /', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

  it('should contain categories in instrument', async () => {
    const instrumentRepository = dataSource.getRepository(Instrument);
    const result = await instrumentRepository.find({ relations: ['categories'] });
    console.log(result[0]);
  });

  it('should contain instruments in categories', async () => {
    const categoryRepository = dataSource.getRepository(Category);
    const result = await categoryRepository.find({ relations: ['instruments'] });
    console.log(result[0]);
  });
});
