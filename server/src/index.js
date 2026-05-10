const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('MongoDB Connected!');
      app.listen(process.env.PORT || 5000, () => {
        console.log('Server running on port ' + (process.env.PORT || 5000));
      });
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err.message);
      process.exit(1);
    });
}

module.exports = app;
