# Investment Calculator Frontend

Modern React application for investment portfolio management with advanced analytics and forecasting capabilities.

## 🛠️ Technology Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI Library | 19.1.0 |
| **TypeScript** | Type Safety | Latest |
| **Material-UI (MUI)** | Component Library | 7.3.1 |
| **Zustand** | State Management | 5.0.5 |
| **React Router** | Client-side Routing | 7.8.2 |
| **Recharts** | Data Visualization | 3.0.2 |
| **Day.js** | Date Manipulation | 1.11.13 |
| **Vite** | Build Tool | 6.3.5 |
| **Sass** | CSS Preprocessor | 1.89.2 |

## 📁 Project Structure (Feature-Sliced Design)

```
src/
├── app/                                 # Application layer
│   ├── AppRouter.tsx                   # Main routing configuration
│   └── App.jsx                         # Root component
│
├── entities/                            # Business entities
│   ├── auth/                           # Authentication
│   │   ├── api/                        # Auth API
│   │   │   └── authApi.ts
│   │   ├── model/                      # State management
│   │   │   └── store.ts               # Zustand auth store
│   │   ├── types.ts                    # TypeScript types
│   │   └── ui/                         # UI components
│   │       ├── Header.tsx             # Main header (refactored)
│   │       ├── AuthForm.tsx           # Login/Register form
│   │       └── header-components/     # Header subcomponents
│   │           ├── LoginButton.tsx    # Login button
│   │           ├── UserMenu.tsx       # User menu with logout
│   │           ├── Navigation.tsx     # Navigation tabs
│   │           ├── hooks/
│   │           │   └── useHeaderState.ts
│   │           └── index.ts
│   │
│   ├── project/                        # Investment projects
│   │   ├── api/
│   │   │   ├── projectApi.ts          # CRUD operations
│   │   │   ├── cryptoApi.ts           # Crypto data
│   │   │   └── marketApi.ts           # Market data
│   │   ├── model/
│   │   │   ├── store.ts               # Projects state
│   │   │   ├── summaryStore.ts        # Portfolio summary
│   │   │   └── types.ts
│   │   ├── ui/
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── ProjectList.tsx
│   │   │   ├── ProjectSearch.tsx
│   │   │   ├── ProjectSorting.tsx
│   │   │   ├── ProjectStatusFilter.tsx
│   │   │   └── ProjectSkeleton.tsx
│   │   └── utils/
│   │       └── profitCalculator.ts
│   │
│   └── transaction/                    # Transactions (future)
│
├── features/                            # Feature modules
│   ├── add-project/                    # Add project functionality
│   │   └── ui/
│   │       ├── AddProjectForm.tsx
│   │       ├── AddProjectModal.tsx
│   │       ├── AddCryptoProjectForm.tsx
│   │       ├── AddCryptoProjectModal.tsx
│   │       └── AddProjectDropdown.tsx
│   │
│   ├── edit-project/                   # Edit project functionality
│   │   └── ui/
│   │       ├── EditProjectForm.tsx
│   │       └── EditProjectModal.tsx
│   │
│   ├── project-details/                # Project details view
│   │   └── ui/
│   │       └── ProjectDetailsModal.tsx
│   │
│   ├── calculator/                     # Investment calculator
│   │   ├── model/
│   │   │   ├── calculator.ts          # Calculation logic
│   │   │   └── types.ts
│   │   └── ui/
│   │       ├── Calculator.tsx         # Main calculator
│   │       ├── Dashboard.tsx          # Visual dashboard
│   │       ├── GrowthChart.tsx        # Growth charts
│   │       └── UnifiedTable.tsx       # Results table
│   │
│   └── investment-summary/             # Portfolio summary
│       └── ui/
│           └── InvestmentSummary.tsx
│
├── pages/                               # Page components
│   ├── home/                           # Main dashboard
│   │   └── HomePage.tsx
│   │
│   ├── auth/                           # Authentication page
│   │   ├── AuthPage.tsx
│   │   └── index.ts
│   │
│   ├── welcome/                        # Landing page
│   │   ├── WelcomePage.tsx            # Professional landing
│   │   └── index.ts
│   │
│   └── projects-table/                 # Projects table view
│       ├── ProjectsTablePage.tsx
│       └── components/
│           ├── desktop/
│           │   └── DesktopProjectsTable.tsx
│           └── mobile/
│               ├── MobileProjectCard.tsx
│               ├── MobileProjectsContainer.tsx
│               └── MobileProjectSkeleton.tsx
│
├── shared/                              # Shared resources
│   ├── constants/
│   │   └── markets.ts                 # Market constants
│   ├── context/
│   │   └── NotificationContext.tsx    # Notifications
│   ├── ui/                             # Reusable UI components
│   │   ├── Loader.tsx
│   │   ├── BlurLoader.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── StyledCard.tsx
│   │   ├── ConfirmDialog.tsx
│   │   └── index.ts
│   └── styles/                         # Global styles
│
└── theme/                               # Theme configuration
    ├── ThemeContext.tsx                # Theme provider
    └── index.ts                        # MUI theme config
```

