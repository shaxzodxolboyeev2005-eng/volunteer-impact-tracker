const express = require('express');
const router = express.Router();
const { createImpact, getImpacts } = require('../controllers/impactController');

router.post('/', createImpact);
router.get('/', getImpacts);

module.exports = router;
