import React from "react";
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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Home as HomeIcon, TableChart as TableIcon } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

interface NavigationProps {
  showNavigation: boolean;
  mobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  showNavigation,
  mobileMenuOpen,
  onMobileMenuToggle,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    navigate(newValue);
  };

  const handleMobileNavigation = (path: string) => {
    navigate(path);
    onMobileMenuToggle();
  };

  const getCurrentTab = () => {
    if (location.pathname === "/dashboard") return "/dashboard";
    return "/projects";
  };

  if (!showNavigation) return null;

  return (
    <>
      {/* Desktop Navigation Tabs - only for desktop */}
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
            icon={<TableIcon />}
            iconPosition="start"
            label="All Projects"
            value="/projects"
            disableRipple
            disableFocusRipple
          />
          <Tab
            icon={<HomeIcon />}
            iconPosition="start"
            label="Dashboard"
            value="/dashboard"
            disableRipple
            disableFocusRipple
          />
        </Tabs>
      )}

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={onMobileMenuToggle}
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
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleMobileNavigation("/dashboard")}
                selected={location.pathname === "/dashboard"}
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
          </List>
        </Box>
      </Drawer>
    </>
  );
};
