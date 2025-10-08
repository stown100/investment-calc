# Investment Calculator 📊

A modern full-stack web application for managing and analyzing investment portfolios with advanced forecasting capabilities, real-time cryptocurrency tracking, and comprehensive financial analytics.

## 🚀 Project Overview

Investment Calculator is a professional-grade investment management platform that enables users to:

- **Manage Investment Projects** - Track both traditional and cryptocurrency investments
- **Calculate Returns** - Advanced calculators with multiple forecasting methods (Historical & GBM Monte Carlo)
- **Real-time Market Data** - Live cryptocurrency prices and market analysis
- **Visual Analytics** - Interactive charts and comprehensive dashboards
- **Portfolio Analysis** - Detailed breakdown of investments with profit calculations
- **Multi-device Support** - Responsive design for desktop, tablet, and mobile

## 🎯 Key Features

### 🔐 Authentication & Security
- User registration and login system
- JWT-based authentication
- Protected routes and secure API endpoints
- Session management with automatic token verification

### 💼 Investment Management
- ✅ Add regular and cryptocurrency projects
- ✅ Edit and delete projects
- ✅ Real-time crypto price tracking via CoinGecko API
- ✅ Project categorization and status tracking
- ✅ Search and filtering capabilities
- ✅ Multi-criteria sorting

### 📈 Advanced Calculators
- **Historical Forecasting** - Based on historical data patterns
- **GBM (Geometric Brownian Motion)** - Monte Carlo simulation method
- **Period Analysis** - Calculate returns by days, weeks, months, years
- **Yearly Breakdown** - Detailed year-by-year projections
- **Growth Charts** - Visual representation of portfolio growth
- **Compound Interest** - Automatic compound return calculations

### 📊 Analytics Dashboard
- Total portfolio value
- Average annual percentage
- Number of active projects
- Total invested amount
- Profit/loss analysis
- Portfolio distribution charts

### 🎨 Modern UI/UX
- **Theme System** - Light and Dark mode with smooth transitions
- **Responsive Design** - Optimized for all screen sizes
- **Material-UI** - Modern, accessible component library
- **Landing Page** - Professional welcome page for non-authenticated users
- **Intuitive Navigation** - Clean and organized interface

## 🏗️ Architecture

The project follows **Feature-Sliced Design (FSD)** methodology with clear separation of concerns:

```
investment-calc/
├── frontend/              # React + TypeScript client
│   ├── src/
│   │   ├── app/          # Application initialization & routing
│   │   ├── entities/     # Business entities (auth, project, transaction)
│   │   ├── features/     # Feature modules (calculator, forms, etc.)
│   │   ├── pages/        # Page components (home, auth, welcome, projects)
│   │   ├── shared/       # Shared utilities and UI components
│   │   └── theme/        # Theme configuration and context
│   └── ...
├── backend/              # Node.js + Express + MongoDB server
│   ├── src/
│   │   ├── entities/     # Domain entities and models
│   │   ├── middleware/   # Auth middleware
│   │   ├── db.ts         # Database configuration
│   │   ├── server.ts     # Express server setup
│   │   └── ...
│   └── ...
└── README.md            # This file
```

## 🛠️ Technology Stack

### Frontend
| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI Library | 19.1.0 |
| **TypeScript** | Type Safety | Latest |
| **Material-UI (MUI)** | Component Library | 7.3.1 |
| **Zustand** | State Management | 5.0.5 |
| **React Router** | Routing | 7.8.2 |
| **Recharts** | Data Visualization | 3.0.2 |
| **Day.js** | Date Manipulation | 1.11.13 |
| **Vite** | Build Tool | 6.3.5 |
| **Sass** | Styling | 1.89.2 |

### Backend
| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | Runtime | 18+ |
| **Express** | Web Framework | 5.x |
| **MongoDB** | Database | Latest |
| **TypeScript** | Type Safety | Latest |
| **JWT** | Authentication | Latest |
| **CORS** | Cross-Origin Requests | Latest |

## 📁 Detailed Project Structure

### Frontend Structure (Feature-Sliced Design)

