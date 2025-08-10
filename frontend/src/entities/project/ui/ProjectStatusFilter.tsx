import React from "react";
import { Select, Text } from "@mantine/core";
import { useProjectStore } from "../model/store";

export interface StatusOption {
  value: string;
  label: string;
}

const statusOptions: StatusOption[] = [
  { value: "all", label: "All Projects" },
  { value: "active", label: "Active Projects" },
  { value: "pending", label: "Pending Projects" },
];

export const ProjectStatusFilter = () => {
  const { status, setStatusFilter } = useProjectStore();

  const handleStatusChange = (value: string | null) => {
    if (value) {
      setStatusFilter(value);
    }
  };

  return (
    <div>
      <Text size="sm" fw={500} mb={4}>
        Filter by status:
      </Text>
      <Select
        data={statusOptions}
        value={status}
        onChange={handleStatusChange}
        placeholder="Select status"
        size="xs"
        style={{ minWidth: 150 }}
      />
    </div>
  );
};
