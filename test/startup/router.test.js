import request from 'supertest';
import app from '../../src/app.js';

describe('router', () => {
  it('should return 404 if route not found', async () => {
    const response = await request(app).get('/invalid-route');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Not Found');
  });
});
