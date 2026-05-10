const Volunteer = require('../models/Volunteer');
const Project = require('../models/Project');
const Impact = require('../models/Impact');

const getStats = async (req, res) => {
  try {
    const totalVolunteers = await Volunteer.countDocuments();
    const totalProjects = await Project.countDocuments();
    const impacts = await Impact.find();
    const totalHours = impacts.reduce((sum, i) => sum + i.hoursSpent, 0);
    const totalSocialScore = impacts.reduce((sum, i) => sum + i.socialScore, 0);
    res.status(200).json({
      totalVolunteers,
      totalProjects,
      totalImpacts: impacts.length,
      totalHours,
      totalSocialScore
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getStats };
