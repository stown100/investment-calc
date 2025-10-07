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
  Tabs,
  Tab,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import {
  Calculate as CalculateIcon,
  Logout as LogoutIcon,
  TableChart as TableIcon,
  Home as HomeIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../model/store";
import { ThemeToggle } from "../../../shared/ui/ThemeToggle";

export const Header: React.FC = () => {
  const { user, logout } = useAuthStore();
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutTooltip, setShowLogoutTooltip] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleLogout = () => {
    logout();
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    navigate(newValue);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileNavigation = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const getCurrentTab = () => {
    if (location.pathname === "/projects") return "/projects";
    return "/";
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
        {/* Left side - Mobile Menu Button, Logo and Title */}
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 2, flexGrow: 1 }}
        >
          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              onClick={handleMobileMenuToggle}
              sx={{
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          )}

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
                fontSize: { xs: "1.1rem", sm: "1.5rem" },
              }}
            >
              Investment Calculator
            </Typography>
          </Box>

          {/* Navigation Tabs - Desktop */}
          {!isMobile && (
            <Tabs
              value={getCurrentTab()}
              onChange={handleTabChange}
              sx={{
                "& .MuiTab-root": {
                  color: "rgba(255, 255, 255, 0.7)",
                  fontWeight: 500,
                  textTransform: "none",
                  minHeight: 48,
                  "&.Mui-selected": {
                    color: "white",
                  },
                  "&:hover": {
                    color: "white",
                  },
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "white",
                  height: 3,
                  borderRadius: "2px 2px 0 0",
                },
              }}
            >
              <Tab
                icon={<HomeIcon />}
                iconPosition="start"
                label="Dashboard"
                value="/"
                disableRipple
                disableFocusRipple
              />
              <Tab
                icon={<TableIcon />}
                iconPosition="start"
                label="All Projects"
                value="/projects"
                disableRipple
                disableFocusRipple
              />
            </Tabs>
          )}
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

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: 280,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Navigation
          </Typography>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleMobileNavigation("/")}
                selected={location.pathname === "/"}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  "&.Mui-selected": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <ListItemIcon>
                  <HomeIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleMobileNavigation("/projects")}
                selected={location.pathname === "/projects"}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  "&.Mui-selected": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <ListItemIcon>
                  <TableIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="All Projects" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};
