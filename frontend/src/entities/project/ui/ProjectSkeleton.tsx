import React from "react";
import { Box } from "@mui/material";

// Simple skeleton component with shimmer effect
export const ProjectSkeleton = () => {
  return (
    <Box
      sx={{
        height: 120, // Fixed height similar to project card
        borderRadius: 2,
        background: (theme) => 
          theme.palette.mode === 'dark' 
            ? 'linear-gradient(90deg, rgb(30, 41, 59) 25%, rgb(15, 23, 42) 50%, rgb(30, 41, 59) 75%)'
            : 'linear-gradient(90deg, #f5f5f5 25%, #e8e8e8 50%, #f5f5f5 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 2s ease-in-out infinite',
        boxShadow: (theme) => 
          theme.palette.mode === 'dark' 
            ? '0 2px 4px rgba(255,255,255,0.1)'
            : '0 2px 4px rgba(0,0,0,0.1)',
        '@keyframes shimmer': {
          '0%': {
            backgroundPosition: '-200% 0',
          },
          '100%': {
            backgroundPosition: '200% 0',
          },
        },
      }}
    />
  );
};

// Multiple skeletons component
export const ProjectSkeletons = ({ count = 3 }: { count?: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Box
          key={`skeleton-${index}`}
          sx={{
            mb: 2, // Add margin bottom for spacing between skeletons
            animationDelay: `${index * 0.1}s`,
          }}
        >
          <ProjectSkeleton />
        </Box>
      ))}
    </>
  );
};
