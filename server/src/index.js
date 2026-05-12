const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
connectDB();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'Volunteer Impact Tracker API', version: '1.0.0' },
  },
  apis: ['./src/routes/*.js'],
};
const specs = swaggerUi.setup(swaggerJsdoc(swaggerOptions));
app.use('/api-docs', swaggerUi.serve, specs);

app.get('/health', (req, res) => res.json({ status: 'ok', message: 'Volunteer Impact Tracker API is running', timestamp: new Date().toISOString() }));
app.use('/api/volunteers', require('./routes/volunteerRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/impacts', require('./routes/impactRoutes'));
app.use('/api/stats', require('./routes/statsRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log('Server started on port ' + PORT));
}

module.exports = app;
