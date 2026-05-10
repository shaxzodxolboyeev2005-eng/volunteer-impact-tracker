const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Volunteer Impact Tracker API is running',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/volunteers', require('./routes/volunteerRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/impacts', require('./routes/impactRoutes'));

if (require.main === module) {
  app.listen(process.env.PORT || 5000, () => {
    console.log('Server running on port ' + (process.env.PORT || 5000));
  });
}

module.exports = app;