```
frontend/src/
├── app/
│   ├── AppRouter.tsx                    # Main routing configuration
│   └── App.jsx                          # Root application component
│
├── entities/
│   ├── auth/                            # Authentication entity
│   │   ├── api/                         # Auth API calls
│   │   │   └── authApi.ts
│   │   ├── model/                       # Auth state management
│   │   │   └── store.ts                 # Zustand auth store
│   │   ├── types.ts                     # Auth types
│   │   └── ui/                          # Auth UI components
│   │       ├── Header.tsx               # Unified application header
│   │       ├── AuthForm.tsx             # Login/Register form
│   │       └── header-components/       # Header subcomponents
│   │           ├── LoginButton.tsx      # Login button component
│   │           ├── UserMenu.tsx         # User menu with logout
│   │           ├── Navigation.tsx       # Navigation tabs & drawer
│   │           ├── hooks/
│   │           │   └── useHeaderState.ts # Header state hook
│   │           └── index.ts             # Barrel export
│   │
│   ├── project/                         # Investment project entity
│   │   ├── api/
│   │   │   ├── projectApi.ts            # Projects CRUD API
│   │   │   ├── cryptoApi.ts             # Crypto data API
│   │   │   └── marketApi.ts             # Market data API
│   │   ├── model/
│   │   │   ├── store.ts                 # Projects state
│   │   │   ├── summaryStore.ts          # Summary calculations
│   │   │   └── types.ts                 # Project types
│   │   ├── ui/                          # Project UI components
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── ProjectList.tsx
│   │   │   ├── ProjectSearch.tsx
│   │   │   ├── ProjectSorting.tsx
│   │   │   └── ProjectStatusFilter.tsx
│   │   └── utils/
│   │       └── profitCalculator.ts      # Profit calculation logic
│   │
│   └── transaction/                     # Transaction entity (future)
│
├── features/
│   ├── add-project/                     # Add project feature
│   │   └── ui/
│   │       ├── AddProjectForm.tsx
│   │       ├── AddProjectModal.tsx
│   │       ├── AddCryptoProjectForm.tsx
│   │       ├── AddCryptoProjectModal.tsx
│   │       └── AddProjectDropdown.tsx
│   │
│   ├── edit-project/                    # Edit project feature
│   │   └── ui/
│   │       ├── EditProjectForm.tsx
│   │       └── EditProjectModal.tsx
│   │
│   ├── project-details/                 # Project details feature
│   │   └── ui/
│   │       └── ProjectDetailsModal.tsx
│   │
│   ├── calculator/                      # Investment calculator feature
│   │   ├── model/
│   │   │   ├── calculator.ts            # Calculation logic
│   │   │   └── types.ts                 # Calculator types
│   │   └── ui/
│   │       ├── Calculator.tsx           # Main calculator component
│   │       ├── Dashboard.tsx            # Visual dashboard
│   │       ├── GrowthChart.tsx          # Growth visualization
│   │       └── UnifiedTable.tsx         # Results table
│   │
│   └── investment-summary/              # Portfolio summary feature
│       └── ui/
│           └── InvestmentSummary.tsx
│
├── pages/
│   ├── home/                            # Main dashboard page
│   │   └── HomePage.tsx
│   │
│   ├── auth/                            # Authentication page
│   │   ├── AuthPage.tsx
│   │   └── index.ts
│   │
│   ├── welcome/                         # Landing page
│   │   ├── WelcomePage.tsx              # Professional landing
│   │   └── index.ts
│   │
│   └── projects-table/                  # Projects table page
│       ├── ProjectsTablePage.tsx
│       └── components/
│           ├── desktop/
│           │   └── DesktopProjectsTable.tsx
│           └── mobile/
│               ├── MobileProjectCard.tsx
│               └── MobileProjectsContainer.tsx
│
├── shared/
│   ├── constants/
│   │   └── markets.ts                   # Market constants
│   ├── context/
│   │   └── NotificationContext.tsx      # Notifications
│   ├── ui/                              # Shared UI components
│   │   ├── Loader.tsx
│   │   ├── BlurLoader.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── StyledCard.tsx
│   │   └── ConfirmDialog.tsx
│   └── styles/                          # Global styles
│
└── theme/
    ├── ThemeContext.tsx                 # Theme provider
    └── index.ts                         # Theme configuration
```

### Backend Structure

```
backend/src/
├── entities/
│   ├── project/
│   │   └── model/
│   │       ├── store.ts                 # Project data access
│   │       └── types.ts                 # Project types
│   ├── transaction/
│   │   └── model/
│   │       └── types.ts
│   └── user/
│       ├── api/
│       │   ├── authRouter.ts            # Auth routes
│       │   └── userApi.ts               # User API
│       └── types.ts                     # User types
│
├── middleware/
│   └── auth.ts                          # JWT authentication middleware
│
├── db.ts                                # MongoDB connection
├── server.ts                            # Express server setup
├── projects.ts                          # Projects endpoints
├── forecast.ts                          # Forecasting logic
└── market.ts                            # Market data endpoints
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18 or higher
- **npm** or **yarn**
- **MongoDB** (local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd investment-calc
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Create .env file
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   
   # Start backend server
   npm run dev
   ```
   Backend will run on: `http://localhost:3001`

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   
   # Start frontend development server
   npm run dev
   ```
   Frontend will run on: `http://localhost:5173`

4. **Open Application**
   Navigate to `http://localhost:5173`

### Environment Variables

#### Backend (.env)
```env
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB=investment-calc
JWT_SECRET=your_secret_key
PORT=3001
```

## 🎨 Features in Detail

### 1. Welcome Page
Professional landing page for non-authenticated users featuring:
- Hero section with call-to-action
- Feature highlights (6 key features)
- How it works (3-step guide)
- Target audience sections
- Screenshot placeholders
- Responsive design

### 2. Authentication System
- **Registration** - Email and password signup
- **Login** - Secure JWT-based authentication
- **Protected Routes** - Automatic redirection for unauthorized access
- **Session Management** - Token verification on app load
- **User Menu** - Quick access to logout

