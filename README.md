# Travel Agency MERN App

A full-stack travel booking platform built with the **MERN stack**, featuring user authentication, adviser and admin dashboards, Stripe integration, and responsive design. This project simulates a real-world travel agency web application.

**Live demo**: [https://travel-agency-ccdevx.netlify.app](https://travel-agency-ccdevx.netlify.app)

---

## Features

- User registration and login (JWT-based)
- Browse available trips by destination
- Secure Stripe checkout process
- Adviser dashboard to manage trips and clients
- Admin dashboard to manage agencies and advisers
- Multilingual support with `i18next`
- Dynamic photo gallery for each trip
- REST API with Express.js
- Redux Toolkit for state management
- Tailwind CSS for responsive UI
- Security: Helmet, CORS, Rate limiting

---

## Tech Stack

### Frontend

- React + Vite
- React Router DOM
- Redux Toolkit
- Tailwind CSS
- i18next

### Backend

- Node.js + Express
- MongoDB + Mongoose
- Stripe API
- Helmet, Morgan, CORS, express-rate-limit

---

## Project Structure
```
travel-agency-mern-app/
├── travel-agency-api/ # Backend (Node.js + Express + MongoDB)
│ ├── api/ # Reusable backend modules (ex: validators)
│ ├── controllers/ # Request handlers for routes
│ ├── helpers/ # Utility functions (e.g., auth, logic)
│ ├── logs/ # Winston logs output
│ ├── middlewares/ # Custom Express middlewares (auth, errors, etc.)
│ ├── models/ # Mongoose data models
│ ├── public/ # Static assets (trip images, icons, etc.)
│ ├── routes/ # API route declarations
│ ├── services/ # Business logic / abstraction over models
│ ├── utils/ # Logger, database connection, constants
│ ├── database.js # MongoDB connection function
│ ├── index.js # Main Express server entry point
│ └── vercel.json # Vercel deployment config
│
├── travel-agency-front/ # Frontend (React + Tailwind + Vite)
│ ├── public/ # Static frontend assets
│ ├── src/
│ │ ├── components/ # UI components (header, cards, etc.)
│ │ ├── pages/ # React views (home, trips, profile, etc.)
│ │ ├── router/ # React Router configuration
│ │ ├── locales/ # i18n translation files
│ │ └── store.ts # Redux store configuration
│ ├── index.html # HTML entry point
│ ├── vite.config.ts # Vite configuration
│ └── tsconfig.*.json # TypeScript configuration files
``` 
## Local Installation (Quick Start)

1. **Clone the project**:

git clone https://github.com/your-username/travel-agency-mern-app.git
cd travel-agency-mern-app

2. **Install dependencies for both frontend and backend**:

# Backend
cd travel-agency-api
npm install

# Frontend
cd ../travel-agency-front
npm install

2. **Create a .env file in travel-agency-api/ with the following variables**:
``` 
JWT_SECRET_KEY=your_jwt_secret
STRIPE_PRIVATE_KEY=your_stripe_secret
CLIENT_URL_LOCAL=http://localhost:5173
CLIENT_URL_PROD=https://your-netlify-url.netlify.app
MONGO_PWD=your_mongodb_password
``` 
Make sure to whitelist the frontend URLs in your backend CORS configuration.
