import React, { useState } from "react";
import {
  Box,
  Avatar,
  Tooltip,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import { Logout as LogoutIcon } from "@mui/icons-material";
import { useAuthStore } from "../../model/store";

export const UserMenu: React.FC = () => {
  const { user, logout } = useAuthStore();
  const [showLogoutTooltip, setShowLogoutTooltip] = useState(false);

  if (!user) return null;

  const handleLogout = () => {
    logout();
  };

  return (
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
  );
};
