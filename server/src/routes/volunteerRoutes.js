const express = require('express');
const router = express.Router();
const { getVolunteers, createVolunteer } = require('../controllers/volunteerController');

/**
 * @swagger
 * /api/volunteers:
 *   get:
 *     summary: Get all volunteers
 *     tags: [Volunteers]
 *     responses:
 *       200:
 *         description: List of volunteers
 */
router.get('/', getVolunteers);

/**
 * @swagger
 * /api/volunteers:
 *   post:
 *     summary: Create a new volunteer
 *     tags: [Volunteers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Volunteer created
 *       400:
 *         description: Missing required fields
 */
router.post('/', createVolunteer);

module.exports = router;
