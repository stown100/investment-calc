import React, { useState, useEffect } from "react";
import { useProjectStore } from "../model/store";
import { 
  TextField, 
  Typography, 
  Box, 
  IconButton, 
  Tooltip,
  InputAdornment
} from "@mui/material";
import { Search as SearchIcon, Clear as ClearIcon } from "@mui/icons-material";

// Search component for filtering projects by name
export const ProjectSearch = () => {
  const searchQuery = useProjectStore((s) => s.searchQuery);
  const setSearchQuery = useProjectStore((s) => s.setSearchQuery);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  // Debounce search to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearchQuery !== searchQuery) {
        setSearchQuery(localSearchQuery);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearchQuery, searchQuery, setSearchQuery]);

  const handleClear = () => {
    setLocalSearchQuery("");
    setSearchQuery("");
  };

  return (
    <Box>
      <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
        Search:
      </Typography>

      <TextField
        placeholder="Search projects by name..."
        value={localSearchQuery}
        onChange={(event) => setLocalSearchQuery(event.target.value)}
        size="small"
        sx={{ 
          minWidth: 250,
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
            </InputAdornment>
          ),
          endAdornment: localSearchQuery && (
            <InputAdornment position="end">
              <Tooltip title="Clear search">
                <IconButton
                  size="small"
                  onClick={handleClear}
                  sx={{ 
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'text.primary'
                    }
                  }}
                >
                  <ClearIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};
