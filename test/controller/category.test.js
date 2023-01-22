import request from 'supertest';
import app from '../../src/app.js';
import { seedDatabase, clearDatabase } from '../helper/dataManager.js';
import mockCategories from '../helper/categories.js';
import categoryService from '../../src/services/category.js';

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

    it('should return status 400 if id is invalid', async () => {
      const notFound = await request(app).get('/category/invalid-id');

      expect(notFound.status).toBe(400);
    });
  });

  describe('POST /category', () => {
    let response, body, data;
    beforeAll(async () => {
      response = await request(app).post('/category').send({ name: 'test_name' });
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

    it('should return created category object', () => {
      expect(data.id).toBeDefined();
      expect(data.name).toEqual('test_name');
    });

    it('should create the category in the database', async () => {
      const category = await categoryService.getCategory(data.id);
      expect(category).toBeTruthy();
    });

    it('invalid payload', async () => {
      const response = await request(app).post('/category').send({ });

      expect(response.status).toBe(422);
    });
  });

  describe('PUT /category/:id', () => {
    let response, body;
    const id = '8b178c7b-ae9c-43fa-9196-361c656aff17';
    beforeAll(async () => {
      response = await request(app).put(`/category/${id}`).send({ name: 'updated_test_name' });
      body = response.body;
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

    it('should update the category in the database', async () => {
      const category = await categoryService.getCategory(id);
      expect(category.name).toBe('updated_test_name');
    });

    it('invalid payload', async () => {
      const response = await request(app).put(`/category/${id}`).send({ });

      expect(response.status).toBe(422);
    });

    it('should return 404 if record not found', async () => {
      const response = await request(app).put('/category/11111111-1111-1111-1111-111111111111').send({ name: 'updated_test_name' });

      expect(response.status).toBe(404);
    });

    it('should return 400 if id is invalid', async () => {
      const response = await request(app).put('/category/invalid-id').send({ name: 'updated_test_name' });

      expect(response.status).toBe(400);
    });
  });

  describe('DELETE /category/:id', () => {
    let response, body;
    const id = '850c3d6a-7cd5-46ab-9fcd-be7c0a1a6dea';
    beforeAll(async () => {
      response = await request(app).delete(`/category/${id}`);
      body = response.body;
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

    it ('should delete the category from the batabase', async () => {
      const category = await categoryService.getCategory(id);
      expect(category).toBeNull();
    });

    it('should return status 404 if record not found', async () => {
      const response = await request(app).delete('/category/11111111-1111-1111-1111-111111111111');

      expect(response.status).toBe(404);
    });

    it('should return 400 if id is invalid', async () => {
      const response = await request(app).delete('/category/invalid-id');

      expect(response.status).toBe(400);
    });
  });
});
