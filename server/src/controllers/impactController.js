const Impact = require('../models/Impact');

const getImpacts = async (req, res) => {
  try {
    const impacts = await Impact.find()
      .populate('volunteer', 'name email')
      .populate('project', 'title');
    res.status(200).json(impacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createImpact = async (req, res) => {
  try {
    const { volunteer, project, hoursSpent, description } = req.body;
    if (!volunteer || !project || !hoursSpent) {
      return res.status(400).json({ message: 'Volunteer, project and hoursSpent are required' });
    }
    const impact = new Impact({ volunteer, project, hoursSpent, description });
    const saved = await impact.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getImpacts, createImpact };
