# Investment Calculator

A full-featured web application for managing investment projects with the ability to calculate potential returns.

## 🚀 Project Description

Investment Calculator is a modern web application built on a "frontend + backend" architecture that allows users to:

- Manage a list of investment projects
- Track project details (name, annual percentage, start date, investment amount)
- Calculate potential returns for selected projects
- Analyze the overall investment picture
- Sort and filter projects by various criteria

## 🏗️ Project Architecture

The project is built on the principle of separation of responsibilities with a clear division into frontend and backend:

```
investment-calc/
├── frontend/          # React application (client-side)
├── backend/           # Node.js API server (server-side)
└── README.md          # This file
```

### Frontend (React + TypeScript)
- **React 19** - modern UI library
- **TypeScript** - typed JavaScript
- **Vite** - fast project builder
- **Mantine** - UI component library
- **Zustand** - application state management
- **Feature-Sliced Design** - architectural methodology

### Backend (Node.js + Express + SQLite)
- **Node.js** - server platform
- **Express** - web framework
- **SQLite** - embedded database
- **TypeScript** - typed JavaScript
- **REST API** - API architecture

## ✨ Key Features

### Project Management
- ✅ Adding new investment projects
- ✅ Viewing list of all projects
- ✅ Editing existing projects
- ✅ Deleting projects
- ✅ Sorting by various parameters
- ✅ Filtering by status

### Return Calculator
- 🧮 Calculating returns by days, weeks, months, years
- 📊 Visualizing results in tabular format
- 💰 Calculating total investment amount
- 📈 Analyzing potential profit

### Analytics
- 📋 Overall investment summary
- 📊 Average annual percentage
- 💵 Total investment amount
- 🟢 Number of active projects

## 🛠️ Technology Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - typing
- **Vite** - build and development
- **Mantine** - UI components
- **Zustand** - state management
- **dayjs** - date handling
- **Sass** - styling

### Backend
- **Node.js** - server platform
- **Express** - web framework
- **SQLite** - database
- **TypeScript** - typing
- **CORS** - cross-origin requests

## 📁 Project Structure

```
investment-calc/
├── frontend/                          # Client-side
│   ├── src/
│   │   ├── app/                      # Application configuration
│   │   ├── entities/                 # Business entities
│   │   │   └── project/             # Project entity
│   │   ├── features/                 # Functional modules
│   │   │   ├── add-project/         # Adding project
│   │   │   ├── calculator/          # Return calculator
│   │   │   ├── edit-project/        # Project editing
│   │   │   └── investment-summary/  # Investment summary
│   │   ├── pages/                    # Application pages
│   │   ├── shared/                   # Common components
│   │   └── widgets/                  # Widgets
│   ├── package.json
│   └── README.md
├── backend/                           # Server-side
│   ├── src/
│   │   ├── index.ts                  # Entry point
│   │   ├── db.ts                     # Database configuration
│   │   └── projects.ts               # Projects API
│   ├── package.json
│   └── README.md
└── README.md                          # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation and Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd investment-calc
   ```

2. **Start the backend**
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   Backend will be available at: `http://localhost:3001`

3. **Start the frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Frontend will be available at: `http://localhost:5173`

4. **Open in browser**
   Navigate to `http://localhost:5173`

## 📚 Documentation

- [Frontend README](./frontend/README.md) - detailed frontend documentation
- [Backend README](./backend/README.md) - detailed backend documentation

## 🔧 Development

### Code Structure
The project follows Feature-Sliced Design principles:
- **entities** - business entities
- **features** - functional modules
- **pages** - application pages
- **shared** - common components
- **widgets** - composite UI blocks

### API Endpoints
The backend provides REST API for working with projects:
- `GET /api/projects` - get projects list
- `POST /api/projects` - create new project
- `PUT /api/projects/:id` - update project
- `DELETE /api/projects/:id` - delete project

## 🤝 Contributing

We welcome contributions to the project development! If you have ideas, suggestions, or want to fix bugs:

1. Create an Issue describing the problem or suggestion
2. Fork the repository
3. Create a branch for your changes
4. Make changes and create a Pull Request

## 📄 License

The project is distributed under the ISC license.

## 👥 Authors

The project was created to demonstrate modern web development technologies and best practices for building applications.

---

**Note**: This is a demonstration project created for learning modern web development technologies.
