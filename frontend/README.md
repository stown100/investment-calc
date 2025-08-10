# Frontend - Investment Calculator

Client-side application for Investment Calculator, built on React using modern technologies and Feature-Sliced Design architecture.

## 🚀 Description

Frontend is a single-page application (SPA) that provides users with an intuitive interface for:

- Managing investment projects
- Calculating potential returns
- Analyzing investment portfolio
- Sorting and filtering data

## 🏗️ Architecture

The project follows the **Feature-Sliced Design (FSD)** methodology, which ensures:

- Clear separation of responsibilities
- Code scalability
- Component reusability
- Easy testing

### Project Structure

```
src/
├── app/                    # Application configuration
│   ├── AppRouter.tsx      # Routing
│   └── App.jsx            # Main component
├── entities/               # Business entities
│   └── project/           # Project entity
│       ├── api/           # API client
│       ├── model/         # Data model
│       ├── types/         # TypeScript types
│       └── ui/            # UI components
├── features/               # Functional modules
│   ├── add-project/       # Adding projects
│   ├── calculator/        # Return calculator
│   ├── edit-project/      # Editing projects
│   └── investment-summary/ # Investment summary
├── pages/                  # Application pages
│   └── home/              # Home page
├── shared/                 # Common components
├── widgets/                # Composite UI blocks
└── main.jsx                # Entry point
```

## 🛠️ Technology Stack

### Core Technologies
- **React 19** - modern library for building UI
- **TypeScript** - typed JavaScript for code reliability
- **Vite** - fast project bundler with hot reload

### UI and Styling
- **Mantine** - React component library with Material Design
- **Sass** - CSS preprocessor for advanced styling
- **CSS Modules** - local scope for styles

### State Management
- **Zustand** - lightweight library for state management
- **React Hooks** - built-in React hooks for state management

### Utilities
- **dayjs** - date manipulation library (moment.js alternative)
- **uuid** - unique identifier generation

### Development Tools
- **ESLint** - linter for code quality
- **Prettier** - code formatting
- **TypeScript** - static typing

## 📦 Installation and Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Running backend server

### Installing Dependencies
```bash
npm install
```

### Running in Development Mode
```bash
npm run dev
```

The application will be available at: `http://localhost:5173`

### Building for Production
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

## 🎯 Main Features

### 1. Project Management
- **Adding** - form for creating new investment projects
- **Viewing** - list of all projects with detailed information
- **Editing** - modifying existing projects
- **Deleting** - removing projects with confirmation

### 2. Return Calculator
- Profit calculation for various time periods
- Results visualization in table format
- Project selection for calculation
- Total portfolio return calculation

### 3. Analytics and Reports
- Overall investment summary
- Project statistics
- Status filtering (active/pending)
- Sorting by various parameters

## 🔧 Development

### Component Architecture

#### Entities
Business entities of the application:
- **Project** - main investment project entity
- **Types** - TypeScript interfaces and types
- **Store** - state management through Zustand
- **API** - backend interaction

#### Features
Individual functional modules:
- **Add Project** - creating new projects
- **Calculator** - return calculation
- **Edit Project** - editing projects
- **Investment Summary** - investment overview

#### Pages
Composition of features and entities:
- **Home Page** - main page with core functionality

#### Shared
Reusable components and utilities

#### Widgets
Composite UI blocks combining multiple features

### State Management

#### Zustand Store
```typescript
interface ProjectStore {
  projects: Project[];
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchProjects: (sortBy?: string, sortOrder?: string, status?: string) => Promise<void>;
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateProject: (project: Project) => Promise<void>;
  removeProject: (id: string) => Promise<void>;
}
```

#### React Hooks
- `useState` - local component state
- `useEffect` - side effects
- `useCallback` - function memoization
- `useMemo` - value memoization

### API Interaction

#### HTTP Client
```typescript
// projectApi.ts
export const projectApi = {
  getProjects: (params?: ProjectQueryParams) => fetch('/api/projects', { params }),
  createProject: (project: CreateProjectData) => fetch('/api/projects', { method: 'POST', body: JSON.stringify(project) }),
  updateProject: (id: string, project: UpdateProjectData) => fetch(`/api/projects/${id}`, { method: 'PUT', body: JSON.stringify(project) }),
  deleteProject: (id: string) => fetch(`/api/projects/${id}`, { method: 'DELETE' })
};
```

## 🎨 UI/UX Features

### Mantine Components
- **Card** - project cards
- **Modal** - modal windows for forms
- **Form** - validation and form management
- **Table** - tabular data representation
- **Button** - buttons with various options
- **Input** - input fields with validation

### Responsive Design
- Mobile adaptation
- Responsive layout
- Touch-friendly interface

### Accessibility
- ARIA labels
- Keyboard navigation
- Screen reader support
- High contrast support

## 🧪 Testing

### Manual Testing
- Testing all user scenarios
- Form validation verification
- Responsive design testing
- Accessibility checking

### Automated Testing (Planned)
- Unit tests for components
- Integration tests for features
- E2E tests for critical paths

## 📱 Compatibility

### Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Devices
- Desktop (1920x1080+)
- Tablet (768x1024)
- Mobile (375x667+)

## 🚀 Performance

### Optimizations
- Code splitting by features
- Lazy loading components
- Computation memoization
- Re-render optimization

### Metrics
- First Contentful Paint < 1.5s
- Largest Contentful Paint < 2.5s
- Cumulative Layout Shift < 0.1

## 🔒 Security

### Current Measures
- Input data validation
- User input sanitization
- CORS settings on backend

### Production Recommendations
- HTTPS
- Content Security Policy
- XSS protection
- CSRF tokens

## 📝 Logging

### Console Logs
- API request errors
- Validation errors
- Debug information

### Monitoring (Planned)
- Error tracking (Sentry)
- Performance monitoring
- User analytics

## 🤝 Contributing

We welcome contributions to frontend development!

### Areas for Improvement
- Adding tests
- Improving accessibility
- Performance optimization
- Adding PWA functionality
- UI/UX improvements
- Adding animations

### Development Process
1. Create an Issue describing the task
2. Fork the repository
3. Create a feature branch
4. Make changes
5. Create a Pull Request

## 📄 License

The project is distributed under the ISC license.

## 👥 Authors

The project was created to demonstrate modern web development technologies and best practices for building React applications.

---

**Note**: This is a demonstration project created for studying modern web development technologies.
