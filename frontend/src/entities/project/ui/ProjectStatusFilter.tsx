import React from "react";
import { FormControl, InputLabel, Select, MenuItem, Typography, Box } from "@mui/material";
import { useProjectStore } from "../model/store";

const statusOptions = [
  { value: "all", label: "All Projects" },
  { value: "active", label: "Active Projects" },
  { value: "pending", label: "Pending Projects" },
];

export const ProjectStatusFilter = () => {
  const { status, setStatusFilter } = useProjectStore();

  const handleStatusChange = (value: string) => {
    if (value) {
      setStatusFilter(value);
    }
  };

  return (
    <Box>
      <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
        Filter by status:
      </Typography>
      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel>Select status</InputLabel>
        <Select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
          label="Select status"
          sx={{
            borderRadius: 2,
          }}
        >
          {statusOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
