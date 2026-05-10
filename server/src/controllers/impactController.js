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

const getImpactById = async (req, res) => {
  try {
    const impact = await Impact.findById(req.params.id)
      .populate('volunteer', 'name email')
      .populate('project', 'title');
    if (!impact) return res.status(404).json({ message: 'Impact not found' });
    res.status(200).json(impact);
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

const deleteImpact = async (req, res) => {
  try {
    const impact = await Impact.findByIdAndDelete(req.params.id);
    if (!impact) return res.status(404).json({ message: 'Impact not found' });
    res.status(200).json({ message: 'Impact deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getImpacts, getImpactById, createImpact, deleteImpact };
