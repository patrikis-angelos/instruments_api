import request from 'supertest';
import app from '../src/app.js';

describe('Hello Test', () => {
  test('GET /', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });
});
