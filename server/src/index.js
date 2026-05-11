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
    paths: {
      '/api/volunteers': {
        get: { tags: ['Volunteers'], responses: { 200: { description: 'OK' } } },
        post: { 
          tags: ['Volunteers'], 
          requestBody: { 
            content: { 'application/json': { schema: { 
              type: 'object', 
              properties: { name: { type: 'string', example: 'Shaxzod' }, email: { type: 'string', example: 'shax@cau.uz' } } 
            } } } 
          },
          responses: { 201: { description: 'Created' } } 
        }
      },
      '/api/projects': {
        get: { tags: ['Projects'], responses: { 200: { description: 'OK' } } },
        post: { 
          tags: ['Projects'], 
          requestBody: { 
            content: { 'application/json': { schema: { 
              type: 'object', 
              properties: { title: { type: 'string', example: 'Green City' }, description: { type: 'string', example: 'Planting trees' } } 
            } } } 
          },
          responses: { 201: { description: 'Created' } } 
        }
      },
      '/api/impacts': {
        get: { tags: ['Impacts'], responses: { 200: { description: 'OK' } } },
        post: { 
          tags: ['Impacts'], 
          requestBody: { 
            content: { 'application/json': { schema: { 
              type: 'object', 
              properties: { volunteerId: { type: 'string' }, projectId: { type: 'string' }, hoursSpent: { type: 'number' }, description: { type: 'string' } } 
            } } } 
          },
          responses: { 201: { description: 'Created' } } 
        }
      }
    }
  },
  apis: [], 
};

const specs = swaggerUi.setup(swaggerJsdoc(swaggerOptions));
app.use('/api-docs', swaggerUi.serve, specs);

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/volunteers', require('./routes/volunteerRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/impacts', require('./routes/impactRoutes'));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
