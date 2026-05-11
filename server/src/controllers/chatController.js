const { askRAG } = require('../services/ragService');

const chat = async (req, res) => {
  try {
    const { question } = req.body;
    
    if (!question) {
      return res.status(400).json({ message: 'Question is required' });
    }

    const result = await askRAG(question);
    
    res.status(200).json({
      question,
      answer: result.answer,
      source: result.source
    });
  } catch (error) {
    console.error('Chat error:', error.message);
    res.status(500).json({ message: 'Chat service error: ' + error.message });
  }
};

module.exports = { chat };
