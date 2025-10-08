import React from "react";
import { Button, useTheme } from "@mui/material";
import { Login as LoginIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export const LoginButton: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/auth");
  };

  return (
    <Button
      variant="contained"
      startIcon={<LoginIcon />}
      onClick={handleLogin}
      sx={{
        backgroundColor: theme.palette.mode === "dark" ? "#fff" : "#fff",
        color: theme.palette.mode === "dark" ? "#667eea" : "#667eea",
        fontWeight: 700,
        textTransform: "none",
        px: 3,
        py: 1,
        boxShadow:
          theme.palette.mode === "dark"
            ? "0 4px 20px rgba(255,255,255,0.3)"
            : "0 4px 20px rgba(0,0,0,0.2)",
        "&:hover": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#f0f0f0" : "#f8f8f8",
          transform: "translateY(-2px)",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 6px 25px rgba(255,255,255,0.4)"
              : "0 6px 25px rgba(0,0,0,0.3)",
        },
        transition: "all 0.3s ease-in-out",
      }}
    >
      Login
    </Button>
  );
};
