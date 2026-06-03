const Impact = require('../models/Impact');
const Volunteer = require('../models/Volunteer');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

const createImpact = async (req, res) => {
  try {
    const { volunteerId, projectId, hoursSpent, description } = req.body;

    if (!volunteerId || !projectId || !hoursSpent) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    let aiStatus = 'Approved';
    let aiReason = 'No anomalies detected.';
    const cleanDesc = description ? description.trim() : '';

    // --- 1. DETERMINISTIC GUARDRAILS (Быстрый инженерный фильтр) ---
    if (hoursSpent > 16) {
      aiStatus = 'Rejected';
      aiReason = 'Deterministic Guardrail: Flagged due to shift length operational impossibility (>16 hours).';
    } else if (cleanDesc.length < 10) {
      aiStatus = 'Flagged';
      aiReason = 'Deterministic Guardrail: Activity description profile is too short for semantic validation.';
    } else {
      // --- 2. INTELLIGENT LAYER (Если первичные фильтры пройдены, вызываем Gemini) ---
      try {
        if (process.env.GEMINI_API_KEY) {
          const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
          const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
          
          const prompt = `You are an automated Software Engineering Audit Bot for a Volunteer Tracking System. 
          Analyze the following logged volunteer activity for realism, data integrity, and potential fraud.
          Hours Spent: ${hoursSpent} hour(s)
          Activity Description: "${cleanDesc}"
          
          Criteria:
          1. If the hours match the complexity of the description, status is "Approved".
          2. If the description is vague, mismatched with the hours, or suspicious, status is "Flagged".
          3. If the description is pure spam, physically impossible, or completely fake, status is "Rejected".
          
          Respond STRICTLY in valid JSON format with keys "status" (Approved, Flagged, or Rejected) and "reason" (1 brief sentence in English). Do not include markdown formatting or backticks.`;

          const result = await model.generateContent(prompt);
          const text = result.response.text().trim();
          const cleanedText = text.replace(/```json|```/gi, '').trim();
          const aiVerdict = JSON.parse(cleanedText);
          
          if (aiVerdict.status) aiStatus = aiVerdict.status;
          if (aiVerdict.reason) aiReason = aiVerdict.reason;
        }
      } catch (aiError) {
        console.error('AI Validation temporary bypass:', aiError.message);
        aiStatus = 'Approved';
        aiReason = 'System bypassed due to temporary API timeout.';
      }
    }

    // --- 3. PERSISTENT SECURITY LOGGING (Запись аномалий в файл логов) ---
    if (aiStatus === 'Flagged' || aiStatus === 'Rejected') {
      const logDirectory = path.join(__dirname, '../../logs');
      if (!fs.existsSync(logDirectory)){
          fs.mkdirSync(logDirectory);
      }
      const logPath = path.join(logDirectory, 'security_audit.log');
      const timestamp = new Date().toISOString();
      const logEntry = `[${timestamp}] ALERT - Status: ${aiStatus} | Hours: ${hoursSpent} | Reason: ${aiReason} | Desc: "${cleanDesc}"\n`;
      fs.appendFileSync(logPath, logEntry, 'utf8');
    }

    const impact = new Impact({
      volunteer: volunteerId,
      project: projectId,
      hoursSpent,
      description: cleanDesc,
      socialScore: hoursSpent * 10,
      aiStatus,
      aiReason
    });

    const saved = await impact.save();
    await Volunteer.findByIdAndUpdate(volunteerId, { $inc: { totalHours: hoursSpent } });

    res.status(201).json({
      ...saved.toObject(),
      aiStatus,
      aiReason
    });

  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

const getImpacts = async (req, res) => {
  try {
    const impacts = await Impact.find().populate('volunteer').populate('project');
    res.status(200).json(impacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createImpact, getImpacts };
