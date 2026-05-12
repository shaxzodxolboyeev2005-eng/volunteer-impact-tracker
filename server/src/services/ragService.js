const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const loadDocs = () => {
  const docsPath = path.join(__dirname, '../../docs/system.md');
  return fs.readFileSync(docsPath, 'utf-8');
};

const askRAG = async (question) => {
  const systemDocs = loadDocs();
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  const prompt = 'You are a helpful assistant for the Volunteer Impact Tracker system. You must ONLY answer questions about the Volunteer Impact Tracker system. If a question is not related to this system, respond with: I can only answer questions about the Volunteer Impact Tracker system. Here is the system documentation: ' + systemDocs + ' User question: ' + question + ' Rules: 1. Only use information from the documentation above. 2. If the question is not about the system, reject it politely. 3. Always mention the source section when answering. 4. Be concise and helpful.';
  const result = await model.generateContent(prompt);
  const response = result.response.text();
  return { answer: response, source: 'System Documentation' };
};

module.exports = { askRAG };
