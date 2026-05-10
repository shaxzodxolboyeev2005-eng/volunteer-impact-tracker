# Volunteer Impact Tracker

A full-stack analytics platform for tracking volunteer hours and measuring social impact.

## Tech Stack
- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Database:** MongoDB
- **Testing:** Jest + Supertest
- **Containerization:** Docker + Docker Compose
- **CI/CD:** GitHub Actions

## Getting Started

### Prerequisites
- Node.js 18+
- Docker Desktop

### Run with Docker
\\\ash
docker-compose up --build
\\\

### Run locally

**Backend:**
\\\ash
cd server
npm install
npm run dev
\\\

**Frontend:**
\\\ash
cd client
npm install
npm run dev
\\\

### Run Tests
\\\ash
cd server
npm test
\\\

## API Documentation
Swagger UI available at:
\\\
http://localhost:5000/api-docs
\\\

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /health | Health check |
| GET | /api/volunteers | Get all volunteers |
| POST | /api/volunteers | Create volunteer |
| GET | /api/projects | Get all projects |
| POST | /api/projects | Create project |
| GET | /api/impacts | Get all impacts |
| POST | /api/impacts | Create impact |

## CI/CD Pipeline
GitHub Actions automatically:
1. Runs all tests
2. Builds Docker image
3. Validates code quality
