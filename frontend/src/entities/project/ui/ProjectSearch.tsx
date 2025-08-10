import React, { useState, useEffect } from "react";
import { useProjectStore } from "../model/store";
import { TextInput, rem, Text, ActionIcon, Tooltip } from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons-react";

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
    <div>
      <Text size="sm" fw={500} mb={4}>
        Search:
      </Text>

      <TextInput
        placeholder="Search projects by name..."
        value={localSearchQuery}
        onChange={(event) => setLocalSearchQuery(event.currentTarget.value)}
        leftSection={
          <IconSearch
            style={{ width: rem(16), height: rem(16) }}
            stroke={1.5}
          />
        }
        rightSection={
          localSearchQuery && (
            <Tooltip label="Clear search">
              <ActionIcon
                variant="subtle"
                size="sm"
                onClick={handleClear}
                style={{ cursor: "pointer" }}
              >
                <IconX
                  style={{ width: rem(14), height: rem(14) }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Tooltip>
          )
        }
        size="xs"
        style={{ minWidth: 250 }}
      />
    </div>
  );
};
