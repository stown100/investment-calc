import React from "react";
import { Select, Text } from "@mantine/core";
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

  const handleSortChange = (value: string | null) => {
    if (value) {
      const [newSortBy, newSortOrder] = value.split("-");
      setSorting(newSortBy, newSortOrder);
    }
  };

  return (
    <div>
      <Text size="sm" fw={500} mb={4}>
        Sort by:
      </Text>
      <Select
        data={sortOptions}
        value={currentValue}
        onChange={handleSortChange}
        placeholder="Select sorting option"
        size="xs"
        style={{ minWidth: 250 }}
      />
    </div>
  );
};
