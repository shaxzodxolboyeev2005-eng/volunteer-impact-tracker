const Impact = require('../models/Impact');
const Volunteer = require('../models/Volunteer');

const createImpact = async (req, res) => {
  try {
    const { volunteerId, projectId, hoursSpent, description } = req.body;

    // Ручная проверка обязательных полей для прохождения тестов
    if (!volunteerId || !projectId || !hoursSpent) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const impact = new Impact({ 
      volunteer: volunteerId, 
      project: projectId, 
      hoursSpent, 
      description,
      socialScore: hoursSpent * 10 
    });

    const saved = await impact.save();
    
    // Атомарное обновление часов
    await Volunteer.findByIdAndUpdate(volunteerId, { $inc: { totalHours: hoursSpent } });
    
    res.status(201).json(saved);
  } catch (error) {
    // Если ошибка валидации Mongoose (например, отрицательные часы)
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

const getImpacts = async (req, res) => {
  try {
    const impacts = await Impact.find().populate('volunteer').populate('project');
    res.status(200).json(impacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createImpact, getImpacts };
