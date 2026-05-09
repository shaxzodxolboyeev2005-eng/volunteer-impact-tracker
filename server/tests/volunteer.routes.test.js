const request = require('supertest');
const app = require('../src/index');

jest.mock('../src/models/Volunteer', () => {
  return {
    find: jest.fn().mockResolvedValue([]),
    prototype: {
      save: jest.fn()
    }
  };
});

const Volunteer = require('../src/models/Volunteer');

describe('Volunteer API Routes', () => {
  it('GET /api/volunteers - should return empty array', async () => {
    const response = await request(app).get('/api/volunteers');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('POST /api/volunteers - should fail without name', async () => {
    const response = await request(app)
      .post('/api/volunteers')
      .send({ email: 'noname@test.com' });
    expect(response.statusCode).toBe(400);
  });

  it('POST /api/volunteers - should fail without email', async () => {
    const response = await request(app)
      .post('/api/volunteers')
      .send({ name: 'John' });
    expect(response.statusCode).toBe(400);
  });
});
