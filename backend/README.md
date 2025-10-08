# Backend - Investment Calculator API

Server-side part of the Investment Calculator application, built on Node.js using Express and MongoDB.

## 🏗️ Architecture

The backend follows Feature-Sliced Design principles with entity-based organization:

```
backend/
├── src/
│   ├── entities/              # Domain entities
│   │   ├── project/
│   │   │   └── model/
│   │   │       ├── store.ts   # Project data access layer
│   │   │       └── types.ts   # Project types
│   │   ├── transaction/
│   │   │   └── model/
│   │   │       └── types.ts
│   │   └── user/
│   │       ├── api/
│   │       │   ├── authRouter.ts  # Auth routes
│   │       │   └── userApi.ts     # User API
│   │       └── types.ts           # User types
│   │
│   ├── middleware/
│   │   └── auth.ts           # JWT authentication middleware
│   │
│   ├── db.ts                 # MongoDB connection
│   ├── server.ts             # Express server setup
│   ├── projects.ts           # Projects endpoints
│   ├── forecast.ts           # Forecasting logic
│   ├── market.ts             # Market data endpoints
│   └── index.ts              # Entry point (legacy)
│
├── .env                      # Environment vars
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── vercel.json               # Vercel deployment config
```

## 🛠️ Technology Stack

- **Node.js** - JavaScript server platform
- **Express 5** - modern web framework for Node.js
- **MongoDB** - database
- **TypeScript** - typed JavaScript
- **CORS** - cross-origin request support

## 📦 Dependencies

### Core Dependencies

- `express` - web framework
- `cors` - CORS middleware
- `mongodb` - MongoDB driver
- `dotenv` - env vars loader

### Development Dependencies

- `typescript` - TypeScript compiler
- `ts-node` - TypeScript file execution
- `@types/*` - TypeScript types

## 🚀 Installation and Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### Install Dependencies

```bash
npm install
```

### Run in Development Mode

```bash
npm run dev
```

### Run in Production Mode

```bash
npm start
```

The server will be available at: `http://localhost:3001`

## 📊 Database

### MongoDB

The project uses MongoDB. Configure connection via `.env`.

### Collections

- **`projects`** - Investment projects (both regular and crypto)
- **`users`** - Authenticated users (email, password hash, timestamps)
- **`daily_prices`** - Cached cryptocurrency market prices

### Project Fields

- `id` - unique identifier (UUID)
- `name` - project name
- `annualPercent` - annual return percentage
- `startDate` - project start date (ISO string)
- `investedAmount` - investment amount
- `createdAt` - record creation date
- `updatedAt` - last update date

## 🌐 API Endpoints

### Base URL

```
http://localhost:3001/api
```

### Authentication Endpoints

#### Register User

```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com"
  }
}
```

#### Login User

```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com"
  }
}
```

#### Get Current User

