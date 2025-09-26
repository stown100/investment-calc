# Backend - Investment Calculator API

Server-side part of the Investment Calculator application, built on Node.js using Express and MongoDB.

## 🏗️ Architecture

The backend is built on the principle of simple and efficient architecture:

```
backend/
├── src/
│   ├── index.ts          # Entry point and server configuration
│   ├── db.ts             # MongoDB connection and collections
│   └── projects.ts       # API endpoints for working with projects
├── .env                  # Environment vars (MONGODB_URI, MONGODB_DB, JWT_SECRET)
├── package.json          # Dependencies and scripts
└── tsconfig.json         # TypeScript configuration
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

- `projects` - investments
- `users` - auth users (email/password)
- `daily_prices` - cached market prices

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

### Get Projects List

```http
GET /api/projects
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

#### `src/projects.ts`

Projects API:

- Route definitions
- Input data validation
- CRUD operations business logic
- Error handling

### Middleware

- **CORS** - allows requests from frontend
- **JSON parsing** - JSON parsing in requests

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

### Current Measures

- Input data validation
- CORS settings
- Error handling

### Production Recommendations

- Authentication and authorization
- Rate limiting
- Schema-level validation
- Request logging
- HTTPS
- Request size limits

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
