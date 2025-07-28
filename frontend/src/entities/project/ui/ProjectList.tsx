import React, { useEffect } from "react";
import { useProjectStore } from "../model/store";
import {
  Card,
  Group,
  Text,
  Badge,
  Stack,
  ActionIcon,
  Tooltip,
  rem,
} from "@mantine/core";
import {
  IconBuilding,
  IconPercentage,
  IconCoin,
  IconCalendar,
  IconTrash,
} from "@tabler/icons-react";
import dayjs from "dayjs";

// Displays the list of investment projects
export const ProjectList = () => {
  const projects = useProjectStore((s) => s.projects);
  const removeProject = useProjectStore((s) => s.removeProject);
  const fetchProjects = useProjectStore((s) => s.fetchProjects);
  const now = dayjs();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Handles project deletion with confirmation
  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      removeProject(id);
    }
  };

  return (
    <Stack gap="sm">
      {projects.map((project) => {
        const isActive = now.isAfter(dayjs(project.startDate));
        const startDate = dayjs(project.startDate);
        const daysUntilStart = startDate.diff(now, "day");

        return (
          <Card
            key={project.id}
            shadow="sm"
            padding="md"
            radius="md"
            withBorder
            style={{ width: "100%" }}
          >
            <Group justify="space-between" align="flex-start" wrap="nowrap">
              <Stack gap="xs" style={{ flex: 1, minWidth: 0 }}>
                <Group gap="xs" wrap="nowrap">
                  <IconBuilding
                    style={{ width: rem(20), height: rem(20) }}
                    stroke={1.5}
                  />
                  <Text fw={500} size="lg" truncate>
                    {project.name}
                  </Text>
                </Group>

                <Group gap="xl" wrap="nowrap">
                  <Group gap="xs" wrap="nowrap">
                    <IconPercentage
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                    <Text size="sm">
                      <Text span fw={500}>
                        Annual Percent:
                      </Text>{" "}
                      {project.annualPercent}%
                    </Text>
                  </Group>

                  <Group gap="xs" wrap="nowrap">
                    <IconCoin
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                    <Text size="sm">
                      <Text span fw={500}>
                        Invested:
                      </Text>{" "}
                      <Text span c="blue.6">
                        $
                        {project.investedAmount.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </Text>
                    </Text>
                  </Group>

                  <Group gap="xs" wrap="nowrap">
                    <IconCalendar
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                    <Text size="sm">
                      <Text span fw={500}>
                        Start:
                      </Text>{" "}
                      {startDate.format("DD.MM.YYYY")}
                      {!isActive && daysUntilStart > 0 && (
                        <Text span c="dimmed">
                          {" "}
                          (in {daysUntilStart} days)
                        </Text>
                      )}
                    </Text>
                  </Group>
                </Group>
              </Stack>

              <Group gap="xs" wrap="nowrap">
                {isActive ? (
                  <Badge color="green" variant="light" size="lg">
                    Active
                  </Badge>
                ) : (
                  <Badge color="blue" variant="light" size="lg">
                    Pending
                  </Badge>
                )}
                <Tooltip label="Delete project">
                  <ActionIcon
                    variant="subtle"
                    color="red"
                    onClick={() => handleDelete(project.id)}
                  >
                    <IconTrash
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  </ActionIcon>
                </Tooltip>
              </Group>
            </Group>
          </Card>
        );
      })}
    </Stack>
  );
};
