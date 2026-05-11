const express = require('express');
const router = express.Router();
const { getVolunteers, createVolunteer } = require('../controllers/volunteerController');

/**
 * @swagger
 * tags:
 * name: Volunteers
 * description: Управление волонтерами
 */

/**
 * @swagger
 * components:
 * schemas:
 * Volunteer:
 * type: object
 * required:
 * - name
 * - email
 * properties:
 * name:
 * type: string
 * description: Имя волонтера
 * email:
 * type: string
 * description: Электронная почта
 * example:
 * name: Shaxzod Xolboyev
 * email: shax@cau.uz
 */

/**
 * @swagger
 * /api/volunteers:
 * get:
 * summary: Получить всех волонтеров
 * tags: [Volunteers]
 * responses:
 * 200:
 * description: Успешный возврат списка
 * post:
 * summary: Создать нового волонтера
 * tags: [Volunteers]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Volunteer'
 * responses:
 * 201:
 * description: Волонтер успешно создан
 */

router.get('/', getVolunteers);
router.post('/', createVolunteer);

module.exports = router;