## 🎨 Theme System

The application features a sophisticated theme system with light and dark modes.

### Features
- **Automatic Detection** - Detects system theme preference
- **Persistent Storage** - Saves user's choice in localStorage
- **Smooth Transitions** - All components adapt seamlessly
- **Customizable** - Easy to modify colors and styles
- **Material-UI Integration** - Full MUI theme customization

### Theme Toggle
- Located in the header (top-right corner)
- Sun icon = switch to dark mode
- Moon icon = switch to light mode
- Works on all pages including welcome page

### Customization

Edit `src/theme/index.ts` to customize:

```typescript
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#667eea' },
    secondary: { main: '#764ba2' },
    // ... more customization
  }
});
```

## 🧩 Key Components

### 1. Header Component (Refactored)

**Main Header** (`entities/auth/ui/Header.tsx`)
- Unified header for all pages
- 69 lines (was 354!)
- Clean and maintainable

**Subcomponents** (`entities/auth/ui/header-components/`)
- **LoginButton** - Handles login navigation
- **UserMenu** - User avatar with logout
- **Navigation** - Tabs and mobile drawer
- **useHeaderState** - Custom hook for header logic

### 2. Welcome Page

Professional landing page with:
- Hero section with CTA
- Feature highlights (6 cards)
- "How it works" section (3 steps)
- Target audience cards (4 categories)
- Screenshot placeholders
- Call-to-action footer

Located at: `/welcome`

### 3. Authentication System

**Components:**
- `AuthForm` - Unified login/register form
- `AuthPage` - Authentication page container

**Features:**
- Email & password authentication
- JWT token management
- Automatic token verification
- Protected route handling

### 4. Investment Calculator

**Two Forecasting Methods:**

1. **Historical Method**
   - Uses historical market data
   - Average-based projections
   - Conservative estimates

2. **GBM Method (Geometric Brownian Motion)**
   - Monte Carlo simulation
   - Volatility-based modeling
   - Advanced statistical analysis

**Features:**
- Time period selection (3-30 years)
- Project selection (individual or all)
- Multiple data views:
  - Period returns (daily, weekly, monthly, yearly)
  - Yearly breakdown
  - Growth charts
  - Portfolio distribution

### 5. Project Management

**Project Types:**
- Regular investments (manual rate)
- Cryptocurrency (live prices)

**Features:**
- Create, Read, Update, Delete
- Real-time crypto prices
- Search and filtering
- Multi-criteria sorting
- Status tracking
- Profit calculations

### 6. Mobile Support

Responsive components:
- Mobile-specific cards
- Touch-optimized UI
- Collapsible sections
- Optimized layouts

## 🔄 State Management (Zustand)

### Auth Store
```typescript
useAuthStore()
// State: user, token, isAuthenticated, isLoading
// Actions: login, register, logout, setUser, setToken
```

### Projects Store
```typescript
useProjectStore()
// State: projects, isLoading, error
// Actions: fetchProjects, addProject, updateProject, deleteProject
```

### Summary Store
```typescript
useProjectsSummaryStore()
// State: summary (totalProjects, avgPercent, totalAmount)
// Actions: fetchSummary
```

## 🛣️ Routing

### Public Routes
- `/welcome` - Landing page (accessible to all)
- `/auth` - Login/Register page (non-authenticated only)

### Protected Routes
- `/` - Dashboard with calculator
- `/projects` - Projects table view

### Route Guards
- **ProtectedRoute** - Redirects to `/welcome` if not authenticated
- **PublicRoute** - Redirects to `/` if already authenticated

## 🎯 Component Guidelines

