const request = require('supertest');
const app = require('../src/index');
const mongoose = require('mongoose');
const Project = require('../src/models/Project');

describe('Project API', () => {
  beforeAll(async () => { await Project.deleteMany({}); });
  afterAll(async () => { await mongoose.connection.close(); });

  it('should create a new project', async () => {
    const res = await request(app).post('/api/projects').send({
      title: 'Green City',
      description: 'Planting trees'
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body.title).toBe('Green City');
  });

  it('should fetch all projects', async () => {
    const res = await request(app).get('/api/projects');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
