import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useTheme } from "../../theme/ThemeContext";

interface LoaderProps {
  message?: string;
  size?: "small" | "medium" | "large";
}

export const Loader: React.FC<LoaderProps> = ({
  message = "Loading...",
  size = "medium",
}) => {
  const { mode } = useTheme();

  const getSize = () => {
    switch (size) {
      case "small":
        return 40;
      case "large":
        return 80;
      default:
        return 60;
    }
  };

  const getSpinnerSize = () => {
    switch (size) {
      case "small":
        return 24;
      case "large":
        return 48;
      default:
        return 36;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100%",
        background:
          mode === "dark"
            ? "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)"
            : "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: 100,
          height: 100,
          borderRadius: "50%",
          background:
            mode === "dark"
              ? "rgba(59, 130, 246, 0.1)"
              : "rgba(59, 130, 246, 0.05)",
          animation: "float 6s ease-in-out infinite",
          "@keyframes float": {
            "0%, 100%": {
              transform: "translateY(0px) rotate(0deg)",
              opacity: 0.5,
            },
            "50%": {
              transform: "translateY(-20px) rotate(180deg)",
              opacity: 0.8,
            },
          },
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: "60%",
          right: "15%",
          width: 80,
          height: 80,
          borderRadius: "50%",
          background:
            mode === "dark"
              ? "rgba(236, 72, 153, 0.1)"
              : "rgba(236, 72, 153, 0.05)",
          animation: "float 8s ease-in-out infinite reverse",
          "@keyframes float": {
            "0%, 100%": {
              transform: "translateY(0px) rotate(0deg)",
              opacity: 0.5,
            },
            "50%": {
              transform: "translateY(-20px) rotate(180deg)",
              opacity: 0.8,
            },
          },
        }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            width: getSize(),
            height: getSize(),
            borderRadius: "50%",
            background:
              mode === "dark"
                ? "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
                : "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow:
              mode === "dark"
                ? "0 8px 32px rgba(59, 130, 246, 0.3)"
                : "0 8px 32px rgba(59, 130, 246, 0.2)",
            animation: "pulse 2s ease-in-out infinite",
            "@keyframes pulse": {
              "0%, 100%": {
                transform: "scale(1)",
                boxShadow:
                  mode === "dark"
                    ? "0 8px 32px rgba(59, 130, 246, 0.3)"
                    : "0 8px 32px rgba(59, 130, 246, 0.2)",
              },
              "50%": {
                transform: "scale(1.05)",
                boxShadow:
                  mode === "dark"
                    ? "0 12px 40px rgba(59, 130, 246, 0.4)"
                    : "0 12px 40px rgba(59, 130, 246, 0.3)",
              },
            },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "white",
              fontWeight: "bold",
              fontSize: getSize() * 0.4,
            }}
          >
            IC
          </Typography>
        </Box>

        <Box sx={{ position: "relative" }}>
          <CircularProgress
            size={getSpinnerSize()}
            thickness={4}
            sx={{
              color: mode === "dark" ? "#3b82f6" : "#3b82f6",
              "& .MuiCircularProgress-circle": {
                strokeLinecap: "round",
              },
            }}
          />
        </Box>

        <Typography
          variant="h6"
          sx={{
            color: mode === "dark" ? "#e2e8f0" : "#475569",
            fontWeight: 500,
            textAlign: "center",
            animation: "fadeInOut 2s ease-in-out infinite",
            "@keyframes fadeInOut": {
              "0%, 100%": { opacity: 0.7 },
              "50%": { opacity: 1 },
            },
          }}
        >
          {message}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: mode === "dark" ? "#94a3b8" : "#64748b",
            textAlign: "center",
            maxWidth: 300,
            lineHeight: 1.6,
          }}
        >
          Preparing your investment dashboard...
        </Typography>
      </Box>
    </Box>
  );
};
