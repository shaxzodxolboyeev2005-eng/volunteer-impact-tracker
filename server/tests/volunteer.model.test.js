const mongoose = require('mongoose');
const Volunteer = require('../src/models/Volunteer');

describe('Volunteer Model', () => {
  it('should be defined', () => {
    expect(Volunteer).toBeDefined();
  });

  it('should require name field', () => {
    const volunteer = new Volunteer({ email: 'test@test.com' });
    const error = volunteer.validateSync();
    expect(error.errors['name']).toBeDefined();
  });

  it('should require email field', () => {
    const volunteer = new Volunteer({ name: 'John' });
    const error = volunteer.validateSync();
    expect(error.errors['email']).toBeDefined();
  });

  it('should have default totalHours as 0', () => {
    const volunteer = new Volunteer({ name: 'John', email: 'john@test.com' });
    expect(volunteer.totalHours).toBe(0);
  });
});
