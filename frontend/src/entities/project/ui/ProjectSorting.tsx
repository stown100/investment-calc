import React from "react";
import { FormControl, InputLabel, Select, MenuItem, Typography, Box } from "@mui/material";
import { useProjectStore } from "../model/store";

export interface SortOption {
  value: string;
  label: string;
}

const sortOptions: SortOption[] = [
  { value: "startDate-asc", label: "Investment Date (Oldest First)" },
  { value: "startDate-desc", label: "Investment Date (Newest First)" },
  { value: "investedAmount-asc", label: "Investment Amount (Lowest First)" },
  { value: "investedAmount-desc", label: "Investment Amount (Highest First)" },
  { value: "annualPercent-asc", label: "Profit Percentage (Lowest First)" },
  { value: "annualPercent-desc", label: "Profit Percentage (Highest First)" },
  { value: "createdAt-asc", label: "Creation Date (Oldest First)" },
  { value: "createdAt-desc", label: "Creation Date (Newest First)" },
];

export const ProjectSorting = () => {
  const { sortBy, sortOrder, setSorting } = useProjectStore();

  const currentValue = `${sortBy}-${sortOrder}`;

  const handleSortChange = (value: string) => {
    if (value) {
      const [newSortBy, newSortOrder] = value.split("-");
      setSorting(newSortBy, newSortOrder);
    }
  };

  return (
    <Box>
      <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
        Sort by:
      </Typography>
      <FormControl size="small" sx={{ minWidth: 250 }}>
        <InputLabel>Select sorting option</InputLabel>
        <Select
          value={currentValue}
          onChange={(e) => handleSortChange(e.target.value)}
          label="Select sorting option"
          sx={{
            borderRadius: 2,
          }}
        >
          {sortOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
