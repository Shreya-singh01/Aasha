# Trafficking Prevention Platform - Backend API

A comprehensive Express.js backend API for managing survivor stories and related data for the Trafficking Prevention Platform.

## Features

- **Survivor Stories Management**: Complete CRUD operations for survivor stories
- **MongoDB Integration**: Robust database operations with Mongoose ODM
- **Input Validation**: Comprehensive validation using express-validator
- **Error Handling**: Centralized error handling with proper HTTP status codes
- **Security**: Helmet.js for security headers, CORS configuration
- **Logging**: Request logging with Morgan
- **Statistics**: Built-in analytics and reporting features
- **Search & Filtering**: Advanced search and filtering capabilities
- **Pagination**: Efficient pagination for large datasets

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (MongoDB Atlas)
- **Mongoose** - Object Data Modeling
- **express-validator** - Input validation
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn package manager

## Installation

1. **Clone the repository and navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Copy `config.env` and update with your MongoDB Atlas connection string
   - Replace `xyz` with your actual MongoDB Atlas connection string
   - Update other configuration values as needed

4. **Start the development server:**
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `config.env` file in the backend directory:

```env
# Server Configuration
PORT=5005
NODE_ENV=development

# MongoDB Atlas Connection String
MONGODB_URI=your_mongodb_atlas_connection_string_here

# JWT Secret (change this to a secure random string in production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# CORS Configuration
CORS_ORIGIN=http://localhost:5174

# API Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## API Endpoints

### Survivor Stories

#### Get All Survivor Stories
```
GET /api/survivor-stories
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10, max: 100)
- `search` (optional): Search term
- `filterType` (optional): Filter by exploitation type ('all', 'sex', 'labor')
- `sortBy` (optional): Sort field ('rescueDate', 'age', 'location', 'createdAt')
- `sortOrder` (optional): Sort order ('asc', 'desc')

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "story_id",
      "rescueDate": "2023-01-15T00:00:00.000Z",
      "location": "Mumbai, India",
      "exploitationType": "sex",
      "duration": "2 years",
      "currentStatus": "Recovering in safe house",
      "aspirations": "Wants to become a counselor",
      "livingConditions": "Living in government shelter",
      "age": 22,
      "gender": "Female",
      "source": "Police rescue operation",
      "formattedRescueDate": "1/15/2023",
      "createdAt": "2023-01-20T10:30:00.000Z",
      "updatedAt": "2023-01-20T10:30:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 50,
    "itemsPerPage": 10
  }
}
```

#### Get Single Survivor Story
```
GET /api/survivor-stories/:id
```

#### Create New Survivor Story
```
POST /api/survivor-stories
```

**Request Body:**
```json
{
  "rescueDate": "2023-01-15",
  "location": "Mumbai, India",
  "exploitationType": "sex",
  "duration": "2 years",
  "currentStatus": "Recovering in safe house",
  "aspirations": "Wants to become a counselor",
  "livingConditions": "Living in government shelter",
  "age": 22,
  "gender": "Female",
  "source": "Police rescue operation"
}
```

#### Update Survivor Story
```
PUT /api/survivor-stories/:id
```

#### Delete Survivor Story (Soft Delete)
```
DELETE /api/survivor-stories/:id
```

#### Get Statistics
```
GET /api/survivor-stories/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalStories": 150,
    "sexTrafficking": 120,
    "laborTrafficking": 30,
    "averageAge": 24.5,
    "recentStories": 15
  }
}
```

#### Search Survivor Stories
```
GET /api/survivor-stories/search
```

**Query Parameters:**
- `q` (optional): Search query
- `type` (optional): Filter by type ('all', 'sex', 'labor')
- `location` (optional): Filter by location
- `ageRange` (optional): Filter by age range (e.g., "18-25")

### Health Check
```
GET /health
```

## Data Model

### Survivor Story Schema

```javascript
{
  rescueDate: Date,           // Required, cannot be future date
  location: String,           // Required, max 200 chars
  exploitationType: String,   // Required, enum: ['sex', 'labor']
  duration: String,           // Required, max 100 chars
  currentStatus: String,      // Required, max 500 chars
  aspirations: String,        // Required, max 1000 chars
  livingConditions: String,   // Required, max 1000 chars
  age: Number,                // Required, 0-120
  gender: String,             // Required, enum: ['Female', 'Male', 'Non-binary', 'Other']
  source: String,             // Required, max 300 chars
  createdBy: ObjectId,        // Required, reference to User
  isActive: Boolean,          // Default: true
  createdAt: Date,            // Auto-generated
  updatedAt: Date             // Auto-generated
}
```

## Validation Rules

- **Rescue Date**: Must be a valid date, cannot be in the future
- **Location**: Required, 1-200 characters
- **Exploitation Type**: Must be 'sex' or 'labor'
- **Duration**: Required, 1-100 characters
- **Current Status**: Required, 1-500 characters
- **Aspirations**: Required, 1-1000 characters
- **Living Conditions**: Required, 1-1000 characters
- **Age**: Required, integer between 0-120
- **Gender**: Must be one of: Female, Male, Non-binary, Other
- **Source**: Required, 1-300 characters

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "fieldName",
      "message": "Validation error message"
    }
  ]
}
```

## Development

### Running in Development Mode
```bash
npm run dev
```

### Running in Production Mode
```bash
npm start
```

### Project Structure
```
backend/
├── config/
│   └── database.js          # Database configuration
├── controllers/
│   └── survivorStoryController.js  # Business logic
├── middleware/
│   ├── errorHandler.js      # Error handling
│   └── validation.js        # Input validation
├── models/
│   └── SurvivorStory.js     # Mongoose model
├── routes/
│   └── survivorStories.js   # API routes
├── config.env               # Environment variables
├── package.json             # Dependencies
├── server.js                # Main server file
└── README.md                # This file
```

## Security Features

- **Helmet.js**: Security headers
- **CORS**: Cross-origin resource sharing configuration
- **Input Validation**: Comprehensive validation for all inputs
- **Error Handling**: No sensitive information leaked in errors
- **Rate Limiting**: Built-in rate limiting (configurable)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team. 