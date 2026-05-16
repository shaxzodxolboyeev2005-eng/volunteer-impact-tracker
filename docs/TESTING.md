# Testing Guide

## Running Tests

\\\ash
cd server
npm test
\\\

## Test Suites

- health.test.js — API health check
- db.test.js — Database connection
- volunteer.model.test.js — Schema validation
- project.model.test.js — Schema validation
- impact.model.test.js — Impact scoring
- volunteer.routes.test.js — API routes
- volunteer.crud.test.js — CRUD operations
- impact.routes.test.js — Impact routes
- project.test.js — Project routes

## Results
28 tests | 9 suites | 100% pass rate

## TDD Approach
Red → Green → Refactor methodology used throughout.
