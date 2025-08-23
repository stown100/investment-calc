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
        zIndex: 2,
      }}
    >
      <CircularProgress />
    </Box>
  );
};
