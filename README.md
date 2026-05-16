# Volunteer Impact Tracker

[![CI Pipeline](https://github.com/shaxzodxolboyeev2005-eng/volunteer-impact-tracker/actions/workflows/ci-pipeline.yml/badge.svg)](https://github.com/shaxzodxolboyeev2005-eng/volunteer-impact-tracker/actions/workflows/ci-pipeline.yml)
![Tests](https://img.shields.io/badge/tests-28%20passed-brightgreen)
![Node](https://img.shields.io/badge/node-18.x-green)
![MongoDB](https://img.shields.io/badge/mongodb-6.x-green)
![Docker](https://img.shields.io/badge/docker-ready-blue)
![License](https://img.shields.io/badge/license-MIT-blue)

> A production-grade full-stack platform for tracking volunteer hours, managing projects, and measuring social impact — powered by an AI RAG chatbot using Google Gemini.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [CI/CD](#cicd)
- [Contributing](#contributing)

## Overview

Volunteer Impact Tracker solves three core problems for volunteer organizations:
1. No system to track volunteer hours
2. No way to measure real social impact
3. No intelligent assistant for system guidance

## Features

- **Volunteer Management** — Full CRUD operations
- **Project Management** — Create and manage initiatives
- **Impact Tracking** — Log hours, auto-calculate social scores
- **Leaderboard** — Ranked volunteers with medals
- **Statistics Dashboard** — Real-time charts and metrics
- **RAG AI Chatbot** — Google Gemini-powered assistant
- **Swagger API Docs** — Interactive documentation

## Architecture

\\\
┌─────────────────────────────────────────────────────┐
│                   CLIENT (Port 5173)                │
│              React + Vite + Chart.js                │
└──────────────────────┬──────────────────────────────┘
                       │ HTTP/REST
┌──────────────────────▼──────────────────────────────┐
│                  SERVER (Port 5000)                 │
│              Node.js + Express.js                   │
│  /api/volunteers  /api/projects  /api/impacts       │
│  /api/stats       /api/chat      /api-docs          │
└────────────┬────────────────────────┬───────────────┘
             │                        │
┌────────────▼──────────┐  ┌─────────▼───────────────┐
│   MongoDB (Port 27017) │  │   Google Gemini 2.5     │
│   Volunteer            │  │   RAG Pipeline          │
│   Project              │  │   docs/system.md        │
│   Impact               │  │   Knowledge Base        │
└───────────────────────┘  └─────────────────────────┘
\\\

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite 8, Chart.js, React Icons |
| Backend | Node.js 18, Express.js 4 |
| Database | MongoDB 6, Mongoose 7 |
| AI/LLM | Google Gemini 2.5 Flash |
| Testing | Jest 29, Supertest 6 |
| DevOps | Docker, Docker Compose, GitHub Actions |
| Docs | Swagger UI, OpenAPI 3.0 |

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Docker)
- Google Gemini API Key

### Installation

\\\ash
# Clone the repository
git clone https://github.com/shaxzodxolboyeev2005-eng/volunteer-impact-tracker.git
cd volunteer-impact-tracker
\\\

### Environment Setup

Create \server/.env\:
\\\env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/volunteer
GEMINI_API_KEY=your_api_key_here
\\\

### Run with Docker

\\\ash
docker-compose up --build
\\\

### Run Locally

\\\ash
# Backend
cd server
npm install
npm run dev

# Frontend (new terminal)
cd client
npm install
npm run dev
\\\

### Access Points
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Swagger Docs: http://localhost:5000/api-docs

## API Documentation

Full interactive documentation available at \/api-docs\

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /health | Health check |
| GET | /api/volunteers | Get all volunteers |
| POST | /api/volunteers | Create volunteer |
| GET | /api/volunteers/:id | Get by ID |
| PUT | /api/volunteers/:id | Update volunteer |
| DELETE | /api/volunteers/:id | Delete volunteer |
| GET | /api/projects | Get all projects |
| POST | /api/projects | Create project |
| GET | /api/impacts | Get all impacts |
| POST | /api/impacts | Log work hours |
| GET | /api/stats | Get statistics |
| POST | /api/chat | RAG chatbot |

## Testing

\\\ash
cd server
npm test
\\\

**28 tests | 9 test suites | 100% pass rate**

| Suite | Tests | Coverage |
|-------|-------|---------|
| health.test.js | 1 | Health endpoint |
| db.test.js | 2 | Database connection |
| volunteer.model.test.js | 4 | Schema validation |
| project.model.test.js | 4 | Schema validation |
| impact.model.test.js | 6 | Schema + scoring |
| volunteer.routes.test.js | 3 | API routes |
| volunteer.crud.test.js | 4 | CRUD operations |
| impact.routes.test.js | 2 | Impact routes |
| project.model.test.js | 2 | Project routes |

## CI/CD

Every push to \main\ triggers the GitHub Actions pipeline:

1. Checkout code
2. Setup Node.js 18
3. Install dependencies
4. Run security audit (npm audit)
5. Execute 28 tests
6. Build Docker image

## Social Impact Score

\\\
socialScore = hoursSpent x 10
\\\

Each volunteer hour generates 10 social score points, tracked per impact record and aggregated in the stats dashboard.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT License — see [LICENSE](LICENSE) for details.

## Team

| Name | Role |
|------|------|
| Shakhzod Kholboyev | Technical Lead |
| Asil | Project Manager |

**Central Asian University | Engineering Faculty | Spring 2025-2026**