### Naming Conventions
```
Components/    PascalCase    ProjectCard.tsx
Hooks/         camelCase     useHeaderState.ts
Utilities/     camelCase     calculateProfit.ts
Types/         PascalCase    ProjectType.ts
Constants/     UPPER_SNAKE   API_BASE_URL
```

### File Organization
- One component per file
- Co-locate related files
- Use barrel exports (index.ts)
- Types near implementation

### Example Component Structure
```typescript
// ProjectCard.tsx
import React from 'react';
import { Card, Typography } from '@mui/material';
import { ProjectType } from '../types';

interface ProjectCardProps {
  project: ProjectType;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  onEdit, 
  onDelete 
}) => {
  // Component logic
  return (
    <Card>
      {/* JSX */}
    </Card>
  );
};
```

## 🚀 Scripts

```bash
# Development
npm run dev          # Start dev server (localhost:5173)

# Building
npm run build        # Production build
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # TypeScript check
```

## 📦 Dependencies

### Core
- `react` - UI library
- `react-dom` - React DOM renderer
- `react-router-dom` - Routing
- `@mui/material` - Component library
- `@emotion/react` - CSS-in-JS (MUI dependency)
- `@emotion/styled` - Styled components

### State & Data
- `zustand` - State management
- `dayjs` - Date manipulation
- `recharts` - Charts and visualizations

### UI & Icons
- `@mui/icons-material` - Material icons
- `@mui/x-charts` - Advanced charts
- `@mui/x-date-pickers` - Date pickers
- `@toolpad/core` - Additional MUI tools

### Dev Tools
- `typescript` - Type checking
- `vite` - Build tool
- `eslint` - Linting
- `sass` - CSS preprocessing

## 🎨 Styling Approach

### Material-UI (MUI)
- Primary styling method
- `sx` prop for inline styles
- Theme-aware styling
- Responsive design

### Example:
```typescript
<Box 
  sx={{ 
    display: 'flex',
    gap: 2,
    bgcolor: 'background.paper',
    p: { xs: 2, md: 4 }  // Responsive padding
  }}
>
  {/* Content */}
</Box>
```

### Sass Modules
- Global styles
- Complex animations
- Legacy support

## 📱 Responsive Breakpoints

```typescript
// MUI default breakpoints
xs: 0     // Mobile
sm: 600   // Tablet portrait
md: 900   // Tablet landscape
lg: 1200  // Desktop
xl: 1536  // Large desktop
```

Usage:
```typescript
sx={{
  fontSize: { xs: '1rem', md: '1.5rem', lg: '2rem' }
}}
```

## 🔧 Configuration Files

### vite.config.js
- Build configuration
- Dev server settings
- Plugin setup

### tsconfig.json
- TypeScript compiler options
- Path aliases
- Strict mode settings

### eslint.config.js
- Code quality rules
- React-specific rules
- TypeScript integration

## 🚀 Performance Optimization

### Code Splitting
- Lazy loading for routes
- Dynamic imports for heavy components
- Optimized bundle size

### Memoization
```typescript
import { memo, useMemo, useCallback } from 'react';

// Component memoization
export const ProjectCard = memo(({ project }) => {
  // Component logic
});

// Value memoization
const calculatedValue = useMemo(() => {
  return expensiveCalculation(data);
}, [data]);

// Function memoization
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
```

## 🧪 Testing (Future)

Recommended testing stack:
- **Jest** - Test runner
- **React Testing Library** - Component testing
- **MSW** - API mocking
- **Cypress/Playwright** - E2E testing

## 🔒 Security Best Practices

- ✅ JWT stored in localStorage
- ✅ Token verification on app load
- ✅ Protected routes with middleware
- ✅ XSS protection via React
- ✅ HTTPS in production
- ⚠️ Consider httpOnly cookies for tokens

## 📚 Additional Resources

- [Material-UI Documentation](https://mui.com)
- [React Documentation](https://react.dev)
- [Zustand Documentation](https://zustand-demo.pmnd.rs)
- [Vite Documentation](https://vitejs.dev)
- [Feature-Sliced Design](https://feature-sliced.design)

## 🤝 Contributing

When contributing:
1. Follow Feature-Sliced Design principles
2. Use TypeScript strictly
3. Write meaningful commit messages
4. Keep components small and focused
5. Add proper TypeScript types
6. Test on multiple screen sizes

## 📄 License

ISC License - See LICENSE file for details

---

**Built with** ❤️ **using React, TypeScript, and Material-UI**
