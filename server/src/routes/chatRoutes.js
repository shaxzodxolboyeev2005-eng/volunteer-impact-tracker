const express = require('express');
const router = express.Router();
const { chat } = require('../controllers/chatController');

/**
 * @swagger
 * /api/chat:
 *   post:
 *     summary: Ask the RAG chatbot a question
 *     tags: [Chatbot]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *             properties:
 *               question:
 *                 type: string
 *                 example: How do I create a volunteer?
 *     responses:
 *       200:
 *         description: Chatbot answer
 *       400:
 *         description: Question is required
 */
router.post('/', chat);

module.exports = router;
