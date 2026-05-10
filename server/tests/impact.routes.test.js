const request = require('supertest');
const app = require('../src/index');

jest.mock('../src/models/Impact', () => {
  return {
    find: jest.fn().mockReturnValue({
      populate: jest.fn().mockReturnValue({
        populate: jest.fn().mockResolvedValue([])
      })
    }),
    prototype: {
      save: jest.fn()
    }
  };
});

describe('Impact API Routes', () => {
  it('GET /api/impacts - should return empty array', async () => {
    const response = await request(app).get('/api/impacts');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('POST /api/impacts - should fail without required fields', async () => {
    const response = await request(app)
      .post('/api/impacts')
      .send({ description: 'Missing fields' });
    expect(response.statusCode).toBe(400);
  });
});
