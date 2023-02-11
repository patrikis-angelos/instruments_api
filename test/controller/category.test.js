import request from 'supertest';
import app from '../../src/app.js';
import mockCategories from '../helper/categories.js';
import categoryService from '../../src/services/category.js';

describe('Category Controller', () => {
  test('GET /category success', async() => {
    const response = await request(app).get('/category');
    // expect status 200
    expect(response.status).toBe(200);
    // expect to contain data object
    expect(response.body).toMatchObject({ data: expect.any(Array) });
    // expect to contain categories in data
    expect(response.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String)
        })
      ])
    );
  });

  test('GET /category/:id success', async () => {
    const response = await request(app).get('/category/8b178c7b-ae9c-43fa-9196-361c656aff17');
    // should return status 200
    expect(response.status).toBe(200);
    // should contain data object
    expect(response.body).toMatchObject({ data: expect.any(Object) });
    // should contain category with given id in data object
    const category = mockCategories.find((cat) => cat.id === '8b178c7b-ae9c-43fa-9196-361c656aff17');
    expect(response.body.data).toEqual(JSON.parse(JSON.stringify(category)));
  });

  test('GET /category/:id not found', async () => {
    const response = await request(app).get('/category/8b178c7b-ae9c-43fa-9196-361c656aff14');

    expect(response.status).toBe(404);
  });

  test('GET /category/:id bad request', async () => {
    const response = await request(app).get('/category/invalid-id');

    expect(response.status).toBe(400);
  });

  test('POST /category success', async () => {
    const response = await request(app).post('/category').send({ name: 'test_name' });
    // should return status 200
    expect(response.status).toBe(200);
    // should contain data object
    expect(response.body).toMatchObject({ data: expect.any(Object) });
    // should return created category object
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.name).toEqual('test_name');
    // should create the category in the database
    const category = await categoryService.getCategory(response.body.data.id);
    expect(category).toBeTruthy();
  });

  test('POST /category invalid payload', async () => {
    const response = await request(app).post('/category').send({ });

    expect(response.status).toBe(422);
  });

  test('PUT /category/:id success', async () => {
    const id = '8b178c7b-ae9c-43fa-9196-361c656aff17';
    const response = await request(app).put(`/category/${id}`).send({ name: 'updated_test_name' });
    // should return status 200
    expect(response.status).toBe(200);
    // should contain data object
    expect(response.body).toMatchObject({ data: expect.any(Object) });
    //should update the category in the database
    const category = await categoryService.getCategory(id);
    expect(category.name).toBe('updated_test_name');
  });

  test('PUT /category/:id invalid payload', async () => {
    const id = '8b178c7b-ae9c-43fa-9196-361c656aff17';
    const response = await request(app).put(`/category/${id}`).send({ });

    expect(response.status).toBe(422);
  });

  test('PUT /category/:id not found', async () => {
    const response = await request(app).put('/category/11111111-1111-1111-1111-111111111111').send({ name: 'updated_test_name' });

    expect(response.status).toBe(404);
  });

  test('PUT /category/:id bad request', async () => {
    const response = await request(app).put('/category/invalid-id').send({ name: 'updated_test_name' });

    expect(response.status).toBe(400);
  });

  test('DELETE /category/:id success', async () => {
    const id = '850c3d6a-7cd5-46ab-9fcd-be7c0a1a6dea';
    const response = await request(app).delete(`/category/${id}`);
    // should return status 200
    expect(response.status).toBe(200);
    // should contain data object
    expect(response.body).toMatchObject({ data: expect.any(Object) });
    // should delete the category from the batabase
    const category = await categoryService.getCategory(id);
    expect(category).toBeNull();
  });

  test('DELETE /category/:id bad request', async () => {
    const response = await request(app).delete('/category/invalid-id');

    expect(response.status).toBe(400);
  });
});
