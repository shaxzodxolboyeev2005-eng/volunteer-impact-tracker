const mongoose = require('mongoose');
const Impact = require('../src/models/Impact');

describe('Impact Model', () => {
  it('should be defined', () => {
    expect(Impact).toBeDefined();
  });

  it('should require volunteer field', () => {
    const impact = new Impact({
      project: new mongoose.Types.ObjectId(),
      hoursSpent: 5
    });
    const error = impact.validateSync();
    expect(error.errors['volunteer']).toBeDefined();
  });

  it('should require project field', () => {
    const impact = new Impact({
      volunteer: new mongoose.Types.ObjectId(),
      hoursSpent: 5
    });
    const error = impact.validateSync();
    expect(error.errors['project']).toBeDefined();
  });

  it('should require hoursSpent field', () => {
    const impact = new Impact({
      volunteer: new mongoose.Types.ObjectId(),
      project: new mongoose.Types.ObjectId()
    });
    const error = impact.validateSync();
    expect(error.errors['hoursSpent']).toBeDefined();
  });

  it('should not allow negative hoursSpent', () => {
    const impact = new Impact({
      volunteer: new mongoose.Types.ObjectId(),
      project: new mongoose.Types.ObjectId(),
      hoursSpent: -1
    });
    const error = impact.validateSync();
    expect(error.errors['hoursSpent']).toBeDefined();
  });

  it('should have default socialScore as 0', () => {
    const impact = new Impact({
      volunteer: new mongoose.Types.ObjectId(),
      project: new mongoose.Types.ObjectId(),
      hoursSpent: 5
    });
    expect(impact.socialScore).toBe(0);
  });
});
