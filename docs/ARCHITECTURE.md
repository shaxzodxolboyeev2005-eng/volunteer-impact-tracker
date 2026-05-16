# System Architecture

## Overview
Three-tier MERN architecture with AI service layer.

## Components

### Frontend (React + Vite)
- Port: 5173
- State: React hooks
- HTTP: Axios
- Charts: Chart.js

### Backend (Node.js + Express)
- Port: 5000
- Pattern: MVC
- Auth: None (planned)
- Docs: Swagger

### Database (MongoDB)
- Port: 27017
- ODM: Mongoose
- Models: Volunteer, Project, Impact

### AI Service (RAG)
- Model: Google Gemini 2.5 Flash
- Knowledge: docs/system.md
- Pattern: Context injection

## Data Flow
User → React UI → Axios → Express API → MongoDB
                       → ragService → Gemini API

## Social Impact Formula
socialScore = hoursSpent x 10