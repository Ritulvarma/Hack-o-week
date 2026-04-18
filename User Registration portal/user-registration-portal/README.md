# User Registration Portal

A full-stack web application for user registration with JWT authentication, encrypted user profiles, and wearable sync functionality.

## Features

- User signup and login with JWT authentication
- Encrypted storage of user profiles
- API endpoints for wearable data synchronization
- Responsive frontend built with Next.js and Tailwind CSS
- Backend API using Next.js API routes
- MongoDB for data storage

## Prerequisites

- Node.js
- MongoDB (running locally or provide connection string)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables in `.env.local`:
   ```
   MONGODB_URI=mongodb://localhost:27017/userportal
   JWT_SECRET=your_jwt_secret
   ENCRYPTION_KEY=your_32_byte_encryption_key_in_hex
   ```

3. Start MongoDB if running locally.

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## API Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/profile` - Get user profile (authenticated)
- `POST /api/profile` - Update user profile (authenticated)
- `POST /api/wearable/sync` - Sync wearable data (authenticated)