### 3. Investment Calculator
Two forecasting methods:
- **Historical Method** - Uses historical market data
- **GBM Method** - Geometric Brownian Motion (Monte Carlo simulation)

Calculation options:
- Time period selection (3-30 years)
- Project selection (individual or all)
- Period breakdown (days, weeks, months, years)
- Yearly detailed analysis

### 4. Cryptocurrency Support
- Real-time price tracking via CoinGecko API
- Support for major cryptocurrencies
- Historical price data
- Automatic price updates
- Market symbol detection

### 5. Theme System
- **Light Mode** - Clean, bright interface
- **Dark Mode** - Eye-friendly dark theme
- **Persistent** - Saves user preference
- **Smooth Transitions** - All components adapt seamlessly
- **System Detection** - Auto-detects OS preference

### 6. Responsive Design
Optimized for:
- **Desktop** - Full-featured experience (1200px+)
- **Tablet** - Adapted layout (768px-1199px)
- **Mobile** - Touch-optimized interface (<768px)

## 🌐 API Endpoints

### Authentication
```
POST   /api/auth/register    # Register new user
POST   /api/auth/login       # Login user
GET    /api/auth/me          # Get current user (protected)
```

### Projects
```
GET    /api/projects         # Get all projects (protected)
POST   /api/projects         # Create project (protected)
PUT    /api/projects/:id     # Update project (protected)
DELETE /api/projects/:id     # Delete project (protected)
```

### Market Data
```
GET    /api/market/crypto/:symbol    # Get crypto price
GET    /api/market/forecast/:symbol  # Get price forecast
```

### Summary
```
GET    /api/projects/summary  # Get portfolio summary (protected)
```

## 🔒 Security

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - Bcrypt for password security
- **Protected Routes** - Middleware-based protection
- **CORS Configuration** - Controlled cross-origin access
- **Input Validation** - Server-side validation
- **Error Handling** - Secure error messages

## 🧪 Testing

### Manual Testing

1. **Authentication Flow**
   - Register new account
   - Login with credentials
   - Verify protected routes
   - Test logout functionality

2. **Project Management**
   - Create regular project
   - Create crypto project
   - Edit project details
   - Delete project
   - Test search and filters

3. **Calculator**
   - Select different time periods
   - Test both forecast methods
   - Verify calculations
   - Check chart visualizations

## 📱 Responsive Breakpoints

```scss
// Mobile
@media (max-width: 767px) { }

// Tablet
@media (min-width: 768px) and (max-width: 1199px) { }

// Desktop
@media (min-width: 1200px) { }
```

## 🎯 Routing Structure

```
/                    → Dashboard (protected)
/projects            → Projects Table (protected)
/welcome             → Landing Page (public)
/auth                → Login/Register (public only)
*                    → Redirect to /welcome
```

## 🔄 State Management

### Zustand Stores

1. **Auth Store** (`useAuthStore`)
   - User data
   - Authentication status
   - Login/logout functions

2. **Projects Store** (`useProjectStore`)
   - Projects list
   - CRUD operations
   - Loading states

3. **Summary Store** (`useProjectsSummaryStore`)
   - Portfolio calculations
   - Average returns
   - Total investments

## 🎨 Component Guidelines

### Naming Conventions
- **Components**: PascalCase (e.g., `ProjectCard`)
- **Hooks**: camelCase with 'use' prefix (e.g., `useHeaderState`)
- **Utilities**: camelCase (e.g., `calculateProfit`)
- **Types**: PascalCase (e.g., `ProjectType`)

### File Organization
- **One component per file**
- **Co-locate related files**
- **Barrel exports** via index.ts
- **Types near implementation**

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy dist folder
```

### Backend (Heroku/Railway)
```bash
cd backend
npm run build
# Deploy with MongoDB Atlas
```

## 🤝 Contributing

Contributions are welcome! Areas for improvement:

### Frontend
- [ ] Add unit tests (Jest + React Testing Library)
- [ ] Implement E2E tests (Cypress/Playwright)
- [ ] Add more chart types
- [ ] Enhance mobile UX
- [ ] Add PWA support

### Backend
- [ ] Add comprehensive test coverage
- [ ] Implement rate limiting
- [ ] Add API documentation (Swagger)
- [ ] Enhance validation schemas
- [ ] Add logging system (Winston)
- [ ] Implement caching (Redis)

### Features
- [ ] Transaction history tracking
- [ ] Export to PDF/Excel
- [ ] Email notifications
- [ ] Multi-currency support
- [ ] Shared portfolios
- [ ] Advanced analytics

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Created as a demonstration of modern full-stack development practices using React, TypeScript, Material-UI, Node.js, Express, and MongoDB.

## 🙏 Acknowledgments

- **Material-UI** - Excellent component library
- **CoinGecko** - Cryptocurrency API
- **Vercel** - Deployment platform
- **MongoDB Atlas** - Database hosting

---

**Note**: This is an educational project demonstrating best practices in modern web development, including Feature-Sliced Design architecture, advanced TypeScript usage, and professional-grade UI/UX design.

For detailed documentation:
- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)
