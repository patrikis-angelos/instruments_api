import request from 'supertest';
import app from '../../src/app.js';
import { seedDatabase, clearDatabase } from '../helper/dataManager.js';
import mockCategories from '../helper/categories.js';

beforeAll(async () => {
  await seedDatabase();
});

afterAll(async () => {
  await clearDatabase();
});

describe('Category Controller', () => {
  describe('GET /category', () => {
    let response, body, data;
    beforeAll(async () => {
      response = await request(app).get('/category');
      body = response.body;
      data = body.data;
    });

    it('should return status 200', async () => {
      expect(response.status).toBe(200);
    });

    it('should contain data array', () => {
      expect(body).toStrictEqual(
        expect.objectContaining({
          data: expect.any(Array)
        })
      );
    });

    it('should contain categories in data', () => {
      const [category1, category2] = mockCategories;

      expect(data).toContainEqual(JSON.parse(JSON.stringify(category1)));
      expect(data).toContainEqual(JSON.parse(JSON.stringify(category2)));
    });
  });

  describe('GET /category/:id', () => {
    let response, body, data;
    beforeAll(async () => {
      response = await request(app).get('/category/8b178c7b-ae9c-43fa-9196-361c656aff17');
      body = response.body;
      data = body.data;
    });

    it('should return status 200', () => {
      expect(response.status).toBe(200);
    });

    it('should contain data object', () => {
      expect(body).toStrictEqual(
        expect.objectContaining({
          data: expect.any(Object)
        })
      );
    });

    it('should contain category with given id in data object', () => {
      const category = mockCategories.find((cat) => cat.id === '8b178c7b-ae9c-43fa-9196-361c656aff17');

      expect(data).toEqual(JSON.parse(JSON.stringify(category)));
    });

    it('should return status 404 if id is not found', async () => {
      const notFound = await request(app).get('/category/8b178c7b-ae9c-43fa-9196-361c656aff14');

      expect(notFound.status).toBe(404);
    });
  });

  describe('POST /category', () => {
    it('success', () => {

    });

    it('missing parameters', () => {

    });
  });
});
