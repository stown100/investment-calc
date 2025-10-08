import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Drawer,
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Home as HomeIcon,
  TableChart as TableIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

interface NavigationProps {
  showNavigation: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ showNavigation }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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

  if (!showNavigation) return null;

  return (
    <>
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

      {/* Desktop Navigation Tabs */}
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
    </>
  );
};
