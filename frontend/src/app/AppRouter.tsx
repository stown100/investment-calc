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
import { Header } from "../entities/auth/ui/Header";
import { Loader } from "../shared/ui/Loader";
import { useAuthStore } from "../entities/auth/model/store";
import { NotificationsProvider } from "@toolpad/core/useNotifications";

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
  const { isAuthenticated, isLoading } = useAuthStore();

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
        <HomePage />
      </Box>
    </Box>
  );
};

export const AppRouter = () => {
  const { setLoading, setUser, setToken } = useAuthStore();

  useEffect(() => {
    const initAuth = () => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        try {
          const payload = JSON.parse(atob(storedToken.split(".")[1]));
          const user = {
            id: payload.userId,
            email: payload.email,
          };

          setUser(user);
          setToken(storedToken);
          setLoading(false);
        } catch (error) {
          localStorage.removeItem("authToken");
          setLoading(false);
        }
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
            path="/"
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
