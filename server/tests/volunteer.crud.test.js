const request = require('supertest');

const mockVolunteer = {
  _id: '507f1f77bcf86cd799439011',
  name: 'John Doe',
  email: 'john@test.com',
  totalHours: 0
};

jest.mock('../src/models/Volunteer', () => ({
  find: jest.fn().mockResolvedValue([]),
  findById: jest.fn().mockResolvedValue({
    _id: '507f1f77bcf86cd799439011',
    name: 'John Doe',
    email: 'john@test.com',
    totalHours: 0
  }),
  findByIdAndUpdate: jest.fn().mockResolvedValue({
    _id: '507f1f77bcf86cd799439011',
    name: 'Updated Name',
    email: 'john@test.com',
    totalHours: 0
  }),
  findByIdAndDelete: jest.fn().mockResolvedValue({
    _id: '507f1f77bcf86cd799439011',
    name: 'John Doe',
    email: 'john@test.com',
    totalHours: 0
  }),
  prototype: { save: jest.fn() }
}));

jest.mock('../src/models/Project', () => ({
  find: jest.fn().mockResolvedValue([]),
  prototype: { save: jest.fn() }
}));

jest.mock('../src/models/Impact', () => ({
  find: jest.fn().mockReturnValue({
    populate: jest.fn().mockReturnValue({
      populate: jest.fn().mockResolvedValue([])
    })
  }),
  prototype: { save: jest.fn() }
}));

const app = require('../src/index');

describe('Volunteer CRUD Operations', () => {
  it('GET /api/volunteers/:id - should return one volunteer', async () => {
    const response = await request(app)
      .get('/api/volunteers/507f1f77bcf86cd799439011');
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('John Doe');
  });

  it('PUT /api/volunteers/:id - should update volunteer', async () => {
    const response = await request(app)
      .put('/api/volunteers/507f1f77bcf86cd799439011')
      .send({ name: 'Updated Name' });
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Updated Name');
  });

  it('DELETE /api/volunteers/:id - should delete volunteer', async () => {
    const response = await request(app)
      .delete('/api/volunteers/507f1f77bcf86cd799439011');
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Volunteer deleted');
  });

  it('GET /api/volunteers/:id - should return 404 if not found', async () => {
    const Volunteer = require('../src/models/Volunteer');
    Volunteer.findById.mockResolvedValueOnce(null);
    const response = await request(app)
      .get('/api/volunteers/507f1f77bcf86cd799439011');
    expect(response.statusCode).toBe(404);
  });
});
