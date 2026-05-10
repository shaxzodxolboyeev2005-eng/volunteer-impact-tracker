const express = require('express');
const router = express.Router();
const { getImpacts, createImpact } = require('../controllers/impactController');

router.get('/', getImpacts);
router.post('/', createImpact);

module.exports = router;
