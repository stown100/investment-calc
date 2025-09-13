import React from "react";
import { Box, CircularProgress } from "@mui/material";

export const BlurLoader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        backdropFilter: "blur(2px)",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        // Place below MUI Menu/Modal layer so Select dropdown stays on top
        zIndex: (theme) => {
          const modal = (theme as any).zIndex?.modal ?? 1300;
          return modal - 1; // e.g., 1299
        },
        pointerEvents: "none",
      }}
    >
      <CircularProgress />
    </Box>
  );
};
