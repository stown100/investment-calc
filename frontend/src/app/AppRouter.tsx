import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Box } from "@mui/material";
import { DashboardPage } from "../pages/home/DashboardPage";
import { AuthPage } from "../pages/auth/AuthPage";
import { WelcomePage } from "../pages/welcome/WelcomePage";
import { ProjectsTablePage } from "../pages/projects-table/ProjectsTablePage";
import { Header } from "../entities/auth/ui/Header";
import { Loader } from "../shared/ui/Loader";
import { useAuthStore } from "../entities/auth/model/store";
import { NotificationsProvider } from "@toolpad/core/useNotifications";
import { getCurrentUser } from "../entities/auth/api/authApi";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return <Loader message="Checking authentication..." size="large" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/welcome" replace />;
  }

  return <>{children}</>;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/projects" replace />;
  }

  return <>{children}</>;
};

const AppLayout: React.FC = () => {
  const location = useLocation();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {location.pathname === "/dashboard" ? (
          <DashboardPage />
        ) : location.pathname === "/projects" ? (
          <ProjectsTablePage />
        ) : (
          <ProjectsTablePage />
        )}
      </Box>
    </Box>
  );
};

const WelcomeLayout: React.FC = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <WelcomePage />
      </Box>
    </Box>
  );
};

export const AppRouter = () => {
  const { setLoading, setUser, setToken, logout } = useAuthStore();

  useEffect(() => {
    const initAuth = () => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        // Verify token with backend to avoid trusting local decode
        setLoading(true);
        getCurrentUser()
          .then((user) => {
            setUser(user);
            setToken(storedToken);
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
            logout();
          });
      } else {
        setLoading(false);
      }
    };

    initAuth();
  }, [setLoading, setUser, setToken]);

  const { isAuthenticated, isLoading } = useAuthStore();

  return (
    <NotificationsProvider>
      <Router>
        <Routes>
          {/* Root redirect - to welcome for non-auth, to projects for auth */}
          <Route
            path="/"
            element={
              isLoading ? (
                <Loader message="Loading..." size="large" />
              ) : isAuthenticated ? (
                <Navigate to="/projects" replace />
              ) : (
                <Navigate to="/welcome" replace />
              )
            }
          />

          {/* Welcome page - public, available to everyone */}
          <Route path="/welcome" element={<WelcomeLayout />} />

          {/* Auth page - only for non-authenticated users */}
          <Route
            path="/auth"
            element={
              <PublicRoute>
                <AuthPage />
              </PublicRoute>
            }
          />

          {/* Dashboard route */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          />

          {/* Protected routes - only for authenticated users */}
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          />

          {/* Default redirect to welcome for any unknown route */}
          <Route path="*" element={<Navigate to="/welcome" replace />} />
        </Routes>
      </Router>
    </NotificationsProvider>
  );
};
