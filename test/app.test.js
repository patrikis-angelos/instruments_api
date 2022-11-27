import request from 'supertest';
import app from '../src/app.js';

describe('Hello Test', () => {
  test('GET /', async () => {
    await request(app)
      .get('/')
      .expect(200);
  });
});
