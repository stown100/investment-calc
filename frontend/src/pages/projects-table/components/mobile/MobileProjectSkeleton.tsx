import React from "react";
import { Box, CardContent, Skeleton } from "@mui/material";
import { StyledCard } from "../../../../shared/ui/StyledCard";

export const MobileProjectSkeleton: React.FC = () => {
  return (
    <StyledCard elevation={1} sx={{ mb: 1, borderRadius: 1 }}>
      <CardContent sx={{ p: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 0.5, flex: 1 }}
          >
            <Skeleton variant="circular" width={16} height={16} />
            <Skeleton variant="text" width="60%" height={18} />
          </Box>
          <Skeleton
            variant="rectangular"
            width={45}
            height={16}
            sx={{ borderRadius: 1 }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Skeleton
            variant="rectangular"
            width={60}
            height={16}
            sx={{ borderRadius: 1 }}
          />
          <Skeleton variant="text" width="40%" height={18} />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Box>
            <Skeleton variant="text" width={45} height={12} />
            <Skeleton variant="text" width={30} height={14} />
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Skeleton variant="text" width={55} height={12} />
            <Skeleton variant="text" width={40} height={14} />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Skeleton variant="rectangular" width={90} height={14} />
          <Skeleton variant="circular" width={18} height={18} />
        </Box>
      </CardContent>
    </StyledCard>
  );
};
