const express = require('express');
const router = express.Router();
const { getVolunteers, getVolunteerById, createVolunteer, updateVolunteer, deleteVolunteer } = require('../controllers/volunteerController');

router.get('/', getVolunteers);
router.get('/:id', getVolunteerById);
router.post('/', createVolunteer);
router.put('/:id', updateVolunteer);
router.delete('/:id', deleteVolunteer);

module.exports = router;
