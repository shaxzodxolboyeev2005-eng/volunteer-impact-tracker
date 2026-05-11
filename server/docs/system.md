# Volunteer Impact Tracker - System Documentation

## What is this system?
Volunteer Impact Tracker is a full-stack web platform for tracking volunteer hours and measuring social impact.

## Core Features
- Volunteer Management: Create, read, update, delete volunteers
- Project Management: Create and manage volunteer projects
- Impact Tracking: Record volunteer hours and calculate social scores
- Statistics Dashboard: View total volunteers, projects, hours and social scores
- AI Chatbot: Ask questions about the system

## API Endpoints

### Volunteers
- GET /api/volunteers - Get all volunteers
- GET /api/volunteers/:id - Get volunteer by ID
- POST /api/volunteers - Create new volunteer (requires name and email)
- PUT /api/volunteers/:id - Update volunteer
- DELETE /api/volunteers/:id - Delete volunteer

### Projects
- GET /api/projects - Get all projects
- POST /api/projects - Create new project (requires title)
- GET /api/projects/:id - Get project by ID
- PUT /api/projects/:id - Update project
- DELETE /api/projects/:id - Delete project

### Impacts
- GET /api/impacts - Get all impact records
- POST /api/impacts - Create impact record (requires volunteer, project, hoursSpent)
- GET /api/impacts/:id - Get impact by ID
- DELETE /api/impacts/:id - Delete impact

### Stats
- GET /api/stats - Get system statistics

### Chatbot
- POST /api/chat - Ask chatbot a question

## Authentication
Currently the system does not require authentication. All endpoints are public.

## Technology Stack
- Frontend: React with Vite on port 5173
- Backend: Node.js with Express on port 5000
- Database: MongoDB on port 27017
- AI: RAG pipeline with Google Gemini

## User Roles
- Volunteer: A person who donates time to projects
- Project: An initiative that volunteers participate in
- Impact: A record of hours spent by a volunteer on a project

## Social Impact Score
Each hour of volunteering generates 10 social score points.
Formula: socialScore = hoursSpent * 10

## How to connect
Send HTTP requests to http://localhost:5000/api
Example: GET http://localhost:5000/api/volunteers

## Common Issues
- If volunteers endpoint fails, check MongoDB is running
- Run docker-compose up mongo to start database
- Frontend runs on port 5173, backend on port 5000
