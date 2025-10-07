import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Box } from "@mui/material";
import { HomePage } from "../pages/home/HomePage";
import { AuthPage } from "../pages/auth/AuthPage";
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
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const AppLayout: React.FC = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsTablePage />} />
        </Routes>
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

  return (
    <NotificationsProvider>
      <Router>
        <Routes>
          <Route
            path="/auth"
            element={
              <PublicRoute>
                <AuthPage />
              </PublicRoute>
            }
          />

          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </NotificationsProvider>
  );
};
