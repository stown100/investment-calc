import React from "react";
import { Box, Skeleton } from "@mui/material";
import { StyledCard } from "../../../../shared/ui/StyledCard";

export const PageSkeleton: React.FC = () => {
  return (
    <Box
      sx={{
        p: 2,
        maxWidth: "1392px",
        mx: "auto",
        width: "100%",
      }}
    >
      {/* Header Skeleton */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Skeleton variant="text" width={200} height={31} />
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Skeleton
            variant="rectangular"
            width={100}
            height={31}
            sx={{ borderRadius: 1 }}
          />
          <Skeleton
            variant="rectangular"
            width={140}
            height={31}
            sx={{ borderRadius: 1 }}
          />
        </Box>
      </Box>

      {/* Summary Cards Skeleton */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 1.5,
          mb: 3,
        }}
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <StyledCard
            key={index}
            elevation={1}
            sx={{ p: 1.5, textAlign: "center", borderRadius: 2 }}
          >
            <Skeleton
              variant="text"
              width="60%"
              height={32}
              sx={{ mx: "auto", mb: 1 }}
            />
            <Skeleton
              variant="text"
              width="80%"
              height={20}
              sx={{ mx: "auto" }}
            />
          </StyledCard>
        ))}
      </Box>
    </Box>
  );
};
