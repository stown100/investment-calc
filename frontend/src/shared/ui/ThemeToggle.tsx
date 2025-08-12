import React from "react";
import { IconButton, Tooltip, Box } from "@mui/material";
import {
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from "@mui/icons-material";
import { useTheme } from "../../theme/ThemeContext";

export const ThemeToggle: React.FC = () => {
  const { mode, toggleTheme } = useTheme();

  return (
    <Box>
      <Tooltip title={`Switch to ${mode === "light" ? "dark" : "light"} theme`}>
        <IconButton
          onClick={toggleTheme}
          color="inherit"
          sx={{
            borderRadius: 2,
            "&:hover": {
              backgroundColor: "action.hover",
            },
          }}
        >
          {mode === "light" ? (
            <DarkModeIcon sx={{ fontSize: 20 }} />
          ) : (
            <LightModeIcon sx={{ fontSize: 20 }} />
          )}
        </IconButton>
      </Tooltip>
    </Box>
  );
};
