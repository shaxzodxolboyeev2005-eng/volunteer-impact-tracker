const Volunteer = require('../models/Volunteer');

const getVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.status(200).json(volunteers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getVolunteerById = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);
    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }
    res.status(200).json(volunteer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createVolunteer = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }
    const volunteer = new Volunteer({ name, email });
    const saved = await volunteer.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }
    res.status(200).json(volunteer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findByIdAndDelete(req.params.id);
    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }
    res.status(200).json({ message: 'Volunteer deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getVolunteers, getVolunteerById, createVolunteer, updateVolunteer, deleteVolunteer };
