import React, { useEffect, useState } from "react";
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
  IconEdit,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import { Project } from "../model/types";
import { EditProjectModal } from "../../../features/edit-project/ui/EditProjectModal";
import { notifications } from "@mantine/notifications";

// Displays the list of investment projects
export const ProjectList = () => {
  const projects = useProjectStore((s) => s.projects);
  const removeProject = useProjectStore((s) => s.removeProject);
  const fetchProjects = useProjectStore((s) => s.fetchProjects);
  const sortBy = useProjectStore((s) => s.sortBy);
  const sortOrder = useProjectStore((s) => s.sortOrder);
  const status = useProjectStore((s) => s.status);
  const searchQuery = useProjectStore((s) => s.searchQuery);
  const now = dayjs();

  // State for edit modal
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editModalOpened, setEditModalOpened] = useState(false);

  useEffect(() => {
    fetchProjects(sortBy, sortOrder, status, searchQuery).catch((e) => {
      notifications.show({
        title: "Error",
        message: "Failed to load projects",
        color: "red",
        icon: <IconBuilding size={16} />,
      });
    });
  }, [fetchProjects, sortBy, sortOrder, status, searchQuery]);

  // Handles project deletion with confirmation
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await removeProject(id);
        notifications.show({
          title: "Success!",
          message: "Project has been deleted successfully",
          color: "green",
          icon: <IconTrash size={16} />,
        });
      } catch (e) {
        notifications.show({
          title: "Error",
          message: "Failed to delete project",
          color: "red",
          icon: <IconTrash size={16} />,
        });
      }
    }
  };

  // Handles opening edit modal for a project
  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setEditModalOpened(true);
  };

  // Handles closing edit modal
  const handleCloseEditModal = () => {
    setEditModalOpened(false);
    setEditingProject(null);
  };

  return (
    <>
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
                  <Tooltip label="Edit project">
                    <ActionIcon
                      variant="subtle"
                      color="blue"
                      onClick={() => handleEdit(project)}
                    >
                      <IconEdit
                        style={{ width: rem(16), height: rem(16) }}
                        stroke={1.5}
                      />
                    </ActionIcon>
                  </Tooltip>
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

      {/* Edit Project Modal */}
      {editingProject && (
        <EditProjectModal
          opened={editModalOpened}
          onClose={handleCloseEditModal}
          project={editingProject}
        />
      )}
    </>
  );
};