```http
GET /api/auth/me
```

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "id": "user_id",
  "email": "user@example.com"
}
```

### Projects Endpoints (Protected)

All project endpoints require authentication via JWT token in the Authorization header.

#### Get Projects List

```http
GET /api/projects
```

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**

- `sortBy` - sorting field (`name`, `annualPercent`, `startDate`, `investedAmount`)
- `sortOrder` - sorting order (`asc`, `desc`)
- `status` - project status (`all`, `active`, `pending`)

**Example Request:**

```bash
curl "http://localhost:3001/api/projects?sortBy=name&sortOrder=asc&status=all"
```

**Response:**

```json
[
  {
    "id": "uuid-here",
    "name": "Project Name",
    "annualPercent": 12.5,
    "startDate": "2024-01-01T00:00:00.000Z",
    "investedAmount": 10000,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### Create New Project

```http
POST /api/projects
```

**Request Body:**

```json
{
  "name": "New Project",
  "annualPercent": 15.0,
  "startDate": "2024-02-01T00:00:00.000Z",
  "investedAmount": 5000
}
```

**Response:**

```json
{
  "id": "generated-uuid",
  "name": "New Project",
  "annualPercent": 15.0,
  "startDate": "2024-02-01T00:00:00.000Z",
  "investedAmount": 5000,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Update Project

```http
PUT /api/projects/:id
```

**Path Parameters:**

- `id` - project identifier

**Request Body:** (same as creation)

**Response:** Updated project object

### Delete Project

```http
DELETE /api/projects/:id
```

**Path Parameters:**

- `id` - project identifier

**Response:**

```json
{
  "message": "Project deleted successfully"
}
```

## 🔧 Development

### Code Structure

#### `src/index.ts`

Main server file:

- Express application setup
- Middleware connection (CORS, JSON parsing)
- Route connection
- Server startup

#### `src/db.ts`

Database management:

- Mongo connection and collections
- Index creation

#### `src/entities/user/api/authRouter.ts`

Authentication routes:
- User registration
- User login
- JWT token generation
- Password hashing with bcrypt

#### `src/middleware/auth.ts`

JWT authentication middleware:
- Token verification
- User extraction from token
- Protected route handling

#### `src/projects.ts`

Projects API:
- Route definitions
- Input data validation
- CRUD operations business logic
- Error handling
- User-specific project filtering

#### `src/forecast.ts`

Forecasting engine:
- Historical method
- GBM (Geometric Brownian Motion) method
- Monte Carlo simulation
- Time-series calculations

#### `src/market.ts`

Market data API:
- CoinGecko integration
- Real-time crypto prices
- Historical price data
- Price caching

### Middleware

- **CORS** - Allows requests from frontend
- **JSON parsing** - Parses JSON request bodies
- **Auth middleware** - JWT token verification for protected routes
  - Validates Bearer tokens
  - Extracts user from token
  - Attaches user to request object
  - Returns 401 for invalid/missing tokens

### Error Handling

API returns appropriate HTTP status codes:

- `200` - successful request
- `400` - incorrect data
- `404` - project not found
- `500` - internal server error

## 🧪 Testing

For API testing you can use:

- **Postman** - GUI for API testing
- **curl** - command line
- **Thunder Client** - VS Code extension
- **Insomnia** - Postman alternative

### Testing Examples

#### Create Project

```bash
curl -X POST http://localhost:3001/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Project",
    "annualPercent": 10.0,
    "startDate": "2024-03-01T00:00:00.000Z",
    "investedAmount": 1000
  }'
```

#### Get Projects

```bash
curl "http://localhost:3001/api/projects"
```

## 📝 Logging

The server outputs logs to console:

- Startup information
- Database connection errors
- API request errors

## 🔒 Security

### Implemented Security Features

✅ **JWT Authentication**
- Secure token-based authentication
- Token expiration (24 hours)
- Bearer token authorization

✅ **Password Security**
- Bcrypt hashing (10 salt rounds)
- No plain-text password storage
- Secure password comparison

✅ **Protected Routes**
- Middleware-based protection
- User-specific data filtering
- Request validation

✅ **Input Validation**
- Email format validation
- Required field checking
- Type validation

✅ **CORS Configuration**
- Controlled origin access
- Credential support

✅ **Error Handling**
- Secure error messages
- No sensitive data leakage
- Proper HTTP status codes

### Production Recommendations

⚠️ **Rate Limiting** - Implement request throttling (express-rate-limit)
⚠️ **HTTPS** - Enforce SSL/TLS in production
⚠️ **Helmet.js** - Add security headers
⚠️ **Input Sanitization** - Add validator.js for XSS protection
⚠️ **Logging** - Implement Winston or similar
⚠️ **Environment Variables** - Use proper secret management
⚠️ **Request Size Limits** - Prevent large payload attacks
⚠️ **Database Indexes** - Optimize queries with proper indexing

## 🚀 Deployment

### Local Development

```bash
cp .env.example .env
# edit .env, then
npm run dev
```

### Production

```bash
npm start
```

### Docker (Optional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

## 🤝 Contributing

We welcome contributions to backend development!

### Areas for Improvement

- Adding tests
- Improving validation
- Adding authentication
- Database query optimization
- Adding caching
- Improving error handling

## 📄 License

The project is distributed under the ISC license.

---

**Note**: This is a demonstration project created for learning modern web development technologies.
