import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Tooltip,
  IconButton,
  useTheme,
  Button,
} from "@mui/material";
import {
  Business as BusinessIcon,
  Calculate as CalculateIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useAuthStore } from "../model/store";
import { ThemeToggle } from "../../../shared/ui/ThemeToggle";

export const Header: React.FC = () => {
  const { user, logout } = useAuthStore();
  const theme = useTheme();
  const [showLogoutTooltip, setShowLogoutTooltip] = useState(false);

  const handleLogout = () => {
    logout();
  };

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
        {/* Left side - Logo and Title */}
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 2, flexGrow: 1 }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mr: 3,
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
              }}
            >
              Investment Calculator
            </Typography>
          </Box>
        </Box>

        {/* Right side - Theme Toggle and User Info */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <ThemeToggle />

          {user && (
            <Tooltip
              title={
                <Box sx={{ p: 1, minWidth: 150 }}>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1, fontWeight: 500, color: "white" }}
                  >
                    {user.email}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<LogoutIcon />}
                    onClick={handleLogout}
                    sx={{
                      color: "white",
                      borderColor: "rgba(255, 255, 255, 0.5)",
                      "&:hover": {
                        borderColor: "white",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      },
                      textTransform: "none",
                      fontSize: "0.875rem",
                    }}
                  >
                    Logout
                  </Button>
                </Box>
              }
              placement="bottom-end"
              arrow
              open={showLogoutTooltip}
              onClose={() => setShowLogoutTooltip(false)}
              disableHoverListener
              disableFocusListener
              disableTouchListener
            >
              <IconButton
                onClick={() => setShowLogoutTooltip(!showLogoutTooltip)}
                sx={{
                  p: 0.5,
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    transform: "scale(1.05)",
                    transition: "all 0.2s ease-in-out",
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: "rgba(255, 255, 255, 0.2)",
                    border: "2px solid rgba(255, 255, 255, 0.3)",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    cursor: "pointer",
                    "&:hover": {
                      borderColor: "rgba(255, 255, 255, 0.6)",
                      bgcolor: "rgba(255, 255, 255, 0.3)",
                    },
                  }}
                >
                  {user.email.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
