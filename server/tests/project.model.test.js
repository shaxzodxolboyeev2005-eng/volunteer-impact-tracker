const mongoose = require('mongoose');
const Project = require('../src/models/Project');

describe('Project Model', () => {
  it('should be defined', () => {
    expect(Project).toBeDefined();
  });

  it('should require title field', () => {
    const project = new Project({});
    const error = project.validateSync();
    expect(error.errors['title']).toBeDefined();
  });

  it('should have default status as active', () => {
    const project = new Project({ title: 'Test Project' });
    expect(project.status).toBe('active');
  });

  it('should only allow valid status values', () => {
    const project = new Project({ 
      title: 'Test',
      status: 'invalid'
    });
    const error = project.validateSync();
    expect(error.errors['status']).toBeDefined();
  });
});
