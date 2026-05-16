const request = require('supertest');
const app = require('../src/index');

jest.mock('../src/models/Project', () => ({
  find: jest.fn().mockResolvedValue([]),
  prototype: { save: jest.fn() }
}));

describe('Project API', () => {
  it('should create a new project - fails without title', async () => {
    const res = await request(app).post('/api/projects').send({});
    expect(res.status).toBe(400);
  });

  it('should fetch all projects', async () => {
    const res = await request(app).get('/api/projects');
    expect(res.status).toBe(200);
  });
});
