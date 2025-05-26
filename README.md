# Sports Ground Booking System API

A comprehensive REST API for managing sports ground bookings with real-time updates.

## Features

- User authentication (JWT-based)
- Sports ground management
- Booking system with conflict prevention
- Real-time updates via WebSockets
- Input validation
- Error handling
- MVC architecture

## Tech Stack

- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Socket.IO for real-time updates
- Joi for validation

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Create `.env` file with your configurations
4. Start MongoDB
5. Run the server: `npm run dev`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login

### Grounds
- `GET /api/grounds` - Get all available grounds
- `GET /api/grounds/:id` - Get specific ground
- `POST /api/grounds/seed` - Seed sample ground data (authenticated)

### Bookings
- `POST /api/bookings` - Create new booking (authenticated)
- `GET /api/bookings/:userId` - Get user's bookings (authenticated)
- `GET /api/bookings` - Get all bookings (authenticated)
- `DELETE /api/bookings/:bookingId` - Cancel booking (authenticated)

## Usage Examples

### 1. Register User
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 3. Get Grounds
```bash
curl -X GET http://localhost:3000/api/grounds
```

### 4. Create Booking
```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "groundId": "GROUND_ID",
    "date": "2024-12-25",
    "timeSlot": {
      "startTime": "10:00",
      "endTime": "12:00"
    }
  }'
```

## Real-time Features

The API includes WebSocket support for real-time updates:
- New booking notifications
- Booking cancellation alerts

## Architecture

The project follows MVC (Model-View-Controller) pattern:
- **Models**: Database schemas (User, Ground, Booking)
- **Controllers**: Business logic handlers
- **Views**: API responses (JSON)
- **Routes**: API endpoint definitions
- **Middleware**: Authentication, validation, error handling

## Deployment

1. Set up MongoDB database
2. Configure environment variables
4. Update CORS settings for production
