const mongoose = require('mongoose');

const impactSchema = new mongoose.Schema({
  volunteer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Volunteer', 
    required: [true, 'Volunteer ID is required'] 
  },
  project: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Project', 
    required: [true, 'Project ID is required'] 
  },
  hoursSpent: { 
    type: Number, 
    required: [true, 'Hours spent is required'],
    min: [1, 'Hours spent cannot be less than 1'] 
  },
  socialScore: { type: Number, default: 0 },
  description: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Impact', impactSchema);
