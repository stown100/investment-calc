import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { Calculate as CalculateIcon } from "@mui/icons-material";
import { useAuthStore } from "../model/store";
import { ThemeToggle } from "../../../shared/ui/ThemeToggle";
import {
  LoginButton,
  UserMenu,
  Navigation,
  useHeaderState,
} from "./header-components";

export const Header: React.FC = () => {
  const { user } = useAuthStore();
  const { isAuthenticated, showNavigation } = useHeaderState();

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        opacity: 0.9,
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        borderRadius: 0,
      }}
    >
      <Toolbar
        sx={{
          minHeight: 70,
          maxWidth: "1392px",
          width: "100%",
          mx: "auto",
          px: 2,
        }}
      >
        {/* Left side - Logo, Title and Navigation */}
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 2, flexGrow: 1 }}
        >
          <Navigation showNavigation={showNavigation} />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mr: showNavigation ? 3 : 0,
            }}
          >
            <CalculateIcon sx={{ fontSize: 28, color: "white" }} />
            <Typography
              variant="h5"
              component="h1"
              sx={{
                fontWeight: 600,
                color: "white",
                textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                fontSize: { xs: "1.1rem", sm: "1.5rem" },
              }}
            >
              Investment Calculator
            </Typography>
          </Box>
        </Box>

        {/* Right side - Theme Toggle and User Info or Login Button */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <ThemeToggle />
          {isAuthenticated && user ? <UserMenu /> : <LoginButton />}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
