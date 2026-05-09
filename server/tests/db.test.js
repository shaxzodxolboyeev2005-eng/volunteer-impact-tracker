const mongoose = require('mongoose');

describe('Database Connection', () => {
  it('mongoose should be defined', () => {
    expect(mongoose).toBeDefined();
  });

  it('connectDB function should exist', () => {
    const connectDB = require('../src/db');
    expect(typeof connectDB).toBe('function');
  });
});
