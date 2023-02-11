import request from 'supertest';
import app from '../../src/app.js';
import instrumentService from '../../src/services/instrument.js';

describe('Instrument Controller', () => {
  test('GET /instrument success', async() => {
    const response = await request(app).get('/instrument');
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
          description: expect.any(String),
          images: expect.arrayContaining([expect.any(String)]),
          videos: expect.arrayContaining([expect.any(String)]),
          enabled: expect.any(Boolean),
          createdAt: expect.any(String),
          updatedAt: expect.any(String)
        })
      ])
    );
  });

  test('GET /instrument/:id success', async () => {
    const response = await request(app).get('/instrument/11111111-1111-1111-1111-111111111111');
    // should return status 200
    expect(response.status).toBe(200);
    // should contain data object
    expect(response.body).toMatchObject({ data: expect.any(Object) });
    // should contain instrument with given id in data object
    expect(response.body.data.id).toEqual('11111111-1111-1111-1111-111111111111');
  });

  test('GET /instrument/:id not found', async () => {
    const response = await request(app).get('/instrument/8b178c7b-ae9c-43fa-9196-361c656aff14');

    expect(response.status).toBe(404);
  });

  test('GET /instrument/:id bad request', async () => {
    const response = await request(app).get('/instrument/invalid-id');

    expect(response.status).toBe(400);
  });

  test('POST /instrument success', async () => {
    const response = await request(app).post('/instrument').send({ name: 'test_name' });
    // should return status 200
    expect(response.status).toBe(200);
    // should contain data object
    expect(response.body).toMatchObject({ data: expect.any(Object) });
    // should return created instrument object
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.name).toEqual('test_name');
    // should create the instrument in the database
    const instrument = await instrumentService.getInstrument(response.body.data.id);
    expect(instrument).toBeTruthy();
  });

  test('POST /instrument invalid payload', async () => {
    const response = await request(app).post('/instrument').send({ });

    expect(response.status).toBe(422);
  });

  test('PUT /instrument/:id success', async () => {
    const id = '11111111-1111-1111-1111-111111111111';
    const response = await request(app).put(`/instrument/${id}`).send({ name: 'updated_test_name' });
    // should return status 200
    expect(response.status).toBe(200);
    // should contain data object
    expect(response.body).toMatchObject({ data: expect.any(Object) });

    //should update the instrument in the database
    const instrument = await instrumentService.getInstrument(id);
    expect(instrument.name).toBe('updated_test_name');
  });

  test('PUT /instrument/:id invalid payload', async () => {
    const id = '11111111-1111-1111-1111-111111111111';
    const response = await request(app).put(`/instrument/${id}`).send({ });

    expect(response.status).toBe(422);
  });

  test('PUT /instrument/:id not found', async () => {
    const response = await request(app).put('/instrument/00000000-0000-0000-0000-000000000000').send({ name: 'updated_test_name' });

    expect(response.status).toBe(404);
  });

  test('PUT /instrument/:id bad request', async () => {
    const response = await request(app).put('/instrument/invalid-id').send({ name: 'updated_test_name' });

    expect(response.status).toBe(400);
  });

  test('DELETE /instrument/:id success', async () => {
    const id = '11111111-1111-1111-1111-111111111111';
    const response = await request(app).delete(`/instrument/${id}`);
    // should return status 200
    expect(response.status).toBe(200);
    // should contain data object
    expect(response.body).toMatchObject({ data: expect.any(Object) });
    // should delete the instrument from the batabase
    const instrument = await instrumentService.getInstrument(id);
    expect(instrument).toBeNull();
  });

  test('DELETE /instrument/:id bad request', async () => {
    const response = await request(app).delete('/instrument/invalid-id');

    expect(response.status).toBe(400);
  });
});
