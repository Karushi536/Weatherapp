# Weatherapp
Weather App (Next.js + Laravel API)

# Table of Contents
Features
Demo
Tech Stack
Getting Started
API Documentation
Deployment
Development
Testing
Project Structure
Contributing
License
Contact

# Features
Real-time weather data for any location

Temperature unit switching (Celsius/Fahrenheit)

Detailed weather metrics (humidity, wind speed, pressure)

Sunrise/sunset times

Responsive design with dark/light mode

Error handling and loading states

Type-safe API interactions

# Tech Stack
Frontend:

Next.js 14 (App Router)

TypeScript

Tailwind CSS + RippleUI

React Hook Forms

Axios

Backend:

Laravel 10

Guzzle HTTP Client

PHP 8.2

Services:

OpenWeatherMap API

Getting Started
set up laravel

composer create-project laravel/laravel weather-api
cd weather-api

Install Guzzle HTTP client

composer require guzzlehttp/guzzle

API Documentation
Endpoints
GET /api/weather/current

Fetches current weather for a location

Parameters:

location (required): City name or location

units (optional): metric or imperial (default: metric)

Example Request:

bash
GET http://localhost:8000/api/weather/current?location=Paris&units=metric
Example Response:

json
{
  "success": true,
  "data": {
    "location": "Paris",
    "country": "FR",
    "temperature": 22.5,
    "feels_like": 24.3,
    "weather": {
      "main": "Clouds",
      "description": "scattered clouds",
      "icon": "03d"
    },
    "sunrise": "06:45",
    "sunset": "21:20"
  }
}
☁️ Deployment
Frontend (Next.js) to Vercel
Push code to GitHub repository

Create new project in Vercel

Connect your GitHub repository

Set environment variables:

NEXT_PUBLIC_API_URL = your production API URL

Deploy!

Backend (Laravel) to Laravel Forge
Configure server with PHP 8.2+

Clone repository

Set up environment variables in .env

Run:

bash
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
Alternative: Docker Deployment
bash
# Frontend
docker build -t weather-frontend -f weather-app/Dockerfile .
docker run -p 3000:3000 weather-frontend

# Backend
docker-compose up --build
Testing
Frontend Tests:

bash
npm run test  # Runs Jest + React Testing Library
Backend Tests:

bash
php artisan test
Test Coverage:

bash
# Frontend
npm run test:coverage

# Backend
XDEBUG_MODE=coverage php artisan test --coverage
CI/CD Pipeline
Example GitHub Actions workflow:

yaml
name: CI/CD Pipeline

on: [push]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - name: Frontend Tests
        run: |
          cd weather-app
          npm install
          npm run test
      
      - name: Backend Tests
        run: |
          cd weather-api
          composer install
          php artisan test
Environment Variables
Frontend:

NEXT_PUBLIC_API_URL=http://localhost:8000/api
Backend:

OPENWEATHERMAP_API_KEY=your_key_here
APP_ENV=local
APP_DEBUG=true
(Rest of the README remains the same)

This expanded version includes:

Proper API documentation

Multiple deployment options

Testing instructions

CI/CD pipeline example

Environment variables reference

