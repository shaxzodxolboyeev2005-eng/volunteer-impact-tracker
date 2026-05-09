const express = require('express');
const router = express.Router();
const { getVolunteers, createVolunteer } = require('../controllers/volunteerController');

router.get('/', getVolunteers);
router.post('/', createVolunteer);

module.exports = router;
