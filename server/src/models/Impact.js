const mongoose = require('mongoose');

const impactSchema = new mongoose.Schema({
  volunteer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Volunteer',
    required: true
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  hoursSpent: {
    type: Number,
    required: true,
    min: 0
  },
  date: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    trim: true
  },
  socialScore: {
    type: Number,
    default: 0,
    min: 0
  }
}, { timestamps: true });

impactSchema.pre('save', function(next) {
  this.socialScore = this.hoursSpent * 10;
  next();
});

module.exports = mongoose.model('Impact', impactSchema);
