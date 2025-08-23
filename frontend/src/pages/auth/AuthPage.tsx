import React from "react";
import { Box } from "@mui/material";
import { AuthForm } from "../../entities/auth/ui/AuthForm";
import { ThemeToggle } from "../../shared/ui/ThemeToggle";

export const AuthPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          zIndex: 1,
        }}
      >
        <ThemeToggle />
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          p: 2,
        }}
      >
        <AuthForm />
      </Box>
    </Box>
  );
};
